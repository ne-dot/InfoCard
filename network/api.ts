/* eslint-disable no-console */
/**
 * API 请求工具
 * 封装常用的网络请求方法
 */
import { API_CONFIG } from '@/config/api.config';

// 请求配置类型
interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
  token?: string;
}

// 响应类型
// Define a generic data type for API responses
export type ApiData = Record<string, unknown> | Array<unknown> | string | number | boolean | null;

// Update response type
interface ApiResponse<T = ApiData> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

/**
 * 处理 URL 参数
 * @param url 基础 URL
 * @param params 参数对象
 * @returns 完整的 URL
 */
const handleUrl = (url: string, params?: Record<string, string | number | boolean>): string => {
  if (!params) return url;
  
  const queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
  
  return `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
};

/**
 * 发送请求的核心方法
 * @param url 请求地址
 * @param options 请求配置
 * @returns Promise<ApiResponse>
 */
const request = async <T = ApiData>(url: string, options: RequestOptions = {}): Promise<ApiResponse<T>> => {
  const { params, token, headers = {}, ...rest } = options;
  
  // 处理 URL 参数
  const fullUrl = handleUrl(`${API_CONFIG.BASE_URL}${url}`, params);
  
  // 设置请求头
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  };
  
  // 添加认证 token
  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  // 记录请求信息
  console.log(`🚀 发送请求: ${rest.method || 'GET'} ${fullUrl}`);
  console.log('📝 请求头:', requestHeaders);
  if (rest.body) {
    console.log('📦 请求体:', rest.body);
  }
  
  const startTime = Date.now();
  
  try {
    const response = await fetch(fullUrl, {
      headers: requestHeaders,
      ...rest,
    });
    
    const endTime = Date.now();
    console.log(`⏱️ 请求耗时: ${endTime - startTime}ms`);
    
    // 解析响应数据
    let data: T;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text() as unknown as T;
    }
    
    // 记录响应信息
    console.log(`🔄 响应状态: ${response.status} ${response.statusText}`);
    
    // 检查响应状态
    if (!response.ok) {
      console.error('❌ 请求失败:', {
        status: response.status,
        statusText: response.statusText,
        data,
      });
      
      throw {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    }
    
    // 记录成功响应
    console.log('✅ 请求成功');
    if (process.env.NODE_ENV !== 'production') {
      console.log('📄 响应数据:', data);
    }
    
    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  } catch (error) {
    console.error('🔥 请求异常:', error);
    
    if (error instanceof Error) {
      throw new Error(`API 请求错误: ${error.message}`);
    }
    throw error;
  }
};

/**
 * GET 请求
 * @param url 请求地址
 * @param options 请求配置
 * @returns Promise<ApiResponse>
 */
export const get = <T = ApiData>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> => {
  return request<T>(url, { ...options, method: 'GET' });
};

/**
 * POST 请求
 * @param url 请求地址
 * @param data 请求体数据
 * @param options 请求配置
 * @returns Promise<ApiResponse>
 */
export const post = <T = ApiData>(url: string, data?: Record<string, unknown>, options?: RequestOptions): Promise<ApiResponse<T>> => {
  return request<T>(url, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
};

/**
 * PUT 请求
 * @param url 请求地址
 * @param data 请求体数据
 * @param options 请求配置
 * @returns Promise<ApiResponse>
 */
export const put = <T = ApiData>(url: string, data?: Record<string, unknown>, options?: RequestOptions): Promise<ApiResponse<T>> => {
  return request<T>(url, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
};

/**
 * DELETE 请求
 * @param url 请求地址
 * @param options 请求配置
 * @returns Promise<ApiResponse>
 */
export const del = <T = ApiData>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> => {
  return request<T>(url, { ...options, method: 'DELETE' });
};

/**
 * PATCH 请求
 * @param url 请求地址
 * @param data 请求体数据
 * @param options 请求配置
 * @returns Promise<ApiResponse>
 */
export const patch = <T = ApiData>(url: string, data?: Record<string, unknown>, options?: RequestOptions): Promise<ApiResponse<T>> => {
  return request<T>(url, {
    ...options,
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  });
};

// 导出默认对象
export default {
  get,
  post,
  put,
  delete: del,
  patch,
  request,
};