import {
    useState,
    useEffect,
    useRef,
    useCallback,
    RefObject,
    forwardRef,
    useImperativeHandle,
    ForwardedRef,
} from 'react';
import { Form, Space, Button, Spin, Table, Col, Row } from 'antd';
import FItem, { FItemPropsImpl } from '@/components/FItem';
import styles from './style.module.scss';
import { ColumnType } from 'antd/es/table';
import { ResponseImpl } from '@/types/request';
import { ListModal } from '@/types/ListModal';
import { GETLIST_API } from '@/types/variable';
import { postFetcher } from '@/swr/swrConfig';
import useSWRMutation from 'swr/mutation';

interface PropsImpl {
    queryItems: FItemPropsImpl[];
    queryUrl: string;
    getQueryParams?: (values: any) => any;
    queryMethod?: 'get' | 'post';
    getDataSource?: (res: any) => any;
    getTotal?: (res: any) => number;
    columns: ColumnType<any>[];
    rowKey?: string | ((record: any) => string);
    isSearchOnMount?: true | false;
    fitHeight?: true | false;
}

const QueryAndTable = forwardRef(
    (
        props: PropsImpl,
        ref: ForwardedRef<{
            containerRef: RefObject<HTMLDivElement>;
            queryDivRef: RefObject<HTMLDivElement>;
            tableRef: RefObject<HTMLDivElement>;
        }>
    ) => {
        const {
            queryItems = [],
            queryUrl,
            getQueryParams = values => ({ ...values }),
            queryMethod = 'post',
            getDataSource = res => res?.data?.data,
            getTotal = res => res?.data?.totalCount,
            columns,
            rowKey = 'id',
            isSearchOnMount = true,
            fitHeight = false,
        } = props;
        // const [loading, setLoading] = useState<boolean>(false);
        const [pageNum, setPageNum] = useState<number>(1);
        const [pageSize, setPageSize] = useState<number>(10);
        const [total, setTotal] = useState<number>(0);
        const [dataSource, setDataSource] = useState<any[]>([]);
        const [isFirstMount, setIsFirstMount] = useState<boolean>(true);
        const [scrollY, setScrollY] = useState<number>(0);
        const [form] = Form.useForm();
        const containerRef = useRef<HTMLDivElement>(null);
        const queryDivRef = useRef<HTMLDivElement>(null);
        const tableRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(ref, () => ({
            containerRef,
            queryDivRef,
            tableRef,
        }));

        const { trigger, isMutating } = useSWRMutation(GETLIST_API, postFetcher);

        // 根据 pageNum pageSize，查询接口并设置 Table 数据
        const search = useCallback(
            async (pageNum: number, pageSize: number) => {
                try {
                    const values = form.getFieldsValue();
                    const params = { ...getQueryParams(values), pageNum, pageSize };
                    // const res = await ajax[queryMethod](queryUrl, params);
                    const res: ResponseImpl<ListModal> = await trigger({ ...params });
                    setDataSource(getDataSource(res));
                    setTotal(getTotal(res));
                    setPageNum(pageNum);
                    setPageSize(pageSize);
                } catch (error) {}
            },
            [form, getDataSource, getQueryParams, getTotal, queryMethod, queryUrl]
        );

        // 初次加载时回显 Table 数据
        useEffect(() => {
            const fetchData = async () => {
                if (isSearchOnMount && isFirstMount) {
                    setIsFirstMount(false);
                    search(1, 10);
                }
            };
            fetchData();
        }, [isFirstMount, isSearchOnMount, search]);

        // 初次加载时，设置监听器，控制 Table 的 scrollY
        useEffect(() => {
            const setY = () => {
                if (queryDivRef.current && containerRef.current) {
                    const rectBottom = queryDivRef.current.getBoundingClientRect().bottom;
                    const containerBottom = containerRef.current.getBoundingClientRect().bottom;
                    const tableHeight = containerBottom - rectBottom;
                    // 77 表头高度 32 分页器高度 20 上下 margin 值
                    const tableHeaderHeight = 77;
                    const paginationHeight = 32;
                    setScrollY(Math.max(tableHeight - tableHeaderHeight - paginationHeight - 32 - 20, 150));
                }
            };
            setIsFirstMount(false);
            setY();
            window.addEventListener('resize', setY);
            return () => window.removeEventListener('resize', setY);
        }, [dataSource.length]);

        const renderFormItems = () =>
            queryItems.map((item, index) => (
                <Col key={index} span={8}>
                    <FItem {...item} key={index} />
                </Col>
            ));

        const handleSubmit = async () => {
            try {
                search(1, pageSize);
            } finally {
            }
        };

        return (
            <div className={styles['container']} ref={containerRef}>
                <div className={styles['query-bar']} ref={queryDivRef}>
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                    >
                        <Row gutter={24}>{renderFormItems()}</Row>
                        <div style={{ width: '100%' }}></div>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    查询
                                </Button>
                                <Button onClick={() => form.resetFields()}>重置</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
                <div className={styles['table']} ref={tableRef}>
                    <Spin spinning={isMutating}>
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            pagination={{
                                pageSize,
                                current: pageNum,
                                total,
                                showTotal: total => `共${total}条数据`,
                                onChange: (pageNum, pageSize) => search(pageNum, pageSize),
                            }}
                            rowKey={rowKey}
                            scroll={{
                                y: fitHeight ? scrollY : undefined,
                            }}
                        />
                    </Spin>
                </div>
            </div>
        );
    }
);

export default QueryAndTable;
