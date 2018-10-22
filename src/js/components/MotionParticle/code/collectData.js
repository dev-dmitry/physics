class Data {
    constructor(){
        this.coordinateQuarter = [ 90, 180, 270, 360 ];
        this.maxDuration = 15;
        this.maxRadius = 15;
        this.angleRotation = Math.PI / 180;
    }
    collect(option){
        const data = option;
        const gapsDegrees = 360 / data.quantity;
        const induction = 5 / data.induction;
        let degree = 0;
        let options = [];
        for(let i = 0; i < data.quantity; i++ ){
            let degreeThis = degree += gapsDegrees;
            const quarter = this.getCoordinateQuarter(degreeThis);
            const rotateValue = degreeThis > 90 ? (90 * (quarter + 1) ) - ( degreeThis - (90 * quarter)) : 90 - degreeThis;
            const radius = ((data.duration / this.maxDuration) * this.maxRadius) * induction;
            const quarterSign = quarter === 1 || quarter === 3;
            const sign = quarterSign ? 1 : -1;
            const signAngle = quarterSign ? -1 : 1;
            options.push( {
                charge: data.charge,
                radius: radius * sign,
                size: data.size,
                increase: radius / 180 * (data.charge ? sign : signAngle),
                aClockwise: (data.charge ? !(sign > 0) : (sign > 0)),
                position: {
                    x: Math.sin(physics.inRad(degreeThis)) * radius,
                    y: 0,
                    z: (Math.sin(physics.inRad(rotateValue)) * radius) * signAngle,
                },
                rotate: {
                    x: 0,
                    y: -(physics.inRad(rotateValue)),
                    z: 0
                },
                angle: {
                    x: this.angleRotation,
                    y: this.angleRotation,
                    z: this.angleRotation,
                },
                y: 0,
            } )
        }
        return options
    }
    getCoordinateQuarter(val) {
        if(val > 90){
            let quarter = 0;
            this.coordinateQuarter.forEach((el, i)=>{
                const next = i+1;
                if( this.coordinateQuarter[next] === undefined ) return next;
                if(val > el && val <= this.coordinateQuarter[next] ){
                    return quarter = next;
                }
            });
            return quarter
        }else{
            return 0
        }
    }
}

export default Data;
