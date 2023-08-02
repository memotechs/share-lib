import decamelize from 'decamelize';
import { SetMetadata, applyDecorators } from '@nestjs/common';

export interface Schema {
  name?: string;
  defaultSortingField?: string;
  auto?: boolean;
}

export const SCHEMA_METADATA = '__schemaMetadata__';

export const Schema = (options: Schema = {}): ClassDecorator =>
  applyDecorators((target: object, key?: any, descriptor?: any) =>
    SetMetadata(SCHEMA_METADATA, {
      name:
        options.name ||
        decamelize((target as any).name, {
          separator: '-',
          preserveConsecutiveUppercase: false,
        }),
      defaultSortingField: options.defaultSortingField,
    })(target, key, descriptor),
  );
