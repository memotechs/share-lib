import { DataSource, DataSourceOptions } from 'typeorm';

export class DataSourceManager {
  private static instance: DataSourceManager;

  private readonly dataSources: { [key: string]: DataSource } = {};

  private constructor(private options: DataSourceOptions) {}

  public static getInstance(options: DataSourceOptions): DataSourceManager {
    if (!DataSourceManager.instance) {
      DataSourceManager.instance = new DataSourceManager(options);
    }

    return DataSourceManager.instance;
  }

  async getDataSource(dataSourceName: string): Promise<DataSource> {
    if (this.dataSources[dataSourceName]) {
      const dataSource = this.dataSources[dataSourceName];
      return dataSource.isInitialized
        ? dataSource
        : await dataSource.initialize();
    }

    const newDataSource = new DataSource(this.options);

    this.dataSources[dataSourceName] = newDataSource;

    return newDataSource.initialize();
  }
}
