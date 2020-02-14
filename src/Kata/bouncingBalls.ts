import { assert } from "../utils/asserts";

export function kataBouncingBalls() {
    function bouncingBall(h: number, bounce: number, window: number): number {
        if (h <= 0 || bounce <= 0 || bounce >= 1 || window >= h) {
            return -1;
        }

        let sightings = 0;
        while (true) {
            sightings++;
            h *= bounce;
            if (h > window) {
                sightings++;
                continue;
            } else {
                break;
            }
        }
        return sightings;
    }

    assert(bouncingBall(3.0, 0.66, 1.5) === 3);
    assert(bouncingBall(30.0, 0.66, 1.5) === 15);
    assert(bouncingBall(30, 0.75, 1.5) === 21);
    assert(bouncingBall(30, 0.4, 10) === 3);

    assert(bouncingBall(0, 0.66, 1.5) === -1, "h must be > 0");
    assert(bouncingBall(10, -1, 1.5) === -1, "bounce must be > 0");
    assert(bouncingBall(10, 1, 1.5) === -1, "bounce must be < 1");
    assert(bouncingBall(10, 0.1, 15) === -1, "h must be greater than window");
}
