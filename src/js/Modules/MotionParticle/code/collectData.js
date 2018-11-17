class Data {
    constructor() {
        this.coordinateQuarter = [90, 180, 270, 360];
        this.maxDuration = 15;
        this.maxRadius = 15;
        this.angleRotation = Math.PI / 180;
    }
    collect(data) {
        const gapsDegrees = 360 / data.quantity;
        const induction = 5 / data.induction;
        let degree = 0;
        let options = [];
        for (let i = 0; i < data.quantity; i++) {
            let degreeThis = (degree += gapsDegrees);
            const quarter = this.getCoordinateQuarter(degreeThis);
            const rotateValue = this.getRotateValue(quarter, degreeThis);
            const radius = this.getRadius(data, induction);
            const { sign, signAngle } = this.getSigns(quarter);
            const aClockwise = data.charge ? !(sign > 0) : sign > 0;
            const increase = (radius / 180) * (data.charge ? sign : signAngle);
            options.push({
                charge: data.charge,
                radius: radius * sign,
                size: data.size,
                increase: increase,
                aClockwise: aClockwise,
                position: {
                    x: this.getMathSin(degreeThis) * radius,
                    y: 0,
                    z: this.getMathSin(rotateValue) * radius * signAngle,
                },
                rotate: {
                    x: 0,
                    y: -physics.inRad(rotateValue),
                    z: 0,
                },
                angle: {
                    x: this.angleRotation,
                    y: this.angleRotation,
                    z: this.angleRotation,
                },
                y: 0,
            });
        }
        return options;
    }
    getCoordinateQuarter(val) {
        if (val > 90) {
            let quarter = 0;
            this.coordinateQuarter.forEach((el, i) => {
                const next = i + 1;
                if (this.coordinateQuarter[next] === undefined) return next;
                if (val > el && val <= this.coordinateQuarter[next]) {
                    return (quarter = next);
                }
            });
            return quarter;
        } else {
            return 0;
        }
    }
    getRadius(data, induction) {
        return (data.duration / this.maxDuration) * this.maxRadius * induction;
    }
    getSigns(quarter) {
        const quarterSign = quarter === 1 || quarter === 3;
        return {
            sign: quarterSign ? 1 : -1,
            signAngle: quarterSign ? -1 : 1,
        };
    }
    getRotateValue(quarter, degreeThis) {
        if (degreeThis > 90) {
            return 90 * (quarter + 1) - (degreeThis - 90 * quarter);
        } else {
            return 90 - degreeThis;
        }
    }
    getMathSin(value) {
        return Math.sin(physics.inRad(value));
    }
}

export default Data;
