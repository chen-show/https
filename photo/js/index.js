//建议值[18,6]
var table = [];

var camera, scene, renderer;
var controls;

var objects = [];
var targets = { table: [], sphere: [], helix: [], grid: [] };

var audio = document.querySelector('#my_audio');

getImgs();
init();
animate();

function init () {
  // 相机
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 3000;
  // 场景
  scene = new THREE.Scene();

  // 渲染器
  renderer = new THREE.CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = 'absolute';
  document.getElementById('container').appendChild(renderer.domElement);

  // 轨道控制器
  controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.autoRotate = true; // 为true时，相机自动围绕目标旋转,但必须在animation循环中调用update()
  controls.autoRotateSpeed = 0.5; // 相机自动围绕目标旋转速度，默认2.0，代表每轮60fps用时30s,值越小转动越慢
  controls.rotateSpeed = 0.6; // 鼠标左键操作的旋转速度
  controls.minPolarAngle = 0; // 上下翻转范围 0-max度	
  controls.maxPolarAngle = Math.PI / 1; // 上下翻转范围 0-max度				
  controls.minDistance = 100; // 设置移动的最短距离（默认为零）
  controls.maxDistance = 6000; // 设置移动的最长距离（默认为无穷）
  // controls.addEventListener('change', render);


  for (var i = 0; i < table.length; i++) {

    var element = document.createElement('div');
    element.className = 'element';
    element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';

    var a = document.createElement('a');
    // a.href = './img/' + table[i][0];

    var image = new Image();
    image.src = './img/' + table[i][0];
    image.name = table[i][0];
    a.appendChild(image)

    element.appendChild(a);

    var object = new THREE.CSS3DObject(element);
    object.position.x = Math.random() * 4000 - 2000;
    object.position.y = Math.random() * 4000 - 2000;
    object.position.z = Math.random() * 4000 - 2000;
    scene.add(object);

    objects.push(object);

    var object = new THREE.Object3D();
    object.position.x = (table[i][1] * 140) - 1330;
    object.position.y = - (table[i][2] * 180) + 990;
    targets.table.push(object);

    image.addEventListener('load', function (event) {
      resizeImg(this, 120, 160);
    }, false);

  }

  // 球形
  var vector = new THREE.Vector3();

  for (var i = 0, l = objects.length; i < l; i++) {

    var phi = Math.acos(-1 + (2 * i) / l);
    var theta = Math.sqrt(l * Math.PI) * phi;

    var object = new THREE.Object3D();

    object.position.x = 800 * Math.cos(theta) * Math.sin(phi);
    object.position.y = 800 * Math.sin(theta) * Math.sin(phi);
    object.position.z = 800 * Math.cos(phi);

    vector.copy(object.position).multiplyScalar(2);

    object.lookAt(vector);

    targets.sphere.push(object);

  }

  // 螺旋
  var vector = new THREE.Vector3();

  for (var i = 0, l = objects.length; i < l; i++) {

    var phi = i * 0.175 + Math.PI;

    var object = new THREE.Object3D();

    object.position.x = 900 * Math.sin(phi);
    object.position.y = - (i * 8) + 450;
    object.position.z = 900 * Math.cos(phi);

    vector.x = object.position.x * 2;
    vector.y = object.position.y;
    vector.z = object.position.z * 2;

    object.lookAt(vector);

    targets.helix.push(object);

  }

  // 网格
  for (var i = 0; i < objects.length; i++) {

    var object = new THREE.Object3D();

    object.position.x = ((i % 5) * 400) - 800;
    object.position.y = (- (Math.floor(i / 5) % 5) * 400) + 800;
    object.position.z = (Math.floor(i / 25)) * 1000 - 2000;

    targets.grid.push(object);

  }

  var menu = document.querySelector('#menu').children;
  // 监听按钮事件
  var button = document.getElementById('table');
  button.addEventListener('click', function (event) {
    for (let i = 0; i < menu.length; i++) {
      if (event.target.id === menu[i].id) menu[i].className = 'active'
      else menu[i].className = ''
    }
    if (audio) audio.play()
    transform(targets.table, 2000);
  }, false);

  var button = document.getElementById('sphere');
  button.addEventListener('click', function (event) {
    for (let i = 0; i < menu.length; i++) {
      if (event.target.id === menu[i].id) menu[i].className = 'active'
      else menu[i].className = ''
    }
    if (audio) audio.play()
    transform(targets.sphere, 2000);
  }, false);

  var button = document.getElementById('helix');
  button.addEventListener('click', function (event) {
    for (let i = 0; i < menu.length; i++) {
      if (event.target.id === menu[i].id) menu[i].className = 'active'
      else menu[i].className = ''
    }
    if (audio) audio.play()
    transform(targets.helix, 2000);
  }, false);

  var button = document.getElementById('grid');
  button.addEventListener('click', function (event) {
    for (let i = 0; i < menu.length; i++) {
      if (event.target.id === menu[i].id) menu[i].className = 'active'
      else menu[i].className = ''
    }
    if (audio) audio.play()
    transform(targets.grid, 2000);
  }, false);

  transform(targets.helix, 2000);

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('click', clickMouse, false);

}

function transform (targets, duration) {

  TWEEN.removeAll();

  for (var i = 0; i < objects.length; i++) {

    var object = objects[i];
    var target = targets[i];

    new TWEEN.Tween(object.position)
      .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

    new TWEEN.Tween(object.rotation)
      .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

  }

  new TWEEN.Tween(this)
    .to({}, duration * 2)
    .onUpdate(render)
    .start();

}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render()
}

function animate () {
  TWEEN.update();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

}

function render () {
  renderer.render(scene, camera);
}

// 鼠标单击事件
function clickMouse (e) {
  let tname = e.target.name; //获取点击图片的名称				
  if (typeof (tname) == "undefined" || tname == '') {
    deleteDiv();
  } else {
    divPop(tname);
  }
  console.log(e,tname, e.target)
  if (audio) audio.play()
  // 弹窗内容与样式	
  function divPop (tname) {
    let w = window.innerWidth;
    let h = window.innerHeight;
    let div = document.getElementById("popup");
    div.style.display = 'block'; //显示元素			
    div.style.backgroundImage = 'url(./img/' + tname + ')';
    div.style.backgroundSize = 'cover';
    div.style.height = h * 0.8 + 'px';
    div.style.width = h * 0.8 * 0.75 + 'px';
    div.style.position = 'absolute';
    div.style.left = '0px';
    div.style.right = '0px';
    div.style.top = '0px';
    div.style.bottom = '0px';
    div.style.margin = 'auto';
    div.style.boxShadow = '0 0 20px 10px #dfff0c'; // 边框阴影
    div.style.borderRadius = '5px'; // 圆角
  }

  // 清除弹窗
  function deleteDiv () {
    let div = document.getElementById("popup");
    div.style.display = 'none'; //隐藏元素					
  }
}

// 说明：用 JavaScript 实现网页图片等比例缩放 
function resizeImg (image, distWidth, distHeight) {
  srcWidth = image.width;
  srcHeight = image.height;
  var ratio = 1;
  if (srcWidth > 0 && srcHeight > 0) {
    if (srcWidth / srcHeight >= distWidth / distHeight) {
      if (srcWidth > distWidth) {
        ratio = distWidth / srcWidth;
      }
    }
    else {
      if (srcHeight > distHeight) {
        ratio = distHeight / srcHeight;
      }
    }
  }
  var width = srcWidth * ratio;
  var heigh = srcHeight * ratio;

  image.style.width = width.toString() + 'px';
  image.style.height = heigh.toString() + 'px';

  if (width < distWidth)
    image.style.paddingLeft = ((distWidth - width) / 2).toString() + 'px';

  if (heigh < distHeight)
    image.style.paddingTop = ((distHeight - heigh) / 2).toString() + 'px';
}

//获得指定文件夹图片名称列表，同时设置图片的位置
function getImgs () {
  var row = 1;
  var col = 1;
  for (var i = 0; i < 80; i++) {
    var file = [];
    file[0] = i + '.webp';
    file[1] = col++;
    file[2] = row;
    table[i] = file;
    if (col > 18) {
      col = 1;
      row++;
    }
  }
}
