import { DataSource, DataSourceOptions } from 'typeorm';

export class DataSourceManager {
  private static instance: DataSourceManager;

  private readonly dataSources: { [key: string]: DataSource } = {};

  private constructor() {}

  public static getInstance(): DataSourceManager {
    if (!DataSourceManager.instance) {
      DataSourceManager.instance = new DataSourceManager();
    }

    return DataSourceManager.instance;
  }

  async getDataSource(
    dataSourceName: string,
    options: DataSourceOptions,
  ): Promise<DataSource> {
    if (this.dataSources[dataSourceName]) {
      const dataSource = this.dataSources[dataSourceName];
      return dataSource.isInitialized
        ? dataSource
        : await dataSource.initialize();
    }

    const newDataSource = new DataSource(options);

    this.dataSources[dataSourceName] = newDataSource;

    return newDataSource.initialize();
  }

  async close(): Promise<void> {
    for (const key in this.dataSources) {
      const dataSource = this.dataSources[key];
      if (dataSource.isInitialized) {
        await dataSource.destroy();
      }
    }
  }
}
