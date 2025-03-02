/**
 * API 配置文件
 * 存放 API 相关的配置信息
 */

// 环境变量
const ENV = {
  development: 'development',
  production: 'production',
  test: 'test',
};

// 当前环境
const currentEnv = process.env.NODE_ENV || ENV.development;

// 不同环境的 API 基础 URL
const API_URLS = {
  [ENV.development]: 'http://127.0.0.1:8000',
  [ENV.production]: 'https://api.example.com',
  [ENV.test]: 'https://test-api.example.com',
};

// 导出配置
export const API_CONFIG = {
  BASE_URL: API_URLS[currentEnv],
  TIMEOUT: 10000, // 请求超时时间（毫秒）
  WITH_CREDENTIALS: true, // 是否携带 cookie
};

export default API_CONFIG;