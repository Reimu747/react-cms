import { useBeforeRouterEnter } from '@/hooks/useBeforeRouterEnter';
import { useDrag } from '@/hooks/useDrag';
import { usePermission } from '@/hooks/usePermission';
import styles from './index.module.scss';

const DragPage: React.FC = () => {
    usePermission();
    useBeforeRouterEnter(false);

    const { dragRef: ref } = useDrag();
    const { dragRef: refY } = useDrag({ canX: false });
    const { dragRef: refX } = useDrag({ canY: false });
    const {
        dragRef: refXY,
        offsetX,
        offsetY,
    } = useDrag();
    const {dragRef: refLimited, offsetX: offsetXLimited, offsetY: offsetYLimited} = useDrag({
        leftMaxOffset: -100,
        rightMaxOffset: 100,
        upMaxOffset: -100,
        downMaxOffset: 100,
    });
    const { dragRef: refStop, preventRef } = useDrag();
    const { dragRef: refStopB, preventRef: preventRefB, moveRef: moveRefB } = useDrag();

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
            <div className={`${styles.drag} ${styles.dragB}`} ref={moveRefB}>
                <div>部分区域拖拽</div>
                <div className={styles.allow} ref={refStopB}>仅有此区域内响应拖拽</div>
            </div>
        </div>
    );
};

export default DragPage;
