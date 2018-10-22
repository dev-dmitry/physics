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