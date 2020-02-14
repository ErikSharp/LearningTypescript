import { assert } from "../utils/asserts";

export function kataCountingDuplicates() {
    function duplicateCount(text: string): number {
        const lower = text.toLowerCase();
        let chars = lower.split("");
        let count = 0;
        let duplicates: string[] = [];

        for (let index = 0; index < chars.length; index++) {
            const char = chars[index];

            if (duplicates.indexOf(char) >= 0) {
                continue;
            }

            let filtered = chars.filter(c => c === char);
            let hasDuplicates = filtered.length > 1;
            if (hasDuplicates) {
                duplicates.push(char);
                count++;
            }
        }

        return count;
    }

    assert(duplicateCount("abcde") === 0);
    assert(duplicateCount("aabbcde") === 2);
    assert(duplicateCount("aabBcde") === 2);
    assert(duplicateCount("indivisibility") === 1);
    assert(duplicateCount("Indivisibilities") === 2);
    assert(duplicateCount("aA11") === 2);
    assert(duplicateCount("ABBA") === 2);
}
