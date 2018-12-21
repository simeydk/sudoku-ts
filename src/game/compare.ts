
function genDynamicCompare(includeEqual = true) {
    if (includeEqual) {
        return (a: any, b: any) => (a >= b);
    }
    else {
        return (a: any, b: any) => (a > b);
    }
}
function isAscending(items: any[], includeEqual = true): boolean {
    const gt = genDynamicCompare(includeEqual);
    for (let i = 0; i < items.length - 1; i++) {
        if (!gt(items[i + 1], items[i])) {
            return false;
        }
    }
    return true;
}

export {genDynamicCompare, isAscending}