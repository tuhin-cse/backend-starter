import { Model, Schema } from 'mongoose';

export interface PaginateOptions {
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
  select?: string;
  populate?: any;
}

export interface PaginateResult<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function mongoosePaginationPlugin(schema: Schema) {
  schema.statics.paginate = async function <T>(
    this: Model<T>,
    query: Record<string, any> = {},
    options: PaginateOptions = {},
  ): Promise<PaginateResult<T>> {
    const page = options.page ?? 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;
    const totalDocs = await this.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / limit);
    const dataQuery = this.find(query, options.select);
    if (options.sort) {
      dataQuery.sort(options.sort);
    }
    if (options.populate) {
      dataQuery.populate(options.populate);
    }
    const docs = await dataQuery.skip(skip).limit(limit);
    return {
      page,
      limit,
      totalDocs,
      totalPages,
      docs,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  };
}

export interface PaginateModel<T> extends Model<T> {
  paginate(
    query: Record<string, any>,
    options: PaginateOptions,
  ): Promise<PaginateResult<T>>;
}
