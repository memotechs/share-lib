import {
  CollectionSchema,
  CollectionFieldSchema,
} from 'typesense/lib/Typesense/Collection';

export interface SchemaField extends CollectionFieldSchema {
  name: string;
  facet?: boolean;
  index?: boolean;
  optional?: boolean;
  sort?: boolean;
}

export interface Schema extends CollectionSchema {
  name: string;
  defaultSortingField: string;
  fields: SchemaField[];
}
