import { EntityGeneric } from './entity.generic';

describe('EntityGeneric', () => {
  let entity: EntityGeneric;

  beforeEach(() => {
    entity = new EntityGeneric();
  });

  it('should have an id property', () => {
    expect(entity).toHaveProperty('id');
    expect(entity.id).toBeUndefined(); // Assuming the constructor sets id as undefined
  });

  it('should have a createdAt property', () => {
    expect(entity).toHaveProperty('createdAt');
    expect(entity.createdAt).toBeInstanceOf(Date);
  });

  it('should have an updatedAt property', () => {
    expect(entity).toHaveProperty('updatedAt');
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });

  it('should have a createdBy property', () => {
    expect(entity).toHaveProperty('createdBy');
    expect(entity.createdBy).toBeUndefined(); // Assuming createdBy is not set in the constructor
  });

  it('should have an updatedBy property', () => {
    expect(entity).toHaveProperty('updatedBy');
    expect(entity.updatedBy).toBeUndefined(); // Assuming updatedBy is not set in the constructor
  });

  it('should have a state property', () => {
    expect(entity).toHaveProperty('state');
    expect(entity.state).toBeUndefined(); // Assuming state is not set in the constructor
  });

  it('should have a version property', () => {
    expect(entity).toHaveProperty('version');
    expect(entity.version).toBeUndefined(); // Assuming version is not set in the constructor
  });
});
