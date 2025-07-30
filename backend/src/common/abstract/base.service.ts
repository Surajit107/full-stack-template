import { Injectable, NotFoundException } from '@nestjs/common';
import { IBaseService, IPaginatedResponse, IPaginationMeta } from '@interfaces/base.interface';
import { IBaseRepository } from '@interfaces/base.interface';

@Injectable()
export abstract class BaseService<T, CreateDto, UpdateDto> implements IBaseService<T, CreateDto, UpdateDto> {
  constructor(protected readonly repository: IBaseRepository<T>) {}

  async create(createDto: CreateDto): Promise<T> {
    return await this.repository.create(createDto as Partial<T>);
  }

  async findById(id: string): Promise<T> {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return entity;
  }

  async findAll(query?: any): Promise<T[]> {
    return await this.repository.findAll(query);
  }

  async update(id: string, updateDto: UpdateDto): Promise<T> {
    const entity = await this.repository.update(id, updateDto as Partial<T>);
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return entity;
  }

  async delete(id: string): Promise<T> {
    const entity = await this.repository.delete(id);
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return entity;
  }

  async count(): Promise<number> {
    return await this.repository.count();
  }

  protected calculatePaginationMeta(total: number, page: number, limit: number): IPaginationMeta {
    const totalPages = Math.ceil(total / limit);
    return {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };
  }

  protected createPaginatedResponse<T>(data: T[], meta: IPaginationMeta): IPaginatedResponse<T> {
    return { data, meta };
  }
} 