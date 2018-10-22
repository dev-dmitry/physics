import Circle from './circle';
import Particle from './particle';

class Particles {
    constructor(scene) {
        this.data = {
            props: [],
            mesh: [],
            meshCircle: []
        };
        this.countParticles = Number;
        this.scene = scene;
        this.circle = new Circle(this.data, this.scene);
        this.particle = new Particle(this.data, this.scene);
    }
    init(data){
        this.countParticles = data.length;
        this.clear();
        for(let i = 0; i < this.countParticles; i++){
            this.data.props.push(data[i]);
            this.data.mesh.push(0);
            this.data.meshCircle.push(0);
            this.particle.createParticles(i, this.data);
            this.circle.createCircle(i);
        }
    }
    update() {
        for(let i = 0; i < this.countParticles; i++){
            this.particle.motionParticle(i);
            const props = this.data.props[i];
            if ( (props.y + props.increase) <= 2 && (props.y + props.increase) >= -2 ){
                props.y += props.increase;
                this.circle.motionCircle(i)
            } else {
                props.y = props.aClockwise ? -2 : 2;
                this.circle.motionCircle(i)
            }
        }
    }
    clear(){
        for(let i = 0; i < this.data.meshCircle.length; i++){
            this.scene.remove(this.data.meshCircle[i], this.data.mesh[i]);
        }
        this.data.props = [];
        this.data.mesh = [];
        this.data.meshCircle = [];
    }
}

export default Particles;