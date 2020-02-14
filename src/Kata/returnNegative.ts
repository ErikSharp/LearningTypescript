import { assert } from "../utils/asserts";

export function kataReturnNegative() {
    function makeNegative(num: number): number {
        if (num < 0) {
            return num;
        } else if (num > 0) {
            return num * -1;
        } else {
            return num;
        }
    }

    function makeNegativeBetter(num: number): number {
        return -Math.abs(num);
    }

    assert(makeNegative(1) === -1);
    assert(makeNegative(-5) === -5);
    assert(makeNegative(0) === 0);
}
