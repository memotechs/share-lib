import { Repository, Connection, EntityManager } from 'typeorm';
import { EntityGeneric } from '../entity';

export class ServiceGeneric<
  Entity extends EntityGeneric,
  CustomRepository extends Repository<Entity>,
> {
  protected repository: CustomRepository;
  protected connection: Connection | EntityManager;
  constructor(
    protected readonly connectionOrManager: Connection | EntityManager,
    repositoryType: { new (): CustomRepository },
  ) {
    if (connectionOrManager instanceof EntityManager) {
      this.connection = connectionOrManager;
    } else {
      this.connection = connectionOrManager;
    }
    this.repository = this.connection.getCustomRepository(repositoryType);
  }

  getWithPagination = () => {
    //
  };
}
