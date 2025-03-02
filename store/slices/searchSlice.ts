import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { search } from '@/services/search';
import { SearchRequest, SearchResult } from '@/types/search';

interface SearchState {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  query: string;
}

const initialState: SearchState = {
  results: [],
  loading: false,
  error: '搜索失败',
  query: '',
};

// 创建异步 Action
export const searchAsync = createAsyncThunk(
  'search/searchContent',
  async (request: SearchRequest) => {
    const response = await search(request.query);
    return response;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAsync.fulfilled, (state, action: PayloadAction<SearchResult[]>) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '搜索失败';
      });
  },
});

export const { setQuery, clearResults } = searchSlice.actions;
export default searchSlice.reducer;