import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import {
  TypesenseModuleAsyncOptions,
  TypesenseOptionsFactory,
  TypesenseModuleOptions,
} from './typesense-module.interface';
import { TYPESENSE_MODULE_OPTIONS } from './typesense.constants';
import {
  createTypesenseExportsProvider,
  createTypesenseOptionsProvider,
} from './typesense.providers';

@Module({
  imports: [DiscoveryModule],
})
export class TypesenseModule {
  static register(options: TypesenseModuleOptions = {}): DynamicModule {
    const optionsProviders = createTypesenseOptionsProvider(options);
    const exportsProviders = createTypesenseExportsProvider();

    return {
      global: true,
      module: TypesenseModule,
      providers: [...optionsProviders, ...exportsProviders],
      exports: exportsProviders,
    };
  }

  static registerAsync(options: TypesenseModuleAsyncOptions): DynamicModule {
    const exportsProviders = createTypesenseExportsProvider();

    return {
      global: true,
      module: TypesenseModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options), ...exportsProviders],
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
        provide: options?.useClass,
        useClass: options?.useClass,
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
      inject: [options?.useExisting || options?.useClass],
    };
  }
}
