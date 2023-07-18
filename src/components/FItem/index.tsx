import { Form, Input, Select, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

export type FItemType = 'input' | 'select' | 'date-range';

export interface FItemPropsImpl {
    type?: FItemType;
    name: string;
    label: string;
    options?: { label: string; value: string }[];
    children?: any;
}

const FItem = (props: FItemPropsImpl) => {
    const { type, label, options, children, ...others } = props;

    const renderItem = () => {
        if (children) {
            return children;
        }
        switch (type) {
            case 'input':
                return <Input allowClear placeholder={`请输入${label}`} />;
            case 'select':
                return <Select options={options} allowClear placeholder={`请选择${label}`} />;
            case 'date-range':
                return <RangePicker allowClear />;
            default:
                return <Input allowClear placeholder={`请输入${label}`} />;
        }
    };

    return (
        <Form.Item {...others} label={label}>
            {renderItem()}
        </Form.Item>
    );
};

export default FItem;
