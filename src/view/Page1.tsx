import { useBeforeRouterEnter } from '@/hooks/useBeforeRouterEnter';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { increment } from '@/store/slice/countSlice';

const View: React.FC = () => {
    const count = useAppSelector(state => state.countReducer.count);
    const dispatch = useAppDispatch();
    const onIncrement = () => dispatch(increment(5));

    useBeforeRouterEnter(false);

    return (
        <div>
            page1
            <hr />
            {count}
            <button onClick={onIncrement}>+5</button>
        </div>
    );
};

export default View;
