import { DEV_PATH } from '@/types/variable';
/**
 * SWR配置，详见https://swr.vercel.app/zh-CN/docs/api
 */
export default {
    // 默认fetcher，使用fetch api
    fetcher: (url: string, init?: any) => fetch(`${DEV_PATH}${url}`, init).then(res => res.json()),
};

// post请求使用的fetcher
export const postFetcher = (url: string, init: { arg: any }) =>
    fetch(`${DEV_PATH}${url}`, {
        method: 'POST',
        body: JSON.stringify(init.arg),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
