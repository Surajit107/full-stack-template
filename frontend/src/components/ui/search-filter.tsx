import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X, Sparkles } from 'lucide-react';

export interface SearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (value: 'asc' | 'desc') => void;
  onClearFilters: () => void;
}

export function SearchFilter({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  onClearFilters,
}: SearchFilterProps) {
  const hasActiveFilters = search || statusFilter !== 'all' || sortBy !== 'createdAt' || sortOrder !== 'desc';

  return (
    <div className="space-y-4">
      {/* Search and Filters Row */}
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-0 group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
          <Input
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 hover:border-primary/50"
            suppressHydrationWarning
          />
          {search && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            </div>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-full sm:w-[140px] lg:w-[160px] transition-all duration-200 hover:border-primary/50 focus:ring-2 focus:ring-primary/20" suppressHydrationWarning>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="inactive">Inactive Only</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort By */}
          <Select value={sortBy} onValueChange={onSortByChange}>
            <SelectTrigger className="w-full sm:w-[140px] lg:w-[160px] transition-all duration-200 hover:border-primary/50 focus:ring-2 focus:ring-primary/20" suppressHydrationWarning>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Created Date</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="age">Age</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort Order */}
          <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => onSortOrderChange(value)}>
            <SelectTrigger className="w-full sm:w-[120px] transition-all duration-200 hover:border-primary/50 focus:ring-2 focus:ring-primary/20" suppressHydrationWarning>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="flex items-center gap-2 w-full sm:w-auto transition-all duration-200 hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive"
              suppressHydrationWarning
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">Clear</span>
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-300">
          {search && (
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-sm hover:bg-primary/20 transition-colors duration-200">
              <span className="text-primary font-medium">Search:</span>
              <span className="font-medium text-foreground">{search}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSearchChange('')}
                className="h-4 w-4 p-0 hover:bg-transparent hover:text-destructive transition-colors duration-200"
                suppressHydrationWarning
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
          {statusFilter !== 'all' && (
            <div className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full text-sm border hover:bg-secondary/80 transition-colors duration-200">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-medium text-foreground capitalize">{statusFilter}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onStatusFilterChange('all')}
                className="h-4 w-4 p-0 hover:bg-transparent hover:text-destructive transition-colors duration-200"
                suppressHydrationWarning
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
          {sortBy !== 'createdAt' && (
            <div className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full text-sm border hover:bg-secondary/80 transition-colors duration-200">
              <span className="text-muted-foreground">Sort:</span>
              <span className="font-medium text-foreground capitalize">{sortBy}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSortByChange('createdAt')}
                className="h-4 w-4 p-0 hover:bg-transparent hover:text-destructive transition-colors duration-200"
                suppressHydrationWarning
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}