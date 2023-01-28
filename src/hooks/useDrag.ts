import { useRef, useState, useEffect, RefObject } from 'react';

interface OptionImpl {
    // 水平方向能否拖拽
    canX: boolean,
    // 垂直方向能否拖拽
    canY: boolean,
    // 左侧最大拖拽偏移量，最大为 0
    leftMaxOffset: number,
    // 右侧最大拖拽偏移量，最小为 0
    rightMaxOffset: number,
    // 上侧最大拖拽偏移量，最大为 0
    upMaxOffset: number,
    // 下侧最大拖拽偏移量，最小为 0
    downMaxOffset: number,
}

interface ReturnImpl {
    // 应用拖拽 DOM 元素
    draggableRef: RefObject<HTMLDivElement>,
    // 禁止响应拖拽的 DOM 元素
    preventRef: RefObject<HTMLDivElement>,
    // x 偏移量
    offsetX: number,
    // y 偏移量
    offsetY: number,
}

const defaultOptions: OptionImpl = {
    canX: true,
    canY: true,
    leftMaxOffset: -Infinity,
    rightMaxOffset: Infinity,
    upMaxOffset: -Infinity,
    downMaxOffset: Infinity,
}

/**
 * 拖拽hook
 * @param options 拖拽配置参数
 * @returns 
 */
export const useDrag = (options?: Partial<OptionImpl>): ReturnImpl => {
    const ref = useRef<HTMLDivElement>(null);
    const preventRef = useRef<HTMLDivElement>(null);
    const [offsetX, setOffsetX] = useState<number>(0);
    const [offsetY, setOffsetY] = useState<number>(0);
    const { canX, canY, leftMaxOffset, rightMaxOffset, upMaxOffset, downMaxOffset } = { ...defaultOptions, ...options };

    useEffect(() => {
        if (ref.current) {
            let x: number;
            let y: number;

            const setOffset = (can: boolean, min: number, max: number, res: number): number => {
                if (!can) {
                    return 0;
                } else {
                    min = Math.min(min, 0);
                    max = Math.max(max, 0);
                    if (res < min) {
                        return min;
                    } else if (res > max) {
                        return max;
                    } else {
                        return res;
                    }
                }
            };

            const move = (event: MouseEvent): void => {
                if (ref.current) {
                    let offsetX: number = setOffset(canX, leftMaxOffset, rightMaxOffset, event.pageX - x);
                    let offsetY: number = setOffset(canY, upMaxOffset, downMaxOffset, event.pageY - y);
                    ref.current.style.translate = `${offsetX}px ${offsetY}px`;
                    setOffsetX(offsetX);
                    setOffsetY(offsetY);
                }
            };

            const onMouseDown = (event: MouseEvent): void => {
                const arr: string[] = getComputedStyle(current).translate.split('px');
                const translateX: number = isNaN(+arr[0]) ? 0 : +arr[0];
                const translateY: number = isNaN(+arr[1]) ? 0 : +arr[1];
                x = event.pageX - translateX;
                y = event.pageY - translateY;
                window.addEventListener('mousemove', move);
            };

            const onMouseUp = (): void => {
                window.removeEventListener('mousemove', move);
            };

            const { current } = ref;
            current.addEventListener('mousedown', onMouseDown);
            window.addEventListener('mouseup', onMouseUp);

            return (): void => {
                current.removeEventListener('mousedown', onMouseDown);
                window.removeEventListener('mouseup', onMouseUp);
                window.removeEventListener('mousemove', move);
            };
        }
    }, [canX, canY, leftMaxOffset, rightMaxOffset, upMaxOffset, downMaxOffset]);

    useEffect(() => {
        if (preventRef.current) {
            const { current } = preventRef;
            const stop = (event: MouseEvent): void => event.stopPropagation();
            current.addEventListener('mousedown', stop);
            return (): void => {
                current.removeEventListener('mousedown', stop);
            };
        }
    }, []);

    return {
        draggableRef: ref,
        preventRef,
        offsetX,
        offsetY,
    };
};
