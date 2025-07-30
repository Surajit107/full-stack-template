import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { IBaseRepository } from '@interfaces/base.interface';

@Injectable()
export abstract class BaseRepository<T extends Document> implements IBaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    const entity = new this.model(data);
    return await entity.save();
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async findAll(filter?: any, sort?: any, skip?: number, limit?: number): Promise<T[]> {
    let query = this.model.find(filter || {});
    
    if (sort) {
      query = query.sort(sort);
    }
    
    if (skip) {
      query = query.skip(skip);
    }
    
    if (limit) {
      query = query.limit(limit);
    }
    
    return await query.exec();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async count(filter?: any): Promise<number> {
    return await this.model.countDocuments(filter || {}).exec();
  }

  protected async findOneOrThrow(id: string): Promise<T> {
    const entity = await this.findById(id);
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return entity;
  }
} 