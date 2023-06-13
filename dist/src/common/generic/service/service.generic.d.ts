import { Repository, Connection, EntityManager, SelectQueryBuilder } from 'typeorm';
import { EntityGeneric } from '../entity';
import { PaginationDto, BaseFilterDto } from '../../../dto';
import { PaginationResponse } from '../../../response';
export declare abstract class ServiceGeneric<Entity extends EntityGeneric, CustomRepository extends Repository<Entity>> {
    protected readonly connectionOrManager: Connection | EntityManager;
    protected readonly entityName: string;
    protected readonly loggable: boolean;
    protected repository: CustomRepository;
    protected connection: Connection;
    constructor(connectionOrManager: Connection | EntityManager, repositoryType: {
        new (connection: Connection): CustomRepository;
    });
    create(entity: Entity): Promise<Entity>;
    update(entity: Entity): Promise<Entity>;
    getListWithPagination(paginationDto: PaginationDto, callback?: (query: SelectQueryBuilder<Entity>) => void): Promise<PaginationResponse<Entity>>;
    getAutocompleteWithPagination(paginationDto: PaginationDto, filter: BaseFilterDto, callback?: (query: SelectQueryBuilder<Entity>) => void): Promise<PaginationResponse<Entity>>;
}
