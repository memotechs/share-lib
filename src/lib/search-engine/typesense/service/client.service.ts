import { Client } from 'typesense';
import { Logger, Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CollectionCreateSchema } from '../collection';
import {
  DeleteResponse,
  ImportResponse,
  SearchOptions,
  SearchParams,
  SearchResponse,
} from '../document';
import { BaseDocument } from '../../document';
import { SearchDocumentService } from '../../interface';
import { EntityGeneric } from '../../../../generic';
import { PaginationResponse } from '../../../../response';
import { BaseFilterDto } from '../../../../dto';

export abstract class ClientService<
  Document extends BaseDocument,
  Entity extends EntityGeneric,
> implements SearchDocumentService<Document>
{
  private readonly logger = new Logger(ClientService.name);
  protected readonly entity: Type<Entity>;
  protected abstract cache_s: number;
  protected readonly skipCheckSchema: boolean = false;

  constructor(
    protected readonly client: Client,
    protected readonly schema: CollectionCreateSchema,
    protected readonly prefix: string,
  ) {
    if (!this.skipCheckSchema && schema != null) {
      this.ensureCollection();
    }
  }

  getCollectionName(): string {
    return this?.schema?.name || this.prefix;
  }

  async searchDocument(
    searchParameters: SearchParams,
    options: SearchOptions,
    filter?: BaseFilterDto,
  ): Promise<SearchResponse<any>> {
    return this.searchDocumentByCollection(
      this.getCollectionName(),
      searchParameters,
      options,
      filter,
    );
  }

  async searchDocumentByCollection(
    collection: string,
    searchParameters: SearchParams,
    options: SearchOptions,
    filter?: BaseFilterDto,
  ): Promise<SearchResponse<any>> {
    try {
      const { per_page = 25 } = { ...searchParameters };
      const includeDocuments = [];
      const includeIds = filter?.includeIds || [];

      if (includeIds.length > 0) {
        const includeOpts = {
          ...searchParameters,
          filter_by: `id:=[${includeIds.join(', ')}]`,
        };
        const includeDocs = await this.client
          .collections(collection)
          .documents()
          .search(includeOpts, options);
        if (includeDocs?.hits?.length > 0) {
          const names = includeDocs.hits.map(
            (data: Record<string, any>) => data.document.name,
          );
          searchParameters.filter_by =
            searchParameters.filter_by == null
              ? `name:!=[${names.join(', ')}]`
              : `${searchParameters.filter_by} && name:!=[${names.join(', ')}]`;
          searchParameters.per_page = per_page - names.length;
        }
        includeDocuments.push(...includeDocs?.hits);
      }
      const documents = await this.client
        .collections(collection)
        .documents()
        .search(searchParameters, options);
      if (includeDocuments.length > 0) {
        documents.hits.push(...includeDocuments);
        documents.request_params.per_page = per_page;
      }
      return documents;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  getAllRawDocs = async (
    searchParameters: SearchParams,
    options: SearchOptions,
  ) => {
    const per_page = searchParameters.per_page ?? 250;
    searchParameters.per_page = per_page;
    options.cacheSearchResultsForSeconds = 1;
    const response = await this.searchDocument(searchParameters, options);
    const { hits = [], found = 0, page = 1 } = { ...response };
    const documents = hits;
    const hasNext = per_page * page < found;
    if (hasNext) {
      searchParameters.page = page + 1;
      const nextDocuments = await this.getAllRawDocs(searchParameters, options);
      documents.push(...nextDocuments);
    }
    return documents;
  };

  async importIndex(data: Document[]): Promise<ImportResponse[]> {
    if (data.length > 0) {
      try {
        return this.client
          .collections(this.getCollectionName())
          .documents()
          .import(data, { action: 'upsert' });
      } catch (error) {
        this.logger.error(error);
      }
    }
  }

  async deleteOutOfDate(data: string[] | number[], key: string): Promise<any> {
    if (data?.length > 0) {
      const deleteParameters = {
        filter_by: `${key}:!=[${data.join(', ')}]`,
      };
      return await this.client
        .collections(this.getCollectionName())
        .documents()
        .delete(deleteParameters);
    }
  }

  async insertIndex(data: Document): Promise<any> {
    return this.client
      .collections(this.getCollectionName())
      .documents()
      .create(data, { action: 'upsert' });
  }

  async updateIndex(data: Document): Promise<any> {
    return this.client
      .collections(this.getCollectionName())
      .documents()
      .upsert(data, { action: 'upsert' });
  }

  updateDocumentById = async (data: Document) => {
    if (data?.id) {
      const exist = await this.client
        .collections(this.getCollectionName())
        .documents(data.id)
        .retrieve();
      if (exist) {
        return this.client
          .collections(this.getCollectionName())
          .documents(data.id)
          .update(data);
      }
    }
  };

  async upsertOrDeleteIndex(datas: Document) {
    throw new Error('Method is not implement.');
  }

  async deleteIndex(data: Document): Promise<DeleteResponse> {
    return this.client
      .collections(this.getCollectionName())
      .documents()
      .delete({ filter_by: `id: ${data.id}` });
  }

  async deleteBatchIndex(ids: string[]): Promise<DeleteResponse> {
    return this.client
      .collections(this.getCollectionName())
      .documents()
      .delete({ filter_by: `id: [${ids.join(',')}]` });
  }

  async deleteIndexByKeyValue(
    key = 'id',
    value: number,
  ): Promise<DeleteResponse> {
    return this.client
      .collections(this.getCollectionName())
      .documents()
      .delete({ filter_by: `${key}:=${value}` });
  }

  transforms = (
    searchResponse: SearchResponse<Record<string, unknown>>,
  ): Entity[] => {
    const entities: Entity[] = [];
    const { hits = [] } = { ...searchResponse };
    for (const hit of hits) {
      const document = hit?.document;
      if (document) {
        const entity = plainToClass(this.entity, document);
        entity.id = Number(document.id);
        entities.push(entity);
      }
    }
    return entities;
  };

  transform = (
    searchResponse: SearchResponse<Record<string, unknown>>,
  ): Entity => {
    let entity: Entity = null;
    const { hits = [] } = { ...searchResponse };
    for (const hit of hits) {
      const document = hit?.document;
      if (document) {
        entity = plainToClass(this.entity, document);
        entity.id = Number(document.id);
      }
      break;
    }
    return entity;
  };

  responseList = (
    searchResponse: SearchResponse<Record<string, unknown>>,
    offset = 0,
  ): PaginationResponse<Entity> => {
    const entities: Entity[] = [];
    const {
      hits = [],
      found = 0,
      page = 1,
      request_params,
    } = { ...searchResponse };
    for (const hit of hits) {
      const document = hit?.document;
      if (document) {
        const entity = plainToClass(this.entity, document);
        entity.id = Number(document.id);
        entities.push(entity);
      }
    }

    const limit = request_params?.per_page;

    // offset = offset ?? (page - 1) * limit;

    return new PaginationResponse(entities, found, limit, offset);
  };

  private ensureCollection = async (): Promise<void> => {
    this.checkSchemaName();
    const exists = await this.client.collections(this.schema.name).exists();
    if (!exists) {
      await this.client.collections().create(this.schema);
    }
  };

  private checkSchemaName = (): void => {
    const schemaName = this.schema.name.replace(/.*?\_/gi, '');
    this.schema.name = `${this.prefix}_${schemaName}`;
  };
}
