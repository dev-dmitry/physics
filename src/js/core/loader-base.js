import * as THREE from 'three';
let OrbitControls = require('three-orbit-controls')(THREE);
import AxisHelper from './utils/axis';

class LoaderBase {
    constructor() {
        this.dom = {
            html: document.documentElement,
            container: document.querySelector('.loader'),
        };
        this.dom.html.classList.add('loading');
        this.raf = null;
        this.setupDebug();
        this.setupTime();
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupControls();
        this.setupHelpers();
        this.listen();
        this.onResize();
    }
    updateBase() {
        this.deltaTimeSeconds = this.clock.getDelta();
        if (this.diffTime) {
            this.deltaTimeSeconds -= this.diffTime;
            this.diffTime = 0;
        }
        this.deltaTimeSeconds *= this.timescale;
        this.deltaTimeMilliseconds = this.deltaTimeSeconds * 1000;
        if (this.isOrbit) {
            this.controls.update();
        }
    }
    setupDebug() {
        this.isGrid =//location.hash.indexOf('grid') > 0;
        this.isOrbit =//location.hash.indexOf('orbit') > 0;
        this.debugHash = '';
        this.isGrid = true;
        this.isOrbit = true;
    }
    setupTime() {
        this.timescale = 1;
        this.clock = new THREE.Clock();
        this.deltaTimeSeconds = this.clock.getDelta() * this.timescale;
        this.deltaTimeMilliseconds = this.deltaTimeSeconds * 1000;
    }
    setupScene() {
        this.scene = new THREE.Scene();
    }
    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(45, 0, 0.0001, 10000);
        //this.camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 5000);
        this.cameraBaseX = this.isGrid ? -20 : 0;
        this.cameraBaseY = this.isGrid ? 15 : 0;
        this.cameraBaseZ = this.isGrid ? 20 : 30;

        this.camera.position.x = this.cameraBaseX;
        this.camera.position.y = this.cameraBaseY;
        this.camera.position.z = this.cameraBaseZ;
    }
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.dom.container.appendChild(this.renderer.domElement);
    }
    setupControls() {
        if (this.isOrbit) {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.9;
            this.controls.enableKeys = false;
        }
    }
    setupHelpers() {
        if (this.isGrid) {
            this.gridOpacityMap = [
                0.4, // 1
                0.2, // 2
                0.2, // 3
                0.2, // 4
                0.1, // 5
                0.2, // 6
                0.1, // 7
                0.1  // 8
            ];
            this.gridHelper = new THREE.GridHelper(300, 60, 0xffffff, 0xffffff);
            this.gridHelper.material.transparent = true;
            this.gridHelper.material.opacity = this.gridOpacityMap[3];
            this.scene.add(this.gridHelper);

            this.axisOpacityMap = [
                1, // 1
                0.6, // 2
                0.6, // 3
                0.6, // 4
                0.3, // 5
                0.6, // 6
                0.3, // 7
                0.3  // 8
            ];
            this.axisHelper = new AxisHelper(150, this.axisOpacityMap[3]);
            this.scene.add(this.axisHelper);
            this.camera.lookAt(new THREE.Vector3());
        }
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    listen() {
        window.addEventListener('resize', (e) => this.onResize(e));
    }
    replay() {
        document.documentElement.classList.remove('completed');
        document.documentElement.classList.add('loading');

        this.camera.position.x = this.cameraBaseX;
        this.camera.position.y = this.cameraBaseY;
        this.camera.position.z = this.cameraBaseZ;

        this.timescale = 1;
        this.deltaTimeSeconds = 1 / 60;
        this.deltaTimeMilliseconds = this.deltaTimeSeconds * 1000;
        this.blurTime = 0;
        this.diffTime = 0;
        this.focusTime = 0;
        this.clock.start();
        this.loop();
    }

    complete() {
        if (this.isOrbit || this.isGrid) {
            return;
        }
        setTimeout(() => {
            this.clock.stop();
            cancelAnimationFrame(this.raf);
        }, 600);
        this.dom.html.classList.remove('loading');
        this.dom.html.classList.add('completed');
    }

    onResize() {
        //TODO Передать размеры из app_main
        this.width = window.innerWidth - 350 ;
        this.height = window.innerHeight;
        this.dpr = window.devicePixelRatio > 1 ? 2 : 1;

        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setPixelRatio(this.dpr);
        this.renderer.setSize(this.width, this.height);
    }
    stop(){
        this.clock.stop();
        cancelAnimationFrame(this.raf);
    }
    loop() {
        this.updateBase();
        this.update();
        this.render();
        this.raf = window.requestAnimationFrame(() => this.loop());
    }
}

export default LoaderBase;