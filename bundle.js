/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Bonus.js":
/*!*************************!*\
  !*** ./src/js/Bonus.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animationBase: () => (/* binding */ animationBase),
/* harmony export */   animations: () => (/* binding */ animations),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _engine_Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine/Animation */ "./src/js/engine/Animation.js");
/* harmony import */ var _Character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Character */ "./src/js/Character.js");
/* harmony import */ var _helper_getDistance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper/getDistance */ "./src/js/helper/getDistance.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var animationBase = {
  imageURL: 'img/misc.png',
  offsetY: 0,
  offsetX: 0
};
var animations = {
  'default': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase)),
  'score100': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    offsetY: 60
  })),
  'score200': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    offsetX: 60,
    offsetY: 60
  })),
  'score500': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    offsetX: 60 * 2,
    offsetY: 60
  })),
  'score700': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    offsetX: 60 * 3,
    offsetY: 60
  })),
  'score1000': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    offsetX: 60 * 4,
    offsetY: 60
  })),
  'score2000': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    offsetX: 60 * 5,
    offsetY: 60
  })),
  'score5000': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    offsetX: 60 * 6,
    offsetY: 60
  }))
};
var defaults = {
  animations: animations,
  speed: 40,
  score: '100'
};
var Bonus = /*#__PURE__*/function (_Character) {
  function Bonus(options) {
    var _this;
    _this = _Character.call(this, options) || this;
    Object.keys(defaults).forEach(function (key) {
      if (key in options) _this[key] = options[key];
    });
    var addPacmanPositionEventListener = options.addPacmanPositionEventListener;

    // Change tile.
    _this.on('item:tile', function (tile) {
      _this._dir = _this._nextDir;
      _this._nextDir = _this.getNextDirection();
      _this._eatEvent = false;
      if (_this.getTile() === _this._getTarget()) {
        if (_this._targetFound) {
          _this._targetFound--;
        } else {
          _this.emit('item:destroy');
        }
      }
    });
    addPacmanPositionEventListener(function (data) {
      _this.pacmanData = data;
    });
    _this._targetFound = 2;
    return _this;
  }
  _inheritsLoose(Bonus, _Character);
  var _proto = Bonus.prototype;
  _proto.move = function move() {
    _Character__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.move.call(this, this._dir);
    // Eat or eaten!
    if (!this._eatEvent) {
      var pacmanTile = this.pacmanData.tile,
        tile = this.getTile(),
        opposite = this._getOpDirection(this._dir);
      if (pacmanTile === tile || this.pacmanData.dir === opposite && pacmanTile === tile.get(opposite)) {
        this._eatEvent = true;
        this._nextAnimation = this.animations["score" + this.score];
        this.update();
        this.emit('item:eaten', this);
      }
    }
  };
  _proto.getNextDirection = function getNextDirection() {
    var targetTile = this._getTarget(); // Target Tile

    var _dir = this._dir || this.dir;
    var nextTile = this.getTile().get(_dir); // Next tile.

    var directions = ['u', 'l', 'd', 'r']; // Preferred direction order.

    var nextDirection, lastDistance;
    for (var i = 0; i < 4; i++) {
      var dir = directions[i];
      if (dir === this._getOpDirection(_dir)) continue; // Cant't go back.

      if (this.canGo(dir, nextTile)) {
        var testTile = nextTile.get(dir);
        var distance = (0,_helper_getDistance__WEBPACK_IMPORTED_MODULE_2__["default"])(testTile, targetTile);
        if (typeof lastDistance === 'undefined' || lastDistance > distance) {
          nextDirection = dir;
          lastDistance = distance;
        }
      }
    }
    return nextDirection;
  };
  _proto.canGo = function canGo(dir, tile) {
    if (!tile) tile = this.getTile();
    var nextTile = tile.get(dir);
    if (!nextTile) return false;
    return !nextTile.isWall() && !nextTile.isHouse();
  };
  _proto._getTarget = function _getTarget() {
    return this.map.tunnels[0];
  };
  _proto.setNextAnimation = function setNextAnimation() {};
  return Bonus;
}(_Character__WEBPACK_IMPORTED_MODULE_1__["default"]);
Object.assign(Bonus.prototype, defaults);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bonus);

/***/ }),

/***/ "./src/js/Bonuses.js":
/*!***************************!*\
  !*** ./src/js/Bonuses.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _factory_makeBonus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factory/makeBonus */ "./src/js/factory/makeBonus.js");

var Bonuses = /*#__PURE__*/function () {
  function Bonuses(options) {
    this.bonuses = [];
    this.x = options.x;
    this.y = options.y;
    this.model = options.model;
    for (var i = 0; i < 8; i++) {
      var bonus = (0,_factory_makeBonus__WEBPACK_IMPORTED_MODULE_0__["default"])(i, {
        x: options.x - i * 64,
        y: options.y,
        factor: options.factor,
        addPacmanPositionEventListener: function addPacmanPositionEventListener() {},
        normalizeRefrashRate: function normalizeRefrashRate() {
          return 1;
        }
      });
      options.addSprite(bonus);
      this.bonuses.push(bonus);
      if (i >= this.model.level) this.bonuses[i].hide();
    }
    this.model.on('change:level', this.render.bind(this));
  }
  var _proto = Bonuses.prototype;
  _proto.render = function render() {
    for (var i = 0; i < 8; i++) {
      if (i >= this.model.level) this.bonuses[i].hide();else this.bonuses[i].show();
    }
  };
  return Bonuses;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bonuses);

/***/ }),

/***/ "./src/js/Character.js":
/*!*****************************!*\
  !*** ./src/js/Character.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Item */ "./src/js/Item.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var defaults = {
  width: 60,
  height: 60,
  step: 10,
  speed: 80,
  dir: null,
  preturn: false
};
var animationLabelsByDirections = {
  l: 'left',
  r: 'right',
  u: 'up',
  d: 'down'
};
var oppositeDirections = {
  l: 'r',
  r: 'l',
  u: 'd',
  d: 'u'
};
var Character = /*#__PURE__*/function (_Item) {
  function Character(options) {
    var _this;
    _this = _Item.call(this, options) || this;
    Object.keys(defaults).forEach(function (key) {
      if (key in options) _this[key] = options[key];
    });
    _this.pauseAnimation();
    _this.on('item:tile', function (tile) {
      _this.setNextAnimation();
    });
    _this._moving = false;
    _this._lastX = _this.x;
    _this._lastY = _this.y;
    _this._speed = _this.speed;
    _this._dir = null;
    _this._nextAnimation = null;
    _this._nextDirection = null;
    _this._moving = false;
    _this._saveDefaults();
    return _this;
  }
  _inheritsLoose(Character, _Item);
  var _proto = Character.prototype;
  _proto._saveDefaults = function _saveDefaults() {
    var _this2 = this;
    this._defaults = {};
    ['x', 'y', '_lastX', '_lastY', 'dir', '_dir', '_nextAnimation', '_nextDirection', '_moving', 'mode', 'animation'].forEach(function (key) {
      _this2._defaults[key] = _this2[key];
    });
  };
  _proto.reset = function reset() {
    Object.assign(this, this._defaults);
    this.transform();
    this.setAnimation(this.animation);
    this.pauseAnimation();
  };
  _proto.update = function update() {
    var tile = this.getTile();

    // Fix float point offset.
    if (Math.abs(this.y - tile.y) < 1) this.y = tile.y;
    if (Math.abs(this.x - tile.x) < 1) this.x = tile.x;

    // Position change, move.
    if (this._lastX !== this.x || this._lastY != this.y) {
      this.setXYZ({
        x: this.x,
        y: this.y
      });
      this._lastX = this.x;
      this._lastY = this.y;
      if (!this._moving) {
        this.emit('item:move');
        this.resumeAnimation();
        this._moving = true;
      }
      this.emit('item:position', this._getPositionData());
    } else {
      // Not moving.
      if (this._moving) {
        this.emit('item:stop');
        this.pauseAnimation();
        this._moving = false;
      }
    }
    // Changed animation.
    if (this._nextAnimation && this.animation !== this._nextAnimation) {
      this.setAnimation(this._nextAnimation);
    }
  };
  _proto._getPositionData = function _getPositionData() {
    return {
      x: this.x,
      y: this.y,
      tile: this.getTile(),
      dir: this.dir
    };
  }
  // Called from Game main loop at every revolution.
  ;
  _proto.move = function move(dir) {
    if (!dir) dir = this.dir;
    if (!dir) return;
    var tile = this.getTile(),
      step,
      _step = this.getStep();
    // Could go that direction.
    if ((dir != this.dir || this._preturn) && this.canGo(dir)) {
      if ((dir !== this.dir && dir !== this._getOpDirection() || this._preturn) && !this._isCentered()) {
        // Not in the center of the tile. Befor turn, set step so on next frame we get into the center.
        if (this._isV(dir)) {
          var diffX = Math.abs(this.x - tile.x);
          if (this.preturn) {
            // Set preturn to true to turn faster on corners.
            if (!this._isCentered('x')) {
              if (this.x > tile.x) this.x -= this.getMin(diffX, _step);else this.x += this.getMin(diffX, _step);
              this._preturn = true;
            } else this._preturn = false;
          } else {
            step = this.getMin(diffX, _step);
          }
        }
        if (this._isH(dir)) {
          var diffY = Math.abs(this.y - tile.y);
          if (this.preturn) {
            // Set preturn to true to turn faster on corners.
            if (!this._isCentered('y')) {
              if (this.y > tile.y) this.y -= this.getMin(diffY, _step);else this.y += this.getMin(diffY, _step);
              this._preturn = true;
            } else this._preturn = false;
          } else {
            step = this.getMin(diffY, _step);
          }
        }
      }
      // No step. Means change direction.
      if (!step) {
        this.dir = dir;
        this.setNextAnimation();
      }
    }
    if (!step) {
      // Keep straight.
      if (this.canGo(this.dir)) {
        step = _step;
      } else {
        // Wall.
        if (this._isV(this.dir)) {
          step = this.getMin(Math.abs(this.y - tile.y), _step);
        }
        if (this._isH(this.dir)) {
          step = this.getMin(Math.abs(this.x - tile.x), _step);
        }
      }
    }
    // Move.
    if (step) {
      if (this.dir === 'u') {
        this.y -= step;
      }
      if (this.dir === 'r') {
        this.x += step;
      }
      if (this.dir === 'd') {
        this.y += step;
      }
      if (this.dir === 'l') {
        this.x -= step;
      }
    }
    // Pass away limits.
    if (this.x < 0) this.x = this.map.width * this.map.tileWidth;
    if (this.x > this.map.width * this.map.tileWidth) this.x = 0;
    if (this.y < 0) this.y = this.map.height * this.map.tileHeight;
    if (this.y > this.map.height * this.map.tileHeight) this.y = 0;
    tile = this.getTile();
    if (tile !== this._lastTile) {
      this._lastTile = tile;
      this.emit('item:tile', tile);
    }
    this.update();
  };
  _proto.getStep = function getStep() {
    return this.step * (this._speed / 100);
  }
  // Set animation according model conditions. Override on subclasses.
  ;
  _proto.setNextAnimation = function setNextAnimation() {
    this._nextAnimation = this.animations[animationLabelsByDirections[this.dir]];
  }
  // Helper methods:
  ;
  _proto._getOpDirection = function _getOpDirection(dir) {
    return oppositeDirections[dir || this.dir];
  }
  // Tile on passed direction is available for walking.
  ;
  _proto.canGo = function canGo(dir) {
    var tile = this.getTile();
    var nextTile = tile.get(dir);
    return nextTile && !nextTile.isHouse() && !nextTile.isWall();
  };
  _proto._isV = function _isV(dir) {
    return dir === 'u' || dir === 'd';
  };
  _proto._isH = function _isH(dir) {
    return dir === 'l' || dir === 'r';
  };
  _proto._isCentered = function _isCentered(xy) {
    var tile = this.getTile();
    var x = tile.x === this.x,
      y = tile.y === this.y;
    if (xy === 'x') return x;
    if (xy === 'y') return y;else return x && y;
  };
  _proto.getMin = function getMin() {
    var min = null;
    for (var i = 0, l = arguments.length; i < l; i++) if (min === null || arguments[i] < min) min = arguments[i];
    return min;
  };
  return Character;
}(_Item__WEBPACK_IMPORTED_MODULE_0__["default"]);
Object.assign(Character.prototype, defaults);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Character);

/***/ }),

/***/ "./src/js/Game.js":
/*!************************!*\
  !*** ./src/js/Game.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _engine_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine/Game */ "./src/js/engine/Game.js");
/* harmony import */ var _SoundManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SoundManager */ "./src/js/SoundManager.js");
/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Map */ "./src/js/Map.js");
/* harmony import */ var _GameModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GameModel */ "./src/js/GameModel.js");
/* harmony import */ var _factory_makeGhost__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./factory/makeGhost */ "./src/js/factory/makeGhost.js");
/* harmony import */ var _factory_makeDot__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./factory/makeDot */ "./src/js/factory/makeDot.js");
/* harmony import */ var _factory_makePill__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./factory/makePill */ "./src/js/factory/makePill.js");
/* harmony import */ var _factory_makeBonus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./factory/makeBonus */ "./src/js/factory/makeBonus.js");
/* harmony import */ var _Pacman__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Pacman */ "./src/js/Pacman.js");
/* harmony import */ var _Lives__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Lives */ "./src/js/Lives.js");
/* harmony import */ var _Bonuses__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Bonuses */ "./src/js/Bonuses.js");
/* harmony import */ var _engine_Keyboard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./engine/Keyboard */ "./src/js/engine/Keyboard.js");
/* harmony import */ var _engine_Touch__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./engine/Touch */ "./src/js/engine/Touch.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }













var show = function show(el) {
  el.style.display = '';
};
var hide = function hide(el) {
  el.style.display = 'none';
};
var defaults = {
  // Options.
  width: 896 / 2,
  height: 1152 / 2,
  originalWidth: 896,
  originalHeight: 1152,
  dotScore: 10,
  pillScore: 50,
  defaultLives: 3,
  soundEnabled: true,
  events: {
    'click .start': 'startLevel'
  }
};
var JsPacman = /*#__PURE__*/function (_Game) {
  function JsPacman(options) {
    var _this;
    if (options === void 0) {
      options = {};
    }
    _this = _Game.call(this, options) || this;
    Object.keys(defaults).forEach(function (key) {
      if (key in options) _this[key] = options[key];
    });
    _this.model = new _GameModel__WEBPACK_IMPORTED_MODULE_3__["default"]({
      lives: _this.defaultLives
    });
    _this.model.fetch();
    _this.render();
    _this.elements = {
      splash: _this.$('.splash'),
      start: _this.$('.start'),
      startP1: _this.$('.start-p1'),
      startReady: _this.$('.start-ready'),
      highScore: _this.$('.high-score span'),
      score: _this.$('.p1-score span'),
      gameOver: _this.$('.game-over'),
      soundStatus: _this.$('.sound-status'),
      paused: _this.$('.paused'),
      load: _this.$('.loadbar')
    };
    _this.keyboard.on(_engine_Keyboard__WEBPACK_IMPORTED_MODULE_11__.EVENT_KEY_DOWN, _this._onKeyDown.bind(_this));
    _this.touch.on(_engine_Touch__WEBPACK_IMPORTED_MODULE_12__.EVENT_SWIPE, _this._onSwipe.bind(_this));
    _this.sound = new _SoundManager__WEBPACK_IMPORTED_MODULE_1__["default"]({
      soundEnabled: _this.soundEnabled,
      addSound: _this.addSound.bind(_this)
    });
    _this.lives = new _Lives__WEBPACK_IMPORTED_MODULE_9__["default"]({
      lives: _this.defaultLives + 1,
      x: 40,
      y: 1124,
      model: _this.model,
      factor: _this.scaling.getFactor(),
      addSprite: _this.addSprite.bind(_this)
    });
    _this.bonuses = new _Bonuses__WEBPACK_IMPORTED_MODULE_10__["default"]({
      level: _this.model.level,
      x: 860,
      y: 1124,
      model: _this.model,
      factor: _this.scaling.getFactor(),
      addSprite: _this.addSprite.bind(_this)
    });
    _this._onGhostEaten = _this._onGhostEaten.bind(_this);
    _this._onGhostEat = _this._onGhostEat.bind(_this);
    _this.model.on('change:score', _this._onChangeScore.bind(_this));
    _this.model.on('change:highScore', _this._onChangeHighScore.bind(_this));
    _this.model.on('change:lives', _this._onChangeLives.bind(_this));
    _this.model.on('change:extraLives', _this._onChangeExtraLives.bind(_this));
    _this.model.on('change:mode', _this._onChangeMode.bind(_this));
    _this.makeLevel();
    _this.start(function () {
      hide(_this.elements.load);
      show(_this.elements.start);
    });
    return _this;
  }
  _inheritsLoose(JsPacman, _Game);
  var _proto = JsPacman.prototype;
  _proto.startLevel = function startLevel() {
    if (this._win) {
      this.model.level++;
      this.reset();
      this._win = false;
      return;
    }
    if (this._gameOver) {
      this.model.level = 1;
      this.reset();
      this._gameOver = false;
      hide(this.elements.splash);
      this.sound.play('intro');
      return;
    }
    hide(this.elements.splash);
    this.sound.play('intro');
    this.addCallback(this.mainLoop.bind(this));
  };
  _proto.reset = function reset() {
    this.model.mode = null;
    this.pinky.destroy();
    this.blinky.destroy();
    this.inky.destroy();
    this.sue.destroy();
    this.pacman.destroy();
    this.map.destroyItems();
    this.off('game:ghost:eaten', this._onGhostEaten);
    this.off('game:ghost:eat', this._onGhostEat);
    if (!this._win) {
      this.model.lives = this.defaultLives + 1;
      this.model.score = 0;
    }
    this.keyboard.clear();
    this._inputDirection = null;
    this._lastSwipe = null;
    this.makeLevel();
  };
  _proto.makeLevel = function makeLevel() {
    var _this2 = this;
    Object.assign(this, this.model.getSettings('game'));
    this.map = new _Map__WEBPACK_IMPORTED_MODULE_2__["default"](this.map);
    this.el.classList.remove('maze-1');
    this.el.classList.remove('maze-2');
    this.el.classList.remove('maze-3');
    this.el.classList.remove('maze-4');
    this.el.classList.add(this.maze);
    var dotAnimationLabel = 'white';
    if (this.maze === 'maze-2') dotAnimationLabel = 'yellow';
    if (this.maze === 'maze-3') dotAnimationLabel = 'red';
    this._pauseFrames = 80;
    this._destroyBonus = 0;
    this._showBonus = 500;
    var i = this.map.tiles.length,
      total = 0;
    while (i--) {
      var tile = this.map.tiles[i];
      if (tile.code === '.') {
        var dot = (0,_factory_makeDot__WEBPACK_IMPORTED_MODULE_5__["default"])({
          defaultAnimation: dotAnimationLabel,
          map: this.map,
          factor: this.scaling.getFactor(),
          normalizeRefrashRate: this.normalizeRefrashRate.bind(this),
          x: tile.x,
          y: tile.y
        });
        tile.item = dot;
        this.addSprite(dot);
        total++;
      }
      if (tile.code === '*') {
        var pill = (0,_factory_makePill__WEBPACK_IMPORTED_MODULE_6__["default"])({
          defaultAnimation: dotAnimationLabel,
          map: this.map,
          factor: this.scaling.getFactor(),
          normalizeRefrashRate: this.normalizeRefrashRate.bind(this),
          x: tile.x,
          y: tile.y
        });
        tile.item = pill;
        this.addSprite(pill);
        total++;
      }
    }
    this.totalItems = total;

    // Pacman.
    this.pacman = new _Pacman__WEBPACK_IMPORTED_MODULE_8__["default"](_extends({
      preturn: true,
      x: 452,
      y: 848
    }, this.model.getSettings('pacman'), {
      map: this.map,
      factor: this.scaling.getFactor(),
      normalizeRefrashRate: this.normalizeRefrashRate.bind(this),
      addGameGhostEatEventListener: function addGameGhostEatEventListener(listener) {
        return _this2.on('game:ghost:eat', listener);
      },
      addGameGhostModeFrightenedEnter: function addGameGhostModeFrightenedEnter(listener) {
        return _this2.on('game:ghost:modefrightened:enter', listener);
      },
      addGameGhostModeFrightenedExit: function addGameGhostModeFrightenedExit(listener) {
        return _this2.on('game:ghost:modefrightened:exit', listener);
      }
    }));
    this.pacman.on('item:eatpill', function (t) {
      _this2._pauseFrames = 2;
      _this2.model.addScore(_this2.pillScore);
      _this2.totalItems--;
      if (_this2.totalItems === 0) {
        _this2.win();
      } else _this2.sound.play('frightened');
    });
    // Pacman eats ghost.
    this.on('game:ghost:eaten', this._onGhostEaten);
    // Ghost eats Pacman.
    this.on('game:ghost:eat', this._onGhostEat);
    // Pacman make die turn arround.
    this.pacman.on('item:die', function (ghost) {
      _this2.sound.play('eaten');
    });
    // Pacman lose.
    this.pacman.on('item:life', function () {
      _this2.keyboard.clear();
      _this2._inputDirection = null;
      _this2._lastSwipe = null;
      _this2.model.mode = null;
      _this2.pacman.reset();
      _this2.pinky.reset();
      _this2.blinky.reset();
      _this2.inky.reset();
      _this2.sue.reset();
      if (_this2.bonus) {
        _this2._destroyBonus = 0;
        _this2._showBonus = 250;
        _this2.bonus.reset();
        _this2.bonus.hide();
      }
      _this2.showGhosts();
      _this2.model.lives--;
      _this2._pacmanEaten = false;
      if (_this2.model.lives) {
        show(_this2.elements.startReady);
        _this2._start = 1;
        _this2._pauseFrames = 40;
      } else {
        _this2._pauseFrames = 120;
      }
    });
    // Pacman eats dot.
    this.pacman.on('item:eatdot', function (t) {
      _this2.model.addScore(_this2.dotScore);
      _this2.sound.play('dot');
      _this2.totalItems--;
      if (_this2.totalItems === 0) {
        _this2.win();
      }
    });
    this.addSprite(this.pacman);

    // Bonus.
    if (this.bonus) {
      this.bonus.destroy();
    }
    var bonusTile = this.map.tunnels[this.map.tunnels.length - 1];
    this.bonus = (0,_factory_makeBonus__WEBPACK_IMPORTED_MODULE_7__["default"])(this.bonusIndex, {
      map: this.map,
      dir: 'l',
      score: this.bonusScore,
      x: bonusTile.x,
      y: bonusTile.y,
      factor: this.scaling.getFactor(),
      normalizeRefrashRate: this.normalizeRefrashRate.bind(this),
      addPacmanPositionEventListener: function addPacmanPositionEventListener(listener) {
        return _this2.pacman.on('item:position', listener);
      }
    });

    // Bonus reaches target and disappears.
    this.bonus.on('item:destroy', function (bonus) {
      _this2.bonus.destroy();
      _this2.bonus = null;
    });

    // Pacman eats bonus.
    this.bonus.on('item:eaten', function (bonus) {
      if (_this2._showBonus) return; // Not yet in the maze
      _this2._pauseFrames = 5;
      _this2._destroyBonus = 25;
      _this2.model.addScore(parseInt(bonus.score));
      _this2.sound.play('bonus');
    });
    this.addSprite(this.bonus);

    // Ghosts.
    var ghostAttrs = _extends({}, this.model.getSettings('ghost'), {
      map: this.map,
      normalizeRefrashRate: this.normalizeRefrashRate.bind(this),
      factor: this.scaling.getFactor(),
      addGameGlobalModeEventListener: function addGameGlobalModeEventListener(listener) {
        return _this2.on('game:globalmode', listener);
      },
      addGameGhostEatenEventListener: function addGameGhostEatenEventListener(listener) {
        return _this2.on('game:ghost:eaten', listener);
      },
      addPacmanPositionEventListener: function addPacmanPositionEventListener(listener) {
        return _this2.pacman.on('item:position', listener);
      },
      addPacmanEatPillEventListener: function addPacmanEatPillEventListener(listener) {
        return _this2.pacman.on('item:eatpill', listener);
      }
    });
    var pinkyTile = this.map.houseCenter.getR();
    this.pinky = (0,_factory_makeGhost__WEBPACK_IMPORTED_MODULE_4__["default"])('pinky', _extends({}, ghostAttrs, {
      x: pinkyTile.x - this.map.tileWidth / 2,
      y: pinkyTile.y
    }));
    this.addEventListenersToGhost(this.pinky);
    this.addSprite(this.pinky);
    var blinkyTile = this.map.house.getU().getR();
    this.blinky = (0,_factory_makeGhost__WEBPACK_IMPORTED_MODULE_4__["default"])('blinky', _extends({}, ghostAttrs, {
      x: blinkyTile.x - this.map.tileWidth / 2,
      y: blinkyTile.y
    }));
    this.addEventListenersToGhost(this.blinky);
    this.addSprite(this.blinky);
    var inkyTile = this.map.houseCenter.getL();
    this.inky = (0,_factory_makeGhost__WEBPACK_IMPORTED_MODULE_4__["default"])('inky', _extends({}, ghostAttrs, {
      blinky: this.blinky,
      x: inkyTile.x - 16,
      y: inkyTile.y
    }));
    this.addEventListenersToGhost(this.inky);
    this.addSprite(this.inky);
    var sueTile = this.map.houseCenter.getR().getR();
    this.sue = (0,_factory_makeGhost__WEBPACK_IMPORTED_MODULE_4__["default"])('sue', _extends({}, ghostAttrs, {
      x: sueTile.x + 16,
      y: sueTile.y
    }));
    this.addEventListenersToGhost(this.sue);
    this.addSprite(this.sue);
    show(this.elements.startReady);
    if (!this._win) {
      show(this.elements.startP1);
      this.hideGhosts();
      this.pacman.hide();
      this._start = 2;
    } else {
      this.bonus.hide();
      this._start = 1;
    }
  };
  _proto.addEventListenersToGhost = function addEventListenersToGhost(ghost) {
    var _this3 = this;
    ghost.on('item:eat', function () {
      return _this3.emit('game:ghost:eat', ghost);
    });
    ghost.on('item:eaten', function () {
      return _this3.emit('game:ghost:eaten', ghost);
    });
    ghost.on('item:modefrightened:enter', function () {
      return _this3.emit('game:ghost:modefrightened:enter');
    });
    ghost.on('item:modefrightened:exit', function () {
      return _this3.emit('game:ghost:modefrightened:exit');
    });
  };
  _proto.mainLoop = function mainLoop() {
    // Global mode.
    this.model.updateMode();

    // Input
    this._inputDirection = this._getInputDirection();

    // Move.
    if (!this._pauseFrames) {
      if (this._start === 2) {
        hide(this.elements.startP1);
        this.showGhosts();
        this.pacman.show();
        this.model.lives = this.defaultLives;
        this._pauseFrames = 60;
        this._start--;
        return;
      }
      if (this._start === 1) {
        hide(this.elements.startReady);
        this._start--;
        return;
      }
      if (this._win) {
        this.startLevel();
        return;
      }
      if (this._gameOver) {
        hide(this.elements.gameOver);
        show(this.elements.splash);
        return;
      }
      if (this._showPacman) {
        this.pacman.show();
        this._showPacman = false;
      }
      this.pacman.move(this._inputDirection);
      if (this._pacmanEaten) {
        this.hideGhosts();
      } else {
        if (!this._soundBackPauseFrames) {
          if (this._isGhostDead()) {
            this.sound.play('dead');
          } else if (!this._isGhostFrightened()) {
            this.sound.play('back');
          }
          this._soundBackPauseFrames = 5;
        } else this._soundBackPauseFrames--;
        this.pinky.move();
        this.blinky.move();
        this.inky.move();
        this.sue.move();
        if (this._destroyBonus) {
          if (this._destroyBonus === 1) {
            this.bonus.destroy();
            delete this.bonus;
          }
          this._destroyBonus--;
        } else if (this.bonus) {
          if (this._showBonus) {
            if (this._showBonus === 1) {
              this.bonus.show();
            }
            this._showBonus--;
          } else {
            this.bonus.move();
          }
        }
      }
    } else {
      this._pauseFrames--;
    }
  };
  _proto.pause = function pause() {
    _Game.prototype.pause.call(this);
    this.pinky.pause();
    this.blinky.pause();
    this.inky.pause();
    this.sue.pause();
    this.muteSound(true);
    this.model.pause();
    this.elements.paused.style.display = '';
  };
  _proto.resume = function resume() {
    _Game.prototype.resume.call(this);
    this.pinky.resume();
    this.blinky.resume();
    this.inky.resume();
    this.sue.resume();
    this.muteSound(!!this._muted);
    this.model.resume();
    hide(this.elements.paused);
  };
  _proto.win = function win() {
    var _this4 = this;
    this._pauseFrames = 120;
    this._win = true;
    var times = 14;
    this.addCallback(function () {
      if (times) {
        times--;
        _this4.el.classList.toggle('blink');
        return false; // Keep running.
      } else {
        _this4.el.classList.remove('blink');
        return true; // Remove callback.
      }
    }, this.refreshRate * 8);
    this.hideGhosts();
    this.map.hideItems();
    this.pacman.pauseAnimation();
  };
  _proto.hideGhosts = function hideGhosts() {
    this.pinky.hide();
    this.blinky.hide();
    this.inky.hide();
    this.sue.hide();
    if (this.bonus) this.bonus.hide();
  };
  _proto.showGhosts = function showGhosts() {
    this.pinky.show();
    this.blinky.show();
    this.inky.show();
    this.sue.show();
    if (this.bonus && !this._showBonus) this.bonus.show();
  };
  _proto._isGhostFrightened = function _isGhostFrightened() {
    return this.blinky.isFrightened() || this.inky.isFrightened() || this.pinky.isFrightened() || this.sue.isFrightened();
  };
  _proto._isGhostDead = function _isGhostDead() {
    return this.blinky.isDead() || this.inky.isDead() || this.pinky.isDead() || this.sue.isDead();
  };
  _proto._getInputDirection = function _getInputDirection() {
    var keys = this.keyboard.keys;
    var direction = null;
    if (keys[_engine_Keyboard__WEBPACK_IMPORTED_MODULE_11__.KEY_UP]) {
      direction = 'u';
    } else if (keys[_engine_Keyboard__WEBPACK_IMPORTED_MODULE_11__.KEY_RIGHT]) {
      direction = 'r';
    } else if (keys[_engine_Keyboard__WEBPACK_IMPORTED_MODULE_11__.KEY_DOWN]) {
      direction = 'd';
    } else if (keys[_engine_Keyboard__WEBPACK_IMPORTED_MODULE_11__.KEY_LEFT]) {
      direction = 'l';
    }
    if (direction) {
      this._lastSwipe = null;
    } else if (this._lastSwipe === _engine_Touch__WEBPACK_IMPORTED_MODULE_12__.EVENT_SWIPE_UP) {
      direction = 'u';
    } else if (this._lastSwipe === _engine_Touch__WEBPACK_IMPORTED_MODULE_12__.EVENT_SWIPE_RIGHT) {
      direction = 'r';
    } else if (this._lastSwipe === _engine_Touch__WEBPACK_IMPORTED_MODULE_12__.EVENT_SWIPE_DOWN) {
      direction = 'd';
    } else if (this._lastSwipe === _engine_Touch__WEBPACK_IMPORTED_MODULE_12__.EVENT_SWIPE_LEFT) {
      direction = 'l';
    }
    return direction;
  };
  _proto.onLoadProgress = function onLoadProgress(percent) {
    this.elements.load.querySelector('.inner').style.width = percent + "%";
  };
  _proto._onSwipe = function _onSwipe(type, ev) {
    this._lastSwipe = type;
  };
  _proto._onKeyDown = function _onKeyDown(event) {
    // Sound on/off.
    if (event.keyCode === 83) {
      if (!this.soundEnabled) return;
      // Mute Sound.
      this._muted = !this._muted;
      this.muteSound(this._muted);
      var el = this.elements.soundStatus;
      if (this._muted) el.classList.remove('on');else el.classList.add('on');
      show(el);
      if (this._hideSoundStatusTimeout) clearTimeout(this._hideSoundStatusTimeout);
      this._hideSoundStatusTimeout = setTimeout(function () {
        hide(el);
      }, 2000);
    }
    // Pause Game.
    else if (event.keyCode === 80) {
      this._paused = !this._paused;
      if (this._paused) this.pause();else this.resume();
    }
  };
  _proto._onChangeScore = function _onChangeScore(model, score) {
    this.elements.score.innerText = score || '00';
  };
  _proto._onChangeHighScore = function _onChangeHighScore(model, highScore) {
    this.elements.highScore.innerText = highScore || '00';
  }
  // Cange lives. Check game over.
  ;
  _proto._onChangeLives = function _onChangeLives(model, lives) {
    if (lives === 0) {
      // Game over.
      this._gameOver = true;
      show(this.elements.gameOver);
      this.hideGhosts();
      this.pacman.hide();
      this.model.save();
    }
  }
  // Extra life.
  ;
  _proto._onChangeExtraLives = function _onChangeExtraLives(model, lives) {
    this.sound.play('life');
  }
  // Change global mode.
  ;
  _proto._onChangeMode = function _onChangeMode(model, mode) {
    this.emit('game:globalmode', mode);
  }
  // Pacman eats ghost.
  ;
  _proto._onGhostEaten = function _onGhostEaten(ghost) {
    this.pacman.hide();
    this._pauseFrames = 15;
    this._showPacman = true;
    this.model.addScore(parseInt(ghost.score));
    this.sound.play('eat');
  }
  // Ghost eats Pacman.
  ;
  _proto._onGhostEat = function _onGhostEat() {
    this._pauseFrames = 40;
    this._pacmanEaten = true;
  };
  _proto.template = function template(model) {
    return "\n            <div class=\"score\">\n                <div class=\"p1-score\">1UP<br /><span>00</span></div>\n                <div class=\"high-score\">HIGH SCORE<br /><span>" + (model.highScore || '00') + "</span></div>\n                <div class=\"p2-score\">2UP<br /><span>00</span></div>\n            </div>\n            <div class=\"start-p1\" style=\"display: none\">PLAYER ONE</div>\n            <div class=\"start-ready\" style=\"display: none\">READY!</div>\n            <div class=\"game-over\" style=\"display: none\">YOU WIN<br />\n            Tot 7 september!</div>\n            <div class=\"sound-status on\" style=\"display: none\"><span class=\"wrap\">SOUND: <span class=\"on\">ON</span><span class=\"off\">OFF</span></span></div>\n            <div class=\"paused\" style=\"display: none\"><span class=\"wrap\">PAUSED</span></div>\n            <div class=\"splash\">\n                <p class=\"nerd\">KAAT & TOBIAS<br><br><span>GAAN TROUWEN</span></p>\n                <a class=\"start\" style=\"display: none\">START</a>\n                <div class=\"loadbar\"><div class=\"inner\"></div></div>\n                <p class=\"keys\"><span>&larr;&uarr;&darr;&rarr;</span>:MOVE <span>S</span>:SOUND <span>P</span>:PAUSE</p>\n            </div>\n        ";
  };
  return JsPacman;
}(_engine_Game__WEBPACK_IMPORTED_MODULE_0__["default"]);
Object.assign(JsPacman.prototype, defaults);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (JsPacman);

/***/ }),

/***/ "./src/js/GameModel.js":
/*!*****************************!*\
  !*** ./src/js/GameModel.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _engine_Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine/Model */ "./src/js/engine/Model.js");
/* harmony import */ var _engine_Timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./engine/Timer */ "./src/js/engine/Timer.js");
/* harmony import */ var _Ghost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ghost */ "./src/js/Ghost.js");
/* harmony import */ var _maps_map_1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./maps/map-1 */ "./src/js/maps/map-1.js");
/* harmony import */ var _maps_map_2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./maps/map-2 */ "./src/js/maps/map-2.js");
/* harmony import */ var _maps_map_3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./maps/map-3 */ "./src/js/maps/map-3.js");
/* harmony import */ var _maps_map_4__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./maps/map-4 */ "./src/js/maps/map-4.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








// TODO: Add times data for each level.
var times = [{
  mode: _Ghost__WEBPACK_IMPORTED_MODULE_2__.MODE_SCATTER,
  time: 7
}, {
  mode: _Ghost__WEBPACK_IMPORTED_MODULE_2__.MODE_CHASE,
  time: 20
}, {
  mode: _Ghost__WEBPACK_IMPORTED_MODULE_2__.MODE_SCATTER,
  time: 7
}, {
  mode: _Ghost__WEBPACK_IMPORTED_MODULE_2__.MODE_CHASE,
  time: 20
}, {
  mode: _Ghost__WEBPACK_IMPORTED_MODULE_2__.MODE_SCATTER,
  time: 5
}, {
  mode: _Ghost__WEBPACK_IMPORTED_MODULE_2__.MODE_CHASE,
  time: 20
}, {
  mode: _Ghost__WEBPACK_IMPORTED_MODULE_2__.MODE_SCATTER,
  time: 5
}, {
  mode: _Ghost__WEBPACK_IMPORTED_MODULE_2__.MODE_CHASE,
  time: 1000000
}];

// This info was parsed from
// https://pacman.holenet.info/#LvlSpecs
var data = [[times, 0, "100", "80", "71", "75", "40", "20", "80", "10", "85", "90", "79", "50", "6", "5", _maps_map_1__WEBPACK_IMPORTED_MODULE_3__["default"], "maze-1"], [times, 1, "200", "90", "79", "85", "45", "30", "90", "15", "95", "95", "83", "55", "5", "5", _maps_map_1__WEBPACK_IMPORTED_MODULE_3__["default"], "maze-1"], [times, 2, "500", "90", "79", "85", "45", "40", "90", "20", "95", "95", "83", "55", "4", "5", _maps_map_2__WEBPACK_IMPORTED_MODULE_4__["default"], "maze-2"], [times, 3, "500", "90", "79", "85", "45", "40", "90", "20", "95", "95", "83", "55", "3", "5", _maps_map_2__WEBPACK_IMPORTED_MODULE_4__["default"], "maze-2"], [times, 4, "700", "100", "87", "95", "50", "40", "100", "20", "105", "100", "87", "60", "2", "5", _maps_map_2__WEBPACK_IMPORTED_MODULE_4__["default"], "maze-2"], [times, 5, "700", "100", "87", "95", "50", "50", "100", "25", "105", "100", "87", "60", "5", "5", _maps_map_3__WEBPACK_IMPORTED_MODULE_5__["default"], "maze-3"], [times, 6, "1000", "100", "87", "95", "50", "50", "100", "25", "105", "100", "87", "60", "2", "5", _maps_map_3__WEBPACK_IMPORTED_MODULE_5__["default"], "maze-3"], [times, 7, "1000", "100", "87", "95", "50", "50", "100", "25", "105", "100", "87", "60", "2", "5", _maps_map_3__WEBPACK_IMPORTED_MODULE_5__["default"], "maze-3"], [times, 0, "2000", "100", "87", "95", "50", "60", "100", "30", "105", "100", "87", "60", "1", "3", _maps_map_3__WEBPACK_IMPORTED_MODULE_5__["default"], "maze-3"], [times, 1, "2000", "100", "87", "95", "50", "60", "100", "30", "105", "100", "87", "60", "5", "5", _maps_map_4__WEBPACK_IMPORTED_MODULE_6__["default"], "maze-4"], [times, 2, "2000", "100", "87", "95", "50", "60", "100", "30", "105", "100", "87", "60", "2", "5", _maps_map_4__WEBPACK_IMPORTED_MODULE_6__["default"], "maze-4"], [times, 3, "2000", "100", "87", "95", "50", "80", "100", "40", "105", "100", "87", "60", "1", "3", _maps_map_4__WEBPACK_IMPORTED_MODULE_6__["default"], "maze-4"], [times, 4, "5000", "100", "87", "95", "50", "80", "100", "40", "105", "100", "87", "60", "1", "3", _maps_map_4__WEBPACK_IMPORTED_MODULE_6__["default"], "maze-4"], [times, 5, "5000", "100", "87", "95", "50", "80", "100", "40", "105", "100", "87", "60", "3", "5", _maps_map_3__WEBPACK_IMPORTED_MODULE_5__["default"], "maze-3"], [times, 6, "5000", "100", "87", "95", "50", "100", "100", "50", "105", "100", "87", "60", "1", "3", _maps_map_3__WEBPACK_IMPORTED_MODULE_5__["default"], "maze-3"], [times, 7, "5000", "100", "87", "95", "50", "100", "100", "50", "105", "100", "87", "60", "1", "3", _maps_map_3__WEBPACK_IMPORTED_MODULE_5__["default"], "maze-3"], [times, 7, "5000", "100", "87", "95", "50", "100", "100", "50", "105", "0", "0", "0", "0", "0", _maps_map_3__WEBPACK_IMPORTED_MODULE_5__["default"], "maze-3"], [times, 7, "5000", "100", "87", "95", "50", "100", "100", "50", "105", "100", "87", "60", "1", "3", _maps_map_4__WEBPACK_IMPORTED_MODULE_6__["default"], "maze-4"], [times, 7, "5000", "100", "87", "95", "50", "120", "100", "60", "105", "0", "0", "0", "0", "0", _maps_map_4__WEBPACK_IMPORTED_MODULE_6__["default"], "maze-4"], [times, 7, "5000", "100", "87", "95", "50", "120", "100", "60", "105", "0", "0", "0", "0", "0", _maps_map_4__WEBPACK_IMPORTED_MODULE_6__["default"], "maze-4"], [times, 7, "5000", "90", "79", "95", "50", "120", "100", "60", "105", "0", "0", "0", "0", "0", _maps_map_4__WEBPACK_IMPORTED_MODULE_6__["default"], "maze-4"]];
var keys = ['game.times', 'game.bonusIndex', 'game.bonusScore', 'pacman.speed', 'pacman.dotSpeed', 'ghost.speed', 'ghost.tunnelSpeed', '', '', '', '', 'pacman.frightenedSpeed', 'pacman.frightenedDotSpeed', 'ghost.frightenedSpeed', 'ghost.frightenedTime', 'ghost.frightenedFlashes', 'game.map', 'game.maze'];
var GameModel = /*#__PURE__*/function (_Model) {
  function GameModel(attrs) {
    var _this;
    _this = _Model.call(this, _extends({
      level: 1,
      score: 0,
      highScore: 0,
      lives: 3,
      extraLives: 1,
      extraLifeScore: 10000,
      mode: null
    }, attrs)) || this;
    _this.url = 'jsPacman';
    _this.on('change:score', _this.onChangeScore.bind(_this));
    return _this;
  }
  _inheritsLoose(GameModel, _Model);
  var _proto = GameModel.prototype;
  _proto.addScore = function addScore(score) {
    this.score = this.score + score;
  };
  _proto.updateMode = function updateMode() {
    if (!this.mode) this.modeTimer = new _engine_Timer__WEBPACK_IMPORTED_MODULE_1__["default"]();
    var _this$getSettings = this.getSettings('game'),
      times = _this$getSettings.times;
    var total = 0,
      i = 0;
    while (times[i]) {
      total += times[i].time;
      if (!this.modeTimer.isElapsed(total) || i === times.length - 1) {
        this.mode = times[i].mode;
        break;
      }
      i++;
    }
  };
  _proto.pause = function pause() {
    if (this.modeTimer) this.modeTimer.pause();
  };
  _proto.resume = function resume() {
    if (this.modeTimer) this.modeTimer.resume();
  };
  _proto.getSettings = function getSettings(key) {
    var obj = {};
    var level = this.level > data.length ? data.length : this.level;
    var i = keys.length;
    while (i--) {
      var parts = keys[i].split('.');
      if (parts[0] === key) obj[parts[1]] = data[level - 1][i];
    }
    return obj;
  };
  _proto.onChangeScore = function onChangeScore() {
    if (this.extraLives && this.score >= this.extraLifeScore) {
      this.extraLives--;
      this.lives++;
    }
    if (this.highScore < this.score) {
      this.highScore = this.score;
    }
  };
  _proto.toJSON = function toJSON() {
    return {
      highScore: this.highScore
    };
  };
  return GameModel;
}(_engine_Model__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameModel);

/***/ }),

/***/ "./src/js/Ghost.js":
/*!*************************!*\
  !*** ./src/js/Ghost.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MODE_CHASE: () => (/* binding */ MODE_CHASE),
/* harmony export */   MODE_DEAD: () => (/* binding */ MODE_DEAD),
/* harmony export */   MODE_FRIGHTENED: () => (/* binding */ MODE_FRIGHTENED),
/* harmony export */   MODE_HOUSE: () => (/* binding */ MODE_HOUSE),
/* harmony export */   MODE_SCATTER: () => (/* binding */ MODE_SCATTER),
/* harmony export */   animationBase: () => (/* binding */ animationBase),
/* harmony export */   animations: () => (/* binding */ animations),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _engine_Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine/Animation */ "./src/js/engine/Animation.js");
/* harmony import */ var _engine_Timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./engine/Timer */ "./src/js/engine/Timer.js");
/* harmony import */ var _Character__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Character */ "./src/js/Character.js");
/* harmony import */ var _helper_getDistance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helper/getDistance */ "./src/js/helper/getDistance.js");
/* harmony import */ var _helper_rnd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helper/rnd */ "./src/js/helper/rnd.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





var MODE_SCATTER = 'scatter';
var MODE_CHASE = 'chase';
var MODE_FRIGHTENED = 'frightened';
var MODE_HOUSE = 'house';
var MODE_DEAD = 'dead';
var animationBase = {
  imageURL: 'img/characters1.png',
  numberOfFrame: 1,
  delta: 64,
  refreshRate: 180,
  type: _engine_Animation__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_HORIZONTAL
};
var animations = {
  'frightened': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    offsetY: 376,
    offsetX: -2
  })),
  'frightenedBlink': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    offsetY: 376,
    offsetX: -2,
    numberOfFrame: 4
  })),
  'deadRight': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    offsetY: 376,
    offsetX: 64 * 4 - 2,
    numberOfFrame: 1
  })),
  'deadDown': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    offsetY: 376,
    offsetX: 64 * 5 - 2,
    numberOfFrame: 1
  })),
  'deadUp': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    offsetY: 376,
    offsetX: 64 * 6 - 2,
    numberOfFrame: 1
  })),
  'deadLeft': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    offsetY: 376,
    offsetX: 64 * 7 - 2,
    numberOfFrame: 1
  })),
  'score200': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    imageURL: 'img/misc.png',
    numberOfFrame: 1,
    offsetX: -2,
    offsetY: 110
  })),
  'score400': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    imageURL: 'img/misc.png',
    numberOfFrame: 1,
    offsetX: 64 * 1 - 2,
    offsetY: 110
  })),
  'score800': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    imageURL: 'img/misc.png',
    numberOfFrame: 1,
    offsetX: 64 * 2 - 2,
    offsetY: 110
  })),
  'score1600': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    imageURL: 'img/misc.png',
    numberOfFrame: 1,
    offsetX: 64 * 3,
    offsetY: 110
  }))
};
var defaults = {
  animations: animations,
  width: 64,
  speed: 75,
  frightenedTime: 5,
  waitTime: 4,
  scatterTarget: 0,
  mode: MODE_HOUSE,
  score: '200',
  scores: {
    '200': '400',
    '400': '800',
    '800': '1600'
  },
  blinky: null,
  getChaseTarget: function getChaseTarget() {
    return this.pacmanData.tile;
  },
  tunnelSpeed: null,
  frightenedSpeed: null,
  frightenedFlashes: null
};
var Ghost = /*#__PURE__*/function (_Character) {
  function Ghost(options) {
    var _this;
    _this = _Character.call(this, options) || this;
    Object.keys(defaults).forEach(function (key) {
      if (key in options) _this[key] = options[key];
    });
    var addGameGlobalModeEventListener = options.addGameGlobalModeEventListener,
      addGameGhostEatenEventListener = options.addGameGhostEatenEventListener,
      addPacmanEatPillEventListener = options.addPacmanEatPillEventListener,
      addPacmanPositionEventListener = options.addPacmanPositionEventListener;
    _this.deadTarget = _this.map.house.getR().getU();
    _this.deadEndX = _this._defaults.x;
    _this.deadEndY = _this.map.houseCenter.y;
    _this.deadEnd = _this.map.getTile(_this.deadEndX, _this.deadEndY, true);
    _this.houseTop = _this.y - _this.getTile().height / 2;
    _this.houseBottom = _this.y + _this.getTile().height / 2;
    _this.houseExitTile = _this.map.house.getR();
    _this.houseExitTileX = _this.houseExitTile.x - _this.map.tileWidth / 2;
    _this.scatterTarget = _this.map.tiles[_this.scatterTarget];
    _this.setMode(_this.mode);

    // Change tile.
    _this.on('item:tile', function (t) {
      if (_this.mode === MODE_FRIGHTENED) _this._speed = _this.frightenedSpeed;else if (_this.mode === MODE_DEAD) _this._speed = 130;else if (t.isTunnel()) _this._speed = _this.tunnelSpeed;else _this._speed = _this.speed;
      if (_this._turnBack) {
        _this.dir = _this._getOpDirection(_this.dir);
        _this._dir = null;
        _this._nextDir = _this.getNextDirection();
        _this._turnBack = false;
      } else {
        _this._dir = _this._nextDir;
        _this._nextDir = _this.getNextDirection();
      }
      _this._eatEvent = false;
    });
    addGameGlobalModeEventListener(_this.onGameGlobalMode.bind(_this));
    addPacmanEatPillEventListener(function () {
      _this.setMode(MODE_FRIGHTENED);
      _this.score = 200;
    });
    addGameGhostEatenEventListener(function () {
      _this.score = _this.scores[_this.score];
    });
    addPacmanPositionEventListener(function (data) {
      _this.pacmanData = data;
    });
    return _this;
  }
  _inheritsLoose(Ghost, _Character);
  var _proto = Ghost.prototype;
  _proto.reset = function reset() {
    _Character.prototype.reset.call(this);
    this.setMode(this.mode);
  };
  _proto.pause = function pause() {
    if (this.houseTimer) this.houseTimer.pause();
    if (this.frightenedTimer) this.frightenedTimer.pause();
  };
  _proto.resume = function resume() {
    if (this.mode === MODE_FRIGHTENED) this.frightenedTimer.resume();
    if (this.mode === MODE_HOUSE && !this.housePrepareExit) houseTimer.resume();
  };
  _proto.setMode = function setMode(mode) {
    if (!mode) {
      if (this.frightened) {
        this.mode = this.frightened;
        this.frightened = null;
        return;
      }
      mode = this.globalMode;
    }
    if (mode === MODE_FRIGHTENED && (this.mode === MODE_HOUSE || this.mode === MODE_DEAD)) {
      this.frightened = mode;
    } else {
      this.mode = mode;
    }
    this.onEnterMode(mode);
  };
  _proto.shouldExitMode = function shouldExitMode() {
    if (this.mode === MODE_DEAD) return this.getTile() === this.deadEnd;else if (this.mode === MODE_FRIGHTENED) return this.frightenedTimer.isElapsed();else if (this.mode === MODE_HOUSE) return this.getTile() === this.houseExitTile.getU();else if (this.mode != this.globalMode) return true;
    return false;
  };
  _proto.onEnterMode = function onEnterMode(mode) {
    switch (mode) {
      case MODE_DEAD:
        this.deadPrepareEnter = false;
        this._nextAnimation = this.animations["score" + this.score];
        this.update();
        break;
      case MODE_FRIGHTENED:
        this.frightenedTimer = new _engine_Timer__WEBPACK_IMPORTED_MODULE_1__["default"](this.frightenedTime);
        this.emit('item:modefrightened:enter');
        break;
      case MODE_HOUSE:
        this.housePrepareExit = false;
        this._speed = 70;
        break;
    }
  };
  _proto.onExitMode = function onExitMode() {
    var tile = this.getTile();
    switch (this.mode) {
      case MODE_DEAD:
        this.reset();
        break;
      case MODE_FRIGHTENED:
        if (!this.frightened) this.setMode();
        this.emit('item:modefrightened:exit');
        break;
      case MODE_HOUSE:
        this.houseTimer = null;
        this._dir = 'l';
        this._nextDir = 'l';
        this._lastTile = tile.getD();
        this._speed = this.speed;
        this.setMode();
        break;
      default:
        if (!tile.isHouse()) {
          this._turnBack = true;
        }
        this.setMode();
        break;
    }
  };
  _proto.isFrightened = function isFrightened() {
    return this.frightened || this.mode === MODE_FRIGHTENED;
  };
  _proto.isDead = function isDead() {
    return this.mode === MODE_DEAD;
  };
  _proto.onGameGlobalMode = function onGameGlobalMode(mode) {
    if (mode) this.globalMode = mode;
  };
  _proto.move = function move() {
    if (this.shouldExitMode()) {
      this.onExitMode();
    } else {
      if (this.mode === MODE_DEAD) {
        if (!this.deadPrepareEnter && this.getTile() === this.deadTarget) {
          this.deadPrepareEnter = true;
        }
        if (this.deadPrepareEnter) {
          var endX = this.deadEndX;
          var endY = this.deadEndY;
          // Should go to center first
          if (this.y < endY) endX = this.deadTarget.x - this.map.tw / 2;
          // Set direction
          if (this.x < endX) this.dir = 'r';else if (this.x > endX) this.dir = 'l';else if (this.y < endY) this.dir = 'd';
          // Move
          if (this.dir === 'd') this.y += this.getMin(this.getStep(), endY - this.y);
          if (this.dir === 'r') this.x += this.getMin(this.getStep(), endX - this.x);
          if (this.dir === 'l') this.x -= this.getMin(this.getStep(), this.x - endX);
          this.setNextAnimation();
          this.update();
        } else {
          _Character.prototype.move.call(this, this._dir);
        }
      } else if (this.mode === MODE_HOUSE) {
        if (!this.houseTimer) this.houseTimer = new _engine_Timer__WEBPACK_IMPORTED_MODULE_1__["default"](this.waitTime);
        var tile = this.getTile();
        if (!this.housePrepareExit && this.houseTimer.isElapsed() && !tile.isWall()) {
          this.housePrepareExit = true;
          this.y = tile.y;
        }
        if (this.frightened && this.frightenedTimer.isElapsed()) {
          this.frightened = null;
        }
        if (this.housePrepareExit) {
          if (this.x < this.houseExitTileX) this.dir = 'r';else if (this.x > this.houseExitTileX) this.dir = 'l';else this.dir = 'u';
          if (this.dir === 'u') this.y -= this.getMin(this.getStep(), this.y - this.houseExitTile.getU().y);
          if (this.dir === 'r') this.x += this.getMin(this.getStep(), this.houseExitTileX - this.x);
          if (this.dir === 'l') this.x -= this.getMin(this.getStep(), this.x - this.houseExitTileX);
        } else {
          if (this.y <= this.houseTop && this.dir === 'u') this.dir = 'd';
          if (this.y >= this.houseBottom && this.dir === 'd') this.dir = 'u';
          if (this.dir === 'u') this.y -= this.getMin(this.getStep(), this.y - this.houseTop);
          if (this.dir === 'd') this.y += this.getMin(this.getStep(), this.houseBottom - this.y);
        }
        this.setNextAnimation();
        this.update();
      } else {
        _Character.prototype.move.call(this, this._dir);
      }
    }

    // Eat or eaten!
    if (!this._eatEvent) {
      var pt = this.pacmanData.tile,
        t = this.getTile(),
        op = this._getOpDirection(this.dir);
      if (pt === t || this.pacmanData.dir === op && pt === t.get(op)) {
        this._eatEvent = true;
        if (this.mode === MODE_FRIGHTENED) {
          // Ghost eaten by Pacman!
          this.setMode(MODE_DEAD);
          this.emit('item:eaten');
        } else if (this.mode !== MODE_DEAD) {
          // Eat Pacman!
          this.emit('item:eat');
        }
      }
    }
  };
  _proto.canGo = function canGo(dir, tile) {
    if (!tile) tile = this.getTile();
    var nextTile = tile.get(dir);
    if (this.mode === MODE_DEAD) return !nextTile || !nextTile.isWall();
    if (!nextTile) return false;
    return !nextTile.isWall() && !nextTile.isHouse();
  };
  _proto.getNextDirection = function getNextDirection() {
    if (this.mode === MODE_FRIGHTENED) {
      // Next tile.
      var _nextTile = this.getTile().get(this._dir);
      // Clockwise direction order.
      var _directions = ['u', 'r', 'd', 'l', 'u', 'r', 'd', 'l'];
      // Select random direction. Then try that direction or change following clockwise order.
      var idx = (0,_helper_rnd__WEBPACK_IMPORTED_MODULE_4__["default"])(4);
      var _nextDirection = _directions[idx];
      while (_nextDirection && (_nextDirection === this._getOpDirection(this._dir) || !this.canGo(_nextDirection, _nextTile))) {
        _nextDirection = _directions[++idx];
      }
      return _nextDirection;
    }
    // Target Tile
    var targetTile = this.mode === MODE_CHASE ? this.getChaseTarget() : this.mode === MODE_SCATTER ? this.scatterTarget : this.deadTarget;
    var _dir = this._dir || this.dir;
    // Next tile.
    var nextTile = this.getTile().get(_dir);
    // Preferred direction order.
    var directions = ['u', 'l', 'd', 'r'];
    var nextDirection, lastDistance;
    for (var i = 0; i < 4; i++) {
      var dir = directions[i];
      // Cant't go back.
      if (dir === this._getOpDirection(_dir)) continue;
      if (this.canGo(dir, nextTile)) {
        var testTile = nextTile.get(dir);
        var distance = (0,_helper_getDistance__WEBPACK_IMPORTED_MODULE_3__["default"])(testTile, targetTile);
        if (typeof lastDistance === 'undefined' || lastDistance > distance) {
          nextDirection = dir;
          lastDistance = distance;
        }
      }
    }
    return nextDirection;
  };
  _proto.setNextAnimation = function setNextAnimation() {
    if (this.mode === MODE_DEAD) {
      switch (this.dir) {
        case 'u':
          this._nextAnimation = this.animations.deadUp;
          break;
        case 'r':
          this._nextAnimation = this.animations.deadRight;
          break;
        case 'd':
          this._nextAnimation = this.animations.deadDown;
          break;
        case 'l':
          this._nextAnimation = this.animations.deadLeft;
          break;
      }
    } else if (this.mode === MODE_FRIGHTENED || this.mode === MODE_HOUSE && this.frightened) {
      if (this.frightenedTime - this.frightenedTime * 0.2 > this.frightenedTimer.getElapsed()) {
        this._nextAnimation = this.animations.frightened;
      } else {
        this._nextAnimation = this.animations.frightenedBlink;
      }
    } else {
      _Character.prototype.setNextAnimation.call(this);
    }
  };
  return Ghost;
}(_Character__WEBPACK_IMPORTED_MODULE_2__["default"]);
Object.assign(Ghost.prototype, defaults);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ghost);

/***/ }),

/***/ "./src/js/Item.js":
/*!************************!*\
  !*** ./src/js/Item.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _engine_Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine/Sprite */ "./src/js/engine/Sprite.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Item = /*#__PURE__*/function (_Sprite) {
  function Item(options) {
    var _this;
    if (options === void 0) {
      options = {};
    }
    _this = _Sprite.call(this, options) || this;
    if (options.map) _this.map = options.map;
    // Half width and half height.
    _this.offsetX = parseInt(_this.width / 2);
    _this.offsetY = parseInt(_this.height / 2);
    // Render.
    _this.render();
    return _this;
  }
  _inheritsLoose(Item, _Sprite);
  var _proto = Item.prototype;
  _proto.getTile = function getTile() {
    return this.map.getTile(this.x, this.y, true);
  };
  _proto.destroy = function destroy() {
    _Sprite.prototype.destroy.call(this).removeElement();
  };
  _proto.hide = function hide() {
    this.el.style.display = 'none';
  };
  _proto.show = function show() {
    this.el.style.display = '';
  };
  return Item;
}(_engine_Sprite__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Item);

/***/ }),

/***/ "./src/js/Lives.js":
/*!*************************!*\
  !*** ./src/js/Lives.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Pacman__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pacman */ "./src/js/Pacman.js");

var Lives = /*#__PURE__*/function () {
  function Lives(options) {
    this.pacmans = [];
    this.model = options.model;
    for (var i = 0; i < 5; i++) {
      var pacman = new _Pacman__WEBPACK_IMPORTED_MODULE_0__["default"]({
        x: options.x + i * 70,
        y: options.y,
        factor: options.factor,
        defaultAnimation: 'right',
        addGameGhostEatEventListener: function addGameGhostEatEventListener() {},
        addGameGhostModeFrightenedEnter: function addGameGhostModeFrightenedEnter() {},
        addGameGhostModeFrightenedExit: function addGameGhostModeFrightenedExit() {},
        normalizeRefrashRate: function normalizeRefrashRate() {
          return 1;
        }
      });
      options.addSprite(pacman);
      this.pacmans.push(pacman);
      if (i > this.model.lives - 2) this.pacmans[i].hide();
    }
    this.model.on('change:lives', this.render.bind(this));
  }
  var _proto = Lives.prototype;
  _proto.render = function render() {
    for (var i = 0; i < 5; i++) {
      if (i > this.model.lives - 2) this.pacmans[i].hide();else this.pacmans[i].show();
    }
  };
  return Lives;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Lives);

/***/ }),

/***/ "./src/js/Map.js":
/*!***********************!*\
  !*** ./src/js/Map.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile.js */ "./src/js/Tile.js");

var Map = /*#__PURE__*/function () {
  function Map(data) {
    /*
    data = ['----------------------------',
            '============================',
            '=......==..........==......=',
            '=*====.==.========.==.====*=']
    */
    // Store tiles in array.
    this.tiles = [];
    // Set with and height according to data.
    this.width = data[0].length;
    this.height = data.length;
    this.tunnels = [];

    // Instantiate tiles and store them.
    for (var y = 0; y < this.height; y++) {
      var r = data[y];
      for (var x = 0; x < this.width; x++) {
        var code = r.charAt(x);
        var tile = new _Tile_js__WEBPACK_IMPORTED_MODULE_0__["default"](code, x, y, this);
        this.tiles.push(tile);
        if (tile.isHouse() && !this.house) {
          // Store left house door
          this.house = tile;
        }
        if (tile.isTunnel() && (tile.col === 0 || tile.col === this.width - 1)) {
          this.tunnels.push(tile);
        }
      }
    }
    this.houseCenter = this.house.getD().getD();

    // Cache tile dimensions
    this.tileWidth = this.tiles[0].width;
    this.tileHeight = this.tiles[0].height;
  }

  // Return tile object.
  var _proto = Map.prototype;
  _proto.getTile = function getTile(col, row, inPixels) {
    if (inPixels) {
      col = parseInt(col / this.tileWidth);
      row = parseInt(row / this.tileHeight);
    }
    if (col > this.width - 1) col = 0;
    if (col < 0) col = this.width - 1;
    if (row > this.height - 1) row = 0;
    if (row < 0) row = this.height - 1;
    var idx = row * this.width + col;
    return this.tiles[idx] || null;
  };
  _proto.destroyItems = function destroyItems() {
    var i = this.tiles.length;
    while (i--) {
      var t = this.tiles[i];
      if (t.item) t.item.destroy();
    }
  };
  _proto.hideItems = function hideItems() {
    var i = this.tiles.length;
    while (i--) {
      var t = this.tiles[i];
      if (t.item) t.item.hide();
    }
  };
  return Map;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Map);

/***/ }),

/***/ "./src/js/Pacman.js":
/*!**************************!*\
  !*** ./src/js/Pacman.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _engine_Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine/Animation */ "./src/js/engine/Animation.js");
/* harmony import */ var _Character_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Character.js */ "./src/js/Character.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


var animationBase = {
  imageURL: 'img/characters1.png',
  numberOfFrame: 1,
  delta: 64,
  refreshRate: 60,
  offsetY: 60,
  type: _engine_Animation__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_HORIZONTAL
};
var animations = {
  'right': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase)),
  'down': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    offsetX: 64 * 4
  })),
  'up': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    offsetX: 64 * 8
  })),
  'left': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
    offsetX: 64 * 12
  }))
};
var defaults = {
  animations: animations,
  dir: 'l',
  defaultAnimation: 'left',
  preturn: true,
  frightenedSpeed: null,
  frightenedDotSpeed: null,
  dotSpeed: null
};
var Pacman = /*#__PURE__*/function (_Character) {
  function Pacman(options) {
    var _this;
    _this = _Character.call(this, options) || this;
    Object.keys(defaults).forEach(function (key) {
      if (key in options) _this[key] = options[key];
    });
    var addGameGhostEatEventListener = options.addGameGhostEatEventListener,
      addGameGhostModeFrightenedEnter = options.addGameGhostModeFrightenedEnter,
      addGameGhostModeFrightenedExit = options.addGameGhostModeFrightenedExit;
    _this._ghostFrightened = 0;

    // Change tile. Set direction.
    _this.on('item:tile', function (tile) {
      if (_this._ghostFrightened) _this._speed = _this.frightenedSpeed;else _this._speed = _this.speed;
      if (tile.item) {
        if (tile.hasPill()) {
          // Pill!
          _this.emit('item:eatpill', tile);
        } else if (tile.hasDot()) {
          // Dot!
          _this.emit('item:eatdot', tile);
          if (_this._ghostFrightened) _this._speed = _this.frightenedDotSpeed;else _this._speed = _this.dotSpeed;
        }
        tile.item.destroy();
        tile.item = null;
      }
    });
    addGameGhostEatEventListener(function (ghost) {
      _this._eatenTurns = 9;
      _this.dir = 'r';
      _this.pauseAnimation();
    });
    addGameGhostModeFrightenedEnter(function () {
      _this._ghostFrightened++;
    });
    addGameGhostModeFrightenedExit(function () {
      _this._ghostFrightened--;
    });
    return _this;
  }
  _inheritsLoose(Pacman, _Character);
  var _proto = Pacman.prototype;
  _proto.reset = function reset() {
    _Character_js__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.reset.apply(this);
    this._lastEatenTurnsTime = null;
  };
  _proto.move = function move() {
    if (!this._eatenTurns) _Character_js__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.move.apply(this, arguments);else if (!this._eatenTurnsFrames) {
      if (this._eatenTurns === 9) this.emit('item:die');
      if (this._eatenTurns > 2) {
        var directions = {
          'd': 'l',
          'l': 'u',
          'u': 'r',
          'r': 'd'
        };
        this.dir = directions[this.dir];
        this.setNextAnimation();
        this.update();
        this._eatenTurnsFrames = 5;
      } else this._eatenTurnsFrames = 25;
      this._eatenTurns--;
      if (this._eatenTurns === 0) this.emit('item:life');
    } else this._eatenTurnsFrames--;
  };
  return Pacman;
}(_Character_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
;
Object.assign(Pacman.prototype, defaults);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pacman);

/***/ }),

/***/ "./src/js/SoundManager.js":
/*!********************************!*\
  !*** ./src/js/SoundManager.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _engine_Sound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine/Sound */ "./src/js/engine/Sound.js");

var SoundManager = /*#__PURE__*/function () {
  function SoundManager(options) {
    var _this = this;
    this.soundEnabled = !!options.soundEnabled;
    if (this.soundEnabled) {
      this.sounds = {
        intro: new _engine_Sound__WEBPACK_IMPORTED_MODULE_0__["default"]('audio/intro.mp3'),
        back: new _engine_Sound__WEBPACK_IMPORTED_MODULE_0__["default"]('audio/back.mp3'),
        dot: new _engine_Sound__WEBPACK_IMPORTED_MODULE_0__["default"]('audio/dot.mp3'),
        eaten: new _engine_Sound__WEBPACK_IMPORTED_MODULE_0__["default"]('audio/eaten.mp3'),
        eat: new _engine_Sound__WEBPACK_IMPORTED_MODULE_0__["default"]('audio/eat.mp3'),
        frightened: new _engine_Sound__WEBPACK_IMPORTED_MODULE_0__["default"]('audio/frightened.mp3'),
        dead: new _engine_Sound__WEBPACK_IMPORTED_MODULE_0__["default"]('audio/dead.mp3'),
        bonus: new _engine_Sound__WEBPACK_IMPORTED_MODULE_0__["default"]('audio/bonus.mp3'),
        life: new _engine_Sound__WEBPACK_IMPORTED_MODULE_0__["default"]('audio/life.mp3')
      };
      Object.keys(this.sounds).forEach(function (key) {
        options.addSound(_this.sounds[key]);
      });
    }
  }
  var _proto = SoundManager.prototype;
  _proto.play = function play(label) {
    if (this.soundEnabled) this.sounds[label].play();
  };
  return SoundManager;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SoundManager);

/***/ }),

/***/ "./src/js/Tile.js":
/*!************************!*\
  !*** ./src/js/Tile.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Tile = /*#__PURE__*/function () {
  function Tile(code, col, row, map) {
    this.code = code;
    this.col = col;
    this.row = row;
    this.map = map;
    this.width = 32;
    this.height = 32;
    this.x = this.col * this.width + this.width / 2;
    this.y = this.row * this.height + this.height / 2 + 4; // Original Pacman has tile's center at x : 4, y : 5 position.
  }
  var _proto = Tile.prototype;
  _proto.isWall = function isWall() {
    return this.code === '=';
  };
  _proto.isHouse = function isHouse() {
    return this.code === 'h';
  };
  _proto.isTunnel = function isTunnel() {
    return this.code === 't';
  };
  _proto.hasDot = function hasDot() {
    return this.item && this.code === '.';
  };
  _proto.hasPill = function hasPill() {
    return this.item && this.code === '*';
  };
  _proto.get = function get(dir) {
    if (dir === 'u') return this.getU();
    if (dir === 'd') return this.getD();
    if (dir === 'l') return this.getL();
    if (dir === 'r') return this.getR();
    return null;
  };
  _proto.getU = function getU() {
    return this.map.getTile(this.col, this.row - 1) || null;
  };
  _proto.getD = function getD() {
    return this.map.getTile(this.col, this.row + 1) || null;
  };
  _proto.getL = function getL() {
    return this.map.getTile(this.col - 1, this.row) || null;
  };
  _proto.getR = function getR() {
    return this.map.getTile(this.col + 1, this.row) || null;
  };
  return Tile;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tile);

/***/ }),

/***/ "./src/js/engine/Animation.js":
/*!************************************!*\
  !*** ./src/js/engine/Animation.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ANIMATION_CALLBACK: () => (/* binding */ ANIMATION_CALLBACK),
/* harmony export */   ANIMATION_HORIZONTAL: () => (/* binding */ ANIMATION_HORIZONTAL),
/* harmony export */   ANIMATION_ONCE: () => (/* binding */ ANIMATION_ONCE),
/* harmony export */   ANIMATION_PINGPONG: () => (/* binding */ ANIMATION_PINGPONG),
/* harmony export */   ANIMATION_VERTICAL: () => (/* binding */ ANIMATION_VERTICAL),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ANIMATION_VERTICAL = 1; // Generated by a vertical offset of the background
var ANIMATION_HORIZONTAL = 2; // Generated by a horizontal offset of the background
var ANIMATION_ONCE = 4; // Played only once (else looping indefinitely)
var ANIMATION_CALLBACK = 8; // A callback is exectued at the end of a cycle
var ANIMATION_PINGPONG = 32; // At the last frame of the animation it reverses (if used in conjunction with ONCE it will have no effect)

var defaults = {
  // The url of the image to be used as an animation or sprite
  imageURL: null,
  // The number of frames to be displayed when playing the animation
  numberOfFrame: 1,
  // The distance in pixels between two frames
  delta: 0,
  // The rate at which the frames change in miliseconds
  refreshRate: 30,
  // The type of the animation.This is a bitwise OR of the properties.
  type: 0,
  // The x coordinate where the first sprite begins
  offsetX: 0,
  // The y coordinate where the first sprite begins
  offsetY: 0
};
var Animation = /*#__PURE__*/function () {
  function Animation(options) {
    var _this = this;
    Object.keys(defaults).forEach(function (key) {
      if (key in options) _this[key] = options[key];
    });
  }
  var _proto = Animation.prototype;
  _proto.load = function load() {
    var _this2 = this;
    this.img = new Image();
    this.img.src = this.imageURL;
    return new Promise(function (resolve, reject) {
      _this2.img.addEventListener('load', resolve);
    });
  };
  _proto.isReady = function isReady() {
    return this.img.complete;
  };
  return Animation;
}();
Object.assign(Animation.prototype, defaults);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Animation);

/***/ }),

/***/ "./src/js/engine/Game.js":
/*!*******************************!*\
  !*** ./src/js/engine/Game.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STATE_NEW: () => (/* binding */ STATE_NEW),
/* harmony export */   STATE_PAUSED: () => (/* binding */ STATE_PAUSED),
/* harmony export */   STATE_RUNNING: () => (/* binding */ STATE_RUNNING),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var rasti__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rasti */ "./node_modules/rasti/lib/index.js");
/* harmony import */ var _Keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Keyboard */ "./src/js/engine/Keyboard.js");
/* harmony import */ var _Touch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Touch */ "./src/js/engine/Touch.js");
/* harmony import */ var _Scaling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Scaling */ "./src/js/engine/Scaling.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





// Game states
var STATE_NEW = 0;
var STATE_RUNNING = 1;
var STATE_PAUSED = 2;
var defaults = {
  height: 320,
  width: 480,
  originalHeight: 320,
  originalWidth: 480,
  refreshRate: 30,
  position: 'absolute'
};
var Game = /*#__PURE__*/function (_View) {
  function Game(options) {
    var _this;
    _this = _View.call(this, options) || this;
    Object.keys(defaults).forEach(function (key) {
      if (key in options) _this[key] = options[key];
    });
    _this.sprites = _this.children; // List of sprites with animations / images used in the game
    _this.sounds = []; // List of sounds used in the game
    _this.callbacks = []; // List of the functions called at each refresh
    _this.loadedSpritesIndex = 0; // Keep track of the last loaded animation
    _this.loadedSoundsIndex = 0; // Keep track of the last loaded sound

    _this.keyboard = new _Keyboard__WEBPACK_IMPORTED_MODULE_1__["default"]();
    _this.touch = new _Touch__WEBPACK_IMPORTED_MODULE_2__["default"]();
    _this.scaling = new _Scaling__WEBPACK_IMPORTED_MODULE_3__["default"](_this.originalWidth, _this.originalHeight);
    _this.scaling.resize(_this.width, _this.height);
    _this.state = STATE_NEW;
    return _this;
  }
  _inheritsLoose(Game, _View);
  var _proto = Game.prototype;
  _proto.render = function render() {
    _View.prototype.render.call(this);

    // We initialize the display of the div
    Object.assign(this.el.style, {
      position: this.position,
      display: 'block',
      overflow: 'hidden',
      height: this.scaling.height + "px",
      width: this.scaling.width + "px",
      fontSize: this.scaling.getFactor() * 2 + "em"
    });
    this.scenegraph = this.createElement('div', {
      style: 'visibility: hidden;'
    });
    this.el.appendChild(this.scenegraph);
    return this;
  };
  _proto.onDestroy = function onDestroy() {
    this.keyboard.destroy();
    this.touch.destroy();
  }

  /**
   * Load resources before starting the game.
   */;
  _proto.preload = function preload() {
    // Start loading the images
    for (var i = this.sprites.length - 1; i >= this.loadedSpritesIndex; i--) {
      this.sprites[i].load();
    }

    // Start loading the sounds
    for (var _i = this.sounds.length - 1; _i >= this.loadedSoundsIndex; _i--) {
      this.sounds[_i].load();
    }
    this.waitForResources();
  }

  /**
   * Wait for all the resources called for in preload() to finish loading.
   */;
  _proto.waitForResources = function waitForResources() {
    // Check the images
    var spriteCount = 0;
    for (var i = this.loadedSpritesIndex; i < this.sprites.length; i++) {
      if (this.sprites[i].isReady()) {
        spriteCount++;
      }
    }
    // Check the sounds
    var soundCount = 0;
    for (var _i2 = this.loadedSoundsIndex; _i2 < this.sounds.length; _i2++) {
      if (this.sounds[_i2].isReady()) {
        soundCount++;
      }
    }
    var rest = this.sprites.length + this.sounds.length - this.loadedSpritesIndex - this.loadedSoundsIndex;

    // Call the load callback with the current progress
    if (typeof this.onLoadProgress === 'function') {
      var percent = (spriteCount + soundCount) / rest * 100;
      this.onLoadProgress(percent);
    }
    if (spriteCount + soundCount < rest) {
      setTimeout(this.waitForResources.bind(this), 100);
    } else {
      this.loadedSpritesIndex = this.sprites.length;
      this.loadedSoundsIndex = this.sounds.length;

      // Launch the refresh loop
      if (this.state === STATE_NEW) {
        setInterval(this.refresh.bind(this), this.refreshRate);
      }
      this.state = STATE_RUNNING;
      if (typeof this._onReadyCallback === 'function') {
        this._onReadyCallback();
        this._onReadyCallback = null;
      }
      // Make the scenegraph visible
      this.scenegraph.style.visibility = 'visible';
    }
  }
  /**
   * Add a sprite.
   */;
  _proto.addSprite = function addSprite(sprite) {
    var _this2 = this;
    this.scenegraph.appendChild(this.addChild(sprite).el);
    return this.state === STATE_RUNNING ? sprite.load().then(function () {
      _this2.loadedSpritesIndex++;
      return Promise.resolve();
    }) : Promise.resolve();
  }
  /**
   * Add a sound.
   */;
  _proto.addSound = function addSound(sound) {
    var _this3 = this;
    this.sounds.push(sound);
    return this.state === STATE_RUNNING ? sound.load().then(function () {
      _this3.loadedSoundsIndex++;
      return Promise.resolve();
    }) : Promise.resolve();
  }
  /**
   * Register a callback.
   *
   * @param {function} fn the callback
   * @param {integer} rate the rate in ms at which the callback should be called (should be a multiple of the playground rate or will be rounded)
   */;
  _proto.addCallback = function addCallback(callback, refreshRate) {
    if (refreshRate === void 0) {
      refreshRate = this.refreshRate;
    }
    this.callbacks.push({
      fn: callback,
      refreshRate: this.normalizeRefrashRate(refreshRate),
      idleCounter: 0
    });
  }
  /**
   * Called periodically to refresh the state of the game.
   */;
  _proto.refresh = function refresh() {
    if (this.state === STATE_RUNNING) {
      this.sprites.forEach(function (sprite) {
        sprite.refresh();
      });
      var deadCallbacks = [];
      for (var i = this.callbacks.length - 1; i >= 0; i--) {
        if (this.callbacks[i].idleCounter === this.callbacks[i].refreshRate - 1) {
          var value = this.callbacks[i].fn();
          if (typeof value === 'boolean') {
            // If we have a boolean: 'true' means 'no more execution', 'false' means 'keep on executing'
            if (value) {
              deadCallbacks.push(i);
            }
          } else if (typeof value === 'number') {
            // If we have a number it re-defines the time to the next call
            this.callbacks[i].refreshRate = this.normalizeRefrashRate(value);
            this.callbacks[i].idleCounter = 0;
          }
        }
        this.callbacks[i].idleCounter = (this.callbacks[i].idleCounter + 1) % this.callbacks[i].refreshRate;
      }
      for (var i = deadCallbacks.length - 1; i >= 0; i--) {
        this.callbacks.splice(deadCallbacks[i], 1);
      }
    }
  }
  /**
   * Clear the animations and sounds.
   */;
  _proto.clear = function clear(clearCallbacks) {
    this.destroyChildren();
    this.loadedSpritesIndex = 0;
    this.sounds = [];
    this.loadedSoundsIndex = 0;
    if (clearCallbacks) {
      this.callbacks = [];
    }
    this.scenegraph.innerHTML = '';
  }
  /**
  * Mute (or unmute) all the sounds.
  */;
  _proto.muteSound = function muteSound(muted) {
    for (var i = this.sounds.length - 1; i >= 0; i--) {
      this.sounds[i].mute(muted);
    }
  }
  /**
  * Starts the game.
  */;
  _proto.start = function start(callback) {
    if (typeof callback === 'function') this._onReadyCallback = callback;
    this.preload();
  }
  /**
   * TODO
   */;
  _proto.pause = function pause() {
    this.state = STATE_PAUSED;
    this.scenegraph.style.visibility = 'hidden';
  }
  /**
   * Resume the game if it was paused and call the callback passed in argument once the newly added ressources are loaded.
   */;
  _proto.resume = function resume(callback) {
    if (this.state === STATE_PAUSED) {
      if (typeof callback === 'function') this._onReadyCallback = callback;
      this.preload();
    }
  };
  _proto.normalizeRefrashRate = function normalizeRefrashRate(rate) {
    return Math.round(rate / this.refreshRate) || 1;
  };
  return Game;
}(rasti__WEBPACK_IMPORTED_MODULE_0__.View);
Object.assign(Game.prototype, defaults);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

/***/ }),

/***/ "./src/js/engine/Keyboard.js":
/*!***********************************!*\
  !*** ./src/js/engine/Keyboard.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EVENT_KEY_DOWN: () => (/* binding */ EVENT_KEY_DOWN),
/* harmony export */   EVENT_KEY_UP: () => (/* binding */ EVENT_KEY_UP),
/* harmony export */   KEY_DOWN: () => (/* binding */ KEY_DOWN),
/* harmony export */   KEY_LEFT: () => (/* binding */ KEY_LEFT),
/* harmony export */   KEY_RIGHT: () => (/* binding */ KEY_RIGHT),
/* harmony export */   KEY_UP: () => (/* binding */ KEY_UP),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var rasti__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rasti */ "./node_modules/rasti/lib/index.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var EVENT_KEY_UP = 'keyup';
var EVENT_KEY_DOWN = 'keydown';
var Keyboard = /*#__PURE__*/function (_View) {
  function Keyboard(options) {
    var _this;
    _this = _View.call(this, _extends({
      el: document && document.body
    }, options)) || this;
    _this.keys = {};
    return _this;
  }
  _inheritsLoose(Keyboard, _View);
  var _proto = Keyboard.prototype;
  _proto.onKeyUp = function onKeyUp(event) {
    this.keys[event.keyCode] = false;
    this.emit(EVENT_KEY_UP, event);
  };
  _proto.onKeyDown = function onKeyDown(event) {
    this.keys[event.keyCode] = true;
    this.emit(EVENT_KEY_DOWN, event);
  };
  _proto.clear = function clear() {
    this.keys = {};
  };
  return Keyboard;
}(rasti__WEBPACK_IMPORTED_MODULE_0__.View);
Keyboard.prototype.events = {
  keyup: 'onKeyUp',
  keydown: 'onKeyDown'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Keyboard);

/***/ }),

/***/ "./src/js/engine/Model.js":
/*!********************************!*\
  !*** ./src/js/engine/Model.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var rasti__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rasti */ "./node_modules/rasti/lib/index.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ModelLocalStorage = /*#__PURE__*/function (_Model) {
  function ModelLocalStorage(attrs) {
    return _Model.call(this, attrs) || this;
  }
  _inheritsLoose(ModelLocalStorage, _Model);
  var _proto = ModelLocalStorage.prototype;
  _proto.fetch = function fetch() {
    if (this.url && window.localStorage) {
      var item = window.localStorage.getItem(this.url);
      if (item) this.set(JSON.parse(item));
    }
  };
  _proto.save = function save() {
    if (this.url && window.localStorage) {
      window.localStorage.setItem(this.url, JSON.stringify(this));
    }
  };
  return ModelLocalStorage;
}(rasti__WEBPACK_IMPORTED_MODULE_0__.Model);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModelLocalStorage);

/***/ }),

/***/ "./src/js/engine/Scaling.js":
/*!**********************************!*\
  !*** ./src/js/engine/Scaling.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Scaling = /*#__PURE__*/function () {
  function Scaling(w, h) {
    this.originalWidth = this.width = w;
    this.originalHeight = this.height = h;
    this.widthToHeight = w / h;
  }
  var _proto = Scaling.prototype;
  _proto.resize = function resize(newWidth, newHeight) {
    var newWidthToHeight = newWidth / newHeight;
    if (newWidthToHeight > this.widthToHeight) {
      this.width = newHeight * this.widthToHeight;
      this.height = newHeight;
    } else {
      this.height = newWidth / this.widthToHeight;
      this.width = newWidth;
    }
  };
  _proto.getFactor = function getFactor() {
    return this.width / this.originalWidth;
  };
  return Scaling;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scaling);

/***/ }),

/***/ "./src/js/engine/Sound.js":
/*!********************************!*\
  !*** ./src/js/engine/Sound.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Single AudioContext for all sounds.
var audioCtx;
var gainNode;

// Polyfill decodeAudioData Promise-based syntax on safari.
var decodeAudioData = function decodeAudioData(arrayBuffer) {
  return new Promise(function (resolve, reject) {
    audioCtx.decodeAudioData(arrayBuffer, resolve, reject);
  });
};
var Sound = /*#__PURE__*/function () {
  function Sound(url) {
    if (!audioCtx) {
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
      gainNode = audioCtx.createGain();
      gainNode.connect(audioCtx.destination);
    }
    this.url = url;
  }
  var _proto = Sound.prototype;
  _proto.load = function load() {
    var _this = this;
    fetch(this.url).then(function (response) {
      return response.arrayBuffer();
    }).then(function (arrayBuffer) {
      return decodeAudioData(arrayBuffer);
    }).then(function (audioBuffer) {
      _this.audioBuffer = audioBuffer;
      return Promise.resolve(audioBuffer);
    });
  };
  _proto.play = function play() {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    var trackSource = audioCtx.createBufferSource();
    trackSource.buffer = this.audioBuffer;
    trackSource.connect(gainNode);
    trackSource.start();
  };
  _proto.mute = function mute(muted) {
    // Muted my default unless muted === false.
    this.muted = muted !== false;
    if (this.muted) {
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    } else {
      gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    }
  };
  _proto.isReady = function isReady() {
    return !!this.audioBuffer;
  };
  return Sound;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sound);

/***/ }),

/***/ "./src/js/engine/Sprite.js":
/*!*********************************!*\
  !*** ./src/js/engine/Sprite.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var rasti__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rasti */ "./node_modules/rasti/lib/index.js");
/* harmony import */ var _Animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Animation */ "./src/js/engine/Animation.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var defaults = {
  width: 32,
  height: 32,
  x: 0,
  y: 0,
  z: 0,
  offsetX: 0,
  offsetY: 0,
  idleCounter: 0,
  currentFrame: 0,
  frameIncrement: 1,
  angle: 0,
  factor: 1,
  playing: true,
  factorH: 1,
  factorV: 1,
  animations: {},
  defaultAnimation: 'default',
  normalizeRefrashRate: null,
  type: null
};
var Sprite = /*#__PURE__*/function (_View) {
  function Sprite(options) {
    var _this;
    _this = _View.call(this, options) || this;
    Object.keys(defaults).forEach(function (key) {
      if (key in options) _this[key] = options[key];
    });
    return _this;
  }
  _inheritsLoose(Sprite, _View);
  var _proto = Sprite.prototype;
  _proto.load = function load() {
    var _this2 = this;
    return Promise.all(Object.keys(this.animations).map(function (label) {
      return _this2.animations[label].load();
    }));
  };
  _proto.isReady = function isReady() {
    var _this3 = this;
    return Object.keys(this.animations).some(function (label) {
      return !!_this3.animations[label].isReady();
    });
  };
  _proto.render = function render() {
    Object.assign(this.el.style, {
      position: 'absolute',
      overflow: 'hidden',
      height: this.height + "px",
      width: this.width + "px",
      zIndex: this.z
    });
    this.setAnimation(this.animations[this.defaultAnimation]);
    this.transform();
  };
  _proto.refresh = function refresh() {
    if (!this.animation) return;
    if (this.idleCounter === this.normalizeRefrashRate(this.animation.refreshRate) - 1 && this.playing) {
      // Does 'this' loops?
      if (this.animation.type & _Animation__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_ONCE) {
        if (this.currentFrame < this.animation.numberOfFrame - 1) {
          this.currentFrame += this.frameIncrement;
        } else if (this.currentFrame == this.animation.numberOfFrame - 1) {
          // Does 'this' has a callback ?
          if (this.animation.type & _Animation__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_CALLBACK) {
            if (typeof this.callback === 'function') {
              this.callback(this);
              this.callback = null;
            }
          }
        }
      } else {
        if (this.animation.type & _Animation__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_PINGPONG) {
          if (this.currentFrame === this.animation.numberOfFrame - 1 && this.frameIncrement === 1) {
            this.frameIncrement = -1;
          } else if (this.currentFrame === 0 && this.frameIncrement === -1) {
            this.frameIncrement = 1;
          }
        }
        this.currentFrame = (this.currentFrame + this.frameIncrement) % this.animation.numberOfFrame;
        if (this.currentFrame === 0) {
          // Does 'this' has a callback ?
          if (this.animation.type & _Animation__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_CALLBACK) {
            if (typeof this.callback === 'function') {
              this.callback(this);
            }
          }
        }
      }
      // Update the background
      if (this.animation.numberOfFrame > 1) {
        var x = 0,
          y = 0;
        if (this.animation.type & _Animation__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_VERTICAL) {
          x = -this.animation.offsetX;
          y = -this.animation.offsetY - this.animation.delta * this.currentFrame;
        } else if (this.animation.type & _Animation__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_HORIZONTAL) {
          x = -this.animation.offsetX - this.animation.delta * this.currentFrame;
          y = -this.animation.offsetY;
        }
        this.el.style.backgroundPosition = x + "px " + y + "px";
      }
    }
    this.idleCounter = (this.idleCounter + 1) % this.normalizeRefrashRate(this.animation.refreshRate);
  }
  /**
   * Stop the animation at the current frame.
   */;
  _proto.pauseAnimation = function pauseAnimation() {
    this.playing = false;
  }
  /**
   * Resume the animation (if paused)
    */;
  _proto.resumeAnimation = function resumeAnimation() {
    this.playing = true;
  }
  /**
   * Changes the animation associated with a sprite.
   */;
  _proto.setAnimation = function setAnimation(animation, index, callback) {
    this.animation = animation;
    this.currentFrame = 0;
    this.frameIncrement = 1;
    this.el.style.backgroundImage = "url('" + animation.imageURL + "')";
    if (animation.type & _Animation__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_VERTICAL) {
      this.el.style.backgroundRepeat = 'repeat-x';
    } else if (animation.type & _Animation__WEBPACK_IMPORTED_MODULE_1__.ANIMATION_HORIZONTAL) {
      this.el.style.backgroundRepeat = 'repeat-y';
    } else {
      this.el.style.backgroundRepeat = 'no-repeat';
    }
    var distanceX = 0;
    var distanceY = 0;
    this.el.style.backgroundPosition = -distanceX - animation.offsetX + "px " + (-distanceY - animation.offsetY) + "px";
    if (typeof callback === 'function') {
      this.callback = callback;
    }
  }
  /**
   * Internal function doing the combined actions of rotate and scale.
   * Please use .rotate() or .scale() instead since they are part of the supported API!
   */;
  _proto.transform = function transform() {
    this.el.style.transform = "translate(" + (this.x * this.factor - this.offsetX) + "px, " + (this.y * this.factor - this.offsetY) + "px) rotate(" + this.angle + "deg) scale(" + this.factor * this.factorH + ", " + this.factor * this.factorV + ")";
  }
  /**
   * Rotate the element(s) clock-wise.
   *
   * @param {Number} angle the angle in degrees
   * @param {Boolean} relative or not
   */;
  _proto.rotate = function rotate(angle, relative) {
    if (relative === true) {
      angle += this.angle;
      angle %= 360;
    }
    this.angle = parseFloat(angle);
    this.transform();
  }
  /**
   * Change the scale of the selected element(s). The passed argument is a ratio:
   *
   * @param {Number} factor a ratio: 1.0 = original size, 0.5 = half the original size etc.
   * @param {Boolean} relative or not
   */;
  _proto.scale = function scale(factor, relative) {
    if (relative === true) {
      factor *= this.factor;
    }
    this.factor = parseFloat(factor);
    this.transform();
  }
  /**
   * Flips the element(s) horizontally.
   */;
  _proto.flipH = function flipH(flip) {
    if (flip === undefined) {
      return this.factorH !== undefined ? this.factorH === -1 : false;
    } else if (flip) {
      this.factorH = -1;
    } else {
      this.factorH = 1;
    }
    this.transform();
  }
  /**
   * Flips the element(s) vertically.
   */;
  _proto.flipV = function flipV(flip) {
    if (flip === undefined) {
      return this.factorV !== undefined ? this.factorV === -1 : false;
    } else if (flip) {
      this.factorV = -1;
    } else {
      this.factorV = 1;
    }
    this.transform();
  };
  _proto.setXYZ = function setXYZ(options, relative) {
    var _this4 = this;
    var transform = false;
    Object.keys(options).forEach(function (coordinate) {
      switch (coordinate) {
        case 'x':
          if (relative) {
            options.x += _this4.x;
          }
          _this4.x = options.x;
          transform = true;
          break;
        case 'y':
          if (relative) {
            options.y += _this4.y;
          }
          _this4.y = options.y;
          transform = true;
          break;
        case 'z':
          if (relative) {
            options.z += _this4.z;
          }
          _this4.z = options.z;
          _this4.el.style.zIndex = _this4.z;
          break;
      }
    });
    if (transform) this.transform();
  };
  _proto.setWH = function setWH(options, relative) {
    var _this5 = this;
    Object.keys(options).forEach(function (coordinate) {
      switch (coordinate) {
        case 'w':
          if (relative) {
            options.w += _this5.width;
          }
          _this5.width = options.w;
          _this5.el.style.width = _this5.width + "px";
          break;
        case 'h':
          if (relative) {
            options.h += _this5.height;
          }
          _this5.height = options.h;
          _this5.el.style.height = _this5.height + "px";
          break;
      }
    });
  };
  return Sprite;
}(rasti__WEBPACK_IMPORTED_MODULE_0__.View);
Object.assign(Sprite.prototype, defaults);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sprite);

/***/ }),

/***/ "./src/js/engine/Timer.js":
/*!********************************!*\
  !*** ./src/js/engine/Timer.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   ts: () => (/* binding */ ts)
/* harmony export */ });
// Return time stamp in seconds.
var ts = function ts() {
  return new Date().getTime() / 1000;
};
var Timer = /*#__PURE__*/function () {
  function Timer(time) {
    this.time = time;
    this.start = ts();
  }
  var _proto = Timer.prototype;
  _proto.pause = function pause() {
    this.pauseTime = ts();
  };
  _proto.resume = function resume() {
    this.start += ts() - this.pauseTime;
  };
  _proto.getElapsed = function getElapsed() {
    return ts() - this.start;
  };
  _proto.isElapsed = function isElapsed(time) {
    if (time === void 0) {
      time = this.time;
    }
    return this.getElapsed() > time;
  };
  return Timer;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Timer);

/***/ }),

/***/ "./src/js/engine/Touch.js":
/*!********************************!*\
  !*** ./src/js/engine/Touch.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EVENT_SWIPE: () => (/* binding */ EVENT_SWIPE),
/* harmony export */   EVENT_SWIPE_DOWN: () => (/* binding */ EVENT_SWIPE_DOWN),
/* harmony export */   EVENT_SWIPE_LEFT: () => (/* binding */ EVENT_SWIPE_LEFT),
/* harmony export */   EVENT_SWIPE_RIGHT: () => (/* binding */ EVENT_SWIPE_RIGHT),
/* harmony export */   EVENT_SWIPE_UP: () => (/* binding */ EVENT_SWIPE_UP),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var rasti__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rasti */ "./node_modules/rasti/lib/index.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EVENT_SWIPE = 'swipe';
var EVENT_SWIPE_UP = 'swipe:up';
var EVENT_SWIPE_RIGHT = 'swipe:right';
var EVENT_SWIPE_DOWN = 'swipe:down';
var EVENT_SWIPE_LEFT = 'swipe:left';
var defaults = {
  threshold: 100,
  // required min distance traveled to be considered swipe
  restraint: 150,
  // maximum distance allowed at the same time in perpendicular direction
  allowedTime: 400 // maximum time allowed to travel that distance
};
var Touch = /*#__PURE__*/function (_View) {
  function Touch(options) {
    var _this;
    if (options === void 0) {
      options = {};
    }
    _this = _View.call(this, _extends({}, options, {
      el: options.el || document && document.body
    })) || this;
    Object.keys(defaults).forEach(function (key) {
      if (key in options) _this[key] = options[key];
    });
    _this.onTouchStart = _this.onTouchStart.bind(_this);
    _this.onTouchEnd = _this.onTouchEnd.bind(_this);
    _this.el.addEventListener('touchstart', _this.onTouchStart, false);
    _this.el.addEventListener('touchend', _this.onTouchEnd, false);
    return _this;
  }
  _inheritsLoose(Touch, _View);
  var _proto = Touch.prototype;
  _proto.onDestroy = function onDestroy() {
    this.el.removeEventListener('touchstart', this.onTouchStart);
    this.el.removeEventListener('touchend', this.onTouchEnd);
  };
  _proto.onTouchStart = function onTouchStart(event) {
    var touch = event.changedTouches[0];
    this.startX = touch.pageX;
    this.startY = touch.pageY;
    this.startTime = new Date(); // record time when finger first makes contact with surface
  };
  _proto.onTouchEnd = function onTouchEnd(event) {
    var type = null;
    var touch = event.changedTouches[0];
    var distX = touch.pageX - this.startX; // get horizontal dist traveled by finger while in contact with surface
    var distY = touch.pageY - this.startY; // get vertical dist traveled by finger while in contact with surface
    var elapsedTime = new Date() - this.startTime; // get time elapsed

    if (elapsedTime <= this.allowedTime) {
      // first condition for awipe met
      if (Math.abs(distX) >= this.threshold && Math.abs(distY) <= this.restraint) {
        // 2nd condition for horizontal swipe met
        type = distX < 0 ? EVENT_SWIPE_LEFT : EVENT_SWIPE_RIGHT; // if dist traveled is negative, it indicates left swipe
      } else if (Math.abs(distY) >= this.threshold && Math.abs(distX) <= this.restraint) {
        // 2nd condition for vertical swipe met
        type = distY < 0 ? EVENT_SWIPE_UP : EVENT_SWIPE_DOWN; // if dist traveled is negative, it indicates up swipe
      }
      this.emit(EVENT_SWIPE, type, event);
    }
  };
  return Touch;
}(rasti__WEBPACK_IMPORTED_MODULE_0__.View);
Object.assign(Touch.prototype, defaults);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Touch);

/***/ }),

/***/ "./src/js/factory/makeBonus.js":
/*!*************************************!*\
  !*** ./src/js/factory/makeBonus.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _engine_Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../engine/Animation */ "./src/js/engine/Animation.js");
/* harmony import */ var _Bonus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Bonus */ "./src/js/Bonus.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (index, options) {
  return new _Bonus__WEBPACK_IMPORTED_MODULE_1__["default"](_extends({
    animations: _extends({}, _Bonus__WEBPACK_IMPORTED_MODULE_1__.animations, {
      "default": new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, _Bonus__WEBPACK_IMPORTED_MODULE_1__.animationBase, {
        offsetX: 60 * index
      }))
    })
  }, options));
});

/***/ }),

/***/ "./src/js/factory/makeDot.js":
/*!***********************************!*\
  !*** ./src/js/factory/makeDot.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animationBase: () => (/* binding */ animationBase),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _engine_Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../engine/Animation */ "./src/js/engine/Animation.js");
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Item */ "./src/js/Item.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


var animationBase = {
  imageURL: 'img/pills1.png',
  numberOfFrame: 1
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (options) {
  return new _Item__WEBPACK_IMPORTED_MODULE_1__["default"](_extends({
    width: 8,
    height: 8,
    defaultAnimation: 'white',
    animations: {
      'white': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
        offsetX: 24
      })),
      'yellow': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
        offsetX: 24 + 32
      })),
      'red': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
        offsetX: 24 + 32 * 2
      }))
    }
  }, options));
});

/***/ }),

/***/ "./src/js/factory/makeGhost.js":
/*!*************************************!*\
  !*** ./src/js/factory/makeGhost.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SPRITE_BLINKY: () => (/* binding */ SPRITE_BLINKY),
/* harmony export */   SPRITE_INKY: () => (/* binding */ SPRITE_INKY),
/* harmony export */   SPRITE_PINKY: () => (/* binding */ SPRITE_PINKY),
/* harmony export */   SPRITE_SUE: () => (/* binding */ SPRITE_SUE),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _engine_Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../engine/Animation */ "./src/js/engine/Animation.js");
/* harmony import */ var _Ghost__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Ghost */ "./src/js/Ghost.js");
/* harmony import */ var _helper_getDistance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/getDistance */ "./src/js/helper/getDistance.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var SPRITE_PINKY = 'SPRITE_PINKY';
var SPRITE_BLINKY = 'SPRITE_BLINKY';
var SPRITE_INKY = 'SPRITE_INKY';
var SPRITE_SUE = 'SPRITE_SUE';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (label, options) {
  // Pink Ghost
  if (label === 'pinky') {
    options = Object.assign({
      type: SPRITE_PINKY,
      dir: 'd',
      defaultAnimation: 'down',
      getChaseTarget: function getChaseTarget() {
        var t = this.pacmanData.tile;
        var dir = this.pacmanData.dir;
        return t.get(dir).get(dir).get(dir).get(dir);
      },
      animations: _extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animations, {
        right: new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animationBase, {
          offsetY: 252,
          offsetX: -2
        })),
        down: new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animationBase, {
          offsetY: 252,
          offsetX: 64 * 2 - 2
        })),
        up: new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animationBase, {
          offsetY: 252,
          offsetX: 64 * 4 - 2
        })),
        left: new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animationBase, {
          offsetY: 252,
          offsetX: 64 * 6 - 2
        }))
      })
    }, options);
  }
  // Red Ghost
  if (label === 'blinky') {
    options = Object.assign({
      type: SPRITE_BLINKY,
      dir: 'l',
      waitTime: 0,
      scatterTarget: 25,
      defaultAnimation: 'left',
      animations: _extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animations, {
        right: new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animationBase, {
          offsetY: 124,
          offsetX: -2
        })),
        down: new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animationBase, {
          offsetY: 124,
          offsetX: 64 * 2 - 2
        })),
        up: new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animationBase, {
          offsetY: 124,
          offsetX: 64 * 4 - 2
        })),
        left: new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animationBase, {
          offsetY: 124,
          offsetX: 64 * 6 - 2
        }))
      })
    }, options);
  }
  // Cyan Ghost
  if (label === 'inky') {
    options = Object.assign({
      type: SPRITE_INKY,
      dir: 'u',
      waitTime: 6,
      scatterTarget: 979,
      defaultAnimation: 'up',
      getChaseTarget: function getChaseTarget() {
        var pacmanTile = this.pacmanData.tile;
        var blinkyTile = this.blinky.getTile();
        var dir = this.pacmanData.dir;
        pacmanTile = pacmanTile.get(dir).get(dir); // Two tiles in front of pacman

        return this.map.getTile(pacmanTile.col + pacmanTile.col - blinkyTile.col, pacmanTile.row + pacmanTile.row - blinkyTile.row);
      },
      animations: _extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animations, {
        right: new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animationBase, {
          offsetY: 316,
          offsetX: -2
        })),
        down: new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animationBase, {
          offsetY: 316,
          offsetX: 64 * 2 - 2
        })),
        up: new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animationBase, {
          offsetY: 316,
          offsetX: 64 * 4 - 2
        })),
        left: new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animationBase, {
          offsetY: 316,
          offsetX: 64 * 6 - 2
        }))
      })
    }, options);
  }
  // Orange Ghost
  if (label === 'sue') {
    options = Object.assign({
      type: SPRITE_SUE,
      dir: 'u',
      waitTime: 8,
      scatterTarget: 953,
      defaultAnimation: 'up',
      getChaseTarget: function getChaseTarget() {
        var t = this.pacmanData.tile;
        var d = (0,_helper_getDistance__WEBPACK_IMPORTED_MODULE_2__["default"])(t, this.getTile());
        if (d > 16 * t.w) return t;else return this.scatterTarget;
      },
      animations: _extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animations, {
        'right': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animationBase, {
          offsetY: 188,
          offsetX: -2
        })),
        'down': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animationBase, {
          offsetY: 188,
          offsetX: 64 * 2 - 2
        })),
        'up': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animationBase, {
          offsetY: 188,
          offsetX: 64 * 4 - 2
        })),
        'left': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, _Ghost__WEBPACK_IMPORTED_MODULE_1__.animationBase, {
          offsetY: 188,
          offsetX: 64 * 6 - 2
        }))
      })
    }, options);
  }
  return new _Ghost__WEBPACK_IMPORTED_MODULE_1__["default"](options);
});

/***/ }),

/***/ "./src/js/factory/makePill.js":
/*!************************************!*\
  !*** ./src/js/factory/makePill.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _engine_Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../engine/Animation */ "./src/js/engine/Animation.js");
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Item */ "./src/js/Item.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


var animationBase = {
  imageURL: 'img/pills1.png',
  numberOfFrame: 2,
  delta: 24,
  refreshRate: 450,
  type: _engine_Animation__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_VERTICAL
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (options) {
  return new _Item__WEBPACK_IMPORTED_MODULE_1__["default"](_extends({
    width: 24,
    height: 24,
    animations: {
      'white': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase)),
      'yellow': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
        offsetX: 24 + 8
      })),
      'red': new _engine_Animation__WEBPACK_IMPORTED_MODULE_0__["default"](_extends({}, animationBase, {
        offsetX: (24 + 8) * 2
      }))
    }
  }, options));
});

/***/ }),

/***/ "./src/js/helper/getDistance.js":
/*!**************************************!*\
  !*** ./src/js/helper/getDistance.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Distance between two tiles.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (tileA, tileB) {
  var x = tileA.x,
    x1 = tileB.x,
    y = tileA.y,
    y1 = tileB.y;
  return Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
});

/***/ }),

/***/ "./src/js/helper/rnd.js":
/*!******************************!*\
  !*** ./src/js/helper/rnd.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Return random number between 0 and total less one.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (total) {
  return Math.floor(Math.random() * total);
});

/***/ }),

/***/ "./src/js/maps/map-1.js":
/*!******************************!*\
  !*** ./src/js/maps/map-1.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (['----------------------------', '----------------------------', '----------------------------', '============================', '=......==..........==......=', '=*====.==.========.==.====*=', '=.====.==.========.==.====.=', '=..........................=', '===.==.=====.==.=====.==.===', '--=.==.=====.==.=====.==.=--', '===.==.=====.==.=====.==.===', 'ttt.==.......==.......==.ttt', '===.=====-========-=====.===', '--=.=====-========-=====.=--', '--=.--------------------.=--', '--=.=====-===hh===-=====.=--', '--=.=====-===--===-=====.=--', '--=.==----=------=----==.=--', '--=.==-==-========-==-==.=--', '===.==-==-========-==-==.===', 'ttt.---==----------==---.ttt', '===.========-==-========.===', '--=.========-==-========.=--', '--=.......---==---.......=--', '--=.=====.========.=====.=--', '===.=====.========.=====.===', '=............--............=', '=.====.=====.==.=====.====.=', '=.====.=====.==.=====.====.=', '=.====.==....==....==.====.=', '=*====.==.========.==.====*=', '=.====.==.========.==.====.=', '=..........................=', '============================', '----------------------------', '----------------------------']);

/***/ }),

/***/ "./src/js/maps/map-2.js":
/*!******************************!*\
  !*** ./src/js/maps/map-2.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (['----------------------------', '----------------------------', '----------------------------', '============================', 'tttttt-==..........==-tttttt', '======.==.========.==.======', '======.==.========.==.======', '=*...........==...........*=', '=.=======.==.==.==.=======.=', '=.=======.==.==.==.=======.=', '=.==......==.==.==......==.=', '=.==.====-==....==-====.==.=', '=.==.====-========-====.==.=', '=......==-========-==......=', '======.==----------==.======', '======.==-===hh===-==.======', '=......==-===--===-==......=', '=.====.==-=------=-==.====.=', '=.====.---========---.====.=', '=...==.==-========-==.==...=', '===.==.==----------==.==.===', '--=.==.====-====-====.==.=--', '--=.==.====-====-====.==.=--', '--=.........====.........=--', '--=.=======.====.=======.=--', '===.=======.====.=======.===', 'ttt....==...----...==....ttt', '===.==.==.========.==.==.===', '===.==.==.========.==.==.===', '=*..==.......==.......==..*=', '=.====.=====.==.=====.====.=', '=.====.=====.==.=====.====.=', '=..........................=', '============================', '----------------------------', '----------------------------']);

/***/ }),

/***/ "./src/js/maps/map-3.js":
/*!******************************!*\
  !*** ./src/js/maps/map-3.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (['----------------------------', '----------------------------', '----------------------------', '============================', '=.........==....==.........=', '=.=======.==.==.==.=======.=', '=*=======.==.==.==.=======*=', '=.==.........==.........==.=', '=.==.==.====.==.====.==.==.=', '=....==.====.==.====.==....=', '====.==.====.==.====.==.====', '====.==..............==.====', 't....====-========-====....t', '=.==-====-========-====-==.=', '=.==--------------------==.=', '=.====-==-===hh===-==-====.=', '=.====-==-===--===-==-====.=', '=.-----==-=------=-==-----.=', '=.==-====-========-====-==.=', '=.==-====-========-====-==.=', '=.==--------------------==.=', '=.====-=====-==-=====-====.=', '=.====-=====-==-=====-====.=', '=......==....==....==......=', '===.==.==.========.==.==.===', '===.==.==.========.==.==.===', '=*..==.......--.......==..*=', '=.====.=====.==.=====.====.=', '=.====.=====.==.=====.====.=', '=......==....==....==......=', '=.====.==.========.==.====.=', '=.====.==.========.==.====.=', '=......==..........==......=', '============================', '----------------------------', '----------------------------']);

/***/ }),

/***/ "./src/js/maps/map-4.js":
/*!******************************!*\
  !*** ./src/js/maps/map-4.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (['----------------------------', '----------------------------', '----------------------------', '============================', '=..........................=', '=.==.====.========.====.==.=', '=*==.====.========.====.==*=', '=.==.====.==....==.====.==.=', '=.==......==.==.==......==.=', '=.====.==.==.==.==.==.====.=', '=.====.==.==.==.==.==.====.=', '=......==....==....==......=', '===.========-==-========.===', '--=.========-==-========.=--', '--=....==----------==....=--', '===-==.==-===hh===-==.==-===', 'ttt-==.==-===--===-==.==-ttt', '======.---=------=---.======', '======.==-========-==.======', 'ttt-==.==-========-==.==-ttt', '===-==.==----------==.==-===', '--=....=====-==-=====....=--', '--=.==.=====-==-=====.==.=--', '--=.==....---==---....==.=--', '--=.=====.==-==-==.=====.=--', '===.=====.==-==-==.=====.===', '=.........==----==.........=', '=.====.==.========.==.====.=', '=.====.==.========.==.====.=', '=.==...==..........==...==.=', '=*==.=======.==.=======.==*=', '=.==.=======.==.=======.==.=', '=............==............=', '============================', '----------------------------', '----------------------------']);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/press-start-2p-v9-latin-regular.woff2 */ "./src/fonts/press-start-2p-v9-latin-regular.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/press-start-2p-v9-latin-regular.woff */ "./src/fonts/press-start-2p-v9-latin-regular.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./img/maze.png */ "./src/img/maze.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./img/start.png */ "./src/img/start.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* press-start-2p-regular - latin */
@font-face {
  font-family: 'Press Start 2P';
  font-style: normal;
  font-weight: 400;
  src: local(''),
       url(${___CSS_LOADER_URL_REPLACEMENT_0___}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url(${___CSS_LOADER_URL_REPLACEMENT_1___}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

body {
    background-color: #222;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

.js-pacman-playground {
    position: absolute;
    color: #EFEFEF;
    font-family: 'Press Start 2P', cursive;
    font-size: 2em;
    background-color: #000;
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_2___});
    background-size: 400% 200%;
    display: none;
    cursor: default;
    user-select: none;
    touch-action: none;
}

.js-pacman-playground.with-border {
    border-radius: 0.5em;
    border: 1em solid #000;
}

.js-pacman-playground.with-border.with-light {
    box-shadow: 0 0 1em 0.1em #EEE;
}

.js-pacman-playground.maze-1 {
    background-position: 0 0;
}

.js-pacman-playground.maze-2 {
    background-position: -100% 0;
}

.js-pacman-playground.maze-3 {
    background-position: -200% 0;
}

.js-pacman-playground.maze-4 {
    background-position: -300% 0;
}

.js-pacman-playground.maze-1.blink {
    background-position: 0 -100%;
}

.js-pacman-playground.maze-2.blink {
    background-position: -100% -100%;
}

.js-pacman-playground.maze-3.blink {
    background-position: -200% -100%;
}

.js-pacman-playground.maze-4.blink {
    background-position: -300% -100%;
}

.js-pacman-playground .splash {
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_3___});
    background-size: 100% 100%;
    background-color: #000;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;
}

.js-pacman-playground .splash a {
    color: #DDDDDD;
    cursor: pointer;
    font-weight: bold;
}

.js-pacman-playground .splash a:hover {
    color: #FFF;
}

.js-pacman-playground .splash a.start {
    position: relative;
    top: 65%;
    text-transform: uppercase;
    font-size: 1.6em;
}

.js-pacman-playground .splash .title {
    position: absolute;
    top: 22.04%;
    left: 0;
    right: 0;
    text-align: center;
    /* color: #FCB644; */
    color: black;
}

.js-pacman-playground .splash p.nerd {
    position: absolute;
    top: 34.15%;
    left: 27.26%;
    text-align: center;
    color: #FFF;
}

.js-pacman-playground .splash p span {
    color : #FFFF00;
}

.js-pacman-playground .splash .keys {
    position: absolute;
    top: 85%;
    left: 0;
    right: 0;
    text-align: center;
    color: #FFF;
}

.js-pacman-playground .splash .credits {
    font-family: 'Press Start 2P', cursive;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: #FFF;
    padding: 0.1em;
    font-size: 0.6em;
}

.js-pacman-playground .splash .credits span {
    color: #FF3333;
}

.js-pacman-playground .splash .credits a {
    color: #FFFF00;
}

.js-pacman-playground .splash .credits a:hover {
    color: #FFFF4D;
}

.js-pacman-playground .loadbar {
    position: absolute;
    top: 65%;
    left: 22.32%;
    right: 22.32%;
    background: #FF0;
    height: 3.472%;
    overflow: visible;
    border: 2px solid #FFF;
}

.js-pacman-playground .loadbar .inner {
    position: relative;
    background: #FF0000;
    height: 100%;
    width: 0;
}

.js-pacman-playground .score {
    position: absolute;
    top: 0;
    right: 0.4464%;
    left: 0.4464%;
    text-align: center;
    z-index: 2
}

.js-pacman-playground .score .p1-score {
    position: absolute;
    width: 22%;
    top: 0;
    left: 0;
}

.js-pacman-playground .score .high-score {
    width: 40%;
    margin-left: auto;
    margin-right: auto;
}

.js-pacman-playground .score .p2-score {
    position: absolute;
    width: 22%;
    top: 0;
    right: 0;
}

.js-pacman-playground .score span {
    text-align: right;
    display: block;
}

.js-pacman-playground .score .high-score span {
    text-align: center;
}

.js-pacman-playground .start-p1 {
    position: absolute;
    top: 38.71%;
    left: 0;
    right: 0;
    text-align: center;
    color: #5EE;
}

.js-pacman-playground .game-over,
.js-pacman-playground .start-ready,
.js-pacman-playground .sound-status,
.js-pacman-playground .paused {
    position: absolute;
    top: 55.55%;
    left: 0;
    right: 0;
    text-align: center;
    color: #F00;
}

.js-pacman-playground .game-over {
    background-color: #000;
    padding: .5rem;
    line-height: 1.5;
}

.js-pacman-playground .sound-status.on span.on,
.js-pacman-playground .sound-status span.off {
    display : inline;
}

.js-pacman-playground .sound-status.on span.off,
.js-pacman-playground .sound-status span.on {
    display : none;
}

.js-pacman-playground .sound-status .wrap,
.js-pacman-playground .paused .wrap {
    background: #000;
    padding: 0.1em;
}

@media screen and (orientation: portrait) {
    /* body {
        background-color: #000;
    }

    .js-pacman-playground.with-border {
        border-radius: 0;
        box-shadow: none;
        border: none;
    } */
}
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA,mCAAmC;AACnC;EACE,6BAA6B;EAC7B,kBAAkB;EAClB,gBAAgB;EAChB;;6DAEuE,EAAE,gDAAgD;AAC3H;;AAEA;IACI,sBAAsB;IACtB,SAAS;IACT,UAAU;IACV,gBAAgB;AACpB;;AAEA;IACI,kBAAkB;IAClB,cAAc;IACd,sCAAsC;IACtC,cAAc;IACd,sBAAsB;IACtB,yDAAuC;IACvC,0BAA0B;IAC1B,aAAa;IACb,eAAe;IACf,iBAAiB;IACjB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB,sBAAsB;AAC1B;;AAEA;IACI,8BAA8B;AAClC;;AAEA;IACI,wBAAwB;AAC5B;;AAEA;IACI,4BAA4B;AAChC;;AAEA;IACI,4BAA4B;AAChC;;AAEA;IACI,4BAA4B;AAChC;;AAEA;IACI,4BAA4B;AAChC;;AAEA;IACI,gCAAgC;AACpC;;AAEA;IACI,gCAAgC;AACpC;;AAEA;IACI,gCAAgC;AACpC;;AAEA;IACI,yDAAwC;IACxC,0BAA0B;IAC1B,sBAAsB;IACtB,kBAAkB;IAClB,kBAAkB;IAClB,MAAM;IACN,SAAS;IACT,QAAQ;IACR,OAAO;IACP,UAAU;AACd;;AAEA;IACI,cAAc;IACd,eAAe;IACf,iBAAiB;AACrB;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,kBAAkB;IAClB,QAAQ;IACR,yBAAyB;IACzB,gBAAgB;AACpB;;AAEA;IACI,kBAAkB;IAClB,WAAW;IACX,OAAO;IACP,QAAQ;IACR,kBAAkB;IAClB,oBAAoB;IACpB,YAAY;AAChB;;AAEA;IACI,kBAAkB;IAClB,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,WAAW;AACf;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,kBAAkB;IAClB,QAAQ;IACR,OAAO;IACP,QAAQ;IACR,kBAAkB;IAClB,WAAW;AACf;;AAEA;IACI,sCAAsC;IACtC,kBAAkB;IAClB,SAAS;IACT,OAAO;IACP,QAAQ;IACR,WAAW;IACX,cAAc;IACd,gBAAgB;AACpB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,kBAAkB;IAClB,QAAQ;IACR,YAAY;IACZ,aAAa;IACb,gBAAgB;IAChB,cAAc;IACd,iBAAiB;IACjB,sBAAsB;AAC1B;;AAEA;IACI,kBAAkB;IAClB,mBAAmB;IACnB,YAAY;IACZ,QAAQ;AACZ;;AAEA;IACI,kBAAkB;IAClB,MAAM;IACN,cAAc;IACd,aAAa;IACb,kBAAkB;IAClB;AACJ;;AAEA;IACI,kBAAkB;IAClB,UAAU;IACV,MAAM;IACN,OAAO;AACX;;AAEA;IACI,UAAU;IACV,iBAAiB;IACjB,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,UAAU;IACV,MAAM;IACN,QAAQ;AACZ;;AAEA;IACI,iBAAiB;IACjB,cAAc;AAClB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,WAAW;IACX,OAAO;IACP,QAAQ;IACR,kBAAkB;IAClB,WAAW;AACf;;AAEA;;;;IAII,kBAAkB;IAClB,WAAW;IACX,OAAO;IACP,QAAQ;IACR,kBAAkB;IAClB,WAAW;AACf;;AAEA;IACI,sBAAsB;IACtB,cAAc;IACd,gBAAgB;AACpB;;AAEA;;IAEI,gBAAgB;AACpB;;AAEA;;IAEI,cAAc;AAClB;;AAEA;;IAEI,gBAAgB;IAChB,cAAc;AAClB;;AAEA;IACI;;;;;;;;OAQG;AACP","sourcesContent":["/* press-start-2p-regular - latin */\n@font-face {\n  font-family: 'Press Start 2P';\n  font-style: normal;\n  font-weight: 400;\n  src: local(''),\n       url('./fonts/press-start-2p-v9-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */\n       url('./fonts/press-start-2p-v9-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */\n}\n\nbody {\n    background-color: #222;\n    margin: 0;\n    padding: 0;\n    overflow: hidden;\n}\n\n.js-pacman-playground {\n    position: absolute;\n    color: #EFEFEF;\n    font-family: 'Press Start 2P', cursive;\n    font-size: 2em;\n    background-color: #000;\n    background-image: url('./img/maze.png');\n    background-size: 400% 200%;\n    display: none;\n    cursor: default;\n    user-select: none;\n    touch-action: none;\n}\n\n.js-pacman-playground.with-border {\n    border-radius: 0.5em;\n    border: 1em solid #000;\n}\n\n.js-pacman-playground.with-border.with-light {\n    box-shadow: 0 0 1em 0.1em #EEE;\n}\n\n.js-pacman-playground.maze-1 {\n    background-position: 0 0;\n}\n\n.js-pacman-playground.maze-2 {\n    background-position: -100% 0;\n}\n\n.js-pacman-playground.maze-3 {\n    background-position: -200% 0;\n}\n\n.js-pacman-playground.maze-4 {\n    background-position: -300% 0;\n}\n\n.js-pacman-playground.maze-1.blink {\n    background-position: 0 -100%;\n}\n\n.js-pacman-playground.maze-2.blink {\n    background-position: -100% -100%;\n}\n\n.js-pacman-playground.maze-3.blink {\n    background-position: -200% -100%;\n}\n\n.js-pacman-playground.maze-4.blink {\n    background-position: -300% -100%;\n}\n\n.js-pacman-playground .splash {\n    background-image: url('./img/start.png');\n    background-size: 100% 100%;\n    background-color: #000;\n    text-align: center;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    left: 0;\n    z-index: 1;\n}\n\n.js-pacman-playground .splash a {\n    color: #DDDDDD;\n    cursor: pointer;\n    font-weight: bold;\n}\n\n.js-pacman-playground .splash a:hover {\n    color: #FFF;\n}\n\n.js-pacman-playground .splash a.start {\n    position: relative;\n    top: 65%;\n    text-transform: uppercase;\n    font-size: 1.6em;\n}\n\n.js-pacman-playground .splash .title {\n    position: absolute;\n    top: 22.04%;\n    left: 0;\n    right: 0;\n    text-align: center;\n    /* color: #FCB644; */\n    color: black;\n}\n\n.js-pacman-playground .splash p.nerd {\n    position: absolute;\n    top: 34.15%;\n    left: 27.26%;\n    text-align: center;\n    color: #FFF;\n}\n\n.js-pacman-playground .splash p span {\n    color : #FFFF00;\n}\n\n.js-pacman-playground .splash .keys {\n    position: absolute;\n    top: 85%;\n    left: 0;\n    right: 0;\n    text-align: center;\n    color: #FFF;\n}\n\n.js-pacman-playground .splash .credits {\n    font-family: 'Press Start 2P', cursive;\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    color: #FFF;\n    padding: 0.1em;\n    font-size: 0.6em;\n}\n\n.js-pacman-playground .splash .credits span {\n    color: #FF3333;\n}\n\n.js-pacman-playground .splash .credits a {\n    color: #FFFF00;\n}\n\n.js-pacman-playground .splash .credits a:hover {\n    color: #FFFF4D;\n}\n\n.js-pacman-playground .loadbar {\n    position: absolute;\n    top: 65%;\n    left: 22.32%;\n    right: 22.32%;\n    background: #FF0;\n    height: 3.472%;\n    overflow: visible;\n    border: 2px solid #FFF;\n}\n\n.js-pacman-playground .loadbar .inner {\n    position: relative;\n    background: #FF0000;\n    height: 100%;\n    width: 0;\n}\n\n.js-pacman-playground .score {\n    position: absolute;\n    top: 0;\n    right: 0.4464%;\n    left: 0.4464%;\n    text-align: center;\n    z-index: 2\n}\n\n.js-pacman-playground .score .p1-score {\n    position: absolute;\n    width: 22%;\n    top: 0;\n    left: 0;\n}\n\n.js-pacman-playground .score .high-score {\n    width: 40%;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.js-pacman-playground .score .p2-score {\n    position: absolute;\n    width: 22%;\n    top: 0;\n    right: 0;\n}\n\n.js-pacman-playground .score span {\n    text-align: right;\n    display: block;\n}\n\n.js-pacman-playground .score .high-score span {\n    text-align: center;\n}\n\n.js-pacman-playground .start-p1 {\n    position: absolute;\n    top: 38.71%;\n    left: 0;\n    right: 0;\n    text-align: center;\n    color: #5EE;\n}\n\n.js-pacman-playground .game-over,\n.js-pacman-playground .start-ready,\n.js-pacman-playground .sound-status,\n.js-pacman-playground .paused {\n    position: absolute;\n    top: 55.55%;\n    left: 0;\n    right: 0;\n    text-align: center;\n    color: #F00;\n}\n\n.js-pacman-playground .game-over {\n    background-color: #000;\n    padding: .5rem;\n    line-height: 1.5;\n}\n\n.js-pacman-playground .sound-status.on span.on,\n.js-pacman-playground .sound-status span.off {\n    display : inline;\n}\n\n.js-pacman-playground .sound-status.on span.off,\n.js-pacman-playground .sound-status span.on {\n    display : none;\n}\n\n.js-pacman-playground .sound-status .wrap,\n.js-pacman-playground .paused .wrap {\n    background: #000;\n    padding: 0.1em;\n}\n\n@media screen and (orientation: portrait) {\n    /* body {\n        background-color: #000;\n    }\n\n    .js-pacman-playground.with-border {\n        border-radius: 0;\n        box-shadow: none;\n        border: none;\n    } */\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/rasti/lib/Component.js":
/*!*********************************************!*\
  !*** ./node_modules/rasti/lib/Component.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;
exports["default"] = void 0;
var _View2 = _interopRequireDefault(__webpack_require__(/*! ./View.js */ "./node_modules/rasti/lib/View.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
// This options keys will be extended on view instance.
var componentOptions = {
  key: true,
  state: true,
  onCreate: true,
  onChange: true,
  onRender: true
};

/*
 * Helper function. Extract attributes from html tag
 * @param text {string} html text
 * @return {object} Object with keys / values representing attributes.
 */
var extractAttributes = function extractAttributes(text) {
  var attributes = {};
  var re = /([\w|data-]+)(?:=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?)?/g;
  var result;
  while ((result = re.exec(text)) !== null) {
    attributes[result[1]] = typeof result[2] === 'undefined' ? true : result[2];
  }
  return attributes;
};

/*
 * Helper function. If first arg is a placeholder for an expression, return the expression.
 */
var getExpression = function getExpression(placeholder, expressions) {
  var match = placeholder && placeholder.match && placeholder.match(new RegExp(Component.EXPRESSION_PLACEHOLDER_TEMPLATE('(\\d+)')));
  return match && match[1] ? expressions[match[1]] : placeholder;
};

/*
 * Helper function. If expression is a function, call it with context and args.
 */
var evalExpression = function evalExpression(expression, context) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  return typeof expression === 'function' ? expression.apply(context, args) : expression;
};

/**
 * Components are a special kind of `View` that is designed to be easily composable, 
 * making it simple to add child views and build complex user interfaces.  
 * Unlike views, which are render-agnostic, components have a specific set of rendering 
 * guidelines that allow for a more declarative development style.  
 * Components are defined with the `create` static method, which takes a tagged template.
 * @module
 * @extends Rasti.View
 * @param {object} options Object containing options. The following keys will be merged to `this`: model, state, key, onDestroy, onRender, onCreate, onChange.
 * @property {string} key A unique key to identify the component. Used to recycle child components.
 * @property {object} model A `Rasti.Model` or any emitter object containing data and business logic.
 * @property {object} state A `Rasti.Model` or any emitter object containing data and business logic, to be used as internal state.
 * @example
 * import { Component, Model } from 'rasti';
 * // Create Timer component.
 * const Timer = Component.create`
 *     <div>
 *         Seconds: <span>${({ model }) => model.seconds}</span>
 *     </div>
 * `;
 * // Create model to store seconds.
 * const model = new Model({ seconds: 0 });
 * // Mount timer on body.
 * Timer.mount({ model }, document.body);
 * // Increment `model.seconds` every second.
 * setInterval(() => model.seconds++, 1000);
 */
var Component = exports["default"] = /*#__PURE__*/function (_View) {
  function Component() {
    var _this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _this = _View.apply(this, arguments) || this;
    // Extend "this" with options, mapping componentOptions keys.
    Object.keys(options).forEach(function (key) {
      if (componentOptions[key]) _this[key] = options[key];
    });
    // Store options by default.
    _this.options = options;
    // Bind onChange to this to be used as listener.
    // Store bound version, so it can be removed on onDestroy method.
    _this.onChange = _this.onChange.bind(_this);
    // Listen to model changes and call onChange.
    if (_this.model && _this.model.on) _this.model.on('change', _this.onChange);
    if (_this.state && _this.state.on) _this.state.on('change', _this.onChange);
    // Call life cycle method.
    _this.onCreate.apply(_this, arguments);
    return _this;
  }

  /*
   * Override. We don't want to ensure an element on instantiation.
   * We will provide it later.
   */
  _inheritsLoose(Component, _View);
  var _proto = Component.prototype;
  _proto.ensureElement = function ensureElement() {
    // If el is provided, delegate events.
    if (this.el) {
      this.delegateEvents();
      this.id = this.el.id;
    }
    // Ensure id.
    if (!this.id) {
      this.id = this.attributes && this.attributes.id ?
      // If id is provided, evaluate it.
      evalExpression(this.attributes.id, this, this) :
      // Generate a unique id and set it as id attribute.
      Component.ID_TEMPLATE(this.uid);
    }
  }

  /*
   * Find view's element on parent node, using id.
   */;
  _proto.findElement = function findElement(parent) {
    return (parent || document).querySelector("#" + this.id);
  }

  /*
   * Eval attributes expressions.
   */;
  _proto.getAttributes = function getAttributes() {
    var _this2 = this;
    var add = {
      id: this.id
    };
    var remove = {};
    var html = ["id=\"" + this.id + "\""];
    if (this.attributes) {
      Object.keys(this.attributes).forEach(function (key) {
        if (key === 'id') return;
        // Evaluate attribute value.
        var value = evalExpression(_this2.attributes[key], _this2, _this2);

        // Transform bool attribute values
        if (value === false) {
          remove[key] = true;
        } else if (value === true) {
          add[key] = '';
          html.push(key);
        } else {
          if (value === null || typeof value === 'undefined') value = '';
          add[key] = value;
          html.push(key + "=\"" + value + "\"");
        }
      });
    }
    return {
      add: add,
      remove: remove,
      html: html.join(' ')
    };
  }

  /*
   * Used internally on the render process.
   * Attach the view to the dom element.
   */;
  _proto.hydrate = function hydrate(parent) {
    var _this3 = this;
    this.el = this.findElement(parent);
    this.delegateEvents();
    this.children.forEach(function (child) {
      return child.hydrate(_this3.el);
    });
    this.onRender.call(this, 'hydrate');
  }

  /*
   * Used internally on the render process.
   * Reuse a view that has `key` when its parent is rendered.
   */;
  _proto.recycle = function recycle(parent) {
    // Find element to be replaced. It has same id.
    var toBeReplaced = this.findElement(parent);
    // Replace it with this.el.
    toBeReplaced.replaceWith(this.el);
    // Call `onRender` lifecycle method.
    this.onRender.call(this, 'recycle');
  }

  /*
   * Override. Add some custom logic to super `destroy` method.
   */;
  _proto.destroy = function destroy() {
    _View.prototype.destroy.apply(this, arguments);
    // Stop listening to `change`.
    // Set destroyed flag to prevent a last render after destroyed. TODO: Review
    if (this.model && this.model.off) this.model.off('change', this.onChange);
    if (this.state && this.state.off) this.state.off('change', this.onChange);
    this.destroyed = true;
  }

  /**
   * Lifecycle method. Called when the view is created at the end of the constructor.
   * @param options {object} The view options.
   */;
  _proto.onCreate = function onCreate() {}

  /**
   * Lifecycle method. Called when model emits `change` event.
   * By default calls render method.
   * This method should be extended with custom logic.
   * Maybe comparing new attributes with previous ones and calling
   * render when needed. Or doing some dom transformation.
   * @param model {Rasti.Model} The model that emitted the event.
   * @param changed {object} Object containing keys and values that has changed.
   * @param [...args] {any} Any extra arguments passed to set method.
   */;
  _proto.onChange = function onChange() {
    this.render();
  }

  /**
   * Lifecycle method. Called when the view is rendered.
   * @param type {string} The render type. Can be `render`, `hydrate` or `recycle`.
   */;
  _proto.onRender = function onRender() {}

  /**
   * Lifecycle method. Called when the view is destroyed.
   * @param {object} options Options object or any arguments passed to `destroy` method.
   */;
  _proto.onDestroy = function onDestroy() {}

  /*
   * Replace expressions.
   */;
  _proto.replaceExpressions = function replaceExpressions(string, addChild) {
    var _this4 = this;
    return string.replace(new RegExp(Component.EXPRESSION_PLACEHOLDER_TEMPLATE('(\\d+)'), 'g'), function (match) {
      var expression = getExpression(match, _this4.template.expressions);
      // Eval expression. Pass view as argument.
      var result = evalExpression(expression, _this4, _this4);
      // Treat all expressions as arrays.
      var results = result instanceof Array ? result : [result];
      // Replace expression with the result of the evaluation.
      return results.reduce(function (out, result) {
        var parsed;
        // If result is true, replace it with a placeholder.
        if (result === true) parsed = Component.TRUE_PLACEHOLDER;
        // If result is false, replace it with a placeholder.
        else if (result === false) parsed = Component.FALSE_PLACEHOLDER;
        // Replace null or undefined with empty string.
        else if (result === null || typeof result === 'undefined') parsed = '';
        // If result is a view, call addChild callback.
        else if (result && typeof result.render === 'function') parsed = addChild(result);
        // Return expression itself.
        else parsed = result;
        // Concatenate expressions.
        return out + parsed;
      }, '');
    })
    // Replace `attribute="true"` with `attribute`
    .replace(new RegExp("([a-z]+)=[\"|']" + Component.TRUE_PLACEHOLDER + "[\"|']", 'g'), '$1')
    // Replace `attribute="false"` with empty string.
    .replace(new RegExp("([a-z]+)=[\"|']" + Component.FALSE_PLACEHOLDER + "[\"|']", 'g'), '')
    // Replace rest of false expressions with empty string.
    .replace(new RegExp(Component.FALSE_PLACEHOLDER, 'g'), '');
  }

  /*
   * Treat the whole view as a HTML string.
   */;
  _proto.toString = function toString() {
    var _this5 = this;
    // Normally there won't be any children, but if there are, destroy them.
    this.destroyChildren();
    // Get tag name.
    var tag = this.tag || 'div';
    // Get attributes.
    var attributes = this.getAttributes().html;
    // Replace expressions of inner template.
    var inner = this.template && this.template.inner && this.replaceExpressions(this.template.inner, function (component) {
      // Add child component.
      return _this5.addChild(component);
    });
    // Generate outer template.
    return inner ? "<" + tag + " " + attributes + ">" + inner + "</" + tag + ">" : "<" + tag + " " + attributes + " />";
  }

  /*
   * View render method.
   */;
  _proto.render = function render() {
    var _this6 = this;
    // Prevent a last re render if view is already destroyed.
    if (this.destroyed) return this;
    // If `this.el` is not present, create a new `this.tag` element.
    if (!this.el) {
      this.el = this.createElement(this.tag);
      this.delegateEvents();
    }
    // Set `this.el` attributes.
    var attributes = this.getAttributes();
    // Remove attributes.
    Object.keys(attributes.remove).forEach(function (key) {
      _this6.el.removeAttribute(key);
    });
    // Add attributes.
    Object.keys(attributes.add).forEach(function (key) {
      _this6.el.setAttribute(key, attributes.add[key]);
    });
    // Check for `template.inner` to see if view has innerHTML.
    if (this.template && this.template.inner) {
      var previousChildren = this.children;
      this.children = [];
      var nextChildren = [];
      var recycledChildren = [];
      // Store active element.
      var activeElement = document.activeElement;
      // Replace expressions. Set html inside of `this.el`.
      this.el.innerHTML = this.replaceExpressions(this.template.inner, function (component) {
        var out = component;
        // Check if child already exists.
        var found = component.key && previousChildren.find(function (previousChild) {
          return previousChild.key === component.key;
        });
        if (found) {
          var tag = found.el.tagName.toLowerCase();
          var id = found.el.id;
          // If child already exists, replace it html by its root element.
          out = "<" + tag + " id=\"" + id + "\"></" + tag + ">";
          // Add child to recycled children.
          recycledChildren.push(found);
          // Destroy new child component. Use recycled one instead.
          component.destroy();
        } else {
          // Not found. Add new child component.
          nextChildren.push(component);
        }
        // Component html.
        return out;
      });
      // Add new children. Hydrate them.
      nextChildren.forEach(function (nextChild) {
        _this6.addChild(nextChild).hydrate(_this6.el);
      });
      // Replace children root elements with recycled components.
      recycledChildren.forEach(function (recycledChild) {
        _this6.addChild(recycledChild).recycle(_this6.el);
      });
      // Destroy unused children.
      previousChildren.forEach(function (previousChild) {
        var found = recycledChildren.indexOf(previousChild) > -1;
        if (!found) previousChild.destroy();
      });
      // Restore focus.
      if (this.el.contains(activeElement)) {
        activeElement.focus();
      }
    }
    // Call onRender lifecycle method.
    this.onRender.call(this, 'render');
    // Return this for chaining.
    return this;
  }

  /**
   * Helper method used to extend a `Component`, creating a subclass.
   * @static
   * @param {object} object Object containing methods to be added to the new `Component` subclass. Also can be a function that receives the parent prototype and returns an object.
   */;
  Component.extend = function extend(object) {
    var Current = this;
    var Extended = /*#__PURE__*/function (_Current) {
      function Extended() {
        return _Current.apply(this, arguments) || this;
      }
      _inheritsLoose(Extended, _Current);
      return Extended;
    }(Current);
    Object.assign(Extended.prototype, typeof object === 'function' ? object(Current.prototype) : object);
    return Extended;
  }

  /**
   * Mount the component into the dom.
   * It instantiate the Component view using options, 
   * appends its element into the DOM (if `el` is provided).
   * And returns the view instance.
   * @static
   * @param {object} options The view options.
   * @param {node} el Dom element to append the view element.
   * @param {boolean} hydrate If true, the view will use existing html.
   * @return {Rasti.Component}
   */;
  Component.mount = function mount(options, el, hydrate) {
    // Instantiate view.
    var view = new this(options);
    // If `el` is passed, mount component.
    if (el) {
      if (hydrate) {
        view.toString();
      } else {
        var fragment = document.createElement('template');
        // Add html text into element inner html.
        fragment.innerHTML = view;
        // Add to dom.
        el.appendChild(fragment.content);
      }
      view.hydrate(el);
    }
    // Return view instance.
    return view;
  }

  /**
   * Takes a tagged template containing an HTML string, 
   * and returns a new `Component` class.
   * - The template outer tag and attributes will be used to create the view's root element.
   * - Boolean attributes should be passed in the form of `attribute="${() => true}"`.
   * - Event handlers should be passed, at the root element, in the form of `onEventName=${{'selector' : listener }}`. Where `selector` is a css selector. The event will be delegated to the view's root element.
   * - The template inner HTML will be used as the view's template.
   * - Template interpolations that are functions will be evaluated on the render process. Receiving the view instance as argument. And being bound to it.
   * - If the function returns `null`, `undefined`, `false` or empty string, the interpolation won't render any content.
   * - If the function returns a component instance, it will be added as a child component.
   * - If the function returns an array, each item will be evaluated as above.
   * @static
   * @param {string} HTML template for the component.
   * @return {Rasti.Component}
   */;
  Component.create = function create(strings) {
    for (var _len2 = arguments.length, expressions = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      expressions[_key2 - 1] = arguments[_key2];
    }
    var parts = [];
    // Replace functions and objects interpolations with `{number}`.
    // Where `number` is the index on expressions array.
    strings.forEach(function (string, i) {
      // Add string part.
      parts.push(string);
      // Add expression placeholder for later or expression eval.
      if (expressions[i]) {
        parts.push(typeof expressions[i] === 'function' || typeof expressions[i] === 'object' ? Component.EXPRESSION_PLACEHOLDER_TEMPLATE(i) : expressions[i]);
      }
    });
    // Create output text for main template.
    var main = parts.join('').trim().replace(/\n/g, '');
    // Extract outer tag, attributes and inner html.
    var result = main.match(/^<([a-z]+)(.*?)>(.*)<\/\1>$/) || main.match(/^<([a-z]+)(.*?)\/>$/);
    // Parse attributes from html text into an object.
    var attributes = extractAttributes(result[2]);
    // Events to be delegated.
    var events = {};
    // Filter events. To generate events object.
    // Generate attributes object, replace placeholders with expressions.
    attributes = Object.keys(attributes).reduce(function (out, key) {
      // Is Event?
      var matchKey = key.match(/on(([A-Z]{1}[a-z]+)+)/);
      // Is placeholder for function or object?
      // Get expression or value.
      var value = getExpression(attributes[key], expressions);
      // Is event handler. Add to events object.
      if (matchKey && matchKey[1]) {
        var eventType = matchKey[1].toLowerCase();
        Object.keys(value).forEach(function (selector) {
          return events["" + eventType + (selector === '&' ? '' : " " + selector)] = value[selector];
        });
        return out;
      }
      // Is attribute. Add to attributes object.
      out[key] = value;
      return out;
    }, {});
    var Current = this;
    // Create subclass for this component.
    return Current.extend({
      // Set events.
      events: events,
      // Set attributes.
      attributes: attributes,
      // Set template.
      template: {
        // Template for innerHTML of root element.
        inner: result[3],
        // Template expressions.
        expressions: expressions
      },
      // Set root element tag.
      tag: result[1]
    });
  };
  return Component;
}(_View2["default"]);
Component.ID_TEMPLATE = function (uid) {
  return "rasti-component-" + uid;
};
Component.EXPRESSION_PLACEHOLDER_TEMPLATE = function (idx) {
  return "__RASTI_EXPRESSION{" + idx + "}";
};
Component.TRUE_PLACEHOLDER = '__RASTI_TRUE';
Component.FALSE_PLACEHOLDER = '__RASTI_FALSE';

/***/ }),

/***/ "./node_modules/rasti/lib/Emitter.js":
/*!*******************************************!*\
  !*** ./node_modules/rasti/lib/Emitter.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {



exports.__esModule = true;
exports["default"] = void 0;
/**
 * `Emitter` is a class that provides an easy way to implement the observer pattern 
 * in your applications.  
 * It can be extended to create new classes that have the ability to emit and bind custom named events.   
 * Emitter is used by `Model` and `View` classes, which inherit from it to implement 
 * event-driven functionality.
 *
 * @module
 * @example
 * import { Emitter } from 'rasti';
 * // Custom cart
 * class ShoppingCart extends Emitter {
 *     constructor() {
 *         super();
 *         this.items = [];
 *     }
 *
 *     addItem(item) {
 *         this.items.push(item);
 *         // Emit a custom event called `itemAdded`.
 *         // Pass the added item as an argument to the event listener.
 *         this.emit('itemAdded', item);
 *     }
 * }
 * // Create an instance of ShoppingCart and Logger
 * const cart = new ShoppingCart();
 * // Listen to the `itemAdded` event and log the added item using the logger.
 * cart.on('itemAdded', (item) => {
 *     console.log(`Item added to cart: ${item.name} - Price: $${item.price}`);
 * });
 * // Simulate adding items to the cart
 * const item1 = { name : 'Smartphone', price : 1000 };
 * const item2 = { name : 'Headphones', price : 150 };
 *
 * cart.addItem(item1); // Output: "Item added to cart: Smartphone - Price: $1000"
 * cart.addItem(item2); // Output: "Item added to cart: Headphones - Price: $150"
 */
var Emitter = exports["default"] = /*#__PURE__*/function () {
  function Emitter() {}
  var _proto = Emitter.prototype;
  /**
   * Adds event listener.
   * @param {string} type Type of the event (e.g. `change`).
   * @param {function} listener Callback function to be called when the event is emitted.
   * @example
   * this.model.on('change', this.render.bind(this)); // Re render when model changes.
   */
  _proto.on = function on(type, listener) {
    if (typeof listener !== 'function') {
      throw TypeError('Listener must be a function');
    }
    if (!this.listeners) this.listeners = {};
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(listener);
  }

  /**
   * Adds event listener that executes once.
   * @param {string} type Type of the event (e.g. `change`).
   * @param {function} listener Callback function to be called when the event is emitted.
   * @example
   * this.model.once('change', () => console.log('This will happen once'));
   */;
  _proto.once = function once(type, _listener2) {
    if (typeof _listener2 === 'function') {
      var self = this;
      var _listener = _listener2;
      _listener2 = function listener() {
        _listener.apply(void 0, arguments);
        self.off(type, _listener2);
      };
    }
    this.on(type, _listener2);
  }

  /**
   * Removes event listeners.
   * @param {string} [type] Type of the event (e.g. `change`). If is not provided, it removes all listeners.
   * @param {function} [listener] Callback function to be called when the event is emitted. If listener is not provided, it removes all listeners for specified type.
   * @example
   * this.model.off('change'); // Stop listening to changes.
   */;
  _proto.off = function off(type, listener) {
    if (!type) {
      this.listeners = {};
    } else {
      if (!listener) {
        delete this.listeners[type];
      } else {
        var listeners = this.listeners[type];
        if (listeners) {
          var copy = listeners.slice();
          copy.forEach(function (fn, idx) {
            if (fn === listener) listeners.splice(idx, 1);
          });
          if (!listeners.length) {
            delete this.listeners[type];
          }
        }
      }
    }
  }

  /**
   * Emits event of specified type. Listeners will receive specified arguments.
   * @param {string} type Type of the event (e.g. `change`).
   * @param {any} [...args] Arguments to be passed to listener.
   * @example
   * this.emit('invalid'); // Emit validation error event.
   */;
  _proto.emit = function emit(type) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var listeners = this.listeners && this.listeners[type];
    if (!listeners || !listeners.length) return;
    var copy = listeners.slice();
    copy.forEach(function (fn) {
      fn.apply(void 0, args);
    });
  };
  return Emitter;
}();

/***/ }),

/***/ "./node_modules/rasti/lib/Model.js":
/*!*****************************************!*\
  !*** ./node_modules/rasti/lib/Model.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;
exports["default"] = void 0;
var _Emitter2 = _interopRequireDefault(__webpack_require__(/*! ./Emitter.js */ "./node_modules/rasti/lib/Emitter.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
/**
 * - Orchestrates data and business logic.
 * - Emits events when data changes.
 * 
 * A `Model` manages an internal table of data attributes and triggers change events when any of its data is modified.  
 * Models may handle syncing data with a persistence layer. To design your models, create atomic, reusable objects 
 * that contain all the necessary functions for manipulating their specific data.  
 * Models should be easily passed throughout your app and used anywhere the corresponding data is needed.  
 * Rasti models stores its attributes in `this.attributes`, which is extended from `this.defaults` and the 
 * constructor `attrs` parameter. For every attribute, a getter is generated to retrieve the model property 
 * from `this.attributes`, and a setter is created to set the model property in `this.attributes` and emit `change` 
 * and `change:attribute` events.
 * @module
 * @extends Rasti.Emitter
 * @param {object} attrs Object containing model attributes to extend `this.attributes`. Getters and setters are generated for `this.attributtes`, in order to emit `change` events.
 * @example
 * import { Model } from 'rasti';
 * // Product model
 * class ProductModel extends Model {
 *     preinitialize() {
 *         // The Product model has `name` and `price` default attributes.
 *         // `defaults` will extend `this.attributes`.
 *         // Getters and setters are generated for `this.attributes`,
 *         // in order to emit `change` events.
 *         this.defaults = {
 *             name: '',
 *             price: 0
 *         };
 *     }
 *
 *     setDiscount(discountPercentage) {
 *         // Apply a discount to the price property.
 *         // This will call a setter that will update `price` in `this.attributes`,
 *         // and emit `change` and `change:price` events.
 *         const discount = this.price * (discountPercentage / 100);
 *         this.price -= discount;
 *     }
 * }
 * // Create a product instance with a name and price.
 * const product = new ProductModel({ name: 'Smartphone', price: 1000 });
 * // Listen to the `change:price` event.
 * product.on('change:price', () => console.log('New Price:', product.price));
 * // Apply a 10% discount to the product.
 * product.setDiscount(10); // Output: "New Price: 900"
 */
var Model = exports["default"] = /*#__PURE__*/function (_Emitter) {
  function Model() {
    var _this;
    var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _this = _Emitter.call(this) || this;
    // Call preinitialize.
    _this.preinitialize.apply(_this, arguments);
    // attributes object.
    _this.attributes = Object.assign({}, _this.defaults || {}, attrs);
    // Previous attributes.
    _this.previous = {};
    // Generate getters/setters for every attr.
    Object.keys(_this.attributes).forEach(_this.defineAttribute.bind(_this));
    return _this;
  }

  /**
   * If you define a preinitialize method, it will be invoked when the Model is first created, before any instantiation logic is run for the Model.
   * @param {object} attrs Object containing model attributes to extend `this.attributes`.
   */
  _inheritsLoose(Model, _Emitter);
  var _proto = Model.prototype;
  _proto.preinitialize = function preinitialize() {}

  /**
   * Generate getter/setter for the given key. In order to emit `change` events.
   * This method is called internally by the constructor
   * for `this.attributes`.
   * @param {string} key Attribute key.
   */;
  _proto.defineAttribute = function defineAttribute(key) {
    var _this2 = this;
    Object.defineProperty(this, key, {
      get: function get() {
        return _this2.get(key);
      },
      set: function set(value) {
        _this2.set(key, value);
      }
    });
  }

  /**
   * Get an attribute from `this.attributes`.
   * This method is called internally by generated getters.
   * @param {string} key Attribute key.
   * @return {any} The attribute value.
   */;
  _proto.get = function get(key) {
    return this.attributes[key];
  }

  /**
   * Set an attribute into `this.attributes`.  
   * Emit `change` and `change:attribute` if a value change.  
   * Could be called in two forms, `this.set('key', value)` and
   * `this.set({ key : value })`.  
   * This method is called internally by generated setters.  
   * The `change` event listener will receive the model instance, an object containing the changed attributes, and the rest of the arguments passed to `set` method.  
   * The `change:attribute` event listener will receive the model instance, the new attribute value, and the rest of the arguments passed to `set` method.
   * @param {string} key Attribute key or object containing keys/values.
   * @param [value] Attribute value.
   * @return {this} This model.
   * @emits change
   * @emits change:attribute
   */;
  _proto.set = function set(key, value) {
    var _this3 = this;
    var attrs, args;
    // Handle both `"key", value` and `{key: value}` style arguments.
    for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }
    if (typeof key === 'object') {
      attrs = key;
      args = [value].concat(rest);
    } else {
      var _attrs;
      attrs = (_attrs = {}, _attrs[key] = value, _attrs);
      args = rest;
    }
    // Are we in a nested `set` call?
    // Calling a `set` inside a `change:attribute` or `change` event listener
    var changing = this._changing;
    this._changing = true;
    // Store changed attributes.
    var changed = {};
    // Store previous attributes.
    if (!changing) {
      this.previous = Object.assign({}, this.attributes);
    }
    // Set attributes.
    Object.keys(attrs).forEach(function (key) {
      // Use equality to determine if value changed.
      if (attrs[key] !== _this3.attributes[key]) {
        changed[key] = attrs[key];
        _this3.attributes[key] = attrs[key];
      }
    });
    var changedKeys = Object.keys(changed);
    // Pending `change` event arguments.
    if (changedKeys.length) this._pending = ['change', this, changed].concat(args);
    // Emit `change:attribute` events.
    changedKeys.forEach(function (key) {
      _this3.emit.apply(_this3, ["change:" + key, _this3, attrs[key]].concat(args));
    });
    // Don't emit `change` event until the end of the nested 
    // `set` calls inside `change:attribute` event listeners.
    if (changing) return this;
    // Emit `change` events, that might be nested.
    while (this._pending) {
      var pendingChange = this._pending;
      this._pending = null;
      this.emit.apply(this, pendingChange);
    }
    // Reset flags.
    this._pending = null;
    this._changing = false;
    return this;
  }

  /**
   * Return object representation of the model to be used for JSON serialization.
   * By default returns `this.attributes`.
   * @return {object} Object representation of the model to be used for JSON serialization.
   */;
  _proto.toJSON = function toJSON() {
    return this.attributes;
  };
  return Model;
}(_Emitter2["default"]);

/***/ }),

/***/ "./node_modules/rasti/lib/View.js":
/*!****************************************!*\
  !*** ./node_modules/rasti/lib/View.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;
exports["default"] = void 0;
var _Emitter2 = _interopRequireDefault(__webpack_require__(/*! ./Emitter.js */ "./node_modules/rasti/lib/Emitter.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
// This options keys will be extended on view instance.
var viewOptions = {
  el: true,
  tag: true,
  attributes: true,
  events: true,
  model: true,
  template: true,
  onDestroy: true
};

/**
 * - Listens for changes and renders UI.
 * - Handles user input and interactivity.
 * - Sends captured input to the model.
 *
 * A `View` is an atomic unit of the user interface that can render the data from a specific model or multiple models.
 * However, views can also be independent and have no associated data.  
 * Models must be unaware of views. Views, on the other hand, may render model data and listen to the change events 
 * emitted by the models to re-render themselves based on changes.  
 * Each `View` has a root element, `this.el`, which is used for event delegation.  
 * All element lookups are scoped to this element, and any rendering or DOM manipulations should be done inside it. 
 * If `this.el` is not present, an element will be created using `this.tag` (defaulting to div) and `this.attributes`.
 * @module
 * @extends Rasti.Emitter
 * @param {object} options Object containing options. The following keys will be merged to `this`: el, tag, attributes, events, model, template, onDestroy.
 * @property {node} el Every view has a root element, `this.el`. If not present it will be created.
 * @property {string} tag If `this.el` is not present, an element will be created using `this.tag`. Default is `div`.
 * @property {object} attributes If `this.el` is not present, an element will be created using `this.attributes`.
 * @property {object} events Object in the format `{'event selector' : 'listener'}`. Used to bind delegated event listeners to root element.
 * @property {object} model A `Rasti.Model` or any object containing data and business logic.
 * @property {function} template A function that receives data and returns a markup string (html for example).
 * @example
 * import { View } from 'rasti';
 * 
 * class Timer extends View {
 *     constructor(options) {
 *         super(options);
 *         // Create model to store internal state. Set `seconds` attribute into 0.
 *         this.model = new Model({ seconds : 0 });
 *         // Listen to changes in model `seconds` attribute and re render.
 *         this.model.on('change:seconds', this.render.bind(this));
 *         // Increment model `seconds` attribute every 1000 milliseconds.
 *         this.interval = setInterval(() => this.model.seconds++, 1000);
 *     }
 *
 *     template(model) {
 *         return `Seconds: <span>${model.seconds}</span>`;
 *     }
 * }
 * // Render view and append view's element into body.
 * document.body.appendChild(new Timer().render().el);
 */
var View = exports["default"] = /*#__PURE__*/function (_Emitter) {
  function View() {
    var _this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _this = _Emitter.call(this) || this;
    // Call preinitialize.
    _this.preinitialize.apply(_this, arguments);
    // Generate unique id.
    // Useful to generate elements ids.
    _this.uid = "uid" + ++View.uid;
    // Store delegated events listeners,
    // so they can be unbound later.
    _this.delegatedEventListeners = [];
    // Store child views,
    // so they can be destroyed.
    _this.children = [];
    // Extend "this" with options, mapping viewOptions keys.
    Object.keys(options).forEach(function (key) {
      if (viewOptions[key]) _this[key] = options[key];
    });
    // Ensure that the view has a root element at `this.el`.
    _this.ensureElement();
    return _this;
  }

  /**
   * If you define a preinitialize method, it will be invoked when the view is first created, before any instantiation logic is run.
   * @param {object} attrs Object containing model attributes to extend `this.attributes`.
   */
  _inheritsLoose(View, _Emitter);
  var _proto = View.prototype;
  _proto.preinitialize = function preinitialize() {}

  /**
   * Returns the first element that match the selector, 
   * scoped to DOM elements within the current view's root element (`this.el`).
   * @param {string} selector CSS selector.
   * @return {node} Element matching selector within the view's root element (`this.el`).
   */;
  _proto.$ = function $(selector) {
    return this.el.querySelector(selector);
  }

  /**
   * Returns a list of elements that match the selector, 
   * scoped to DOM elements within the current view's root element (`this.el`).
   * @param {string} selector CSS selector.
   * @return {node[]} List of elements matching selector within the view's root element (`this.el`).
   */;
  _proto.$$ = function $$(selector) {
    return this.el.querySelectorAll(selector);
  }

  /**
   * Destroy the view.
   * Destroy children views if any, undelegate events, stop listening to events, call `onDestroy` lifecycle method.
   * @return {Rasti.View} Return `this` for chaining.
   */;
  _proto.destroy = function destroy() {
    // Call destroy on children.
    this.destroyChildren();
    // Undelegate `this.el` event listeners
    this.undelegateEvents();
    // Unbind `this` events.
    this.off();
    // Call onDestroy lifecycle method
    this.onDestroy.apply(this, arguments);
    // Return `this` for chaining.
    return this;
  }

  /**
   * `onDestroy` lifecycle method is called after view is destroyed.
   * Override with your code. Useful to stop listening to model's events.
   * @param {object} options Options object or any arguments passed to `destroy` method.
   */;
  _proto.onDestroy = function onDestroy() {}

  /**
   * Add a view as a child.
   * Children views are stored at `this.children`, and destroyed when the parent is destroyed.
   * Returns the child for chaining.
   * @param {Rasti.View} child
   * @return {Rasti.View}
   */;
  _proto.addChild = function addChild(child) {
    this.children.push(child);
    return child;
  }

  /**
   * Call destroy method on children views.
   */;
  _proto.destroyChildren = function destroyChildren() {
    while (this.children.length) this.children.shift().destroy();
  }

  /**
   * Ensure that the view has a root element at `this.el`.
   * You shouldn't call this method directly. It's called from constructor.
   * You may override it if you want to use a different logic or to 
   * postpone element creation.
   */;
  _proto.ensureElement = function ensureElement() {
    // If "this.el" is not present,
    // create a new element according "this.tag"
    // and "this.attributes".
    if (!this.el) this.el = this.createElement(this.tag, this.attributes);
    // Delegate events on element.
    this.delegateEvents();
  }

  /**
   * Create an element.
   * Called from constructor if `this.el` is undefined, to ensure
   * the view to have a root element.
   * @param {string} tag Tag for the element. Default to `div`
   * @param {object} attrs Attributes for the element.
   * @return {node} The created element.
   */;
  _proto.createElement = function createElement() {
    var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    // Create dom element.
    var el = document.createElement(tag);
    // Add element attributes.
    Object.keys(attrs).forEach(function (key) {
      return el.setAttribute(key, attrs[key]);
    });
    return el;
  }

  /**
   * Remove `this.el` from DOM.
   * @return {Rasti.View} Return `this` for chaining.
   */;
  _proto.removeElement = function removeElement() {
    this.el.parentNode.removeChild(this.el);
    // Return `this` for chaining.
    return this;
  }

  /**
   * Provide declarative listeners for DOM events within a view. If an events hash is not passed directly, uses `this.events` as the source.  
   * Events are written in the format `{'event selector' : 'listener'}`. The listener may be either the name of a method on the view, or a direct function body.
   * Omitting the selector causes the event to be bound to the view's root element (`this.el`).  
   * By default, `delegateEvents` is called within the View's constructor, 
   * so if you have a simple events hash, all of your DOM events will always already be connected, and you will never have to call this function yourself.   
   * All attached listeners are bound to the view automatically, so when the listeners are invoked, `this` continues to refer to the view object.  
   * When `delegateEvents` is run again, perhaps with a different events hash, all listeners are removed and delegated afresh.
   * @param {object} [events] Object in the format `{'event selector' : 'listener'}`. Used to bind delegated event listeners to root element.
   * @return {Rasti.View} Return `this` for chaining.
   * @example
   * MyView.prototype.events = {
   *      'click button.ok' : 'onClickOkButton',
   *      'click button.cancel' : function() {}
   * };
   */;
  _proto.delegateEvents = function delegateEvents() {
    var _this2 = this;
    var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.events;
    if (!events) return this;
    if (this.delegatedEventListeners.length) this.undelegateEvents();

    // Store events by type i.e.: "click", "submit", etc.
    var eventTypes = {};
    Object.keys(events).forEach(function (key) {
      var keyParts = key.split(' ');
      var type = keyParts.shift();
      var selector = keyParts.join(' ');
      var listener = events[key];
      // Listener may be a string representing a method name on the view,
      // or a function.
      listener = (typeof listener === 'string' ? _this2[listener] : listener).bind(_this2);
      if (!eventTypes[type]) eventTypes[type] = [];
      eventTypes[type].push({
        selector: selector,
        listener: listener
      });
    });
    Object.keys(eventTypes).forEach(function (type) {
      // Listener for the type of event.
      var typeListener = function typeListener(event) {
        // Iterate and run every individual listener if the selector matches.
        eventTypes[type].forEach(function (_ref) {
          var selector = _ref.selector,
            listener = _ref.listener;
          if (!selector || event.target.closest(selector)) listener(event, _this2);
        });
      };
      _this2.delegatedEventListeners.push({
        type: type,
        listener: typeListener
      });
      _this2.el.addEventListener(type, typeListener);
    });
    // Return `this` for chaining.
    return this;
  }

  /**
   * Removes all of the view's delegated events. Useful if you want to disable or remove a view from the DOM temporarily. Called automatically when the view is destroyed.
   * @return {Rasti.View} Return `this` for chaining.
   */;
  _proto.undelegateEvents = function undelegateEvents() {
    var _this3 = this;
    this.delegatedEventListeners.forEach(function (_ref2) {
      var type = _ref2.type,
        listener = _ref2.listener;
      _this3.el.removeEventListener(type, listener);
    });
    this.delegatedEventListeners = [];
    // Return `this` for chaining.
    return this;
  }

  /**
   * Render the view.
   * This method should be overridden with custom logic.
   * The default implementation sets innerHTML of `this.el` with `this.template`.
   * Conventions are to only manipulate the dom in the scope of `this.el`, 
   * and to return `this` for chaining.
   * If you added any child view, you must call `this.destroyChildren`.
   * @return {Rasti.View} Return `this` for chaining.
   */;
  _proto.render = function render() {
    if (this.template) this.el.innerHTML = this.template(this.model);
    // Return `this` for chaining.
    return this;
  };
  return View;
}(_Emitter2["default"]);
/*
 * Unique Id
 */
View.uid = 0;

/***/ }),

/***/ "./node_modules/rasti/lib/index.js":
/*!*****************************************!*\
  !*** ./node_modules/rasti/lib/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.__esModule = true;
var _Emitter = _interopRequireDefault(__webpack_require__(/*! ./Emitter.js */ "./node_modules/rasti/lib/Emitter.js"));
exports.Emitter = _Emitter["default"];
var _Model = _interopRequireDefault(__webpack_require__(/*! ./Model.js */ "./node_modules/rasti/lib/Model.js"));
exports.Model = _Model["default"];
var _View = _interopRequireDefault(__webpack_require__(/*! ./View.js */ "./node_modules/rasti/lib/View.js"));
exports.View = _View["default"];
var _Component = _interopRequireDefault(__webpack_require__(/*! ./Component.js */ "./node_modules/rasti/lib/Component.js"));
exports.Component = _Component["default"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/audio/back.mp3":
/*!****************************!*\
  !*** ./src/audio/back.mp3 ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "./audio/back.mp3";

/***/ }),

/***/ "./src/audio/bonus.mp3":
/*!*****************************!*\
  !*** ./src/audio/bonus.mp3 ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "./audio/bonus.mp3";

/***/ }),

/***/ "./src/audio/dead.mp3":
/*!****************************!*\
  !*** ./src/audio/dead.mp3 ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "./audio/dead.mp3";

/***/ }),

/***/ "./src/audio/dot.mp3":
/*!***************************!*\
  !*** ./src/audio/dot.mp3 ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "./audio/dot.mp3";

/***/ }),

/***/ "./src/audio/eat.mp3":
/*!***************************!*\
  !*** ./src/audio/eat.mp3 ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "./audio/eat.mp3";

/***/ }),

/***/ "./src/audio/eaten.mp3":
/*!*****************************!*\
  !*** ./src/audio/eaten.mp3 ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "./audio/eaten.mp3";

/***/ }),

/***/ "./src/audio/frightened.mp3":
/*!**********************************!*\
  !*** ./src/audio/frightened.mp3 ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "./audio/frightened.mp3";

/***/ }),

/***/ "./src/audio/intro.mp3":
/*!*****************************!*\
  !*** ./src/audio/intro.mp3 ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "./audio/intro.mp3";

/***/ }),

/***/ "./src/audio/life.mp3":
/*!****************************!*\
  !*** ./src/audio/life.mp3 ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "./audio/life.mp3";

/***/ }),

/***/ "./src/fonts/press-start-2p-v9-latin-regular.woff":
/*!********************************************************!*\
  !*** ./src/fonts/press-start-2p-v9-latin-regular.woff ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "./fonts/press-start-2p-v9-latin-regular.woff";

/***/ }),

/***/ "./src/fonts/press-start-2p-v9-latin-regular.woff2":
/*!*********************************************************!*\
  !*** ./src/fonts/press-start-2p-v9-latin-regular.woff2 ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "./fonts/press-start-2p-v9-latin-regular.woff2";

/***/ }),

/***/ "./src/img/characters1.png":
/*!*********************************!*\
  !*** ./src/img/characters1.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "./img/characters1.png";

/***/ }),

/***/ "./src/img/maze.png":
/*!**************************!*\
  !*** ./src/img/maze.png ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "./img/maze.png";

/***/ }),

/***/ "./src/img/misc.png":
/*!**************************!*\
  !*** ./src/img/misc.png ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "./img/misc.png";

/***/ }),

/***/ "./src/img/pills1.png":
/*!****************************!*\
  !*** ./src/img/pills1.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "./img/pills1.png";

/***/ }),

/***/ "./src/img/start.png":
/*!***************************!*\
  !*** ./src/img/start.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "./img/start.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _img_characters1_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./img/characters1.png */ "./src/img/characters1.png");
/* harmony import */ var _img_misc_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/misc.png */ "./src/img/misc.png");
/* harmony import */ var _img_pills1_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/pills1.png */ "./src/img/pills1.png");
/* harmony import */ var _audio_back_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./audio/back.mp3 */ "./src/audio/back.mp3");
/* harmony import */ var _audio_bonus_mp3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./audio/bonus.mp3 */ "./src/audio/bonus.mp3");
/* harmony import */ var _audio_dead_mp3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./audio/dead.mp3 */ "./src/audio/dead.mp3");
/* harmony import */ var _audio_dot_mp3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./audio/dot.mp3 */ "./src/audio/dot.mp3");
/* harmony import */ var _audio_eat_mp3__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./audio/eat.mp3 */ "./src/audio/eat.mp3");
/* harmony import */ var _audio_eaten_mp3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./audio/eaten.mp3 */ "./src/audio/eaten.mp3");
/* harmony import */ var _audio_frightened_mp3__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./audio/frightened.mp3 */ "./src/audio/frightened.mp3");
/* harmony import */ var _audio_intro_mp3__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./audio/intro.mp3 */ "./src/audio/intro.mp3");
/* harmony import */ var _audio_life_mp3__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./audio/life.mp3 */ "./src/audio/life.mp3");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _js_Game__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./js/Game */ "./src/js/Game.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
// Images



// Audio









// CSS


window.addEventListener('load', function (event) {
  var container = document.querySelector('.js-pacman-container');
  var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  var GameWithPosition = /*#__PURE__*/function (_Game) {
    function GameWithPosition(options) {
      var _this;
      _this = _Game.call(this, options) || this;
      _this.el.style.left = '50%';
      _this.el.style.marginLeft = "-" + _this.el.offsetWidth / 2 + "px";
      _this.el.style.top = '50%';
      _this.el.style.marginTop = "-" + _this.el.offsetHeight / 2 + "px";
      return _this;
    }
    _inheritsLoose(GameWithPosition, _Game);
    return GameWithPosition;
  }(_js_Game__WEBPACK_IMPORTED_MODULE_13__["default"]);
  var game = new GameWithPosition({
    el: document.querySelector('.js-pacman-playground'),
    width: vw * 0.9,
    height: vh * 0.9
  });
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0FBRyxFQUFFMEIsbURBQUksRUFBRSxRQUFRLENBQUMsRUFDN0csQ0FBQzFCLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTBCLG1EQUFJLEVBQUUsUUFBUSxDQUFDLEVBQzdHLENBQUMxQixLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUwQixtREFBSSxFQUFFLFFBQVEsQ0FBQyxFQUNqSCxDQUFDMUIsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFMkIsbURBQUksRUFBRSxRQUFRLENBQUMsRUFDakgsQ0FBQzNCLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTJCLG1EQUFJLEVBQUUsUUFBUSxDQUFDLEVBQ2xILENBQUMzQixLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUyQixtREFBSSxFQUFFLFFBQVEsQ0FBQyxFQUNsSCxDQUFDM0IsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFMkIsbURBQUksRUFBRSxRQUFRLENBQUMsRUFDbEgsQ0FBQzNCLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTRCLG1EQUFJLEVBQUUsUUFBUSxDQUFDLEVBQ2xILENBQUM1QixLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU0QixtREFBSSxFQUFFLFFBQVEsQ0FBQyxFQUNsSCxDQUFDNUIsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFNEIsbURBQUksRUFBRSxRQUFRLENBQUMsRUFDbEgsQ0FBQzVCLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTRCLG1EQUFJLEVBQUUsUUFBUSxDQUFDLEVBQ2xILENBQUM1QixLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUyQixtREFBSSxFQUFFLFFBQVEsQ0FBQyxFQUNsSCxDQUFDM0IsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFMkIsbURBQUksRUFBRSxRQUFRLENBQUMsRUFDbkgsQ0FBQzNCLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTJCLG1EQUFJLEVBQUUsUUFBUSxDQUFDLEVBQ25ILENBQUMzQixLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUyQixtREFBSSxFQUFFLFFBQVEsQ0FBQyxFQUMvRyxDQUFDM0IsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFNEIsbURBQUksRUFBRSxRQUFRLENBQUMsRUFDbkgsQ0FBQzVCLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTRCLG1EQUFJLEVBQUUsUUFBUSxDQUFDLEVBQy9HLENBQUM1QixLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU0QixtREFBSSxFQUFFLFFBQVEsQ0FBQyxFQUMvRyxDQUFDNUIsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFNEIsbURBQUksRUFBRSxRQUFRLENBQUMsQ0FDakg7QUFFRCxJQUFJN1EsSUFBSSxHQUFHLENBQ1AsWUFBWSxF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QUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLENBQzdCOzs7Ozs7Ozs7Ozs7OztBQ3JDRCxpRUFBZSxDQUNmLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLENBQzdCOzs7Ozs7Ozs7Ozs7OztBQ3JDRCxpRUFBZ0IsQ0FDaEIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsQ0FDN0I7Ozs7Ozs7Ozs7Ozs7O0FDckNELGlFQUFlLENBQ2YsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsQ0FDN0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckNEO0FBQzBHO0FBQ2pCO0FBQ087QUFDaEcsNENBQTRDLHVLQUFnRTtBQUM1Ryw0Q0FBNEMscUtBQStEO0FBQzNHLDRDQUE0Qyx5R0FBaUM7QUFDN0UsNENBQTRDLDJHQUFrQztBQUM5RSw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GLHlDQUF5QyxzRkFBK0I7QUFDeEUseUNBQXlDLHNGQUErQjtBQUN4RSx5Q0FBeUMsc0ZBQStCO0FBQ3hFLHlDQUF5QyxzRkFBK0I7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG1DQUFtQztBQUNoRCxhQUFhLG1DQUFtQyxrQkFBa0I7QUFDbEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixtQ0FBbUM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLG1DQUFtQztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsT0FBTyx3RkFBd0YsTUFBTSxZQUFZLGFBQWEsYUFBYSxPQUFPLG1CQUFtQixPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFL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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxNQUFNO0FBQ25CLGFBQWEsU0FBUztBQUN0QixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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SzhILEVBQUUsQ0FBQzZaLFlBQVksR0FBRyxDQUFDLE9BQUk7TUFBQyxPQUFBM2hCLEtBQUE7SUFDL0Q7SUFBQ21CLGNBQUEsQ0FBQW1nQixnQkFBQSxFQUFBN1ksS0FBQTtJQUFBLE9BQUE2WSxnQkFBQTtFQUFBLEVBUDBCM2EsaURBQUk7RUFVbkMsSUFBTWliLElBQUksR0FBRyxJQUFJTixnQkFBZ0IsQ0FBQztJQUM5QnhaLEVBQUUsRUFBRzJTLFFBQVEsQ0FBQzVLLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztJQUNwRC9MLEtBQUssRUFBR2dkLEVBQUUsR0FBRyxHQUFHO0lBQ2hCL2MsTUFBTSxFQUFHb2QsRUFBRSxHQUFHO0VBQ2xCLENBQUMsQ0FBQztBQUVOLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvQm9udXMuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvQm9udXNlcy5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9DaGFyYWN0ZXIuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvR2FtZS5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9HYW1lTW9kZWwuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvR2hvc3QuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvSXRlbS5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9MaXZlcy5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9NYXAuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvUGFjbWFuLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL1NvdW5kTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9UaWxlLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL2VuZ2luZS9BbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvZW5naW5lL0dhbWUuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvZW5naW5lL0tleWJvYXJkLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL2VuZ2luZS9Nb2RlbC5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9lbmdpbmUvU2NhbGluZy5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9lbmdpbmUvU291bmQuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvZW5naW5lL1Nwcml0ZS5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9lbmdpbmUvVGltZXIuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvZW5naW5lL1RvdWNoLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL2ZhY3RvcnkvbWFrZUJvbnVzLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL2ZhY3RvcnkvbWFrZURvdC5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9mYWN0b3J5L21ha2VHaG9zdC5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9mYWN0b3J5L21ha2VQaWxsLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL2hlbHBlci9nZXREaXN0YW5jZS5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9oZWxwZXIvcm5kLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL21hcHMvbWFwLTEuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvbWFwcy9tYXAtMi5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9tYXBzL21hcC0zLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL21hcHMvbWFwLTQuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9ub2RlX21vZHVsZXMvcmFzdGkvbGliL0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL25vZGVfbW9kdWxlcy9yYXN0aS9saWIvRW1pdHRlci5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL25vZGVfbW9kdWxlcy9yYXN0aS9saWIvTW9kZWwuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9ub2RlX21vZHVsZXMvcmFzdGkvbGliL1ZpZXcuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9ub2RlX21vZHVsZXMvcmFzdGkvbGliL2luZGV4LmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL3N0eWxlcy5jc3M/NDRiMiIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2pzUGFjbWFuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2pzUGFjbWFuL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2pzUGFjbWFuL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qc1BhY21hbi93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2pzUGFjbWFuL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qc1BhY21hbi93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9qc1BhY21hbi93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9qc1BhY21hbi93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFuaW1hdGlvbiBmcm9tICcuL2VuZ2luZS9BbmltYXRpb24nO1xuaW1wb3J0IENoYXJhY3RlciBmcm9tICcuL0NoYXJhY3Rlcic7XG5pbXBvcnQgZ2V0RGlzdGFuY2UgZnJvbSAnLi9oZWxwZXIvZ2V0RGlzdGFuY2UnO1xuXG5leHBvcnQgY29uc3QgYW5pbWF0aW9uQmFzZSA9IHtcbiAgICBpbWFnZVVSTCA6ICdpbWcvbWlzYy5wbmcnLFxuICAgIG9mZnNldFkgOiAwLFxuICAgIG9mZnNldFggOiAwXG59XG5cbmV4cG9ydCBjb25zdCBhbmltYXRpb25zID0ge1xuICAgICdkZWZhdWx0JyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAuLi5hbmltYXRpb25CYXNlXG4gICAgfSksXG4gICAgJ3Njb3JlMTAwJyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICBvZmZzZXRZIDogNjBcbiAgICB9KSxcbiAgICAnc2NvcmUyMDAnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgIG9mZnNldFggOiA2MCxcbiAgICAgICAgb2Zmc2V0WSA6IDYwXG4gICAgfSksXG4gICAgJ3Njb3JlNTAwJyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICBvZmZzZXRYIDogNjAgKiAyLFxuICAgICAgICBvZmZzZXRZIDogNjBcbiAgICB9KSxcbiAgICAnc2NvcmU3MDAnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgIG9mZnNldFggOiA2MCAqIDMsXG4gICAgICAgIG9mZnNldFkgOiA2MFxuICAgIH0pLFxuICAgICdzY29yZTEwMDAnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgIG9mZnNldFggOiA2MCAqIDQsXG4gICAgICAgIG9mZnNldFkgOiA2MFxuICAgIH0pLFxuICAgICdzY29yZTIwMDAnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgIG9mZnNldFggOiA2MCAqIDUsXG4gICAgICAgIG9mZnNldFkgOiA2MFxuICAgIH0pLFxuICAgICdzY29yZTUwMDAnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgIG9mZnNldFggOiA2MCAqIDYsXG4gICAgICAgIG9mZnNldFkgOiA2MFxuICAgIH0pXG59O1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgICBhbmltYXRpb25zLFxuICAgIHNwZWVkIDogNDAsXG4gICAgc2NvcmUgOiAnMTAwJ1xufTtcblxuY2xhc3MgQm9udXMgZXh0ZW5kcyBDaGFyYWN0ZXIge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICAgICAgT2JqZWN0LmtleXMoZGVmYXVsdHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gb3B0aW9ucykgdGhpc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHsgYWRkUGFjbWFuUG9zaXRpb25FdmVudExpc3RlbmVyIH0gPSBvcHRpb25zO1xuXG4gICAgICAgIC8vIENoYW5nZSB0aWxlLlxuICAgICAgICB0aGlzLm9uKCdpdGVtOnRpbGUnLCAodGlsZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZGlyID0gdGhpcy5fbmV4dERpcjtcbiAgICAgICAgICAgIHRoaXMuX25leHREaXIgPSB0aGlzLmdldE5leHREaXJlY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMuX2VhdEV2ZW50ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmdldFRpbGUoKSA9PT0gdGhpcy5fZ2V0VGFyZ2V0KCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdGFyZ2V0Rm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0Rm91bmQtLTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2l0ZW06ZGVzdHJveScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICBhZGRQYWNtYW5Qb3NpdGlvbkV2ZW50TGlzdGVuZXIoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY21hbkRhdGEgPSBkYXRhO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl90YXJnZXRGb3VuZCA9IDI7XG4gICAgfVxuXG4gICAgbW92ZSgpIHtcbiAgICAgICAgQ2hhcmFjdGVyLnByb3RvdHlwZS5tb3ZlLmNhbGwodGhpcywgdGhpcy5fZGlyKTtcbiAgICAgICAgLy8gRWF0IG9yIGVhdGVuIVxuICAgICAgICBpZiAoIXRoaXMuX2VhdEV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgcGFjbWFuVGlsZSA9IHRoaXMucGFjbWFuRGF0YS50aWxlLCB0aWxlID0gdGhpcy5nZXRUaWxlKCksIG9wcG9zaXRlID0gdGhpcy5fZ2V0T3BEaXJlY3Rpb24odGhpcy5fZGlyKTtcbiAgICAgICAgICAgIGlmIChwYWNtYW5UaWxlID09PSB0aWxlIHx8ICh0aGlzLnBhY21hbkRhdGEuZGlyID09PSBvcHBvc2l0ZSAmJiBwYWNtYW5UaWxlID09PSB0aWxlLmdldChvcHBvc2l0ZSkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWF0RXZlbnQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fbmV4dEFuaW1hdGlvbiA9ICB0aGlzLmFuaW1hdGlvbnNbYHNjb3JlJHt0aGlzLnNjb3JlfWBdO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2l0ZW06ZWF0ZW4nLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE5leHREaXJlY3Rpb24oKSB7XG4gICAgICAgIHZhciB0YXJnZXRUaWxlID0gdGhpcy5fZ2V0VGFyZ2V0KCk7IC8vIFRhcmdldCBUaWxlXG5cbiAgICAgICAgdmFyIF9kaXIgPSB0aGlzLl9kaXIgfHwgdGhpcy5kaXI7XG5cbiAgICAgICAgdmFyIG5leHRUaWxlID0gdGhpcy5nZXRUaWxlKCkuZ2V0KF9kaXIpOyAvLyBOZXh0IHRpbGUuXG5cbiAgICAgICAgdmFyIGRpcmVjdGlvbnMgPSBbJ3UnLCAnbCcsICdkJywgJ3InXTsgLy8gUHJlZmVycmVkIGRpcmVjdGlvbiBvcmRlci5cblxuICAgICAgICB2YXIgbmV4dERpcmVjdGlvbiwgbGFzdERpc3RhbmNlO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZGlyID0gZGlyZWN0aW9uc1tpXTtcblxuICAgICAgICAgICAgaWYgKGRpciA9PT0gdGhpcy5fZ2V0T3BEaXJlY3Rpb24oX2RpcikpIGNvbnRpbnVlOyAvLyBDYW50J3QgZ28gYmFjay5cblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FuR28oZGlyLCBuZXh0VGlsZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVzdFRpbGUgPSBuZXh0VGlsZS5nZXQoZGlyKTtcbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBnZXREaXN0YW5jZSh0ZXN0VGlsZSwgdGFyZ2V0VGlsZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGxhc3REaXN0YW5jZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbGFzdERpc3RhbmNlID4gZGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dERpcmVjdGlvbiA9IGRpcjtcbiAgICAgICAgICAgICAgICAgICAgbGFzdERpc3RhbmNlID0gZGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHREaXJlY3Rpb247XG4gICAgfVxuXG4gICAgY2FuR28oZGlyLCB0aWxlKSB7XG4gICAgICAgIGlmICghdGlsZSkgdGlsZSA9IHRoaXMuZ2V0VGlsZSgpO1xuXG4gICAgICAgIHZhciBuZXh0VGlsZSA9IHRpbGUuZ2V0KGRpcik7XG5cbiAgICAgICAgaWYgKCFuZXh0VGlsZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiAhbmV4dFRpbGUuaXNXYWxsKCkgJiYgIW5leHRUaWxlLmlzSG91c2UoKTtcbiAgICB9XG5cbiAgICBfZ2V0VGFyZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAudHVubmVsc1swXTtcbiAgICB9XG5cbiAgICBzZXROZXh0QW5pbWF0aW9uKCkge31cbn1cblxuT2JqZWN0LmFzc2lnbihCb251cy5wcm90b3R5cGUsIGRlZmF1bHRzKTtcblxuZXhwb3J0IGRlZmF1bHQgQm9udXM7XG4iLCJpbXBvcnQgbWFrZUJvbnVzIGZyb20gJy4vZmFjdG9yeS9tYWtlQm9udXMnO1xuXG5jbGFzcyBCb251c2VzIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuYm9udXNlcyA9IFtdO1xuXG4gICAgICAgIHRoaXMueCA9IG9wdGlvbnMueDtcbiAgICAgICAgdGhpcy55ID0gb3B0aW9ucy55O1xuXG4gICAgICAgIHRoaXMubW9kZWwgPSBvcHRpb25zLm1vZGVsO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgYm9udXMgPSBtYWtlQm9udXMoaSwge1xuICAgICAgICAgICAgICAgIHggOiBvcHRpb25zLnggLSBpICogNjQsXG4gICAgICAgICAgICAgICAgeSA6IG9wdGlvbnMueSxcbiAgICAgICAgICAgICAgICBmYWN0b3IgOiBvcHRpb25zLmZhY3RvcixcbiAgICAgICAgICAgICAgICBhZGRQYWNtYW5Qb3NpdGlvbkV2ZW50TGlzdGVuZXIgOiAoKSA9PiB7fSxcbiAgICAgICAgICAgICAgICBub3JtYWxpemVSZWZyYXNoUmF0ZSA6ICgpID0+IDFcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBvcHRpb25zLmFkZFNwcml0ZShib251cyk7XG4gICAgICAgICAgICB0aGlzLmJvbnVzZXMucHVzaChib251cyk7XG5cbiAgICAgICAgICAgIGlmIChpID49IHRoaXMubW9kZWwubGV2ZWwpIHRoaXMuYm9udXNlc1tpXS5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vZGVsLm9uKCdjaGFuZ2U6bGV2ZWwnLCB0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA+PSB0aGlzLm1vZGVsLmxldmVsKSB0aGlzLmJvbnVzZXNbaV0uaGlkZSgpO1xuICAgICAgICAgICAgZWxzZSB0aGlzLmJvbnVzZXNbaV0uc2hvdygpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCb251c2VzO1xuIiwiaW1wb3J0IEl0ZW0gZnJvbSAnLi9JdGVtJztcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgd2lkdGggOiA2MCxcbiAgICBoZWlnaHQgOiA2MCxcbiAgICBzdGVwIDogMTAsXG4gICAgc3BlZWQgOiA4MCxcbiAgICBkaXIgOiBudWxsLFxuICAgIHByZXR1cm4gOiBmYWxzZVxufTtcblxuY29uc3QgYW5pbWF0aW9uTGFiZWxzQnlEaXJlY3Rpb25zID0ge1xuICAgIGwgOiAnbGVmdCcsXG4gICAgciA6ICdyaWdodCcsXG4gICAgdSA6ICd1cCcsXG4gICAgZCA6ICdkb3duJ1xufTtcblxuY29uc3Qgb3Bwb3NpdGVEaXJlY3Rpb25zID0ge1xuICAgIGwgOiAncicsXG4gICAgciA6ICdsJyxcbiAgICB1IDogJ2QnLFxuICAgIGQgOiAndSdcbn07XG5cbmNsYXNzIENoYXJhY3RlciBleHRlbmRzIEl0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICAgICAgT2JqZWN0LmtleXMoZGVmYXVsdHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gb3B0aW9ucykgdGhpc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnBhdXNlQW5pbWF0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5vbignaXRlbTp0aWxlJywgKHRpbGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0TmV4dEFuaW1hdGlvbigpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9tb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fbGFzdFggPSB0aGlzLng7XG4gICAgICAgIHRoaXMuX2xhc3RZID0gdGhpcy55O1xuICAgICAgICB0aGlzLl9zcGVlZCA9IHRoaXMuc3BlZWQ7XG4gICAgICAgIHRoaXMuX2RpciA9IG51bGw7XG4gICAgICAgIHRoaXMuX25leHRBbmltYXRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLl9uZXh0RGlyZWN0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbW92aW5nID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fc2F2ZURlZmF1bHRzKClcbiAgICB9XG5cbiAgICBfc2F2ZURlZmF1bHRzKCkge1xuICAgICAgICB0aGlzLl9kZWZhdWx0cyA9IHt9O1xuXG4gICAgICAgIFtcbiAgICAgICAgICAgICd4JyxcbiAgICAgICAgICAgICd5JyxcbiAgICAgICAgICAgICdfbGFzdFgnLFxuICAgICAgICAgICAgJ19sYXN0WScsXG4gICAgICAgICAgICAnZGlyJyxcbiAgICAgICAgICAgICdfZGlyJyxcbiAgICAgICAgICAgICdfbmV4dEFuaW1hdGlvbicsXG4gICAgICAgICAgICAnX25leHREaXJlY3Rpb24nLFxuICAgICAgICAgICAgJ19tb3ZpbmcnLFxuICAgICAgICAgICAgJ21vZGUnLFxuICAgICAgICAgICAgJ2FuaW1hdGlvbidcbiAgICAgICAgXS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0c1trZXldID0gdGhpc1trZXldO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLl9kZWZhdWx0cyk7XG4gICAgICAgIHRoaXMudHJhbnNmb3JtKCk7XG4gICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uKHRoaXMuYW5pbWF0aW9uKTtcbiAgICAgICAgdGhpcy5wYXVzZUFuaW1hdGlvbigpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdmFyIHRpbGUgPSB0aGlzLmdldFRpbGUoKTtcblxuICAgICAgICAvLyBGaXggZmxvYXQgcG9pbnQgb2Zmc2V0LlxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy55IC0gdGlsZS55KSA8IDEpIHRoaXMueSA9IHRpbGUueTtcbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMueCAtIHRpbGUueCkgPCAxKSB0aGlzLnggPSB0aWxlLng7XG5cbiAgICAgICAgLy8gUG9zaXRpb24gY2hhbmdlLCBtb3ZlLlxuICAgICAgICBpZiAodGhpcy5fbGFzdFggIT09IHRoaXMueCB8fCB0aGlzLl9sYXN0WSAhPSB0aGlzLnkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0WFlaKHtcbiAgICAgICAgICAgICAgICB4IDogdGhpcy54LFxuICAgICAgICAgICAgICAgIHkgOiB0aGlzLnlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLl9sYXN0WCA9IHRoaXMueDtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RZID0gdGhpcy55O1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuX21vdmluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnaXRlbTptb3ZlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bWVBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2l0ZW06cG9zaXRpb24nLCB0aGlzLl9nZXRQb3NpdGlvbkRhdGEoKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE5vdCBtb3ZpbmcuXG4gICAgICAgICAgICBpZiAodGhpcy5fbW92aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdpdGVtOnN0b3AnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlQW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW92aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hhbmdlZCBhbmltYXRpb24uXG4gICAgICAgIGlmICh0aGlzLl9uZXh0QW5pbWF0aW9uICYmIHRoaXMuYW5pbWF0aW9uICE9PSB0aGlzLl9uZXh0QW5pbWF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldEFuaW1hdGlvbih0aGlzLl9uZXh0QW5pbWF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgX2dldFBvc2l0aW9uRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHggOiB0aGlzLngsXG4gICAgICAgICAgICB5IDogdGhpcy55LFxuICAgICAgICAgICAgdGlsZSA6IHRoaXMuZ2V0VGlsZSgpLFxuICAgICAgICAgICAgZGlyIDogdGhpcy5kaXJcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ2FsbGVkIGZyb20gR2FtZSBtYWluIGxvb3AgYXQgZXZlcnkgcmV2b2x1dGlvbi5cbiAgICBtb3ZlKGRpcikge1xuICAgICAgICBpZiAoIWRpcikgZGlyID0gdGhpcy5kaXI7XG4gICAgICAgIGlmICghZGlyKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHRpbGUgPSB0aGlzLmdldFRpbGUoKSwgc3RlcCwgX3N0ZXAgPSB0aGlzLmdldFN0ZXAoKTtcbiAgICAgICAgLy8gQ291bGQgZ28gdGhhdCBkaXJlY3Rpb24uXG4gICAgICAgIGlmICgoZGlyICE9IHRoaXMuZGlyIHx8IHRoaXMuX3ByZXR1cm4pICYmIHRoaXMuY2FuR28oZGlyKSkge1xuXG4gICAgICAgICAgICBpZiAoKChkaXIgIT09IHRoaXMuZGlyICYmIGRpciAhPT0gdGhpcy5fZ2V0T3BEaXJlY3Rpb24oKSkgfHwgdGhpcy5fcHJldHVybikgJiYgIXRoaXMuX2lzQ2VudGVyZWQoKSkge1xuICAgICAgICAgICAgICAgIC8vIE5vdCBpbiB0aGUgY2VudGVyIG9mIHRoZSB0aWxlLiBCZWZvciB0dXJuLCBzZXQgc3RlcCBzbyBvbiBuZXh0IGZyYW1lIHdlIGdldCBpbnRvIHRoZSBjZW50ZXIuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzVihkaXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWZmWCA9IE1hdGguYWJzKHRoaXMueCAtIHRpbGUueCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZXR1cm4pIHsgLy8gU2V0IHByZXR1cm4gdG8gdHJ1ZSB0byB0dXJuIGZhc3RlciBvbiBjb3JuZXJzLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0NlbnRlcmVkKCd4JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy54ID4gdGlsZS54KSB0aGlzLnggLT0gdGhpcy5nZXRNaW4oZGlmZlgsIF9zdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHRoaXMueCArPSB0aGlzLmdldE1pbihkaWZmWCwgX3N0ZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZXR1cm4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHRoaXMuX3ByZXR1cm4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXAgPSB0aGlzLmdldE1pbihkaWZmWCwgX3N0ZXApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0goZGlyKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGlmZlkgPSBNYXRoLmFicyh0aGlzLnkgLSB0aWxlLnkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcmV0dXJuKSB7IC8vIFNldCBwcmV0dXJuIHRvIHRydWUgdG8gdHVybiBmYXN0ZXIgb24gY29ybmVycy5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNDZW50ZXJlZCgneScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueSA+IHRpbGUueSkgdGhpcy55IC09IHRoaXMuZ2V0TWluKGRpZmZZLCBfc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB0aGlzLnkgKz0gdGhpcy5nZXRNaW4oZGlmZlksIF9zdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcmV0dXJuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB0aGlzLl9wcmV0dXJuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwID0gdGhpcy5nZXRNaW4oZGlmZlksIF9zdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTm8gc3RlcC4gTWVhbnMgY2hhbmdlIGRpcmVjdGlvbi5cbiAgICAgICAgICAgIGlmICghc3RlcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlyID0gZGlyO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TmV4dEFuaW1hdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzdGVwKSB7XG4gICAgICAgICAgICAvLyBLZWVwIHN0cmFpZ2h0LlxuICAgICAgICAgICAgaWYgKHRoaXMuY2FuR28odGhpcy5kaXIpKSB7XG4gICAgICAgICAgICAgICAgc3RlcCA9IF9zdGVwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBXYWxsLlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc1YodGhpcy5kaXIpKSB7IHN0ZXAgPSB0aGlzLmdldE1pbihNYXRoLmFicyh0aGlzLnkgLSB0aWxlLnkpLCBfc3RlcCk7IH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNIKHRoaXMuZGlyKSkgeyBzdGVwID0gdGhpcy5nZXRNaW4oTWF0aC5hYnModGhpcy54IC0gdGlsZS54KSwgX3N0ZXApOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gTW92ZS5cbiAgICAgICAgaWYgKHN0ZXApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpciA9PT0gJ3UnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy55IC09IHN0ZXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5kaXIgPT09ICdyJykge1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSBzdGVwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZGlyID09PSAnZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gc3RlcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRpciA9PT0gJ2wnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy54IC09IHN0ZXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gUGFzcyBhd2F5IGxpbWl0cy5cbiAgICAgICAgaWYgKHRoaXMueCA8IDApIHRoaXMueCA9IHRoaXMubWFwLndpZHRoICogdGhpcy5tYXAudGlsZVdpZHRoO1xuICAgICAgICBpZiAodGhpcy54ID4gdGhpcy5tYXAud2lkdGggKiB0aGlzLm1hcC50aWxlV2lkdGgpIHRoaXMueCA9IDA7XG4gICAgICAgIGlmICh0aGlzLnkgPCAwKSB0aGlzLnkgPSB0aGlzLm1hcC5oZWlnaHQgKiB0aGlzLm1hcC50aWxlSGVpZ2h0O1xuICAgICAgICBpZiAodGhpcy55ID4gdGhpcy5tYXAuaGVpZ2h0ICogdGhpcy5tYXAudGlsZUhlaWdodCkgdGhpcy55ID0gMDtcblxuICAgICAgICB0aWxlID0gdGhpcy5nZXRUaWxlKCk7XG5cbiAgICAgICAgaWYgKHRpbGUgIT09IHRoaXMuX2xhc3RUaWxlKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0VGlsZSA9IHRpbGU7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2l0ZW06dGlsZScsIHRpbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBnZXRTdGVwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGVwICogKHRoaXMuX3NwZWVkIC8gMTAwKTtcbiAgICB9XG4gICAgLy8gU2V0IGFuaW1hdGlvbiBhY2NvcmRpbmcgbW9kZWwgY29uZGl0aW9ucy4gT3ZlcnJpZGUgb24gc3ViY2xhc3Nlcy5cbiAgICBzZXROZXh0QW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLl9uZXh0QW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zW2FuaW1hdGlvbkxhYmVsc0J5RGlyZWN0aW9uc1t0aGlzLmRpcl1dO1xuICAgIH1cbiAgICAvLyBIZWxwZXIgbWV0aG9kczpcbiAgICBfZ2V0T3BEaXJlY3Rpb24oZGlyKSB7XG4gICAgICAgIHJldHVybiBvcHBvc2l0ZURpcmVjdGlvbnNbZGlyIHx8IHRoaXMuZGlyXTtcbiAgICB9XG4gICAgLy8gVGlsZSBvbiBwYXNzZWQgZGlyZWN0aW9uIGlzIGF2YWlsYWJsZSBmb3Igd2Fsa2luZy5cbiAgICBjYW5HbyhkaXIpIHtcbiAgICAgICAgY29uc3QgdGlsZSA9IHRoaXMuZ2V0VGlsZSgpO1xuXG4gICAgICAgIGNvbnN0IG5leHRUaWxlID0gdGlsZS5nZXQoZGlyKTtcblxuICAgICAgICByZXR1cm4gbmV4dFRpbGUgJiYgIW5leHRUaWxlLmlzSG91c2UoKSAmJiAhbmV4dFRpbGUuaXNXYWxsKCk7XG4gICAgfVxuXG4gICAgX2lzVihkaXIpIHtcbiAgICAgICAgcmV0dXJuIGRpciA9PT0gJ3UnIHx8IGRpciA9PT0gJ2QnO1xuICAgIH1cblxuICAgIF9pc0goZGlyKSB7XG4gICAgICAgIHJldHVybiBkaXIgPT09ICdsJyB8fCBkaXIgPT09ICdyJztcbiAgICB9XG5cbiAgICBfaXNDZW50ZXJlZCh4eSkge1xuICAgICAgICB2YXIgdGlsZSA9IHRoaXMuZ2V0VGlsZSgpO1xuICAgICAgICB2YXIgeCA9IHRpbGUueCA9PT0gdGhpcy54LCB5ID0gdGlsZS55ID09PSB0aGlzLnk7XG5cbiAgICAgICAgaWYgKHh5ID09PSAneCcpIHJldHVybiB4O1xuICAgICAgICBpZiAoeHkgPT09ICd5JykgcmV0dXJuIHk7XG4gICAgICAgIGVsc2UgcmV0dXJuICB4ICYmIHk7XG4gICAgfVxuXG4gICAgZ2V0TWluKCkge1xuICAgICAgICB2YXIgbWluID0gbnVsbDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgICAgICAgaWYgKG1pbiA9PT0gbnVsbCB8fCBhcmd1bWVudHNbaV0gPCBtaW4pIG1pbiA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgICByZXR1cm4gbWluO1xuICAgIH1cblxufVxuXG5PYmplY3QuYXNzaWduKENoYXJhY3Rlci5wcm90b3R5cGUsIGRlZmF1bHRzKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2hhcmFjdGVyO1xuIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9lbmdpbmUvR2FtZSc7XG5pbXBvcnQgU291bmRNYW5hZ2VyIGZyb20gJy4vU291bmRNYW5hZ2VyJztcbmltcG9ydCBNYXAgZnJvbSAnLi9NYXAnO1xuaW1wb3J0IEdhbWVNb2RlbCBmcm9tICcuL0dhbWVNb2RlbCc7XG5pbXBvcnQgbWFrZUdob3N0IGZyb20gJy4vZmFjdG9yeS9tYWtlR2hvc3QnO1xuaW1wb3J0IG1ha2VEb3QgZnJvbSAnLi9mYWN0b3J5L21ha2VEb3QnO1xuaW1wb3J0IG1ha2VQaWxsIGZyb20gJy4vZmFjdG9yeS9tYWtlUGlsbCc7XG5pbXBvcnQgbWFrZUJvbnVzIGZyb20gJy4vZmFjdG9yeS9tYWtlQm9udXMnO1xuaW1wb3J0IFBhY21hbiBmcm9tICcuL1BhY21hbic7XG5pbXBvcnQgTGl2ZXMgZnJvbSAnLi9MaXZlcyc7XG5pbXBvcnQgQm9udXNlcyBmcm9tICcuL0JvbnVzZXMnO1xuXG5pbXBvcnQgeyBFVkVOVF9LRVlfRE9XTiwgS0VZX1VQLCBLRVlfUklHSFQsIEtFWV9ET1dOLCBLRVlfTEVGVCB9IGZyb20gJy4vZW5naW5lL0tleWJvYXJkJztcbmltcG9ydCB7IEVWRU5UX1NXSVBFLCBFVkVOVF9TV0lQRV9VUCwgRVZFTlRfU1dJUEVfUklHSFQsIEVWRU5UX1NXSVBFX0RPV04sIEVWRU5UX1NXSVBFX0xFRlQgfSBmcm9tICcuL2VuZ2luZS9Ub3VjaCc7XG5cbmNvbnN0IHNob3cgPSBlbCA9PiB7IGVsLnN0eWxlLmRpc3BsYXkgPSAnJzsgfVxuY29uc3QgaGlkZSA9IGVsID0+IHsgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgICAvLyBPcHRpb25zLlxuICAgIHdpZHRoIDogODk2IC8gMixcbiAgICBoZWlnaHQgOiAxMTUyIC8gMixcbiAgICBvcmlnaW5hbFdpZHRoIDogODk2LFxuICAgIG9yaWdpbmFsSGVpZ2h0IDogMTE1MixcblxuICAgIGRvdFNjb3JlIDogMTAsXG4gICAgcGlsbFNjb3JlIDogNTAsXG4gICAgZGVmYXVsdExpdmVzIDogMyxcbiAgICBzb3VuZEVuYWJsZWQgOiB0cnVlLFxuXG4gICAgZXZlbnRzIDoge1xuICAgICAgICAnY2xpY2sgLnN0YXJ0JyA6ICdzdGFydExldmVsJ1xuICAgIH1cbn07XG5cbmNsYXNzIEpzUGFjbWFuIGV4dGVuZHMgR2FtZSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGRlZmF1bHRzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5IGluIG9wdGlvbnMpIHRoaXNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tb2RlbCA9IG5ldyBHYW1lTW9kZWwoe1xuICAgICAgICAgICAgbGl2ZXMgOiB0aGlzLmRlZmF1bHRMaXZlc1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1vZGVsLmZldGNoKCk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRzID0ge1xuICAgICAgICAgICAgc3BsYXNoIDogdGhpcy4kKCcuc3BsYXNoJyksXG4gICAgICAgICAgICBzdGFydCA6IHRoaXMuJCgnLnN0YXJ0JyksXG4gICAgICAgICAgICBzdGFydFAxIDogdGhpcy4kKCcuc3RhcnQtcDEnKSxcbiAgICAgICAgICAgIHN0YXJ0UmVhZHkgOiB0aGlzLiQoJy5zdGFydC1yZWFkeScpLFxuICAgICAgICAgICAgaGlnaFNjb3JlIDogdGhpcy4kKCcuaGlnaC1zY29yZSBzcGFuJyksXG4gICAgICAgICAgICBzY29yZSA6IHRoaXMuJCgnLnAxLXNjb3JlIHNwYW4nKSxcbiAgICAgICAgICAgIGdhbWVPdmVyIDogdGhpcy4kKCcuZ2FtZS1vdmVyJyksXG4gICAgICAgICAgICBzb3VuZFN0YXR1cyA6IHRoaXMuJCgnLnNvdW5kLXN0YXR1cycpLFxuICAgICAgICAgICAgcGF1c2VkIDogdGhpcy4kKCcucGF1c2VkJyksXG4gICAgICAgICAgICBsb2FkIDogdGhpcy4kKCcubG9hZGJhcicpXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5rZXlib2FyZC5vbihFVkVOVF9LRVlfRE9XTiwgdGhpcy5fb25LZXlEb3duLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMudG91Y2gub24oRVZFTlRfU1dJUEUsIHRoaXMuX29uU3dpcGUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5zb3VuZCA9IG5ldyBTb3VuZE1hbmFnZXIoe1xuICAgICAgICAgICAgc291bmRFbmFibGVkIDogdGhpcy5zb3VuZEVuYWJsZWQsXG4gICAgICAgICAgICBhZGRTb3VuZCA6IHRoaXMuYWRkU291bmQuYmluZCh0aGlzKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxpdmVzID0gbmV3IExpdmVzKHtcbiAgICAgICAgICAgIGxpdmVzIDogdGhpcy5kZWZhdWx0TGl2ZXMgKyAxLFxuICAgICAgICAgICAgeCA6IDQwLFxuICAgICAgICAgICAgeSA6IDExMjQsXG4gICAgICAgICAgICBtb2RlbCA6IHRoaXMubW9kZWwsXG4gICAgICAgICAgICBmYWN0b3IgOiB0aGlzLnNjYWxpbmcuZ2V0RmFjdG9yKCksXG4gICAgICAgICAgICBhZGRTcHJpdGUgOiB0aGlzLmFkZFNwcml0ZS5iaW5kKHRoaXMpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYm9udXNlcyA9IG5ldyBCb251c2VzKHtcbiAgICAgICAgICAgIGxldmVsIDogdGhpcy5tb2RlbC5sZXZlbCxcbiAgICAgICAgICAgIHggOiA4NjAsXG4gICAgICAgICAgICB5IDogMTEyNCxcbiAgICAgICAgICAgIG1vZGVsIDogdGhpcy5tb2RlbCxcbiAgICAgICAgICAgIGZhY3RvciA6IHRoaXMuc2NhbGluZy5nZXRGYWN0b3IoKSxcbiAgICAgICAgICAgIGFkZFNwcml0ZSA6IHRoaXMuYWRkU3ByaXRlLmJpbmQodGhpcylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fb25HaG9zdEVhdGVuID0gdGhpcy5fb25HaG9zdEVhdGVuLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX29uR2hvc3RFYXQgPSB0aGlzLl9vbkdob3N0RWF0LmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5tb2RlbC5vbignY2hhbmdlOnNjb3JlJywgdGhpcy5fb25DaGFuZ2VTY29yZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5tb2RlbC5vbignY2hhbmdlOmhpZ2hTY29yZScsIHRoaXMuX29uQ2hhbmdlSGlnaFNjb3JlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLm1vZGVsLm9uKCdjaGFuZ2U6bGl2ZXMnLCB0aGlzLl9vbkNoYW5nZUxpdmVzLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLm1vZGVsLm9uKCdjaGFuZ2U6ZXh0cmFMaXZlcycsIHRoaXMuX29uQ2hhbmdlRXh0cmFMaXZlcy5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5tb2RlbC5vbignY2hhbmdlOm1vZGUnLCB0aGlzLl9vbkNoYW5nZU1vZGUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5tYWtlTGV2ZWwoKTtcblxuICAgICAgICB0aGlzLnN0YXJ0KCgpID0+IHtcbiAgICAgICAgICAgIGhpZGUodGhpcy5lbGVtZW50cy5sb2FkKTtcbiAgICAgICAgICAgIHNob3codGhpcy5lbGVtZW50cy5zdGFydCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXJ0TGV2ZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLl93aW4pIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwubGV2ZWwrKztcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuX3dpbiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2dhbWVPdmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmxldmVsID0gMTtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuX2dhbWVPdmVyID0gZmFsc2U7XG4gICAgICAgICAgICBoaWRlKHRoaXMuZWxlbWVudHMuc3BsYXNoKTtcbiAgICAgICAgICAgIHRoaXMuc291bmQucGxheSgnaW50cm8nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGhpZGUodGhpcy5lbGVtZW50cy5zcGxhc2gpO1xuICAgICAgICB0aGlzLnNvdW5kLnBsYXkoJ2ludHJvJyk7XG4gICAgICAgIHRoaXMuYWRkQ2FsbGJhY2sodGhpcy5tYWluTG9vcC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5tb2RlbC5tb2RlID0gbnVsbDtcblxuICAgICAgICB0aGlzLnBpbmt5LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5ibGlua3kuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmlua3kuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnN1ZS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMucGFjbWFuLmRlc3Ryb3koKTtcblxuICAgICAgICB0aGlzLm1hcC5kZXN0cm95SXRlbXMoKTtcblxuICAgICAgICB0aGlzLm9mZignZ2FtZTpnaG9zdDplYXRlbicsIHRoaXMuX29uR2hvc3RFYXRlbik7XG4gICAgICAgIHRoaXMub2ZmKCdnYW1lOmdob3N0OmVhdCcsIHRoaXMuX29uR2hvc3RFYXQpO1xuXG4gICAgICAgIGlmICghdGhpcy5fd2luKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmxpdmVzID0gdGhpcy5kZWZhdWx0TGl2ZXMgKyAxO1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5zY29yZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmtleWJvYXJkLmNsZWFyKCk7XG5cbiAgICAgICAgdGhpcy5faW5wdXREaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLl9sYXN0U3dpcGUgPSBudWxsO1xuXG4gICAgICAgIHRoaXMubWFrZUxldmVsKCk7XG4gICAgfVxuXG4gICAgbWFrZUxldmVsKCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMubW9kZWwuZ2V0U2V0dGluZ3MoJ2dhbWUnKSk7XG5cbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgTWFwKHRoaXMubWFwKTtcblxuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ21hemUtMScpO1xuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ21hemUtMicpO1xuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ21hemUtMycpO1xuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ21hemUtNCcpO1xuXG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCh0aGlzLm1hemUpO1xuXG4gICAgICAgIHZhciBkb3RBbmltYXRpb25MYWJlbCA9ICd3aGl0ZSc7XG4gICAgICAgIGlmICh0aGlzLm1hemUgPT09ICdtYXplLTInKSBkb3RBbmltYXRpb25MYWJlbCA9ICd5ZWxsb3cnO1xuICAgICAgICBpZiAodGhpcy5tYXplID09PSAnbWF6ZS0zJykgZG90QW5pbWF0aW9uTGFiZWwgPSAncmVkJztcblxuICAgICAgICB0aGlzLl9wYXVzZUZyYW1lcyA9IDgwO1xuXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lCb251cyA9IDA7XG4gICAgICAgIHRoaXMuX3Nob3dCb251cyA9IDUwMDtcblxuICAgICAgICB2YXIgaSA9IHRoaXMubWFwLnRpbGVzLmxlbmd0aCwgdG90YWwgPSAwO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICB2YXIgdGlsZSA9IHRoaXMubWFwLnRpbGVzW2ldO1xuICAgICAgICAgICAgaWYgKHRpbGUuY29kZSA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRvdCA9IG1ha2VEb3Qoe1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QW5pbWF0aW9uIDogZG90QW5pbWF0aW9uTGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIG1hcCA6IHRoaXMubWFwLFxuICAgICAgICAgICAgICAgICAgICBmYWN0b3IgOiB0aGlzLnNjYWxpbmcuZ2V0RmFjdG9yKCksXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZVJlZnJhc2hSYXRlIDogdGhpcy5ub3JtYWxpemVSZWZyYXNoUmF0ZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICB4IDogdGlsZS54LFxuICAgICAgICAgICAgICAgICAgICB5IDogdGlsZS55XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGlsZS5pdGVtID0gZG90O1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkU3ByaXRlKGRvdCk7XG4gICAgICAgICAgICAgICAgdG90YWwrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRpbGUuY29kZSA9PT0gJyonKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBpbGwgPSBtYWtlUGlsbCh7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBbmltYXRpb24gOiBkb3RBbmltYXRpb25MYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgbWFwIDogdGhpcy5tYXAsXG4gICAgICAgICAgICAgICAgICAgIGZhY3RvciA6IHRoaXMuc2NhbGluZy5nZXRGYWN0b3IoKSxcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplUmVmcmFzaFJhdGUgOiB0aGlzLm5vcm1hbGl6ZVJlZnJhc2hSYXRlLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIHggOiB0aWxlLngsXG4gICAgICAgICAgICAgICAgICAgIHkgOiB0aWxlLnlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aWxlLml0ZW0gPSBwaWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkU3ByaXRlKHBpbGwpO1xuICAgICAgICAgICAgICAgIHRvdGFsKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRvdGFsSXRlbXMgPSB0b3RhbDtcblxuICAgICAgICAvLyBQYWNtYW4uXG4gICAgICAgIHRoaXMucGFjbWFuID0gbmV3IFBhY21hbih7XG4gICAgICAgICAgICBwcmV0dXJuIDogdHJ1ZSxcbiAgICAgICAgICAgIHggOiA0NTIsXG4gICAgICAgICAgICB5IDogODQ4LFxuICAgICAgICAgICAgLi4udGhpcy5tb2RlbC5nZXRTZXR0aW5ncygncGFjbWFuJyksXG4gICAgICAgICAgICBtYXAgOiB0aGlzLm1hcCxcbiAgICAgICAgICAgIGZhY3RvciA6IHRoaXMuc2NhbGluZy5nZXRGYWN0b3IoKSxcbiAgICAgICAgICAgIG5vcm1hbGl6ZVJlZnJhc2hSYXRlIDogdGhpcy5ub3JtYWxpemVSZWZyYXNoUmF0ZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgYWRkR2FtZUdob3N0RWF0RXZlbnRMaXN0ZW5lciA6IGxpc3RlbmVyID0+IHRoaXMub24oJ2dhbWU6Z2hvc3Q6ZWF0JywgbGlzdGVuZXIpLFxuICAgICAgICAgICAgYWRkR2FtZUdob3N0TW9kZUZyaWdodGVuZWRFbnRlciA6IGxpc3RlbmVyID0+IHRoaXMub24oJ2dhbWU6Z2hvc3Q6bW9kZWZyaWdodGVuZWQ6ZW50ZXInLCBsaXN0ZW5lciksXG4gICAgICAgICAgICBhZGRHYW1lR2hvc3RNb2RlRnJpZ2h0ZW5lZEV4aXQgOiBsaXN0ZW5lciA9PiB0aGlzLm9uKCdnYW1lOmdob3N0Om1vZGVmcmlnaHRlbmVkOmV4aXQnLCBsaXN0ZW5lcilcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wYWNtYW4ub24oJ2l0ZW06ZWF0cGlsbCcsIHQgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcGF1c2VGcmFtZXMgPSAyO1xuXG4gICAgICAgICAgICB0aGlzLm1vZGVsLmFkZFNjb3JlKHRoaXMucGlsbFNjb3JlKTtcblxuICAgICAgICAgICAgdGhpcy50b3RhbEl0ZW1zLS07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnRvdGFsSXRlbXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLndpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB0aGlzLnNvdW5kLnBsYXkoJ2ZyaWdodGVuZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFBhY21hbiBlYXRzIGdob3N0LlxuICAgICAgICB0aGlzLm9uKCdnYW1lOmdob3N0OmVhdGVuJywgdGhpcy5fb25HaG9zdEVhdGVuKTtcbiAgICAgICAgLy8gR2hvc3QgZWF0cyBQYWNtYW4uXG4gICAgICAgIHRoaXMub24oJ2dhbWU6Z2hvc3Q6ZWF0JywgdGhpcy5fb25HaG9zdEVhdCk7XG4gICAgICAgIC8vIFBhY21hbiBtYWtlIGRpZSB0dXJuIGFycm91bmQuXG4gICAgICAgIHRoaXMucGFjbWFuLm9uKCdpdGVtOmRpZScsIChnaG9zdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zb3VuZC5wbGF5KCdlYXRlbicpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gUGFjbWFuIGxvc2UuXG4gICAgICAgIHRoaXMucGFjbWFuLm9uKCdpdGVtOmxpZmUnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmtleWJvYXJkLmNsZWFyKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2lucHV0RGlyZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RTd2lwZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLm1vZGUgPSBudWxsO1xuXG4gICAgICAgICAgICB0aGlzLnBhY21hbi5yZXNldCgpO1xuXG4gICAgICAgICAgICB0aGlzLnBpbmt5LnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLmJsaW5reS5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5pbmt5LnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLnN1ZS5yZXNldCgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5ib251cykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lCb251cyA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd0JvbnVzID0gMjUwO1xuICAgICAgICAgICAgICAgIHRoaXMuYm9udXMucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJvbnVzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zaG93R2hvc3RzKCk7XG5cbiAgICAgICAgICAgIHRoaXMubW9kZWwubGl2ZXMtLTtcblxuICAgICAgICAgICAgdGhpcy5fcGFjbWFuRWF0ZW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwubGl2ZXMpIHtcbiAgICAgICAgICAgICAgICBzaG93KHRoaXMuZWxlbWVudHMuc3RhcnRSZWFkeSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhcnQgPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhdXNlRnJhbWVzID0gNDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhdXNlRnJhbWVzID0gMTIwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gUGFjbWFuIGVhdHMgZG90LlxuICAgICAgICB0aGlzLnBhY21hbi5vbignaXRlbTplYXRkb3QnLCAodCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5hZGRTY29yZSh0aGlzLmRvdFNjb3JlKTtcblxuICAgICAgICAgICAgdGhpcy5zb3VuZC5wbGF5KCdkb3QnKTtcblxuICAgICAgICAgICAgdGhpcy50b3RhbEl0ZW1zLS07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnRvdGFsSXRlbXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLndpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZFNwcml0ZSh0aGlzLnBhY21hbik7XG5cbiAgICAgICAgLy8gQm9udXMuXG4gICAgICAgIGlmICh0aGlzLmJvbnVzKSB7XG4gICAgICAgICAgICB0aGlzLmJvbnVzLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBib251c1RpbGUgPSB0aGlzLm1hcC50dW5uZWxzW3RoaXMubWFwLnR1bm5lbHMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgdGhpcy5ib251cyA9IG1ha2VCb251cyh0aGlzLmJvbnVzSW5kZXgsIHtcbiAgICAgICAgICAgIG1hcCA6IHRoaXMubWFwLFxuICAgICAgICAgICAgZGlyIDogJ2wnLFxuICAgICAgICAgICAgc2NvcmUgOiB0aGlzLmJvbnVzU2NvcmUsXG4gICAgICAgICAgICB4IDogYm9udXNUaWxlLngsXG4gICAgICAgICAgICB5IDogYm9udXNUaWxlLnksXG4gICAgICAgICAgICBmYWN0b3IgOiB0aGlzLnNjYWxpbmcuZ2V0RmFjdG9yKCksXG4gICAgICAgICAgICBub3JtYWxpemVSZWZyYXNoUmF0ZSA6IHRoaXMubm9ybWFsaXplUmVmcmFzaFJhdGUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGFkZFBhY21hblBvc2l0aW9uRXZlbnRMaXN0ZW5lciA6IGxpc3RlbmVyID0+IHRoaXMucGFjbWFuLm9uKCdpdGVtOnBvc2l0aW9uJywgbGlzdGVuZXIpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEJvbnVzIHJlYWNoZXMgdGFyZ2V0IGFuZCBkaXNhcHBlYXJzLlxuICAgICAgICB0aGlzLmJvbnVzLm9uKCdpdGVtOmRlc3Ryb3knLCAoYm9udXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYm9udXMuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5ib251cyA9IG51bGw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFBhY21hbiBlYXRzIGJvbnVzLlxuICAgICAgICB0aGlzLmJvbnVzLm9uKCdpdGVtOmVhdGVuJywgKGJvbnVzKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2hvd0JvbnVzKSByZXR1cm47IC8vIE5vdCB5ZXQgaW4gdGhlIG1hemVcbiAgICAgICAgICAgIHRoaXMuX3BhdXNlRnJhbWVzID0gNTtcbiAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lCb251cyA9IDI1O1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5hZGRTY29yZShwYXJzZUludChib251cy5zY29yZSkpO1xuICAgICAgICAgICAgdGhpcy5zb3VuZC5wbGF5KCdib251cycpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZFNwcml0ZSh0aGlzLmJvbnVzKTtcblxuICAgICAgICAvLyBHaG9zdHMuXG4gICAgICAgIGNvbnN0IGdob3N0QXR0cnMgPSB7XG4gICAgICAgICAgICAuLi50aGlzLm1vZGVsLmdldFNldHRpbmdzKCdnaG9zdCcpLFxuICAgICAgICAgICAgbWFwIDogdGhpcy5tYXAsXG4gICAgICAgICAgICBub3JtYWxpemVSZWZyYXNoUmF0ZSA6IHRoaXMubm9ybWFsaXplUmVmcmFzaFJhdGUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGZhY3RvciA6IHRoaXMuc2NhbGluZy5nZXRGYWN0b3IoKSxcbiAgICAgICAgICAgIGFkZEdhbWVHbG9iYWxNb2RlRXZlbnRMaXN0ZW5lciA6IGxpc3RlbmVyID0+IHRoaXMub24oJ2dhbWU6Z2xvYmFsbW9kZScsIGxpc3RlbmVyKSxcbiAgICAgICAgICAgIGFkZEdhbWVHaG9zdEVhdGVuRXZlbnRMaXN0ZW5lciA6IGxpc3RlbmVyID0+IHRoaXMub24oJ2dhbWU6Z2hvc3Q6ZWF0ZW4nLCBsaXN0ZW5lciksXG4gICAgICAgICAgICBhZGRQYWNtYW5Qb3NpdGlvbkV2ZW50TGlzdGVuZXIgOiBsaXN0ZW5lciA9PiB0aGlzLnBhY21hbi5vbignaXRlbTpwb3NpdGlvbicsIGxpc3RlbmVyKSxcbiAgICAgICAgICAgIGFkZFBhY21hbkVhdFBpbGxFdmVudExpc3RlbmVyIDogbGlzdGVuZXIgPT4gdGhpcy5wYWNtYW4ub24oJ2l0ZW06ZWF0cGlsbCcsIGxpc3RlbmVyKVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHBpbmt5VGlsZSA9IHRoaXMubWFwLmhvdXNlQ2VudGVyLmdldFIoKTtcblxuICAgICAgICB0aGlzLnBpbmt5ID0gbWFrZUdob3N0KCdwaW5reScsIHtcbiAgICAgICAgICAgIC4uLmdob3N0QXR0cnMsXG4gICAgICAgICAgICB4IDogcGlua3lUaWxlLnggLSB0aGlzLm1hcC50aWxlV2lkdGggLyAyLFxuICAgICAgICAgICAgeSA6IHBpbmt5VGlsZS55XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnNUb0dob3N0KHRoaXMucGlua3kpO1xuXG4gICAgICAgIHRoaXMuYWRkU3ByaXRlKHRoaXMucGlua3kpO1xuXG4gICAgICAgIGNvbnN0IGJsaW5reVRpbGUgPSB0aGlzLm1hcC5ob3VzZS5nZXRVKCkuZ2V0UigpO1xuICAgICAgICB0aGlzLmJsaW5reSA9IG1ha2VHaG9zdCgnYmxpbmt5Jywge1xuICAgICAgICAgICAgLi4uZ2hvc3RBdHRycyxcbiAgICAgICAgICAgIHggOiBibGlua3lUaWxlLnggLSB0aGlzLm1hcC50aWxlV2lkdGggLyAyLFxuICAgICAgICAgICAgeSA6IGJsaW5reVRpbGUueVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzVG9HaG9zdCh0aGlzLmJsaW5reSk7XG5cbiAgICAgICAgdGhpcy5hZGRTcHJpdGUodGhpcy5ibGlua3kpO1xuXG4gICAgICAgIGNvbnN0IGlua3lUaWxlID0gdGhpcy5tYXAuaG91c2VDZW50ZXIuZ2V0TCgpO1xuICAgICAgICB0aGlzLmlua3kgPSBtYWtlR2hvc3QoJ2lua3knLCB7XG4gICAgICAgICAgICAuLi5naG9zdEF0dHJzLFxuICAgICAgICAgICAgYmxpbmt5IDogdGhpcy5ibGlua3ksXG4gICAgICAgICAgICB4IDogaW5reVRpbGUueCAtIDE2LFxuICAgICAgICAgICAgeSA6IGlua3lUaWxlLnlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyc1RvR2hvc3QodGhpcy5pbmt5KTtcblxuICAgICAgICB0aGlzLmFkZFNwcml0ZSh0aGlzLmlua3kpO1xuXG4gICAgICAgIGNvbnN0IHN1ZVRpbGUgPSB0aGlzLm1hcC5ob3VzZUNlbnRlci5nZXRSKCkuZ2V0UigpO1xuICAgICAgICB0aGlzLnN1ZSA9IG1ha2VHaG9zdCgnc3VlJywge1xuICAgICAgICAgICAgLi4uZ2hvc3RBdHRycyxcbiAgICAgICAgICAgIHggOiBzdWVUaWxlLnggKyAxNixcbiAgICAgICAgICAgIHkgOiBzdWVUaWxlLnlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyc1RvR2hvc3QodGhpcy5zdWUpO1xuXG4gICAgICAgIHRoaXMuYWRkU3ByaXRlKHRoaXMuc3VlKTtcblxuICAgICAgICBzaG93KHRoaXMuZWxlbWVudHMuc3RhcnRSZWFkeSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl93aW4pIHtcbiAgICAgICAgICAgIHNob3codGhpcy5lbGVtZW50cy5zdGFydFAxKTtcblxuICAgICAgICAgICAgdGhpcy5oaWRlR2hvc3RzKCk7XG5cbiAgICAgICAgICAgIHRoaXMucGFjbWFuLmhpZGUoKTtcblxuICAgICAgICAgICAgdGhpcy5fc3RhcnQgPSAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ib251cy5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLl9zdGFydCA9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRFdmVudExpc3RlbmVyc1RvR2hvc3QoZ2hvc3QpIHtcbiAgICAgICAgZ2hvc3Qub24oJ2l0ZW06ZWF0JywgKCkgPT4gdGhpcy5lbWl0KCdnYW1lOmdob3N0OmVhdCcsIGdob3N0KSk7XG4gICAgICAgIGdob3N0Lm9uKCdpdGVtOmVhdGVuJywgKCkgPT4gdGhpcy5lbWl0KCdnYW1lOmdob3N0OmVhdGVuJywgZ2hvc3QpKTtcbiAgICAgICAgZ2hvc3Qub24oJ2l0ZW06bW9kZWZyaWdodGVuZWQ6ZW50ZXInLCAoKSA9PiB0aGlzLmVtaXQoJ2dhbWU6Z2hvc3Q6bW9kZWZyaWdodGVuZWQ6ZW50ZXInKSk7XG4gICAgICAgIGdob3N0Lm9uKCdpdGVtOm1vZGVmcmlnaHRlbmVkOmV4aXQnLCAoKSA9PiB0aGlzLmVtaXQoJ2dhbWU6Z2hvc3Q6bW9kZWZyaWdodGVuZWQ6ZXhpdCcpKTtcbiAgICB9XG5cbiAgICBtYWluTG9vcCgpIHtcbiAgICAgICAgLy8gR2xvYmFsIG1vZGUuXG4gICAgICAgIHRoaXMubW9kZWwudXBkYXRlTW9kZSgpO1xuXG4gICAgICAgIC8vIElucHV0XG4gICAgICAgIHRoaXMuX2lucHV0RGlyZWN0aW9uID0gdGhpcy5fZ2V0SW5wdXREaXJlY3Rpb24oKTtcblxuICAgICAgICAvLyBNb3ZlLlxuICAgICAgICBpZiAoIXRoaXMuX3BhdXNlRnJhbWVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc3RhcnQgPT09IDIpIHtcbiAgICAgICAgICAgICAgICBoaWRlKHRoaXMuZWxlbWVudHMuc3RhcnRQMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93R2hvc3RzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWNtYW4uc2hvdygpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5saXZlcyA9IHRoaXMuZGVmYXVsdExpdmVzO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fcGF1c2VGcmFtZXMgPSA2MDtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydC0tO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXJ0ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgaGlkZSh0aGlzLmVsZW1lbnRzLnN0YXJ0UmVhZHkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0LS07XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fd2luKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydExldmVsKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fZ2FtZU92ZXIpIHtcbiAgICAgICAgICAgICAgICBoaWRlKHRoaXMuZWxlbWVudHMuZ2FtZU92ZXIpO1xuICAgICAgICAgICAgICAgIHNob3codGhpcy5lbGVtZW50cy5zcGxhc2gpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX3Nob3dQYWNtYW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhY21hbi5zaG93KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd1BhY21hbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnBhY21hbi5tb3ZlKHRoaXMuX2lucHV0RGlyZWN0aW9uKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3BhY21hbkVhdGVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlR2hvc3RzKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fc291bmRCYWNrUGF1c2VGcmFtZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzR2hvc3REZWFkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmQucGxheSgnZGVhZCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLl9pc0dob3N0RnJpZ2h0ZW5lZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kLnBsYXkoJ2JhY2snKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZEJhY2tQYXVzZUZyYW1lcyA9IDU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHRoaXMuX3NvdW5kQmFja1BhdXNlRnJhbWVzLS07XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBpbmt5Lm1vdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJsaW5reS5tb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmt5Lm1vdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1ZS5tb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGVzdHJveUJvbnVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kZXN0cm95Qm9udXMgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm9udXMuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuYm9udXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveUJvbnVzLS07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJvbnVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zaG93Qm9udXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zaG93Qm9udXMgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvbnVzLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dCb251cy0tO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib251cy5tb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BhdXNlRnJhbWVzLS07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgc3VwZXIucGF1c2UoKTtcblxuICAgICAgICB0aGlzLnBpbmt5LnBhdXNlKCk7XG4gICAgICAgIHRoaXMuYmxpbmt5LnBhdXNlKCk7XG4gICAgICAgIHRoaXMuaW5reS5wYXVzZSgpO1xuICAgICAgICB0aGlzLnN1ZS5wYXVzZSgpO1xuXG4gICAgICAgIHRoaXMubXV0ZVNvdW5kKHRydWUpO1xuXG4gICAgICAgIHRoaXMubW9kZWwucGF1c2UoKTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRzLnBhdXNlZC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgfVxuXG4gICAgcmVzdW1lKCkge1xuICAgICAgICBzdXBlci5yZXN1bWUoKTtcblxuICAgICAgICB0aGlzLnBpbmt5LnJlc3VtZSgpO1xuICAgICAgICB0aGlzLmJsaW5reS5yZXN1bWUoKTtcbiAgICAgICAgdGhpcy5pbmt5LnJlc3VtZSgpO1xuICAgICAgICB0aGlzLnN1ZS5yZXN1bWUoKTtcblxuICAgICAgICB0aGlzLm11dGVTb3VuZCghIXRoaXMuX211dGVkKTtcblxuICAgICAgICB0aGlzLm1vZGVsLnJlc3VtZSgpO1xuXG4gICAgICAgIGhpZGUodGhpcy5lbGVtZW50cy5wYXVzZWQpO1xuICAgIH1cblxuICAgIHdpbigpIHtcbiAgICAgICAgdGhpcy5fcGF1c2VGcmFtZXMgPSAxMjA7XG4gICAgICAgIHRoaXMuX3dpbiA9IHRydWU7XG5cbiAgICAgICAgbGV0IHRpbWVzID0gMTQ7XG4gICAgICAgIHRoaXMuYWRkQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRpbWVzKSB7XG4gICAgICAgICAgICAgICAgdGltZXMtLTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC50b2dnbGUoJ2JsaW5rJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBLZWVwIHJ1bm5pbmcuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgnYmxpbmsnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gUmVtb3ZlIGNhbGxiYWNrLlxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLnJlZnJlc2hSYXRlICogOCk7XG5cbiAgICAgICAgdGhpcy5oaWRlR2hvc3RzKCk7XG4gICAgICAgIHRoaXMubWFwLmhpZGVJdGVtcygpO1xuICAgICAgICB0aGlzLnBhY21hbi5wYXVzZUFuaW1hdGlvbigpO1xuICAgIH1cblxuICAgIGhpZGVHaG9zdHMoKSB7XG4gICAgICAgIHRoaXMucGlua3kuaGlkZSgpO1xuICAgICAgICB0aGlzLmJsaW5reS5oaWRlKCk7XG4gICAgICAgIHRoaXMuaW5reS5oaWRlKCk7XG4gICAgICAgIHRoaXMuc3VlLmhpZGUoKTtcblxuICAgICAgICBpZiAodGhpcy5ib251cykgdGhpcy5ib251cy5oaWRlKCk7XG4gICAgfVxuXG4gICAgc2hvd0dob3N0cygpIHtcbiAgICAgICAgdGhpcy5waW5reS5zaG93KCk7XG4gICAgICAgIHRoaXMuYmxpbmt5LnNob3coKTtcbiAgICAgICAgdGhpcy5pbmt5LnNob3coKTtcbiAgICAgICAgdGhpcy5zdWUuc2hvdygpO1xuXG4gICAgICAgIGlmICh0aGlzLmJvbnVzICYmICF0aGlzLl9zaG93Qm9udXMpIHRoaXMuYm9udXMuc2hvdygpO1xuICAgIH1cblxuICAgIF9pc0dob3N0RnJpZ2h0ZW5lZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmxpbmt5LmlzRnJpZ2h0ZW5lZCgpIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5pbmt5LmlzRnJpZ2h0ZW5lZCgpICB8fFxuICAgICAgICAgICAgICAgIHRoaXMucGlua3kuaXNGcmlnaHRlbmVkKCkgfHxcbiAgICAgICAgICAgICAgICB0aGlzLnN1ZS5pc0ZyaWdodGVuZWQoKTtcbiAgICB9XG5cbiAgICBfaXNHaG9zdERlYWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJsaW5reS5pc0RlYWQoKSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuaW5reS5pc0RlYWQoKSAgfHxcbiAgICAgICAgICAgICAgICB0aGlzLnBpbmt5LmlzRGVhZCgpIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5zdWUuaXNEZWFkKCk7XG4gICAgfVxuXG4gICAgX2dldElucHV0RGlyZWN0aW9uKCkge1xuICAgICAgICBjb25zdCBrZXlzID0gdGhpcy5rZXlib2FyZC5rZXlzO1xuICAgICAgICBsZXQgZGlyZWN0aW9uID0gbnVsbDtcblxuICAgICAgICBpZiAoa2V5c1tLRVlfVVBdKSB7XG4gICAgICAgICAgICBkaXJlY3Rpb24gPSAndSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5c1tLRVlfUklHSFRdKSB7XG4gICAgICAgICAgICBkaXJlY3Rpb24gPSAncic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5c1tLRVlfRE9XTl0pIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9ICdkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXlzW0tFWV9MRUZUXSkge1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gJ2wnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFN3aXBlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9sYXN0U3dpcGUgPT09IEVWRU5UX1NXSVBFX1VQKSB7XG4gICAgICAgICAgICBkaXJlY3Rpb24gPSAndSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5fbGFzdFN3aXBlID09PSBFVkVOVF9TV0lQRV9SSUdIVCkge1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gJ3InO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2xhc3RTd2lwZSA9PT0gRVZFTlRfU1dJUEVfRE9XTikge1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gJ2QnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2xhc3RTd2lwZSA9PT0gRVZFTlRfU1dJUEVfTEVGVCkge1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gJ2wnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBvbkxvYWRQcm9ncmVzcyhwZXJjZW50KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudHMubG9hZC5xdWVyeVNlbGVjdG9yKCcuaW5uZXInKS5zdHlsZS53aWR0aCA9IGAke3BlcmNlbnR9JWA7XG4gICAgfVxuXG4gICAgX29uU3dpcGUodHlwZSwgZXYpIHtcbiAgICAgICAgdGhpcy5fbGFzdFN3aXBlID0gdHlwZTtcbiAgICB9XG5cbiAgICBfb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIC8vIFNvdW5kIG9uL29mZi5cbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDgzKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc291bmRFbmFibGVkKSByZXR1cm47XG4gICAgICAgICAgICAvLyBNdXRlIFNvdW5kLlxuICAgICAgICAgICAgdGhpcy5fbXV0ZWQgPSAhdGhpcy5fbXV0ZWQ7XG4gICAgICAgICAgICB0aGlzLm11dGVTb3VuZCh0aGlzLl9tdXRlZCk7XG5cbiAgICAgICAgICAgIHZhciBlbCA9IHRoaXMuZWxlbWVudHMuc291bmRTdGF0dXM7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tdXRlZCkgZWwuY2xhc3NMaXN0LnJlbW92ZSgnb24nKTtcbiAgICAgICAgICAgIGVsc2UgZWwuY2xhc3NMaXN0LmFkZCgnb24nKTtcblxuICAgICAgICAgICAgc2hvdyhlbCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9oaWRlU291bmRTdGF0dXNUaW1lb3V0KSBjbGVhclRpbWVvdXQodGhpcy5faGlkZVNvdW5kU3RhdHVzVGltZW91dCk7XG4gICAgICAgICAgICB0aGlzLl9oaWRlU291bmRTdGF0dXNUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHsgaGlkZShlbCk7IH0sIDIwMDApO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBhdXNlIEdhbWUuXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDgwKSB7XG4gICAgICAgICAgICB0aGlzLl9wYXVzZWQgPSAhdGhpcy5fcGF1c2VkO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3BhdXNlZCkgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgZWxzZSB0aGlzLnJlc3VtZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX29uQ2hhbmdlU2NvcmUobW9kZWwsIHNjb3JlKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudHMuc2NvcmUuaW5uZXJUZXh0ID0gc2NvcmUgfHwgJzAwJztcbiAgICB9XG5cbiAgICBfb25DaGFuZ2VIaWdoU2NvcmUobW9kZWwsIGhpZ2hTY29yZSkge1xuICAgICAgICB0aGlzLmVsZW1lbnRzLmhpZ2hTY29yZS5pbm5lclRleHQgPSBoaWdoU2NvcmUgfHwgJzAwJztcbiAgICB9XG4gICAgLy8gQ2FuZ2UgbGl2ZXMuIENoZWNrIGdhbWUgb3Zlci5cbiAgICBfb25DaGFuZ2VMaXZlcyhtb2RlbCwgbGl2ZXMpIHtcbiAgICAgICAgaWYgKGxpdmVzID09PSAwKSB7XG4gICAgICAgICAgICAvLyBHYW1lIG92ZXIuXG4gICAgICAgICAgICB0aGlzLl9nYW1lT3ZlciA9IHRydWU7XG4gICAgICAgICAgICBzaG93KHRoaXMuZWxlbWVudHMuZ2FtZU92ZXIpO1xuICAgICAgICAgICAgdGhpcy5oaWRlR2hvc3RzKCk7XG4gICAgICAgICAgICB0aGlzLnBhY21hbi5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNhdmUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBFeHRyYSBsaWZlLlxuICAgIF9vbkNoYW5nZUV4dHJhTGl2ZXMobW9kZWwsIGxpdmVzKSB7XG4gICAgICAgIHRoaXMuc291bmQucGxheSgnbGlmZScpO1xuICAgIH1cbiAgICAvLyBDaGFuZ2UgZ2xvYmFsIG1vZGUuXG4gICAgX29uQ2hhbmdlTW9kZShtb2RlbCwgbW9kZSkge1xuICAgICAgICB0aGlzLmVtaXQoJ2dhbWU6Z2xvYmFsbW9kZScsIG1vZGUpO1xuICAgIH1cbiAgICAvLyBQYWNtYW4gZWF0cyBnaG9zdC5cbiAgICBfb25HaG9zdEVhdGVuKGdob3N0KSB7XG4gICAgICAgIHRoaXMucGFjbWFuLmhpZGUoKTtcbiAgICAgICAgdGhpcy5fcGF1c2VGcmFtZXMgPSAxNTtcbiAgICAgICAgdGhpcy5fc2hvd1BhY21hbiA9IHRydWU7XG4gICAgICAgIHRoaXMubW9kZWwuYWRkU2NvcmUocGFyc2VJbnQoZ2hvc3Quc2NvcmUpKTtcbiAgICAgICAgdGhpcy5zb3VuZC5wbGF5KCdlYXQnKTtcbiAgICB9XG4gICAgLy8gR2hvc3QgZWF0cyBQYWNtYW4uXG4gICAgX29uR2hvc3RFYXQoKSB7XG4gICAgICAgIHRoaXMuX3BhdXNlRnJhbWVzID0gNDA7XG4gICAgICAgIHRoaXMuX3BhY21hbkVhdGVuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0ZW1wbGF0ZShtb2RlbCkge1xuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNjb3JlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAxLXNjb3JlXCI+MVVQPGJyIC8+PHNwYW4+MDA8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpZ2gtc2NvcmVcIj5ISUdIIFNDT1JFPGJyIC8+PHNwYW4+JHttb2RlbC5oaWdoU2NvcmUgfHwgJzAwJ308L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAyLXNjb3JlXCI+MlVQPGJyIC8+PHNwYW4+MDA8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGFydC1wMVwiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiPlBMQVlFUiBPTkU8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGFydC1yZWFkeVwiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiPlJFQURZITwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbWUtb3ZlclwiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiPllPVSBXSU48YnIgLz5cbiAgICAgICAgICAgIFRvdCA3IHNlcHRlbWJlciE8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzb3VuZC1zdGF0dXMgb25cIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIj48c3BhbiBjbGFzcz1cIndyYXBcIj5TT1VORDogPHNwYW4gY2xhc3M9XCJvblwiPk9OPC9zcGFuPjxzcGFuIGNsYXNzPVwib2ZmXCI+T0ZGPC9zcGFuPjwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYXVzZWRcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIj48c3BhbiBjbGFzcz1cIndyYXBcIj5QQVVTRUQ8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3BsYXNoXCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJuZXJkXCI+S0FBVCAmIFRPQklBUzxicj48YnI+PHNwYW4+R0FBTiBUUk9VV0VOPC9zcGFuPjwvcD5cbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInN0YXJ0XCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCI+U1RBUlQ8L2E+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxvYWRiYXJcIj48ZGl2IGNsYXNzPVwiaW5uZXJcIj48L2Rpdj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImtleXNcIj48c3Bhbj4mbGFycjsmdWFycjsmZGFycjsmcmFycjs8L3NwYW4+Ok1PVkUgPHNwYW4+Uzwvc3Bhbj46U09VTkQgPHNwYW4+UDwvc3Bhbj46UEFVU0U8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9XG59XG5cbk9iamVjdC5hc3NpZ24oSnNQYWNtYW4ucHJvdG90eXBlLCBkZWZhdWx0cyk7XG5cbmV4cG9ydCBkZWZhdWx0IEpzUGFjbWFuO1xuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4vZW5naW5lL01vZGVsJztcblxuaW1wb3J0IFRpbWVyIGZyb20gJy4vZW5naW5lL1RpbWVyJztcblxuaW1wb3J0IHsgTU9ERV9TQ0FUVEVSLCBNT0RFX0NIQVNFIH0gZnJvbSAnLi9HaG9zdCc7XG5cbmltcG9ydCBtYXAxIGZyb20gJy4vbWFwcy9tYXAtMSc7XG5pbXBvcnQgbWFwMiBmcm9tICcuL21hcHMvbWFwLTInO1xuaW1wb3J0IG1hcDMgZnJvbSAnLi9tYXBzL21hcC0zJztcbmltcG9ydCBtYXA0IGZyb20gJy4vbWFwcy9tYXAtNCc7XG5cbi8vIFRPRE86IEFkZCB0aW1lcyBkYXRhIGZvciBlYWNoIGxldmVsLlxuY29uc3QgdGltZXMgPSBbXG4gICAgeyBtb2RlIDogTU9ERV9TQ0FUVEVSLCB0aW1lIDogNyB9LFxuICAgIHsgbW9kZSA6IE1PREVfQ0hBU0UsIHRpbWUgOiAyMCB9LFxuICAgIHsgbW9kZSA6IE1PREVfU0NBVFRFUiwgdGltZSA6IDcgfSxcbiAgICB7IG1vZGUgOiBNT0RFX0NIQVNFLCB0aW1lIDogMjAgfSxcbiAgICB7IG1vZGUgOiBNT0RFX1NDQVRURVIsIHRpbWUgOiA1IH0sXG4gICAgeyBtb2RlIDogTU9ERV9DSEFTRSwgdGltZSA6IDIwIH0sXG4gICAgeyBtb2RlIDogTU9ERV9TQ0FUVEVSLCB0aW1lIDogNSB9LFxuICAgIHsgbW9kZSA6IE1PREVfQ0hBU0UsIHRpbWUgOiAxMDAwMDAwIH1cbl07XG5cbi8vIFRoaXMgaW5mbyB3YXMgcGFyc2VkIGZyb21cbi8vIGh0dHBzOi8vcGFjbWFuLmhvbGVuZXQuaW5mby8jTHZsU3BlY3NcbnZhciBkYXRhID0gW1xuICAgIFt0aW1lcywgMCwgXCIxMDBcIiwgXCI4MFwiLCBcIjcxXCIsIFwiNzVcIiwgXCI0MFwiLCBcIjIwXCIsIFwiODBcIiwgXCIxMFwiLCBcIjg1XCIsIFwiOTBcIiwgXCI3OVwiLCBcIjUwXCIsIFwiNlwiLCBcIjVcIiwgbWFwMSwgXCJtYXplLTFcIl0sXG4gICAgW3RpbWVzLCAxLCBcIjIwMFwiLCBcIjkwXCIsIFwiNzlcIiwgXCI4NVwiLCBcIjQ1XCIsIFwiMzBcIiwgXCI5MFwiLCBcIjE1XCIsIFwiOTVcIiwgXCI5NVwiLCBcIjgzXCIsIFwiNTVcIiwgXCI1XCIsIFwiNVwiLCBtYXAxLCBcIm1hemUtMVwiXSxcbiAgICBbdGltZXMsIDIsIFwiNTAwXCIsIFwiOTBcIiwgXCI3OVwiLCBcIjg1XCIsIFwiNDVcIiwgXCI0MFwiLCBcIjkwXCIsIFwiMjBcIiwgXCI5NVwiLCBcIjk1XCIsIFwiODNcIiwgXCI1NVwiLCBcIjRcIiwgXCI1XCIsIG1hcDIsIFwibWF6ZS0yXCJdLFxuICAgIFt0aW1lcywgMywgXCI1MDBcIiwgXCI5MFwiLCBcIjc5XCIsIFwiODVcIiwgXCI0NVwiLCBcIjQwXCIsIFwiOTBcIiwgXCIyMFwiLCBcIjk1XCIsIFwiOTVcIiwgXCI4M1wiLCBcIjU1XCIsIFwiM1wiLCBcIjVcIiwgbWFwMiwgXCJtYXplLTJcIl0sXG4gICAgW3RpbWVzLCA0LCBcIjcwMFwiLCBcIjEwMFwiLCBcIjg3XCIsIFwiOTVcIiwgXCI1MFwiLCBcIjQwXCIsIFwiMTAwXCIsIFwiMjBcIiwgXCIxMDVcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjYwXCIsIFwiMlwiLCBcIjVcIiwgbWFwMiwgXCJtYXplLTJcIl0sXG4gICAgW3RpbWVzLCA1LCBcIjcwMFwiLCBcIjEwMFwiLCBcIjg3XCIsIFwiOTVcIiwgXCI1MFwiLCBcIjUwXCIsIFwiMTAwXCIsIFwiMjVcIiwgXCIxMDVcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjYwXCIsIFwiNVwiLCBcIjVcIiwgbWFwMywgXCJtYXplLTNcIl0sXG4gICAgW3RpbWVzLCA2LCBcIjEwMDBcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjk1XCIsIFwiNTBcIiwgXCI1MFwiLCBcIjEwMFwiLCBcIjI1XCIsIFwiMTA1XCIsIFwiMTAwXCIsIFwiODdcIiwgXCI2MFwiLCBcIjJcIiwgXCI1XCIsIG1hcDMsIFwibWF6ZS0zXCJdLFxuICAgIFt0aW1lcywgNywgXCIxMDAwXCIsIFwiMTAwXCIsIFwiODdcIiwgXCI5NVwiLCBcIjUwXCIsIFwiNTBcIiwgXCIxMDBcIiwgXCIyNVwiLCBcIjEwNVwiLCBcIjEwMFwiLCBcIjg3XCIsIFwiNjBcIiwgXCIyXCIsIFwiNVwiLCBtYXAzLCBcIm1hemUtM1wiXSxcbiAgICBbdGltZXMsIDAsIFwiMjAwMFwiLCBcIjEwMFwiLCBcIjg3XCIsIFwiOTVcIiwgXCI1MFwiLCBcIjYwXCIsIFwiMTAwXCIsIFwiMzBcIiwgXCIxMDVcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjYwXCIsIFwiMVwiLCBcIjNcIiwgbWFwMywgXCJtYXplLTNcIl0sXG4gICAgW3RpbWVzLCAxLCBcIjIwMDBcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjk1XCIsIFwiNTBcIiwgXCI2MFwiLCBcIjEwMFwiLCBcIjMwXCIsIFwiMTA1XCIsIFwiMTAwXCIsIFwiODdcIiwgXCI2MFwiLCBcIjVcIiwgXCI1XCIsIG1hcDQsIFwibWF6ZS00XCJdLFxuICAgIFt0aW1lcywgMiwgXCIyMDAwXCIsIFwiMTAwXCIsIFwiODdcIiwgXCI5NVwiLCBcIjUwXCIsIFwiNjBcIiwgXCIxMDBcIiwgXCIzMFwiLCBcIjEwNVwiLCBcIjEwMFwiLCBcIjg3XCIsIFwiNjBcIiwgXCIyXCIsIFwiNVwiLCBtYXA0LCBcIm1hemUtNFwiXSxcbiAgICBbdGltZXMsIDMsIFwiMjAwMFwiLCBcIjEwMFwiLCBcIjg3XCIsIFwiOTVcIiwgXCI1MFwiLCBcIjgwXCIsIFwiMTAwXCIsIFwiNDBcIiwgXCIxMDVcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjYwXCIsIFwiMVwiLCBcIjNcIiwgbWFwNCwgXCJtYXplLTRcIl0sXG4gICAgW3RpbWVzLCA0LCBcIjUwMDBcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjk1XCIsIFwiNTBcIiwgXCI4MFwiLCBcIjEwMFwiLCBcIjQwXCIsIFwiMTA1XCIsIFwiMTAwXCIsIFwiODdcIiwgXCI2MFwiLCBcIjFcIiwgXCIzXCIsIG1hcDQsIFwibWF6ZS00XCJdLFxuICAgIFt0aW1lcywgNSwgXCI1MDAwXCIsIFwiMTAwXCIsIFwiODdcIiwgXCI5NVwiLCBcIjUwXCIsIFwiODBcIiwgXCIxMDBcIiwgXCI0MFwiLCBcIjEwNVwiLCBcIjEwMFwiLCBcIjg3XCIsIFwiNjBcIiwgXCIzXCIsIFwiNVwiLCBtYXAzLCBcIm1hemUtM1wiXSxcbiAgICBbdGltZXMsIDYsIFwiNTAwMFwiLCBcIjEwMFwiLCBcIjg3XCIsIFwiOTVcIiwgXCI1MFwiLCBcIjEwMFwiLCBcIjEwMFwiLCBcIjUwXCIsIFwiMTA1XCIsIFwiMTAwXCIsIFwiODdcIiwgXCI2MFwiLCBcIjFcIiwgXCIzXCIsIG1hcDMsIFwibWF6ZS0zXCJdLFxuICAgIFt0aW1lcywgNywgXCI1MDAwXCIsIFwiMTAwXCIsIFwiODdcIiwgXCI5NVwiLCBcIjUwXCIsIFwiMTAwXCIsIFwiMTAwXCIsIFwiNTBcIiwgXCIxMDVcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjYwXCIsIFwiMVwiLCBcIjNcIiwgbWFwMywgXCJtYXplLTNcIl0sXG4gICAgW3RpbWVzLCA3LCBcIjUwMDBcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjk1XCIsIFwiNTBcIiwgXCIxMDBcIiwgXCIxMDBcIiwgXCI1MFwiLCBcIjEwNVwiLCBcIjBcIiwgXCIwXCIsIFwiMFwiLCBcIjBcIiwgXCIwXCIsIG1hcDMsIFwibWF6ZS0zXCJdLFxuICAgIFt0aW1lcywgNywgXCI1MDAwXCIsIFwiMTAwXCIsIFwiODdcIiwgXCI5NVwiLCBcIjUwXCIsIFwiMTAwXCIsIFwiMTAwXCIsIFwiNTBcIiwgXCIxMDVcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjYwXCIsIFwiMVwiLCBcIjNcIiwgbWFwNCwgXCJtYXplLTRcIl0sXG4gICAgW3RpbWVzLCA3LCBcIjUwMDBcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjk1XCIsIFwiNTBcIiwgXCIxMjBcIiwgXCIxMDBcIiwgXCI2MFwiLCBcIjEwNVwiLCBcIjBcIiwgXCIwXCIsIFwiMFwiLCBcIjBcIiwgXCIwXCIsIG1hcDQsIFwibWF6ZS00XCJdLFxuICAgIFt0aW1lcywgNywgXCI1MDAwXCIsIFwiMTAwXCIsIFwiODdcIiwgXCI5NVwiLCBcIjUwXCIsIFwiMTIwXCIsIFwiMTAwXCIsIFwiNjBcIiwgXCIxMDVcIiwgXCIwXCIsIFwiMFwiLCBcIjBcIiwgXCIwXCIsIFwiMFwiLCBtYXA0LCBcIm1hemUtNFwiXSxcbiAgICBbdGltZXMsIDcsIFwiNTAwMFwiLCBcIjkwXCIsIFwiNzlcIiwgXCI5NVwiLCBcIjUwXCIsIFwiMTIwXCIsIFwiMTAwXCIsIFwiNjBcIiwgXCIxMDVcIiwgXCIwXCIsIFwiMFwiLCBcIjBcIiwgXCIwXCIsIFwiMFwiLCBtYXA0LCBcIm1hemUtNFwiXVxuXTtcblxudmFyIGtleXMgPSBbXG4gICAgJ2dhbWUudGltZXMnLFxuICAgICdnYW1lLmJvbnVzSW5kZXgnLFxuICAgICdnYW1lLmJvbnVzU2NvcmUnLFxuICAgICdwYWNtYW4uc3BlZWQnLFxuICAgICdwYWNtYW4uZG90U3BlZWQnLFxuICAgICdnaG9zdC5zcGVlZCcsXG4gICAgJ2dob3N0LnR1bm5lbFNwZWVkJyxcbiAgICAnJyxcbiAgICAnJyxcbiAgICAnJyxcbiAgICAnJyxcbiAgICAncGFjbWFuLmZyaWdodGVuZWRTcGVlZCcsXG4gICAgJ3BhY21hbi5mcmlnaHRlbmVkRG90U3BlZWQnLFxuICAgICdnaG9zdC5mcmlnaHRlbmVkU3BlZWQnLFxuICAgICdnaG9zdC5mcmlnaHRlbmVkVGltZScsXG4gICAgJ2dob3N0LmZyaWdodGVuZWRGbGFzaGVzJyxcbiAgICAnZ2FtZS5tYXAnLFxuICAgICdnYW1lLm1hemUnXG5dO1xuXG5jbGFzcyBHYW1lTW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gICAgY29uc3RydWN0b3IoYXR0cnMpIHtcbiAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgbGV2ZWwgOiAxLFxuICAgICAgICAgICAgc2NvcmUgOiAwLFxuICAgICAgICAgICAgaGlnaFNjb3JlIDogMCxcbiAgICAgICAgICAgIGxpdmVzIDogMyxcbiAgICAgICAgICAgIGV4dHJhTGl2ZXMgOiAxLFxuICAgICAgICAgICAgZXh0cmFMaWZlU2NvcmUgOiAxMDAwMCxcbiAgICAgICAgICAgIG1vZGUgOiBudWxsLFxuICAgICAgICAgICAgLi4uYXR0cnNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cmwgPSAnanNQYWNtYW4nO1xuXG4gICAgICAgIHRoaXMub24oJ2NoYW5nZTpzY29yZScsIHRoaXMub25DaGFuZ2VTY29yZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBhZGRTY29yZShzY29yZSkge1xuICAgICAgICB0aGlzLnNjb3JlID0gdGhpcy5zY29yZSArIHNjb3JlO1xuICAgIH1cblxuICAgIHVwZGF0ZU1vZGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5tb2RlKSB0aGlzLm1vZGVUaW1lciA9IG5ldyBUaW1lcigpO1xuXG4gICAgICAgIGNvbnN0IHsgdGltZXMgfSA9IHRoaXMuZ2V0U2V0dGluZ3MoJ2dhbWUnKTtcblxuICAgICAgICBsZXQgdG90YWwgPSAwLFxuICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgd2hpbGUodGltZXNbaV0pIHtcbiAgICAgICAgICAgIHRvdGFsICs9IHRpbWVzW2ldLnRpbWU7XG4gICAgICAgICAgICBpZiAoIXRoaXMubW9kZVRpbWVyLmlzRWxhcHNlZCh0b3RhbCkgfHwgaSA9PT0gdGltZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZSA9IHRpbWVzW2ldLm1vZGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZVRpbWVyKSB0aGlzLm1vZGVUaW1lci5wYXVzZSgpO1xuICAgIH1cblxuICAgIHJlc3VtZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZVRpbWVyKSB0aGlzLm1vZGVUaW1lci5yZXN1bWUoKTtcbiAgICB9XG5cbiAgICBnZXRTZXR0aW5ncyhrZXkpIHtcbiAgICAgICAgY29uc3Qgb2JqID0ge307XG5cbiAgICAgICAgY29uc3QgbGV2ZWwgPSB0aGlzLmxldmVsID4gZGF0YS5sZW5ndGggPyBkYXRhLmxlbmd0aCA6IHRoaXMubGV2ZWw7XG5cbiAgICAgICAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcblxuICAgICAgICB3aGlsZShpLS0pIHtcbiAgICAgICAgICAgIGxldCBwYXJ0cyA9IGtleXNbaV0uc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIGlmIChwYXJ0c1swXSA9PT0ga2V5KSBvYmpbcGFydHNbMV1dID0gZGF0YVtsZXZlbCAtIDFdW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICBvbkNoYW5nZVNjb3JlKCkge1xuICAgICAgICBpZiAodGhpcy5leHRyYUxpdmVzICYmIHRoaXMuc2NvcmUgPj0gdGhpcy5leHRyYUxpZmVTY29yZSkge1xuICAgICAgICAgICAgdGhpcy5leHRyYUxpdmVzLS07XG4gICAgICAgICAgICB0aGlzLmxpdmVzKys7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oaWdoU2NvcmUgPCB0aGlzLnNjb3JlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IHRoaXMuc2NvcmU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB7IGhpZ2hTY29yZSA6IHRoaXMuaGlnaFNjb3JlIH07XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lTW9kZWw7XG4iLCJpbXBvcnQgQW5pbWF0aW9uLCB7IEFOSU1BVElPTl9IT1JJWk9OVEFMIH0gZnJvbSAnLi9lbmdpbmUvQW5pbWF0aW9uJztcbmltcG9ydCBUaW1lciBmcm9tICcuL2VuZ2luZS9UaW1lcic7XG5pbXBvcnQgQ2hhcmFjdGVyIGZyb20gJy4vQ2hhcmFjdGVyJztcbmltcG9ydCBnZXREaXN0YW5jZSBmcm9tICcuL2hlbHBlci9nZXREaXN0YW5jZSc7XG5pbXBvcnQgcm5kIGZyb20gJy4vaGVscGVyL3JuZCc7XG5cbmV4cG9ydCBjb25zdCBNT0RFX1NDQVRURVIgPSAnc2NhdHRlcic7XG5leHBvcnQgY29uc3QgTU9ERV9DSEFTRSA9ICdjaGFzZSc7XG5leHBvcnQgY29uc3QgTU9ERV9GUklHSFRFTkVEID0gJ2ZyaWdodGVuZWQnO1xuZXhwb3J0IGNvbnN0IE1PREVfSE9VU0UgPSAnaG91c2UnO1xuZXhwb3J0IGNvbnN0IE1PREVfREVBRCA9ICdkZWFkJztcblxuZXhwb3J0IGNvbnN0IGFuaW1hdGlvbkJhc2UgPSB7XG4gICAgaW1hZ2VVUkwgOiAnaW1nL2NoYXJhY3RlcnMxLnBuZycsXG4gICAgbnVtYmVyT2ZGcmFtZSA6IDEsXG4gICAgZGVsdGEgOiA2NCxcbiAgICByZWZyZXNoUmF0ZSA6IDE4MCxcbiAgICB0eXBlIDogQU5JTUFUSU9OX0hPUklaT05UQUxcbn07XG5cbmV4cG9ydCBjb25zdCBhbmltYXRpb25zID0ge1xuICAgICdmcmlnaHRlbmVkJyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICBvZmZzZXRZIDogMzc2LFxuICAgICAgICBvZmZzZXRYIDogLTJcbiAgICB9KSxcblxuICAgICdmcmlnaHRlbmVkQmxpbmsnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgIG9mZnNldFkgOiAzNzYsXG4gICAgICAgIG9mZnNldFggOiAtMixcbiAgICAgICAgbnVtYmVyT2ZGcmFtZSA6IDRcbiAgICB9KSxcblxuICAgICdkZWFkUmlnaHQnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgIG9mZnNldFkgOiAzNzYsXG4gICAgICAgIG9mZnNldFggOiA2NCAqIDQgLSAyLFxuICAgICAgICBudW1iZXJPZkZyYW1lIDogMVxuICAgIH0pLFxuXG4gICAgJ2RlYWREb3duJyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICBvZmZzZXRZIDogMzc2LFxuICAgICAgICBvZmZzZXRYIDogNjQgKiA1IC0gMixcbiAgICAgICAgbnVtYmVyT2ZGcmFtZSA6IDFcbiAgICB9KSxcblxuICAgICdkZWFkVXAnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgIG9mZnNldFkgOiAzNzYsXG4gICAgICAgIG9mZnNldFggOiA2NCAqIDYgLSAyLFxuICAgICAgICBudW1iZXJPZkZyYW1lIDogMVxuICAgIH0pLFxuXG4gICAgJ2RlYWRMZWZ0JyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICBvZmZzZXRZIDogMzc2LFxuICAgICAgICBvZmZzZXRYIDogNjQgKiA3IC0gMixcbiAgICAgICAgbnVtYmVyT2ZGcmFtZSA6IDFcbiAgICB9KSxcblxuICAgICdzY29yZTIwMCcgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgaW1hZ2VVUkwgOiAnaW1nL21pc2MucG5nJyxcbiAgICAgICAgbnVtYmVyT2ZGcmFtZSA6IDEsXG4gICAgICAgIG9mZnNldFggOiAtMixcbiAgICAgICAgb2Zmc2V0WSA6IDExMFxuICAgIH0pLFxuXG4gICAgJ3Njb3JlNDAwJyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICBpbWFnZVVSTCA6ICdpbWcvbWlzYy5wbmcnLFxuICAgICAgICBudW1iZXJPZkZyYW1lIDogMSxcbiAgICAgICAgb2Zmc2V0WCA6IDY0ICogMSAtIDIsXG4gICAgICAgIG9mZnNldFkgOiAxMTBcbiAgICB9KSxcblxuICAgICdzY29yZTgwMCcgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgaW1hZ2VVUkwgOiAnaW1nL21pc2MucG5nJyxcbiAgICAgICAgbnVtYmVyT2ZGcmFtZSA6IDEsXG4gICAgICAgIG9mZnNldFggOiA2NCAqIDIgLSAyLFxuICAgICAgICBvZmZzZXRZIDogMTEwXG4gICAgfSksXG5cbiAgICAnc2NvcmUxNjAwJyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICBpbWFnZVVSTCA6ICdpbWcvbWlzYy5wbmcnLFxuICAgICAgICBudW1iZXJPZkZyYW1lIDogMSxcbiAgICAgICAgb2Zmc2V0WCA6IDY0ICogMyxcbiAgICAgICAgb2Zmc2V0WSA6IDExMFxuICAgIH0pXG59O1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgICBhbmltYXRpb25zLFxuICAgIHdpZHRoIDogNjQsXG4gICAgc3BlZWQgOiA3NSxcbiAgICBmcmlnaHRlbmVkVGltZSA6IDUsXG4gICAgd2FpdFRpbWUgOiA0LFxuICAgIHNjYXR0ZXJUYXJnZXQgOiAwLFxuICAgIG1vZGUgOiBNT0RFX0hPVVNFLFxuICAgIHNjb3JlIDogJzIwMCcsXG4gICAgc2NvcmVzIDogeyAnMjAwJyA6ICc0MDAnLCAnNDAwJyA6ICc4MDAnLCAnODAwJyA6ICcxNjAwJyB9LFxuICAgIGJsaW5reSA6IG51bGwsXG4gICAgZ2V0Q2hhc2VUYXJnZXQgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFjbWFuRGF0YS50aWxlO1xuICAgIH0sXG4gICAgdHVubmVsU3BlZWQgOiBudWxsLFxuICAgIGZyaWdodGVuZWRTcGVlZCA6IG51bGwsXG4gICAgZnJpZ2h0ZW5lZEZsYXNoZXMgOiBudWxsXG59O1xuXG5jbGFzcyBHaG9zdCBleHRlbmRzIENoYXJhY3RlciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhkZWZhdWx0cykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSBpbiBvcHRpb25zKSB0aGlzW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGFkZEdhbWVHbG9iYWxNb2RlRXZlbnRMaXN0ZW5lcixcbiAgICAgICAgICAgIGFkZEdhbWVHaG9zdEVhdGVuRXZlbnRMaXN0ZW5lcixcbiAgICAgICAgICAgIGFkZFBhY21hbkVhdFBpbGxFdmVudExpc3RlbmVyLFxuICAgICAgICAgICAgYWRkUGFjbWFuUG9zaXRpb25FdmVudExpc3RlbmVyXG4gICAgICAgIH0gPSBvcHRpb25zO1xuXG4gICAgICAgIHRoaXMuZGVhZFRhcmdldCA9IHRoaXMubWFwLmhvdXNlLmdldFIoKS5nZXRVKCk7XG4gICAgICAgIHRoaXMuZGVhZEVuZFggPSB0aGlzLl9kZWZhdWx0cy54O1xuICAgICAgICB0aGlzLmRlYWRFbmRZID0gdGhpcy5tYXAuaG91c2VDZW50ZXIueTtcbiAgICAgICAgdGhpcy5kZWFkRW5kID0gdGhpcy5tYXAuZ2V0VGlsZSh0aGlzLmRlYWRFbmRYLCB0aGlzLmRlYWRFbmRZLCB0cnVlKTtcblxuICAgICAgICB0aGlzLmhvdXNlVG9wID0gdGhpcy55IC0gdGhpcy5nZXRUaWxlKCkuaGVpZ2h0IC8gMjtcbiAgICAgICAgdGhpcy5ob3VzZUJvdHRvbSA9IHRoaXMueSArIHRoaXMuZ2V0VGlsZSgpLmhlaWdodCAvIDI7XG4gICAgICAgIHRoaXMuaG91c2VFeGl0VGlsZSA9IHRoaXMubWFwLmhvdXNlLmdldFIoKTtcbiAgICAgICAgdGhpcy5ob3VzZUV4aXRUaWxlWCA9IHRoaXMuaG91c2VFeGl0VGlsZS54IC0gdGhpcy5tYXAudGlsZVdpZHRoIC8gMjtcblxuICAgICAgICB0aGlzLnNjYXR0ZXJUYXJnZXQgPSB0aGlzLm1hcC50aWxlc1t0aGlzLnNjYXR0ZXJUYXJnZXRdO1xuXG4gICAgICAgIHRoaXMuc2V0TW9kZSh0aGlzLm1vZGUpO1xuXG4gICAgICAgIC8vIENoYW5nZSB0aWxlLlxuICAgICAgICB0aGlzLm9uKCdpdGVtOnRpbGUnLCAodCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gTU9ERV9GUklHSFRFTkVEKSB0aGlzLl9zcGVlZCA9IHRoaXMuZnJpZ2h0ZW5lZFNwZWVkO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tb2RlID09PSBNT0RFX0RFQUQpIHRoaXMuX3NwZWVkID0gMTMwO1xuICAgICAgICAgICAgZWxzZSBpZiAodC5pc1R1bm5lbCgpKSB0aGlzLl9zcGVlZCA9IHRoaXMudHVubmVsU3BlZWQ7XG4gICAgICAgICAgICBlbHNlIHRoaXMuX3NwZWVkID0gdGhpcy5zcGVlZDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3R1cm5CYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXIgPSB0aGlzLl9nZXRPcERpcmVjdGlvbih0aGlzLmRpcik7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXh0RGlyID0gdGhpcy5nZXROZXh0RGlyZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHVybkJhY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyID0gdGhpcy5fbmV4dERpcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXh0RGlyID0gdGhpcy5nZXROZXh0RGlyZWN0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2VhdEV2ZW50ID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFkZEdhbWVHbG9iYWxNb2RlRXZlbnRMaXN0ZW5lcih0aGlzLm9uR2FtZUdsb2JhbE1vZGUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgYWRkUGFjbWFuRWF0UGlsbEV2ZW50TGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRNb2RlKE1PREVfRlJJR0hURU5FRCk7XG4gICAgICAgICAgICB0aGlzLnNjb3JlID0gMjAwO1xuICAgICAgICB9KTtcblxuICAgICAgICBhZGRHYW1lR2hvc3RFYXRlbkV2ZW50TGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zY29yZSA9IHRoaXMuc2NvcmVzW3RoaXMuc2NvcmVdO1xuICAgICAgICB9KTtcblxuICAgICAgICBhZGRQYWNtYW5Qb3NpdGlvbkV2ZW50TGlzdGVuZXIoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY21hbkRhdGEgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcbiAgICAgICAgdGhpcy5zZXRNb2RlKHRoaXMubW9kZSk7XG4gICAgfVxuXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmhvdXNlVGltZXIpIHRoaXMuaG91c2VUaW1lci5wYXVzZSgpO1xuICAgICAgICBpZiAodGhpcy5mcmlnaHRlbmVkVGltZXIpIHRoaXMuZnJpZ2h0ZW5lZFRpbWVyLnBhdXNlKCk7XG4gICAgfVxuXG4gICAgcmVzdW1lKCkge1xuICAgICAgICBpZiAodGhpcy5tb2RlID09PSBNT0RFX0ZSSUdIVEVORUQpIHRoaXMuZnJpZ2h0ZW5lZFRpbWVyLnJlc3VtZSgpO1xuICAgICAgICBpZiAodGhpcy5tb2RlID09PSBNT0RFX0hPVVNFICYmICF0aGlzLmhvdXNlUHJlcGFyZUV4aXQpIGhvdXNlVGltZXIucmVzdW1lKCk7XG4gICAgfVxuXG4gICAgc2V0TW9kZShtb2RlKSB7XG4gICAgICAgIGlmICghbW9kZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZnJpZ2h0ZW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZSA9IHRoaXMuZnJpZ2h0ZW5lZDtcbiAgICAgICAgICAgICAgICB0aGlzLmZyaWdodGVuZWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW9kZSA9IHRoaXMuZ2xvYmFsTW9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb2RlID09PSBNT0RFX0ZSSUdIVEVORUQgJiYgKHRoaXMubW9kZSA9PT0gTU9ERV9IT1VTRSB8fCB0aGlzLm1vZGUgPT09IE1PREVfREVBRCkpIHtcbiAgICAgICAgICAgIHRoaXMuZnJpZ2h0ZW5lZCA9IG1vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vZGUgPSBtb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbkVudGVyTW9kZShtb2RlKTtcbiAgICB9XG5cbiAgICBzaG91bGRFeGl0TW9kZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gTU9ERV9ERUFEKSByZXR1cm4gdGhpcy5nZXRUaWxlKCkgPT09IHRoaXMuZGVhZEVuZDtcbiAgICAgICAgXG4gICAgICAgIGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gTU9ERV9GUklHSFRFTkVEKSByZXR1cm4gdGhpcy5mcmlnaHRlbmVkVGltZXIuaXNFbGFwc2VkKCk7XG5cbiAgICAgICAgZWxzZSBpZiAodGhpcy5tb2RlID09PSBNT0RFX0hPVVNFKSByZXR1cm4gdGhpcy5nZXRUaWxlKCkgPT09IHRoaXMuaG91c2VFeGl0VGlsZS5nZXRVKCk7XG5cbiAgICAgICAgZWxzZSBpZiAodGhpcy5tb2RlICE9IHRoaXMuZ2xvYmFsTW9kZSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIG9uRW50ZXJNb2RlKG1vZGUpIHtcbiAgICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgICAgICBjYXNlIE1PREVfREVBRDpcbiAgICAgICAgICAgICAgICB0aGlzLmRlYWRQcmVwYXJlRW50ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXh0QW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zW2BzY29yZSR7dGhpcy5zY29yZX1gXTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBNT0RFX0ZSSUdIVEVORUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5mcmlnaHRlbmVkVGltZXIgPSBuZXcgVGltZXIodGhpcy5mcmlnaHRlbmVkVGltZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdpdGVtOm1vZGVmcmlnaHRlbmVkOmVudGVyJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE1PREVfSE9VU0U6XG4gICAgICAgICAgICAgICAgdGhpcy5ob3VzZVByZXBhcmVFeGl0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BlZWQgPSA3MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRXhpdE1vZGUoKSB7XG4gICAgICAgIGNvbnN0IHRpbGUgPSB0aGlzLmdldFRpbGUoKTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgICAgICAgICAgY2FzZSBNT0RFX0RFQUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBNT0RFX0ZSSUdIVEVORUQ6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZyaWdodGVuZWQpIHRoaXMuc2V0TW9kZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnaXRlbTptb2RlZnJpZ2h0ZW5lZDpleGl0Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE1PREVfSE9VU0U6XG4gICAgICAgICAgICAgICAgdGhpcy5ob3VzZVRpbWVyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2RpciA9ICdsJztcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXh0RGlyID0gJ2wnO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RUaWxlID0gdGlsZS5nZXREKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BlZWQgPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TW9kZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoIXRpbGUuaXNIb3VzZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3R1cm5CYWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNb2RlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0ZyaWdodGVuZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZyaWdodGVuZWQgfHwgdGhpcy5tb2RlID09PSBNT0RFX0ZSSUdIVEVORUQ7XG4gICAgfVxuXG4gICAgaXNEZWFkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlID09PSBNT0RFX0RFQUQ7XG4gICAgfVxuXG4gICAgb25HYW1lR2xvYmFsTW9kZShtb2RlKSB7XG4gICAgICAgIGlmIChtb2RlKSB0aGlzLmdsb2JhbE1vZGUgPSBtb2RlO1xuICAgIH1cblxuICAgIG1vdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3VsZEV4aXRNb2RlKCkpIHtcbiAgICAgICAgICAgIHRoaXMub25FeGl0TW9kZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gTU9ERV9ERUFEKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRlYWRQcmVwYXJlRW50ZXIgJiYgdGhpcy5nZXRUaWxlKCkgPT09IHRoaXMuZGVhZFRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYWRQcmVwYXJlRW50ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlYWRQcmVwYXJlRW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZFggPSB0aGlzLmRlYWRFbmRYO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kWSA9IHRoaXMuZGVhZEVuZFk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNob3VsZCBnbyB0byBjZW50ZXIgZmlyc3RcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueSA8IGVuZFkpIGVuZFggPSB0aGlzLmRlYWRUYXJnZXQueCAtIHRoaXMubWFwLnR3IC8gMjtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGRpcmVjdGlvblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy54IDwgZW5kWCkgdGhpcy5kaXIgPSAncic7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMueCA+IGVuZFgpIHRoaXMuZGlyID0gJ2wnO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnkgPCBlbmRZKSB0aGlzLmRpciA9ICdkJztcbiAgICAgICAgICAgICAgICAgICAgLy8gTW92ZVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXIgPT09ICdkJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLmdldE1pbih0aGlzLmdldFN0ZXAoKSwgZW5kWSAtIHRoaXMueSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpciA9PT0gJ3InKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMuZ2V0TWluKHRoaXMuZ2V0U3RlcCgpLCBlbmRYIC0gdGhpcy54KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyID09PSAnbCcpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnggLT0gdGhpcy5nZXRNaW4odGhpcy5nZXRTdGVwKCksIHRoaXMueCAtIGVuZFgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TmV4dEFuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLm1vdmUodGhpcy5fZGlyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gTU9ERV9IT1VTRSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5ob3VzZVRpbWVyKSB0aGlzLmhvdXNlVGltZXIgPSBuZXcgVGltZXIodGhpcy53YWl0VGltZSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0aWxlID0gdGhpcy5nZXRUaWxlKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaG91c2VQcmVwYXJlRXhpdCAmJiB0aGlzLmhvdXNlVGltZXIuaXNFbGFwc2VkKCkgJiYgIXRpbGUuaXNXYWxsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3VzZVByZXBhcmVFeGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ID0gdGlsZS55O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyaWdodGVuZWQgJiYgdGhpcy5mcmlnaHRlbmVkVGltZXIuaXNFbGFwc2VkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmlnaHRlbmVkID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3VzZVByZXBhcmVFeGl0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnggPCB0aGlzLmhvdXNlRXhpdFRpbGVYKSB0aGlzLmRpciA9ICdyJztcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy54ID4gdGhpcy5ob3VzZUV4aXRUaWxlWCkgdGhpcy5kaXIgPSAnbCc7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5kaXIgPSAndSc7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyID09PSAndScpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnkgLT0gdGhpcy5nZXRNaW4odGhpcy5nZXRTdGVwKCksIHRoaXMueSAtIHRoaXMuaG91c2VFeGl0VGlsZS5nZXRVKCkueSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpciA9PT0gJ3InKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMuZ2V0TWluKHRoaXMuZ2V0U3RlcCgpLCB0aGlzLmhvdXNlRXhpdFRpbGVYIC0gdGhpcy54KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyID09PSAnbCcpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnggLT0gdGhpcy5nZXRNaW4odGhpcy5nZXRTdGVwKCksIHRoaXMueCAtIHRoaXMuaG91c2VFeGl0VGlsZVgpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueSA8PSB0aGlzLmhvdXNlVG9wICYmIHRoaXMuZGlyID09PSAndScpIHRoaXMuZGlyID0gJ2QnO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy55ID49IHRoaXMuaG91c2VCb3R0b20gJiYgdGhpcy5kaXIgPT09ICdkJykgdGhpcy5kaXIgPSAndSc7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyID09PSAndScpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnkgLT0gdGhpcy5nZXRNaW4odGhpcy5nZXRTdGVwKCksIHRoaXMueSAtIHRoaXMuaG91c2VUb3ApO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXIgPT09ICdkJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLmdldE1pbih0aGlzLmdldFN0ZXAoKSwgdGhpcy5ob3VzZUJvdHRvbSAtIHRoaXMueSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNldE5leHRBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdXBlci5tb3ZlKHRoaXMuX2Rpcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFYXQgb3IgZWF0ZW4hXG4gICAgICAgIGlmICghdGhpcy5fZWF0RXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBwdCA9IHRoaXMucGFjbWFuRGF0YS50aWxlLCB0ID0gdGhpcy5nZXRUaWxlKCksIG9wID0gdGhpcy5fZ2V0T3BEaXJlY3Rpb24odGhpcy5kaXIpO1xuICAgICAgICAgICAgaWYgKHB0ID09PSB0IHx8ICh0aGlzLnBhY21hbkRhdGEuZGlyID09PSBvcCAmJiBwdCA9PT0gdC5nZXQob3ApKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VhdEV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSBNT0RFX0ZSSUdIVEVORUQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gR2hvc3QgZWF0ZW4gYnkgUGFjbWFuIVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE1vZGUoTU9ERV9ERUFEKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdpdGVtOmVhdGVuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZGUgIT09IE1PREVfREVBRCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBFYXQgUGFjbWFuIVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2l0ZW06ZWF0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuR28oZGlyLCB0aWxlKSB7XG4gICAgICAgIGlmICghdGlsZSkgdGlsZSA9IHRoaXMuZ2V0VGlsZSgpO1xuXG4gICAgICAgIGNvbnN0IG5leHRUaWxlID0gdGlsZS5nZXQoZGlyKTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlID09PSBNT0RFX0RFQUQpIHJldHVybiAhbmV4dFRpbGUgfHwgIW5leHRUaWxlLmlzV2FsbCgpO1xuXG4gICAgICAgIGlmICghbmV4dFRpbGUpIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gIW5leHRUaWxlLmlzV2FsbCgpICYmICFuZXh0VGlsZS5pc0hvdXNlKCk7XG5cbiAgICB9XG5cbiAgICBnZXROZXh0RGlyZWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5tb2RlID09PSBNT0RFX0ZSSUdIVEVORUQpIHtcbiAgICAgICAgICAgIC8vIE5leHQgdGlsZS5cbiAgICAgICAgICAgIGNvbnN0IG5leHRUaWxlID0gdGhpcy5nZXRUaWxlKCkuZ2V0KHRoaXMuX2Rpcik7XG4gICAgICAgICAgICAvLyBDbG9ja3dpc2UgZGlyZWN0aW9uIG9yZGVyLlxuICAgICAgICAgICAgY29uc3QgZGlyZWN0aW9ucyA9IFsndScsICdyJywgJ2QnLCAnbCcsICd1JywgJ3InLCAnZCcsICdsJ107XG4gICAgICAgICAgICAvLyBTZWxlY3QgcmFuZG9tIGRpcmVjdGlvbi4gVGhlbiB0cnkgdGhhdCBkaXJlY3Rpb24gb3IgY2hhbmdlIGZvbGxvd2luZyBjbG9ja3dpc2Ugb3JkZXIuXG4gICAgICAgICAgICBsZXQgaWR4ID0gcm5kKDQpO1xuXG4gICAgICAgICAgICBsZXQgbmV4dERpcmVjdGlvbiA9IGRpcmVjdGlvbnNbaWR4XTtcblxuICAgICAgICAgICAgd2hpbGUgKG5leHREaXJlY3Rpb24gJiYgKG5leHREaXJlY3Rpb24gPT09IHRoaXMuX2dldE9wRGlyZWN0aW9uKHRoaXMuX2RpcikgfHwgIXRoaXMuY2FuR28obmV4dERpcmVjdGlvbiwgbmV4dFRpbGUpKSkge1xuICAgICAgICAgICAgICAgIG5leHREaXJlY3Rpb24gPSBkaXJlY3Rpb25zWysraWR4XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5leHREaXJlY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGFyZ2V0IFRpbGVcbiAgICAgICAgY29uc3QgdGFyZ2V0VGlsZSA9IHRoaXMubW9kZSA9PT0gTU9ERV9DSEFTRSA/IHRoaXMuZ2V0Q2hhc2VUYXJnZXQoKSA6XG4gICAgICAgICAgICB0aGlzLm1vZGUgPT09IE1PREVfU0NBVFRFUiA/IHRoaXMuc2NhdHRlclRhcmdldCA6XG4gICAgICAgICAgICB0aGlzLmRlYWRUYXJnZXQ7XG5cbiAgICAgICAgY29uc3QgX2RpciA9IHRoaXMuX2RpciB8fCB0aGlzLmRpcjtcbiAgICAgICAgLy8gTmV4dCB0aWxlLlxuICAgICAgICBjb25zdCBuZXh0VGlsZSA9IHRoaXMuZ2V0VGlsZSgpLmdldChfZGlyKTtcbiAgICAgICAgLy8gUHJlZmVycmVkIGRpcmVjdGlvbiBvcmRlci5cbiAgICAgICAgY29uc3QgZGlyZWN0aW9ucyA9IFsndScsICdsJywgJ2QnLCAnciddO1xuXG4gICAgICAgIGxldCBuZXh0RGlyZWN0aW9uLCBsYXN0RGlzdGFuY2U7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkaXIgPSBkaXJlY3Rpb25zW2ldO1xuICAgICAgICAgICAgLy8gQ2FudCd0IGdvIGJhY2suXG4gICAgICAgICAgICBpZiAoZGlyID09PSB0aGlzLl9nZXRPcERpcmVjdGlvbihfZGlyKSkgY29udGludWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNhbkdvKGRpciwgbmV4dFRpbGUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlc3RUaWxlID0gbmV4dFRpbGUuZ2V0KGRpcik7XG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gZ2V0RGlzdGFuY2UodGVzdFRpbGUsIHRhcmdldFRpbGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBsYXN0RGlzdGFuY2UgPT09ICd1bmRlZmluZWQnIHx8IGxhc3REaXN0YW5jZSA+IGRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHREaXJlY3Rpb24gPSBkaXI7XG4gICAgICAgICAgICAgICAgICAgIGxhc3REaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0RGlyZWN0aW9uO1xuICAgIH1cblxuICAgIHNldE5leHRBbmltYXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09IE1PREVfREVBRCkge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmRpcikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3UnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZXh0QW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmRlYWRVcDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25leHRBbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZGVhZFJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmV4dEFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5kZWFkRG93bjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25leHRBbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZGVhZExlZnQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gTU9ERV9GUklHSFRFTkVEIHx8XG4gICAgICAgICAgICAodGhpcy5tb2RlID09PSBNT0RFX0hPVVNFICYmIHRoaXMuZnJpZ2h0ZW5lZCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZyaWdodGVuZWRUaW1lIC0gdGhpcy5mcmlnaHRlbmVkVGltZSAqIDAuMiA+IHRoaXMuZnJpZ2h0ZW5lZFRpbWVyLmdldEVsYXBzZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX25leHRBbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZnJpZ2h0ZW5lZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmV4dEFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5mcmlnaHRlbmVkQmxpbms7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXBlci5zZXROZXh0QW5pbWF0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbk9iamVjdC5hc3NpZ24oR2hvc3QucHJvdG90eXBlLCBkZWZhdWx0cyk7XG5cbmV4cG9ydCBkZWZhdWx0IEdob3N0O1xuIiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL2VuZ2luZS9TcHJpdGUnO1xuXG5jbGFzcyBJdGVtIGV4dGVuZHMgU3ByaXRlIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMubWFwKSB0aGlzLm1hcCA9IG9wdGlvbnMubWFwO1xuICAgICAgICAvLyBIYWxmIHdpZHRoIGFuZCBoYWxmIGhlaWdodC5cbiAgICAgICAgdGhpcy5vZmZzZXRYID0gcGFyc2VJbnQodGhpcy53aWR0aCAvIDIpO1xuICAgICAgICB0aGlzLm9mZnNldFkgPSBwYXJzZUludCh0aGlzLmhlaWdodCAvIDIpO1xuICAgICAgICAvLyBSZW5kZXIuXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0VGlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmdldFRpbGUodGhpcy54LCB0aGlzLnksIHRydWUpO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKS5yZW1vdmVFbGVtZW50KCk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSXRlbTtcbiIsImltcG9ydCBQYWNtYW4gZnJvbSAnLi9QYWNtYW4nO1xuXG5jbGFzcyBMaXZlcyAge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5wYWNtYW5zID0gW107XG5cbiAgICAgICAgdGhpcy5tb2RlbCA9IG9wdGlvbnMubW9kZWw7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwYWNtYW4gPSBuZXcgUGFjbWFuKHtcbiAgICAgICAgICAgICAgICB4IDogb3B0aW9ucy54ICsgaSAqIDcwLFxuICAgICAgICAgICAgICAgIHkgOiBvcHRpb25zLnksXG4gICAgICAgICAgICAgICAgZmFjdG9yIDogb3B0aW9ucy5mYWN0b3IsXG4gICAgICAgICAgICAgICAgZGVmYXVsdEFuaW1hdGlvbiA6ICdyaWdodCcsXG4gICAgICAgICAgICAgICAgYWRkR2FtZUdob3N0RWF0RXZlbnRMaXN0ZW5lciA6ICgpID0+IHt9LFxuICAgICAgICAgICAgICAgIGFkZEdhbWVHaG9zdE1vZGVGcmlnaHRlbmVkRW50ZXIgOiAoKSA9PiB7fSxcbiAgICAgICAgICAgICAgICBhZGRHYW1lR2hvc3RNb2RlRnJpZ2h0ZW5lZEV4aXQgOiAoKSA9PiB7fSxcbiAgICAgICAgICAgICAgICBub3JtYWxpemVSZWZyYXNoUmF0ZSA6ICgpID0+IDFcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBvcHRpb25zLmFkZFNwcml0ZShwYWNtYW4pO1xuICAgICAgICAgICAgdGhpcy5wYWNtYW5zLnB1c2gocGFjbWFuKTtcblxuICAgICAgICAgICAgaWYgKGkgPiB0aGlzLm1vZGVsLmxpdmVzIC0gMikgdGhpcy5wYWNtYW5zW2ldLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW9kZWwub24oJ2NoYW5nZTpsaXZlcycsIHRoaXMucmVuZGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpID4gdGhpcy5tb2RlbC5saXZlcyAtIDIpIHRoaXMucGFjbWFuc1tpXS5oaWRlKCk7XG4gICAgICAgICAgICBlbHNlIHRoaXMucGFjbWFuc1tpXS5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExpdmVzO1xuIiwiaW1wb3J0IFRpbGUgZnJvbSAnLi9UaWxlLmpzJztcblxuY2xhc3MgTWFwIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgICAgIC8qXG4gICAgICAgIGRhdGEgPSBbJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nLFxuICAgICAgICAgICAgICAgICc9PT09PT09PT09PT09PT09PT09PT09PT09PT09JyxcbiAgICAgICAgICAgICAgICAnPS4uLi4uLj09Li4uLi4uLi4uLj09Li4uLi4uPScsXG4gICAgICAgICAgICAgICAgJz0qPT09PS49PS49PT09PT09PS49PS49PT09Kj0nXVxuICAgICAgICAqL1xuICAgICAgICAvLyBTdG9yZSB0aWxlcyBpbiBhcnJheS5cbiAgICAgICAgdGhpcy50aWxlcyA9IFtdO1xuICAgICAgICAvLyBTZXQgd2l0aCBhbmQgaGVpZ2h0IGFjY29yZGluZyB0byBkYXRhLlxuICAgICAgICB0aGlzLndpZHRoID0gZGF0YVswXS5sZW5ndGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gZGF0YS5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy50dW5uZWxzID0gW107XG5cbiAgICAgICAgLy8gSW5zdGFudGlhdGUgdGlsZXMgYW5kIHN0b3JlIHRoZW0uXG4gICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgdmFyIHIgPSBkYXRhW3ldO1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY29kZSA9IHIuY2hhckF0KHgpO1xuICAgICAgICAgICAgICAgIHZhciB0aWxlID0gbmV3IFRpbGUoY29kZSwgeCwgeSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy50aWxlcy5wdXNoKHRpbGUpO1xuICAgICAgICAgICAgICAgIGlmICh0aWxlLmlzSG91c2UoKSAmJiAhdGhpcy5ob3VzZSkgeyAvLyBTdG9yZSBsZWZ0IGhvdXNlIGRvb3JcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3VzZSA9IHRpbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aWxlLmlzVHVubmVsKCkgJiYgKHRpbGUuY29sID09PSAwIHx8IHRpbGUuY29sID09PSB0aGlzLndpZHRoIC0gMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50dW5uZWxzLnB1c2godGlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ob3VzZUNlbnRlciA9IHRoaXMuaG91c2UuZ2V0RCgpLmdldEQoKTtcblxuICAgICAgICAvLyBDYWNoZSB0aWxlIGRpbWVuc2lvbnNcbiAgICAgICAgdGhpcy50aWxlV2lkdGggPSB0aGlzLnRpbGVzWzBdLndpZHRoO1xuICAgICAgICB0aGlzLnRpbGVIZWlnaHQgPSB0aGlzLnRpbGVzWzBdLmhlaWdodDtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gdGlsZSBvYmplY3QuXG4gICAgZ2V0VGlsZShjb2wsIHJvdywgaW5QaXhlbHMpIHtcbiAgICAgICAgaWYgKGluUGl4ZWxzKSB7XG4gICAgICAgICAgICBjb2wgPSBwYXJzZUludChjb2wgLyB0aGlzLnRpbGVXaWR0aCk7XG4gICAgICAgICAgICByb3cgPSBwYXJzZUludChyb3cgLyB0aGlzLnRpbGVIZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbCA+IHRoaXMud2lkdGggLSAxKSBjb2wgPSAwO1xuICAgICAgICBpZiAoY29sIDwgMCkgY29sID0gdGhpcy53aWR0aCAtIDE7XG4gICAgICAgIGlmIChyb3cgPiB0aGlzLmhlaWdodCAtIDEpIHJvdyA9IDA7XG4gICAgICAgIGlmIChyb3cgPCAwKSByb3cgPSB0aGlzLmhlaWdodCAtIDE7XG5cbiAgICAgICAgdmFyIGlkeCA9IChyb3cgKiB0aGlzLndpZHRoKSArIGNvbDtcblxuICAgICAgICByZXR1cm4gdGhpcy50aWxlc1tpZHhdIHx8IG51bGw7XG4gICAgfVxuXG4gICAgZGVzdHJveUl0ZW1zKCkge1xuICAgICAgICB2YXIgaSA9IHRoaXMudGlsZXMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICB2YXIgdCA9IHRoaXMudGlsZXNbaV07XG4gICAgICAgICAgICBpZiAodC5pdGVtKSB0Lml0ZW0uZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZUl0ZW1zKCkge1xuICAgICAgICB2YXIgaSA9IHRoaXMudGlsZXMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICB2YXIgdCA9IHRoaXMudGlsZXNbaV07XG4gICAgICAgICAgICBpZiAodC5pdGVtKSB0Lml0ZW0uaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNYXA7XG4iLCJpbXBvcnQgQW5pbWF0aW9uLCB7IEFOSU1BVElPTl9IT1JJWk9OVEFMIH0gZnJvbSAnLi9lbmdpbmUvQW5pbWF0aW9uJztcbmltcG9ydCBDaGFyYWN0ZXIgZnJvbSAnLi9DaGFyYWN0ZXIuanMnO1xuXG5jb25zdCBhbmltYXRpb25CYXNlID0ge1xuICAgIGltYWdlVVJMIDogJ2ltZy9jaGFyYWN0ZXJzMS5wbmcnLFxuICAgIG51bWJlck9mRnJhbWUgOiAxLFxuICAgIGRlbHRhIDogNjQsXG4gICAgcmVmcmVzaFJhdGUgOiA2MCxcbiAgICBvZmZzZXRZIDogNjAsXG4gICAgdHlwZSA6IEFOSU1BVElPTl9IT1JJWk9OVEFMXG59O1xuXG5jb25zdCBhbmltYXRpb25zID0ge1xuICAgICdyaWdodCcgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgLi4uYW5pbWF0aW9uQmFzZVxuICAgIH0pLFxuXG4gICAgJ2Rvd24nIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgIG9mZnNldFggOiA2NCAqIDRcbiAgICB9KSxcblxuICAgICd1cCcgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgb2Zmc2V0WCA6IDY0ICogOFxuICAgIH0pLFxuXG4gICAgJ2xlZnQnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgIG9mZnNldFggOiA2NCAqIDEyXG4gICAgfSlcbn07XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICAgIGFuaW1hdGlvbnMsXG4gICAgZGlyIDogJ2wnLFxuICAgIGRlZmF1bHRBbmltYXRpb24gOiAnbGVmdCcsXG4gICAgcHJldHVybiA6IHRydWUsXG4gICAgZnJpZ2h0ZW5lZFNwZWVkIDogbnVsbCxcbiAgICBmcmlnaHRlbmVkRG90U3BlZWQgOiBudWxsLFxuICAgIGRvdFNwZWVkIDogbnVsbFxufTtcblxuY2xhc3MgUGFjbWFuIGV4dGVuZHMgQ2hhcmFjdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGRlZmF1bHRzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5IGluIG9wdGlvbnMpIHRoaXNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgYWRkR2FtZUdob3N0RWF0RXZlbnRMaXN0ZW5lcixcbiAgICAgICAgICAgIGFkZEdhbWVHaG9zdE1vZGVGcmlnaHRlbmVkRW50ZXIsXG4gICAgICAgICAgICBhZGRHYW1lR2hvc3RNb2RlRnJpZ2h0ZW5lZEV4aXRcbiAgICAgICAgfSA9IG9wdGlvbnM7XG5cbiAgICAgICAgdGhpcy5fZ2hvc3RGcmlnaHRlbmVkID0gMDtcblxuICAgICAgICAvLyBDaGFuZ2UgdGlsZS4gU2V0IGRpcmVjdGlvbi5cbiAgICAgICAgdGhpcy5vbignaXRlbTp0aWxlJywgKHRpbGUpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9naG9zdEZyaWdodGVuZWQpIHRoaXMuX3NwZWVkID0gdGhpcy5mcmlnaHRlbmVkU3BlZWQ7XG4gICAgICAgICAgICBlbHNlIHRoaXMuX3NwZWVkID0gdGhpcy5zcGVlZDtcblxuICAgICAgICAgICAgaWYgKHRpbGUuaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmICh0aWxlLmhhc1BpbGwoKSkgeyAvLyBQaWxsIVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2l0ZW06ZWF0cGlsbCcsIHRpbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aWxlLmhhc0RvdCgpKSB7IC8vIERvdCFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdpdGVtOmVhdGRvdCcsIHRpbGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZ2hvc3RGcmlnaHRlbmVkKSB0aGlzLl9zcGVlZCA9IHRoaXMuZnJpZ2h0ZW5lZERvdFNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHRoaXMuX3NwZWVkID0gdGhpcy5kb3RTcGVlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGlsZS5pdGVtLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aWxlLml0ZW0gPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFkZEdhbWVHaG9zdEVhdEV2ZW50TGlzdGVuZXIoZ2hvc3QgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZWF0ZW5UdXJucyA9IDk7XG4gICAgICAgICAgICB0aGlzLmRpciA9ICdyJztcbiAgICAgICAgICAgIHRoaXMucGF1c2VBbmltYXRpb24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYWRkR2FtZUdob3N0TW9kZUZyaWdodGVuZWRFbnRlcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9naG9zdEZyaWdodGVuZWQrKztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYWRkR2FtZUdob3N0TW9kZUZyaWdodGVuZWRFeGl0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2dob3N0RnJpZ2h0ZW5lZC0tO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgQ2hhcmFjdGVyLnByb3RvdHlwZS5yZXNldC5hcHBseSh0aGlzKTtcbiAgICAgICAgdGhpcy5fbGFzdEVhdGVuVHVybnNUaW1lID0gbnVsbDtcbiAgICB9XG5cbiAgICBtb3ZlKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2VhdGVuVHVybnMpIENoYXJhY3Rlci5wcm90b3R5cGUubW92ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBlbHNlIGlmICghdGhpcy5fZWF0ZW5UdXJuc0ZyYW1lcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2VhdGVuVHVybnMgPT09IDkpIHRoaXMuZW1pdCgnaXRlbTpkaWUnKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9lYXRlblR1cm5zID4gMikge1xuICAgICAgICAgICAgICAgIHZhciBkaXJlY3Rpb25zID0geydkJyA6ICdsJywgJ2wnIDogJ3UnLCAndScgOiAncicsICdyJyA6ICdkJ307XG4gICAgICAgICAgICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb25zW3RoaXMuZGlyXTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE5leHRBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VhdGVuVHVybnNGcmFtZXMgPSA1O1xuICAgICAgICAgICAgfSBlbHNlIHRoaXMuX2VhdGVuVHVybnNGcmFtZXMgPSAyNTtcblxuICAgICAgICAgICAgdGhpcy5fZWF0ZW5UdXJucy0tO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fZWF0ZW5UdXJucyA9PT0gMCkgdGhpcy5lbWl0KCdpdGVtOmxpZmUnKTtcblxuICAgICAgICB9IGVsc2UgdGhpcy5fZWF0ZW5UdXJuc0ZyYW1lcy0tO1xuICAgIH1cblxufTtcblxuT2JqZWN0LmFzc2lnbihQYWNtYW4ucHJvdG90eXBlLCBkZWZhdWx0cyk7XG5cbmV4cG9ydCBkZWZhdWx0IFBhY21hbjtcbiIsImltcG9ydCBTb3VuZCBmcm9tICcuL2VuZ2luZS9Tb3VuZCc7XG5cbmNsYXNzIFNvdW5kTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLnNvdW5kRW5hYmxlZCA9ICEhb3B0aW9ucy5zb3VuZEVuYWJsZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMuc291bmRFbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kcyA9IHtcbiAgICAgICAgICAgICAgICBpbnRybyA6IG5ldyBTb3VuZCgnYXVkaW8vaW50cm8ubXAzJyksXG4gICAgICAgICAgICAgICAgYmFjayA6IG5ldyBTb3VuZCgnYXVkaW8vYmFjay5tcDMnKSxcbiAgICAgICAgICAgICAgICBkb3QgOiBuZXcgU291bmQoJ2F1ZGlvL2RvdC5tcDMnKSxcbiAgICAgICAgICAgICAgICBlYXRlbiA6IG5ldyBTb3VuZCgnYXVkaW8vZWF0ZW4ubXAzJyksXG4gICAgICAgICAgICAgICAgZWF0IDogbmV3IFNvdW5kKCdhdWRpby9lYXQubXAzJyksXG4gICAgICAgICAgICAgICAgZnJpZ2h0ZW5lZCA6IG5ldyBTb3VuZCgnYXVkaW8vZnJpZ2h0ZW5lZC5tcDMnKSxcbiAgICAgICAgICAgICAgICBkZWFkIDogbmV3IFNvdW5kKCdhdWRpby9kZWFkLm1wMycpLFxuICAgICAgICAgICAgICAgIGJvbnVzIDogbmV3IFNvdW5kKCdhdWRpby9ib251cy5tcDMnKSxcbiAgICAgICAgICAgICAgICBsaWZlIDogbmV3IFNvdW5kKCdhdWRpby9saWZlLm1wMycpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnNvdW5kcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuYWRkU291bmQodGhpcy5zb3VuZHNba2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBsYXkobGFiZWwpIHtcbiAgICAgICAgaWYgKHRoaXMuc291bmRFbmFibGVkKSB0aGlzLnNvdW5kc1tsYWJlbF0ucGxheSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU291bmRNYW5hZ2VyO1xuIiwiY2xhc3MgVGlsZSB7XG4gICAgY29uc3RydWN0b3IoY29kZSwgY29sLCByb3csIG1hcCkgIHtcbiAgICAgICAgdGhpcy5jb2RlID0gY29kZTtcblxuICAgICAgICB0aGlzLmNvbCA9IGNvbDtcbiAgICAgICAgdGhpcy5yb3cgPSByb3c7XG5cbiAgICAgICAgdGhpcy5tYXAgPSBtYXA7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IDMyO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDMyO1xuXG4gICAgICAgIHRoaXMueCA9IHRoaXMuY29sICogdGhpcy53aWR0aCArIHRoaXMud2lkdGggLyAyO1xuXG4gICAgICAgIHRoaXMueSA9IHRoaXMucm93ICogdGhpcy5oZWlnaHQgKyB0aGlzLmhlaWdodCAvIDIgKyA0OyAvLyBPcmlnaW5hbCBQYWNtYW4gaGFzIHRpbGUncyBjZW50ZXIgYXQgeCA6IDQsIHkgOiA1IHBvc2l0aW9uLlxuICAgIH1cblxuICAgIGlzV2FsbCgpIHsgcmV0dXJuIHRoaXMuY29kZSA9PT0gJz0nOyB9XG5cbiAgICBpc0hvdXNlKCkgeyByZXR1cm4gdGhpcy5jb2RlID09PSAnaCc7IH1cblxuICAgIGlzVHVubmVsKCkgeyByZXR1cm4gdGhpcy5jb2RlID09PSAndCc7IH1cblxuICAgIGhhc0RvdCgpIHsgcmV0dXJuIHRoaXMuaXRlbSAmJiB0aGlzLmNvZGUgPT09ICcuJzsgfVxuXG4gICAgaGFzUGlsbCgpIHsgcmV0dXJuIHRoaXMuaXRlbSAmJiB0aGlzLmNvZGUgPT09ICcqJzsgfVxuXG4gICAgZ2V0KGRpcikge1xuICAgICAgICBpZiAoZGlyID09PSAndScpIHJldHVybiB0aGlzLmdldFUoKTtcbiAgICAgICAgaWYgKGRpciA9PT0gJ2QnKSByZXR1cm4gdGhpcy5nZXREKCk7XG4gICAgICAgIGlmIChkaXIgPT09ICdsJykgcmV0dXJuIHRoaXMuZ2V0TCgpO1xuICAgICAgICBpZiAoZGlyID09PSAncicpIHJldHVybiB0aGlzLmdldFIoKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZ2V0VSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmdldFRpbGUodGhpcy5jb2wsIHRoaXMucm93IC0gMSkgfHwgbnVsbDtcbiAgICB9XG5cbiAgICBnZXREKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuZ2V0VGlsZSh0aGlzLmNvbCwgdGhpcy5yb3cgKyAxKSB8fCBudWxsO1xuICAgIH1cblxuICAgIGdldEwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5nZXRUaWxlKHRoaXMuY29sIC0gMSwgdGhpcy5yb3cpIHx8IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0UigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmdldFRpbGUodGhpcy5jb2wgKyAxLCB0aGlzLnJvdykgfHwgbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRpbGU7XG4iLCJleHBvcnQgY29uc3QgQU5JTUFUSU9OX1ZFUlRJQ0FMID0gMTsgLy8gR2VuZXJhdGVkIGJ5IGEgdmVydGljYWwgb2Zmc2V0IG9mIHRoZSBiYWNrZ3JvdW5kXG5leHBvcnQgY29uc3QgQU5JTUFUSU9OX0hPUklaT05UQUwgPSAyOyAvLyBHZW5lcmF0ZWQgYnkgYSBob3Jpem9udGFsIG9mZnNldCBvZiB0aGUgYmFja2dyb3VuZFxuZXhwb3J0IGNvbnN0IEFOSU1BVElPTl9PTkNFID0gNDsgLy8gUGxheWVkIG9ubHkgb25jZSAoZWxzZSBsb29waW5nIGluZGVmaW5pdGVseSlcbmV4cG9ydCBjb25zdCBBTklNQVRJT05fQ0FMTEJBQ0sgPSA4OyAvLyBBIGNhbGxiYWNrIGlzIGV4ZWN0dWVkIGF0IHRoZSBlbmQgb2YgYSBjeWNsZVxuZXhwb3J0IGNvbnN0IEFOSU1BVElPTl9QSU5HUE9ORyA9IDMyOyAvLyBBdCB0aGUgbGFzdCBmcmFtZSBvZiB0aGUgYW5pbWF0aW9uIGl0IHJldmVyc2VzIChpZiB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggT05DRSBpdCB3aWxsIGhhdmUgbm8gZWZmZWN0KVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgICAvLyBUaGUgdXJsIG9mIHRoZSBpbWFnZSB0byBiZSB1c2VkIGFzIGFuIGFuaW1hdGlvbiBvciBzcHJpdGVcbiAgICBpbWFnZVVSTCA6IG51bGwsXG4gICAgLy8gVGhlIG51bWJlciBvZiBmcmFtZXMgdG8gYmUgZGlzcGxheWVkIHdoZW4gcGxheWluZyB0aGUgYW5pbWF0aW9uXG4gICAgbnVtYmVyT2ZGcmFtZSA6IDEsXG4gICAgLy8gVGhlIGRpc3RhbmNlIGluIHBpeGVscyBiZXR3ZWVuIHR3byBmcmFtZXNcbiAgICBkZWx0YSA6IDAsXG4gICAgLy8gVGhlIHJhdGUgYXQgd2hpY2ggdGhlIGZyYW1lcyBjaGFuZ2UgaW4gbWlsaXNlY29uZHNcbiAgICByZWZyZXNoUmF0ZSA6IDMwLFxuICAgIC8vIFRoZSB0eXBlIG9mIHRoZSBhbmltYXRpb24uVGhpcyBpcyBhIGJpdHdpc2UgT1Igb2YgdGhlIHByb3BlcnRpZXMuXG4gICAgdHlwZSA6IDAsXG4gICAgLy8gVGhlIHggY29vcmRpbmF0ZSB3aGVyZSB0aGUgZmlyc3Qgc3ByaXRlIGJlZ2luc1xuICAgIG9mZnNldFggOiAwLFxuICAgIC8vIFRoZSB5IGNvb3JkaW5hdGUgd2hlcmUgdGhlIGZpcnN0IHNwcml0ZSBiZWdpbnNcbiAgICBvZmZzZXRZIDogMFxufTtcblxuY2xhc3MgQW5pbWF0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGRlZmF1bHRzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gb3B0aW9ucykgdGhpc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkKCkge1xuICAgICAgICB0aGlzLmltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmltZy5zcmMgPSB0aGlzLmltYWdlVVJMO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgcmVzb2x2ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlzUmVhZHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmltZy5jb21wbGV0ZTtcbiAgICB9XG59XG5cbk9iamVjdC5hc3NpZ24oQW5pbWF0aW9uLnByb3RvdHlwZSwgZGVmYXVsdHMpO1xuXG5leHBvcnQgZGVmYXVsdCBBbmltYXRpb247XG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAncmFzdGknO1xuXG5pbXBvcnQgS2V5Ym9hcmQgZnJvbSAnLi9LZXlib2FyZCc7XG5pbXBvcnQgVG91Y2ggZnJvbSAnLi9Ub3VjaCc7XG5pbXBvcnQgU2NhbGluZyBmcm9tICcuL1NjYWxpbmcnO1xuXG4vLyBHYW1lIHN0YXRlc1xuZXhwb3J0IGNvbnN0IFNUQVRFX05FVyA9IDA7XG5leHBvcnQgY29uc3QgU1RBVEVfUlVOTklORyA9IDE7XG5leHBvcnQgY29uc3QgU1RBVEVfUEFVU0VEID0gMjtcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgaGVpZ2h0IDogMzIwLFxuICAgIHdpZHRoIDogNDgwLFxuICAgIG9yaWdpbmFsSGVpZ2h0IDogMzIwLFxuICAgIG9yaWdpbmFsV2lkdGggOiA0ODAsXG4gICAgcmVmcmVzaFJhdGUgOiAzMCxcbiAgICBwb3NpdGlvbiA6ICdhYnNvbHV0ZSdcbn07XG5cbmNsYXNzIEdhbWUgZXh0ZW5kcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGRlZmF1bHRzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gb3B0aW9ucykgdGhpc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNwcml0ZXMgPSB0aGlzLmNoaWxkcmVuOyAvLyBMaXN0IG9mIHNwcml0ZXMgd2l0aCBhbmltYXRpb25zIC8gaW1hZ2VzIHVzZWQgaW4gdGhlIGdhbWVcbiAgICAgICAgdGhpcy5zb3VuZHMgPSBbXTsgLy8gTGlzdCBvZiBzb3VuZHMgdXNlZCBpbiB0aGUgZ2FtZVxuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdOyAvLyBMaXN0IG9mIHRoZSBmdW5jdGlvbnMgY2FsbGVkIGF0IGVhY2ggcmVmcmVzaFxuICAgICAgICB0aGlzLmxvYWRlZFNwcml0ZXNJbmRleCA9IDA7IC8vIEtlZXAgdHJhY2sgb2YgdGhlIGxhc3QgbG9hZGVkIGFuaW1hdGlvblxuICAgICAgICB0aGlzLmxvYWRlZFNvdW5kc0luZGV4ID0gMDsgLy8gS2VlcCB0cmFjayBvZiB0aGUgbGFzdCBsb2FkZWQgc291bmRcblxuICAgICAgICB0aGlzLmtleWJvYXJkID0gbmV3IEtleWJvYXJkKCk7XG4gICAgICAgIHRoaXMudG91Y2ggPSBuZXcgVG91Y2goKTtcblxuICAgICAgICB0aGlzLnNjYWxpbmcgPSBuZXcgU2NhbGluZyh0aGlzLm9yaWdpbmFsV2lkdGgsIHRoaXMub3JpZ2luYWxIZWlnaHQpO1xuICAgICAgICB0aGlzLnNjYWxpbmcucmVzaXplKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblxuICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfTkVXO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgc3VwZXIucmVuZGVyKCk7XG5cbiAgICAgICAgLy8gV2UgaW5pdGlhbGl6ZSB0aGUgZGlzcGxheSBvZiB0aGUgZGl2XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5lbC5zdHlsZSwge1xuICAgICAgICAgICAgcG9zaXRpb24gOiB0aGlzLnBvc2l0aW9uLFxuICAgICAgICAgICAgZGlzcGxheSA6ICdibG9jaycsXG4gICAgICAgICAgICBvdmVyZmxvdyA6ICdoaWRkZW4nLFxuICAgICAgICAgICAgaGVpZ2h0IDogYCR7dGhpcy5zY2FsaW5nLmhlaWdodH1weGAsXG4gICAgICAgICAgICB3aWR0aCA6IGAke3RoaXMuc2NhbGluZy53aWR0aH1weGAsXG4gICAgICAgICAgICBmb250U2l6ZSA6IGAke3RoaXMuc2NhbGluZy5nZXRGYWN0b3IoKSAqIDJ9ZW1gXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2NlbmVncmFwaCA9IHRoaXMuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAgICAgc3R5bGUgOiAndmlzaWJpbGl0eTogaGlkZGVuOydcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLnNjZW5lZ3JhcGgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5rZXlib2FyZC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMudG91Y2guZGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgcmVzb3VyY2VzIGJlZm9yZSBzdGFydGluZyB0aGUgZ2FtZS5cbiAgICAgKi9cbiAgICBwcmVsb2FkKCkge1xuICAgICAgICAvLyBTdGFydCBsb2FkaW5nIHRoZSBpbWFnZXNcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc3ByaXRlcy5sZW5ndGggLSAxOyBpID49IHRoaXMubG9hZGVkU3ByaXRlc0luZGV4OyBpLS0pIHtcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlc1tpXS5sb2FkKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdGFydCBsb2FkaW5nIHRoZSBzb3VuZHNcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc291bmRzLmxlbmd0aCAtIDEgOyBpID49IHRoaXMubG9hZGVkU291bmRzSW5kZXg7IGktLSl7XG4gICAgICAgICAgICB0aGlzLnNvdW5kc1tpXS5sb2FkKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndhaXRGb3JSZXNvdXJjZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXYWl0IGZvciBhbGwgdGhlIHJlc291cmNlcyBjYWxsZWQgZm9yIGluIHByZWxvYWQoKSB0byBmaW5pc2ggbG9hZGluZy5cbiAgICAgKi9cbiAgICB3YWl0Rm9yUmVzb3VyY2VzKCkge1xuICAgICAgICAvLyBDaGVjayB0aGUgaW1hZ2VzXG4gICAgICAgIGxldCBzcHJpdGVDb3VudCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmxvYWRlZFNwcml0ZXNJbmRleDsgaSA8IHRoaXMuc3ByaXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3ByaXRlc1tpXS5pc1JlYWR5KCkpIHtcbiAgICAgICAgICAgICAgICBzcHJpdGVDb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIENoZWNrIHRoZSBzb3VuZHNcbiAgICAgICAgbGV0IHNvdW5kQ291bnQgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5sb2FkZWRTb3VuZHNJbmRleDsgaSA8IHRoaXMuc291bmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zb3VuZHNbaV0uaXNSZWFkeSgpKSB7XG4gICAgICAgICAgICAgICAgc291bmRDb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdCA9IHRoaXMuc3ByaXRlcy5sZW5ndGggKyB0aGlzLnNvdW5kcy5sZW5ndGggLSB0aGlzLmxvYWRlZFNwcml0ZXNJbmRleCAtIHRoaXMubG9hZGVkU291bmRzSW5kZXg7XG5cbiAgICAgICAgLy8gQ2FsbCB0aGUgbG9hZCBjYWxsYmFjayB3aXRoIHRoZSBjdXJyZW50IHByb2dyZXNzXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vbkxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgbGV0IHBlcmNlbnQgPSAoc3ByaXRlQ291bnQgKyBzb3VuZENvdW50KSAvIHJlc3QgKiAxMDA7XG4gICAgICAgICAgICB0aGlzLm9uTG9hZFByb2dyZXNzKHBlcmNlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNwcml0ZUNvdW50ICsgc291bmRDb3VudCA8IHJlc3QpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy53YWl0Rm9yUmVzb3VyY2VzLmJpbmQodGhpcyksIDEwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRlZFNwcml0ZXNJbmRleCA9IHRoaXMuc3ByaXRlcy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLmxvYWRlZFNvdW5kc0luZGV4ID0gdGhpcy5zb3VuZHMubGVuZ3RoO1xuXG4gICAgICAgICAgICAvLyBMYXVuY2ggdGhlIHJlZnJlc2ggbG9vcFxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IFNUQVRFX05FVyl7XG4gICAgICAgICAgICAgICAgc2V0SW50ZXJ2YWwodGhpcy5yZWZyZXNoLmJpbmQodGhpcyksIHRoaXMucmVmcmVzaFJhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUlVOTklORztcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9vblJlYWR5Q2FsbGJhY2sgPT09ICdmdW5jdGlvbicpe1xuICAgICAgICAgICAgICAgIHRoaXMuX29uUmVhZHlDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIHRoaXMuX29uUmVhZHlDYWxsYmFjayA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBNYWtlIHRoZSBzY2VuZWdyYXBoIHZpc2libGVcbiAgICAgICAgICAgIHRoaXMuc2NlbmVncmFwaC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIHNwcml0ZS5cbiAgICAgKi9cbiAgICBhZGRTcHJpdGUoc3ByaXRlKSB7XG4gICAgICAgIHRoaXMuc2NlbmVncmFwaC5hcHBlbmRDaGlsZCh0aGlzLmFkZENoaWxkKHNwcml0ZSkuZWwpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBTVEFURV9SVU5OSU5HID9cbiAgICAgICAgICAgIHNwcml0ZS5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZWRTcHJpdGVzSW5kZXgrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICB9KSA6XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEgc291bmQuXG4gICAgICovXG4gICAgYWRkU291bmQoc291bmQpIHtcbiAgICAgICAgdGhpcy5zb3VuZHMucHVzaChzb3VuZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBTVEFURV9SVU5OSU5HID9cbiAgICAgICAgICAgIHNvdW5kLmxvYWQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZFNvdW5kc0luZGV4Kys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSkgOlxuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGEgY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiB0aGUgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IHJhdGUgdGhlIHJhdGUgaW4gbXMgYXQgd2hpY2ggdGhlIGNhbGxiYWNrIHNob3VsZCBiZSBjYWxsZWQgKHNob3VsZCBiZSBhIG11bHRpcGxlIG9mIHRoZSBwbGF5Z3JvdW5kIHJhdGUgb3Igd2lsbCBiZSByb3VuZGVkKVxuICAgICAqL1xuICAgIGFkZENhbGxiYWNrKGNhbGxiYWNrLCByZWZyZXNoUmF0ZSA9IHRoaXMucmVmcmVzaFJhdGUpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaCh7IGZuIDogY2FsbGJhY2ssIHJlZnJlc2hSYXRlIDogdGhpcy5ub3JtYWxpemVSZWZyYXNoUmF0ZShyZWZyZXNoUmF0ZSksIGlkbGVDb3VudGVyIDogMCB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHBlcmlvZGljYWxseSB0byByZWZyZXNoIHRoZSBzdGF0ZSBvZiB0aGUgZ2FtZS5cbiAgICAgKi9cbiAgICByZWZyZXNoKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gU1RBVEVfUlVOTklORykge1xuICAgICAgICAgICAgdGhpcy5zcHJpdGVzLmZvckVhY2goc3ByaXRlID0+IHsgc3ByaXRlLnJlZnJlc2goKSB9KTtcblxuICAgICAgICAgICAgdmFyIGRlYWRDYWxsYmFja3MgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmNhbGxiYWNrcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhbGxiYWNrc1tpXS5pZGxlQ291bnRlciA9PT0gdGhpcy5jYWxsYmFja3NbaV0ucmVmcmVzaFJhdGUgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5jYWxsYmFja3NbaV0uZm4oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIGhhdmUgYSBib29sZWFuOiAndHJ1ZScgbWVhbnMgJ25vIG1vcmUgZXhlY3V0aW9uJywgJ2ZhbHNlJyBtZWFucyAna2VlcCBvbiBleGVjdXRpbmcnXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWFkQ2FsbGJhY2tzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIG51bWJlciBpdCByZS1kZWZpbmVzIHRoZSB0aW1lIHRvIHRoZSBuZXh0IGNhbGxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzW2ldLnJlZnJlc2hSYXRlID0gdGhpcy5ub3JtYWxpemVSZWZyYXNoUmF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrc1tpXS5pZGxlQ291bnRlciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3NbaV0uaWRsZUNvdW50ZXIgPSAodGhpcy5jYWxsYmFja3NbaV0uaWRsZUNvdW50ZXIgKyAxKSAlIHRoaXMuY2FsbGJhY2tzW2ldLnJlZnJlc2hSYXRlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gZGVhZENhbGxiYWNrcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3Muc3BsaWNlKGRlYWRDYWxsYmFja3NbaV0sIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFyIHRoZSBhbmltYXRpb25zIGFuZCBzb3VuZHMuXG4gICAgICovXG4gICAgY2xlYXIoY2xlYXJDYWxsYmFja3MpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95Q2hpbGRyZW4oKTtcbiAgICAgICAgdGhpcy5sb2FkZWRTcHJpdGVzSW5kZXggPSAwO1xuICAgICAgICB0aGlzLnNvdW5kcyA9IFtdO1xuICAgICAgICB0aGlzLmxvYWRlZFNvdW5kc0luZGV4ID0gMDtcbiAgICAgICAgaWYgKGNsZWFyQ2FsbGJhY2tzKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2NlbmVncmFwaC5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gICAgLyoqXG4gICAgKiBNdXRlIChvciB1bm11dGUpIGFsbCB0aGUgc291bmRzLlxuICAgICovXG4gICAgbXV0ZVNvdW5kKG11dGVkKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnNvdW5kcy5sZW5ndGggLSAxIDsgaSA+PSAwOyBpIC0tKSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kc1tpXS5tdXRlKG11dGVkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIFN0YXJ0cyB0aGUgZ2FtZS5cbiAgICAqL1xuICAgIHN0YXJ0KGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHRoaXMuX29uUmVhZHlDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVE9ET1xuICAgICAqL1xuICAgIHBhdXNlKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUEFVU0VEO1xuICAgICAgICB0aGlzLnNjZW5lZ3JhcGguc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXN1bWUgdGhlIGdhbWUgaWYgaXQgd2FzIHBhdXNlZCBhbmQgY2FsbCB0aGUgY2FsbGJhY2sgcGFzc2VkIGluIGFyZ3VtZW50IG9uY2UgdGhlIG5ld2x5IGFkZGVkIHJlc3NvdXJjZXMgYXJlIGxvYWRlZC5cbiAgICAgKi9cbiAgICByZXN1bWUoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IFNUQVRFX1BBVVNFRCl7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB0aGlzLl9vblJlYWR5Q2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbm9ybWFsaXplUmVmcmFzaFJhdGUocmF0ZSkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChyYXRlIC8gdGhpcy5yZWZyZXNoUmF0ZSkgfHwgMTtcbiAgICB9XG59XG5cbk9iamVjdC5hc3NpZ24oR2FtZS5wcm90b3R5cGUsIGRlZmF1bHRzKTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tICdyYXN0aSc7XG5cbmV4cG9ydCBjb25zdCBLRVlfVVAgPSAzODtcbmV4cG9ydCBjb25zdCBLRVlfUklHSFQgPSAzOTtcbmV4cG9ydCBjb25zdCBLRVlfRE9XTiA9IDQwO1xuZXhwb3J0IGNvbnN0IEtFWV9MRUZUID0gMzc7XG5cbmV4cG9ydCBjb25zdCBFVkVOVF9LRVlfVVAgPSAna2V5dXAnO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0tFWV9ET1dOID0gJ2tleWRvd24nO1xuXG5jbGFzcyBLZXlib2FyZCBleHRlbmRzIFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgZWwgOiBkb2N1bWVudCAmJiBkb2N1bWVudC5ib2R5LFxuICAgICAgICAgICAgLi4ub3B0aW9uc1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmtleXMgPSB7fTtcbiAgICB9XG5cbiAgICBvbktleVVwKGV2ZW50KSB7XG4gICAgICAgIHRoaXMua2V5c1tldmVudC5rZXlDb2RlXSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVtaXQoRVZFTlRfS0VZX1VQLCBldmVudCk7XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHRoaXMua2V5c1tldmVudC5rZXlDb2RlXSA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1pdChFVkVOVF9LRVlfRE9XTiwgZXZlbnQpO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmtleXMgPSB7fTtcbiAgICB9XG59XG5cbktleWJvYXJkLnByb3RvdHlwZS5ldmVudHMgPSB7XG4gICAga2V5dXAgOiAnb25LZXlVcCcsXG4gICAga2V5ZG93biA6ICdvbktleURvd24nXG59O1xuXG5leHBvcnQgZGVmYXVsdCBLZXlib2FyZDtcbiIsImltcG9ydCB7IE1vZGVsIH0gZnJvbSAncmFzdGknO1xuXG5jbGFzcyBNb2RlbExvY2FsU3RvcmFnZSBleHRlbmRzIE1vZGVsIHtcbiAgICBjb25zdHJ1Y3RvcihhdHRycykge1xuICAgICAgICBzdXBlcihhdHRycyk7XG4gICAgfVxuXG4gICAgZmV0Y2goKSB7XG4gICAgICAgIGlmICh0aGlzLnVybCAmJiB3aW5kb3cubG9jYWxTdG9yYWdlKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMudXJsKTtcbiAgICAgICAgICAgIGlmIChpdGVtKSB0aGlzLnNldChKU09OLnBhcnNlKGl0ZW0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLnVybCAmJiB3aW5kb3cubG9jYWxTdG9yYWdlKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy51cmwsIEpTT04uc3RyaW5naWZ5KHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kZWxMb2NhbFN0b3JhZ2U7XG4iLCJcbmNsYXNzIFNjYWxpbmcge1xuICAgIGNvbnN0cnVjdG9yKHcsIGgpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFdpZHRoID0gdGhpcy53aWR0aCA9IHc7XG4gICAgICAgIHRoaXMub3JpZ2luYWxIZWlnaHQgPSB0aGlzLmhlaWdodCA9IGg7XG5cbiAgICAgICAgdGhpcy53aWR0aFRvSGVpZ2h0ID0gdyAvIGg7XG4gICAgfVxuXG4gICAgcmVzaXplKG5ld1dpZHRoLCBuZXdIZWlnaHQpIHtcbiAgICAgICAgY29uc3QgbmV3V2lkdGhUb0hlaWdodCA9IG5ld1dpZHRoIC8gbmV3SGVpZ2h0O1xuXG4gICAgICAgIGlmIChuZXdXaWR0aFRvSGVpZ2h0ID4gdGhpcy53aWR0aFRvSGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gbmV3SGVpZ2h0ICogdGhpcy53aWR0aFRvSGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBuZXdIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IG5ld1dpZHRoIC8gdGhpcy53aWR0aFRvSGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IG5ld1dpZHRoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RmFjdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aWR0aCAvIHRoaXMub3JpZ2luYWxXaWR0aDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjYWxpbmc7XG4iLCIvLyBTaW5nbGUgQXVkaW9Db250ZXh0IGZvciBhbGwgc291bmRzLlxubGV0IGF1ZGlvQ3R4O1xubGV0IGdhaW5Ob2RlO1xuXG4vLyBQb2x5ZmlsbCBkZWNvZGVBdWRpb0RhdGEgUHJvbWlzZS1iYXNlZCBzeW50YXggb24gc2FmYXJpLlxuY29uc3QgZGVjb2RlQXVkaW9EYXRhID0gKGFycmF5QnVmZmVyKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgYXVkaW9DdHguZGVjb2RlQXVkaW9EYXRhKGFycmF5QnVmZmVyLCByZXNvbHZlLCByZWplY3QpO1xufSk7XG5cbmNsYXNzIFNvdW5kIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwpIHtcbiAgICAgICAgaWYgKCFhdWRpb0N0eCkge1xuICAgICAgICAgICAgY29uc3QgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuICAgICAgICAgICAgYXVkaW9DdHggPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gICAgICAgICAgICBnYWluTm9kZSA9IGF1ZGlvQ3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgICAgIGdhaW5Ob2RlLmNvbm5lY3QoYXVkaW9DdHguZGVzdGluYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgfVxuXG4gICAgbG9hZCgpIHtcbiAgICAgICAgZmV0Y2godGhpcy51cmwpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4gZGVjb2RlQXVkaW9EYXRhKGFycmF5QnVmZmVyKSlcbiAgICAgICAgICAgIC50aGVuKGF1ZGlvQnVmZmVyID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvQnVmZmVyID0gYXVkaW9CdWZmZXJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGF1ZGlvQnVmZmVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBsYXkoKSB7XG4gICAgICAgIGlmIChhdWRpb0N0eC5zdGF0ZSA9PT0gJ3N1c3BlbmRlZCcpIHtcbiAgICAgICAgICAgIGF1ZGlvQ3R4LnJlc3VtZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHJhY2tTb3VyY2UgPSBhdWRpb0N0eC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgICAgdHJhY2tTb3VyY2UuYnVmZmVyID0gdGhpcy5hdWRpb0J1ZmZlcjtcbiAgICAgICAgdHJhY2tTb3VyY2UuY29ubmVjdChnYWluTm9kZSk7XG4gICAgICAgIHRyYWNrU291cmNlLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgbXV0ZShtdXRlZCkge1xuICAgICAgICAvLyBNdXRlZCBteSBkZWZhdWx0IHVubGVzcyBtdXRlZCA9PT0gZmFsc2UuXG4gICAgICAgIHRoaXMubXV0ZWQgPSBtdXRlZCAhPT0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMubXV0ZWQpIHtcbiAgICAgICAgICAgIGdhaW5Ob2RlLmdhaW4uc2V0VmFsdWVBdFRpbWUoMCwgYXVkaW9DdHguY3VycmVudFRpbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2Fpbk5vZGUuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgxLCBhdWRpb0N0eC5jdXJyZW50VGltZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1JlYWR5KCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLmF1ZGlvQnVmZmVyO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU291bmQ7XG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAncmFzdGknO1xuXG5pbXBvcnQge1xuICAgIEFOSU1BVElPTl9IT1JJWk9OVEFMLFxuICAgIEFOSU1BVElPTl9WRVJUSUNBTCxcbiAgICBBTklNQVRJT05fT05DRSxcbiAgICBBTklNQVRJT05fQ0FMTEJBQ0ssXG4gICAgQU5JTUFUSU9OX1BJTkdQT05HXG59IGZyb20gJy4vQW5pbWF0aW9uJztcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgd2lkdGggOiAzMixcbiAgICBoZWlnaHQgOiAzMixcbiAgICB4IDogMCxcbiAgICB5IDogMCxcbiAgICB6IDogMCxcbiAgICBvZmZzZXRYIDogMCxcbiAgICBvZmZzZXRZIDogMCxcbiAgICBpZGxlQ291bnRlciA6IDAsXG4gICAgY3VycmVudEZyYW1lIDogMCxcbiAgICBmcmFtZUluY3JlbWVudCA6IDEsXG4gICAgYW5nbGUgOiAwLFxuICAgIGZhY3RvciA6ICAxLFxuICAgIHBsYXlpbmcgOiB0cnVlLFxuICAgIGZhY3RvckggOiAxLFxuICAgIGZhY3RvclYgOiAxLFxuICAgIGFuaW1hdGlvbnMgOiB7fSxcbiAgICBkZWZhdWx0QW5pbWF0aW9uIDogJ2RlZmF1bHQnLFxuICAgIG5vcm1hbGl6ZVJlZnJhc2hSYXRlIDogbnVsbCxcbiAgICB0eXBlIDogbnVsbFxufTtcblxuY2xhc3MgU3ByaXRlIGV4dGVuZHMgVmlldyB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhkZWZhdWx0cykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5IGluIG9wdGlvbnMpIHRoaXNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZCgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5hbmltYXRpb25zKVxuICAgICAgICAgICAgICAgIC5tYXAobGFiZWwgPT4gdGhpcy5hbmltYXRpb25zW2xhYmVsXS5sb2FkKCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgaXNSZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuYW5pbWF0aW9ucylcbiAgICAgICAgICAgIC5zb21lKGxhYmVsID0+ICEhdGhpcy5hbmltYXRpb25zW2xhYmVsXS5pc1JlYWR5KCkpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmVsLnN0eWxlLCB7XG4gICAgICAgICAgICBwb3NpdGlvbiA6ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBvdmVyZmxvdyA6ICdoaWRkZW4nLFxuICAgICAgICAgICAgaGVpZ2h0IDogYCR7dGhpcy5oZWlnaHR9cHhgLFxuICAgICAgICAgICAgd2lkdGggOiBgJHt0aGlzLndpZHRofXB4YCxcbiAgICAgICAgICAgIHpJbmRleCA6IHRoaXMuelxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNldEFuaW1hdGlvbih0aGlzLmFuaW1hdGlvbnNbdGhpcy5kZWZhdWx0QW5pbWF0aW9uXSk7XG5cbiAgICAgICAgdGhpcy50cmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICByZWZyZXNoKCkge1xuICAgICAgICBpZiAoIXRoaXMuYW5pbWF0aW9uKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCh0aGlzLmlkbGVDb3VudGVyID09PSB0aGlzLm5vcm1hbGl6ZVJlZnJhc2hSYXRlKHRoaXMuYW5pbWF0aW9uLnJlZnJlc2hSYXRlKSAtIDEpICYmIHRoaXMucGxheWluZykge1xuICAgICAgICAgICAgLy8gRG9lcyAndGhpcycgbG9vcHM/XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24udHlwZSAmIEFOSU1BVElPTl9PTkNFKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudEZyYW1lIDwgdGhpcy5hbmltYXRpb24ubnVtYmVyT2ZGcmFtZSAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RnJhbWUgKz0gdGhpcy5mcmFtZUluY3JlbWVudDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudEZyYW1lID09IHRoaXMuYW5pbWF0aW9uLm51bWJlck9mRnJhbWUgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIERvZXMgJ3RoaXMnIGhhcyBhIGNhbGxiYWNrID9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLnR5cGUgJiBBTklNQVRJT05fQ0FMTEJBQ0spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLnR5cGUgJiBBTklNQVRJT05fUElOR1BPTkcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudEZyYW1lID09PSB0aGlzLmFuaW1hdGlvbi5udW1iZXJPZkZyYW1lIC0gMSAmJiB0aGlzLmZyYW1lSW5jcmVtZW50ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lSW5jcmVtZW50ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50RnJhbWUgPT09IDAgJiYgdGhpcy5mcmFtZUluY3JlbWVudCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVJbmNyZW1lbnQgPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RnJhbWUgPSAodGhpcy5jdXJyZW50RnJhbWUgKyB0aGlzLmZyYW1lSW5jcmVtZW50KSAlIHRoaXMuYW5pbWF0aW9uLm51bWJlck9mRnJhbWU7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50RnJhbWUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9lcyAndGhpcycgaGFzIGEgY2FsbGJhY2sgP1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmFuaW1hdGlvbi50eXBlICYgQU5JTUFUSU9OX0NBTExCQUNLKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBiYWNrZ3JvdW5kXG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubnVtYmVyT2ZGcmFtZSA+IDEpIHtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IDAsIHkgPSAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLnR5cGUgJiBBTklNQVRJT05fVkVSVElDQUwpIHtcbiAgICAgICAgICAgICAgICAgICAgeCA9IC10aGlzLmFuaW1hdGlvbi5vZmZzZXRYO1xuICAgICAgICAgICAgICAgICAgICB5ID0gLXRoaXMuYW5pbWF0aW9uLm9mZnNldFkgLSB0aGlzLmFuaW1hdGlvbi5kZWx0YSAqIHRoaXMuY3VycmVudEZyYW1lO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hbmltYXRpb24udHlwZSAmIEFOSU1BVElPTl9IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICAgICAgICAgIHggPSAtdGhpcy5hbmltYXRpb24ub2Zmc2V0WCAtIHRoaXMuYW5pbWF0aW9uLmRlbHRhICogdGhpcy5jdXJyZW50RnJhbWU7XG4gICAgICAgICAgICAgICAgICAgIHkgPSAtdGhpcy5hbmltYXRpb24ub2Zmc2V0WTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IGAke3h9cHggJHt5fXB4YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlkbGVDb3VudGVyID0gKHRoaXMuaWRsZUNvdW50ZXIgKyAxKSAlIHRoaXMubm9ybWFsaXplUmVmcmFzaFJhdGUodGhpcy5hbmltYXRpb24ucmVmcmVzaFJhdGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdG9wIHRoZSBhbmltYXRpb24gYXQgdGhlIGN1cnJlbnQgZnJhbWUuXG4gICAgICovXG4gICAgcGF1c2VBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMucGxheWluZyA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXN1bWUgdGhlIGFuaW1hdGlvbiAoaWYgcGF1c2VkKVxuXG4gICAgICovXG4gICAgcmVzdW1lQW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLnBsYXlpbmcgPSB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGFuZ2VzIHRoZSBhbmltYXRpb24gYXNzb2NpYXRlZCB3aXRoIGEgc3ByaXRlLlxuICAgICAqL1xuICAgIHNldEFuaW1hdGlvbihhbmltYXRpb24sIGluZGV4LCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IGFuaW1hdGlvbjtcblxuICAgICAgICB0aGlzLmN1cnJlbnRGcmFtZSA9IDA7XG4gICAgICAgIHRoaXMuZnJhbWVJbmNyZW1lbnQgPSAxO1xuXG4gICAgICAgIHRoaXMuZWwuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnJHthbmltYXRpb24uaW1hZ2VVUkx9JylgO1xuXG4gICAgICAgIGlmIChhbmltYXRpb24udHlwZSAmIEFOSU1BVElPTl9WRVJUSUNBTCkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gJ3JlcGVhdC14JztcbiAgICAgICAgfSBlbHNlIGlmIChhbmltYXRpb24udHlwZSAmIEFOSU1BVElPTl9IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSAncmVwZWF0LXknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gJ25vLXJlcGVhdCc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGlzdGFuY2VYID0gMDtcbiAgICAgICAgbGV0IGRpc3RhbmNlWSA9IDA7XG5cbiAgICAgICAgdGhpcy5lbC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSBgJHstZGlzdGFuY2VYIC0gYW5pbWF0aW9uLm9mZnNldFh9cHggJHstZGlzdGFuY2VZIC0gYW5pbWF0aW9uLm9mZnNldFl9cHhgO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpe1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEludGVybmFsIGZ1bmN0aW9uIGRvaW5nIHRoZSBjb21iaW5lZCBhY3Rpb25zIG9mIHJvdGF0ZSBhbmQgc2NhbGUuXG4gICAgICogUGxlYXNlIHVzZSAucm90YXRlKCkgb3IgLnNjYWxlKCkgaW5zdGVhZCBzaW5jZSB0aGV5IGFyZSBwYXJ0IG9mIHRoZSBzdXBwb3J0ZWQgQVBJIVxuICAgICAqL1xuICAgIHRyYW5zZm9ybSgpIHtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy54ICogdGhpcy5mYWN0b3IgLSB0aGlzLm9mZnNldFh9cHgsICR7dGhpcy55ICogdGhpcy5mYWN0b3IgLSB0aGlzLm9mZnNldFl9cHgpIHJvdGF0ZSgke3RoaXMuYW5nbGV9ZGVnKSBzY2FsZSgke3RoaXMuZmFjdG9yICogdGhpcy5mYWN0b3JIfSwgJHt0aGlzLmZhY3RvciAqIHRoaXMuZmFjdG9yVn0pYDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUm90YXRlIHRoZSBlbGVtZW50KHMpIGNsb2NrLXdpc2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYW5nbGUgdGhlIGFuZ2xlIGluIGRlZ3JlZXNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlbGF0aXZlIG9yIG5vdFxuICAgICAqL1xuICAgIHJvdGF0ZShhbmdsZSwgcmVsYXRpdmUpIHtcbiAgICAgICAgaWYgKHJlbGF0aXZlID09PSB0cnVlKXtcbiAgICAgICAgICAgIGFuZ2xlICs9IHRoaXMuYW5nbGU7XG4gICAgICAgICAgICBhbmdsZSAlPSAzNjA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFuZ2xlID0gcGFyc2VGbG9hdChhbmdsZSk7XG4gICAgICAgIHRoaXMudHJhbnNmb3JtKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoYW5nZSB0aGUgc2NhbGUgb2YgdGhlIHNlbGVjdGVkIGVsZW1lbnQocykuIFRoZSBwYXNzZWQgYXJndW1lbnQgaXMgYSByYXRpbzpcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBmYWN0b3IgYSByYXRpbzogMS4wID0gb3JpZ2luYWwgc2l6ZSwgMC41ID0gaGFsZiB0aGUgb3JpZ2luYWwgc2l6ZSBldGMuXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZWxhdGl2ZSBvciBub3RcbiAgICAgKi9cbiAgICBzY2FsZShmYWN0b3IsIHJlbGF0aXZlKSB7XG4gICAgICAgIGlmIChyZWxhdGl2ZSA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICBmYWN0b3IgKj0gdGhpcy5mYWN0b3I7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mYWN0b3IgPSBwYXJzZUZsb2F0KGZhY3Rvcik7XG4gICAgICAgIHRoaXMudHJhbnNmb3JtKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZsaXBzIHRoZSBlbGVtZW50KHMpIGhvcml6b250YWxseS5cbiAgICAgKi9cbiAgICBmbGlwSChmbGlwKSB7XG4gICAgICAgIGlmIChmbGlwID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5mYWN0b3JIICE9PSB1bmRlZmluZWQpID8gKHRoaXMuZmFjdG9ySCA9PT0gLTEpIDogZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoZmxpcCkge1xuICAgICAgICAgICAgdGhpcy5mYWN0b3JIID0gLTE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZhY3RvckggPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmFuc2Zvcm0oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmxpcHMgdGhlIGVsZW1lbnQocykgdmVydGljYWxseS5cbiAgICAgKi9cbiAgICBmbGlwVihmbGlwKXtcbiAgICAgICAgaWYgKGZsaXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmZhY3RvclYgIT09IHVuZGVmaW5lZCkgPyAodGhpcy5mYWN0b3JWID09PSAtMSkgOiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChmbGlwKSB7XG4gICAgICAgICAgICB0aGlzLmZhY3RvclYgPSAtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmFjdG9yViA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIHNldFhZWihvcHRpb25zLCByZWxhdGl2ZSkge1xuICAgICAgICBsZXQgdHJhbnNmb3JtID0gZmFsc2U7XG5cbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChjb29yZGluYXRlID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoY29vcmRpbmF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3gnOlxuICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMueCArPSB0aGlzLng7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy54ID0gb3B0aW9ucy54O1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3knOlxuICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMueSArPSB0aGlzLnk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ID0gb3B0aW9ucy55O1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3onOlxuICAgICAgICAgICAgICAgICAgICBpZihyZWxhdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy56ICs9IHRoaXMuejtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnogPSBvcHRpb25zLno7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuekluZGV4ID0gdGhpcy56O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRyYW5zZm9ybSkgdGhpcy50cmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBzZXRXSChvcHRpb25zLCByZWxhdGl2ZSkge1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKGNvb3JkaW5hdGUgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChjb29yZGluYXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAndyc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWxhdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy53ICs9IHRoaXMud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aWR0aCA9IG9wdGlvbnMudztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS53aWR0aCA9IGAke3RoaXMud2lkdGh9cHhgO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICBpZihyZWxhdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5oICs9IHRoaXMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gb3B0aW9ucy5oO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmhlaWdodCA9IGAke3RoaXMuaGVpZ2h0fXB4YDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuT2JqZWN0LmFzc2lnbihTcHJpdGUucHJvdG90eXBlLCBkZWZhdWx0cyk7XG5cbmV4cG9ydCBkZWZhdWx0IFNwcml0ZTtcbiIsIi8vIFJldHVybiB0aW1lIHN0YW1wIGluIHNlY29uZHMuXG5leHBvcnQgY29uc3QgdHMgPSAoKSA9PiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDA7XG5cbmNsYXNzIFRpbWVyIHtcbiAgICBjb25zdHJ1Y3Rvcih0aW1lKSB7XG4gICAgICAgIHRoaXMudGltZSA9IHRpbWU7XG4gICAgICAgIHRoaXMuc3RhcnQgPSB0cygpO1xuICAgIH1cblxuICAgIHBhdXNlKCkge1xuICAgICAgICB0aGlzLnBhdXNlVGltZSA9IHRzKCk7XG4gICAgfVxuXG4gICAgcmVzdW1lKCkge1xuICAgICAgICB0aGlzLnN0YXJ0ICs9IHRzKCkgLSB0aGlzLnBhdXNlVGltZTtcbiAgICB9XG5cbiAgICBnZXRFbGFwc2VkKCkge1xuICAgICAgICByZXR1cm4gdHMoKSAtIHRoaXMuc3RhcnQ7XG4gICAgfVxuXG4gICAgaXNFbGFwc2VkKHRpbWUgPSB0aGlzLnRpbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RWxhcHNlZCgpID4gdGltZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRpbWVyO1xuIiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJ3Jhc3RpJztcblxuZXhwb3J0IGNvbnN0IEVWRU5UX1NXSVBFID0gJ3N3aXBlJztcblxuZXhwb3J0IGNvbnN0IEVWRU5UX1NXSVBFX1VQID0gJ3N3aXBlOnVwJztcbmV4cG9ydCBjb25zdCBFVkVOVF9TV0lQRV9SSUdIVCA9ICdzd2lwZTpyaWdodCc7XG5leHBvcnQgY29uc3QgRVZFTlRfU1dJUEVfRE9XTiA9ICdzd2lwZTpkb3duJztcbmV4cG9ydCBjb25zdCBFVkVOVF9TV0lQRV9MRUZUID0gJ3N3aXBlOmxlZnQnO1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgICB0aHJlc2hvbGQgOiAxMDAsIC8vIHJlcXVpcmVkIG1pbiBkaXN0YW5jZSB0cmF2ZWxlZCB0byBiZSBjb25zaWRlcmVkIHN3aXBlXG4gICAgcmVzdHJhaW50IDogMTUwLCAvLyBtYXhpbXVtIGRpc3RhbmNlIGFsbG93ZWQgYXQgdGhlIHNhbWUgdGltZSBpbiBwZXJwZW5kaWN1bGFyIGRpcmVjdGlvblxuICAgIGFsbG93ZWRUaW1lIDogNDAwIC8vIG1heGltdW0gdGltZSBhbGxvd2VkIHRvIHRyYXZlbCB0aGF0IGRpc3RhbmNlXG59O1xuXG5jbGFzcyBUb3VjaCBleHRlbmRzIFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgZWwgOiBvcHRpb25zLmVsIHx8IChkb2N1bWVudCAmJiBkb2N1bWVudC5ib2R5KVxuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3Qua2V5cyhkZWZhdWx0cykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5IGluIG9wdGlvbnMpIHRoaXNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vblRvdWNoU3RhcnQgPSB0aGlzLm9uVG91Y2hTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uVG91Y2hFbmQgPSB0aGlzLm9uVG91Y2hFbmQuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5vblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCk7XG4gICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmQpO1xuICAgIH1cblxuICAgIG9uVG91Y2hTdGFydChldmVudCkge1xuICAgICAgICBjb25zdCB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuXG4gICAgICAgIHRoaXMuc3RhcnRYID0gdG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMuc3RhcnRZID0gdG91Y2gucGFnZVk7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKTsgLy8gcmVjb3JkIHRpbWUgd2hlbiBmaW5nZXIgZmlyc3QgbWFrZXMgY29udGFjdCB3aXRoIHN1cmZhY2VcbiAgICB9XG5cbiAgICBvblRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIGxldCB0eXBlID0gbnVsbDtcblxuICAgICAgICBjb25zdCB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuXG4gICAgICAgIGNvbnN0IGRpc3RYID0gdG91Y2gucGFnZVggLSB0aGlzLnN0YXJ0WDsgLy8gZ2V0IGhvcml6b250YWwgZGlzdCB0cmF2ZWxlZCBieSBmaW5nZXIgd2hpbGUgaW4gY29udGFjdCB3aXRoIHN1cmZhY2VcbiAgICAgICAgY29uc3QgZGlzdFkgPSB0b3VjaC5wYWdlWSAtIHRoaXMuc3RhcnRZOyAvLyBnZXQgdmVydGljYWwgZGlzdCB0cmF2ZWxlZCBieSBmaW5nZXIgd2hpbGUgaW4gY29udGFjdCB3aXRoIHN1cmZhY2VcbiAgICAgICAgY29uc3QgZWxhcHNlZFRpbWUgPSBuZXcgRGF0ZSgpIC0gdGhpcy5zdGFydFRpbWU7IC8vIGdldCB0aW1lIGVsYXBzZWRcblxuICAgICAgICBpZiAoZWxhcHNlZFRpbWUgPD0gdGhpcy5hbGxvd2VkVGltZSkgeyAvLyBmaXJzdCBjb25kaXRpb24gZm9yIGF3aXBlIG1ldFxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpc3RYKSA+PSB0aGlzLnRocmVzaG9sZCAmJiBNYXRoLmFicyhkaXN0WSkgPD0gdGhpcy5yZXN0cmFpbnQpIHsgLy8gMm5kIGNvbmRpdGlvbiBmb3IgaG9yaXpvbnRhbCBzd2lwZSBtZXRcbiAgICAgICAgICAgICAgICB0eXBlID0gKGRpc3RYIDwgMCkgPyBFVkVOVF9TV0lQRV9MRUZUIDogRVZFTlRfU1dJUEVfUklHSFQ7IC8vIGlmIGRpc3QgdHJhdmVsZWQgaXMgbmVnYXRpdmUsIGl0IGluZGljYXRlcyBsZWZ0IHN3aXBlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2UgaWYgKE1hdGguYWJzKGRpc3RZKSA+PSB0aGlzLnRocmVzaG9sZCAmJiBNYXRoLmFicyhkaXN0WCkgPD0gdGhpcy5yZXN0cmFpbnQpIHsgLy8gMm5kIGNvbmRpdGlvbiBmb3IgdmVydGljYWwgc3dpcGUgbWV0XG4gICAgICAgICAgICAgICAgdHlwZSA9IChkaXN0WSA8IDApID8gRVZFTlRfU1dJUEVfVVAgOiBFVkVOVF9TV0lQRV9ET1dOOyAvLyBpZiBkaXN0IHRyYXZlbGVkIGlzIG5lZ2F0aXZlLCBpdCBpbmRpY2F0ZXMgdXAgc3dpcGVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbWl0KEVWRU5UX1NXSVBFLCB0eXBlLCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbk9iamVjdC5hc3NpZ24oVG91Y2gucHJvdG90eXBlLCBkZWZhdWx0cyk7XG5cbmV4cG9ydCBkZWZhdWx0IFRvdWNoO1xuIiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tICcuLi9lbmdpbmUvQW5pbWF0aW9uJztcbmltcG9ydCBCb251cywgeyBhbmltYXRpb25zLCBhbmltYXRpb25CYXNlIH0gZnJvbSAnLi4vQm9udXMnO1xuXG5leHBvcnQgZGVmYXVsdCAoaW5kZXgsIG9wdGlvbnMpID0+IG5ldyBCb251cyh7XG4gICAgYW5pbWF0aW9ucyA6IHtcbiAgICAgICAgLi4uYW5pbWF0aW9ucyxcbiAgICAgICAgZGVmYXVsdCA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgICAgIG9mZnNldFggOiA2MCAqIGluZGV4XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICAuLi5vcHRpb25zXG59KTtcbiIsImltcG9ydCBBbmltYXRpb24gZnJvbSAnLi4vZW5naW5lL0FuaW1hdGlvbic7XG5pbXBvcnQgSXRlbSBmcm9tICcuLi9JdGVtJztcblxuZXhwb3J0IGNvbnN0IGFuaW1hdGlvbkJhc2UgPSB7XG4gICAgaW1hZ2VVUkwgOiAnaW1nL3BpbGxzMS5wbmcnLFxuICAgIG51bWJlck9mRnJhbWUgOiAxXG59O1xuXG5leHBvcnQgZGVmYXVsdCBvcHRpb25zID0+IG5ldyBJdGVtKHtcbiAgICB3aWR0aCA6IDgsXG4gICAgaGVpZ2h0IDogOCxcbiAgICBkZWZhdWx0QW5pbWF0aW9uIDogJ3doaXRlJyxcbiAgICBhbmltYXRpb25zIDoge1xuICAgICAgICAnd2hpdGUnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICAgICAgb2Zmc2V0WCA6IDI0XG4gICAgICAgIH0pLFxuICAgICAgICAneWVsbG93JyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgICAgIG9mZnNldFggOiAyNCArIDMyXG4gICAgICAgIH0pLFxuICAgICAgICAncmVkJyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgICAgIG9mZnNldFggOiAyNCArIDMyICogMlxuICAgICAgICB9KVxuICAgIH0sXG4gICAgLi4ub3B0aW9uc1xufSk7XG4iLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gJy4uL2VuZ2luZS9BbmltYXRpb24nO1xuaW1wb3J0IEdob3N0LCB7IGFuaW1hdGlvbnMsIGFuaW1hdGlvbkJhc2UgfSBmcm9tICcuLi9HaG9zdCc7XG5pbXBvcnQgZ2V0RGlzdGFuY2UgZnJvbSAnLi4vaGVscGVyL2dldERpc3RhbmNlJztcblxuZXhwb3J0IGNvbnN0IFNQUklURV9QSU5LWSA9ICdTUFJJVEVfUElOS1knO1xuZXhwb3J0IGNvbnN0IFNQUklURV9CTElOS1kgPSAnU1BSSVRFX0JMSU5LWSc7XG5leHBvcnQgY29uc3QgU1BSSVRFX0lOS1kgPSAnU1BSSVRFX0lOS1knO1xuZXhwb3J0IGNvbnN0IFNQUklURV9TVUUgPSAnU1BSSVRFX1NVRSc7XG5cbmV4cG9ydCBkZWZhdWx0IChsYWJlbCwgb3B0aW9ucykgPT4ge1xuICAgIC8vIFBpbmsgR2hvc3RcbiAgICBpZiAobGFiZWwgPT09ICdwaW5reScpIHtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgdHlwZSA6IFNQUklURV9QSU5LWSxcbiAgICAgICAgICAgIGRpciA6ICdkJyxcbiAgICAgICAgICAgIGRlZmF1bHRBbmltYXRpb24gOiAnZG93bicsXG4gICAgICAgICAgICBnZXRDaGFzZVRhcmdldCA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy5wYWNtYW5EYXRhLnRpbGU7XG4gICAgICAgICAgICAgICAgdmFyIGRpciA9IHRoaXMucGFjbWFuRGF0YS5kaXI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHQuZ2V0KGRpcikuZ2V0KGRpcikuZ2V0KGRpcikuZ2V0KGRpcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0aW9ucyA6IHtcbiAgICAgICAgICAgICAgICAuLi5hbmltYXRpb25zLFxuICAgICAgICAgICAgICAgIHJpZ2h0IDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgOiAyNTIsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggOiAtMlxuICAgICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgICAgZG93biA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZIDogMjUyLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYIDogNjQgKiAyIC0gMlxuICAgICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgICAgdXAgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA6IDI1MixcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA6IDY0ICogNCAtIDJcbiAgICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAgIGxlZnQgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA6IDI1MixcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA6IDY0ICogNiAtIDJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG4gICAgLy8gUmVkIEdob3N0XG4gICAgaWYgKGxhYmVsID09PSAnYmxpbmt5Jykge1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICB0eXBlIDogU1BSSVRFX0JMSU5LWSxcbiAgICAgICAgICAgIGRpciA6ICdsJyxcbiAgICAgICAgICAgIHdhaXRUaW1lIDogMCxcbiAgICAgICAgICAgIHNjYXR0ZXJUYXJnZXQgOiAyNSxcbiAgICAgICAgICAgIGRlZmF1bHRBbmltYXRpb24gOiAnbGVmdCcsXG4gICAgICAgICAgICBhbmltYXRpb25zIDoge1xuICAgICAgICAgICAgICAgIC4uLmFuaW1hdGlvbnMsXG4gICAgICAgICAgICAgICAgcmlnaHQgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA6IDEyNCxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA6IC0yXG4gICAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgICBkb3duIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgOiAxMjQsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggOiA2NCAqIDIgLSAyXG4gICAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgICB1cCA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZIDogMTI0LFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYIDogNjQgKiA0IC0gMlxuICAgICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgICAgbGVmdCA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZIDogMTI0LFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYIDogNjQgKiA2IC0gMlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cbiAgICAvLyBDeWFuIEdob3N0XG4gICAgaWYgKGxhYmVsID09PSAnaW5reScpIHtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgdHlwZSA6IFNQUklURV9JTktZLFxuICAgICAgICAgICAgZGlyIDogJ3UnLFxuICAgICAgICAgICAgd2FpdFRpbWUgOiA2LFxuICAgICAgICAgICAgc2NhdHRlclRhcmdldCA6IDk3OSxcbiAgICAgICAgICAgIGRlZmF1bHRBbmltYXRpb24gOiAndXAnLFxuICAgICAgICAgICAgZ2V0Q2hhc2VUYXJnZXQgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFjbWFuVGlsZSA9IHRoaXMucGFjbWFuRGF0YS50aWxlO1xuICAgICAgICAgICAgICAgIHZhciBibGlua3lUaWxlID0gdGhpcy5ibGlua3kuZ2V0VGlsZSgpO1xuICAgICAgICAgICAgICAgIHZhciBkaXIgPSB0aGlzLnBhY21hbkRhdGEuZGlyO1xuXG4gICAgICAgICAgICAgICAgcGFjbWFuVGlsZSA9IHBhY21hblRpbGUuZ2V0KGRpcikuZ2V0KGRpcik7IC8vIFR3byB0aWxlcyBpbiBmcm9udCBvZiBwYWNtYW5cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcC5nZXRUaWxlKHBhY21hblRpbGUuY29sICsgcGFjbWFuVGlsZS5jb2wgLSBibGlua3lUaWxlLmNvbCwgcGFjbWFuVGlsZS5yb3cgKyBwYWNtYW5UaWxlLnJvdyAtIGJsaW5reVRpbGUucm93KTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGlvbnMgOiB7XG4gICAgICAgICAgICAgICAgLi4uYW5pbWF0aW9ucyxcbiAgICAgICAgICAgICAgICByaWdodCA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZIDogMzE2LFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYIDogLTJcbiAgICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAgIGRvd24gOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA6IDMxNixcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA6IDY0ICogMiAtIDJcbiAgICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAgIHVwIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgOiAzMTYsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggOiA2NCAqIDQgLSAyXG4gICAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgICBsZWZ0IDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgOiAzMTYsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggOiA2NCAqIDYgLSAyXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIC8vIE9yYW5nZSBHaG9zdFxuICAgIGlmIChsYWJlbCA9PT0gJ3N1ZScpIHtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgdHlwZSA6IFNQUklURV9TVUUsXG4gICAgICAgICAgICBkaXIgOiAndScsXG4gICAgICAgICAgICB3YWl0VGltZSA6IDgsXG4gICAgICAgICAgICBzY2F0dGVyVGFyZ2V0IDogOTUzLFxuICAgICAgICAgICAgZGVmYXVsdEFuaW1hdGlvbiA6ICd1cCcsXG4gICAgICAgICAgICBnZXRDaGFzZVRhcmdldCA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy5wYWNtYW5EYXRhLnRpbGU7XG4gICAgICAgICAgICAgICAgdmFyIGQgPSBnZXREaXN0YW5jZSh0LCB0aGlzLmdldFRpbGUoKSk7XG4gICAgICAgICAgICAgICAgaWYgKGQgPiAxNiAqIHQudykgcmV0dXJuIHQ7XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5zY2F0dGVyVGFyZ2V0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGlvbnMgOiB7XG4gICAgICAgICAgICAgICAgLi4uYW5pbWF0aW9ucyxcbiAgICAgICAgICAgICAgICAncmlnaHQnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgOiAxODgsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggOiAtMlxuICAgICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgICAgJ2Rvd24nIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgOiAxODgsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggOiA2NCAqIDIgLSAyXG4gICAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgICAndXAnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgOiAxODgsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggOiA2NCAqIDQgLSAyXG4gICAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgICAnbGVmdCcgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA6IDE4OCxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA6IDY0ICogNiAtIDJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICB9XG5cbiAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEdob3N0KG9wdGlvbnMpO1xufVxuIiwiaW1wb3J0IEFuaW1hdGlvbiwgeyBBTklNQVRJT05fVkVSVElDQUwgfSBmcm9tICcuLi9lbmdpbmUvQW5pbWF0aW9uJztcbmltcG9ydCBJdGVtIGZyb20gJy4uL0l0ZW0nO1xuXG5jb25zdCBhbmltYXRpb25CYXNlID0ge1xuICAgIGltYWdlVVJMIDogJ2ltZy9waWxsczEucG5nJyxcbiAgICBudW1iZXJPZkZyYW1lIDogMixcbiAgICBkZWx0YSA6IDI0LFxuICAgIHJlZnJlc2hSYXRlIDogNDUwLFxuICAgIHR5cGUgOiBBTklNQVRJT05fVkVSVElDQUxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IChvcHRpb25zKSA9PiBuZXcgSXRlbSh7XG4gICAgd2lkdGggOiAyNCxcbiAgICBoZWlnaHQgOiAyNCxcbiAgICBhbmltYXRpb25zIDoge1xuICAgICAgICAnd2hpdGUnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgICAgICAuLi5hbmltYXRpb25CYXNlXG4gICAgICAgIH0pLFxuICAgICAgICAneWVsbG93JyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgICAgIG9mZnNldFggOiAyNCArIDhcbiAgICAgICAgfSksXG4gICAgICAgICdyZWQnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICAgICAgb2Zmc2V0WCA6ICgyNCArIDgpICogMlxuICAgICAgICB9KVxuICAgIH0sXG4gICAgLi4ub3B0aW9uc1xufSk7XG4iLCIvLyBEaXN0YW5jZSBiZXR3ZWVuIHR3byB0aWxlcy5cbmV4cG9ydCBkZWZhdWx0ICh0aWxlQSwgdGlsZUIpID0+IHtcbiAgICBjb25zdCB4ID0gdGlsZUEueCwgeDEgPSB0aWxlQi54LCB5ID0gdGlsZUEueSwgeTEgPSB0aWxlQi55O1xuICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coeCAtIHgxLCAyKSArIE1hdGgucG93KHkgLSB5MSwgMikpO1xufVxuIiwiLy8gUmV0dXJuIHJhbmRvbSBudW1iZXIgYmV0d2VlbiAwIGFuZCB0b3RhbCBsZXNzIG9uZS5cbmV4cG9ydCBkZWZhdWx0IHRvdGFsID0+IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiB0b3RhbCkpO1xuIiwiZXhwb3J0IGRlZmF1bHQgW1xuJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nLFxuJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nLFxuJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nLFxuJz09PT09PT09PT09PT09PT09PT09PT09PT09PT0nLFxuJz0uLi4uLi49PS4uLi4uLi4uLi49PS4uLi4uLj0nLFxuJz0qPT09PS49PS49PT09PT09PS49PS49PT09Kj0nLFxuJz0uPT09PS49PS49PT09PT09PS49PS49PT09Lj0nLFxuJz0uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLj0nLFxuJz09PS49PS49PT09PS49PS49PT09PS49PS49PT0nLFxuJy0tPS49PS49PT09PS49PS49PT09PS49PS49LS0nLFxuJz09PS49PS49PT09PS49PS49PT09PS49PS49PT0nLFxuJ3R0dC49PS4uLi4uLi49PS4uLi4uLi49PS50dHQnLFxuJz09PS49PT09PS09PT09PT09PS09PT09PS49PT0nLFxuJy0tPS49PT09PS09PT09PT09PS09PT09PS49LS0nLFxuJy0tPS4tLS0tLS0tLS0tLS0tLS0tLS0tLS49LS0nLFxuJy0tPS49PT09PS09PT1oaD09PS09PT09PS49LS0nLFxuJy0tPS49PT09PS09PT0tLT09PS09PT09PS49LS0nLFxuJy0tPS49PS0tLS09LS0tLS0tPS0tLS09PS49LS0nLFxuJy0tPS49PS09PS09PT09PT09PS09PS09PS49LS0nLFxuJz09PS49PS09PS09PT09PT09PS09PS09PS49PT0nLFxuJ3R0dC4tLS09PS0tLS0tLS0tLS09PS0tLS50dHQnLFxuJz09PS49PT09PT09PS09PS09PT09PT09PS49PT0nLFxuJy0tPS49PT09PT09PS09PS09PT09PT09PS49LS0nLFxuJy0tPS4uLi4uLi4tLS09PS0tLS4uLi4uLi49LS0nLFxuJy0tPS49PT09PS49PT09PT09PS49PT09PS49LS0nLFxuJz09PS49PT09PS49PT09PT09PS49PT09PS49PT0nLFxuJz0uLi4uLi4uLi4uLi4tLS4uLi4uLi4uLi4uLj0nLFxuJz0uPT09PS49PT09PS49PS49PT09PS49PT09Lj0nLFxuJz0uPT09PS49PT09PS49PS49PT09PS49PT09Lj0nLFxuJz0uPT09PS49PS4uLi49PS4uLi49PS49PT09Lj0nLFxuJz0qPT09PS49PS49PT09PT09PS49PS49PT09Kj0nLFxuJz0uPT09PS49PS49PT09PT09PS49PS49PT09Lj0nLFxuJz0uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLj0nLFxuJz09PT09PT09PT09PT09PT09PT09PT09PT09PT0nLFxuJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nLFxuJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nXG5dO1xuIiwiZXhwb3J0IGRlZmF1bHQgW1xuJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nLFxuJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nLFxuJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nLFxuJz09PT09PT09PT09PT09PT09PT09PT09PT09PT0nLFxuJ3R0dHR0dC09PS4uLi4uLi4uLi49PS10dHR0dHQnLFxuJz09PT09PS49PS49PT09PT09PS49PS49PT09PT0nLFxuJz09PT09PS49PS49PT09PT09PS49PS49PT09PT0nLFxuJz0qLi4uLi4uLi4uLi49PS4uLi4uLi4uLi4uKj0nLFxuJz0uPT09PT09PS49PS49PS49PS49PT09PT09Lj0nLFxuJz0uPT09PT09PS49PS49PS49PS49PT09PT09Lj0nLFxuJz0uPT0uLi4uLi49PS49PS49PS4uLi4uLj09Lj0nLFxuJz0uPT0uPT09PS09PS4uLi49PS09PT09Lj09Lj0nLFxuJz0uPT0uPT09PS09PT09PT09PS09PT09Lj09Lj0nLFxuJz0uLi4uLi49PS09PT09PT09PS09PS4uLi4uLj0nLFxuJz09PT09PS49PS0tLS0tLS0tLS09PS49PT09PT0nLFxuJz09PT09PS49PS09PT1oaD09PS09PS49PT09PT0nLFxuJz0uLi4uLi49PS09PT0tLT09PS09PS4uLi4uLj0nLFxuJz0uPT09PS49PS09LS0tLS0tPS09PS49PT09Lj0nLFxuJz0uPT09PS4tLS09PT09PT09PS0tLS49PT09Lj0nLFxuJz0uLi49PS49PS09PT09PT09PS09PS49PS4uLj0nLFxuJz09PS49PS49PS0tLS0tLS0tLS09PS49PS49PT0nLFxuJy0tPS49PS49PT09LT09PT0tPT09PS49PS49LS0nLFxuJy0tPS49PS49PT09LT09PT0tPT09PS49PS49LS0nLFxuJy0tPS4uLi4uLi4uLj09PT0uLi4uLi4uLi49LS0nLFxuJy0tPS49PT09PT09Lj09PT0uPT09PT09PS49LS0nLFxuJz09PS49PT09PT09Lj09PT0uPT09PT09PS49PT0nLFxuJ3R0dC4uLi49PS4uLi0tLS0uLi49PS4uLi50dHQnLFxuJz09PS49PS49PS49PT09PT09PS49PS49PS49PT0nLFxuJz09PS49PS49PS49PT09PT09PS49PS49PS49PT0nLFxuJz0qLi49PS4uLi4uLi49PS4uLi4uLi49PS4uKj0nLFxuJz0uPT09PS49PT09PS49PS49PT09PS49PT09Lj0nLFxuJz0uPT09PS49PT09PS49PS49PT09PS49PT09Lj0nLFxuJz0uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLj0nLFxuJz09PT09PT09PT09PT09PT09PT09PT09PT09PT0nLFxuJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nLFxuJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nXG5dO1xuIiwiZXhwb3J0IGRlZmF1bHQgIFtcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyxcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyxcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyxcbic9PT09PT09PT09PT09PT09PT09PT09PT09PT09Jyxcbic9Li4uLi4uLi4uPT0uLi4uPT0uLi4uLi4uLi49Jyxcbic9Lj09PT09PT0uPT0uPT0uPT0uPT09PT09PS49Jyxcbic9Kj09PT09PT0uPT0uPT0uPT0uPT09PT09PSo9Jyxcbic9Lj09Li4uLi4uLi4uPT0uLi4uLi4uLi49PS49Jyxcbic9Lj09Lj09Lj09PT0uPT0uPT09PS49PS49PS49Jyxcbic9Li4uLj09Lj09PT0uPT0uPT09PS49PS4uLi49Jyxcbic9PT09Lj09Lj09PT0uPT0uPT09PS49PS49PT09Jyxcbic9PT09Lj09Li4uLi4uLi4uLi4uLi49PS49PT09Jyxcbid0Li4uLj09PT0tPT09PT09PT0tPT09PS4uLi50Jyxcbic9Lj09LT09PT0tPT09PT09PT0tPT09PS09PS49Jyxcbic9Lj09LS0tLS0tLS0tLS0tLS0tLS0tLS09PS49Jyxcbic9Lj09PT0tPT0tPT09aGg9PT0tPT0tPT09PS49Jyxcbic9Lj09PT0tPT0tPT09LS09PT0tPT0tPT09PS49Jyxcbic9Li0tLS0tPT0tPS0tLS0tLT0tPT0tLS0tLS49Jyxcbic9Lj09LT09PT0tPT09PT09PT0tPT09PS09PS49Jyxcbic9Lj09LT09PT0tPT09PT09PT0tPT09PS09PS49Jyxcbic9Lj09LS0tLS0tLS0tLS0tLS0tLS0tLS09PS49Jyxcbic9Lj09PT0tPT09PT0tPT0tPT09PT0tPT09PS49Jyxcbic9Lj09PT0tPT09PT0tPT0tPT09PT0tPT09PS49Jyxcbic9Li4uLi4uPT0uLi4uPT0uLi4uPT0uLi4uLi49Jyxcbic9PT0uPT0uPT0uPT09PT09PT0uPT0uPT0uPT09Jyxcbic9PT0uPT0uPT0uPT09PT09PT0uPT0uPT0uPT09Jyxcbic9Ki4uPT0uLi4uLi4uLS0uLi4uLi4uPT0uLio9Jyxcbic9Lj09PT0uPT09PT0uPT0uPT09PT0uPT09PS49Jyxcbic9Lj09PT0uPT09PT0uPT0uPT09PT0uPT09PS49Jyxcbic9Li4uLi4uPT0uLi4uPT0uLi4uPT0uLi4uLi49Jyxcbic9Lj09PT0uPT0uPT09PT09PT0uPT0uPT09PS49Jyxcbic9Lj09PT0uPT0uPT09PT09PT0uPT0uPT09PS49Jyxcbic9Li4uLi4uPT0uLi4uLi4uLi4uPT0uLi4uLi49Jyxcbic9PT09PT09PT09PT09PT09PT09PT09PT09PT09JyxcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyxcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJ1xuXTtcbiIsImV4cG9ydCBkZWZhdWx0IFtcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyxcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyxcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyxcbic9PT09PT09PT09PT09PT09PT09PT09PT09PT09Jyxcbic9Li4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi49Jyxcbic9Lj09Lj09PT0uPT09PT09PT0uPT09PS49PS49Jyxcbic9Kj09Lj09PT0uPT09PT09PT0uPT09PS49PSo9Jyxcbic9Lj09Lj09PT0uPT0uLi4uPT0uPT09PS49PS49Jyxcbic9Lj09Li4uLi4uPT0uPT0uPT0uLi4uLi49PS49Jyxcbic9Lj09PT0uPT0uPT0uPT0uPT0uPT0uPT09PS49Jyxcbic9Lj09PT0uPT0uPT0uPT0uPT0uPT0uPT09PS49Jyxcbic9Li4uLi4uPT0uLi4uPT0uLi4uPT0uLi4uLi49Jyxcbic9PT0uPT09PT09PT0tPT0tPT09PT09PT0uPT09JyxcbictLT0uPT09PT09PT0tPT0tPT09PT09PT0uPS0tJyxcbictLT0uLi4uPT0tLS0tLS0tLS0tPT0uLi4uPS0tJyxcbic9PT0tPT0uPT0tPT09aGg9PT0tPT0uPT0tPT09Jyxcbid0dHQtPT0uPT0tPT09LS09PT0tPT0uPT0tdHR0Jyxcbic9PT09PT0uLS0tPS0tLS0tLT0tLS0uPT09PT09Jyxcbic9PT09PT0uPT0tPT09PT09PT0tPT0uPT09PT09Jyxcbid0dHQtPT0uPT0tPT09PT09PT0tPT0uPT0tdHR0Jyxcbic9PT0tPT0uPT0tLS0tLS0tLS0tPT0uPT0tPT09JyxcbictLT0uLi4uPT09PT0tPT0tPT09PT0uLi4uPS0tJyxcbictLT0uPT0uPT09PT0tPT0tPT09PT0uPT0uPS0tJyxcbictLT0uPT0uLi4uLS0tPT0tLS0uLi4uPT0uPS0tJyxcbictLT0uPT09PT0uPT0tPT0tPT0uPT09PT0uPS0tJyxcbic9PT0uPT09PT0uPT0tPT0tPT0uPT09PT0uPT09Jyxcbic9Li4uLi4uLi4uPT0tLS0tPT0uLi4uLi4uLi49Jyxcbic9Lj09PT0uPT0uPT09PT09PT0uPT0uPT09PS49Jyxcbic9Lj09PT0uPT0uPT09PT09PT0uPT0uPT09PS49Jyxcbic9Lj09Li4uPT0uLi4uLi4uLi4uPT0uLi49PS49Jyxcbic9Kj09Lj09PT09PT0uPT0uPT09PT09PS49PSo9Jyxcbic9Lj09Lj09PT09PT0uPT0uPT09PT09PS49PS49Jyxcbic9Li4uLi4uLi4uLi4uPT0uLi4uLi4uLi4uLi49Jyxcbic9PT09PT09PT09PT09PT09PT09PT09PT09PT09JyxcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyxcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJ1xuXTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL3ByZXNzLXN0YXJ0LTJwLXY5LWxhdGluLXJlZ3VsYXIud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL2ZvbnRzL3ByZXNzLXN0YXJ0LTJwLXY5LWxhdGluLXJlZ3VsYXIud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4vaW1nL21hemUucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi9pbWcvc3RhcnQucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKiBwcmVzcy1zdGFydC0ycC1yZWd1bGFyIC0gbGF0aW4gKi9cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogJ1ByZXNzIFN0YXJ0IDJQJztcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBzcmM6IGxvY2FsKCcnKSxcbiAgICAgICB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSkgZm9ybWF0KCd3b2ZmMicpLCAvKiBDaHJvbWUgMjYrLCBPcGVyYSAyMyssIEZpcmVmb3ggMzkrICovXG4gICAgICAgdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fX30pIGZvcm1hdCgnd29mZicpOyAvKiBDaHJvbWUgNissIEZpcmVmb3ggMy42KywgSUUgOSssIFNhZmFyaSA1LjErICovXG59XG5cbmJvZHkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMyMjI7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgY29sb3I6ICNFRkVGRUY7XG4gICAgZm9udC1mYW1pbHk6ICdQcmVzcyBTdGFydCAyUCcsIGN1cnNpdmU7XG4gICAgZm9udC1zaXplOiAyZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19ffSk7XG4gICAgYmFja2dyb3VuZC1zaXplOiA0MDAlIDIwMCU7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdG91Y2gtYWN0aW9uOiBub25lO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQud2l0aC1ib3JkZXIge1xuICAgIGJvcmRlci1yYWRpdXM6IDAuNWVtO1xuICAgIGJvcmRlcjogMWVtIHNvbGlkICMwMDA7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZC53aXRoLWJvcmRlci53aXRoLWxpZ2h0IHtcbiAgICBib3gtc2hhZG93OiAwIDAgMWVtIDAuMWVtICNFRUU7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZC5tYXplLTEge1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kLm1hemUtMiB7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTEwMCUgMDtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kLm1hemUtMyB7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTIwMCUgMDtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kLm1hemUtNCB7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTMwMCUgMDtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kLm1hemUtMS5ibGluayB7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAtMTAwJTtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kLm1hemUtMi5ibGluayB7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTEwMCUgLTEwMCU7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZC5tYXplLTMuYmxpbmsge1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0yMDAlIC0xMDAlO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQubWF6ZS00LmJsaW5rIHtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMzAwJSAtMTAwJTtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zcGxhc2gge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX199KTtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICByaWdodDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHotaW5kZXg6IDE7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3BsYXNoIGEge1xuICAgIGNvbG9yOiAjREREREREO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zcGxhc2ggYTpob3ZlciB7XG4gICAgY29sb3I6ICNGRkY7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3BsYXNoIGEuc3RhcnQge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0b3A6IDY1JTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGZvbnQtc2l6ZTogMS42ZW07XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3BsYXNoIC50aXRsZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMjIuMDQlO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIC8qIGNvbG9yOiAjRkNCNjQ0OyAqL1xuICAgIGNvbG9yOiBibGFjaztcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zcGxhc2ggcC5uZXJkIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAzNC4xNSU7XG4gICAgbGVmdDogMjcuMjYlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBjb2xvcjogI0ZGRjtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zcGxhc2ggcCBzcGFuIHtcbiAgICBjb2xvciA6ICNGRkZGMDA7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3BsYXNoIC5rZXlzIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA4NSU7XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6ICNGRkY7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3BsYXNoIC5jcmVkaXRzIHtcbiAgICBmb250LWZhbWlseTogJ1ByZXNzIFN0YXJ0IDJQJywgY3Vyc2l2ZTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgY29sb3I6ICNGRkY7XG4gICAgcGFkZGluZzogMC4xZW07XG4gICAgZm9udC1zaXplOiAwLjZlbTtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zcGxhc2ggLmNyZWRpdHMgc3BhbiB7XG4gICAgY29sb3I6ICNGRjMzMzM7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3BsYXNoIC5jcmVkaXRzIGEge1xuICAgIGNvbG9yOiAjRkZGRjAwO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNwbGFzaCAuY3JlZGl0cyBhOmhvdmVyIHtcbiAgICBjb2xvcjogI0ZGRkY0RDtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5sb2FkYmFyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA2NSU7XG4gICAgbGVmdDogMjIuMzIlO1xuICAgIHJpZ2h0OiAyMi4zMiU7XG4gICAgYmFja2dyb3VuZDogI0ZGMDtcbiAgICBoZWlnaHQ6IDMuNDcyJTtcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjRkZGO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLmxvYWRiYXIgLmlubmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYmFja2dyb3VuZDogI0ZGMDAwMDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDA7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc2NvcmUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDAuNDQ2NCU7XG4gICAgbGVmdDogMC40NDY0JTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgei1pbmRleDogMlxufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNjb3JlIC5wMS1zY29yZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHdpZHRoOiAyMiU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc2NvcmUgLmhpZ2gtc2NvcmUge1xuICAgIHdpZHRoOiA0MCU7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNjb3JlIC5wMi1zY29yZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHdpZHRoOiAyMiU7XG4gICAgdG9wOiAwO1xuICAgIHJpZ2h0OiAwO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNjb3JlIHNwYW4ge1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNjb3JlIC5oaWdoLXNjb3JlIHNwYW4ge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zdGFydC1wMSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMzguNzElO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiAjNUVFO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLmdhbWUtb3Zlcixcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3RhcnQtcmVhZHksXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNvdW5kLXN0YXR1cyxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAucGF1c2VkIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1NS41NSU7XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6ICNGMDA7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuZ2FtZS1vdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xuICAgIHBhZGRpbmc6IC41cmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc291bmQtc3RhdHVzLm9uIHNwYW4ub24sXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNvdW5kLXN0YXR1cyBzcGFuLm9mZiB7XG4gICAgZGlzcGxheSA6IGlubGluZTtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zb3VuZC1zdGF0dXMub24gc3Bhbi5vZmYsXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNvdW5kLXN0YXR1cyBzcGFuLm9uIHtcbiAgICBkaXNwbGF5IDogbm9uZTtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zb3VuZC1zdGF0dXMgLndyYXAsXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnBhdXNlZCAud3JhcCB7XG4gICAgYmFja2dyb3VuZDogIzAwMDtcbiAgICBwYWRkaW5nOiAwLjFlbTtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG9yaWVudGF0aW9uOiBwb3J0cmFpdCkge1xuICAgIC8qIGJvZHkge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xuICAgIH1cblxuICAgIC5qcy1wYWNtYW4tcGxheWdyb3VuZC53aXRoLWJvcmRlciB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICB9ICovXG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLG1DQUFtQztBQUNuQztFQUNFLDZCQUE2QjtFQUM3QixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCOzs2REFFdUUsRUFBRSxnREFBZ0Q7QUFDM0g7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIsU0FBUztJQUNULFVBQVU7SUFDVixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsY0FBYztJQUNkLHNDQUFzQztJQUN0QyxjQUFjO0lBQ2Qsc0JBQXNCO0lBQ3RCLHlEQUF1QztJQUN2QywwQkFBMEI7SUFDMUIsYUFBYTtJQUNiLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksb0JBQW9CO0lBQ3BCLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLDhCQUE4QjtBQUNsQzs7QUFFQTtJQUNJLHdCQUF3QjtBQUM1Qjs7QUFFQTtJQUNJLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLGdDQUFnQztBQUNwQzs7QUFFQTtJQUNJLGdDQUFnQztBQUNwQzs7QUFFQTtJQUNJLGdDQUFnQztBQUNwQzs7QUFFQTtJQUNJLHlEQUF3QztJQUN4QywwQkFBMEI7SUFDMUIsc0JBQXNCO0lBQ3RCLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsTUFBTTtJQUNOLFNBQVM7SUFDVCxRQUFRO0lBQ1IsT0FBTztJQUNQLFVBQVU7QUFDZDs7QUFFQTtJQUNJLGNBQWM7SUFDZCxlQUFlO0lBQ2YsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksV0FBVztBQUNmOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUix5QkFBeUI7SUFDekIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFdBQVc7SUFDWCxPQUFPO0lBQ1AsUUFBUTtJQUNSLGtCQUFrQjtJQUNsQixvQkFBb0I7SUFDcEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUixPQUFPO0lBQ1AsUUFBUTtJQUNSLGtCQUFrQjtJQUNsQixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxzQ0FBc0M7SUFDdEMsa0JBQWtCO0lBQ2xCLFNBQVM7SUFDVCxPQUFPO0lBQ1AsUUFBUTtJQUNSLFdBQVc7SUFDWCxjQUFjO0lBQ2QsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUixZQUFZO0lBQ1osYUFBYTtJQUNiLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsaUJBQWlCO0lBQ2pCLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLFFBQVE7QUFDWjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixNQUFNO0lBQ04sY0FBYztJQUNkLGFBQWE7SUFDYixrQkFBa0I7SUFDbEI7QUFDSjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsTUFBTTtJQUNOLE9BQU87QUFDWDs7QUFFQTtJQUNJLFVBQVU7SUFDVixpQkFBaUI7SUFDakIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixNQUFNO0lBQ04sUUFBUTtBQUNaOztBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsV0FBVztJQUNYLE9BQU87SUFDUCxRQUFRO0lBQ1Isa0JBQWtCO0lBQ2xCLFdBQVc7QUFDZjs7QUFFQTs7OztJQUlJLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsT0FBTztJQUNQLFFBQVE7SUFDUixrQkFBa0I7SUFDbEIsV0FBVztBQUNmOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLGNBQWM7SUFDZCxnQkFBZ0I7QUFDcEI7O0FBRUE7O0lBRUksZ0JBQWdCO0FBQ3BCOztBQUVBOztJQUVJLGNBQWM7QUFDbEI7O0FBRUE7O0lBRUksZ0JBQWdCO0lBQ2hCLGNBQWM7QUFDbEI7O0FBRUE7SUFDSTs7Ozs7Ozs7T0FRRztBQUNQXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIHByZXNzLXN0YXJ0LTJwLXJlZ3VsYXIgLSBsYXRpbiAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdQcmVzcyBTdGFydCAyUCc7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgc3JjOiBsb2NhbCgnJyksXFxuICAgICAgIHVybCgnLi9mb250cy9wcmVzcy1zdGFydC0ycC12OS1sYXRpbi1yZWd1bGFyLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLCAvKiBDaHJvbWUgMjYrLCBPcGVyYSAyMyssIEZpcmVmb3ggMzkrICovXFxuICAgICAgIHVybCgnLi9mb250cy9wcmVzcy1zdGFydC0ycC12OS1sYXRpbi1yZWd1bGFyLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTsgLyogQ2hyb21lIDYrLCBGaXJlZm94IDMuNissIElFIDkrLCBTYWZhcmkgNS4xKyAqL1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzIyMjtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGNvbG9yOiAjRUZFRkVGO1xcbiAgICBmb250LWZhbWlseTogJ1ByZXNzIFN0YXJ0IDJQJywgY3Vyc2l2ZTtcXG4gICAgZm9udC1zaXplOiAyZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnLi9pbWcvbWF6ZS5wbmcnKTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiA0MDAlIDIwMCU7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIGN1cnNvcjogZGVmYXVsdDtcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIHRvdWNoLWFjdGlvbjogbm9uZTtcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kLndpdGgtYm9yZGVyIHtcXG4gICAgYm9yZGVyLXJhZGl1czogMC41ZW07XFxuICAgIGJvcmRlcjogMWVtIHNvbGlkICMwMDA7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZC53aXRoLWJvcmRlci53aXRoLWxpZ2h0IHtcXG4gICAgYm94LXNoYWRvdzogMCAwIDFlbSAwLjFlbSAjRUVFO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQubWF6ZS0xIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQubWF6ZS0yIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTEwMCUgMDtcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kLm1hemUtMyB7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0yMDAlIDA7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZC5tYXplLTQge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMzAwJSAwO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQubWF6ZS0xLmJsaW5rIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAtMTAwJTtcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kLm1hemUtMi5ibGluayB7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0xMDAlIC0xMDAlO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQubWF6ZS0zLmJsaW5rIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTIwMCUgLTEwMCU7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZC5tYXplLTQuYmxpbmsge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMzAwJSAtMTAwJTtcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zcGxhc2gge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy4vaW1nL3N0YXJ0LnBuZycpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMDtcXG4gICAgYm90dG9tOiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zcGxhc2ggYSB7XFxuICAgIGNvbG9yOiAjREREREREO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNwbGFzaCBhOmhvdmVyIHtcXG4gICAgY29sb3I6ICNGRkY7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3BsYXNoIGEuc3RhcnQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHRvcDogNjUlO1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICBmb250LXNpemU6IDEuNmVtO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNwbGFzaCAudGl0bGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMjIuMDQlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAvKiBjb2xvcjogI0ZDQjY0NDsgKi9cXG4gICAgY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNwbGFzaCBwLm5lcmQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMzQuMTUlO1xcbiAgICBsZWZ0OiAyNy4yNiU7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgY29sb3I6ICNGRkY7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3BsYXNoIHAgc3BhbiB7XFxuICAgIGNvbG9yIDogI0ZGRkYwMDtcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zcGxhc2ggLmtleXMge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogODUlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBjb2xvcjogI0ZGRjtcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zcGxhc2ggLmNyZWRpdHMge1xcbiAgICBmb250LWZhbWlseTogJ1ByZXNzIFN0YXJ0IDJQJywgY3Vyc2l2ZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBib3R0b206IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBjb2xvcjogI0ZGRjtcXG4gICAgcGFkZGluZzogMC4xZW07XFxuICAgIGZvbnQtc2l6ZTogMC42ZW07XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3BsYXNoIC5jcmVkaXRzIHNwYW4ge1xcbiAgICBjb2xvcjogI0ZGMzMzMztcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zcGxhc2ggLmNyZWRpdHMgYSB7XFxuICAgIGNvbG9yOiAjRkZGRjAwO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNwbGFzaCAuY3JlZGl0cyBhOmhvdmVyIHtcXG4gICAgY29sb3I6ICNGRkZGNEQ7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAubG9hZGJhciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA2NSU7XFxuICAgIGxlZnQ6IDIyLjMyJTtcXG4gICAgcmlnaHQ6IDIyLjMyJTtcXG4gICAgYmFja2dyb3VuZDogI0ZGMDtcXG4gICAgaGVpZ2h0OiAzLjQ3MiU7XFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjRkZGO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLmxvYWRiYXIgLmlubmVyIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBiYWNrZ3JvdW5kOiAjRkYwMDAwO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiAwO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNjb3JlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDA7XFxuICAgIHJpZ2h0OiAwLjQ0NjQlO1xcbiAgICBsZWZ0OiAwLjQ0NjQlO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHotaW5kZXg6IDJcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zY29yZSAucDEtc2NvcmUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAyMiU7XFxuICAgIHRvcDogMDtcXG4gICAgbGVmdDogMDtcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zY29yZSAuaGlnaC1zY29yZSB7XFxuICAgIHdpZHRoOiA0MCU7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc2NvcmUgLnAyLXNjb3JlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMjIlO1xcbiAgICB0b3A6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNjb3JlIHNwYW4ge1xcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc2NvcmUgLmhpZ2gtc2NvcmUgc3BhbiB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zdGFydC1wMSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAzOC43MSU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjNUVFO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLmdhbWUtb3ZlcixcXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnN0YXJ0LXJlYWR5LFxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc291bmQtc3RhdHVzLFxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAucGF1c2VkIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDU1LjU1JTtcXG4gICAgbGVmdDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgY29sb3I6ICNGMDA7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuZ2FtZS1vdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gICAgcGFkZGluZzogLjVyZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc291bmQtc3RhdHVzLm9uIHNwYW4ub24sXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zb3VuZC1zdGF0dXMgc3Bhbi5vZmYge1xcbiAgICBkaXNwbGF5IDogaW5saW5lO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNvdW5kLXN0YXR1cy5vbiBzcGFuLm9mZixcXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNvdW5kLXN0YXR1cyBzcGFuLm9uIHtcXG4gICAgZGlzcGxheSA6IG5vbmU7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc291bmQtc3RhdHVzIC53cmFwLFxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAucGF1c2VkIC53cmFwIHtcXG4gICAgYmFja2dyb3VuZDogIzAwMDtcXG4gICAgcGFkZGluZzogMC4xZW07XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpIHtcXG4gICAgLyogYm9keSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xcbiAgICB9XFxuXFxuICAgIC5qcy1wYWNtYW4tcGxheWdyb3VuZC53aXRoLWJvcmRlciB7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXG4gICAgfSAqL1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xudmFyIF9WaWV3MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vVmlldy5qc1wiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cbi8vIFRoaXMgb3B0aW9ucyBrZXlzIHdpbGwgYmUgZXh0ZW5kZWQgb24gdmlldyBpbnN0YW5jZS5cbnZhciBjb21wb25lbnRPcHRpb25zID0ge1xuICBrZXk6IHRydWUsXG4gIHN0YXRlOiB0cnVlLFxuICBvbkNyZWF0ZTogdHJ1ZSxcbiAgb25DaGFuZ2U6IHRydWUsXG4gIG9uUmVuZGVyOiB0cnVlXG59O1xuXG4vKlxuICogSGVscGVyIGZ1bmN0aW9uLiBFeHRyYWN0IGF0dHJpYnV0ZXMgZnJvbSBodG1sIHRhZ1xuICogQHBhcmFtIHRleHQge3N0cmluZ30gaHRtbCB0ZXh0XG4gKiBAcmV0dXJuIHtvYmplY3R9IE9iamVjdCB3aXRoIGtleXMgLyB2YWx1ZXMgcmVwcmVzZW50aW5nIGF0dHJpYnV0ZXMuXG4gKi9cbnZhciBleHRyYWN0QXR0cmlidXRlcyA9IGZ1bmN0aW9uIGV4dHJhY3RBdHRyaWJ1dGVzKHRleHQpIHtcbiAgdmFyIGF0dHJpYnV0ZXMgPSB7fTtcbiAgdmFyIHJlID0gLyhbXFx3fGRhdGEtXSspKD86PVtcIiddPygoPzouKD8hW1wiJ10/XFxzKyg/OlxcUyspPXxcXHMqXFwvP1s+XCInXSkpKy4pW1wiJ10/KT8vZztcbiAgdmFyIHJlc3VsdDtcbiAgd2hpbGUgKChyZXN1bHQgPSByZS5leGVjKHRleHQpKSAhPT0gbnVsbCkge1xuICAgIGF0dHJpYnV0ZXNbcmVzdWx0WzFdXSA9IHR5cGVvZiByZXN1bHRbMl0gPT09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IHJlc3VsdFsyXTtcbiAgfVxuICByZXR1cm4gYXR0cmlidXRlcztcbn07XG5cbi8qXG4gKiBIZWxwZXIgZnVuY3Rpb24uIElmIGZpcnN0IGFyZyBpcyBhIHBsYWNlaG9sZGVyIGZvciBhbiBleHByZXNzaW9uLCByZXR1cm4gdGhlIGV4cHJlc3Npb24uXG4gKi9cbnZhciBnZXRFeHByZXNzaW9uID0gZnVuY3Rpb24gZ2V0RXhwcmVzc2lvbihwbGFjZWhvbGRlciwgZXhwcmVzc2lvbnMpIHtcbiAgdmFyIG1hdGNoID0gcGxhY2Vob2xkZXIgJiYgcGxhY2Vob2xkZXIubWF0Y2ggJiYgcGxhY2Vob2xkZXIubWF0Y2gobmV3IFJlZ0V4cChDb21wb25lbnQuRVhQUkVTU0lPTl9QTEFDRUhPTERFUl9URU1QTEFURSgnKFxcXFxkKyknKSkpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV0gPyBleHByZXNzaW9uc1ttYXRjaFsxXV0gOiBwbGFjZWhvbGRlcjtcbn07XG5cbi8qXG4gKiBIZWxwZXIgZnVuY3Rpb24uIElmIGV4cHJlc3Npb24gaXMgYSBmdW5jdGlvbiwgY2FsbCBpdCB3aXRoIGNvbnRleHQgYW5kIGFyZ3MuXG4gKi9cbnZhciBldmFsRXhwcmVzc2lvbiA9IGZ1bmN0aW9uIGV2YWxFeHByZXNzaW9uKGV4cHJlc3Npb24sIGNvbnRleHQpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG4gIHJldHVybiB0eXBlb2YgZXhwcmVzc2lvbiA9PT0gJ2Z1bmN0aW9uJyA/IGV4cHJlc3Npb24uYXBwbHkoY29udGV4dCwgYXJncykgOiBleHByZXNzaW9uO1xufTtcblxuLyoqXG4gKiBDb21wb25lbnRzIGFyZSBhIHNwZWNpYWwga2luZCBvZiBgVmlld2AgdGhhdCBpcyBkZXNpZ25lZCB0byBiZSBlYXNpbHkgY29tcG9zYWJsZSwgXG4gKiBtYWtpbmcgaXQgc2ltcGxlIHRvIGFkZCBjaGlsZCB2aWV3cyBhbmQgYnVpbGQgY29tcGxleCB1c2VyIGludGVyZmFjZXMuICBcbiAqIFVubGlrZSB2aWV3cywgd2hpY2ggYXJlIHJlbmRlci1hZ25vc3RpYywgY29tcG9uZW50cyBoYXZlIGEgc3BlY2lmaWMgc2V0IG9mIHJlbmRlcmluZyBcbiAqIGd1aWRlbGluZXMgdGhhdCBhbGxvdyBmb3IgYSBtb3JlIGRlY2xhcmF0aXZlIGRldmVsb3BtZW50IHN0eWxlLiAgXG4gKiBDb21wb25lbnRzIGFyZSBkZWZpbmVkIHdpdGggdGhlIGBjcmVhdGVgIHN0YXRpYyBtZXRob2QsIHdoaWNoIHRha2VzIGEgdGFnZ2VkIHRlbXBsYXRlLlxuICogQG1vZHVsZVxuICogQGV4dGVuZHMgUmFzdGkuVmlld1xuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT2JqZWN0IGNvbnRhaW5pbmcgb3B0aW9ucy4gVGhlIGZvbGxvd2luZyBrZXlzIHdpbGwgYmUgbWVyZ2VkIHRvIGB0aGlzYDogbW9kZWwsIHN0YXRlLCBrZXksIG9uRGVzdHJveSwgb25SZW5kZXIsIG9uQ3JlYXRlLCBvbkNoYW5nZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBrZXkgQSB1bmlxdWUga2V5IHRvIGlkZW50aWZ5IHRoZSBjb21wb25lbnQuIFVzZWQgdG8gcmVjeWNsZSBjaGlsZCBjb21wb25lbnRzLlxuICogQHByb3BlcnR5IHtvYmplY3R9IG1vZGVsIEEgYFJhc3RpLk1vZGVsYCBvciBhbnkgZW1pdHRlciBvYmplY3QgY29udGFpbmluZyBkYXRhIGFuZCBidXNpbmVzcyBsb2dpYy5cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBzdGF0ZSBBIGBSYXN0aS5Nb2RlbGAgb3IgYW55IGVtaXR0ZXIgb2JqZWN0IGNvbnRhaW5pbmcgZGF0YSBhbmQgYnVzaW5lc3MgbG9naWMsIHRvIGJlIHVzZWQgYXMgaW50ZXJuYWwgc3RhdGUuXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgQ29tcG9uZW50LCBNb2RlbCB9IGZyb20gJ3Jhc3RpJztcbiAqIC8vIENyZWF0ZSBUaW1lciBjb21wb25lbnQuXG4gKiBjb25zdCBUaW1lciA9IENvbXBvbmVudC5jcmVhdGVgXG4gKiAgICAgPGRpdj5cbiAqICAgICAgICAgU2Vjb25kczogPHNwYW4+JHsoeyBtb2RlbCB9KSA9PiBtb2RlbC5zZWNvbmRzfTwvc3Bhbj5cbiAqICAgICA8L2Rpdj5cbiAqIGA7XG4gKiAvLyBDcmVhdGUgbW9kZWwgdG8gc3RvcmUgc2Vjb25kcy5cbiAqIGNvbnN0IG1vZGVsID0gbmV3IE1vZGVsKHsgc2Vjb25kczogMCB9KTtcbiAqIC8vIE1vdW50IHRpbWVyIG9uIGJvZHkuXG4gKiBUaW1lci5tb3VudCh7IG1vZGVsIH0sIGRvY3VtZW50LmJvZHkpO1xuICogLy8gSW5jcmVtZW50IGBtb2RlbC5zZWNvbmRzYCBldmVyeSBzZWNvbmQuXG4gKiBzZXRJbnRlcnZhbCgoKSA9PiBtb2RlbC5zZWNvbmRzKyssIDEwMDApO1xuICovXG52YXIgQ29tcG9uZW50ID0gZXhwb3J0c1tcImRlZmF1bHRcIl0gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9WaWV3KSB7XG4gIGZ1bmN0aW9uIENvbXBvbmVudCgpIHtcbiAgICB2YXIgX3RoaXM7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgIF90aGlzID0gX1ZpZXcuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIC8vIEV4dGVuZCBcInRoaXNcIiB3aXRoIG9wdGlvbnMsIG1hcHBpbmcgY29tcG9uZW50T3B0aW9ucyBrZXlzLlxuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWYgKGNvbXBvbmVudE9wdGlvbnNba2V5XSkgX3RoaXNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICB9KTtcbiAgICAvLyBTdG9yZSBvcHRpb25zIGJ5IGRlZmF1bHQuXG4gICAgX3RoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgLy8gQmluZCBvbkNoYW5nZSB0byB0aGlzIHRvIGJlIHVzZWQgYXMgbGlzdGVuZXIuXG4gICAgLy8gU3RvcmUgYm91bmQgdmVyc2lvbiwgc28gaXQgY2FuIGJlIHJlbW92ZWQgb24gb25EZXN0cm95IG1ldGhvZC5cbiAgICBfdGhpcy5vbkNoYW5nZSA9IF90aGlzLm9uQ2hhbmdlLmJpbmQoX3RoaXMpO1xuICAgIC8vIExpc3RlbiB0byBtb2RlbCBjaGFuZ2VzIGFuZCBjYWxsIG9uQ2hhbmdlLlxuICAgIGlmIChfdGhpcy5tb2RlbCAmJiBfdGhpcy5tb2RlbC5vbikgX3RoaXMubW9kZWwub24oJ2NoYW5nZScsIF90aGlzLm9uQ2hhbmdlKTtcbiAgICBpZiAoX3RoaXMuc3RhdGUgJiYgX3RoaXMuc3RhdGUub24pIF90aGlzLnN0YXRlLm9uKCdjaGFuZ2UnLCBfdGhpcy5vbkNoYW5nZSk7XG4gICAgLy8gQ2FsbCBsaWZlIGN5Y2xlIG1ldGhvZC5cbiAgICBfdGhpcy5vbkNyZWF0ZS5hcHBseShfdGhpcywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKlxuICAgKiBPdmVycmlkZS4gV2UgZG9uJ3Qgd2FudCB0byBlbnN1cmUgYW4gZWxlbWVudCBvbiBpbnN0YW50aWF0aW9uLlxuICAgKiBXZSB3aWxsIHByb3ZpZGUgaXQgbGF0ZXIuXG4gICAqL1xuICBfaW5oZXJpdHNMb29zZShDb21wb25lbnQsIF9WaWV3KTtcbiAgdmFyIF9wcm90byA9IENvbXBvbmVudC5wcm90b3R5cGU7XG4gIF9wcm90by5lbnN1cmVFbGVtZW50ID0gZnVuY3Rpb24gZW5zdXJlRWxlbWVudCgpIHtcbiAgICAvLyBJZiBlbCBpcyBwcm92aWRlZCwgZGVsZWdhdGUgZXZlbnRzLlxuICAgIGlmICh0aGlzLmVsKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlRXZlbnRzKCk7XG4gICAgICB0aGlzLmlkID0gdGhpcy5lbC5pZDtcbiAgICB9XG4gICAgLy8gRW5zdXJlIGlkLlxuICAgIGlmICghdGhpcy5pZCkge1xuICAgICAgdGhpcy5pZCA9IHRoaXMuYXR0cmlidXRlcyAmJiB0aGlzLmF0dHJpYnV0ZXMuaWQgP1xuICAgICAgLy8gSWYgaWQgaXMgcHJvdmlkZWQsIGV2YWx1YXRlIGl0LlxuICAgICAgZXZhbEV4cHJlc3Npb24odGhpcy5hdHRyaWJ1dGVzLmlkLCB0aGlzLCB0aGlzKSA6XG4gICAgICAvLyBHZW5lcmF0ZSBhIHVuaXF1ZSBpZCBhbmQgc2V0IGl0IGFzIGlkIGF0dHJpYnV0ZS5cbiAgICAgIENvbXBvbmVudC5JRF9URU1QTEFURSh0aGlzLnVpZCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogRmluZCB2aWV3J3MgZWxlbWVudCBvbiBwYXJlbnQgbm9kZSwgdXNpbmcgaWQuXG4gICAqLztcbiAgX3Byb3RvLmZpbmRFbGVtZW50ID0gZnVuY3Rpb24gZmluZEVsZW1lbnQocGFyZW50KSB7XG4gICAgcmV0dXJuIChwYXJlbnQgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3IoXCIjXCIgKyB0aGlzLmlkKTtcbiAgfVxuXG4gIC8qXG4gICAqIEV2YWwgYXR0cmlidXRlcyBleHByZXNzaW9ucy5cbiAgICovO1xuICBfcHJvdG8uZ2V0QXR0cmlidXRlcyA9IGZ1bmN0aW9uIGdldEF0dHJpYnV0ZXMoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG4gICAgdmFyIGFkZCA9IHtcbiAgICAgIGlkOiB0aGlzLmlkXG4gICAgfTtcbiAgICB2YXIgcmVtb3ZlID0ge307XG4gICAgdmFyIGh0bWwgPSBbXCJpZD1cXFwiXCIgKyB0aGlzLmlkICsgXCJcXFwiXCJdO1xuICAgIGlmICh0aGlzLmF0dHJpYnV0ZXMpIHtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuYXR0cmlidXRlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmIChrZXkgPT09ICdpZCcpIHJldHVybjtcbiAgICAgICAgLy8gRXZhbHVhdGUgYXR0cmlidXRlIHZhbHVlLlxuICAgICAgICB2YXIgdmFsdWUgPSBldmFsRXhwcmVzc2lvbihfdGhpczIuYXR0cmlidXRlc1trZXldLCBfdGhpczIsIF90aGlzMik7XG5cbiAgICAgICAgLy8gVHJhbnNmb3JtIGJvb2wgYXR0cmlidXRlIHZhbHVlc1xuICAgICAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmVtb3ZlW2tleV0gPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkW2tleV0gPSAnJztcbiAgICAgICAgICBodG1sLnB1c2goa2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykgdmFsdWUgPSAnJztcbiAgICAgICAgICBhZGRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgIGh0bWwucHVzaChrZXkgKyBcIj1cXFwiXCIgKyB2YWx1ZSArIFwiXFxcIlwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBhZGQ6IGFkZCxcbiAgICAgIHJlbW92ZTogcmVtb3ZlLFxuICAgICAgaHRtbDogaHRtbC5qb2luKCcgJylcbiAgICB9O1xuICB9XG5cbiAgLypcbiAgICogVXNlZCBpbnRlcm5hbGx5IG9uIHRoZSByZW5kZXIgcHJvY2Vzcy5cbiAgICogQXR0YWNoIHRoZSB2aWV3IHRvIHRoZSBkb20gZWxlbWVudC5cbiAgICovO1xuICBfcHJvdG8uaHlkcmF0ZSA9IGZ1bmN0aW9uIGh5ZHJhdGUocGFyZW50KSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG4gICAgdGhpcy5lbCA9IHRoaXMuZmluZEVsZW1lbnQocGFyZW50KTtcbiAgICB0aGlzLmRlbGVnYXRlRXZlbnRzKCk7XG4gICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgcmV0dXJuIGNoaWxkLmh5ZHJhdGUoX3RoaXMzLmVsKTtcbiAgICB9KTtcbiAgICB0aGlzLm9uUmVuZGVyLmNhbGwodGhpcywgJ2h5ZHJhdGUnKTtcbiAgfVxuXG4gIC8qXG4gICAqIFVzZWQgaW50ZXJuYWxseSBvbiB0aGUgcmVuZGVyIHByb2Nlc3MuXG4gICAqIFJldXNlIGEgdmlldyB0aGF0IGhhcyBga2V5YCB3aGVuIGl0cyBwYXJlbnQgaXMgcmVuZGVyZWQuXG4gICAqLztcbiAgX3Byb3RvLnJlY3ljbGUgPSBmdW5jdGlvbiByZWN5Y2xlKHBhcmVudCkge1xuICAgIC8vIEZpbmQgZWxlbWVudCB0byBiZSByZXBsYWNlZC4gSXQgaGFzIHNhbWUgaWQuXG4gICAgdmFyIHRvQmVSZXBsYWNlZCA9IHRoaXMuZmluZEVsZW1lbnQocGFyZW50KTtcbiAgICAvLyBSZXBsYWNlIGl0IHdpdGggdGhpcy5lbC5cbiAgICB0b0JlUmVwbGFjZWQucmVwbGFjZVdpdGgodGhpcy5lbCk7XG4gICAgLy8gQ2FsbCBgb25SZW5kZXJgIGxpZmVjeWNsZSBtZXRob2QuXG4gICAgdGhpcy5vblJlbmRlci5jYWxsKHRoaXMsICdyZWN5Y2xlJyk7XG4gIH1cblxuICAvKlxuICAgKiBPdmVycmlkZS4gQWRkIHNvbWUgY3VzdG9tIGxvZ2ljIHRvIHN1cGVyIGBkZXN0cm95YCBtZXRob2QuXG4gICAqLztcbiAgX3Byb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIF9WaWV3LnByb3RvdHlwZS5kZXN0cm95LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgLy8gU3RvcCBsaXN0ZW5pbmcgdG8gYGNoYW5nZWAuXG4gICAgLy8gU2V0IGRlc3Ryb3llZCBmbGFnIHRvIHByZXZlbnQgYSBsYXN0IHJlbmRlciBhZnRlciBkZXN0cm95ZWQuIFRPRE86IFJldmlld1xuICAgIGlmICh0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwub2ZmKSB0aGlzLm1vZGVsLm9mZignY2hhbmdlJywgdGhpcy5vbkNoYW5nZSk7XG4gICAgaWYgKHRoaXMuc3RhdGUgJiYgdGhpcy5zdGF0ZS5vZmYpIHRoaXMuc3RhdGUub2ZmKCdjaGFuZ2UnLCB0aGlzLm9uQ2hhbmdlKTtcbiAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogTGlmZWN5Y2xlIG1ldGhvZC4gQ2FsbGVkIHdoZW4gdGhlIHZpZXcgaXMgY3JlYXRlZCBhdCB0aGUgZW5kIG9mIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICogQHBhcmFtIG9wdGlvbnMge29iamVjdH0gVGhlIHZpZXcgb3B0aW9ucy5cbiAgICovO1xuICBfcHJvdG8ub25DcmVhdGUgPSBmdW5jdGlvbiBvbkNyZWF0ZSgpIHt9XG5cbiAgLyoqXG4gICAqIExpZmVjeWNsZSBtZXRob2QuIENhbGxlZCB3aGVuIG1vZGVsIGVtaXRzIGBjaGFuZ2VgIGV2ZW50LlxuICAgKiBCeSBkZWZhdWx0IGNhbGxzIHJlbmRlciBtZXRob2QuXG4gICAqIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBleHRlbmRlZCB3aXRoIGN1c3RvbSBsb2dpYy5cbiAgICogTWF5YmUgY29tcGFyaW5nIG5ldyBhdHRyaWJ1dGVzIHdpdGggcHJldmlvdXMgb25lcyBhbmQgY2FsbGluZ1xuICAgKiByZW5kZXIgd2hlbiBuZWVkZWQuIE9yIGRvaW5nIHNvbWUgZG9tIHRyYW5zZm9ybWF0aW9uLlxuICAgKiBAcGFyYW0gbW9kZWwge1Jhc3RpLk1vZGVsfSBUaGUgbW9kZWwgdGhhdCBlbWl0dGVkIHRoZSBldmVudC5cbiAgICogQHBhcmFtIGNoYW5nZWQge29iamVjdH0gT2JqZWN0IGNvbnRhaW5pbmcga2V5cyBhbmQgdmFsdWVzIHRoYXQgaGFzIGNoYW5nZWQuXG4gICAqIEBwYXJhbSBbLi4uYXJnc10ge2FueX0gQW55IGV4dHJhIGFyZ3VtZW50cyBwYXNzZWQgdG8gc2V0IG1ldGhvZC5cbiAgICovO1xuICBfcHJvdG8ub25DaGFuZ2UgPSBmdW5jdGlvbiBvbkNoYW5nZSgpIHtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpZmVjeWNsZSBtZXRob2QuIENhbGxlZCB3aGVuIHRoZSB2aWV3IGlzIHJlbmRlcmVkLlxuICAgKiBAcGFyYW0gdHlwZSB7c3RyaW5nfSBUaGUgcmVuZGVyIHR5cGUuIENhbiBiZSBgcmVuZGVyYCwgYGh5ZHJhdGVgIG9yIGByZWN5Y2xlYC5cbiAgICovO1xuICBfcHJvdG8ub25SZW5kZXIgPSBmdW5jdGlvbiBvblJlbmRlcigpIHt9XG5cbiAgLyoqXG4gICAqIExpZmVjeWNsZSBtZXRob2QuIENhbGxlZCB3aGVuIHRoZSB2aWV3IGlzIGRlc3Ryb3llZC5cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT3B0aW9ucyBvYmplY3Qgb3IgYW55IGFyZ3VtZW50cyBwYXNzZWQgdG8gYGRlc3Ryb3lgIG1ldGhvZC5cbiAgICovO1xuICBfcHJvdG8ub25EZXN0cm95ID0gZnVuY3Rpb24gb25EZXN0cm95KCkge31cblxuICAvKlxuICAgKiBSZXBsYWNlIGV4cHJlc3Npb25zLlxuICAgKi87XG4gIF9wcm90by5yZXBsYWNlRXhwcmVzc2lvbnMgPSBmdW5jdGlvbiByZXBsYWNlRXhwcmVzc2lvbnMoc3RyaW5nLCBhZGRDaGlsZCkge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShuZXcgUmVnRXhwKENvbXBvbmVudC5FWFBSRVNTSU9OX1BMQUNFSE9MREVSX1RFTVBMQVRFKCcoXFxcXGQrKScpLCAnZycpLCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgIHZhciBleHByZXNzaW9uID0gZ2V0RXhwcmVzc2lvbihtYXRjaCwgX3RoaXM0LnRlbXBsYXRlLmV4cHJlc3Npb25zKTtcbiAgICAgIC8vIEV2YWwgZXhwcmVzc2lvbi4gUGFzcyB2aWV3IGFzIGFyZ3VtZW50LlxuICAgICAgdmFyIHJlc3VsdCA9IGV2YWxFeHByZXNzaW9uKGV4cHJlc3Npb24sIF90aGlzNCwgX3RoaXM0KTtcbiAgICAgIC8vIFRyZWF0IGFsbCBleHByZXNzaW9ucyBhcyBhcnJheXMuXG4gICAgICB2YXIgcmVzdWx0cyA9IHJlc3VsdCBpbnN0YW5jZW9mIEFycmF5ID8gcmVzdWx0IDogW3Jlc3VsdF07XG4gICAgICAvLyBSZXBsYWNlIGV4cHJlc3Npb24gd2l0aCB0aGUgcmVzdWx0IG9mIHRoZSBldmFsdWF0aW9uLlxuICAgICAgcmV0dXJuIHJlc3VsdHMucmVkdWNlKGZ1bmN0aW9uIChvdXQsIHJlc3VsdCkge1xuICAgICAgICB2YXIgcGFyc2VkO1xuICAgICAgICAvLyBJZiByZXN1bHQgaXMgdHJ1ZSwgcmVwbGFjZSBpdCB3aXRoIGEgcGxhY2Vob2xkZXIuXG4gICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHBhcnNlZCA9IENvbXBvbmVudC5UUlVFX1BMQUNFSE9MREVSO1xuICAgICAgICAvLyBJZiByZXN1bHQgaXMgZmFsc2UsIHJlcGxhY2UgaXQgd2l0aCBhIHBsYWNlaG9sZGVyLlxuICAgICAgICBlbHNlIGlmIChyZXN1bHQgPT09IGZhbHNlKSBwYXJzZWQgPSBDb21wb25lbnQuRkFMU0VfUExBQ0VIT0xERVI7XG4gICAgICAgIC8vIFJlcGxhY2UgbnVsbCBvciB1bmRlZmluZWQgd2l0aCBlbXB0eSBzdHJpbmcuXG4gICAgICAgIGVsc2UgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ID09PSAndW5kZWZpbmVkJykgcGFyc2VkID0gJyc7XG4gICAgICAgIC8vIElmIHJlc3VsdCBpcyBhIHZpZXcsIGNhbGwgYWRkQ2hpbGQgY2FsbGJhY2suXG4gICAgICAgIGVsc2UgaWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0LnJlbmRlciA9PT0gJ2Z1bmN0aW9uJykgcGFyc2VkID0gYWRkQ2hpbGQocmVzdWx0KTtcbiAgICAgICAgLy8gUmV0dXJuIGV4cHJlc3Npb24gaXRzZWxmLlxuICAgICAgICBlbHNlIHBhcnNlZCA9IHJlc3VsdDtcbiAgICAgICAgLy8gQ29uY2F0ZW5hdGUgZXhwcmVzc2lvbnMuXG4gICAgICAgIHJldHVybiBvdXQgKyBwYXJzZWQ7XG4gICAgICB9LCAnJyk7XG4gICAgfSlcbiAgICAvLyBSZXBsYWNlIGBhdHRyaWJ1dGU9XCJ0cnVlXCJgIHdpdGggYGF0dHJpYnV0ZWBcbiAgICAucmVwbGFjZShuZXcgUmVnRXhwKFwiKFthLXpdKyk9W1xcXCJ8J11cIiArIENvbXBvbmVudC5UUlVFX1BMQUNFSE9MREVSICsgXCJbXFxcInwnXVwiLCAnZycpLCAnJDEnKVxuICAgIC8vIFJlcGxhY2UgYGF0dHJpYnV0ZT1cImZhbHNlXCJgIHdpdGggZW1wdHkgc3RyaW5nLlxuICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoW2Etel0rKT1bXFxcInwnXVwiICsgQ29tcG9uZW50LkZBTFNFX1BMQUNFSE9MREVSICsgXCJbXFxcInwnXVwiLCAnZycpLCAnJylcbiAgICAvLyBSZXBsYWNlIHJlc3Qgb2YgZmFsc2UgZXhwcmVzc2lvbnMgd2l0aCBlbXB0eSBzdHJpbmcuXG4gICAgLnJlcGxhY2UobmV3IFJlZ0V4cChDb21wb25lbnQuRkFMU0VfUExBQ0VIT0xERVIsICdnJyksICcnKTtcbiAgfVxuXG4gIC8qXG4gICAqIFRyZWF0IHRoZSB3aG9sZSB2aWV3IGFzIGEgSFRNTCBzdHJpbmcuXG4gICAqLztcbiAgX3Byb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgdmFyIF90aGlzNSA9IHRoaXM7XG4gICAgLy8gTm9ybWFsbHkgdGhlcmUgd29uJ3QgYmUgYW55IGNoaWxkcmVuLCBidXQgaWYgdGhlcmUgYXJlLCBkZXN0cm95IHRoZW0uXG4gICAgdGhpcy5kZXN0cm95Q2hpbGRyZW4oKTtcbiAgICAvLyBHZXQgdGFnIG5hbWUuXG4gICAgdmFyIHRhZyA9IHRoaXMudGFnIHx8ICdkaXYnO1xuICAgIC8vIEdldCBhdHRyaWJ1dGVzLlxuICAgIHZhciBhdHRyaWJ1dGVzID0gdGhpcy5nZXRBdHRyaWJ1dGVzKCkuaHRtbDtcbiAgICAvLyBSZXBsYWNlIGV4cHJlc3Npb25zIG9mIGlubmVyIHRlbXBsYXRlLlxuICAgIHZhciBpbm5lciA9IHRoaXMudGVtcGxhdGUgJiYgdGhpcy50ZW1wbGF0ZS5pbm5lciAmJiB0aGlzLnJlcGxhY2VFeHByZXNzaW9ucyh0aGlzLnRlbXBsYXRlLmlubmVyLCBmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICAvLyBBZGQgY2hpbGQgY29tcG9uZW50LlxuICAgICAgcmV0dXJuIF90aGlzNS5hZGRDaGlsZChjb21wb25lbnQpO1xuICAgIH0pO1xuICAgIC8vIEdlbmVyYXRlIG91dGVyIHRlbXBsYXRlLlxuICAgIHJldHVybiBpbm5lciA/IFwiPFwiICsgdGFnICsgXCIgXCIgKyBhdHRyaWJ1dGVzICsgXCI+XCIgKyBpbm5lciArIFwiPC9cIiArIHRhZyArIFwiPlwiIDogXCI8XCIgKyB0YWcgKyBcIiBcIiArIGF0dHJpYnV0ZXMgKyBcIiAvPlwiO1xuICB9XG5cbiAgLypcbiAgICogVmlldyByZW5kZXIgbWV0aG9kLlxuICAgKi87XG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIF90aGlzNiA9IHRoaXM7XG4gICAgLy8gUHJldmVudCBhIGxhc3QgcmUgcmVuZGVyIGlmIHZpZXcgaXMgYWxyZWFkeSBkZXN0cm95ZWQuXG4gICAgaWYgKHRoaXMuZGVzdHJveWVkKSByZXR1cm4gdGhpcztcbiAgICAvLyBJZiBgdGhpcy5lbGAgaXMgbm90IHByZXNlbnQsIGNyZWF0ZSBhIG5ldyBgdGhpcy50YWdgIGVsZW1lbnQuXG4gICAgaWYgKCF0aGlzLmVsKSB7XG4gICAgICB0aGlzLmVsID0gdGhpcy5jcmVhdGVFbGVtZW50KHRoaXMudGFnKTtcbiAgICAgIHRoaXMuZGVsZWdhdGVFdmVudHMoKTtcbiAgICB9XG4gICAgLy8gU2V0IGB0aGlzLmVsYCBhdHRyaWJ1dGVzLlxuICAgIHZhciBhdHRyaWJ1dGVzID0gdGhpcy5nZXRBdHRyaWJ1dGVzKCk7XG4gICAgLy8gUmVtb3ZlIGF0dHJpYnV0ZXMuXG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcy5yZW1vdmUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgX3RoaXM2LmVsLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgIH0pO1xuICAgIC8vIEFkZCBhdHRyaWJ1dGVzLlxuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMuYWRkKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIF90aGlzNi5lbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzLmFkZFtrZXldKTtcbiAgICB9KTtcbiAgICAvLyBDaGVjayBmb3IgYHRlbXBsYXRlLmlubmVyYCB0byBzZWUgaWYgdmlldyBoYXMgaW5uZXJIVE1MLlxuICAgIGlmICh0aGlzLnRlbXBsYXRlICYmIHRoaXMudGVtcGxhdGUuaW5uZXIpIHtcbiAgICAgIHZhciBwcmV2aW91c0NoaWxkcmVuID0gdGhpcy5jaGlsZHJlbjtcbiAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAgIHZhciBuZXh0Q2hpbGRyZW4gPSBbXTtcbiAgICAgIHZhciByZWN5Y2xlZENoaWxkcmVuID0gW107XG4gICAgICAvLyBTdG9yZSBhY3RpdmUgZWxlbWVudC5cbiAgICAgIHZhciBhY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIC8vIFJlcGxhY2UgZXhwcmVzc2lvbnMuIFNldCBodG1sIGluc2lkZSBvZiBgdGhpcy5lbGAuXG4gICAgICB0aGlzLmVsLmlubmVySFRNTCA9IHRoaXMucmVwbGFjZUV4cHJlc3Npb25zKHRoaXMudGVtcGxhdGUuaW5uZXIsIGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgdmFyIG91dCA9IGNvbXBvbmVudDtcbiAgICAgICAgLy8gQ2hlY2sgaWYgY2hpbGQgYWxyZWFkeSBleGlzdHMuXG4gICAgICAgIHZhciBmb3VuZCA9IGNvbXBvbmVudC5rZXkgJiYgcHJldmlvdXNDaGlsZHJlbi5maW5kKGZ1bmN0aW9uIChwcmV2aW91c0NoaWxkKSB7XG4gICAgICAgICAgcmV0dXJuIHByZXZpb3VzQ2hpbGQua2V5ID09PSBjb21wb25lbnQua2V5O1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgdmFyIHRhZyA9IGZvdW5kLmVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICB2YXIgaWQgPSBmb3VuZC5lbC5pZDtcbiAgICAgICAgICAvLyBJZiBjaGlsZCBhbHJlYWR5IGV4aXN0cywgcmVwbGFjZSBpdCBodG1sIGJ5IGl0cyByb290IGVsZW1lbnQuXG4gICAgICAgICAgb3V0ID0gXCI8XCIgKyB0YWcgKyBcIiBpZD1cXFwiXCIgKyBpZCArIFwiXFxcIj48L1wiICsgdGFnICsgXCI+XCI7XG4gICAgICAgICAgLy8gQWRkIGNoaWxkIHRvIHJlY3ljbGVkIGNoaWxkcmVuLlxuICAgICAgICAgIHJlY3ljbGVkQ2hpbGRyZW4ucHVzaChmb3VuZCk7XG4gICAgICAgICAgLy8gRGVzdHJveSBuZXcgY2hpbGQgY29tcG9uZW50LiBVc2UgcmVjeWNsZWQgb25lIGluc3RlYWQuXG4gICAgICAgICAgY29tcG9uZW50LmRlc3Ryb3koKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBOb3QgZm91bmQuIEFkZCBuZXcgY2hpbGQgY29tcG9uZW50LlxuICAgICAgICAgIG5leHRDaGlsZHJlbi5wdXNoKGNvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29tcG9uZW50IGh0bWwuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgICB9KTtcbiAgICAgIC8vIEFkZCBuZXcgY2hpbGRyZW4uIEh5ZHJhdGUgdGhlbS5cbiAgICAgIG5leHRDaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChuZXh0Q2hpbGQpIHtcbiAgICAgICAgX3RoaXM2LmFkZENoaWxkKG5leHRDaGlsZCkuaHlkcmF0ZShfdGhpczYuZWwpO1xuICAgICAgfSk7XG4gICAgICAvLyBSZXBsYWNlIGNoaWxkcmVuIHJvb3QgZWxlbWVudHMgd2l0aCByZWN5Y2xlZCBjb21wb25lbnRzLlxuICAgICAgcmVjeWNsZWRDaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChyZWN5Y2xlZENoaWxkKSB7XG4gICAgICAgIF90aGlzNi5hZGRDaGlsZChyZWN5Y2xlZENoaWxkKS5yZWN5Y2xlKF90aGlzNi5lbCk7XG4gICAgICB9KTtcbiAgICAgIC8vIERlc3Ryb3kgdW51c2VkIGNoaWxkcmVuLlxuICAgICAgcHJldmlvdXNDaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChwcmV2aW91c0NoaWxkKSB7XG4gICAgICAgIHZhciBmb3VuZCA9IHJlY3ljbGVkQ2hpbGRyZW4uaW5kZXhPZihwcmV2aW91c0NoaWxkKSA+IC0xO1xuICAgICAgICBpZiAoIWZvdW5kKSBwcmV2aW91c0NoaWxkLmRlc3Ryb3koKTtcbiAgICAgIH0pO1xuICAgICAgLy8gUmVzdG9yZSBmb2N1cy5cbiAgICAgIGlmICh0aGlzLmVsLmNvbnRhaW5zKGFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgIGFjdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQ2FsbCBvblJlbmRlciBsaWZlY3ljbGUgbWV0aG9kLlxuICAgIHRoaXMub25SZW5kZXIuY2FsbCh0aGlzLCAncmVuZGVyJyk7XG4gICAgLy8gUmV0dXJuIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBtZXRob2QgdXNlZCB0byBleHRlbmQgYSBgQ29tcG9uZW50YCwgY3JlYXRpbmcgYSBzdWJjbGFzcy5cbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IE9iamVjdCBjb250YWluaW5nIG1ldGhvZHMgdG8gYmUgYWRkZWQgdG8gdGhlIG5ldyBgQ29tcG9uZW50YCBzdWJjbGFzcy4gQWxzbyBjYW4gYmUgYSBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHRoZSBwYXJlbnQgcHJvdG90eXBlIGFuZCByZXR1cm5zIGFuIG9iamVjdC5cbiAgICovO1xuICBDb21wb25lbnQuZXh0ZW5kID0gZnVuY3Rpb24gZXh0ZW5kKG9iamVjdCkge1xuICAgIHZhciBDdXJyZW50ID0gdGhpcztcbiAgICB2YXIgRXh0ZW5kZWQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9DdXJyZW50KSB7XG4gICAgICBmdW5jdGlvbiBFeHRlbmRlZCgpIHtcbiAgICAgICAgcmV0dXJuIF9DdXJyZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgIH1cbiAgICAgIF9pbmhlcml0c0xvb3NlKEV4dGVuZGVkLCBfQ3VycmVudCk7XG4gICAgICByZXR1cm4gRXh0ZW5kZWQ7XG4gICAgfShDdXJyZW50KTtcbiAgICBPYmplY3QuYXNzaWduKEV4dGVuZGVkLnByb3RvdHlwZSwgdHlwZW9mIG9iamVjdCA9PT0gJ2Z1bmN0aW9uJyA/IG9iamVjdChDdXJyZW50LnByb3RvdHlwZSkgOiBvYmplY3QpO1xuICAgIHJldHVybiBFeHRlbmRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3VudCB0aGUgY29tcG9uZW50IGludG8gdGhlIGRvbS5cbiAgICogSXQgaW5zdGFudGlhdGUgdGhlIENvbXBvbmVudCB2aWV3IHVzaW5nIG9wdGlvbnMsIFxuICAgKiBhcHBlbmRzIGl0cyBlbGVtZW50IGludG8gdGhlIERPTSAoaWYgYGVsYCBpcyBwcm92aWRlZCkuXG4gICAqIEFuZCByZXR1cm5zIHRoZSB2aWV3IGluc3RhbmNlLlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFRoZSB2aWV3IG9wdGlvbnMuXG4gICAqIEBwYXJhbSB7bm9kZX0gZWwgRG9tIGVsZW1lbnQgdG8gYXBwZW5kIHRoZSB2aWV3IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaHlkcmF0ZSBJZiB0cnVlLCB0aGUgdmlldyB3aWxsIHVzZSBleGlzdGluZyBodG1sLlxuICAgKiBAcmV0dXJuIHtSYXN0aS5Db21wb25lbnR9XG4gICAqLztcbiAgQ29tcG9uZW50Lm1vdW50ID0gZnVuY3Rpb24gbW91bnQob3B0aW9ucywgZWwsIGh5ZHJhdGUpIHtcbiAgICAvLyBJbnN0YW50aWF0ZSB2aWV3LlxuICAgIHZhciB2aWV3ID0gbmV3IHRoaXMob3B0aW9ucyk7XG4gICAgLy8gSWYgYGVsYCBpcyBwYXNzZWQsIG1vdW50IGNvbXBvbmVudC5cbiAgICBpZiAoZWwpIHtcbiAgICAgIGlmIChoeWRyYXRlKSB7XG4gICAgICAgIHZpZXcudG9TdHJpbmcoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgICAgIC8vIEFkZCBodG1sIHRleHQgaW50byBlbGVtZW50IGlubmVyIGh0bWwuXG4gICAgICAgIGZyYWdtZW50LmlubmVySFRNTCA9IHZpZXc7XG4gICAgICAgIC8vIEFkZCB0byBkb20uXG4gICAgICAgIGVsLmFwcGVuZENoaWxkKGZyYWdtZW50LmNvbnRlbnQpO1xuICAgICAgfVxuICAgICAgdmlldy5oeWRyYXRlKGVsKTtcbiAgICB9XG4gICAgLy8gUmV0dXJuIHZpZXcgaW5zdGFuY2UuXG4gICAgcmV0dXJuIHZpZXc7XG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYSB0YWdnZWQgdGVtcGxhdGUgY29udGFpbmluZyBhbiBIVE1MIHN0cmluZywgXG4gICAqIGFuZCByZXR1cm5zIGEgbmV3IGBDb21wb25lbnRgIGNsYXNzLlxuICAgKiAtIFRoZSB0ZW1wbGF0ZSBvdXRlciB0YWcgYW5kIGF0dHJpYnV0ZXMgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZSB0aGUgdmlldydzIHJvb3QgZWxlbWVudC5cbiAgICogLSBCb29sZWFuIGF0dHJpYnV0ZXMgc2hvdWxkIGJlIHBhc3NlZCBpbiB0aGUgZm9ybSBvZiBgYXR0cmlidXRlPVwiJHsoKSA9PiB0cnVlfVwiYC5cbiAgICogLSBFdmVudCBoYW5kbGVycyBzaG91bGQgYmUgcGFzc2VkLCBhdCB0aGUgcm9vdCBlbGVtZW50LCBpbiB0aGUgZm9ybSBvZiBgb25FdmVudE5hbWU9JHt7J3NlbGVjdG9yJyA6IGxpc3RlbmVyIH19YC4gV2hlcmUgYHNlbGVjdG9yYCBpcyBhIGNzcyBzZWxlY3Rvci4gVGhlIGV2ZW50IHdpbGwgYmUgZGVsZWdhdGVkIHRvIHRoZSB2aWV3J3Mgcm9vdCBlbGVtZW50LlxuICAgKiAtIFRoZSB0ZW1wbGF0ZSBpbm5lciBIVE1MIHdpbGwgYmUgdXNlZCBhcyB0aGUgdmlldydzIHRlbXBsYXRlLlxuICAgKiAtIFRlbXBsYXRlIGludGVycG9sYXRpb25zIHRoYXQgYXJlIGZ1bmN0aW9ucyB3aWxsIGJlIGV2YWx1YXRlZCBvbiB0aGUgcmVuZGVyIHByb2Nlc3MuIFJlY2VpdmluZyB0aGUgdmlldyBpbnN0YW5jZSBhcyBhcmd1bWVudC4gQW5kIGJlaW5nIGJvdW5kIHRvIGl0LlxuICAgKiAtIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIGBudWxsYCwgYHVuZGVmaW5lZGAsIGBmYWxzZWAgb3IgZW1wdHkgc3RyaW5nLCB0aGUgaW50ZXJwb2xhdGlvbiB3b24ndCByZW5kZXIgYW55IGNvbnRlbnQuXG4gICAqIC0gSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgYSBjb21wb25lbnQgaW5zdGFuY2UsIGl0IHdpbGwgYmUgYWRkZWQgYXMgYSBjaGlsZCBjb21wb25lbnQuXG4gICAqIC0gSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgYW4gYXJyYXksIGVhY2ggaXRlbSB3aWxsIGJlIGV2YWx1YXRlZCBhcyBhYm92ZS5cbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge3N0cmluZ30gSFRNTCB0ZW1wbGF0ZSBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICogQHJldHVybiB7UmFzdGkuQ29tcG9uZW50fVxuICAgKi87XG4gIENvbXBvbmVudC5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoc3RyaW5ncykge1xuICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgZXhwcmVzc2lvbnMgPSBuZXcgQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgZXhwcmVzc2lvbnNbX2tleTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgfVxuICAgIHZhciBwYXJ0cyA9IFtdO1xuICAgIC8vIFJlcGxhY2UgZnVuY3Rpb25zIGFuZCBvYmplY3RzIGludGVycG9sYXRpb25zIHdpdGggYHtudW1iZXJ9YC5cbiAgICAvLyBXaGVyZSBgbnVtYmVyYCBpcyB0aGUgaW5kZXggb24gZXhwcmVzc2lvbnMgYXJyYXkuXG4gICAgc3RyaW5ncy5mb3JFYWNoKGZ1bmN0aW9uIChzdHJpbmcsIGkpIHtcbiAgICAgIC8vIEFkZCBzdHJpbmcgcGFydC5cbiAgICAgIHBhcnRzLnB1c2goc3RyaW5nKTtcbiAgICAgIC8vIEFkZCBleHByZXNzaW9uIHBsYWNlaG9sZGVyIGZvciBsYXRlciBvciBleHByZXNzaW9uIGV2YWwuXG4gICAgICBpZiAoZXhwcmVzc2lvbnNbaV0pIHtcbiAgICAgICAgcGFydHMucHVzaCh0eXBlb2YgZXhwcmVzc2lvbnNbaV0gPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGV4cHJlc3Npb25zW2ldID09PSAnb2JqZWN0JyA/IENvbXBvbmVudC5FWFBSRVNTSU9OX1BMQUNFSE9MREVSX1RFTVBMQVRFKGkpIDogZXhwcmVzc2lvbnNbaV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIENyZWF0ZSBvdXRwdXQgdGV4dCBmb3IgbWFpbiB0ZW1wbGF0ZS5cbiAgICB2YXIgbWFpbiA9IHBhcnRzLmpvaW4oJycpLnRyaW0oKS5yZXBsYWNlKC9cXG4vZywgJycpO1xuICAgIC8vIEV4dHJhY3Qgb3V0ZXIgdGFnLCBhdHRyaWJ1dGVzIGFuZCBpbm5lciBodG1sLlxuICAgIHZhciByZXN1bHQgPSBtYWluLm1hdGNoKC9ePChbYS16XSspKC4qPyk+KC4qKTxcXC9cXDE+JC8pIHx8IG1haW4ubWF0Y2goL148KFthLXpdKykoLio/KVxcLz4kLyk7XG4gICAgLy8gUGFyc2UgYXR0cmlidXRlcyBmcm9tIGh0bWwgdGV4dCBpbnRvIGFuIG9iamVjdC5cbiAgICB2YXIgYXR0cmlidXRlcyA9IGV4dHJhY3RBdHRyaWJ1dGVzKHJlc3VsdFsyXSk7XG4gICAgLy8gRXZlbnRzIHRvIGJlIGRlbGVnYXRlZC5cbiAgICB2YXIgZXZlbnRzID0ge307XG4gICAgLy8gRmlsdGVyIGV2ZW50cy4gVG8gZ2VuZXJhdGUgZXZlbnRzIG9iamVjdC5cbiAgICAvLyBHZW5lcmF0ZSBhdHRyaWJ1dGVzIG9iamVjdCwgcmVwbGFjZSBwbGFjZWhvbGRlcnMgd2l0aCBleHByZXNzaW9ucy5cbiAgICBhdHRyaWJ1dGVzID0gT2JqZWN0LmtleXMoYXR0cmlidXRlcykucmVkdWNlKGZ1bmN0aW9uIChvdXQsIGtleSkge1xuICAgICAgLy8gSXMgRXZlbnQ/XG4gICAgICB2YXIgbWF0Y2hLZXkgPSBrZXkubWF0Y2goL29uKChbQS1aXXsxfVthLXpdKykrKS8pO1xuICAgICAgLy8gSXMgcGxhY2Vob2xkZXIgZm9yIGZ1bmN0aW9uIG9yIG9iamVjdD9cbiAgICAgIC8vIEdldCBleHByZXNzaW9uIG9yIHZhbHVlLlxuICAgICAgdmFyIHZhbHVlID0gZ2V0RXhwcmVzc2lvbihhdHRyaWJ1dGVzW2tleV0sIGV4cHJlc3Npb25zKTtcbiAgICAgIC8vIElzIGV2ZW50IGhhbmRsZXIuIEFkZCB0byBldmVudHMgb2JqZWN0LlxuICAgICAgaWYgKG1hdGNoS2V5ICYmIG1hdGNoS2V5WzFdKSB7XG4gICAgICAgIHZhciBldmVudFR5cGUgPSBtYXRjaEtleVsxXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaChmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICByZXR1cm4gZXZlbnRzW1wiXCIgKyBldmVudFR5cGUgKyAoc2VsZWN0b3IgPT09ICcmJyA/ICcnIDogXCIgXCIgKyBzZWxlY3RvcildID0gdmFsdWVbc2VsZWN0b3JdO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgIH1cbiAgICAgIC8vIElzIGF0dHJpYnV0ZS4gQWRkIHRvIGF0dHJpYnV0ZXMgb2JqZWN0LlxuICAgICAgb3V0W2tleV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiBvdXQ7XG4gICAgfSwge30pO1xuICAgIHZhciBDdXJyZW50ID0gdGhpcztcbiAgICAvLyBDcmVhdGUgc3ViY2xhc3MgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgIHJldHVybiBDdXJyZW50LmV4dGVuZCh7XG4gICAgICAvLyBTZXQgZXZlbnRzLlxuICAgICAgZXZlbnRzOiBldmVudHMsXG4gICAgICAvLyBTZXQgYXR0cmlidXRlcy5cbiAgICAgIGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXMsXG4gICAgICAvLyBTZXQgdGVtcGxhdGUuXG4gICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAvLyBUZW1wbGF0ZSBmb3IgaW5uZXJIVE1MIG9mIHJvb3QgZWxlbWVudC5cbiAgICAgICAgaW5uZXI6IHJlc3VsdFszXSxcbiAgICAgICAgLy8gVGVtcGxhdGUgZXhwcmVzc2lvbnMuXG4gICAgICAgIGV4cHJlc3Npb25zOiBleHByZXNzaW9uc1xuICAgICAgfSxcbiAgICAgIC8vIFNldCByb290IGVsZW1lbnQgdGFnLlxuICAgICAgdGFnOiByZXN1bHRbMV1cbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIENvbXBvbmVudDtcbn0oX1ZpZXcyW1wiZGVmYXVsdFwiXSk7XG5Db21wb25lbnQuSURfVEVNUExBVEUgPSBmdW5jdGlvbiAodWlkKSB7XG4gIHJldHVybiBcInJhc3RpLWNvbXBvbmVudC1cIiArIHVpZDtcbn07XG5Db21wb25lbnQuRVhQUkVTU0lPTl9QTEFDRUhPTERFUl9URU1QTEFURSA9IGZ1bmN0aW9uIChpZHgpIHtcbiAgcmV0dXJuIFwiX19SQVNUSV9FWFBSRVNTSU9Oe1wiICsgaWR4ICsgXCJ9XCI7XG59O1xuQ29tcG9uZW50LlRSVUVfUExBQ0VIT0xERVIgPSAnX19SQVNUSV9UUlVFJztcbkNvbXBvbmVudC5GQUxTRV9QTEFDRUhPTERFUiA9ICdfX1JBU1RJX0ZBTFNFJzsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuLyoqXG4gKiBgRW1pdHRlcmAgaXMgYSBjbGFzcyB0aGF0IHByb3ZpZGVzIGFuIGVhc3kgd2F5IHRvIGltcGxlbWVudCB0aGUgb2JzZXJ2ZXIgcGF0dGVybiBcbiAqIGluIHlvdXIgYXBwbGljYXRpb25zLiAgXG4gKiBJdCBjYW4gYmUgZXh0ZW5kZWQgdG8gY3JlYXRlIG5ldyBjbGFzc2VzIHRoYXQgaGF2ZSB0aGUgYWJpbGl0eSB0byBlbWl0IGFuZCBiaW5kIGN1c3RvbSBuYW1lZCBldmVudHMuICAgXG4gKiBFbWl0dGVyIGlzIHVzZWQgYnkgYE1vZGVsYCBhbmQgYFZpZXdgIGNsYXNzZXMsIHdoaWNoIGluaGVyaXQgZnJvbSBpdCB0byBpbXBsZW1lbnQgXG4gKiBldmVudC1kcml2ZW4gZnVuY3Rpb25hbGl0eS5cbiAqXG4gKiBAbW9kdWxlXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gJ3Jhc3RpJztcbiAqIC8vIEN1c3RvbSBjYXJ0XG4gKiBjbGFzcyBTaG9wcGluZ0NhcnQgZXh0ZW5kcyBFbWl0dGVyIHtcbiAqICAgICBjb25zdHJ1Y3RvcigpIHtcbiAqICAgICAgICAgc3VwZXIoKTtcbiAqICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICogICAgIH1cbiAqXG4gKiAgICAgYWRkSXRlbShpdGVtKSB7XG4gKiAgICAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAqICAgICAgICAgLy8gRW1pdCBhIGN1c3RvbSBldmVudCBjYWxsZWQgYGl0ZW1BZGRlZGAuXG4gKiAgICAgICAgIC8vIFBhc3MgdGhlIGFkZGVkIGl0ZW0gYXMgYW4gYXJndW1lbnQgdG8gdGhlIGV2ZW50IGxpc3RlbmVyLlxuICogICAgICAgICB0aGlzLmVtaXQoJ2l0ZW1BZGRlZCcsIGl0ZW0pO1xuICogICAgIH1cbiAqIH1cbiAqIC8vIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBTaG9wcGluZ0NhcnQgYW5kIExvZ2dlclxuICogY29uc3QgY2FydCA9IG5ldyBTaG9wcGluZ0NhcnQoKTtcbiAqIC8vIExpc3RlbiB0byB0aGUgYGl0ZW1BZGRlZGAgZXZlbnQgYW5kIGxvZyB0aGUgYWRkZWQgaXRlbSB1c2luZyB0aGUgbG9nZ2VyLlxuICogY2FydC5vbignaXRlbUFkZGVkJywgKGl0ZW0pID0+IHtcbiAqICAgICBjb25zb2xlLmxvZyhgSXRlbSBhZGRlZCB0byBjYXJ0OiAke2l0ZW0ubmFtZX0gLSBQcmljZTogJCR7aXRlbS5wcmljZX1gKTtcbiAqIH0pO1xuICogLy8gU2ltdWxhdGUgYWRkaW5nIGl0ZW1zIHRvIHRoZSBjYXJ0XG4gKiBjb25zdCBpdGVtMSA9IHsgbmFtZSA6ICdTbWFydHBob25lJywgcHJpY2UgOiAxMDAwIH07XG4gKiBjb25zdCBpdGVtMiA9IHsgbmFtZSA6ICdIZWFkcGhvbmVzJywgcHJpY2UgOiAxNTAgfTtcbiAqXG4gKiBjYXJ0LmFkZEl0ZW0oaXRlbTEpOyAvLyBPdXRwdXQ6IFwiSXRlbSBhZGRlZCB0byBjYXJ0OiBTbWFydHBob25lIC0gUHJpY2U6ICQxMDAwXCJcbiAqIGNhcnQuYWRkSXRlbShpdGVtMik7IC8vIE91dHB1dDogXCJJdGVtIGFkZGVkIHRvIGNhcnQ6IEhlYWRwaG9uZXMgLSBQcmljZTogJDE1MFwiXG4gKi9cbnZhciBFbWl0dGVyID0gZXhwb3J0c1tcImRlZmF1bHRcIl0gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBFbWl0dGVyKCkge31cbiAgdmFyIF9wcm90byA9IEVtaXR0ZXIucHJvdG90eXBlO1xuICAvKipcbiAgICogQWRkcyBldmVudCBsaXN0ZW5lci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVHlwZSBvZiB0aGUgZXZlbnQgKGUuZy4gYGNoYW5nZWApLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lciBDYWxsYmFjayBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC5cbiAgICogQGV4YW1wbGVcbiAgICogdGhpcy5tb2RlbC5vbignY2hhbmdlJywgdGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7IC8vIFJlIHJlbmRlciB3aGVuIG1vZGVsIGNoYW5nZXMuXG4gICAqL1xuICBfcHJvdG8ub24gPSBmdW5jdGlvbiBvbih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignTGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIGlmICghdGhpcy5saXN0ZW5lcnMpIHRoaXMubGlzdGVuZXJzID0ge307XG4gICAgaWYgKCF0aGlzLmxpc3RlbmVyc1t0eXBlXSkgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSBbXTtcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGxpc3RlbmVyIHRoYXQgZXhlY3V0ZXMgb25jZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVHlwZSBvZiB0aGUgZXZlbnQgKGUuZy4gYGNoYW5nZWApLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lciBDYWxsYmFjayBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC5cbiAgICogQGV4YW1wbGVcbiAgICogdGhpcy5tb2RlbC5vbmNlKCdjaGFuZ2UnLCAoKSA9PiBjb25zb2xlLmxvZygnVGhpcyB3aWxsIGhhcHBlbiBvbmNlJykpO1xuICAgKi87XG4gIF9wcm90by5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBfbGlzdGVuZXIyKSB7XG4gICAgaWYgKHR5cGVvZiBfbGlzdGVuZXIyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgX2xpc3RlbmVyID0gX2xpc3RlbmVyMjtcbiAgICAgIF9saXN0ZW5lcjIgPSBmdW5jdGlvbiBsaXN0ZW5lcigpIHtcbiAgICAgICAgX2xpc3RlbmVyLmFwcGx5KHZvaWQgMCwgYXJndW1lbnRzKTtcbiAgICAgICAgc2VsZi5vZmYodHlwZSwgX2xpc3RlbmVyMik7XG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLm9uKHR5cGUsIF9saXN0ZW5lcjIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgZXZlbnQgbGlzdGVuZXJzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3R5cGVdIFR5cGUgb2YgdGhlIGV2ZW50IChlLmcuIGBjaGFuZ2VgKS4gSWYgaXMgbm90IHByb3ZpZGVkLCBpdCByZW1vdmVzIGFsbCBsaXN0ZW5lcnMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtsaXN0ZW5lcl0gQ2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuIElmIGxpc3RlbmVyIGlzIG5vdCBwcm92aWRlZCwgaXQgcmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGZvciBzcGVjaWZpZWQgdHlwZS5cbiAgICogQGV4YW1wbGVcbiAgICogdGhpcy5tb2RlbC5vZmYoJ2NoYW5nZScpOyAvLyBTdG9wIGxpc3RlbmluZyB0byBjaGFuZ2VzLlxuICAgKi87XG4gIF9wcm90by5vZmYgPSBmdW5jdGlvbiBvZmYodHlwZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAoIXR5cGUpIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghbGlzdGVuZXIpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMubGlzdGVuZXJzW3R5cGVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICAgICAgdmFyIGNvcHkgPSBsaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICAgICAgICBjb3B5LmZvckVhY2goZnVuY3Rpb24gKGZuLCBpZHgpIHtcbiAgICAgICAgICAgIGlmIChmbiA9PT0gbGlzdGVuZXIpIGxpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgZXZlbnQgb2Ygc3BlY2lmaWVkIHR5cGUuIExpc3RlbmVycyB3aWxsIHJlY2VpdmUgc3BlY2lmaWVkIGFyZ3VtZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVHlwZSBvZiB0aGUgZXZlbnQgKGUuZy4gYGNoYW5nZWApLlxuICAgKiBAcGFyYW0ge2FueX0gWy4uLmFyZ3NdIEFyZ3VtZW50cyB0byBiZSBwYXNzZWQgdG8gbGlzdGVuZXIuXG4gICAqIEBleGFtcGxlXG4gICAqIHRoaXMuZW1pdCgnaW52YWxpZCcpOyAvLyBFbWl0IHZhbGlkYXRpb24gZXJyb3IgZXZlbnQuXG4gICAqLztcbiAgX3Byb3RvLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG4gICAgdmFyIGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzICYmIHRoaXMubGlzdGVuZXJzW3R5cGVdO1xuICAgIGlmICghbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSByZXR1cm47XG4gICAgdmFyIGNvcHkgPSBsaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICBjb3B5LmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgICBmbi5hcHBseSh2b2lkIDAsIGFyZ3MpO1xuICAgIH0pO1xuICB9O1xuICByZXR1cm4gRW1pdHRlcjtcbn0oKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xudmFyIF9FbWl0dGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vRW1pdHRlci5qc1wiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cbi8qKlxuICogLSBPcmNoZXN0cmF0ZXMgZGF0YSBhbmQgYnVzaW5lc3MgbG9naWMuXG4gKiAtIEVtaXRzIGV2ZW50cyB3aGVuIGRhdGEgY2hhbmdlcy5cbiAqIFxuICogQSBgTW9kZWxgIG1hbmFnZXMgYW4gaW50ZXJuYWwgdGFibGUgb2YgZGF0YSBhdHRyaWJ1dGVzIGFuZCB0cmlnZ2VycyBjaGFuZ2UgZXZlbnRzIHdoZW4gYW55IG9mIGl0cyBkYXRhIGlzIG1vZGlmaWVkLiAgXG4gKiBNb2RlbHMgbWF5IGhhbmRsZSBzeW5jaW5nIGRhdGEgd2l0aCBhIHBlcnNpc3RlbmNlIGxheWVyLiBUbyBkZXNpZ24geW91ciBtb2RlbHMsIGNyZWF0ZSBhdG9taWMsIHJldXNhYmxlIG9iamVjdHMgXG4gKiB0aGF0IGNvbnRhaW4gYWxsIHRoZSBuZWNlc3NhcnkgZnVuY3Rpb25zIGZvciBtYW5pcHVsYXRpbmcgdGhlaXIgc3BlY2lmaWMgZGF0YS4gIFxuICogTW9kZWxzIHNob3VsZCBiZSBlYXNpbHkgcGFzc2VkIHRocm91Z2hvdXQgeW91ciBhcHAgYW5kIHVzZWQgYW55d2hlcmUgdGhlIGNvcnJlc3BvbmRpbmcgZGF0YSBpcyBuZWVkZWQuICBcbiAqIFJhc3RpIG1vZGVscyBzdG9yZXMgaXRzIGF0dHJpYnV0ZXMgaW4gYHRoaXMuYXR0cmlidXRlc2AsIHdoaWNoIGlzIGV4dGVuZGVkIGZyb20gYHRoaXMuZGVmYXVsdHNgIGFuZCB0aGUgXG4gKiBjb25zdHJ1Y3RvciBgYXR0cnNgIHBhcmFtZXRlci4gRm9yIGV2ZXJ5IGF0dHJpYnV0ZSwgYSBnZXR0ZXIgaXMgZ2VuZXJhdGVkIHRvIHJldHJpZXZlIHRoZSBtb2RlbCBwcm9wZXJ0eSBcbiAqIGZyb20gYHRoaXMuYXR0cmlidXRlc2AsIGFuZCBhIHNldHRlciBpcyBjcmVhdGVkIHRvIHNldCB0aGUgbW9kZWwgcHJvcGVydHkgaW4gYHRoaXMuYXR0cmlidXRlc2AgYW5kIGVtaXQgYGNoYW5nZWAgXG4gKiBhbmQgYGNoYW5nZTphdHRyaWJ1dGVgIGV2ZW50cy5cbiAqIEBtb2R1bGVcbiAqIEBleHRlbmRzIFJhc3RpLkVtaXR0ZXJcbiAqIEBwYXJhbSB7b2JqZWN0fSBhdHRycyBPYmplY3QgY29udGFpbmluZyBtb2RlbCBhdHRyaWJ1dGVzIHRvIGV4dGVuZCBgdGhpcy5hdHRyaWJ1dGVzYC4gR2V0dGVycyBhbmQgc2V0dGVycyBhcmUgZ2VuZXJhdGVkIGZvciBgdGhpcy5hdHRyaWJ1dHRlc2AsIGluIG9yZGVyIHRvIGVtaXQgYGNoYW5nZWAgZXZlbnRzLlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IE1vZGVsIH0gZnJvbSAncmFzdGknO1xuICogLy8gUHJvZHVjdCBtb2RlbFxuICogY2xhc3MgUHJvZHVjdE1vZGVsIGV4dGVuZHMgTW9kZWwge1xuICogICAgIHByZWluaXRpYWxpemUoKSB7XG4gKiAgICAgICAgIC8vIFRoZSBQcm9kdWN0IG1vZGVsIGhhcyBgbmFtZWAgYW5kIGBwcmljZWAgZGVmYXVsdCBhdHRyaWJ1dGVzLlxuICogICAgICAgICAvLyBgZGVmYXVsdHNgIHdpbGwgZXh0ZW5kIGB0aGlzLmF0dHJpYnV0ZXNgLlxuICogICAgICAgICAvLyBHZXR0ZXJzIGFuZCBzZXR0ZXJzIGFyZSBnZW5lcmF0ZWQgZm9yIGB0aGlzLmF0dHJpYnV0ZXNgLFxuICogICAgICAgICAvLyBpbiBvcmRlciB0byBlbWl0IGBjaGFuZ2VgIGV2ZW50cy5cbiAqICAgICAgICAgdGhpcy5kZWZhdWx0cyA9IHtcbiAqICAgICAgICAgICAgIG5hbWU6ICcnLFxuICogICAgICAgICAgICAgcHJpY2U6IDBcbiAqICAgICAgICAgfTtcbiAqICAgICB9XG4gKlxuICogICAgIHNldERpc2NvdW50KGRpc2NvdW50UGVyY2VudGFnZSkge1xuICogICAgICAgICAvLyBBcHBseSBhIGRpc2NvdW50IHRvIHRoZSBwcmljZSBwcm9wZXJ0eS5cbiAqICAgICAgICAgLy8gVGhpcyB3aWxsIGNhbGwgYSBzZXR0ZXIgdGhhdCB3aWxsIHVwZGF0ZSBgcHJpY2VgIGluIGB0aGlzLmF0dHJpYnV0ZXNgLFxuICogICAgICAgICAvLyBhbmQgZW1pdCBgY2hhbmdlYCBhbmQgYGNoYW5nZTpwcmljZWAgZXZlbnRzLlxuICogICAgICAgICBjb25zdCBkaXNjb3VudCA9IHRoaXMucHJpY2UgKiAoZGlzY291bnRQZXJjZW50YWdlIC8gMTAwKTtcbiAqICAgICAgICAgdGhpcy5wcmljZSAtPSBkaXNjb3VudDtcbiAqICAgICB9XG4gKiB9XG4gKiAvLyBDcmVhdGUgYSBwcm9kdWN0IGluc3RhbmNlIHdpdGggYSBuYW1lIGFuZCBwcmljZS5cbiAqIGNvbnN0IHByb2R1Y3QgPSBuZXcgUHJvZHVjdE1vZGVsKHsgbmFtZTogJ1NtYXJ0cGhvbmUnLCBwcmljZTogMTAwMCB9KTtcbiAqIC8vIExpc3RlbiB0byB0aGUgYGNoYW5nZTpwcmljZWAgZXZlbnQuXG4gKiBwcm9kdWN0Lm9uKCdjaGFuZ2U6cHJpY2UnLCAoKSA9PiBjb25zb2xlLmxvZygnTmV3IFByaWNlOicsIHByb2R1Y3QucHJpY2UpKTtcbiAqIC8vIEFwcGx5IGEgMTAlIGRpc2NvdW50IHRvIHRoZSBwcm9kdWN0LlxuICogcHJvZHVjdC5zZXREaXNjb3VudCgxMCk7IC8vIE91dHB1dDogXCJOZXcgUHJpY2U6IDkwMFwiXG4gKi9cbnZhciBNb2RlbCA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfRW1pdHRlcikge1xuICBmdW5jdGlvbiBNb2RlbCgpIHtcbiAgICB2YXIgX3RoaXM7XG4gICAgdmFyIGF0dHJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICBfdGhpcyA9IF9FbWl0dGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAvLyBDYWxsIHByZWluaXRpYWxpemUuXG4gICAgX3RoaXMucHJlaW5pdGlhbGl6ZS5hcHBseShfdGhpcywgYXJndW1lbnRzKTtcbiAgICAvLyBhdHRyaWJ1dGVzIG9iamVjdC5cbiAgICBfdGhpcy5hdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSwgX3RoaXMuZGVmYXVsdHMgfHwge30sIGF0dHJzKTtcbiAgICAvLyBQcmV2aW91cyBhdHRyaWJ1dGVzLlxuICAgIF90aGlzLnByZXZpb3VzID0ge307XG4gICAgLy8gR2VuZXJhdGUgZ2V0dGVycy9zZXR0ZXJzIGZvciBldmVyeSBhdHRyLlxuICAgIE9iamVjdC5rZXlzKF90aGlzLmF0dHJpYnV0ZXMpLmZvckVhY2goX3RoaXMuZGVmaW5lQXR0cmlidXRlLmJpbmQoX3RoaXMpKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogSWYgeW91IGRlZmluZSBhIHByZWluaXRpYWxpemUgbWV0aG9kLCBpdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgTW9kZWwgaXMgZmlyc3QgY3JlYXRlZCwgYmVmb3JlIGFueSBpbnN0YW50aWF0aW9uIGxvZ2ljIGlzIHJ1biBmb3IgdGhlIE1vZGVsLlxuICAgKiBAcGFyYW0ge29iamVjdH0gYXR0cnMgT2JqZWN0IGNvbnRhaW5pbmcgbW9kZWwgYXR0cmlidXRlcyB0byBleHRlbmQgYHRoaXMuYXR0cmlidXRlc2AuXG4gICAqL1xuICBfaW5oZXJpdHNMb29zZShNb2RlbCwgX0VtaXR0ZXIpO1xuICB2YXIgX3Byb3RvID0gTW9kZWwucHJvdG90eXBlO1xuICBfcHJvdG8ucHJlaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uIHByZWluaXRpYWxpemUoKSB7fVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBnZXR0ZXIvc2V0dGVyIGZvciB0aGUgZ2l2ZW4ga2V5LiBJbiBvcmRlciB0byBlbWl0IGBjaGFuZ2VgIGV2ZW50cy5cbiAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGludGVybmFsbHkgYnkgdGhlIGNvbnN0cnVjdG9yXG4gICAqIGZvciBgdGhpcy5hdHRyaWJ1dGVzYC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBBdHRyaWJ1dGUga2V5LlxuICAgKi87XG4gIF9wcm90by5kZWZpbmVBdHRyaWJ1dGUgPSBmdW5jdGlvbiBkZWZpbmVBdHRyaWJ1dGUoa2V5KSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiBfdGhpczIuZ2V0KGtleSk7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgICAgX3RoaXMyLnNldChrZXksIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW4gYXR0cmlidXRlIGZyb20gYHRoaXMuYXR0cmlidXRlc2AuXG4gICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBpbnRlcm5hbGx5IGJ5IGdlbmVyYXRlZCBnZXR0ZXJzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IEF0dHJpYnV0ZSBrZXkuXG4gICAqIEByZXR1cm4ge2FueX0gVGhlIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICovO1xuICBfcHJvdG8uZ2V0ID0gZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZXNba2V5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYW4gYXR0cmlidXRlIGludG8gYHRoaXMuYXR0cmlidXRlc2AuICBcbiAgICogRW1pdCBgY2hhbmdlYCBhbmQgYGNoYW5nZTphdHRyaWJ1dGVgIGlmIGEgdmFsdWUgY2hhbmdlLiAgXG4gICAqIENvdWxkIGJlIGNhbGxlZCBpbiB0d28gZm9ybXMsIGB0aGlzLnNldCgna2V5JywgdmFsdWUpYCBhbmRcbiAgICogYHRoaXMuc2V0KHsga2V5IDogdmFsdWUgfSlgLiAgXG4gICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBpbnRlcm5hbGx5IGJ5IGdlbmVyYXRlZCBzZXR0ZXJzLiAgXG4gICAqIFRoZSBgY2hhbmdlYCBldmVudCBsaXN0ZW5lciB3aWxsIHJlY2VpdmUgdGhlIG1vZGVsIGluc3RhbmNlLCBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgY2hhbmdlZCBhdHRyaWJ1dGVzLCBhbmQgdGhlIHJlc3Qgb2YgdGhlIGFyZ3VtZW50cyBwYXNzZWQgdG8gYHNldGAgbWV0aG9kLiAgXG4gICAqIFRoZSBgY2hhbmdlOmF0dHJpYnV0ZWAgZXZlbnQgbGlzdGVuZXIgd2lsbCByZWNlaXZlIHRoZSBtb2RlbCBpbnN0YW5jZSwgdGhlIG5ldyBhdHRyaWJ1dGUgdmFsdWUsIGFuZCB0aGUgcmVzdCBvZiB0aGUgYXJndW1lbnRzIHBhc3NlZCB0byBgc2V0YCBtZXRob2QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgQXR0cmlidXRlIGtleSBvciBvYmplY3QgY29udGFpbmluZyBrZXlzL3ZhbHVlcy5cbiAgICogQHBhcmFtIFt2YWx1ZV0gQXR0cmlidXRlIHZhbHVlLlxuICAgKiBAcmV0dXJuIHt0aGlzfSBUaGlzIG1vZGVsLlxuICAgKiBAZW1pdHMgY2hhbmdlXG4gICAqIEBlbWl0cyBjaGFuZ2U6YXR0cmlidXRlXG4gICAqLztcbiAgX3Byb3RvLnNldCA9IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG4gICAgdmFyIGF0dHJzLCBhcmdzO1xuICAgIC8vIEhhbmRsZSBib3RoIGBcImtleVwiLCB2YWx1ZWAgYW5kIGB7a2V5OiB2YWx1ZX1gIHN0eWxlIGFyZ3VtZW50cy5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgcmVzdCA9IG5ldyBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICByZXN0W19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICBhdHRycyA9IGtleTtcbiAgICAgIGFyZ3MgPSBbdmFsdWVdLmNvbmNhdChyZXN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9hdHRycztcbiAgICAgIGF0dHJzID0gKF9hdHRycyA9IHt9LCBfYXR0cnNba2V5XSA9IHZhbHVlLCBfYXR0cnMpO1xuICAgICAgYXJncyA9IHJlc3Q7XG4gICAgfVxuICAgIC8vIEFyZSB3ZSBpbiBhIG5lc3RlZCBgc2V0YCBjYWxsP1xuICAgIC8vIENhbGxpbmcgYSBgc2V0YCBpbnNpZGUgYSBgY2hhbmdlOmF0dHJpYnV0ZWAgb3IgYGNoYW5nZWAgZXZlbnQgbGlzdGVuZXJcbiAgICB2YXIgY2hhbmdpbmcgPSB0aGlzLl9jaGFuZ2luZztcbiAgICB0aGlzLl9jaGFuZ2luZyA9IHRydWU7XG4gICAgLy8gU3RvcmUgY2hhbmdlZCBhdHRyaWJ1dGVzLlxuICAgIHZhciBjaGFuZ2VkID0ge307XG4gICAgLy8gU3RvcmUgcHJldmlvdXMgYXR0cmlidXRlcy5cbiAgICBpZiAoIWNoYW5naW5nKSB7XG4gICAgICB0aGlzLnByZXZpb3VzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hdHRyaWJ1dGVzKTtcbiAgICB9XG4gICAgLy8gU2V0IGF0dHJpYnV0ZXMuXG4gICAgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgLy8gVXNlIGVxdWFsaXR5IHRvIGRldGVybWluZSBpZiB2YWx1ZSBjaGFuZ2VkLlxuICAgICAgaWYgKGF0dHJzW2tleV0gIT09IF90aGlzMy5hdHRyaWJ1dGVzW2tleV0pIHtcbiAgICAgICAgY2hhbmdlZFtrZXldID0gYXR0cnNba2V5XTtcbiAgICAgICAgX3RoaXMzLmF0dHJpYnV0ZXNba2V5XSA9IGF0dHJzW2tleV07XG4gICAgICB9XG4gICAgfSk7XG4gICAgdmFyIGNoYW5nZWRLZXlzID0gT2JqZWN0LmtleXMoY2hhbmdlZCk7XG4gICAgLy8gUGVuZGluZyBgY2hhbmdlYCBldmVudCBhcmd1bWVudHMuXG4gICAgaWYgKGNoYW5nZWRLZXlzLmxlbmd0aCkgdGhpcy5fcGVuZGluZyA9IFsnY2hhbmdlJywgdGhpcywgY2hhbmdlZF0uY29uY2F0KGFyZ3MpO1xuICAgIC8vIEVtaXQgYGNoYW5nZTphdHRyaWJ1dGVgIGV2ZW50cy5cbiAgICBjaGFuZ2VkS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIF90aGlzMy5lbWl0LmFwcGx5KF90aGlzMywgW1wiY2hhbmdlOlwiICsga2V5LCBfdGhpczMsIGF0dHJzW2tleV1dLmNvbmNhdChhcmdzKSk7XG4gICAgfSk7XG4gICAgLy8gRG9uJ3QgZW1pdCBgY2hhbmdlYCBldmVudCB1bnRpbCB0aGUgZW5kIG9mIHRoZSBuZXN0ZWQgXG4gICAgLy8gYHNldGAgY2FsbHMgaW5zaWRlIGBjaGFuZ2U6YXR0cmlidXRlYCBldmVudCBsaXN0ZW5lcnMuXG4gICAgaWYgKGNoYW5naW5nKSByZXR1cm4gdGhpcztcbiAgICAvLyBFbWl0IGBjaGFuZ2VgIGV2ZW50cywgdGhhdCBtaWdodCBiZSBuZXN0ZWQuXG4gICAgd2hpbGUgKHRoaXMuX3BlbmRpbmcpIHtcbiAgICAgIHZhciBwZW5kaW5nQ2hhbmdlID0gdGhpcy5fcGVuZGluZztcbiAgICAgIHRoaXMuX3BlbmRpbmcgPSBudWxsO1xuICAgICAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIHBlbmRpbmdDaGFuZ2UpO1xuICAgIH1cbiAgICAvLyBSZXNldCBmbGFncy5cbiAgICB0aGlzLl9wZW5kaW5nID0gbnVsbDtcbiAgICB0aGlzLl9jaGFuZ2luZyA9IGZhbHNlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBvYmplY3QgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIHRvIGJlIHVzZWQgZm9yIEpTT04gc2VyaWFsaXphdGlvbi5cbiAgICogQnkgZGVmYXVsdCByZXR1cm5zIGB0aGlzLmF0dHJpYnV0ZXNgLlxuICAgKiBAcmV0dXJuIHtvYmplY3R9IE9iamVjdCByZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgdG8gYmUgdXNlZCBmb3IgSlNPTiBzZXJpYWxpemF0aW9uLlxuICAgKi87XG4gIF9wcm90by50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlcztcbiAgfTtcbiAgcmV0dXJuIE1vZGVsO1xufShfRW1pdHRlcjJbXCJkZWZhdWx0XCJdKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xudmFyIF9FbWl0dGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vRW1pdHRlci5qc1wiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cbi8vIFRoaXMgb3B0aW9ucyBrZXlzIHdpbGwgYmUgZXh0ZW5kZWQgb24gdmlldyBpbnN0YW5jZS5cbnZhciB2aWV3T3B0aW9ucyA9IHtcbiAgZWw6IHRydWUsXG4gIHRhZzogdHJ1ZSxcbiAgYXR0cmlidXRlczogdHJ1ZSxcbiAgZXZlbnRzOiB0cnVlLFxuICBtb2RlbDogdHJ1ZSxcbiAgdGVtcGxhdGU6IHRydWUsXG4gIG9uRGVzdHJveTogdHJ1ZVxufTtcblxuLyoqXG4gKiAtIExpc3RlbnMgZm9yIGNoYW5nZXMgYW5kIHJlbmRlcnMgVUkuXG4gKiAtIEhhbmRsZXMgdXNlciBpbnB1dCBhbmQgaW50ZXJhY3Rpdml0eS5cbiAqIC0gU2VuZHMgY2FwdHVyZWQgaW5wdXQgdG8gdGhlIG1vZGVsLlxuICpcbiAqIEEgYFZpZXdgIGlzIGFuIGF0b21pYyB1bml0IG9mIHRoZSB1c2VyIGludGVyZmFjZSB0aGF0IGNhbiByZW5kZXIgdGhlIGRhdGEgZnJvbSBhIHNwZWNpZmljIG1vZGVsIG9yIG11bHRpcGxlIG1vZGVscy5cbiAqIEhvd2V2ZXIsIHZpZXdzIGNhbiBhbHNvIGJlIGluZGVwZW5kZW50IGFuZCBoYXZlIG5vIGFzc29jaWF0ZWQgZGF0YS4gIFxuICogTW9kZWxzIG11c3QgYmUgdW5hd2FyZSBvZiB2aWV3cy4gVmlld3MsIG9uIHRoZSBvdGhlciBoYW5kLCBtYXkgcmVuZGVyIG1vZGVsIGRhdGEgYW5kIGxpc3RlbiB0byB0aGUgY2hhbmdlIGV2ZW50cyBcbiAqIGVtaXR0ZWQgYnkgdGhlIG1vZGVscyB0byByZS1yZW5kZXIgdGhlbXNlbHZlcyBiYXNlZCBvbiBjaGFuZ2VzLiAgXG4gKiBFYWNoIGBWaWV3YCBoYXMgYSByb290IGVsZW1lbnQsIGB0aGlzLmVsYCwgd2hpY2ggaXMgdXNlZCBmb3IgZXZlbnQgZGVsZWdhdGlvbi4gIFxuICogQWxsIGVsZW1lbnQgbG9va3VwcyBhcmUgc2NvcGVkIHRvIHRoaXMgZWxlbWVudCwgYW5kIGFueSByZW5kZXJpbmcgb3IgRE9NIG1hbmlwdWxhdGlvbnMgc2hvdWxkIGJlIGRvbmUgaW5zaWRlIGl0LiBcbiAqIElmIGB0aGlzLmVsYCBpcyBub3QgcHJlc2VudCwgYW4gZWxlbWVudCB3aWxsIGJlIGNyZWF0ZWQgdXNpbmcgYHRoaXMudGFnYCAoZGVmYXVsdGluZyB0byBkaXYpIGFuZCBgdGhpcy5hdHRyaWJ1dGVzYC5cbiAqIEBtb2R1bGVcbiAqIEBleHRlbmRzIFJhc3RpLkVtaXR0ZXJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIG9wdGlvbnMuIFRoZSBmb2xsb3dpbmcga2V5cyB3aWxsIGJlIG1lcmdlZCB0byBgdGhpc2A6IGVsLCB0YWcsIGF0dHJpYnV0ZXMsIGV2ZW50cywgbW9kZWwsIHRlbXBsYXRlLCBvbkRlc3Ryb3kuXG4gKiBAcHJvcGVydHkge25vZGV9IGVsIEV2ZXJ5IHZpZXcgaGFzIGEgcm9vdCBlbGVtZW50LCBgdGhpcy5lbGAuIElmIG5vdCBwcmVzZW50IGl0IHdpbGwgYmUgY3JlYXRlZC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0YWcgSWYgYHRoaXMuZWxgIGlzIG5vdCBwcmVzZW50LCBhbiBlbGVtZW50IHdpbGwgYmUgY3JlYXRlZCB1c2luZyBgdGhpcy50YWdgLiBEZWZhdWx0IGlzIGBkaXZgLlxuICogQHByb3BlcnR5IHtvYmplY3R9IGF0dHJpYnV0ZXMgSWYgYHRoaXMuZWxgIGlzIG5vdCBwcmVzZW50LCBhbiBlbGVtZW50IHdpbGwgYmUgY3JlYXRlZCB1c2luZyBgdGhpcy5hdHRyaWJ1dGVzYC5cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBldmVudHMgT2JqZWN0IGluIHRoZSBmb3JtYXQgYHsnZXZlbnQgc2VsZWN0b3InIDogJ2xpc3RlbmVyJ31gLiBVc2VkIHRvIGJpbmQgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVycyB0byByb290IGVsZW1lbnQuXG4gKiBAcHJvcGVydHkge29iamVjdH0gbW9kZWwgQSBgUmFzdGkuTW9kZWxgIG9yIGFueSBvYmplY3QgY29udGFpbmluZyBkYXRhIGFuZCBidXNpbmVzcyBsb2dpYy5cbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IHRlbXBsYXRlIEEgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyBkYXRhIGFuZCByZXR1cm5zIGEgbWFya3VwIHN0cmluZyAoaHRtbCBmb3IgZXhhbXBsZSkuXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgVmlldyB9IGZyb20gJ3Jhc3RpJztcbiAqIFxuICogY2xhc3MgVGltZXIgZXh0ZW5kcyBWaWV3IHtcbiAqICAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gKiAgICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICogICAgICAgICAvLyBDcmVhdGUgbW9kZWwgdG8gc3RvcmUgaW50ZXJuYWwgc3RhdGUuIFNldCBgc2Vjb25kc2AgYXR0cmlidXRlIGludG8gMC5cbiAqICAgICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbCh7IHNlY29uZHMgOiAwIH0pO1xuICogICAgICAgICAvLyBMaXN0ZW4gdG8gY2hhbmdlcyBpbiBtb2RlbCBgc2Vjb25kc2AgYXR0cmlidXRlIGFuZCByZSByZW5kZXIuXG4gKiAgICAgICAgIHRoaXMubW9kZWwub24oJ2NoYW5nZTpzZWNvbmRzJywgdGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XG4gKiAgICAgICAgIC8vIEluY3JlbWVudCBtb2RlbCBgc2Vjb25kc2AgYXR0cmlidXRlIGV2ZXJ5IDEwMDAgbWlsbGlzZWNvbmRzLlxuICogICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5tb2RlbC5zZWNvbmRzKyssIDEwMDApO1xuICogICAgIH1cbiAqXG4gKiAgICAgdGVtcGxhdGUobW9kZWwpIHtcbiAqICAgICAgICAgcmV0dXJuIGBTZWNvbmRzOiA8c3Bhbj4ke21vZGVsLnNlY29uZHN9PC9zcGFuPmA7XG4gKiAgICAgfVxuICogfVxuICogLy8gUmVuZGVyIHZpZXcgYW5kIGFwcGVuZCB2aWV3J3MgZWxlbWVudCBpbnRvIGJvZHkuXG4gKiBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5ldyBUaW1lcigpLnJlbmRlcigpLmVsKTtcbiAqL1xudmFyIFZpZXcgPSBleHBvcnRzW1wiZGVmYXVsdFwiXSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0VtaXR0ZXIpIHtcbiAgZnVuY3Rpb24gVmlldygpIHtcbiAgICB2YXIgX3RoaXM7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgIF90aGlzID0gX0VtaXR0ZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIC8vIENhbGwgcHJlaW5pdGlhbGl6ZS5cbiAgICBfdGhpcy5wcmVpbml0aWFsaXplLmFwcGx5KF90aGlzLCBhcmd1bWVudHMpO1xuICAgIC8vIEdlbmVyYXRlIHVuaXF1ZSBpZC5cbiAgICAvLyBVc2VmdWwgdG8gZ2VuZXJhdGUgZWxlbWVudHMgaWRzLlxuICAgIF90aGlzLnVpZCA9IFwidWlkXCIgKyArK1ZpZXcudWlkO1xuICAgIC8vIFN0b3JlIGRlbGVnYXRlZCBldmVudHMgbGlzdGVuZXJzLFxuICAgIC8vIHNvIHRoZXkgY2FuIGJlIHVuYm91bmQgbGF0ZXIuXG4gICAgX3RoaXMuZGVsZWdhdGVkRXZlbnRMaXN0ZW5lcnMgPSBbXTtcbiAgICAvLyBTdG9yZSBjaGlsZCB2aWV3cyxcbiAgICAvLyBzbyB0aGV5IGNhbiBiZSBkZXN0cm95ZWQuXG4gICAgX3RoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAvLyBFeHRlbmQgXCJ0aGlzXCIgd2l0aCBvcHRpb25zLCBtYXBwaW5nIHZpZXdPcHRpb25zIGtleXMuXG4gICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAodmlld09wdGlvbnNba2V5XSkgX3RoaXNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICB9KTtcbiAgICAvLyBFbnN1cmUgdGhhdCB0aGUgdmlldyBoYXMgYSByb290IGVsZW1lbnQgYXQgYHRoaXMuZWxgLlxuICAgIF90aGlzLmVuc3VyZUVsZW1lbnQoKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogSWYgeW91IGRlZmluZSBhIHByZWluaXRpYWxpemUgbWV0aG9kLCBpdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgdmlldyBpcyBmaXJzdCBjcmVhdGVkLCBiZWZvcmUgYW55IGluc3RhbnRpYXRpb24gbG9naWMgaXMgcnVuLlxuICAgKiBAcGFyYW0ge29iamVjdH0gYXR0cnMgT2JqZWN0IGNvbnRhaW5pbmcgbW9kZWwgYXR0cmlidXRlcyB0byBleHRlbmQgYHRoaXMuYXR0cmlidXRlc2AuXG4gICAqL1xuICBfaW5oZXJpdHNMb29zZShWaWV3LCBfRW1pdHRlcik7XG4gIHZhciBfcHJvdG8gPSBWaWV3LnByb3RvdHlwZTtcbiAgX3Byb3RvLnByZWluaXRpYWxpemUgPSBmdW5jdGlvbiBwcmVpbml0aWFsaXplKCkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IG1hdGNoIHRoZSBzZWxlY3RvciwgXG4gICAqIHNjb3BlZCB0byBET00gZWxlbWVudHMgd2l0aGluIHRoZSBjdXJyZW50IHZpZXcncyByb290IGVsZW1lbnQgKGB0aGlzLmVsYCkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciBDU1Mgc2VsZWN0b3IuXG4gICAqIEByZXR1cm4ge25vZGV9IEVsZW1lbnQgbWF0Y2hpbmcgc2VsZWN0b3Igd2l0aGluIHRoZSB2aWV3J3Mgcm9vdCBlbGVtZW50IChgdGhpcy5lbGApLlxuICAgKi87XG4gIF9wcm90by4kID0gZnVuY3Rpb24gJChzZWxlY3Rvcikge1xuICAgIHJldHVybiB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGVsZW1lbnRzIHRoYXQgbWF0Y2ggdGhlIHNlbGVjdG9yLCBcbiAgICogc2NvcGVkIHRvIERPTSBlbGVtZW50cyB3aXRoaW4gdGhlIGN1cnJlbnQgdmlldydzIHJvb3QgZWxlbWVudCAoYHRoaXMuZWxgKS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIENTUyBzZWxlY3Rvci5cbiAgICogQHJldHVybiB7bm9kZVtdfSBMaXN0IG9mIGVsZW1lbnRzIG1hdGNoaW5nIHNlbGVjdG9yIHdpdGhpbiB0aGUgdmlldydzIHJvb3QgZWxlbWVudCAoYHRoaXMuZWxgKS5cbiAgICovO1xuICBfcHJvdG8uJCQgPSBmdW5jdGlvbiAkJChzZWxlY3Rvcikge1xuICAgIHJldHVybiB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhlIHZpZXcuXG4gICAqIERlc3Ryb3kgY2hpbGRyZW4gdmlld3MgaWYgYW55LCB1bmRlbGVnYXRlIGV2ZW50cywgc3RvcCBsaXN0ZW5pbmcgdG8gZXZlbnRzLCBjYWxsIGBvbkRlc3Ryb3lgIGxpZmVjeWNsZSBtZXRob2QuXG4gICAqIEByZXR1cm4ge1Jhc3RpLlZpZXd9IFJldHVybiBgdGhpc2AgZm9yIGNoYWluaW5nLlxuICAgKi87XG4gIF9wcm90by5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAvLyBDYWxsIGRlc3Ryb3kgb24gY2hpbGRyZW4uXG4gICAgdGhpcy5kZXN0cm95Q2hpbGRyZW4oKTtcbiAgICAvLyBVbmRlbGVnYXRlIGB0aGlzLmVsYCBldmVudCBsaXN0ZW5lcnNcbiAgICB0aGlzLnVuZGVsZWdhdGVFdmVudHMoKTtcbiAgICAvLyBVbmJpbmQgYHRoaXNgIGV2ZW50cy5cbiAgICB0aGlzLm9mZigpO1xuICAgIC8vIENhbGwgb25EZXN0cm95IGxpZmVjeWNsZSBtZXRob2RcbiAgICB0aGlzLm9uRGVzdHJveS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIC8vIFJldHVybiBgdGhpc2AgZm9yIGNoYWluaW5nLlxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIGBvbkRlc3Ryb3lgIGxpZmVjeWNsZSBtZXRob2QgaXMgY2FsbGVkIGFmdGVyIHZpZXcgaXMgZGVzdHJveWVkLlxuICAgKiBPdmVycmlkZSB3aXRoIHlvdXIgY29kZS4gVXNlZnVsIHRvIHN0b3AgbGlzdGVuaW5nIHRvIG1vZGVsJ3MgZXZlbnRzLlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBPcHRpb25zIG9iamVjdCBvciBhbnkgYXJndW1lbnRzIHBhc3NlZCB0byBgZGVzdHJveWAgbWV0aG9kLlxuICAgKi87XG4gIF9wcm90by5vbkRlc3Ryb3kgPSBmdW5jdGlvbiBvbkRlc3Ryb3koKSB7fVxuXG4gIC8qKlxuICAgKiBBZGQgYSB2aWV3IGFzIGEgY2hpbGQuXG4gICAqIENoaWxkcmVuIHZpZXdzIGFyZSBzdG9yZWQgYXQgYHRoaXMuY2hpbGRyZW5gLCBhbmQgZGVzdHJveWVkIHdoZW4gdGhlIHBhcmVudCBpcyBkZXN0cm95ZWQuXG4gICAqIFJldHVybnMgdGhlIGNoaWxkIGZvciBjaGFpbmluZy5cbiAgICogQHBhcmFtIHtSYXN0aS5WaWV3fSBjaGlsZFxuICAgKiBAcmV0dXJuIHtSYXN0aS5WaWV3fVxuICAgKi87XG4gIF9wcm90by5hZGRDaGlsZCA9IGZ1bmN0aW9uIGFkZENoaWxkKGNoaWxkKSB7XG4gICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICByZXR1cm4gY2hpbGQ7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCBkZXN0cm95IG1ldGhvZCBvbiBjaGlsZHJlbiB2aWV3cy5cbiAgICovO1xuICBfcHJvdG8uZGVzdHJveUNoaWxkcmVuID0gZnVuY3Rpb24gZGVzdHJveUNoaWxkcmVuKCkge1xuICAgIHdoaWxlICh0aGlzLmNoaWxkcmVuLmxlbmd0aCkgdGhpcy5jaGlsZHJlbi5zaGlmdCgpLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmUgdGhhdCB0aGUgdmlldyBoYXMgYSByb290IGVsZW1lbnQgYXQgYHRoaXMuZWxgLlxuICAgKiBZb3Ugc2hvdWxkbid0IGNhbGwgdGhpcyBtZXRob2QgZGlyZWN0bHkuIEl0J3MgY2FsbGVkIGZyb20gY29uc3RydWN0b3IuXG4gICAqIFlvdSBtYXkgb3ZlcnJpZGUgaXQgaWYgeW91IHdhbnQgdG8gdXNlIGEgZGlmZmVyZW50IGxvZ2ljIG9yIHRvIFxuICAgKiBwb3N0cG9uZSBlbGVtZW50IGNyZWF0aW9uLlxuICAgKi87XG4gIF9wcm90by5lbnN1cmVFbGVtZW50ID0gZnVuY3Rpb24gZW5zdXJlRWxlbWVudCgpIHtcbiAgICAvLyBJZiBcInRoaXMuZWxcIiBpcyBub3QgcHJlc2VudCxcbiAgICAvLyBjcmVhdGUgYSBuZXcgZWxlbWVudCBhY2NvcmRpbmcgXCJ0aGlzLnRhZ1wiXG4gICAgLy8gYW5kIFwidGhpcy5hdHRyaWJ1dGVzXCIuXG4gICAgaWYgKCF0aGlzLmVsKSB0aGlzLmVsID0gdGhpcy5jcmVhdGVFbGVtZW50KHRoaXMudGFnLCB0aGlzLmF0dHJpYnV0ZXMpO1xuICAgIC8vIERlbGVnYXRlIGV2ZW50cyBvbiBlbGVtZW50LlxuICAgIHRoaXMuZGVsZWdhdGVFdmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gZWxlbWVudC5cbiAgICogQ2FsbGVkIGZyb20gY29uc3RydWN0b3IgaWYgYHRoaXMuZWxgIGlzIHVuZGVmaW5lZCwgdG8gZW5zdXJlXG4gICAqIHRoZSB2aWV3IHRvIGhhdmUgYSByb290IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGFnIGZvciB0aGUgZWxlbWVudC4gRGVmYXVsdCB0byBgZGl2YFxuICAgKiBAcGFyYW0ge29iamVjdH0gYXR0cnMgQXR0cmlidXRlcyBmb3IgdGhlIGVsZW1lbnQuXG4gICAqIEByZXR1cm4ge25vZGV9IFRoZSBjcmVhdGVkIGVsZW1lbnQuXG4gICAqLztcbiAgX3Byb3RvLmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KCkge1xuICAgIHZhciB0YWcgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICdkaXYnO1xuICAgIHZhciBhdHRycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgLy8gQ3JlYXRlIGRvbSBlbGVtZW50LlxuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAvLyBBZGQgZWxlbWVudCBhdHRyaWJ1dGVzLlxuICAgIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGB0aGlzLmVsYCBmcm9tIERPTS5cbiAgICogQHJldHVybiB7UmFzdGkuVmlld30gUmV0dXJuIGB0aGlzYCBmb3IgY2hhaW5pbmcuXG4gICAqLztcbiAgX3Byb3RvLnJlbW92ZUVsZW1lbnQgPSBmdW5jdGlvbiByZW1vdmVFbGVtZW50KCkge1xuICAgIHRoaXMuZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmVsKTtcbiAgICAvLyBSZXR1cm4gYHRoaXNgIGZvciBjaGFpbmluZy5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm92aWRlIGRlY2xhcmF0aXZlIGxpc3RlbmVycyBmb3IgRE9NIGV2ZW50cyB3aXRoaW4gYSB2aWV3LiBJZiBhbiBldmVudHMgaGFzaCBpcyBub3QgcGFzc2VkIGRpcmVjdGx5LCB1c2VzIGB0aGlzLmV2ZW50c2AgYXMgdGhlIHNvdXJjZS4gIFxuICAgKiBFdmVudHMgYXJlIHdyaXR0ZW4gaW4gdGhlIGZvcm1hdCBgeydldmVudCBzZWxlY3RvcicgOiAnbGlzdGVuZXInfWAuIFRoZSBsaXN0ZW5lciBtYXkgYmUgZWl0aGVyIHRoZSBuYW1lIG9mIGEgbWV0aG9kIG9uIHRoZSB2aWV3LCBvciBhIGRpcmVjdCBmdW5jdGlvbiBib2R5LlxuICAgKiBPbWl0dGluZyB0aGUgc2VsZWN0b3IgY2F1c2VzIHRoZSBldmVudCB0byBiZSBib3VuZCB0byB0aGUgdmlldydzIHJvb3QgZWxlbWVudCAoYHRoaXMuZWxgKS4gIFxuICAgKiBCeSBkZWZhdWx0LCBgZGVsZWdhdGVFdmVudHNgIGlzIGNhbGxlZCB3aXRoaW4gdGhlIFZpZXcncyBjb25zdHJ1Y3RvciwgXG4gICAqIHNvIGlmIHlvdSBoYXZlIGEgc2ltcGxlIGV2ZW50cyBoYXNoLCBhbGwgb2YgeW91ciBET00gZXZlbnRzIHdpbGwgYWx3YXlzIGFscmVhZHkgYmUgY29ubmVjdGVkLCBhbmQgeW91IHdpbGwgbmV2ZXIgaGF2ZSB0byBjYWxsIHRoaXMgZnVuY3Rpb24geW91cnNlbGYuICAgXG4gICAqIEFsbCBhdHRhY2hlZCBsaXN0ZW5lcnMgYXJlIGJvdW5kIHRvIHRoZSB2aWV3IGF1dG9tYXRpY2FsbHksIHNvIHdoZW4gdGhlIGxpc3RlbmVycyBhcmUgaW52b2tlZCwgYHRoaXNgIGNvbnRpbnVlcyB0byByZWZlciB0byB0aGUgdmlldyBvYmplY3QuICBcbiAgICogV2hlbiBgZGVsZWdhdGVFdmVudHNgIGlzIHJ1biBhZ2FpbiwgcGVyaGFwcyB3aXRoIGEgZGlmZmVyZW50IGV2ZW50cyBoYXNoLCBhbGwgbGlzdGVuZXJzIGFyZSByZW1vdmVkIGFuZCBkZWxlZ2F0ZWQgYWZyZXNoLlxuICAgKiBAcGFyYW0ge29iamVjdH0gW2V2ZW50c10gT2JqZWN0IGluIHRoZSBmb3JtYXQgYHsnZXZlbnQgc2VsZWN0b3InIDogJ2xpc3RlbmVyJ31gLiBVc2VkIHRvIGJpbmQgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVycyB0byByb290IGVsZW1lbnQuXG4gICAqIEByZXR1cm4ge1Jhc3RpLlZpZXd9IFJldHVybiBgdGhpc2AgZm9yIGNoYWluaW5nLlxuICAgKiBAZXhhbXBsZVxuICAgKiBNeVZpZXcucHJvdG90eXBlLmV2ZW50cyA9IHtcbiAgICogICAgICAnY2xpY2sgYnV0dG9uLm9rJyA6ICdvbkNsaWNrT2tCdXR0b24nLFxuICAgKiAgICAgICdjbGljayBidXR0b24uY2FuY2VsJyA6IGZ1bmN0aW9uKCkge31cbiAgICogfTtcbiAgICovO1xuICBfcHJvdG8uZGVsZWdhdGVFdmVudHMgPSBmdW5jdGlvbiBkZWxlZ2F0ZUV2ZW50cygpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICB2YXIgZXZlbnRzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0aGlzLmV2ZW50cztcbiAgICBpZiAoIWV2ZW50cykgcmV0dXJuIHRoaXM7XG4gICAgaWYgKHRoaXMuZGVsZWdhdGVkRXZlbnRMaXN0ZW5lcnMubGVuZ3RoKSB0aGlzLnVuZGVsZWdhdGVFdmVudHMoKTtcblxuICAgIC8vIFN0b3JlIGV2ZW50cyBieSB0eXBlIGkuZS46IFwiY2xpY2tcIiwgXCJzdWJtaXRcIiwgZXRjLlxuICAgIHZhciBldmVudFR5cGVzID0ge307XG4gICAgT2JqZWN0LmtleXMoZXZlbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBrZXlQYXJ0cyA9IGtleS5zcGxpdCgnICcpO1xuICAgICAgdmFyIHR5cGUgPSBrZXlQYXJ0cy5zaGlmdCgpO1xuICAgICAgdmFyIHNlbGVjdG9yID0ga2V5UGFydHMuam9pbignICcpO1xuICAgICAgdmFyIGxpc3RlbmVyID0gZXZlbnRzW2tleV07XG4gICAgICAvLyBMaXN0ZW5lciBtYXkgYmUgYSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgbWV0aG9kIG5hbWUgb24gdGhlIHZpZXcsXG4gICAgICAvLyBvciBhIGZ1bmN0aW9uLlxuICAgICAgbGlzdGVuZXIgPSAodHlwZW9mIGxpc3RlbmVyID09PSAnc3RyaW5nJyA/IF90aGlzMltsaXN0ZW5lcl0gOiBsaXN0ZW5lcikuYmluZChfdGhpczIpO1xuICAgICAgaWYgKCFldmVudFR5cGVzW3R5cGVdKSBldmVudFR5cGVzW3R5cGVdID0gW107XG4gICAgICBldmVudFR5cGVzW3R5cGVdLnB1c2goe1xuICAgICAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lclxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgT2JqZWN0LmtleXMoZXZlbnRUeXBlcykuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgLy8gTGlzdGVuZXIgZm9yIHRoZSB0eXBlIG9mIGV2ZW50LlxuICAgICAgdmFyIHR5cGVMaXN0ZW5lciA9IGZ1bmN0aW9uIHR5cGVMaXN0ZW5lcihldmVudCkge1xuICAgICAgICAvLyBJdGVyYXRlIGFuZCBydW4gZXZlcnkgaW5kaXZpZHVhbCBsaXN0ZW5lciBpZiB0aGUgc2VsZWN0b3IgbWF0Y2hlcy5cbiAgICAgICAgZXZlbnRUeXBlc1t0eXBlXS5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgICAgdmFyIHNlbGVjdG9yID0gX3JlZi5zZWxlY3RvcixcbiAgICAgICAgICAgIGxpc3RlbmVyID0gX3JlZi5saXN0ZW5lcjtcbiAgICAgICAgICBpZiAoIXNlbGVjdG9yIHx8IGV2ZW50LnRhcmdldC5jbG9zZXN0KHNlbGVjdG9yKSkgbGlzdGVuZXIoZXZlbnQsIF90aGlzMik7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIF90aGlzMi5kZWxlZ2F0ZWRFdmVudExpc3RlbmVycy5wdXNoKHtcbiAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgbGlzdGVuZXI6IHR5cGVMaXN0ZW5lclxuICAgICAgfSk7XG4gICAgICBfdGhpczIuZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB0eXBlTGlzdGVuZXIpO1xuICAgIH0pO1xuICAgIC8vIFJldHVybiBgdGhpc2AgZm9yIGNoYWluaW5nLlxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIG9mIHRoZSB2aWV3J3MgZGVsZWdhdGVkIGV2ZW50cy4gVXNlZnVsIGlmIHlvdSB3YW50IHRvIGRpc2FibGUgb3IgcmVtb3ZlIGEgdmlldyBmcm9tIHRoZSBET00gdGVtcG9yYXJpbHkuIENhbGxlZCBhdXRvbWF0aWNhbGx5IHdoZW4gdGhlIHZpZXcgaXMgZGVzdHJveWVkLlxuICAgKiBAcmV0dXJuIHtSYXN0aS5WaWV3fSBSZXR1cm4gYHRoaXNgIGZvciBjaGFpbmluZy5cbiAgICovO1xuICBfcHJvdG8udW5kZWxlZ2F0ZUV2ZW50cyA9IGZ1bmN0aW9uIHVuZGVsZWdhdGVFdmVudHMoKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG4gICAgdGhpcy5kZWxlZ2F0ZWRFdmVudExpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgdmFyIHR5cGUgPSBfcmVmMi50eXBlLFxuICAgICAgICBsaXN0ZW5lciA9IF9yZWYyLmxpc3RlbmVyO1xuICAgICAgX3RoaXMzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuICAgIH0pO1xuICAgIHRoaXMuZGVsZWdhdGVkRXZlbnRMaXN0ZW5lcnMgPSBbXTtcbiAgICAvLyBSZXR1cm4gYHRoaXNgIGZvciBjaGFpbmluZy5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgdGhlIHZpZXcuXG4gICAqIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVycmlkZGVuIHdpdGggY3VzdG9tIGxvZ2ljLlxuICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBzZXRzIGlubmVySFRNTCBvZiBgdGhpcy5lbGAgd2l0aCBgdGhpcy50ZW1wbGF0ZWAuXG4gICAqIENvbnZlbnRpb25zIGFyZSB0byBvbmx5IG1hbmlwdWxhdGUgdGhlIGRvbSBpbiB0aGUgc2NvcGUgb2YgYHRoaXMuZWxgLCBcbiAgICogYW5kIHRvIHJldHVybiBgdGhpc2AgZm9yIGNoYWluaW5nLlxuICAgKiBJZiB5b3UgYWRkZWQgYW55IGNoaWxkIHZpZXcsIHlvdSBtdXN0IGNhbGwgYHRoaXMuZGVzdHJveUNoaWxkcmVuYC5cbiAgICogQHJldHVybiB7UmFzdGkuVmlld30gUmV0dXJuIGB0aGlzYCBmb3IgY2hhaW5pbmcuXG4gICAqLztcbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy50ZW1wbGF0ZSkgdGhpcy5lbC5pbm5lckhUTUwgPSB0aGlzLnRlbXBsYXRlKHRoaXMubW9kZWwpO1xuICAgIC8vIFJldHVybiBgdGhpc2AgZm9yIGNoYWluaW5nLlxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICByZXR1cm4gVmlldztcbn0oX0VtaXR0ZXIyW1wiZGVmYXVsdFwiXSk7XG4vKlxuICogVW5pcXVlIElkXG4gKi9cblZpZXcudWlkID0gMDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBfRW1pdHRlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vRW1pdHRlci5qc1wiKSk7XG5leHBvcnRzLkVtaXR0ZXIgPSBfRW1pdHRlcltcImRlZmF1bHRcIl07XG52YXIgX01vZGVsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9Nb2RlbC5qc1wiKSk7XG5leHBvcnRzLk1vZGVsID0gX01vZGVsW1wiZGVmYXVsdFwiXTtcbnZhciBfVmlldyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vVmlldy5qc1wiKSk7XG5leHBvcnRzLlZpZXcgPSBfVmlld1tcImRlZmF1bHRcIl07XG52YXIgX0NvbXBvbmVudCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vQ29tcG9uZW50LmpzXCIpKTtcbmV4cG9ydHMuQ29tcG9uZW50ID0gX0NvbXBvbmVudFtcImRlZmF1bHRcIl07XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH0iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgKCFzY3JpcHRVcmwgfHwgIS9eaHR0cChzPyk6Ly50ZXN0KHNjcmlwdFVybCkpKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIi8vIEltYWdlc1xuaW1wb3J0ICcuL2ltZy9jaGFyYWN0ZXJzMS5wbmcnO1xuaW1wb3J0ICcuL2ltZy9taXNjLnBuZyc7XG5pbXBvcnQgJy4vaW1nL3BpbGxzMS5wbmcnO1xuLy8gQXVkaW9cbmltcG9ydCAnLi9hdWRpby9iYWNrLm1wMyc7XG5pbXBvcnQgJy4vYXVkaW8vYm9udXMubXAzJztcbmltcG9ydCAnLi9hdWRpby9kZWFkLm1wMyc7XG5pbXBvcnQgJy4vYXVkaW8vZG90Lm1wMyc7XG5pbXBvcnQgJy4vYXVkaW8vZWF0Lm1wMyc7XG5pbXBvcnQgJy4vYXVkaW8vZWF0ZW4ubXAzJztcbmltcG9ydCAnLi9hdWRpby9mcmlnaHRlbmVkLm1wMyc7XG5pbXBvcnQgJy4vYXVkaW8vaW50cm8ubXAzJztcbmltcG9ydCAnLi9hdWRpby9saWZlLm1wMyc7XG4vLyBDU1NcbmltcG9ydCAnLi9zdHlsZXMuY3NzJztcblxuaW1wb3J0IEdhbWUgZnJvbSAnLi9qcy9HYW1lJztcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcGFjbWFuLWNvbnRhaW5lcicpO1xuXG4gICAgY29uc3QgdncgPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgMCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG4gICAgY29uc3QgdmggPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IDAsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKTtcblxuICAgIGNsYXNzIEdhbWVXaXRoUG9zaXRpb24gZXh0ZW5kcyBHYW1lIHtcbiAgICAgICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmxlZnQgPSAnNTAlJztcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUubWFyZ2luTGVmdCA9IGAtJHt0aGlzLmVsLm9mZnNldFdpZHRoIC8gMn1weGA7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnRvcCA9ICc1MCUnO1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5tYXJnaW5Ub3AgPSBgLSR7dGhpcy5lbC5vZmZzZXRIZWlnaHQgLyAyfXB4YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGdhbWUgPSBuZXcgR2FtZVdpdGhQb3NpdGlvbih7XG4gICAgICAgIGVsIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXBhY21hbi1wbGF5Z3JvdW5kJyksXG4gICAgICAgIHdpZHRoIDogdncgKiAwLjksXG4gICAgICAgIGhlaWdodCA6IHZoICogMC45XG4gICAgfSk7XG5cbn0pO1xuIl0sIm5hbWVzIjpbIkFuaW1hdGlvbiIsIkNoYXJhY3RlciIsImdldERpc3RhbmNlIiwiYW5pbWF0aW9uQmFzZSIsImltYWdlVVJMIiwib2Zmc2V0WSIsIm9mZnNldFgiLCJhbmltYXRpb25zIiwiX2V4dGVuZHMiLCJkZWZhdWx0cyIsInNwZWVkIiwic2NvcmUiLCJCb251cyIsIl9DaGFyYWN0ZXIiLCJvcHRpb25zIiwiX3RoaXMiLCJjYWxsIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJhZGRQYWNtYW5Qb3NpdGlvbkV2ZW50TGlzdGVuZXIiLCJvbiIsInRpbGUiLCJfZGlyIiwiX25leHREaXIiLCJnZXROZXh0RGlyZWN0aW9uIiwiX2VhdEV2ZW50IiwiZ2V0VGlsZSIsIl9nZXRUYXJnZXQiLCJfdGFyZ2V0Rm91bmQiLCJlbWl0IiwiZGF0YSIsInBhY21hbkRhdGEiLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsIm1vdmUiLCJwYWNtYW5UaWxlIiwib3Bwb3NpdGUiLCJfZ2V0T3BEaXJlY3Rpb24iLCJkaXIiLCJnZXQiLCJfbmV4dEFuaW1hdGlvbiIsInVwZGF0ZSIsInRhcmdldFRpbGUiLCJuZXh0VGlsZSIsImRpcmVjdGlvbnMiLCJuZXh0RGlyZWN0aW9uIiwibGFzdERpc3RhbmNlIiwiaSIsImNhbkdvIiwidGVzdFRpbGUiLCJkaXN0YW5jZSIsImlzV2FsbCIsImlzSG91c2UiLCJtYXAiLCJ0dW5uZWxzIiwic2V0TmV4dEFuaW1hdGlvbiIsImFzc2lnbiIsIm1ha2VCb251cyIsIkJvbnVzZXMiLCJib251c2VzIiwieCIsInkiLCJtb2RlbCIsImJvbnVzIiwiZmFjdG9yIiwibm9ybWFsaXplUmVmcmFzaFJhdGUiLCJhZGRTcHJpdGUiLCJwdXNoIiwibGV2ZWwiLCJoaWRlIiwicmVuZGVyIiwiYmluZCIsInNob3ciLCJJdGVtIiwid2lkdGgiLCJoZWlnaHQiLCJzdGVwIiwicHJldHVybiIsImFuaW1hdGlvbkxhYmVsc0J5RGlyZWN0aW9ucyIsImwiLCJyIiwidSIsImQiLCJvcHBvc2l0ZURpcmVjdGlvbnMiLCJfSXRlbSIsInBhdXNlQW5pbWF0aW9uIiwiX21vdmluZyIsIl9sYXN0WCIsIl9sYXN0WSIsIl9zcGVlZCIsIl9uZXh0RGlyZWN0aW9uIiwiX3NhdmVEZWZhdWx0cyIsIl90aGlzMiIsIl9kZWZhdWx0cyIsInJlc2V0IiwidHJhbnNmb3JtIiwic2V0QW5pbWF0aW9uIiwiYW5pbWF0aW9uIiwiTWF0aCIsImFicyIsInNldFhZWiIsInJlc3VtZUFuaW1hdGlvbiIsIl9nZXRQb3NpdGlvbkRhdGEiLCJfc3RlcCIsImdldFN0ZXAiLCJfcHJldHVybiIsIl9pc0NlbnRlcmVkIiwiX2lzViIsImRpZmZYIiwiZ2V0TWluIiwiX2lzSCIsImRpZmZZIiwidGlsZVdpZHRoIiwidGlsZUhlaWdodCIsIl9sYXN0VGlsZSIsInh5IiwibWluIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiR2FtZSIsIlNvdW5kTWFuYWdlciIsIk1hcCIsIkdhbWVNb2RlbCIsIm1ha2VHaG9zdCIsIm1ha2VEb3QiLCJtYWtlUGlsbCIsIlBhY21hbiIsIkxpdmVzIiwiRVZFTlRfS0VZX0RPV04iLCJLRVlfVVAiLCJLRVlfUklHSFQiLCJLRVlfRE9XTiIsIktFWV9MRUZUIiwiRVZFTlRfU1dJUEUiLCJFVkVOVF9TV0lQRV9VUCIsIkVWRU5UX1NXSVBFX1JJR0hUIiwiRVZFTlRfU1dJUEVfRE9XTiIsIkVWRU5UX1NXSVBFX0xFRlQiLCJlbCIsInN0eWxlIiwiZGlzcGxheSIsIm9yaWdpbmFsV2lkdGgiLCJvcmlnaW5hbEhlaWdodCIsImRvdFNjb3JlIiwicGlsbFNjb3JlIiwiZGVmYXVsdExpdmVzIiwic291bmRFbmFibGVkIiwiZXZlbnRzIiwiSnNQYWNtYW4iLCJfR2FtZSIsImxpdmVzIiwiZmV0Y2giLCJlbGVtZW50cyIsInNwbGFzaCIsIiQiLCJzdGFydCIsInN0YXJ0UDEiLCJzdGFydFJlYWR5IiwiaGlnaFNjb3JlIiwiZ2FtZU92ZXIiLCJzb3VuZFN0YXR1cyIsInBhdXNlZCIsImxvYWQiLCJrZXlib2FyZCIsIl9vbktleURvd24iLCJ0b3VjaCIsIl9vblN3aXBlIiwic291bmQiLCJhZGRTb3VuZCIsInNjYWxpbmciLCJnZXRGYWN0b3IiLCJfb25HaG9zdEVhdGVuIiwiX29uR2hvc3RFYXQiLCJfb25DaGFuZ2VTY29yZSIsIl9vbkNoYW5nZUhpZ2hTY29yZSIsIl9vbkNoYW5nZUxpdmVzIiwiX29uQ2hhbmdlRXh0cmFMaXZlcyIsIl9vbkNoYW5nZU1vZGUiLCJtYWtlTGV2ZWwiLCJzdGFydExldmVsIiwiX3dpbiIsIl9nYW1lT3ZlciIsInBsYXkiLCJhZGRDYWxsYmFjayIsIm1haW5Mb29wIiwibW9kZSIsInBpbmt5IiwiZGVzdHJveSIsImJsaW5reSIsImlua3kiLCJzdWUiLCJwYWNtYW4iLCJkZXN0cm95SXRlbXMiLCJvZmYiLCJjbGVhciIsIl9pbnB1dERpcmVjdGlvbiIsIl9sYXN0U3dpcGUiLCJnZXRTZXR0aW5ncyIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsIm1hemUiLCJkb3RBbmltYXRpb25MYWJlbCIsIl9wYXVzZUZyYW1lcyIsIl9kZXN0cm95Qm9udXMiLCJfc2hvd0JvbnVzIiwidGlsZXMiLCJ0b3RhbCIsImNvZGUiLCJkb3QiLCJkZWZhdWx0QW5pbWF0aW9uIiwiaXRlbSIsInBpbGwiLCJ0b3RhbEl0ZW1zIiwiYWRkR2FtZUdob3N0RWF0RXZlbnRMaXN0ZW5lciIsImxpc3RlbmVyIiwiYWRkR2FtZUdob3N0TW9kZUZyaWdodGVuZWRFbnRlciIsImFkZEdhbWVHaG9zdE1vZGVGcmlnaHRlbmVkRXhpdCIsInQiLCJhZGRTY29yZSIsIndpbiIsImdob3N0Iiwic2hvd0dob3N0cyIsIl9wYWNtYW5FYXRlbiIsIl9zdGFydCIsImJvbnVzVGlsZSIsImJvbnVzSW5kZXgiLCJib251c1Njb3JlIiwicGFyc2VJbnQiLCJnaG9zdEF0dHJzIiwiYWRkR2FtZUdsb2JhbE1vZGVFdmVudExpc3RlbmVyIiwiYWRkR2FtZUdob3N0RWF0ZW5FdmVudExpc3RlbmVyIiwiYWRkUGFjbWFuRWF0UGlsbEV2ZW50TGlzdGVuZXIiLCJwaW5reVRpbGUiLCJob3VzZUNlbnRlciIsImdldFIiLCJhZGRFdmVudExpc3RlbmVyc1RvR2hvc3QiLCJibGlua3lUaWxlIiwiaG91c2UiLCJnZXRVIiwiaW5reVRpbGUiLCJnZXRMIiwic3VlVGlsZSIsImhpZGVHaG9zdHMiLCJfdGhpczMiLCJ1cGRhdGVNb2RlIiwiX2dldElucHV0RGlyZWN0aW9uIiwiX3Nob3dQYWNtYW4iLCJfc291bmRCYWNrUGF1c2VGcmFtZXMiLCJfaXNHaG9zdERlYWQiLCJfaXNHaG9zdEZyaWdodGVuZWQiLCJwYXVzZSIsIm11dGVTb3VuZCIsInJlc3VtZSIsIl9tdXRlZCIsIl90aGlzNCIsInRpbWVzIiwidG9nZ2xlIiwicmVmcmVzaFJhdGUiLCJoaWRlSXRlbXMiLCJpc0ZyaWdodGVuZWQiLCJpc0RlYWQiLCJkaXJlY3Rpb24iLCJvbkxvYWRQcm9ncmVzcyIsInBlcmNlbnQiLCJxdWVyeVNlbGVjdG9yIiwidHlwZSIsImV2IiwiZXZlbnQiLCJrZXlDb2RlIiwiX2hpZGVTb3VuZFN0YXR1c1RpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiX3BhdXNlZCIsImlubmVyVGV4dCIsInNhdmUiLCJ0ZW1wbGF0ZSIsIk1vZGVsIiwiVGltZXIiLCJNT0RFX1NDQVRURVIiLCJNT0RFX0NIQVNFIiwibWFwMSIsIm1hcDIiLCJtYXAzIiwibWFwNCIsInRpbWUiLCJfTW9kZWwiLCJhdHRycyIsImV4dHJhTGl2ZXMiLCJleHRyYUxpZmVTY29yZSIsInVybCIsIm9uQ2hhbmdlU2NvcmUiLCJtb2RlVGltZXIiLCJfdGhpcyRnZXRTZXR0aW5ncyIsImlzRWxhcHNlZCIsIm9iaiIsInBhcnRzIiwic3BsaXQiLCJ0b0pTT04iLCJBTklNQVRJT05fSE9SSVpPTlRBTCIsInJuZCIsIk1PREVfRlJJR0hURU5FRCIsIk1PREVfSE9VU0UiLCJNT0RFX0RFQUQiLCJudW1iZXJPZkZyYW1lIiwiZGVsdGEiLCJmcmlnaHRlbmVkVGltZSIsIndhaXRUaW1lIiwic2NhdHRlclRhcmdldCIsInNjb3JlcyIsImdldENoYXNlVGFyZ2V0IiwidHVubmVsU3BlZWQiLCJmcmlnaHRlbmVkU3BlZWQiLCJmcmlnaHRlbmVkRmxhc2hlcyIsIkdob3N0IiwiZGVhZFRhcmdldCIsImRlYWRFbmRYIiwiZGVhZEVuZFkiLCJkZWFkRW5kIiwiaG91c2VUb3AiLCJob3VzZUJvdHRvbSIsImhvdXNlRXhpdFRpbGUiLCJob3VzZUV4aXRUaWxlWCIsInNldE1vZGUiLCJpc1R1bm5lbCIsIl90dXJuQmFjayIsIm9uR2FtZUdsb2JhbE1vZGUiLCJob3VzZVRpbWVyIiwiZnJpZ2h0ZW5lZFRpbWVyIiwiaG91c2VQcmVwYXJlRXhpdCIsImZyaWdodGVuZWQiLCJnbG9iYWxNb2RlIiwib25FbnRlck1vZGUiLCJzaG91bGRFeGl0TW9kZSIsImRlYWRQcmVwYXJlRW50ZXIiLCJvbkV4aXRNb2RlIiwiZ2V0RCIsImVuZFgiLCJlbmRZIiwidHciLCJwdCIsIm9wIiwiaWR4IiwiZGVhZFVwIiwiZGVhZFJpZ2h0IiwiZGVhZERvd24iLCJkZWFkTGVmdCIsImdldEVsYXBzZWQiLCJmcmlnaHRlbmVkQmxpbmsiLCJTcHJpdGUiLCJfU3ByaXRlIiwicmVtb3ZlRWxlbWVudCIsInBhY21hbnMiLCJUaWxlIiwiY2hhckF0IiwiY29sIiwicm93IiwiaW5QaXhlbHMiLCJmcmlnaHRlbmVkRG90U3BlZWQiLCJkb3RTcGVlZCIsIl9naG9zdEZyaWdodGVuZWQiLCJoYXNQaWxsIiwiaGFzRG90IiwiX2VhdGVuVHVybnMiLCJhcHBseSIsIl9sYXN0RWF0ZW5UdXJuc1RpbWUiLCJfZWF0ZW5UdXJuc0ZyYW1lcyIsIlNvdW5kIiwic291bmRzIiwiaW50cm8iLCJiYWNrIiwiZWF0ZW4iLCJlYXQiLCJkZWFkIiwibGlmZSIsImxhYmVsIiwiQU5JTUFUSU9OX1ZFUlRJQ0FMIiwiQU5JTUFUSU9OX09OQ0UiLCJBTklNQVRJT05fQ0FMTEJBQ0siLCJBTklNQVRJT05fUElOR1BPTkciLCJpbWciLCJJbWFnZSIsInNyYyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImlzUmVhZHkiLCJjb21wbGV0ZSIsIlZpZXciLCJLZXlib2FyZCIsIlRvdWNoIiwiU2NhbGluZyIsIlNUQVRFX05FVyIsIlNUQVRFX1JVTk5JTkciLCJTVEFURV9QQVVTRUQiLCJwb3NpdGlvbiIsIl9WaWV3Iiwic3ByaXRlcyIsImNoaWxkcmVuIiwiY2FsbGJhY2tzIiwibG9hZGVkU3ByaXRlc0luZGV4IiwibG9hZGVkU291bmRzSW5kZXgiLCJyZXNpemUiLCJzdGF0ZSIsIm92ZXJmbG93IiwiZm9udFNpemUiLCJzY2VuZWdyYXBoIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwib25EZXN0cm95IiwicHJlbG9hZCIsIndhaXRGb3JSZXNvdXJjZXMiLCJzcHJpdGVDb3VudCIsInNvdW5kQ291bnQiLCJyZXN0Iiwic2V0SW50ZXJ2YWwiLCJyZWZyZXNoIiwiX29uUmVhZHlDYWxsYmFjayIsInZpc2liaWxpdHkiLCJzcHJpdGUiLCJhZGRDaGlsZCIsInRoZW4iLCJjYWxsYmFjayIsImZuIiwiaWRsZUNvdW50ZXIiLCJkZWFkQ2FsbGJhY2tzIiwidmFsdWUiLCJzcGxpY2UiLCJjbGVhckNhbGxiYWNrcyIsImRlc3Ryb3lDaGlsZHJlbiIsImlubmVySFRNTCIsIm11dGVkIiwibXV0ZSIsInJhdGUiLCJyb3VuZCIsIkVWRU5UX0tFWV9VUCIsImRvY3VtZW50IiwiYm9keSIsIm9uS2V5VXAiLCJvbktleURvd24iLCJrZXl1cCIsImtleWRvd24iLCJNb2RlbExvY2FsU3RvcmFnZSIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXQiLCJKU09OIiwicGFyc2UiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwidyIsImgiLCJ3aWR0aFRvSGVpZ2h0IiwibmV3V2lkdGgiLCJuZXdIZWlnaHQiLCJuZXdXaWR0aFRvSGVpZ2h0IiwiYXVkaW9DdHgiLCJnYWluTm9kZSIsImRlY29kZUF1ZGlvRGF0YSIsImFycmF5QnVmZmVyIiwiQXVkaW9Db250ZXh0Iiwid2Via2l0QXVkaW9Db250ZXh0IiwiY3JlYXRlR2FpbiIsImNvbm5lY3QiLCJkZXN0aW5hdGlvbiIsInJlc3BvbnNlIiwiYXVkaW9CdWZmZXIiLCJ0cmFja1NvdXJjZSIsImNyZWF0ZUJ1ZmZlclNvdXJjZSIsImJ1ZmZlciIsImdhaW4iLCJzZXRWYWx1ZUF0VGltZSIsImN1cnJlbnRUaW1lIiwieiIsImN1cnJlbnRGcmFtZSIsImZyYW1lSW5jcmVtZW50IiwiYW5nbGUiLCJwbGF5aW5nIiwiZmFjdG9ySCIsImZhY3RvclYiLCJhbGwiLCJzb21lIiwiekluZGV4IiwiYmFja2dyb3VuZFBvc2l0aW9uIiwiaW5kZXgiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJiYWNrZ3JvdW5kUmVwZWF0IiwiZGlzdGFuY2VYIiwiZGlzdGFuY2VZIiwicm90YXRlIiwicmVsYXRpdmUiLCJwYXJzZUZsb2F0Iiwic2NhbGUiLCJmbGlwSCIsImZsaXAiLCJ1bmRlZmluZWQiLCJmbGlwViIsImNvb3JkaW5hdGUiLCJzZXRXSCIsIl90aGlzNSIsInRzIiwiRGF0ZSIsImdldFRpbWUiLCJwYXVzZVRpbWUiLCJ0aHJlc2hvbGQiLCJyZXN0cmFpbnQiLCJhbGxvd2VkVGltZSIsIm9uVG91Y2hTdGFydCIsIm9uVG91Y2hFbmQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY2hhbmdlZFRvdWNoZXMiLCJzdGFydFgiLCJwYWdlWCIsInN0YXJ0WSIsInBhZ2VZIiwic3RhcnRUaW1lIiwiZGlzdFgiLCJkaXN0WSIsImVsYXBzZWRUaW1lIiwiU1BSSVRFX1BJTktZIiwiU1BSSVRFX0JMSU5LWSIsIlNQUklURV9JTktZIiwiU1BSSVRFX1NVRSIsInJpZ2h0IiwiZG93biIsInVwIiwibGVmdCIsInRpbGVBIiwidGlsZUIiLCJ4MSIsInkxIiwic3FydCIsInBvdyIsImZsb29yIiwicmFuZG9tIiwiY29udGFpbmVyIiwidnciLCJtYXgiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImlubmVyV2lkdGgiLCJ2aCIsImNsaWVudEhlaWdodCIsImlubmVySGVpZ2h0IiwiR2FtZVdpdGhQb3NpdGlvbiIsIm1hcmdpbkxlZnQiLCJvZmZzZXRXaWR0aCIsInRvcCIsIm1hcmdpblRvcCIsIm9mZnNldEhlaWdodCIsImdhbWUiXSwic291cmNlUm9vdCI6IiJ9