const callOut = document.getElementById('callOut');
callOut.onclick = function () {
  const callOutPhone = document.getElementById('callOutPhone');
  callOutPhone.href = 'tel:17347315273';
  callOutPhone.click();
};

function typewriter () {
  const text = '湘A · 32VC1';
  let str_ = '';
  let i = 0;
  const content = document.querySelector('.licensePlateNumber span');
  const timer = setInterval(() => {
    str_ += text[i];
    content.innerHTML = str_;
    i++;
    if (i >= text.length) {
      clearInterval(timer);
    }
  }, 160);
}

setTimeout(() => {
  typewriter();
}, 3600);

let scene, camera, cameraCtrl, renderer, model, manager, isLoad, isTween;
const carDom = document.querySelector('.ref3DCar');

function init3dCar () {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  cameraCtrl = new THREE.OrbitControls(camera);

  manager = new THREE.LoadingManager();
  const dom = document.querySelector('.load');
  const candle = document.querySelector('.ref3DCar .candle');
  manager.onProgress = (url, loaded, total) => {
    if (Math.floor(loaded / total * 100) === 100) {
      dom.style.opacity = 0;
      isLoad = true;
      if (isTween) tween();
    } else {
      candle.style.opacity = 0;
      candle.style.pointerEvents = 'none';
      dom.style.opacity = 1;
      dom.innerHTML = '加载进度 ' + Math.floor(loaded / total * 100) + ' %';
      candle.style.display = 'none';
    }
  };

  cameraCtrl.enableDamping = true;
  cameraCtrl.dampingFactor = 0.25;
  cameraCtrl.target.set(0, 0, 0);
  cameraCtrl.enablePan = false;
  cameraCtrl.maxPolarAngle = 1.5;
  cameraCtrl.minDistance = 120;
  cameraCtrl.maxDistance = 360;

  renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
  renderer.setSize(carDom.clientWidth, carDom.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearAlpha(0);
  carDom.appendChild(renderer.domElement);

  setLight();
  initModel();
  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);
  animate();
}

function setLight () {
  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, .3);
  scene.add(ambientLight);

  new THREE.RGBELoader(manager)
    .setDataType(THREE.UnsignedByteType)
    .load('./sky.hdr', function (texture) {
      scene.environment = texture;
      // scene.background = texture;
      texture.mapping = THREE.EquirectangularReflectionMapping;
    });
};

function initModel () {
  new THREE.GLTFLoader(manager).load('./car.glb', function (gltf) {
    model = gltf.scene;
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.scale.set(0.03, 0.03, 0.03);
    scene.add(gltf.scene);
  });
}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate () {
  cameraCtrl.update();
  (function anonymous () { debugger; })();
  // console.log(model?.position, camera.position);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

function tween () {
  TweenMax.to(camera.position, 2, {
    x: -342, y: 48, z: 106, onComplete: function () {
      model && TweenMax.to(model.position, 2, {
        x: 12, y: 36, z: 0, onComplete: function () {
          TweenMax.to(camera.position, 1, { x: -280, y: 98, z: 128 });
        }
      });
    }
  });
}

init3dCar();

setTimeout(() => {
  document.querySelector('.wrapper').style.transform = 'translate(-280px, -468px) scale(.3)';
  setTimeout(() => {
    carDom.style.opacity = 1;
    isTween = true;
    if (isLoad) tween();
  }, 1800);
}, 9600);
