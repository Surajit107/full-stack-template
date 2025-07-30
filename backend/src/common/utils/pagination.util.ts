import { IPaginationMeta } from '@interfaces/base.interface';

export class PaginationUtil {
  static calculatePaginationMeta(total: number, page: number, limit: number): IPaginationMeta {
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

  static validatePaginationParams(page: number, limit: number): { page: number; limit: number } {
    const validPage = Math.max(1, page);
    const validLimit = Math.min(Math.max(1, limit), 100); // Max 100 items per page
    return { page: validPage, limit: validLimit };
  }
} 