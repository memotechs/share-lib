import type { FieldType } from '../decorator/field.decorator';

export interface SchemaField {
  name: string;
  type: FieldType;
  optional?: boolean;
  facet?: boolean;
  index?: boolean;
  sort?: boolean;
  locale?: string;
  infix?: boolean;
  num_dim?: number;
  [t: string]: unknown;
}

export interface Schema {
  name: string;
  fields: Array<SchemaField>;
  enable_nested_fields?: boolean;
  defaultSortingField?: string;
}
