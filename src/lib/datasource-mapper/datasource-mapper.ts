import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../config';

export class DataSourceManager {
  private static instance: DataSourceManager;

  private dataSources: { [key: string]: DataSource };

  private constructor(private configService: ConfigService<DatabaseConfig>) {
    this.dataSources = {};
  }

  public static getInstance(): DataSourceManager {
    if (!DataSourceManager.instance) {
      // TODO: Fix DataSourceManager object instantiation
      // DataSourceManager.instance = new DataSourceManager();
    }

    return DataSourceManager.instance;
  }

  async getDBDataSource(dataSourceName: string): Promise<DataSource> {
    if (this.dataSources[dataSourceName]) {
      const dataSource = this.dataSources[dataSourceName];
      return dataSource.isInitialized
        ? dataSource
        : await dataSource.initialize();
    }

    const newDataSource = new DataSource({
      /** connection info */
    } as any);

    this.dataSources[dataSourceName] = newDataSource;

    return await newDataSource.initialize();
  }
}
