import { RefObject, useRef } from 'react';
import QueryAndTable from '@/components/QueryAndTable';
import { useBeforeRouterEnter } from '@/hooks/useBeforeRouterEnter';
import { usePermission } from '@/hooks/usePermission';

const Query: React.FC = () => {
    usePermission();
    useBeforeRouterEnter(false);

    const ref = useRef<{
        containerRef: RefObject<HTMLDivElement>;
        queryDivRef: RefObject<HTMLDivElement>;
        tableRef: RefObject<HTMLDivElement>;
    }>(null);

    return (
        <QueryAndTable
            queryItems={[
                { label: '姓名', name: 'name' },
                { label: '性别', name: 'gender', type: 'select' },
                { label: '出生日期范围', name: 'birth', type: 'date-range' },
            ]}
            queryUrl=""
            columns={[
                { title: '姓名', dataIndex: 'name', width: 100 },
                { title: '性别', dataIndex: 'gender', width: 100 },
                { title: '出生日期', dataIndex: 'birth', width: 100 },
            ]}
            fitHeight
            ref={ref}
        />
    );
};

export default Query;
