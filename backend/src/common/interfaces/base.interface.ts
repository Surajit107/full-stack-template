export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(filter?: any, sort?: any, skip?: number, limit?: number): Promise<T[]>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
  count(filter?: any): Promise<number>;
}

export interface IBaseService<T, CreateDto, UpdateDto> {
  create(createDto: CreateDto): Promise<T>;
  findById(id: string): Promise<T>;
  findAll(query?: any): Promise<T[]>;
  update(id: string, updateDto: UpdateDto): Promise<T>;
  delete(id: string): Promise<T>;
  count(): Promise<number>;
}

export interface IBaseResolver<T, CreateDto, UpdateDto> {
  create(createDto: CreateDto): Promise<T>;
  findById(id: string): Promise<T>;
  findAll(query?: any): Promise<T[]>;
  update(id: string, updateDto: UpdateDto): Promise<T>;
  delete(id: string): Promise<T>;
}

export interface IPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IPaginatedResponse<T> {
  data: T[];
  meta: IPaginationMeta;
} 