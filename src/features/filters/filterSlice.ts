import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  searchQuery: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'none' | 'price-asc' | 'price-desc' | 'rating' | 'name';
}

const initialState: FilterState = {
  searchQuery: '',
  category: 'all',
  minPrice: 0,
  maxPrice: 10000,
  minRating: 0,
  sortBy: 'none',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    
    setMinRating: (state, action: PayloadAction<number>) => {
      state.minRating = action.payload;
    },
    
    setSortBy: (state, action: PayloadAction<FilterState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    
    resetFilters: (state) => {
      state.searchQuery = '';
      state.category = 'all';
      state.minPrice = 0;
      state.maxPrice = 10000;
      state.minRating = 0;
      state.sortBy = 'none';
    },
  },
});

export const {
  setSearchQuery,
  setCategory,
  setPriceRange,
  setMinRating,
  setSortBy,
  resetFilters,
} = filterSlice.actions;

export const selectFilters = (state: { filter: FilterState }) => state.filter;

export default filterSlice.reducer;