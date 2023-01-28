import { useBeforeRouterEnter } from '@/hooks/useBeforeRouterEnter';
import { useDrag } from '@/hooks/useDrag';
import { usePermission } from '@/hooks/usePermission';
import styles from './index.module.scss';

const DragPage: React.FC = () => {
    usePermission();
    useBeforeRouterEnter(false);

    const { draggableRef: ref } = useDrag();
    const { draggableRef: refY } = useDrag({ canX: false });
    const { draggableRef: refX } = useDrag({ canY: false });
    const {
        draggableRef: refXY,
        offsetX,
        offsetY,
    } = useDrag();
    const {draggableRef: refLimited, offsetX: offsetXLimited, offsetY: offsetYLimited} = useDrag({
        leftMaxOffset: -100,
        rightMaxOffset: 100,
        upMaxOffset: -100,
        downMaxOffset: 100,
    });
    const { draggableRef: refStop, preventRef } = useDrag();

    return (
        <div className={styles.container}>
            <div className={styles.drag} ref={ref}>
                随意拖拽
            </div>
            <div className={styles.drag} ref={refY}>
                仅能垂直方向拖拽
            </div>
            <div className={styles.drag} ref={refX}>
                仅能水平方向拖拽
            </div>
            <div className={styles.drag} ref={refXY}>
                记录偏移量：
                offsetX: {offsetX} &nbsp;
                offsetY: {offsetY}
            </div>
            <div className={styles.drag} ref={refLimited}>
                限制拖拽区间：
                offsetX: {offsetXLimited} &nbsp;
                offsetY: {offsetYLimited}
            </div>
            <div className={`${styles.drag} ${styles.dragA}`} ref={refStop}>
                <div>部分区域拖拽</div>
                <div className={styles.stop} ref={preventRef}>此区域内不响应拖拽</div>
            </div>
        </div>
    );
};

export default DragPage;
