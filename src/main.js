import * as THREE from 'three';
import './style.scss';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.querySelector("#experience-canvas");
const sizes = {
  height: window.innerHeight,
  width: window.innerWidth
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 
  75, 
  sizes.width / sizes.height, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2) )

const textureLoader = new THREE.TextureLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( "/draco/ ");
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);





const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

window.addEventListener("resize", ()=> {
  sizes.height = window.innerHeight;
  sizes.width = window.innerWidth;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width,sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

const render = () => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;


  renderer.render( scene, camera );
  window.requestAnimationFrame(render);
}

render();
