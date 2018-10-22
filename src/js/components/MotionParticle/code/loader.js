import LoaderBase from '../../../core/loader-base';
import Particles from './particles';
import Data from "./collectData";

class Loader extends LoaderBase{
    constructor() {
        super();
        this.collectData = new Data();
        this.particles = new Particles(this.scene);
        this.render();
    }
    init(data){
        this.stop();
        const collect = this.collectData.collect(data);
        this.particles.init(collect);
        this.loop();
    }
    update() {
        this.particles.update()
    }
}

export default Loader;