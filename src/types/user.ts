import { Role } from "./shared";

// user信息接口
export default interface UserImpl {
    user: string,
    avatar: string,
    token: string,
    role: Role,
}
