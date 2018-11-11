import * as THREE from 'three';

class Particle{
    constructor(data, scene){
        this.scene = scene;
        this.data = data;
    }
    createParticles(i) {
        const geometry = new THREE.SphereBufferGeometry(this.data.props[i].size, 16, 16);
        const material = new THREE.MeshBasicMaterial();
        this.data.mesh[i] = new THREE.Mesh(geometry, material);
        this.scene.add(this.data.mesh[i]);
        this.motionParticle(i);
    }
    motionParticle(i) {
        let data = {
            i: i,
            radius: Math.abs(physics.inRad(this.data.props[i].radius)),
            angle: this.data.props[i].angle,
            charge: this.data.props[i].charge
        };
        this.calculationMotion({...data, axis: 'x', horizontal: true});
        this.calculationMotion({...data, axis: 'y', horizontal: false});
        this.calculationMotion({...data, axis: 'z', horizontal: true});
    }
    calculationMotion({radius, angle, charge, horizontal, axis, i}){
        const square = this.getSquare(i, axis, horizontal);
        const ordinate = horizontal ? Math.sin(angle[axis]) : Math.cos(angle[axis]);
        const chargeValue = charge ? 1 : -1;
        this.data.mesh[i].position[axis] += square * ordinate * chargeValue;
        angle[axis] += radius * chargeValue;
    }
    getSquare(i, axis, horizontal){
        const props = this.data.props[i];
        const divider = horizontal ? (props.position[axis] / Math.abs(props.radius)) : 1;
        return divider * physics.inRad(props.radius**2);
    }
}

export default Particle;
/*


import * as THREE from 'three';

class Particle{
    constructor(data, scene){
        this.scene = scene;
        this.data = data;
        this.calculation = [];
        this.axis = {
            x: { axis: 'x', horizontal: true },
            y: { axis: 'y', horizontal: false },
            z: { axis: 'z', horizontal: true }
        }
    }
    createParticles(i) {
        this.getCalculation(i);
        const geometry = new THREE.SphereBufferGeometry(this.data.props[i].size, 16, 16);
        const material = new THREE.MeshBasicMaterial();
        this.data.mesh[i] = new THREE.Mesh(geometry, material);
        this.scene.add(this.data.mesh[i]);
        this.motionParticle(i);
    }
    motionParticle(i) {
        this.calculationMotion({i, angle: this.data.props[i].angle, ...this.axis.x});
        this.calculationMotion({i, angle: this.data.props[i].angle, ...this.axis.y});
        this.calculationMotion({i, angle: this.data.props[i].angle, ...this.axis.z});
    }
    calculationMotion({i, angle, axis, horizontal}){
        const ordinate = horizontal ? Math.sin(angle[axis]) : Math.cos(angle[axis]);
        this.data.mesh[i].position[axis] += this.calculation[i][axis].angle * ordinate;
        angle[axis] += this.calculation[i][axis].radius;
    }
    getCalculation(i){
        const data = {
            i: i,
            radius: Math.abs(physics.inRad(this.data.props[i].radius)),
            angle: this.data.props[i].angle,
            charge: this.data.props[i].charge,
        };
        const object = {};
        object.x = this.getCalculationAxis({...data, ...this.axis.x});
        object.y = this.getCalculationAxis({...data, ...this.axis.y});
        object.z = this.getCalculationAxis({...data, ...this.axis.z});
        this.calculation.push(object)
    }
    getCalculationAxis({radius, charge, horizontal, axis, i}){
        const square = this.getSquare({axis, horizontal, props: this.data.props[i]});
        const chargeValue = charge ? 1 : -1;
        return{
            angle: square * chargeValue,
            radius: radius * chargeValue,
        }
    }
    getSquare({axis, horizontal, props}){
        const divider = horizontal ? (props.position[axis] / Math.abs(props.radius)) : 1;
        return divider * physics.inRad(props.radius**2);
    }
}

export default Particle;*/