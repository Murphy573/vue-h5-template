/**
 * 渠道号
 */

export const CHANNEL_NO = {
  CHINALIFE: 1,
  MALL_SELF: -1
};

/**
 * 渠道对应的api key
 */
export const CHANNEL_NO_ENV = {
  [CHANNEL_NO.CHINALIFE]: 'CHINALIFE_API',
  [CHANNEL_NO.MALL_SELF]: 'MALL_SELF'
};

// 当前渠道号
export const CHANNEL_NO_CURRENT = Number(process.env.VUE_APP_CHANNEL_NO);
