import {
  Repository,
  Connection,
  EntityManager,
  SelectQueryBuilder,
} from 'typeorm';
import { EntityGeneric } from '../entity';
import { PaginationDto, BaseFilterDto } from '../../../dto';
import { EntityStateConstant } from '../../constant';
import { PaginationResponse } from '../../../response';

export abstract class ServiceGeneric<
  Entity extends EntityGeneric,
  CustomRepository extends Repository<Entity>,
> {
  protected readonly entityName: string;
  protected readonly loggable: boolean = false;
  protected repository: CustomRepository;
  protected connection: Connection;
  constructor(
    protected readonly connectionOrManager: Connection | EntityManager,
    repositoryType: { new (connection: Connection): CustomRepository },
  ) {
    if (connectionOrManager instanceof EntityManager) {
      this.connection = connectionOrManager.connection;
    } else {
      this.connection = connectionOrManager;
    }
    this.repository = this.connection.getCustomRepository(repositoryType);
  }

  create = async (entity: Entity): Promise<Entity> => {
    return this.repository.save(entity);
  };

  update = async (entity: Entity): Promise<Entity> => {
    return this.repository.save(entity);
  };

  getListWithPagination = async (
    paginationDto: PaginationDto,
    callback?: (query: SelectQueryBuilder<Entity>) => void,
  ): Promise<PaginationResponse<Entity>> => {
    const { limit = 25, offset = 0 } = paginationDto;
    const query = this.repository.createQueryBuilder(this.entityName);
    query.limit(limit);
    query.offset(offset);
    query.where(`${this.entityName}.state != :state`, {
      state: EntityStateConstant.Archived,
    });
    const defaultSelectable = ['createdAt', 'updatedAt'];
    query.orderBy(`${this.entityName}.updatedAt`, 'DESC');
    const selection = defaultSelectable.map(
      (column: string) => `${this.entityName}.${column}`,
    );
    query.addSelect(selection);
    if (callback != null) {
      callback(query);
    }
    const entities = await query.getMany();
    const total = await query.getCount();
    const response = new PaginationResponse(entities, total, limit, offset);
    return response;
  };

  getAutocompleteWithPagination = async (
    paginationDto: PaginationDto,
    filter: BaseFilterDto,
    callback?: (query: SelectQueryBuilder<Entity>) => void,
  ): Promise<PaginationResponse<Entity>> => {
    const { limit = 25, offset = 0 } = paginationDto;
    const query = this.repository.createQueryBuilder(this.entityName);
    query.limit(limit);
    query.offset(offset);
    query.where(`${this.entityName}.state != :state`, {
      state: EntityStateConstant.Archived,
    });
    const defaultSelectable = ['createdAt', 'updatedAt'];
    query.orderBy(`${this.entityName}.updatedAt`, 'DESC');
    const selection = defaultSelectable.map(
      (column: string) => `${this.entityName}.${column}`,
    );
    query.addSelect(selection);
    if (callback != null) {
      callback(query);
    }
    const { excludeIds = [], includeIds = [] } = { ...filter };
    // Exclude some ids from the list.
    if (excludeIds?.length > 0) {
      query.andWhere(`${this.entityName}.id NOT IN (:ids)`, {
        ids: excludeIds,
      });
    }
    let entities = await query.getMany();
    const total = await query.getCount();
    // Include some ids to the list.
    const allIds: number[] = [];
    for (const id of includeIds) {
      const entity = entities.filter((entity: Entity) => entity.id === id);
      if (entity.length == 0) {
        allIds.push(id);
      }
    }
    if (allIds.length > 0) {
      query.where(`${this.entityName}.id IN (:ids)`, { ids: allIds });
      const data = await query.getMany();
      entities = data.concat(entities);
    }
    const response = new PaginationResponse(entities, total, limit, offset);
    return response;
  };
}
