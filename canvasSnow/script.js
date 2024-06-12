'use strict';

function snow (pos, config) {
  this.config = config || { size: 1, angle: 1, range: 1, speed: 1 };

  this.init = function (pos) {
    this.position = { x: pos.x + (Math.random() - 0.5) * this.config.range, y: pos.y - Math.random() * 0.1 * this.config.range };
    this.velocity = { angle: (Math.random() - 0.5) * Math.PI * 0.1 + this.config.angle, weight: Math.random() * 2 + 2, minWeight: Math.random() * 1 + 1, maxWeight: Math.random() * 3 + 3 };
    this.gravity = { angle: (Math.random() - 0.5) * 0.25 + this.config.wind, chance: (Math.random() - 0.5) * 0.1, weight: Math.random() * 2 + 4, maxAngle: Math.PI + Math.PI * 0.5, minAngle: -Math.PI * 0.5 };
    this.prevPosition = this.position;
    this.lifespan = (Math.random() * 60 + 100) / this.config.speed;
    this.alpha = (Math.random() * 30 + 100) / this.config.speed;
    this.next = Math.random() * 100;
    this.size = (Math.random() - 0.5) * 2 + this.config.size;
    this.needUpdate = false;
  };

  this.update = function (pos) {
    if (--this.next > 0) {
      return;
    }
    this.needUpdate && (this.needUpdate = false) && (this.gravity.angle = (Math.random() - 0.5) * 0.25 + this.config.wind);
    this.prevPosition = { x: this.position.x, y: this.position.y };
    this.position.x += (Math.cos(this.velocity.angle) * this.velocity.weight + Math.cos(this.gravity.angle) * this.gravity.weight) * this.config.speed;
    this.position.y += (Math.sin(this.velocity.angle) * this.velocity.weight + Math.sin(this.gravity.angle) * this.gravity.weight) * this.config.speed;
    //
    this.velocity.weight *= this.size < this.config.size ? 0.96 : 1.04;
    this.velocity.weight < this.velocity.minWeight && (this.velocity.weight = this.velocity.minWeight);
    this.velocity.weight > this.velocity.maxWeight && (this.velocity.weight = this.velocity.maxWeight);
    this.velocity.angle += this.gravity.chance;
    this.gravity.chance = (this.velocity.angle > this.gravity.maxAngle || this.velocity.angle < this.gravity.minAngle ? -this.gravity.chance : this.gravity.chance);
    --this.lifespan <= 0 ? this.init(pos) : null;
  };

  this.render = function (ctx) {
    let colors = ['#fff', '#eef', '#ddf', '#eee', '#eed', '#ddd'];
    ctx.lineJoin = 'round';
    ctx.strokeStyle = colors[Math.round(Math.random() * (colors.length - 1))];
    ctx.lineWidth = this.velocity.weight * 0.2 * this.size;
    ctx.globalAlpha = this.lifespan / this.alpha;
    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(this.prevPosition.x, this.prevPosition.y);
    ctx.closePath();
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.globalAlpha = 1;
  };

  //
  this.init(pos);
}

function background (url) {
  this.img = new Image();
  this.ready = false;
  this.img.addEventListener('load', () => {
    this.ready = true;
  });

  this.init = function (url) {
    this.img.src = url;
  };

  this.update = function () {
    return;
  };

  this.render = function (ctx, width, height) {
    if (this.ready) {
      ctx.globalAlpha = 0.8;
      ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, width, height);
    }
  };

  this.init(url);
}

let main = {
  canvas: document.getElementById('canvas'),
  ctx: null,
  width: window.innerWidth,
  height: window.innerHeight,
  snow: [],
  total: 500,
  position: { x: window.innerWidth * 0.5, y: 0 },
  background: new background('./pexels-photo-235621.jpeg'),
  init: function () {
    this.registerEvents();
    this.ctx = this.canvas.getContext('2d');
    this.ctx.globalCompositeOperation = 'screen';
    [...Array(this.total).keys()].forEach(i => {
      this.snow.push(new snow(this.position, { size: 3.5, angle: Math.PI * 0.5, wind: Math.PI * 0.5, range: this.width * 1.5, speed: 0.4 }));
    });
    //
    this.resize();
  },
  update: function () {
    let position = this.position;
    this.snow.forEach(s => s.update(position));
  },
  render: function () {
    let ctx = this.ctx;
    this.background.render(ctx, this.width, this.height);
    this.snow.forEach(s => s.render(ctx));
  },
  resize: function () {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.position.x = this.width * 0.5;
    this.position.y = 0;
  },
  registerEvents: function () {
    window.addEventListener('resize', () => {
      this.resize();
    }, false);
    let debounceMove = 0;
    document.addEventListener('mousemove', e => {
      clearTimeout(debounceMove);
      setTimeout(() => {
        if (e.clientX && e.clientY) {
          let pY = e.clientY / this.height;
          pY < 0.2 && (pY = 0.2) || pY > 0.75 && (pY = 0.75);
          let pX = e.clientX / this.width;
          let wind = (Math.random() - 0.5) * 0.25 + Math.PI * (1 - pX);
          this.snow.forEach(s => (s.config.speed = pY) && (s.config.wind = wind) && (s.needUpdate = true));
        }
      }, 100);
    }, false);
    document.body.style.backgroundColor = '#000000';
  }
};

main.init();
(function loop () {
  main.update();
  main.render();
  window.requestAnimationFrame(loop);
})();