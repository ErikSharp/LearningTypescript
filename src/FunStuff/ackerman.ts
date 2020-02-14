let calls = 0;

// The Most Difficult Program to Compute? - Computerphile
// https://www.youtube.com/watch?v=i7sm9dzFtEI
export function ackerman(
    a: number,
    b: number
): { callCount: number; result: number } {
    calls++;
    let answer: number;

    if (a === 0) {
        answer = b + 1;
    } else if (b === 0) {
        answer = ackerman(a - 1, 1).result;
    } else {
        answer = ackerman(a - 1, ackerman(a, b - 1).result).result;
    }

    return { callCount: calls, result: answer };
}
