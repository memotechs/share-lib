import { DynamicModule, Provider, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import {
  TypesenseModuleAsyncOptions,
  TypesenseOptionsFactory,
  TypesenseModuleOptions,
} from './interface.module';
import { TYPESENSE_MODULE_OPTIONS } from './typesense.constant';
import {
  createTypesenseExportsProvider,
  createTypesenseProvider,
  createTypesenseOptionsProvider,
} from './typesense.provider';

@Module({
  imports: [DiscoveryModule],
})
export class TypesenseModule {
  static register(options: TypesenseModuleOptions = {}): DynamicModule {
    const optionsProviders = createTypesenseOptionsProvider(options);
    const exportsProviders = createTypesenseExportsProvider();
    const providers = createTypesenseProvider();

    return {
      global: true,
      module: TypesenseModule,
      providers: [...optionsProviders, ...providers, ...exportsProviders],
      exports: exportsProviders,
    };
  }

  static registerAsync(options: TypesenseModuleAsyncOptions): DynamicModule {
    const exportsProviders = createTypesenseExportsProvider();
    const providers = createTypesenseProvider();

    return {
      global: true,
      module: TypesenseModule,
      imports: options.imports || [],
      providers: [
        ...this.createAsyncProviders(options),
        ...providers,
        ...exportsProviders,
      ],
      exports: exportsProviders,
    };
  }

  private static createAsyncProviders(
    options: TypesenseModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        provide: options.useClass!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        useClass: options.useClass!,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: TypesenseModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: TYPESENSE_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: TYPESENSE_MODULE_OPTIONS,
      useFactory: (optionsFactory: TypesenseOptionsFactory) =>
        optionsFactory.createTypesenseOptions(),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      inject: [options.useExisting! || options.useClass!],
    };
  }
}
