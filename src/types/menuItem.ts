// 菜单节点类型
export interface MenuItem {
    id: number,
    name: string,
    children?: MenuItem[],
    key: string,
    icon?: string,
    label: string,
};
