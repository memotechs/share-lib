import { SearchOptions, SearchParams, SearchResponse, DocumentSchema } from 'typesense/lib/Typesense/Documents';

export interface SearchDocumentService<Document extends DocumentSchema> {
    searchDocument(searchParameters: SearchParams, options: SearchOptions): Promise<SearchResponse<any>>;
}
