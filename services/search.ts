import api from '@/network/api';
import { SearchRequest, SearchResponse, SearchResult, GPTSummary, GoogleResult } from '@/types/search';

/**
 * 执行搜索请求
 * @param query 搜索关键词
 * @returns 搜索结果
 */
export const searchContent = async ({query}: SearchRequest): Promise<SearchResponse> => {
  try {
    const response = await api.post<SearchResponse>('/api/search', { query });
    return response.data;
  } catch (error) {
    console.error('搜索请求失败:', error);
    throw error;
  }
};

/**
 * 将 GPT 摘要转换为搜索结果格式
 */
export const convertGPTSummaryToResult = (summary: GPTSummary): SearchResult => {
  return {
    id: summary.id,
    title: summary.title,
    content: summary.content,
    date: summary.date,
    link: null,
    thumbnail_link: null,
    score: 1.0 // GPT 摘要通常具有最高优先级
  };
};

/**
 * 将 Google 结果转换为搜索结果格式
 */
export const convertGoogleResultToResult = (result: GoogleResult): SearchResult => {
  return {
    id: result.id,
    title: result.title,
    content: result.snippet,
    date: result.date,
    link: result.link,
    thumbnail_link: result.thumbnail_link,
    score: 0.8 // Google 结果优先级稍低
  };
};

/**
 * 获取所有搜索结果（包括 GPT 摘要和 Google 结果）
 */
export const getAllSearchResults = (searchResponse: SearchResponse): SearchResult[] => {
  const results: SearchResult[] = [];
  
  // 添加 GPT 摘要
  if (searchResponse.gpt_summary) {
    results.push(convertGPTSummaryToResult(searchResponse.gpt_summary));
  }
  
  // 添加 Google 结果
  if (searchResponse.google_results && searchResponse.google_results.length > 0) {
    results.push(...searchResponse.google_results.map(convertGoogleResultToResult));
  }
  
  return results;
};

/**
 * 在组件中使用示例
 */
export const search = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await searchContent({query});
    // 如果需要统一格式的结果
    const allResults = getAllSearchResults(response);
    return allResults
  } catch (error) {
    console.error('搜索失败:', error);
    throw error;
  }
};