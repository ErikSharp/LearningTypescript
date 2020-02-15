export function kataIntroToArt() {
    function getW(height: number): string[] {
        if (height < 2) {
            return [];
        }

        const aster = "*";

        //Just in case floating point
        height = Math.floor(height);

        let lineMiddlePaddings = [0];
        for (let index = 1, value = 1; index < height; index++, value += 2) {
            lineMiddlePaddings.push(value);
        }

        let lineInnerPaddings = [...lineMiddlePaddings].reverse();

        let lines: string[] = [];
        for (let lineIndex = 0; lineIndex < height; lineIndex++) {
            //assumes es2015 (es6)
            let outer = " ".repeat(lineIndex);
            let inner = " ".repeat(lineInnerPaddings[lineIndex]);
            let middle = " ".repeat(lineMiddlePaddings[lineIndex]);

            let line =
                (outer ? outer + aster : aster) +
                (inner ? inner + aster : "") +
                (middle ? middle + aster : "") +
                (inner ? inner + aster : "") +
                outer;

            lines.push(line);
        }

        return lines;
    }

    let result = getW(5);
    result.forEach(l => console.log);
}
