import type { StatusCode } from "./shared";

// 通常响应接口
export interface ResponseImpl<Data = never> {
    code: StatusCode;
    message: string;
    data?: Data;
}

// 分页接口
// export interface IPaginationRequestStruct<TData = never> {
//     status: Status;
//     curPage: number;
//     totalCount: number;
//     hasNextPage: boolean;
//     data: TData[];
// }
