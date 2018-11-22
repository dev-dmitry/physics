export class Calc{
     static inRad(num: number) {
        return (num * Math.PI) / 180;
    }
    static getCoordinateQuarter(val: number) {
        const coordinateQuarter = [90, 180, 270, 360];
        if (val > 90) {
            let quarter = 0;
            coordinateQuarter.forEach((el, i) => {
                const next = i + 1;
                if (coordinateQuarter[next] === undefined) return next;
                if (val > el && val <= coordinateQuarter[next]) {
                    return (quarter = next);
                }
            });
            return quarter;
        } else {
            return 0;
        }
    }
}

