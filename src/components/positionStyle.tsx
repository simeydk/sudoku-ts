export default function positionStyle(width: number, height: number, left?: number, top?: number) {
    const style: any = {};
    style.width = width + 'px';
    style.height = height + 'px';
    if (left !== null) {
        style.left = left + 'px';
    }
    if (top !== null) {
        style.top = top + 'px';
    }
    return style;
}