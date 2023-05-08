import { Repository, Connection, EntityManager } from 'typeorm';
import { EntityGeneric } from '../entity';

export class ServiceGeneric<
  Entity extends EntityGeneric,
  CustomRepository extends Repository<Entity>,
> {
  protected repository: CustomRepository;
  constructor(
    protected readonly connection: Connection | EntityManager,
    repositoryType: { new (): CustomRepository },
  ) {
    if (connection instanceof EntityManager) {
      this.repository = connection.getCustomRepository(repositoryType);
    } else {
      this.repository = connection.getCustomRepository(repositoryType);
    }
  }
}
