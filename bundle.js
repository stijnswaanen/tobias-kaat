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
    return "\n            <div class=\"score\">\n                <div class=\"p1-score\">1UP<br /><span>00</span></div>\n                <div class=\"high-score\">HIGH SCORE<br /><span>" + (model.highScore || '00') + "</span></div>\n                <div class=\"p2-score\">2UP<br /><span>00</span></div>\n            </div>\n            <div class=\"start-p1\" style=\"display: none\">PLAYER ONE</div>\n            <div class=\"start-ready\" style=\"display: none\">READY!</div>\n            <div class=\"game-over\" style=\"display: none\">GAME OVER</div>\n            <div class=\"sound-status on\" style=\"display: none\"><span class=\"wrap\">SOUND: <span class=\"on\">ON</span><span class=\"off\">OFF</span></span></div>\n            <div class=\"paused\" style=\"display: none\"><span class=\"wrap\">PAUSED</span></div>\n            <div class=\"splash\">\n                <p class=\"nerd\">KAAT & TOBIAS<br><br><span>GAAN TROUWEN</span></p>\n                <a class=\"start\" style=\"display: none\">START</a>\n                <div class=\"loadbar\"><div class=\"inner\"></div></div>\n                <p class=\"keys\"><span>&larr;&uarr;&darr;&rarr;</span>:MOVE <span>S</span>:SOUND <span>P</span>:PAUSE</p>\n            </div>\n        ";
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
  imageURL: 'img/pills.png',
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
  imageURL: 'img/pills.png',
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
    top: 33.15%;
    left: 35.26%;
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
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA,mCAAmC;AACnC;EACE,6BAA6B;EAC7B,kBAAkB;EAClB,gBAAgB;EAChB;;6DAEuE,EAAE,gDAAgD;AAC3H;;AAEA;IACI,sBAAsB;IACtB,SAAS;IACT,UAAU;IACV,gBAAgB;AACpB;;AAEA;IACI,kBAAkB;IAClB,cAAc;IACd,sCAAsC;IACtC,cAAc;IACd,sBAAsB;IACtB,yDAAuC;IACvC,0BAA0B;IAC1B,aAAa;IACb,eAAe;IACf,iBAAiB;IACjB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB,sBAAsB;AAC1B;;AAEA;IACI,8BAA8B;AAClC;;AAEA;IACI,wBAAwB;AAC5B;;AAEA;IACI,4BAA4B;AAChC;;AAEA;IACI,4BAA4B;AAChC;;AAEA;IACI,4BAA4B;AAChC;;AAEA;IACI,4BAA4B;AAChC;;AAEA;IACI,gCAAgC;AACpC;;AAEA;IACI,gCAAgC;AACpC;;AAEA;IACI,gCAAgC;AACpC;;AAEA;IACI,yDAAwC;IACxC,0BAA0B;IAC1B,sBAAsB;IACtB,kBAAkB;IAClB,kBAAkB;IAClB,MAAM;IACN,SAAS;IACT,QAAQ;IACR,OAAO;IACP,UAAU;AACd;;AAEA;IACI,cAAc;IACd,eAAe;IACf,iBAAiB;AACrB;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,kBAAkB;IAClB,QAAQ;IACR,yBAAyB;IACzB,gBAAgB;AACpB;;AAEA;IACI,kBAAkB;IAClB,WAAW;IACX,OAAO;IACP,QAAQ;IACR,kBAAkB;IAClB,oBAAoB;IACpB,YAAY;AAChB;;AAEA;IACI,kBAAkB;IAClB,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,WAAW;AACf;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,kBAAkB;IAClB,QAAQ;IACR,OAAO;IACP,QAAQ;IACR,kBAAkB;IAClB,WAAW;AACf;;AAEA;IACI,sCAAsC;IACtC,kBAAkB;IAClB,SAAS;IACT,OAAO;IACP,QAAQ;IACR,WAAW;IACX,cAAc;IACd,gBAAgB;AACpB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,kBAAkB;IAClB,QAAQ;IACR,YAAY;IACZ,aAAa;IACb,gBAAgB;IAChB,cAAc;IACd,iBAAiB;IACjB,sBAAsB;AAC1B;;AAEA;IACI,kBAAkB;IAClB,mBAAmB;IACnB,YAAY;IACZ,QAAQ;AACZ;;AAEA;IACI,kBAAkB;IAClB,MAAM;IACN,cAAc;IACd,aAAa;IACb,kBAAkB;IAClB;AACJ;;AAEA;IACI,kBAAkB;IAClB,UAAU;IACV,MAAM;IACN,OAAO;AACX;;AAEA;IACI,UAAU;IACV,iBAAiB;IACjB,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,UAAU;IACV,MAAM;IACN,QAAQ;AACZ;;AAEA;IACI,iBAAiB;IACjB,cAAc;AAClB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,WAAW;IACX,OAAO;IACP,QAAQ;IACR,kBAAkB;IAClB,WAAW;AACf;;AAEA;;;;IAII,kBAAkB;IAClB,WAAW;IACX,OAAO;IACP,QAAQ;IACR,kBAAkB;IAClB,WAAW;AACf;;AAEA;;IAEI,gBAAgB;AACpB;;AAEA;;IAEI,cAAc;AAClB;;AAEA;;IAEI,gBAAgB;IAChB,cAAc;AAClB;;AAEA;IACI;;;;;;;;OAQG;AACP","sourcesContent":["/* press-start-2p-regular - latin */\n@font-face {\n  font-family: 'Press Start 2P';\n  font-style: normal;\n  font-weight: 400;\n  src: local(''),\n       url('./fonts/press-start-2p-v9-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */\n       url('./fonts/press-start-2p-v9-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */\n}\n\nbody {\n    background-color: #222;\n    margin: 0;\n    padding: 0;\n    overflow: hidden;\n}\n\n.js-pacman-playground {\n    position: absolute;\n    color: #EFEFEF;\n    font-family: 'Press Start 2P', cursive;\n    font-size: 2em;\n    background-color: #000;\n    background-image: url('./img/maze.png');\n    background-size: 400% 200%;\n    display: none;\n    cursor: default;\n    user-select: none;\n    touch-action: none;\n}\n\n.js-pacman-playground.with-border {\n    border-radius: 0.5em;\n    border: 1em solid #000;\n}\n\n.js-pacman-playground.with-border.with-light {\n    box-shadow: 0 0 1em 0.1em #EEE;\n}\n\n.js-pacman-playground.maze-1 {\n    background-position: 0 0;\n}\n\n.js-pacman-playground.maze-2 {\n    background-position: -100% 0;\n}\n\n.js-pacman-playground.maze-3 {\n    background-position: -200% 0;\n}\n\n.js-pacman-playground.maze-4 {\n    background-position: -300% 0;\n}\n\n.js-pacman-playground.maze-1.blink {\n    background-position: 0 -100%;\n}\n\n.js-pacman-playground.maze-2.blink {\n    background-position: -100% -100%;\n}\n\n.js-pacman-playground.maze-3.blink {\n    background-position: -200% -100%;\n}\n\n.js-pacman-playground.maze-4.blink {\n    background-position: -300% -100%;\n}\n\n.js-pacman-playground .splash {\n    background-image: url('./img/start.png');\n    background-size: 100% 100%;\n    background-color: #000;\n    text-align: center;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    left: 0;\n    z-index: 1;\n}\n\n.js-pacman-playground .splash a {\n    color: #DDDDDD;\n    cursor: pointer;\n    font-weight: bold;\n}\n\n.js-pacman-playground .splash a:hover {\n    color: #FFF;\n}\n\n.js-pacman-playground .splash a.start {\n    position: relative;\n    top: 65%;\n    text-transform: uppercase;\n    font-size: 1.6em;\n}\n\n.js-pacman-playground .splash .title {\n    position: absolute;\n    top: 22.04%;\n    left: 0;\n    right: 0;\n    text-align: center;\n    /* color: #FCB644; */\n    color: black;\n}\n\n.js-pacman-playground .splash p.nerd {\n    position: absolute;\n    top: 33.15%;\n    left: 35.26%;\n    text-align: center;\n    color: #FFF;\n}\n\n.js-pacman-playground .splash p span {\n    color : #FFFF00;\n}\n\n.js-pacman-playground .splash .keys {\n    position: absolute;\n    top: 85%;\n    left: 0;\n    right: 0;\n    text-align: center;\n    color: #FFF;\n}\n\n.js-pacman-playground .splash .credits {\n    font-family: 'Press Start 2P', cursive;\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    color: #FFF;\n    padding: 0.1em;\n    font-size: 0.6em;\n}\n\n.js-pacman-playground .splash .credits span {\n    color: #FF3333;\n}\n\n.js-pacman-playground .splash .credits a {\n    color: #FFFF00;\n}\n\n.js-pacman-playground .splash .credits a:hover {\n    color: #FFFF4D;\n}\n\n.js-pacman-playground .loadbar {\n    position: absolute;\n    top: 65%;\n    left: 22.32%;\n    right: 22.32%;\n    background: #FF0;\n    height: 3.472%;\n    overflow: visible;\n    border: 2px solid #FFF;\n}\n\n.js-pacman-playground .loadbar .inner {\n    position: relative;\n    background: #FF0000;\n    height: 100%;\n    width: 0;\n}\n\n.js-pacman-playground .score {\n    position: absolute;\n    top: 0;\n    right: 0.4464%;\n    left: 0.4464%;\n    text-align: center;\n    z-index: 2\n}\n\n.js-pacman-playground .score .p1-score {\n    position: absolute;\n    width: 22%;\n    top: 0;\n    left: 0;\n}\n\n.js-pacman-playground .score .high-score {\n    width: 40%;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.js-pacman-playground .score .p2-score {\n    position: absolute;\n    width: 22%;\n    top: 0;\n    right: 0;\n}\n\n.js-pacman-playground .score span {\n    text-align: right;\n    display: block;\n}\n\n.js-pacman-playground .score .high-score span {\n    text-align: center;\n}\n\n.js-pacman-playground .start-p1 {\n    position: absolute;\n    top: 38.71%;\n    left: 0;\n    right: 0;\n    text-align: center;\n    color: #5EE;\n}\n\n.js-pacman-playground .game-over,\n.js-pacman-playground .start-ready,\n.js-pacman-playground .sound-status,\n.js-pacman-playground .paused {\n    position: absolute;\n    top: 55.55%;\n    left: 0;\n    right: 0;\n    text-align: center;\n    color: #F00;\n}\n\n.js-pacman-playground .sound-status.on span.on,\n.js-pacman-playground .sound-status span.off {\n    display : inline;\n}\n\n.js-pacman-playground .sound-status.on span.off,\n.js-pacman-playground .sound-status span.on {\n    display : none;\n}\n\n.js-pacman-playground .sound-status .wrap,\n.js-pacman-playground .paused .wrap {\n    background: #000;\n    padding: 0.1em;\n}\n\n@media screen and (orientation: portrait) {\n    /* body {\n        background-color: #000;\n    }\n\n    .js-pacman-playground.with-border {\n        border-radius: 0;\n        box-shadow: none;\n        border: none;\n    } */\n}\n"],"sourceRoot":""}]);
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

/***/ "./src/img/pills.png":
/*!***************************!*\
  !*** ./src/img/pills.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "./img/pills.png";

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
/* harmony import */ var _img_pills_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/pills.png */ "./src/img/pills.png");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHLEVBQUUwQixtREFBSSxFQUFFLFFBQVEsQ0FBQyxFQUM3RyxDQUFDMUIsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFMEIsbURBQUksRUFBRSxRQUFRLENBQUMsRUFDN0csQ0FBQzFCLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTBCLG1EQUFJLEVBQUUsUUFBUSxDQUFDLEVBQ2pILENBQUMxQixLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUyQixtREFBSSxFQUFFLFFBQVEsQ0FBQyxFQUNqSCxDQUFDM0IsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFMkIsbURBQUksRUFBRSxRQUFRLENBQUMsRUFDbEgsQ0FBQzNCLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTJCLG1EQUFJLEVBQUUsUUFBUSxDQUFDLEVBQ2xILENBQUMzQixLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUyQixtREFBSSxFQUFFLFFBQVEsQ0FBQyxFQUNsSCxDQUFDM0IsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFNEIsbURBQUksRUFBRSxRQUFRLENBQUMsRUFDbEgsQ0FBQzVCLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTRCLG1EQUFJLEVBQUUsUUFBUSxDQUFDLEVBQ2xILENBQUM1QixLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU0QixtREFBSSxFQUFFLFFBQVEsQ0FBQyxFQUNsSCxDQUFDNUIsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFNEIsbURBQUksRUFBRSxRQUFRLENBQUMsRUFDbEgsQ0FBQzVCLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTJCLG1EQUFJLEVBQUUsUUFBUSxDQUFDLEVBQ2xILENBQUMzQixLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUyQixtREFBSSxFQUFFLFFBQVEsQ0FBQyxFQUNuSCxDQUFDM0IsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFMkIsbURBQUksRUFBRSxRQUFRLENBQUMsRUFDbkgsQ0FBQzNCLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTJCLG1EQUFJLEVBQUUsUUFBUSxDQUFDLEVBQy9HLENBQUMzQixLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU0QixtREFBSSxFQUFFLFFBQVEsQ0FBQyxFQUNuSCxDQUFDNUIsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFNEIsbURBQUksRUFBRSxRQUFRLENBQUMsRUFDL0csQ0FBQzVCLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTRCLG1EQUFJLEVBQUUsUUFBUSxDQUFDLEVBQy9HLENBQUM1QixLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU0QixtREFBSSxFQUFFLFFBQVEsQ0FBQyxDQUNqSDtBQUVELElBQUk3USxJQUFJLEdBQUcsQ0FDUCxZQUFZLEVB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RUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixDQUM3Qjs7Ozs7Ozs7Ozs7Ozs7QUNyQ0QsaUVBQWUsQ0FDZiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixDQUM3Qjs7Ozs7Ozs7Ozs7Ozs7QUNyQ0QsaUVBQWdCLENBQ2hCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLENBQzdCOzs7Ozs7Ozs7Ozs7OztBQ3JDRCxpRUFBZSxDQUNmLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsOEJBQThCLENBQzdC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QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsTUFBTTtBQUNuQixhQUFhLFNBQVM7QUFDdEIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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QTdZLEtBQUE7SUFBQSxPQUFBNlksZ0JBQUE7RUFBQSxFQVAwQjNhLGlEQUFJO0VBVW5DLElBQU1pYixJQUFJLEdBQUcsSUFBSU4sZ0JBQWdCLENBQUM7SUFDOUJ4WixFQUFFLEVBQUcyUyxRQUFRLENBQUM1SyxhQUFhLENBQUMsdUJBQXVCLENBQUM7SUFDcEQvTCxLQUFLLEVBQUdnZCxFQUFFLEdBQUcsR0FBRztJQUNoQi9jLE1BQU0sRUFBR29kLEVBQUUsR0FBRztFQUNsQixDQUFDLENBQUM7QUFFTixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL0JvbnVzLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL0JvbnVzZXMuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvQ2hhcmFjdGVyLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL0dhbWUuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvR2FtZU1vZGVsLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL0dob3N0LmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL0l0ZW0uanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvTGl2ZXMuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvTWFwLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL1BhY21hbi5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9Tb3VuZE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvVGlsZS5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9lbmdpbmUvQW5pbWF0aW9uLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL2VuZ2luZS9HYW1lLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL2VuZ2luZS9LZXlib2FyZC5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9lbmdpbmUvTW9kZWwuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvZW5naW5lL1NjYWxpbmcuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvZW5naW5lL1NvdW5kLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL2VuZ2luZS9TcHJpdGUuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvZW5naW5lL1RpbWVyLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL2VuZ2luZS9Ub3VjaC5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9mYWN0b3J5L21ha2VCb251cy5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9mYWN0b3J5L21ha2VEb3QuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvZmFjdG9yeS9tYWtlR2hvc3QuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvZmFjdG9yeS9tYWtlUGlsbC5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9oZWxwZXIvZ2V0RGlzdGFuY2UuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvaGVscGVyL3JuZC5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9tYXBzL21hcC0xLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2pzL21hcHMvbWFwLTIuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9zcmMvanMvbWFwcy9tYXAtMy5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9qcy9tYXBzL21hcC00LmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vbm9kZV9tb2R1bGVzL3Jhc3RpL2xpYi9Db21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9ub2RlX21vZHVsZXMvcmFzdGkvbGliL0VtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9ub2RlX21vZHVsZXMvcmFzdGkvbGliL01vZGVsLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vbm9kZV9tb2R1bGVzL3Jhc3RpL2xpYi9WaWV3LmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vbm9kZV9tb2R1bGVzL3Jhc3RpL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi8uL3NyYy9zdHlsZXMuY3NzPzQ0YjIiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2pzUGFjbWFuLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9qc1BhY21hbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qc1BhY21hbi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9qc1BhY21hbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9qc1BhY21hbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzUGFjbWFuL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vanNQYWNtYW4vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vanNQYWNtYW4vd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2pzUGFjbWFuLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBbmltYXRpb24gZnJvbSAnLi9lbmdpbmUvQW5pbWF0aW9uJztcbmltcG9ydCBDaGFyYWN0ZXIgZnJvbSAnLi9DaGFyYWN0ZXInO1xuaW1wb3J0IGdldERpc3RhbmNlIGZyb20gJy4vaGVscGVyL2dldERpc3RhbmNlJztcblxuZXhwb3J0IGNvbnN0IGFuaW1hdGlvbkJhc2UgPSB7XG4gICAgaW1hZ2VVUkwgOiAnaW1nL21pc2MucG5nJyxcbiAgICBvZmZzZXRZIDogMCxcbiAgICBvZmZzZXRYIDogMFxufVxuXG5leHBvcnQgY29uc3QgYW5pbWF0aW9ucyA9IHtcbiAgICAnZGVmYXVsdCcgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgLi4uYW5pbWF0aW9uQmFzZVxuICAgIH0pLFxuICAgICdzY29yZTEwMCcgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgb2Zmc2V0WSA6IDYwXG4gICAgfSksXG4gICAgJ3Njb3JlMjAwJyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICBvZmZzZXRYIDogNjAsXG4gICAgICAgIG9mZnNldFkgOiA2MFxuICAgIH0pLFxuICAgICdzY29yZTUwMCcgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgb2Zmc2V0WCA6IDYwICogMixcbiAgICAgICAgb2Zmc2V0WSA6IDYwXG4gICAgfSksXG4gICAgJ3Njb3JlNzAwJyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICBvZmZzZXRYIDogNjAgKiAzLFxuICAgICAgICBvZmZzZXRZIDogNjBcbiAgICB9KSxcbiAgICAnc2NvcmUxMDAwJyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICBvZmZzZXRYIDogNjAgKiA0LFxuICAgICAgICBvZmZzZXRZIDogNjBcbiAgICB9KSxcbiAgICAnc2NvcmUyMDAwJyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICBvZmZzZXRYIDogNjAgKiA1LFxuICAgICAgICBvZmZzZXRZIDogNjBcbiAgICB9KSxcbiAgICAnc2NvcmU1MDAwJyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICBvZmZzZXRYIDogNjAgKiA2LFxuICAgICAgICBvZmZzZXRZIDogNjBcbiAgICB9KVxufTtcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgYW5pbWF0aW9ucyxcbiAgICBzcGVlZCA6IDQwLFxuICAgIHNjb3JlIDogJzEwMCdcbn07XG5cbmNsYXNzIEJvbnVzIGV4dGVuZHMgQ2hhcmFjdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGRlZmF1bHRzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5IGluIG9wdGlvbnMpIHRoaXNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCB7IGFkZFBhY21hblBvc2l0aW9uRXZlbnRMaXN0ZW5lciB9ID0gb3B0aW9ucztcblxuICAgICAgICAvLyBDaGFuZ2UgdGlsZS5cbiAgICAgICAgdGhpcy5vbignaXRlbTp0aWxlJywgKHRpbGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2RpciA9IHRoaXMuX25leHREaXI7XG4gICAgICAgICAgICB0aGlzLl9uZXh0RGlyID0gdGhpcy5nZXROZXh0RGlyZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLl9lYXRFdmVudCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRUaWxlKCkgPT09IHRoaXMuX2dldFRhcmdldCgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RhcmdldEZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldEZvdW5kLS07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdpdGVtOmRlc3Ryb3knKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgYWRkUGFjbWFuUG9zaXRpb25FdmVudExpc3RlbmVyKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYWNtYW5EYXRhID0gZGF0YTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fdGFyZ2V0Rm91bmQgPSAyO1xuICAgIH1cblxuICAgIG1vdmUoKSB7XG4gICAgICAgIENoYXJhY3Rlci5wcm90b3R5cGUubW92ZS5jYWxsKHRoaXMsIHRoaXMuX2Rpcik7XG4gICAgICAgIC8vIEVhdCBvciBlYXRlbiFcbiAgICAgICAgaWYgKCF0aGlzLl9lYXRFdmVudCkge1xuICAgICAgICAgICAgdmFyIHBhY21hblRpbGUgPSB0aGlzLnBhY21hbkRhdGEudGlsZSwgdGlsZSA9IHRoaXMuZ2V0VGlsZSgpLCBvcHBvc2l0ZSA9IHRoaXMuX2dldE9wRGlyZWN0aW9uKHRoaXMuX2Rpcik7XG4gICAgICAgICAgICBpZiAocGFjbWFuVGlsZSA9PT0gdGlsZSB8fCAodGhpcy5wYWNtYW5EYXRhLmRpciA9PT0gb3Bwb3NpdGUgJiYgcGFjbWFuVGlsZSA9PT0gdGlsZS5nZXQob3Bwb3NpdGUpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VhdEV2ZW50ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX25leHRBbmltYXRpb24gPSAgdGhpcy5hbmltYXRpb25zW2BzY29yZSR7dGhpcy5zY29yZX1gXTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdpdGVtOmVhdGVuJywgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXROZXh0RGlyZWN0aW9uKCkge1xuICAgICAgICB2YXIgdGFyZ2V0VGlsZSA9IHRoaXMuX2dldFRhcmdldCgpOyAvLyBUYXJnZXQgVGlsZVxuXG4gICAgICAgIHZhciBfZGlyID0gdGhpcy5fZGlyIHx8IHRoaXMuZGlyO1xuXG4gICAgICAgIHZhciBuZXh0VGlsZSA9IHRoaXMuZ2V0VGlsZSgpLmdldChfZGlyKTsgLy8gTmV4dCB0aWxlLlxuXG4gICAgICAgIHZhciBkaXJlY3Rpb25zID0gWyd1JywgJ2wnLCAnZCcsICdyJ107IC8vIFByZWZlcnJlZCBkaXJlY3Rpb24gb3JkZXIuXG5cbiAgICAgICAgdmFyIG5leHREaXJlY3Rpb24sIGxhc3REaXN0YW5jZTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgdmFyIGRpciA9IGRpcmVjdGlvbnNbaV07XG5cbiAgICAgICAgICAgIGlmIChkaXIgPT09IHRoaXMuX2dldE9wRGlyZWN0aW9uKF9kaXIpKSBjb250aW51ZTsgLy8gQ2FudCd0IGdvIGJhY2suXG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNhbkdvKGRpciwgbmV4dFRpbGUpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlc3RUaWxlID0gbmV4dFRpbGUuZ2V0KGRpcik7XG4gICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gZ2V0RGlzdGFuY2UodGVzdFRpbGUsIHRhcmdldFRpbGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBsYXN0RGlzdGFuY2UgPT09ICd1bmRlZmluZWQnIHx8IGxhc3REaXN0YW5jZSA+IGRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHREaXJlY3Rpb24gPSBkaXI7XG4gICAgICAgICAgICAgICAgICAgIGxhc3REaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0RGlyZWN0aW9uO1xuICAgIH1cblxuICAgIGNhbkdvKGRpciwgdGlsZSkge1xuICAgICAgICBpZiAoIXRpbGUpIHRpbGUgPSB0aGlzLmdldFRpbGUoKTtcblxuICAgICAgICB2YXIgbmV4dFRpbGUgPSB0aWxlLmdldChkaXIpO1xuXG4gICAgICAgIGlmICghbmV4dFRpbGUpIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gIW5leHRUaWxlLmlzV2FsbCgpICYmICFuZXh0VGlsZS5pc0hvdXNlKCk7XG4gICAgfVxuXG4gICAgX2dldFRhcmdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLnR1bm5lbHNbMF07XG4gICAgfVxuXG4gICAgc2V0TmV4dEFuaW1hdGlvbigpIHt9XG59XG5cbk9iamVjdC5hc3NpZ24oQm9udXMucHJvdG90eXBlLCBkZWZhdWx0cyk7XG5cbmV4cG9ydCBkZWZhdWx0IEJvbnVzO1xuIiwiaW1wb3J0IG1ha2VCb251cyBmcm9tICcuL2ZhY3RvcnkvbWFrZUJvbnVzJztcblxuY2xhc3MgQm9udXNlcyB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLmJvbnVzZXMgPSBbXTtcblxuICAgICAgICB0aGlzLnggPSBvcHRpb25zLng7XG4gICAgICAgIHRoaXMueSA9IG9wdGlvbnMueTtcblxuICAgICAgICB0aGlzLm1vZGVsID0gb3B0aW9ucy5tb2RlbDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGJvbnVzID0gbWFrZUJvbnVzKGksIHtcbiAgICAgICAgICAgICAgICB4IDogb3B0aW9ucy54IC0gaSAqIDY0LFxuICAgICAgICAgICAgICAgIHkgOiBvcHRpb25zLnksXG4gICAgICAgICAgICAgICAgZmFjdG9yIDogb3B0aW9ucy5mYWN0b3IsXG4gICAgICAgICAgICAgICAgYWRkUGFjbWFuUG9zaXRpb25FdmVudExpc3RlbmVyIDogKCkgPT4ge30sXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplUmVmcmFzaFJhdGUgOiAoKSA9PiAxXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgb3B0aW9ucy5hZGRTcHJpdGUoYm9udXMpO1xuICAgICAgICAgICAgdGhpcy5ib251c2VzLnB1c2goYm9udXMpO1xuXG4gICAgICAgICAgICBpZiAoaSA+PSB0aGlzLm1vZGVsLmxldmVsKSB0aGlzLmJvbnVzZXNbaV0uaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb2RlbC5vbignY2hhbmdlOmxldmVsJywgdGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPj0gdGhpcy5tb2RlbC5sZXZlbCkgdGhpcy5ib251c2VzW2ldLmhpZGUoKTtcbiAgICAgICAgICAgIGVsc2UgdGhpcy5ib251c2VzW2ldLnNob3coKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQm9udXNlcztcbiIsImltcG9ydCBJdGVtIGZyb20gJy4vSXRlbSc7XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICAgIHdpZHRoIDogNjAsXG4gICAgaGVpZ2h0IDogNjAsXG4gICAgc3RlcCA6IDEwLFxuICAgIHNwZWVkIDogODAsXG4gICAgZGlyIDogbnVsbCxcbiAgICBwcmV0dXJuIDogZmFsc2Vcbn07XG5cbmNvbnN0IGFuaW1hdGlvbkxhYmVsc0J5RGlyZWN0aW9ucyA9IHtcbiAgICBsIDogJ2xlZnQnLFxuICAgIHIgOiAncmlnaHQnLFxuICAgIHUgOiAndXAnLFxuICAgIGQgOiAnZG93bidcbn07XG5cbmNvbnN0IG9wcG9zaXRlRGlyZWN0aW9ucyA9IHtcbiAgICBsIDogJ3InLFxuICAgIHIgOiAnbCcsXG4gICAgdSA6ICdkJyxcbiAgICBkIDogJ3UnXG59O1xuXG5jbGFzcyBDaGFyYWN0ZXIgZXh0ZW5kcyBJdGVtIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGRlZmF1bHRzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5IGluIG9wdGlvbnMpIHRoaXNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wYXVzZUFuaW1hdGlvbigpO1xuXG4gICAgICAgIHRoaXMub24oJ2l0ZW06dGlsZScsICh0aWxlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldE5leHRBbmltYXRpb24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fbW92aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2xhc3RYID0gdGhpcy54O1xuICAgICAgICB0aGlzLl9sYXN0WSA9IHRoaXMueTtcbiAgICAgICAgdGhpcy5fc3BlZWQgPSB0aGlzLnNwZWVkO1xuICAgICAgICB0aGlzLl9kaXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9uZXh0QW5pbWF0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbmV4dERpcmVjdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuX21vdmluZyA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX3NhdmVEZWZhdWx0cygpXG4gICAgfVxuXG4gICAgX3NhdmVEZWZhdWx0cygpIHtcbiAgICAgICAgdGhpcy5fZGVmYXVsdHMgPSB7fTtcblxuICAgICAgICBbXG4gICAgICAgICAgICAneCcsXG4gICAgICAgICAgICAneScsXG4gICAgICAgICAgICAnX2xhc3RYJyxcbiAgICAgICAgICAgICdfbGFzdFknLFxuICAgICAgICAgICAgJ2RpcicsXG4gICAgICAgICAgICAnX2RpcicsXG4gICAgICAgICAgICAnX25leHRBbmltYXRpb24nLFxuICAgICAgICAgICAgJ19uZXh0RGlyZWN0aW9uJyxcbiAgICAgICAgICAgICdfbW92aW5nJyxcbiAgICAgICAgICAgICdtb2RlJyxcbiAgICAgICAgICAgICdhbmltYXRpb24nXG4gICAgICAgIF0uZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZGVmYXVsdHNba2V5XSA9IHRoaXNba2V5XTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5fZGVmYXVsdHMpO1xuICAgICAgICB0aGlzLnRyYW5zZm9ybSgpO1xuICAgICAgICB0aGlzLnNldEFuaW1hdGlvbih0aGlzLmFuaW1hdGlvbik7XG4gICAgICAgIHRoaXMucGF1c2VBbmltYXRpb24oKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHZhciB0aWxlID0gdGhpcy5nZXRUaWxlKCk7XG5cbiAgICAgICAgLy8gRml4IGZsb2F0IHBvaW50IG9mZnNldC5cbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMueSAtIHRpbGUueSkgPCAxKSB0aGlzLnkgPSB0aWxlLnk7XG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnggLSB0aWxlLngpIDwgMSkgdGhpcy54ID0gdGlsZS54O1xuXG4gICAgICAgIC8vIFBvc2l0aW9uIGNoYW5nZSwgbW92ZS5cbiAgICAgICAgaWYgKHRoaXMuX2xhc3RYICE9PSB0aGlzLnggfHwgdGhpcy5fbGFzdFkgIT0gdGhpcy55KSB7XG4gICAgICAgICAgICB0aGlzLnNldFhZWih7XG4gICAgICAgICAgICAgICAgeCA6IHRoaXMueCxcbiAgICAgICAgICAgICAgICB5IDogdGhpcy55XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5fbGFzdFggPSB0aGlzLng7XG4gICAgICAgICAgICB0aGlzLl9sYXN0WSA9IHRoaXMueTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLl9tb3ZpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2l0ZW06bW92ZScpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdW1lQW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW92aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbWl0KCdpdGVtOnBvc2l0aW9uJywgdGhpcy5fZ2V0UG9zaXRpb25EYXRhKCkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBOb3QgbW92aW5nLlxuICAgICAgICAgICAgaWYgKHRoaXMuX21vdmluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnaXRlbTpzdG9wJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZUFuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIENoYW5nZWQgYW5pbWF0aW9uLlxuICAgICAgICBpZiAodGhpcy5fbmV4dEFuaW1hdGlvbiAmJiB0aGlzLmFuaW1hdGlvbiAhPT0gdGhpcy5fbmV4dEFuaW1hdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZXRBbmltYXRpb24odGhpcy5fbmV4dEFuaW1hdGlvbik7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIF9nZXRQb3NpdGlvbkRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4IDogdGhpcy54LFxuICAgICAgICAgICAgeSA6IHRoaXMueSxcbiAgICAgICAgICAgIHRpbGUgOiB0aGlzLmdldFRpbGUoKSxcbiAgICAgICAgICAgIGRpciA6IHRoaXMuZGlyXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8vIENhbGxlZCBmcm9tIEdhbWUgbWFpbiBsb29wIGF0IGV2ZXJ5IHJldm9sdXRpb24uXG4gICAgbW92ZShkaXIpIHtcbiAgICAgICAgaWYgKCFkaXIpIGRpciA9IHRoaXMuZGlyO1xuICAgICAgICBpZiAoIWRpcikgcmV0dXJuO1xuXG4gICAgICAgIHZhciB0aWxlID0gdGhpcy5nZXRUaWxlKCksIHN0ZXAsIF9zdGVwID0gdGhpcy5nZXRTdGVwKCk7XG4gICAgICAgIC8vIENvdWxkIGdvIHRoYXQgZGlyZWN0aW9uLlxuICAgICAgICBpZiAoKGRpciAhPSB0aGlzLmRpciB8fCB0aGlzLl9wcmV0dXJuKSAmJiB0aGlzLmNhbkdvKGRpcikpIHtcblxuICAgICAgICAgICAgaWYgKCgoZGlyICE9PSB0aGlzLmRpciAmJiBkaXIgIT09IHRoaXMuX2dldE9wRGlyZWN0aW9uKCkpIHx8IHRoaXMuX3ByZXR1cm4pICYmICF0aGlzLl9pc0NlbnRlcmVkKCkpIHtcbiAgICAgICAgICAgICAgICAvLyBOb3QgaW4gdGhlIGNlbnRlciBvZiB0aGUgdGlsZS4gQmVmb3IgdHVybiwgc2V0IHN0ZXAgc28gb24gbmV4dCBmcmFtZSB3ZSBnZXQgaW50byB0aGUgY2VudGVyLlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc1YoZGlyKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGlmZlggPSBNYXRoLmFicyh0aGlzLnggLSB0aWxlLngpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcmV0dXJuKSB7IC8vIFNldCBwcmV0dXJuIHRvIHRydWUgdG8gdHVybiBmYXN0ZXIgb24gY29ybmVycy5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNDZW50ZXJlZCgneCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueCA+IHRpbGUueCkgdGhpcy54IC09IHRoaXMuZ2V0TWluKGRpZmZYLCBfc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB0aGlzLnggKz0gdGhpcy5nZXRNaW4oZGlmZlgsIF9zdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcmV0dXJuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB0aGlzLl9wcmV0dXJuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwID0gdGhpcy5nZXRNaW4oZGlmZlgsIF9zdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNIKGRpcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZmZZID0gTWF0aC5hYnModGhpcy55IC0gdGlsZS55KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJldHVybikgeyAvLyBTZXQgcHJldHVybiB0byB0cnVlIHRvIHR1cm4gZmFzdGVyIG9uIGNvcm5lcnMuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2lzQ2VudGVyZWQoJ3knKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnkgPiB0aWxlLnkpIHRoaXMueSAtPSB0aGlzLmdldE1pbihkaWZmWSwgX3N0ZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgdGhpcy55ICs9IHRoaXMuZ2V0TWluKGRpZmZZLCBfc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJldHVybiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgdGhpcy5fcHJldHVybiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcCA9IHRoaXMuZ2V0TWluKGRpZmZZLCBfc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE5vIHN0ZXAuIE1lYW5zIGNoYW5nZSBkaXJlY3Rpb24uXG4gICAgICAgICAgICBpZiAoIXN0ZXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpciA9IGRpcjtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE5leHRBbmltYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3RlcCkge1xuICAgICAgICAgICAgLy8gS2VlcCBzdHJhaWdodC5cbiAgICAgICAgICAgIGlmICh0aGlzLmNhbkdvKHRoaXMuZGlyKSkge1xuICAgICAgICAgICAgICAgIHN0ZXAgPSBfc3RlcDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gV2FsbC5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNWKHRoaXMuZGlyKSkgeyBzdGVwID0gdGhpcy5nZXRNaW4oTWF0aC5hYnModGhpcy55IC0gdGlsZS55KSwgX3N0ZXApOyB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzSCh0aGlzLmRpcikpIHsgc3RlcCA9IHRoaXMuZ2V0TWluKE1hdGguYWJzKHRoaXMueCAtIHRpbGUueCksIF9zdGVwKTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIE1vdmUuXG4gICAgICAgIGlmIChzdGVwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kaXIgPT09ICd1Jykge1xuICAgICAgICAgICAgICAgIHRoaXMueSAtPSBzdGVwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZGlyID09PSAncicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gc3RlcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRpciA9PT0gJ2QnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IHN0ZXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5kaXIgPT09ICdsJykge1xuICAgICAgICAgICAgICAgIHRoaXMueCAtPSBzdGVwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFBhc3MgYXdheSBsaW1pdHMuXG4gICAgICAgIGlmICh0aGlzLnggPCAwKSB0aGlzLnggPSB0aGlzLm1hcC53aWR0aCAqIHRoaXMubWFwLnRpbGVXaWR0aDtcbiAgICAgICAgaWYgKHRoaXMueCA+IHRoaXMubWFwLndpZHRoICogdGhpcy5tYXAudGlsZVdpZHRoKSB0aGlzLnggPSAwO1xuICAgICAgICBpZiAodGhpcy55IDwgMCkgdGhpcy55ID0gdGhpcy5tYXAuaGVpZ2h0ICogdGhpcy5tYXAudGlsZUhlaWdodDtcbiAgICAgICAgaWYgKHRoaXMueSA+IHRoaXMubWFwLmhlaWdodCAqIHRoaXMubWFwLnRpbGVIZWlnaHQpIHRoaXMueSA9IDA7XG5cbiAgICAgICAgdGlsZSA9IHRoaXMuZ2V0VGlsZSgpO1xuXG4gICAgICAgIGlmICh0aWxlICE9PSB0aGlzLl9sYXN0VGlsZSkge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFRpbGUgPSB0aWxlO1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdpdGVtOnRpbGUnLCB0aWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgZ2V0U3RlcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RlcCAqICh0aGlzLl9zcGVlZCAvIDEwMCk7XG4gICAgfVxuICAgIC8vIFNldCBhbmltYXRpb24gYWNjb3JkaW5nIG1vZGVsIGNvbmRpdGlvbnMuIE92ZXJyaWRlIG9uIHN1YmNsYXNzZXMuXG4gICAgc2V0TmV4dEFuaW1hdGlvbigpIHtcbiAgICAgICAgdGhpcy5fbmV4dEFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9uc1thbmltYXRpb25MYWJlbHNCeURpcmVjdGlvbnNbdGhpcy5kaXJdXTtcbiAgICB9XG4gICAgLy8gSGVscGVyIG1ldGhvZHM6XG4gICAgX2dldE9wRGlyZWN0aW9uKGRpcikge1xuICAgICAgICByZXR1cm4gb3Bwb3NpdGVEaXJlY3Rpb25zW2RpciB8fCB0aGlzLmRpcl07XG4gICAgfVxuICAgIC8vIFRpbGUgb24gcGFzc2VkIGRpcmVjdGlvbiBpcyBhdmFpbGFibGUgZm9yIHdhbGtpbmcuXG4gICAgY2FuR28oZGlyKSB7XG4gICAgICAgIGNvbnN0IHRpbGUgPSB0aGlzLmdldFRpbGUoKTtcblxuICAgICAgICBjb25zdCBuZXh0VGlsZSA9IHRpbGUuZ2V0KGRpcik7XG5cbiAgICAgICAgcmV0dXJuIG5leHRUaWxlICYmICFuZXh0VGlsZS5pc0hvdXNlKCkgJiYgIW5leHRUaWxlLmlzV2FsbCgpO1xuICAgIH1cblxuICAgIF9pc1YoZGlyKSB7XG4gICAgICAgIHJldHVybiBkaXIgPT09ICd1JyB8fCBkaXIgPT09ICdkJztcbiAgICB9XG5cbiAgICBfaXNIKGRpcikge1xuICAgICAgICByZXR1cm4gZGlyID09PSAnbCcgfHwgZGlyID09PSAncic7XG4gICAgfVxuXG4gICAgX2lzQ2VudGVyZWQoeHkpIHtcbiAgICAgICAgdmFyIHRpbGUgPSB0aGlzLmdldFRpbGUoKTtcbiAgICAgICAgdmFyIHggPSB0aWxlLnggPT09IHRoaXMueCwgeSA9IHRpbGUueSA9PT0gdGhpcy55O1xuXG4gICAgICAgIGlmICh4eSA9PT0gJ3gnKSByZXR1cm4geDtcbiAgICAgICAgaWYgKHh5ID09PSAneScpIHJldHVybiB5O1xuICAgICAgICBlbHNlIHJldHVybiAgeCAmJiB5O1xuICAgIH1cblxuICAgIGdldE1pbigpIHtcbiAgICAgICAgdmFyIG1pbiA9IG51bGw7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKylcbiAgICAgICAgICAgIGlmIChtaW4gPT09IG51bGwgfHwgYXJndW1lbnRzW2ldIDwgbWluKSBtaW4gPSBhcmd1bWVudHNbaV07XG5cbiAgICAgICAgcmV0dXJuIG1pbjtcbiAgICB9XG5cbn1cblxuT2JqZWN0LmFzc2lnbihDaGFyYWN0ZXIucHJvdG90eXBlLCBkZWZhdWx0cyk7XG5cbmV4cG9ydCBkZWZhdWx0IENoYXJhY3RlcjtcbiIsImltcG9ydCBHYW1lIGZyb20gJy4vZW5naW5lL0dhbWUnO1xuaW1wb3J0IFNvdW5kTWFuYWdlciBmcm9tICcuL1NvdW5kTWFuYWdlcic7XG5pbXBvcnQgTWFwIGZyb20gJy4vTWFwJztcbmltcG9ydCBHYW1lTW9kZWwgZnJvbSAnLi9HYW1lTW9kZWwnO1xuaW1wb3J0IG1ha2VHaG9zdCBmcm9tICcuL2ZhY3RvcnkvbWFrZUdob3N0JztcbmltcG9ydCBtYWtlRG90IGZyb20gJy4vZmFjdG9yeS9tYWtlRG90JztcbmltcG9ydCBtYWtlUGlsbCBmcm9tICcuL2ZhY3RvcnkvbWFrZVBpbGwnO1xuaW1wb3J0IG1ha2VCb251cyBmcm9tICcuL2ZhY3RvcnkvbWFrZUJvbnVzJztcbmltcG9ydCBQYWNtYW4gZnJvbSAnLi9QYWNtYW4nO1xuaW1wb3J0IExpdmVzIGZyb20gJy4vTGl2ZXMnO1xuaW1wb3J0IEJvbnVzZXMgZnJvbSAnLi9Cb251c2VzJztcblxuaW1wb3J0IHsgRVZFTlRfS0VZX0RPV04sIEtFWV9VUCwgS0VZX1JJR0hULCBLRVlfRE9XTiwgS0VZX0xFRlQgfSBmcm9tICcuL2VuZ2luZS9LZXlib2FyZCc7XG5pbXBvcnQgeyBFVkVOVF9TV0lQRSwgRVZFTlRfU1dJUEVfVVAsIEVWRU5UX1NXSVBFX1JJR0hULCBFVkVOVF9TV0lQRV9ET1dOLCBFVkVOVF9TV0lQRV9MRUZUIH0gZnJvbSAnLi9lbmdpbmUvVG91Y2gnO1xuXG5jb25zdCBzaG93ID0gZWwgPT4geyBlbC5zdHlsZS5kaXNwbGF5ID0gJyc7IH1cbmNvbnN0IGhpZGUgPSBlbCA9PiB7IGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IH1cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgLy8gT3B0aW9ucy5cbiAgICB3aWR0aCA6IDg5NiAvIDIsXG4gICAgaGVpZ2h0IDogMTE1MiAvIDIsXG4gICAgb3JpZ2luYWxXaWR0aCA6IDg5NixcbiAgICBvcmlnaW5hbEhlaWdodCA6IDExNTIsXG5cbiAgICBkb3RTY29yZSA6IDEwLFxuICAgIHBpbGxTY29yZSA6IDUwLFxuICAgIGRlZmF1bHRMaXZlcyA6IDMsXG4gICAgc291bmRFbmFibGVkIDogdHJ1ZSxcblxuICAgIGV2ZW50cyA6IHtcbiAgICAgICAgJ2NsaWNrIC5zdGFydCcgOiAnc3RhcnRMZXZlbCdcbiAgICB9XG59O1xuXG5jbGFzcyBKc1BhY21hbiBleHRlbmRzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhkZWZhdWx0cykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSBpbiBvcHRpb25zKSB0aGlzW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubW9kZWwgPSBuZXcgR2FtZU1vZGVsKHtcbiAgICAgICAgICAgIGxpdmVzIDogdGhpcy5kZWZhdWx0TGl2ZXNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tb2RlbC5mZXRjaCgpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IHtcbiAgICAgICAgICAgIHNwbGFzaCA6IHRoaXMuJCgnLnNwbGFzaCcpLFxuICAgICAgICAgICAgc3RhcnQgOiB0aGlzLiQoJy5zdGFydCcpLFxuICAgICAgICAgICAgc3RhcnRQMSA6IHRoaXMuJCgnLnN0YXJ0LXAxJyksXG4gICAgICAgICAgICBzdGFydFJlYWR5IDogdGhpcy4kKCcuc3RhcnQtcmVhZHknKSxcbiAgICAgICAgICAgIGhpZ2hTY29yZSA6IHRoaXMuJCgnLmhpZ2gtc2NvcmUgc3BhbicpLFxuICAgICAgICAgICAgc2NvcmUgOiB0aGlzLiQoJy5wMS1zY29yZSBzcGFuJyksXG4gICAgICAgICAgICBnYW1lT3ZlciA6IHRoaXMuJCgnLmdhbWUtb3ZlcicpLFxuICAgICAgICAgICAgc291bmRTdGF0dXMgOiB0aGlzLiQoJy5zb3VuZC1zdGF0dXMnKSxcbiAgICAgICAgICAgIHBhdXNlZCA6IHRoaXMuJCgnLnBhdXNlZCcpLFxuICAgICAgICAgICAgbG9hZCA6IHRoaXMuJCgnLmxvYWRiYXInKVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMua2V5Ym9hcmQub24oRVZFTlRfS0VZX0RPV04sIHRoaXMuX29uS2V5RG93bi5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLnRvdWNoLm9uKEVWRU5UX1NXSVBFLCB0aGlzLl9vblN3aXBlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuc291bmQgPSBuZXcgU291bmRNYW5hZ2VyKHtcbiAgICAgICAgICAgIHNvdW5kRW5hYmxlZCA6IHRoaXMuc291bmRFbmFibGVkLFxuICAgICAgICAgICAgYWRkU291bmQgOiB0aGlzLmFkZFNvdW5kLmJpbmQodGhpcylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5saXZlcyA9IG5ldyBMaXZlcyh7XG4gICAgICAgICAgICBsaXZlcyA6IHRoaXMuZGVmYXVsdExpdmVzICsgMSxcbiAgICAgICAgICAgIHggOiA0MCxcbiAgICAgICAgICAgIHkgOiAxMTI0LFxuICAgICAgICAgICAgbW9kZWwgOiB0aGlzLm1vZGVsLFxuICAgICAgICAgICAgZmFjdG9yIDogdGhpcy5zY2FsaW5nLmdldEZhY3RvcigpLFxuICAgICAgICAgICAgYWRkU3ByaXRlIDogdGhpcy5hZGRTcHJpdGUuYmluZCh0aGlzKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmJvbnVzZXMgPSBuZXcgQm9udXNlcyh7XG4gICAgICAgICAgICBsZXZlbCA6IHRoaXMubW9kZWwubGV2ZWwsXG4gICAgICAgICAgICB4IDogODYwLFxuICAgICAgICAgICAgeSA6IDExMjQsXG4gICAgICAgICAgICBtb2RlbCA6IHRoaXMubW9kZWwsXG4gICAgICAgICAgICBmYWN0b3IgOiB0aGlzLnNjYWxpbmcuZ2V0RmFjdG9yKCksXG4gICAgICAgICAgICBhZGRTcHJpdGUgOiB0aGlzLmFkZFNwcml0ZS5iaW5kKHRoaXMpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX29uR2hvc3RFYXRlbiA9IHRoaXMuX29uR2hvc3RFYXRlbi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9vbkdob3N0RWF0ID0gdGhpcy5fb25HaG9zdEVhdC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMubW9kZWwub24oJ2NoYW5nZTpzY29yZScsIHRoaXMuX29uQ2hhbmdlU2NvcmUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMubW9kZWwub24oJ2NoYW5nZTpoaWdoU2NvcmUnLCB0aGlzLl9vbkNoYW5nZUhpZ2hTY29yZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5tb2RlbC5vbignY2hhbmdlOmxpdmVzJywgdGhpcy5fb25DaGFuZ2VMaXZlcy5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5tb2RlbC5vbignY2hhbmdlOmV4dHJhTGl2ZXMnLCB0aGlzLl9vbkNoYW5nZUV4dHJhTGl2ZXMuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMubW9kZWwub24oJ2NoYW5nZTptb2RlJywgdGhpcy5fb25DaGFuZ2VNb2RlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMubWFrZUxldmVsKCk7XG5cbiAgICAgICAgdGhpcy5zdGFydCgoKSA9PiB7XG4gICAgICAgICAgICBoaWRlKHRoaXMuZWxlbWVudHMubG9hZCk7XG4gICAgICAgICAgICBzaG93KHRoaXMuZWxlbWVudHMuc3RhcnQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGFydExldmVsKCkge1xuICAgICAgICBpZiAodGhpcy5fd2luKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmxldmVsKys7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLl93aW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9nYW1lT3Zlcikge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5sZXZlbCA9IDE7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLl9nYW1lT3ZlciA9IGZhbHNlO1xuICAgICAgICAgICAgaGlkZSh0aGlzLmVsZW1lbnRzLnNwbGFzaCk7XG4gICAgICAgICAgICB0aGlzLnNvdW5kLnBsYXkoJ2ludHJvJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBoaWRlKHRoaXMuZWxlbWVudHMuc3BsYXNoKTtcbiAgICAgICAgdGhpcy5zb3VuZC5wbGF5KCdpbnRybycpO1xuICAgICAgICB0aGlzLmFkZENhbGxiYWNrKHRoaXMubWFpbkxvb3AuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMubW9kZWwubW9kZSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5waW5reS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuYmxpbmt5LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5pbmt5LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5zdWUuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnBhY21hbi5kZXN0cm95KCk7XG5cbiAgICAgICAgdGhpcy5tYXAuZGVzdHJveUl0ZW1zKCk7XG5cbiAgICAgICAgdGhpcy5vZmYoJ2dhbWU6Z2hvc3Q6ZWF0ZW4nLCB0aGlzLl9vbkdob3N0RWF0ZW4pO1xuICAgICAgICB0aGlzLm9mZignZ2FtZTpnaG9zdDplYXQnLCB0aGlzLl9vbkdob3N0RWF0KTtcblxuICAgICAgICBpZiAoIXRoaXMuX3dpbikge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5saXZlcyA9IHRoaXMuZGVmYXVsdExpdmVzICsgMTtcbiAgICAgICAgICAgIHRoaXMubW9kZWwuc2NvcmUgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5rZXlib2FyZC5jbGVhcigpO1xuXG4gICAgICAgIHRoaXMuX2lucHV0RGlyZWN0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbGFzdFN3aXBlID0gbnVsbDtcblxuICAgICAgICB0aGlzLm1ha2VMZXZlbCgpO1xuICAgIH1cblxuICAgIG1ha2VMZXZlbCgpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLm1vZGVsLmdldFNldHRpbmdzKCdnYW1lJykpO1xuXG4gICAgICAgIHRoaXMubWFwID0gbmV3IE1hcCh0aGlzLm1hcCk7XG5cbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdtYXplLTEnKTtcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdtYXplLTInKTtcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdtYXplLTMnKTtcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdtYXplLTQnKTtcblxuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQodGhpcy5tYXplKTtcblxuICAgICAgICB2YXIgZG90QW5pbWF0aW9uTGFiZWwgPSAnd2hpdGUnO1xuICAgICAgICBpZiAodGhpcy5tYXplID09PSAnbWF6ZS0yJykgZG90QW5pbWF0aW9uTGFiZWwgPSAneWVsbG93JztcbiAgICAgICAgaWYgKHRoaXMubWF6ZSA9PT0gJ21hemUtMycpIGRvdEFuaW1hdGlvbkxhYmVsID0gJ3JlZCc7XG5cbiAgICAgICAgdGhpcy5fcGF1c2VGcmFtZXMgPSA4MDtcblxuICAgICAgICB0aGlzLl9kZXN0cm95Qm9udXMgPSAwO1xuICAgICAgICB0aGlzLl9zaG93Qm9udXMgPSA1MDA7XG5cbiAgICAgICAgdmFyIGkgPSB0aGlzLm1hcC50aWxlcy5sZW5ndGgsIHRvdGFsID0gMDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgdmFyIHRpbGUgPSB0aGlzLm1hcC50aWxlc1tpXTtcbiAgICAgICAgICAgIGlmICh0aWxlLmNvZGUgPT09ICcuJykge1xuICAgICAgICAgICAgICAgIGxldCBkb3QgPSBtYWtlRG90KHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFuaW1hdGlvbiA6IGRvdEFuaW1hdGlvbkxhYmVsLFxuICAgICAgICAgICAgICAgICAgICBtYXAgOiB0aGlzLm1hcCxcbiAgICAgICAgICAgICAgICAgICAgZmFjdG9yIDogdGhpcy5zY2FsaW5nLmdldEZhY3RvcigpLFxuICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVSZWZyYXNoUmF0ZSA6IHRoaXMubm9ybWFsaXplUmVmcmFzaFJhdGUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgeCA6IHRpbGUueCxcbiAgICAgICAgICAgICAgICAgICAgeSA6IHRpbGUueVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRpbGUuaXRlbSA9IGRvdDtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNwcml0ZShkb3QpO1xuICAgICAgICAgICAgICAgIHRvdGFsKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aWxlLmNvZGUgPT09ICcqJykge1xuICAgICAgICAgICAgICAgIGxldCBwaWxsID0gbWFrZVBpbGwoe1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QW5pbWF0aW9uIDogZG90QW5pbWF0aW9uTGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIG1hcCA6IHRoaXMubWFwLFxuICAgICAgICAgICAgICAgICAgICBmYWN0b3IgOiB0aGlzLnNjYWxpbmcuZ2V0RmFjdG9yKCksXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZVJlZnJhc2hSYXRlIDogdGhpcy5ub3JtYWxpemVSZWZyYXNoUmF0ZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICB4IDogdGlsZS54LFxuICAgICAgICAgICAgICAgICAgICB5IDogdGlsZS55XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGlsZS5pdGVtID0gcGlsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNwcml0ZShwaWxsKTtcbiAgICAgICAgICAgICAgICB0b3RhbCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b3RhbEl0ZW1zID0gdG90YWw7XG5cbiAgICAgICAgLy8gUGFjbWFuLlxuICAgICAgICB0aGlzLnBhY21hbiA9IG5ldyBQYWNtYW4oe1xuICAgICAgICAgICAgcHJldHVybiA6IHRydWUsXG4gICAgICAgICAgICB4IDogNDUyLFxuICAgICAgICAgICAgeSA6IDg0OCxcbiAgICAgICAgICAgIC4uLnRoaXMubW9kZWwuZ2V0U2V0dGluZ3MoJ3BhY21hbicpLFxuICAgICAgICAgICAgbWFwIDogdGhpcy5tYXAsXG4gICAgICAgICAgICBmYWN0b3IgOiB0aGlzLnNjYWxpbmcuZ2V0RmFjdG9yKCksXG4gICAgICAgICAgICBub3JtYWxpemVSZWZyYXNoUmF0ZSA6IHRoaXMubm9ybWFsaXplUmVmcmFzaFJhdGUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGFkZEdhbWVHaG9zdEVhdEV2ZW50TGlzdGVuZXIgOiBsaXN0ZW5lciA9PiB0aGlzLm9uKCdnYW1lOmdob3N0OmVhdCcsIGxpc3RlbmVyKSxcbiAgICAgICAgICAgIGFkZEdhbWVHaG9zdE1vZGVGcmlnaHRlbmVkRW50ZXIgOiBsaXN0ZW5lciA9PiB0aGlzLm9uKCdnYW1lOmdob3N0Om1vZGVmcmlnaHRlbmVkOmVudGVyJywgbGlzdGVuZXIpLFxuICAgICAgICAgICAgYWRkR2FtZUdob3N0TW9kZUZyaWdodGVuZWRFeGl0IDogbGlzdGVuZXIgPT4gdGhpcy5vbignZ2FtZTpnaG9zdDptb2RlZnJpZ2h0ZW5lZDpleGl0JywgbGlzdGVuZXIpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucGFjbWFuLm9uKCdpdGVtOmVhdHBpbGwnLCB0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3BhdXNlRnJhbWVzID0gMjtcblxuICAgICAgICAgICAgdGhpcy5tb2RlbC5hZGRTY29yZSh0aGlzLnBpbGxTY29yZSk7XG5cbiAgICAgICAgICAgIHRoaXMudG90YWxJdGVtcy0tO1xuXG4gICAgICAgICAgICBpZiAodGhpcy50b3RhbEl0ZW1zID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53aW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgdGhpcy5zb3VuZC5wbGF5KCdmcmlnaHRlbmVkJyk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBQYWNtYW4gZWF0cyBnaG9zdC5cbiAgICAgICAgdGhpcy5vbignZ2FtZTpnaG9zdDplYXRlbicsIHRoaXMuX29uR2hvc3RFYXRlbik7XG4gICAgICAgIC8vIEdob3N0IGVhdHMgUGFjbWFuLlxuICAgICAgICB0aGlzLm9uKCdnYW1lOmdob3N0OmVhdCcsIHRoaXMuX29uR2hvc3RFYXQpO1xuICAgICAgICAvLyBQYWNtYW4gbWFrZSBkaWUgdHVybiBhcnJvdW5kLlxuICAgICAgICB0aGlzLnBhY21hbi5vbignaXRlbTpkaWUnLCAoZ2hvc3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc291bmQucGxheSgnZWF0ZW4nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFBhY21hbiBsb3NlLlxuICAgICAgICB0aGlzLnBhY21hbi5vbignaXRlbTpsaWZlJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5rZXlib2FyZC5jbGVhcigpO1xuXG4gICAgICAgICAgICB0aGlzLl9pbnB1dERpcmVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9sYXN0U3dpcGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5tb2RlID0gbnVsbDtcblxuICAgICAgICAgICAgdGhpcy5wYWNtYW4ucmVzZXQoKTtcblxuICAgICAgICAgICAgdGhpcy5waW5reS5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5ibGlua3kucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuaW5reS5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5zdWUucmVzZXQoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYm9udXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95Qm9udXMgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dCb251cyA9IDI1MDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvbnVzLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ib251cy5oaWRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2hvd0dob3N0cygpO1xuXG4gICAgICAgICAgICB0aGlzLm1vZGVsLmxpdmVzLS07XG5cbiAgICAgICAgICAgIHRoaXMuX3BhY21hbkVhdGVuID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLmxpdmVzKSB7XG4gICAgICAgICAgICAgICAgc2hvdyh0aGlzLmVsZW1lbnRzLnN0YXJ0UmVhZHkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXVzZUZyYW1lcyA9IDQwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXVzZUZyYW1lcyA9IDEyMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFBhY21hbiBlYXRzIGRvdC5cbiAgICAgICAgdGhpcy5wYWNtYW4ub24oJ2l0ZW06ZWF0ZG90JywgKHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwuYWRkU2NvcmUodGhpcy5kb3RTY29yZSk7XG5cbiAgICAgICAgICAgIHRoaXMuc291bmQucGxheSgnZG90Jyk7XG5cbiAgICAgICAgICAgIHRoaXMudG90YWxJdGVtcy0tO1xuXG4gICAgICAgICAgICBpZiAodGhpcy50b3RhbEl0ZW1zID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53aW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRTcHJpdGUodGhpcy5wYWNtYW4pO1xuXG4gICAgICAgIC8vIEJvbnVzLlxuICAgICAgICBpZiAodGhpcy5ib251cykge1xuICAgICAgICAgICAgdGhpcy5ib251cy5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYm9udXNUaWxlID0gdGhpcy5tYXAudHVubmVsc1t0aGlzLm1hcC50dW5uZWxzLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIHRoaXMuYm9udXMgPSBtYWtlQm9udXModGhpcy5ib251c0luZGV4LCB7XG4gICAgICAgICAgICBtYXAgOiB0aGlzLm1hcCxcbiAgICAgICAgICAgIGRpciA6ICdsJyxcbiAgICAgICAgICAgIHNjb3JlIDogdGhpcy5ib251c1Njb3JlLFxuICAgICAgICAgICAgeCA6IGJvbnVzVGlsZS54LFxuICAgICAgICAgICAgeSA6IGJvbnVzVGlsZS55LFxuICAgICAgICAgICAgZmFjdG9yIDogdGhpcy5zY2FsaW5nLmdldEZhY3RvcigpLFxuICAgICAgICAgICAgbm9ybWFsaXplUmVmcmFzaFJhdGUgOiB0aGlzLm5vcm1hbGl6ZVJlZnJhc2hSYXRlLmJpbmQodGhpcyksXG4gICAgICAgICAgICBhZGRQYWNtYW5Qb3NpdGlvbkV2ZW50TGlzdGVuZXIgOiBsaXN0ZW5lciA9PiB0aGlzLnBhY21hbi5vbignaXRlbTpwb3NpdGlvbicsIGxpc3RlbmVyKVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBCb251cyByZWFjaGVzIHRhcmdldCBhbmQgZGlzYXBwZWFycy5cbiAgICAgICAgdGhpcy5ib251cy5vbignaXRlbTpkZXN0cm95JywgKGJvbnVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJvbnVzLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuYm9udXMgPSBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBQYWNtYW4gZWF0cyBib251cy5cbiAgICAgICAgdGhpcy5ib251cy5vbignaXRlbTplYXRlbicsIChib251cykgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3Nob3dCb251cykgcmV0dXJuOyAvLyBOb3QgeWV0IGluIHRoZSBtYXplXG4gICAgICAgICAgICB0aGlzLl9wYXVzZUZyYW1lcyA9IDU7XG4gICAgICAgICAgICB0aGlzLl9kZXN0cm95Qm9udXMgPSAyNTtcbiAgICAgICAgICAgIHRoaXMubW9kZWwuYWRkU2NvcmUocGFyc2VJbnQoYm9udXMuc2NvcmUpKTtcbiAgICAgICAgICAgIHRoaXMuc291bmQucGxheSgnYm9udXMnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRTcHJpdGUodGhpcy5ib251cyk7XG5cbiAgICAgICAgLy8gR2hvc3RzLlxuICAgICAgICBjb25zdCBnaG9zdEF0dHJzID0ge1xuICAgICAgICAgICAgLi4udGhpcy5tb2RlbC5nZXRTZXR0aW5ncygnZ2hvc3QnKSxcbiAgICAgICAgICAgIG1hcCA6IHRoaXMubWFwLFxuICAgICAgICAgICAgbm9ybWFsaXplUmVmcmFzaFJhdGUgOiB0aGlzLm5vcm1hbGl6ZVJlZnJhc2hSYXRlLmJpbmQodGhpcyksXG4gICAgICAgICAgICBmYWN0b3IgOiB0aGlzLnNjYWxpbmcuZ2V0RmFjdG9yKCksXG4gICAgICAgICAgICBhZGRHYW1lR2xvYmFsTW9kZUV2ZW50TGlzdGVuZXIgOiBsaXN0ZW5lciA9PiB0aGlzLm9uKCdnYW1lOmdsb2JhbG1vZGUnLCBsaXN0ZW5lciksXG4gICAgICAgICAgICBhZGRHYW1lR2hvc3RFYXRlbkV2ZW50TGlzdGVuZXIgOiBsaXN0ZW5lciA9PiB0aGlzLm9uKCdnYW1lOmdob3N0OmVhdGVuJywgbGlzdGVuZXIpLFxuICAgICAgICAgICAgYWRkUGFjbWFuUG9zaXRpb25FdmVudExpc3RlbmVyIDogbGlzdGVuZXIgPT4gdGhpcy5wYWNtYW4ub24oJ2l0ZW06cG9zaXRpb24nLCBsaXN0ZW5lciksXG4gICAgICAgICAgICBhZGRQYWNtYW5FYXRQaWxsRXZlbnRMaXN0ZW5lciA6IGxpc3RlbmVyID0+IHRoaXMucGFjbWFuLm9uKCdpdGVtOmVhdHBpbGwnLCBsaXN0ZW5lcilcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBwaW5reVRpbGUgPSB0aGlzLm1hcC5ob3VzZUNlbnRlci5nZXRSKCk7XG5cbiAgICAgICAgdGhpcy5waW5reSA9IG1ha2VHaG9zdCgncGlua3knLCB7XG4gICAgICAgICAgICAuLi5naG9zdEF0dHJzLFxuICAgICAgICAgICAgeCA6IHBpbmt5VGlsZS54IC0gdGhpcy5tYXAudGlsZVdpZHRoIC8gMixcbiAgICAgICAgICAgIHkgOiBwaW5reVRpbGUueVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzVG9HaG9zdCh0aGlzLnBpbmt5KTtcblxuICAgICAgICB0aGlzLmFkZFNwcml0ZSh0aGlzLnBpbmt5KTtcblxuICAgICAgICBjb25zdCBibGlua3lUaWxlID0gdGhpcy5tYXAuaG91c2UuZ2V0VSgpLmdldFIoKTtcbiAgICAgICAgdGhpcy5ibGlua3kgPSBtYWtlR2hvc3QoJ2JsaW5reScsIHtcbiAgICAgICAgICAgIC4uLmdob3N0QXR0cnMsXG4gICAgICAgICAgICB4IDogYmxpbmt5VGlsZS54IC0gdGhpcy5tYXAudGlsZVdpZHRoIC8gMixcbiAgICAgICAgICAgIHkgOiBibGlua3lUaWxlLnlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyc1RvR2hvc3QodGhpcy5ibGlua3kpO1xuXG4gICAgICAgIHRoaXMuYWRkU3ByaXRlKHRoaXMuYmxpbmt5KTtcblxuICAgICAgICBjb25zdCBpbmt5VGlsZSA9IHRoaXMubWFwLmhvdXNlQ2VudGVyLmdldEwoKTtcbiAgICAgICAgdGhpcy5pbmt5ID0gbWFrZUdob3N0KCdpbmt5Jywge1xuICAgICAgICAgICAgLi4uZ2hvc3RBdHRycyxcbiAgICAgICAgICAgIGJsaW5reSA6IHRoaXMuYmxpbmt5LFxuICAgICAgICAgICAgeCA6IGlua3lUaWxlLnggLSAxNixcbiAgICAgICAgICAgIHkgOiBpbmt5VGlsZS55XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnNUb0dob3N0KHRoaXMuaW5reSk7XG5cbiAgICAgICAgdGhpcy5hZGRTcHJpdGUodGhpcy5pbmt5KTtcblxuICAgICAgICBjb25zdCBzdWVUaWxlID0gdGhpcy5tYXAuaG91c2VDZW50ZXIuZ2V0UigpLmdldFIoKTtcbiAgICAgICAgdGhpcy5zdWUgPSBtYWtlR2hvc3QoJ3N1ZScsIHtcbiAgICAgICAgICAgIC4uLmdob3N0QXR0cnMsXG4gICAgICAgICAgICB4IDogc3VlVGlsZS54ICsgMTYsXG4gICAgICAgICAgICB5IDogc3VlVGlsZS55XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnNUb0dob3N0KHRoaXMuc3VlKTtcblxuICAgICAgICB0aGlzLmFkZFNwcml0ZSh0aGlzLnN1ZSk7XG5cbiAgICAgICAgc2hvdyh0aGlzLmVsZW1lbnRzLnN0YXJ0UmVhZHkpO1xuXG4gICAgICAgIGlmICghdGhpcy5fd2luKSB7XG4gICAgICAgICAgICBzaG93KHRoaXMuZWxlbWVudHMuc3RhcnRQMSk7XG5cbiAgICAgICAgICAgIHRoaXMuaGlkZUdob3N0cygpO1xuXG4gICAgICAgICAgICB0aGlzLnBhY21hbi5oaWRlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYm9udXMuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy5fc3RhcnQgPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnNUb0dob3N0KGdob3N0KSB7XG4gICAgICAgIGdob3N0Lm9uKCdpdGVtOmVhdCcsICgpID0+IHRoaXMuZW1pdCgnZ2FtZTpnaG9zdDplYXQnLCBnaG9zdCkpO1xuICAgICAgICBnaG9zdC5vbignaXRlbTplYXRlbicsICgpID0+IHRoaXMuZW1pdCgnZ2FtZTpnaG9zdDplYXRlbicsIGdob3N0KSk7XG4gICAgICAgIGdob3N0Lm9uKCdpdGVtOm1vZGVmcmlnaHRlbmVkOmVudGVyJywgKCkgPT4gdGhpcy5lbWl0KCdnYW1lOmdob3N0Om1vZGVmcmlnaHRlbmVkOmVudGVyJykpO1xuICAgICAgICBnaG9zdC5vbignaXRlbTptb2RlZnJpZ2h0ZW5lZDpleGl0JywgKCkgPT4gdGhpcy5lbWl0KCdnYW1lOmdob3N0Om1vZGVmcmlnaHRlbmVkOmV4aXQnKSk7XG4gICAgfVxuXG4gICAgbWFpbkxvb3AoKSB7XG4gICAgICAgIC8vIEdsb2JhbCBtb2RlLlxuICAgICAgICB0aGlzLm1vZGVsLnVwZGF0ZU1vZGUoKTtcblxuICAgICAgICAvLyBJbnB1dFxuICAgICAgICB0aGlzLl9pbnB1dERpcmVjdGlvbiA9IHRoaXMuX2dldElucHV0RGlyZWN0aW9uKCk7XG5cbiAgICAgICAgLy8gTW92ZS5cbiAgICAgICAgaWYgKCF0aGlzLl9wYXVzZUZyYW1lcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXJ0ID09PSAyKSB7XG4gICAgICAgICAgICAgICAgaGlkZSh0aGlzLmVsZW1lbnRzLnN0YXJ0UDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0dob3N0cygpO1xuICAgICAgICAgICAgICAgIHRoaXMucGFjbWFuLnNob3coKTtcblxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwubGl2ZXMgPSB0aGlzLmRlZmF1bHRMaXZlcztcblxuICAgICAgICAgICAgICAgIHRoaXMuX3BhdXNlRnJhbWVzID0gNjA7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhcnQtLTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9zdGFydCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGhpZGUodGhpcy5lbGVtZW50cy5zdGFydFJlYWR5KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydC0tO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX3dpbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRMZXZlbCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX2dhbWVPdmVyKSB7XG4gICAgICAgICAgICAgICAgaGlkZSh0aGlzLmVsZW1lbnRzLmdhbWVPdmVyKTtcbiAgICAgICAgICAgICAgICBzaG93KHRoaXMuZWxlbWVudHMuc3BsYXNoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9zaG93UGFjbWFuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWNtYW4uc2hvdygpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dQYWNtYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wYWNtYW4ubW92ZSh0aGlzLl9pbnB1dERpcmVjdGlvbik7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9wYWNtYW5FYXRlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZUdob3N0cygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3NvdW5kQmFja1BhdXNlRnJhbWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0dob3N0RGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kLnBsYXkoJ2RlYWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghdGhpcy5faXNHaG9zdEZyaWdodGVuZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZC5wbGF5KCdiYWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291bmRCYWNrUGF1c2VGcmFtZXMgPSA1O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB0aGlzLl9zb3VuZEJhY2tQYXVzZUZyYW1lcy0tO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5waW5reS5tb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ibGlua3kubW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5reS5tb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWUubW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Rlc3Ryb3lCb251cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGVzdHJveUJvbnVzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvbnVzLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmJvbnVzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lCb251cy0tO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5ib251cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2hvd0JvbnVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2hvd0JvbnVzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib251cy5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93Qm9udXMtLTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm9udXMubW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9wYXVzZUZyYW1lcy0tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIHN1cGVyLnBhdXNlKCk7XG5cbiAgICAgICAgdGhpcy5waW5reS5wYXVzZSgpO1xuICAgICAgICB0aGlzLmJsaW5reS5wYXVzZSgpO1xuICAgICAgICB0aGlzLmlua3kucGF1c2UoKTtcbiAgICAgICAgdGhpcy5zdWUucGF1c2UoKTtcblxuICAgICAgICB0aGlzLm11dGVTb3VuZCh0cnVlKTtcblxuICAgICAgICB0aGlzLm1vZGVsLnBhdXNlKCk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50cy5wYXVzZWQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIH1cblxuICAgIHJlc3VtZSgpIHtcbiAgICAgICAgc3VwZXIucmVzdW1lKCk7XG5cbiAgICAgICAgdGhpcy5waW5reS5yZXN1bWUoKTtcbiAgICAgICAgdGhpcy5ibGlua3kucmVzdW1lKCk7XG4gICAgICAgIHRoaXMuaW5reS5yZXN1bWUoKTtcbiAgICAgICAgdGhpcy5zdWUucmVzdW1lKCk7XG5cbiAgICAgICAgdGhpcy5tdXRlU291bmQoISF0aGlzLl9tdXRlZCk7XG5cbiAgICAgICAgdGhpcy5tb2RlbC5yZXN1bWUoKTtcblxuICAgICAgICBoaWRlKHRoaXMuZWxlbWVudHMucGF1c2VkKTtcbiAgICB9XG5cbiAgICB3aW4oKSB7XG4gICAgICAgIHRoaXMuX3BhdXNlRnJhbWVzID0gMTIwO1xuICAgICAgICB0aGlzLl93aW4gPSB0cnVlO1xuXG4gICAgICAgIGxldCB0aW1lcyA9IDE0O1xuICAgICAgICB0aGlzLmFkZENhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aW1lcykge1xuICAgICAgICAgICAgICAgIHRpbWVzLS07XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QudG9nZ2xlKCdibGluaycpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gS2VlcCBydW5uaW5nLlxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2JsaW5rJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7IC8vIFJlbW92ZSBjYWxsYmFjay5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy5yZWZyZXNoUmF0ZSAqIDgpO1xuXG4gICAgICAgIHRoaXMuaGlkZUdob3N0cygpO1xuICAgICAgICB0aGlzLm1hcC5oaWRlSXRlbXMoKTtcbiAgICAgICAgdGhpcy5wYWNtYW4ucGF1c2VBbmltYXRpb24oKTtcbiAgICB9XG5cbiAgICBoaWRlR2hvc3RzKCkge1xuICAgICAgICB0aGlzLnBpbmt5LmhpZGUoKTtcbiAgICAgICAgdGhpcy5ibGlua3kuaGlkZSgpO1xuICAgICAgICB0aGlzLmlua3kuaGlkZSgpO1xuICAgICAgICB0aGlzLnN1ZS5oaWRlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYm9udXMpIHRoaXMuYm9udXMuaGlkZSgpO1xuICAgIH1cblxuICAgIHNob3dHaG9zdHMoKSB7XG4gICAgICAgIHRoaXMucGlua3kuc2hvdygpO1xuICAgICAgICB0aGlzLmJsaW5reS5zaG93KCk7XG4gICAgICAgIHRoaXMuaW5reS5zaG93KCk7XG4gICAgICAgIHRoaXMuc3VlLnNob3coKTtcblxuICAgICAgICBpZiAodGhpcy5ib251cyAmJiAhdGhpcy5fc2hvd0JvbnVzKSB0aGlzLmJvbnVzLnNob3coKTtcbiAgICB9XG5cbiAgICBfaXNHaG9zdEZyaWdodGVuZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJsaW5reS5pc0ZyaWdodGVuZWQoKSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuaW5reS5pc0ZyaWdodGVuZWQoKSAgfHxcbiAgICAgICAgICAgICAgICB0aGlzLnBpbmt5LmlzRnJpZ2h0ZW5lZCgpIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5zdWUuaXNGcmlnaHRlbmVkKCk7XG4gICAgfVxuXG4gICAgX2lzR2hvc3REZWFkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ibGlua3kuaXNEZWFkKCkgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmlua3kuaXNEZWFkKCkgIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5waW5reS5pc0RlYWQoKSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuc3VlLmlzRGVhZCgpO1xuICAgIH1cblxuICAgIF9nZXRJbnB1dERpcmVjdGlvbigpIHtcbiAgICAgICAgY29uc3Qga2V5cyA9IHRoaXMua2V5Ym9hcmQua2V5cztcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IG51bGw7XG5cbiAgICAgICAgaWYgKGtleXNbS0VZX1VQXSkge1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gJ3UnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleXNbS0VZX1JJR0hUXSkge1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gJ3InO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleXNbS0VZX0RPV05dKSB7XG4gICAgICAgICAgICBkaXJlY3Rpb24gPSAnZCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5c1tLRVlfTEVGVF0pIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9ICdsJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RTd2lwZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5fbGFzdFN3aXBlID09PSBFVkVOVF9TV0lQRV9VUCkge1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gJ3UnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2xhc3RTd2lwZSA9PT0gRVZFTlRfU1dJUEVfUklHSFQpIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9ICdyJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9sYXN0U3dpcGUgPT09IEVWRU5UX1NXSVBFX0RPV04pIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9ICdkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9sYXN0U3dpcGUgPT09IEVWRU5UX1NXSVBFX0xFRlQpIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9ICdsJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkaXJlY3Rpb247XG4gICAgfVxuXG4gICAgb25Mb2FkUHJvZ3Jlc3MocGVyY2VudCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRzLmxvYWQucXVlcnlTZWxlY3RvcignLmlubmVyJykuc3R5bGUud2lkdGggPSBgJHtwZXJjZW50fSVgO1xuICAgIH1cblxuICAgIF9vblN3aXBlKHR5cGUsIGV2KSB7XG4gICAgICAgIHRoaXMuX2xhc3RTd2lwZSA9IHR5cGU7XG4gICAgfVxuXG4gICAgX29uS2V5RG93bihldmVudCkge1xuICAgICAgICAvLyBTb3VuZCBvbi9vZmYuXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSA4Mykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNvdW5kRW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgLy8gTXV0ZSBTb3VuZC5cbiAgICAgICAgICAgIHRoaXMuX211dGVkID0gIXRoaXMuX211dGVkO1xuICAgICAgICAgICAgdGhpcy5tdXRlU291bmQodGhpcy5fbXV0ZWQpO1xuXG4gICAgICAgICAgICB2YXIgZWwgPSB0aGlzLmVsZW1lbnRzLnNvdW5kU3RhdHVzO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fbXV0ZWQpIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ29uJyk7XG4gICAgICAgICAgICBlbHNlIGVsLmNsYXNzTGlzdC5hZGQoJ29uJyk7XG5cbiAgICAgICAgICAgIHNob3coZWwpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5faGlkZVNvdW5kU3RhdHVzVGltZW91dCkgY2xlYXJUaW1lb3V0KHRoaXMuX2hpZGVTb3VuZFN0YXR1c1RpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5faGlkZVNvdW5kU3RhdHVzVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGhpZGUoZWwpOyB9LCAyMDAwKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBQYXVzZSBHYW1lLlxuICAgICAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSA4MCkge1xuICAgICAgICAgICAgdGhpcy5fcGF1c2VkID0gIXRoaXMuX3BhdXNlZDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9wYXVzZWQpIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgIGVsc2UgdGhpcy5yZXN1bWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9vbkNoYW5nZVNjb3JlKG1vZGVsLCBzY29yZSkge1xuICAgICAgICB0aGlzLmVsZW1lbnRzLnNjb3JlLmlubmVyVGV4dCA9IHNjb3JlIHx8ICcwMCc7XG4gICAgfVxuXG4gICAgX29uQ2hhbmdlSGlnaFNjb3JlKG1vZGVsLCBoaWdoU2NvcmUpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5oaWdoU2NvcmUuaW5uZXJUZXh0ID0gaGlnaFNjb3JlIHx8ICcwMCc7XG4gICAgfVxuICAgIC8vIENhbmdlIGxpdmVzLiBDaGVjayBnYW1lIG92ZXIuXG4gICAgX29uQ2hhbmdlTGl2ZXMobW9kZWwsIGxpdmVzKSB7XG4gICAgICAgIGlmIChsaXZlcyA9PT0gMCkge1xuICAgICAgICAgICAgLy8gR2FtZSBvdmVyLlxuICAgICAgICAgICAgdGhpcy5fZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgc2hvdyh0aGlzLmVsZW1lbnRzLmdhbWVPdmVyKTtcbiAgICAgICAgICAgIHRoaXMuaGlkZUdob3N0cygpO1xuICAgICAgICAgICAgdGhpcy5wYWNtYW4uaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5zYXZlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gRXh0cmEgbGlmZS5cbiAgICBfb25DaGFuZ2VFeHRyYUxpdmVzKG1vZGVsLCBsaXZlcykge1xuICAgICAgICB0aGlzLnNvdW5kLnBsYXkoJ2xpZmUnKTtcbiAgICB9XG4gICAgLy8gQ2hhbmdlIGdsb2JhbCBtb2RlLlxuICAgIF9vbkNoYW5nZU1vZGUobW9kZWwsIG1vZGUpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdnYW1lOmdsb2JhbG1vZGUnLCBtb2RlKTtcbiAgICB9XG4gICAgLy8gUGFjbWFuIGVhdHMgZ2hvc3QuXG4gICAgX29uR2hvc3RFYXRlbihnaG9zdCkge1xuICAgICAgICB0aGlzLnBhY21hbi5oaWRlKCk7XG4gICAgICAgIHRoaXMuX3BhdXNlRnJhbWVzID0gMTU7XG4gICAgICAgIHRoaXMuX3Nob3dQYWNtYW4gPSB0cnVlO1xuICAgICAgICB0aGlzLm1vZGVsLmFkZFNjb3JlKHBhcnNlSW50KGdob3N0LnNjb3JlKSk7XG4gICAgICAgIHRoaXMuc291bmQucGxheSgnZWF0Jyk7XG4gICAgfVxuICAgIC8vIEdob3N0IGVhdHMgUGFjbWFuLlxuICAgIF9vbkdob3N0RWF0KCkge1xuICAgICAgICB0aGlzLl9wYXVzZUZyYW1lcyA9IDQwO1xuICAgICAgICB0aGlzLl9wYWNtYW5FYXRlbiA9IHRydWU7XG4gICAgfVxuXG4gICAgdGVtcGxhdGUobW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzY29yZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwMS1zY29yZVwiPjFVUDxiciAvPjxzcGFuPjAwPC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaWdoLXNjb3JlXCI+SElHSCBTQ09SRTxiciAvPjxzcGFuPiR7bW9kZWwuaGlnaFNjb3JlIHx8ICcwMCd9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwMi1zY29yZVwiPjJVUDxiciAvPjxzcGFuPjAwPC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhcnQtcDFcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIj5QTEFZRVIgT05FPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhcnQtcmVhZHlcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIj5SRUFEWSE8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW1lLW92ZXJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIj5HQU1FIE9WRVI8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzb3VuZC1zdGF0dXMgb25cIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIj48c3BhbiBjbGFzcz1cIndyYXBcIj5TT1VORDogPHNwYW4gY2xhc3M9XCJvblwiPk9OPC9zcGFuPjxzcGFuIGNsYXNzPVwib2ZmXCI+T0ZGPC9zcGFuPjwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYXVzZWRcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIj48c3BhbiBjbGFzcz1cIndyYXBcIj5QQVVTRUQ8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3BsYXNoXCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJuZXJkXCI+S0FBVCAmIFRPQklBUzxicj48YnI+PHNwYW4+R0FBTiBUUk9VV0VOPC9zcGFuPjwvcD5cbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInN0YXJ0XCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCI+U1RBUlQ8L2E+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxvYWRiYXJcIj48ZGl2IGNsYXNzPVwiaW5uZXJcIj48L2Rpdj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImtleXNcIj48c3Bhbj4mbGFycjsmdWFycjsmZGFycjsmcmFycjs8L3NwYW4+Ok1PVkUgPHNwYW4+Uzwvc3Bhbj46U09VTkQgPHNwYW4+UDwvc3Bhbj46UEFVU0U8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9XG59XG5cbk9iamVjdC5hc3NpZ24oSnNQYWNtYW4ucHJvdG90eXBlLCBkZWZhdWx0cyk7XG5cbmV4cG9ydCBkZWZhdWx0IEpzUGFjbWFuO1xuIiwiaW1wb3J0IE1vZGVsIGZyb20gJy4vZW5naW5lL01vZGVsJztcblxuaW1wb3J0IFRpbWVyIGZyb20gJy4vZW5naW5lL1RpbWVyJztcblxuaW1wb3J0IHsgTU9ERV9TQ0FUVEVSLCBNT0RFX0NIQVNFIH0gZnJvbSAnLi9HaG9zdCc7XG5cbmltcG9ydCBtYXAxIGZyb20gJy4vbWFwcy9tYXAtMSc7XG5pbXBvcnQgbWFwMiBmcm9tICcuL21hcHMvbWFwLTInO1xuaW1wb3J0IG1hcDMgZnJvbSAnLi9tYXBzL21hcC0zJztcbmltcG9ydCBtYXA0IGZyb20gJy4vbWFwcy9tYXAtNCc7XG5cbi8vIFRPRE86IEFkZCB0aW1lcyBkYXRhIGZvciBlYWNoIGxldmVsLlxuY29uc3QgdGltZXMgPSBbXG4gICAgeyBtb2RlIDogTU9ERV9TQ0FUVEVSLCB0aW1lIDogNyB9LFxuICAgIHsgbW9kZSA6IE1PREVfQ0hBU0UsIHRpbWUgOiAyMCB9LFxuICAgIHsgbW9kZSA6IE1PREVfU0NBVFRFUiwgdGltZSA6IDcgfSxcbiAgICB7IG1vZGUgOiBNT0RFX0NIQVNFLCB0aW1lIDogMjAgfSxcbiAgICB7IG1vZGUgOiBNT0RFX1NDQVRURVIsIHRpbWUgOiA1IH0sXG4gICAgeyBtb2RlIDogTU9ERV9DSEFTRSwgdGltZSA6IDIwIH0sXG4gICAgeyBtb2RlIDogTU9ERV9TQ0FUVEVSLCB0aW1lIDogNSB9LFxuICAgIHsgbW9kZSA6IE1PREVfQ0hBU0UsIHRpbWUgOiAxMDAwMDAwIH1cbl07XG5cbi8vIFRoaXMgaW5mbyB3YXMgcGFyc2VkIGZyb21cbi8vIGh0dHBzOi8vcGFjbWFuLmhvbGVuZXQuaW5mby8jTHZsU3BlY3NcbnZhciBkYXRhID0gW1xuICAgIFt0aW1lcywgMCwgXCIxMDBcIiwgXCI4MFwiLCBcIjcxXCIsIFwiNzVcIiwgXCI0MFwiLCBcIjIwXCIsIFwiODBcIiwgXCIxMFwiLCBcIjg1XCIsIFwiOTBcIiwgXCI3OVwiLCBcIjUwXCIsIFwiNlwiLCBcIjVcIiwgbWFwMSwgXCJtYXplLTFcIl0sXG4gICAgW3RpbWVzLCAxLCBcIjIwMFwiLCBcIjkwXCIsIFwiNzlcIiwgXCI4NVwiLCBcIjQ1XCIsIFwiMzBcIiwgXCI5MFwiLCBcIjE1XCIsIFwiOTVcIiwgXCI5NVwiLCBcIjgzXCIsIFwiNTVcIiwgXCI1XCIsIFwiNVwiLCBtYXAxLCBcIm1hemUtMVwiXSxcbiAgICBbdGltZXMsIDIsIFwiNTAwXCIsIFwiOTBcIiwgXCI3OVwiLCBcIjg1XCIsIFwiNDVcIiwgXCI0MFwiLCBcIjkwXCIsIFwiMjBcIiwgXCI5NVwiLCBcIjk1XCIsIFwiODNcIiwgXCI1NVwiLCBcIjRcIiwgXCI1XCIsIG1hcDIsIFwibWF6ZS0yXCJdLFxuICAgIFt0aW1lcywgMywgXCI1MDBcIiwgXCI5MFwiLCBcIjc5XCIsIFwiODVcIiwgXCI0NVwiLCBcIjQwXCIsIFwiOTBcIiwgXCIyMFwiLCBcIjk1XCIsIFwiOTVcIiwgXCI4M1wiLCBcIjU1XCIsIFwiM1wiLCBcIjVcIiwgbWFwMiwgXCJtYXplLTJcIl0sXG4gICAgW3RpbWVzLCA0LCBcIjcwMFwiLCBcIjEwMFwiLCBcIjg3XCIsIFwiOTVcIiwgXCI1MFwiLCBcIjQwXCIsIFwiMTAwXCIsIFwiMjBcIiwgXCIxMDVcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjYwXCIsIFwiMlwiLCBcIjVcIiwgbWFwMiwgXCJtYXplLTJcIl0sXG4gICAgW3RpbWVzLCA1LCBcIjcwMFwiLCBcIjEwMFwiLCBcIjg3XCIsIFwiOTVcIiwgXCI1MFwiLCBcIjUwXCIsIFwiMTAwXCIsIFwiMjVcIiwgXCIxMDVcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjYwXCIsIFwiNVwiLCBcIjVcIiwgbWFwMywgXCJtYXplLTNcIl0sXG4gICAgW3RpbWVzLCA2LCBcIjEwMDBcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjk1XCIsIFwiNTBcIiwgXCI1MFwiLCBcIjEwMFwiLCBcIjI1XCIsIFwiMTA1XCIsIFwiMTAwXCIsIFwiODdcIiwgXCI2MFwiLCBcIjJcIiwgXCI1XCIsIG1hcDMsIFwibWF6ZS0zXCJdLFxuICAgIFt0aW1lcywgNywgXCIxMDAwXCIsIFwiMTAwXCIsIFwiODdcIiwgXCI5NVwiLCBcIjUwXCIsIFwiNTBcIiwgXCIxMDBcIiwgXCIyNVwiLCBcIjEwNVwiLCBcIjEwMFwiLCBcIjg3XCIsIFwiNjBcIiwgXCIyXCIsIFwiNVwiLCBtYXAzLCBcIm1hemUtM1wiXSxcbiAgICBbdGltZXMsIDAsIFwiMjAwMFwiLCBcIjEwMFwiLCBcIjg3XCIsIFwiOTVcIiwgXCI1MFwiLCBcIjYwXCIsIFwiMTAwXCIsIFwiMzBcIiwgXCIxMDVcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjYwXCIsIFwiMVwiLCBcIjNcIiwgbWFwMywgXCJtYXplLTNcIl0sXG4gICAgW3RpbWVzLCAxLCBcIjIwMDBcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjk1XCIsIFwiNTBcIiwgXCI2MFwiLCBcIjEwMFwiLCBcIjMwXCIsIFwiMTA1XCIsIFwiMTAwXCIsIFwiODdcIiwgXCI2MFwiLCBcIjVcIiwgXCI1XCIsIG1hcDQsIFwibWF6ZS00XCJdLFxuICAgIFt0aW1lcywgMiwgXCIyMDAwXCIsIFwiMTAwXCIsIFwiODdcIiwgXCI5NVwiLCBcIjUwXCIsIFwiNjBcIiwgXCIxMDBcIiwgXCIzMFwiLCBcIjEwNVwiLCBcIjEwMFwiLCBcIjg3XCIsIFwiNjBcIiwgXCIyXCIsIFwiNVwiLCBtYXA0LCBcIm1hemUtNFwiXSxcbiAgICBbdGltZXMsIDMsIFwiMjAwMFwiLCBcIjEwMFwiLCBcIjg3XCIsIFwiOTVcIiwgXCI1MFwiLCBcIjgwXCIsIFwiMTAwXCIsIFwiNDBcIiwgXCIxMDVcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjYwXCIsIFwiMVwiLCBcIjNcIiwgbWFwNCwgXCJtYXplLTRcIl0sXG4gICAgW3RpbWVzLCA0LCBcIjUwMDBcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjk1XCIsIFwiNTBcIiwgXCI4MFwiLCBcIjEwMFwiLCBcIjQwXCIsIFwiMTA1XCIsIFwiMTAwXCIsIFwiODdcIiwgXCI2MFwiLCBcIjFcIiwgXCIzXCIsIG1hcDQsIFwibWF6ZS00XCJdLFxuICAgIFt0aW1lcywgNSwgXCI1MDAwXCIsIFwiMTAwXCIsIFwiODdcIiwgXCI5NVwiLCBcIjUwXCIsIFwiODBcIiwgXCIxMDBcIiwgXCI0MFwiLCBcIjEwNVwiLCBcIjEwMFwiLCBcIjg3XCIsIFwiNjBcIiwgXCIzXCIsIFwiNVwiLCBtYXAzLCBcIm1hemUtM1wiXSxcbiAgICBbdGltZXMsIDYsIFwiNTAwMFwiLCBcIjEwMFwiLCBcIjg3XCIsIFwiOTVcIiwgXCI1MFwiLCBcIjEwMFwiLCBcIjEwMFwiLCBcIjUwXCIsIFwiMTA1XCIsIFwiMTAwXCIsIFwiODdcIiwgXCI2MFwiLCBcIjFcIiwgXCIzXCIsIG1hcDMsIFwibWF6ZS0zXCJdLFxuICAgIFt0aW1lcywgNywgXCI1MDAwXCIsIFwiMTAwXCIsIFwiODdcIiwgXCI5NVwiLCBcIjUwXCIsIFwiMTAwXCIsIFwiMTAwXCIsIFwiNTBcIiwgXCIxMDVcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjYwXCIsIFwiMVwiLCBcIjNcIiwgbWFwMywgXCJtYXplLTNcIl0sXG4gICAgW3RpbWVzLCA3LCBcIjUwMDBcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjk1XCIsIFwiNTBcIiwgXCIxMDBcIiwgXCIxMDBcIiwgXCI1MFwiLCBcIjEwNVwiLCBcIjBcIiwgXCIwXCIsIFwiMFwiLCBcIjBcIiwgXCIwXCIsIG1hcDMsIFwibWF6ZS0zXCJdLFxuICAgIFt0aW1lcywgNywgXCI1MDAwXCIsIFwiMTAwXCIsIFwiODdcIiwgXCI5NVwiLCBcIjUwXCIsIFwiMTAwXCIsIFwiMTAwXCIsIFwiNTBcIiwgXCIxMDVcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjYwXCIsIFwiMVwiLCBcIjNcIiwgbWFwNCwgXCJtYXplLTRcIl0sXG4gICAgW3RpbWVzLCA3LCBcIjUwMDBcIiwgXCIxMDBcIiwgXCI4N1wiLCBcIjk1XCIsIFwiNTBcIiwgXCIxMjBcIiwgXCIxMDBcIiwgXCI2MFwiLCBcIjEwNVwiLCBcIjBcIiwgXCIwXCIsIFwiMFwiLCBcIjBcIiwgXCIwXCIsIG1hcDQsIFwibWF6ZS00XCJdLFxuICAgIFt0aW1lcywgNywgXCI1MDAwXCIsIFwiMTAwXCIsIFwiODdcIiwgXCI5NVwiLCBcIjUwXCIsIFwiMTIwXCIsIFwiMTAwXCIsIFwiNjBcIiwgXCIxMDVcIiwgXCIwXCIsIFwiMFwiLCBcIjBcIiwgXCIwXCIsIFwiMFwiLCBtYXA0LCBcIm1hemUtNFwiXSxcbiAgICBbdGltZXMsIDcsIFwiNTAwMFwiLCBcIjkwXCIsIFwiNzlcIiwgXCI5NVwiLCBcIjUwXCIsIFwiMTIwXCIsIFwiMTAwXCIsIFwiNjBcIiwgXCIxMDVcIiwgXCIwXCIsIFwiMFwiLCBcIjBcIiwgXCIwXCIsIFwiMFwiLCBtYXA0LCBcIm1hemUtNFwiXVxuXTtcblxudmFyIGtleXMgPSBbXG4gICAgJ2dhbWUudGltZXMnLFxuICAgICdnYW1lLmJvbnVzSW5kZXgnLFxuICAgICdnYW1lLmJvbnVzU2NvcmUnLFxuICAgICdwYWNtYW4uc3BlZWQnLFxuICAgICdwYWNtYW4uZG90U3BlZWQnLFxuICAgICdnaG9zdC5zcGVlZCcsXG4gICAgJ2dob3N0LnR1bm5lbFNwZWVkJyxcbiAgICAnJyxcbiAgICAnJyxcbiAgICAnJyxcbiAgICAnJyxcbiAgICAncGFjbWFuLmZyaWdodGVuZWRTcGVlZCcsXG4gICAgJ3BhY21hbi5mcmlnaHRlbmVkRG90U3BlZWQnLFxuICAgICdnaG9zdC5mcmlnaHRlbmVkU3BlZWQnLFxuICAgICdnaG9zdC5mcmlnaHRlbmVkVGltZScsXG4gICAgJ2dob3N0LmZyaWdodGVuZWRGbGFzaGVzJyxcbiAgICAnZ2FtZS5tYXAnLFxuICAgICdnYW1lLm1hemUnXG5dO1xuXG5jbGFzcyBHYW1lTW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gICAgY29uc3RydWN0b3IoYXR0cnMpIHtcbiAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgbGV2ZWwgOiAxLFxuICAgICAgICAgICAgc2NvcmUgOiAwLFxuICAgICAgICAgICAgaGlnaFNjb3JlIDogMCxcbiAgICAgICAgICAgIGxpdmVzIDogMyxcbiAgICAgICAgICAgIGV4dHJhTGl2ZXMgOiAxLFxuICAgICAgICAgICAgZXh0cmFMaWZlU2NvcmUgOiAxMDAwMCxcbiAgICAgICAgICAgIG1vZGUgOiBudWxsLFxuICAgICAgICAgICAgLi4uYXR0cnNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cmwgPSAnanNQYWNtYW4nO1xuXG4gICAgICAgIHRoaXMub24oJ2NoYW5nZTpzY29yZScsIHRoaXMub25DaGFuZ2VTY29yZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBhZGRTY29yZShzY29yZSkge1xuICAgICAgICB0aGlzLnNjb3JlID0gdGhpcy5zY29yZSArIHNjb3JlO1xuICAgIH1cblxuICAgIHVwZGF0ZU1vZGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5tb2RlKSB0aGlzLm1vZGVUaW1lciA9IG5ldyBUaW1lcigpO1xuXG4gICAgICAgIGNvbnN0IHsgdGltZXMgfSA9IHRoaXMuZ2V0U2V0dGluZ3MoJ2dhbWUnKTtcblxuICAgICAgICBsZXQgdG90YWwgPSAwLFxuICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgd2hpbGUodGltZXNbaV0pIHtcbiAgICAgICAgICAgIHRvdGFsICs9IHRpbWVzW2ldLnRpbWU7XG4gICAgICAgICAgICBpZiAoIXRoaXMubW9kZVRpbWVyLmlzRWxhcHNlZCh0b3RhbCkgfHwgaSA9PT0gdGltZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZSA9IHRpbWVzW2ldLm1vZGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZVRpbWVyKSB0aGlzLm1vZGVUaW1lci5wYXVzZSgpO1xuICAgIH1cblxuICAgIHJlc3VtZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZVRpbWVyKSB0aGlzLm1vZGVUaW1lci5yZXN1bWUoKTtcbiAgICB9XG5cbiAgICBnZXRTZXR0aW5ncyhrZXkpIHtcbiAgICAgICAgY29uc3Qgb2JqID0ge307XG5cbiAgICAgICAgY29uc3QgbGV2ZWwgPSB0aGlzLmxldmVsID4gZGF0YS5sZW5ndGggPyBkYXRhLmxlbmd0aCA6IHRoaXMubGV2ZWw7XG5cbiAgICAgICAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcblxuICAgICAgICB3aGlsZShpLS0pIHtcbiAgICAgICAgICAgIGxldCBwYXJ0cyA9IGtleXNbaV0uc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIGlmIChwYXJ0c1swXSA9PT0ga2V5KSBvYmpbcGFydHNbMV1dID0gZGF0YVtsZXZlbCAtIDFdW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICBvbkNoYW5nZVNjb3JlKCkge1xuICAgICAgICBpZiAodGhpcy5leHRyYUxpdmVzICYmIHRoaXMuc2NvcmUgPj0gdGhpcy5leHRyYUxpZmVTY29yZSkge1xuICAgICAgICAgICAgdGhpcy5leHRyYUxpdmVzLS07XG4gICAgICAgICAgICB0aGlzLmxpdmVzKys7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oaWdoU2NvcmUgPCB0aGlzLnNjb3JlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IHRoaXMuc2NvcmU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB7IGhpZ2hTY29yZSA6IHRoaXMuaGlnaFNjb3JlIH07XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lTW9kZWw7XG4iLCJpbXBvcnQgQW5pbWF0aW9uLCB7IEFOSU1BVElPTl9IT1JJWk9OVEFMIH0gZnJvbSAnLi9lbmdpbmUvQW5pbWF0aW9uJztcbmltcG9ydCBUaW1lciBmcm9tICcuL2VuZ2luZS9UaW1lcic7XG5pbXBvcnQgQ2hhcmFjdGVyIGZyb20gJy4vQ2hhcmFjdGVyJztcbmltcG9ydCBnZXREaXN0YW5jZSBmcm9tICcuL2hlbHBlci9nZXREaXN0YW5jZSc7XG5pbXBvcnQgcm5kIGZyb20gJy4vaGVscGVyL3JuZCc7XG5cbmV4cG9ydCBjb25zdCBNT0RFX1NDQVRURVIgPSAnc2NhdHRlcic7XG5leHBvcnQgY29uc3QgTU9ERV9DSEFTRSA9ICdjaGFzZSc7XG5leHBvcnQgY29uc3QgTU9ERV9GUklHSFRFTkVEID0gJ2ZyaWdodGVuZWQnO1xuZXhwb3J0IGNvbnN0IE1PREVfSE9VU0UgPSAnaG91c2UnO1xuZXhwb3J0IGNvbnN0IE1PREVfREVBRCA9ICdkZWFkJztcblxuZXhwb3J0IGNvbnN0IGFuaW1hdGlvbkJhc2UgPSB7XG4gICAgaW1hZ2VVUkwgOiAnaW1nL2NoYXJhY3RlcnMxLnBuZycsXG4gICAgbnVtYmVyT2ZGcmFtZSA6IDEsXG4gICAgZGVsdGEgOiA2NCxcbiAgICByZWZyZXNoUmF0ZSA6IDE4MCxcbiAgICB0eXBlIDogQU5JTUFUSU9OX0hPUklaT05UQUxcbn07XG5cbmV4cG9ydCBjb25zdCBhbmltYXRpb25zID0ge1xuICAgICdmcmlnaHRlbmVkJyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICBvZmZzZXRZIDogMzc2LFxuICAgICAgICBvZmZzZXRYIDogLTJcbiAgICB9KSxcblxuICAgICdmcmlnaHRlbmVkQmxpbmsnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgIG9mZnNldFkgOiAzNzYsXG4gICAgICAgIG9mZnNldFggOiAtMixcbiAgICAgICAgbnVtYmVyT2ZGcmFtZSA6IDRcbiAgICB9KSxcblxuICAgICdkZWFkUmlnaHQnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgIG9mZnNldFkgOiAzNzYsXG4gICAgICAgIG9mZnNldFggOiA2NCAqIDQgLSAyLFxuICAgICAgICBudW1iZXJPZkZyYW1lIDogMVxuICAgIH0pLFxuXG4gICAgJ2RlYWREb3duJyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICBvZmZzZXRZIDogMzc2LFxuICAgICAgICBvZmZzZXRYIDogNjQgKiA1IC0gMixcbiAgICAgICAgbnVtYmVyT2ZGcmFtZSA6IDFcbiAgICB9KSxcblxuICAgICdkZWFkVXAnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgIG9mZnNldFkgOiAzNzYsXG4gICAgICAgIG9mZnNldFggOiA2NCAqIDYgLSAyLFxuICAgICAgICBudW1iZXJPZkZyYW1lIDogMVxuICAgIH0pLFxuXG4gICAgJ2RlYWRMZWZ0JyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICBvZmZzZXRZIDogMzc2LFxuICAgICAgICBvZmZzZXRYIDogNjQgKiA3IC0gMixcbiAgICAgICAgbnVtYmVyT2ZGcmFtZSA6IDFcbiAgICB9KSxcblxuICAgICdzY29yZTIwMCcgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgaW1hZ2VVUkwgOiAnaW1nL21pc2MucG5nJyxcbiAgICAgICAgbnVtYmVyT2ZGcmFtZSA6IDEsXG4gICAgICAgIG9mZnNldFggOiAtMixcbiAgICAgICAgb2Zmc2V0WSA6IDExMFxuICAgIH0pLFxuXG4gICAgJ3Njb3JlNDAwJyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICBpbWFnZVVSTCA6ICdpbWcvbWlzYy5wbmcnLFxuICAgICAgICBudW1iZXJPZkZyYW1lIDogMSxcbiAgICAgICAgb2Zmc2V0WCA6IDY0ICogMSAtIDIsXG4gICAgICAgIG9mZnNldFkgOiAxMTBcbiAgICB9KSxcblxuICAgICdzY29yZTgwMCcgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgaW1hZ2VVUkwgOiAnaW1nL21pc2MucG5nJyxcbiAgICAgICAgbnVtYmVyT2ZGcmFtZSA6IDEsXG4gICAgICAgIG9mZnNldFggOiA2NCAqIDIgLSAyLFxuICAgICAgICBvZmZzZXRZIDogMTEwXG4gICAgfSksXG5cbiAgICAnc2NvcmUxNjAwJyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICBpbWFnZVVSTCA6ICdpbWcvbWlzYy5wbmcnLFxuICAgICAgICBudW1iZXJPZkZyYW1lIDogMSxcbiAgICAgICAgb2Zmc2V0WCA6IDY0ICogMyxcbiAgICAgICAgb2Zmc2V0WSA6IDExMFxuICAgIH0pXG59O1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgICBhbmltYXRpb25zLFxuICAgIHdpZHRoIDogNjQsXG4gICAgc3BlZWQgOiA3NSxcbiAgICBmcmlnaHRlbmVkVGltZSA6IDUsXG4gICAgd2FpdFRpbWUgOiA0LFxuICAgIHNjYXR0ZXJUYXJnZXQgOiAwLFxuICAgIG1vZGUgOiBNT0RFX0hPVVNFLFxuICAgIHNjb3JlIDogJzIwMCcsXG4gICAgc2NvcmVzIDogeyAnMjAwJyA6ICc0MDAnLCAnNDAwJyA6ICc4MDAnLCAnODAwJyA6ICcxNjAwJyB9LFxuICAgIGJsaW5reSA6IG51bGwsXG4gICAgZ2V0Q2hhc2VUYXJnZXQgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFjbWFuRGF0YS50aWxlO1xuICAgIH0sXG4gICAgdHVubmVsU3BlZWQgOiBudWxsLFxuICAgIGZyaWdodGVuZWRTcGVlZCA6IG51bGwsXG4gICAgZnJpZ2h0ZW5lZEZsYXNoZXMgOiBudWxsXG59O1xuXG5jbGFzcyBHaG9zdCBleHRlbmRzIENoYXJhY3RlciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhkZWZhdWx0cykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSBpbiBvcHRpb25zKSB0aGlzW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGFkZEdhbWVHbG9iYWxNb2RlRXZlbnRMaXN0ZW5lcixcbiAgICAgICAgICAgIGFkZEdhbWVHaG9zdEVhdGVuRXZlbnRMaXN0ZW5lcixcbiAgICAgICAgICAgIGFkZFBhY21hbkVhdFBpbGxFdmVudExpc3RlbmVyLFxuICAgICAgICAgICAgYWRkUGFjbWFuUG9zaXRpb25FdmVudExpc3RlbmVyXG4gICAgICAgIH0gPSBvcHRpb25zO1xuXG4gICAgICAgIHRoaXMuZGVhZFRhcmdldCA9IHRoaXMubWFwLmhvdXNlLmdldFIoKS5nZXRVKCk7XG4gICAgICAgIHRoaXMuZGVhZEVuZFggPSB0aGlzLl9kZWZhdWx0cy54O1xuICAgICAgICB0aGlzLmRlYWRFbmRZID0gdGhpcy5tYXAuaG91c2VDZW50ZXIueTtcbiAgICAgICAgdGhpcy5kZWFkRW5kID0gdGhpcy5tYXAuZ2V0VGlsZSh0aGlzLmRlYWRFbmRYLCB0aGlzLmRlYWRFbmRZLCB0cnVlKTtcblxuICAgICAgICB0aGlzLmhvdXNlVG9wID0gdGhpcy55IC0gdGhpcy5nZXRUaWxlKCkuaGVpZ2h0IC8gMjtcbiAgICAgICAgdGhpcy5ob3VzZUJvdHRvbSA9IHRoaXMueSArIHRoaXMuZ2V0VGlsZSgpLmhlaWdodCAvIDI7XG4gICAgICAgIHRoaXMuaG91c2VFeGl0VGlsZSA9IHRoaXMubWFwLmhvdXNlLmdldFIoKTtcbiAgICAgICAgdGhpcy5ob3VzZUV4aXRUaWxlWCA9IHRoaXMuaG91c2VFeGl0VGlsZS54IC0gdGhpcy5tYXAudGlsZVdpZHRoIC8gMjtcblxuICAgICAgICB0aGlzLnNjYXR0ZXJUYXJnZXQgPSB0aGlzLm1hcC50aWxlc1t0aGlzLnNjYXR0ZXJUYXJnZXRdO1xuXG4gICAgICAgIHRoaXMuc2V0TW9kZSh0aGlzLm1vZGUpO1xuXG4gICAgICAgIC8vIENoYW5nZSB0aWxlLlxuICAgICAgICB0aGlzLm9uKCdpdGVtOnRpbGUnLCAodCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gTU9ERV9GUklHSFRFTkVEKSB0aGlzLl9zcGVlZCA9IHRoaXMuZnJpZ2h0ZW5lZFNwZWVkO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tb2RlID09PSBNT0RFX0RFQUQpIHRoaXMuX3NwZWVkID0gMTMwO1xuICAgICAgICAgICAgZWxzZSBpZiAodC5pc1R1bm5lbCgpKSB0aGlzLl9zcGVlZCA9IHRoaXMudHVubmVsU3BlZWQ7XG4gICAgICAgICAgICBlbHNlIHRoaXMuX3NwZWVkID0gdGhpcy5zcGVlZDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3R1cm5CYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXIgPSB0aGlzLl9nZXRPcERpcmVjdGlvbih0aGlzLmRpcik7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXh0RGlyID0gdGhpcy5nZXROZXh0RGlyZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHVybkJhY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyID0gdGhpcy5fbmV4dERpcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXh0RGlyID0gdGhpcy5nZXROZXh0RGlyZWN0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2VhdEV2ZW50ID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFkZEdhbWVHbG9iYWxNb2RlRXZlbnRMaXN0ZW5lcih0aGlzLm9uR2FtZUdsb2JhbE1vZGUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgYWRkUGFjbWFuRWF0UGlsbEV2ZW50TGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRNb2RlKE1PREVfRlJJR0hURU5FRCk7XG4gICAgICAgICAgICB0aGlzLnNjb3JlID0gMjAwO1xuICAgICAgICB9KTtcblxuICAgICAgICBhZGRHYW1lR2hvc3RFYXRlbkV2ZW50TGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zY29yZSA9IHRoaXMuc2NvcmVzW3RoaXMuc2NvcmVdO1xuICAgICAgICB9KTtcblxuICAgICAgICBhZGRQYWNtYW5Qb3NpdGlvbkV2ZW50TGlzdGVuZXIoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhY21hbkRhdGEgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcbiAgICAgICAgdGhpcy5zZXRNb2RlKHRoaXMubW9kZSk7XG4gICAgfVxuXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmhvdXNlVGltZXIpIHRoaXMuaG91c2VUaW1lci5wYXVzZSgpO1xuICAgICAgICBpZiAodGhpcy5mcmlnaHRlbmVkVGltZXIpIHRoaXMuZnJpZ2h0ZW5lZFRpbWVyLnBhdXNlKCk7XG4gICAgfVxuXG4gICAgcmVzdW1lKCkge1xuICAgICAgICBpZiAodGhpcy5tb2RlID09PSBNT0RFX0ZSSUdIVEVORUQpIHRoaXMuZnJpZ2h0ZW5lZFRpbWVyLnJlc3VtZSgpO1xuICAgICAgICBpZiAodGhpcy5tb2RlID09PSBNT0RFX0hPVVNFICYmICF0aGlzLmhvdXNlUHJlcGFyZUV4aXQpIGhvdXNlVGltZXIucmVzdW1lKCk7XG4gICAgfVxuXG4gICAgc2V0TW9kZShtb2RlKSB7XG4gICAgICAgIGlmICghbW9kZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZnJpZ2h0ZW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZSA9IHRoaXMuZnJpZ2h0ZW5lZDtcbiAgICAgICAgICAgICAgICB0aGlzLmZyaWdodGVuZWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW9kZSA9IHRoaXMuZ2xvYmFsTW9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb2RlID09PSBNT0RFX0ZSSUdIVEVORUQgJiYgKHRoaXMubW9kZSA9PT0gTU9ERV9IT1VTRSB8fCB0aGlzLm1vZGUgPT09IE1PREVfREVBRCkpIHtcbiAgICAgICAgICAgIHRoaXMuZnJpZ2h0ZW5lZCA9IG1vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vZGUgPSBtb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbkVudGVyTW9kZShtb2RlKTtcbiAgICB9XG5cbiAgICBzaG91bGRFeGl0TW9kZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gTU9ERV9ERUFEKSByZXR1cm4gdGhpcy5nZXRUaWxlKCkgPT09IHRoaXMuZGVhZEVuZDtcbiAgICAgICAgXG4gICAgICAgIGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gTU9ERV9GUklHSFRFTkVEKSByZXR1cm4gdGhpcy5mcmlnaHRlbmVkVGltZXIuaXNFbGFwc2VkKCk7XG5cbiAgICAgICAgZWxzZSBpZiAodGhpcy5tb2RlID09PSBNT0RFX0hPVVNFKSByZXR1cm4gdGhpcy5nZXRUaWxlKCkgPT09IHRoaXMuaG91c2VFeGl0VGlsZS5nZXRVKCk7XG5cbiAgICAgICAgZWxzZSBpZiAodGhpcy5tb2RlICE9IHRoaXMuZ2xvYmFsTW9kZSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIG9uRW50ZXJNb2RlKG1vZGUpIHtcbiAgICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgICAgICBjYXNlIE1PREVfREVBRDpcbiAgICAgICAgICAgICAgICB0aGlzLmRlYWRQcmVwYXJlRW50ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXh0QW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zW2BzY29yZSR7dGhpcy5zY29yZX1gXTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBNT0RFX0ZSSUdIVEVORUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5mcmlnaHRlbmVkVGltZXIgPSBuZXcgVGltZXIodGhpcy5mcmlnaHRlbmVkVGltZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdpdGVtOm1vZGVmcmlnaHRlbmVkOmVudGVyJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE1PREVfSE9VU0U6XG4gICAgICAgICAgICAgICAgdGhpcy5ob3VzZVByZXBhcmVFeGl0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BlZWQgPSA3MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRXhpdE1vZGUoKSB7XG4gICAgICAgIGNvbnN0IHRpbGUgPSB0aGlzLmdldFRpbGUoKTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgICAgICAgICAgY2FzZSBNT0RFX0RFQUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBNT0RFX0ZSSUdIVEVORUQ6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZyaWdodGVuZWQpIHRoaXMuc2V0TW9kZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnaXRlbTptb2RlZnJpZ2h0ZW5lZDpleGl0Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE1PREVfSE9VU0U6XG4gICAgICAgICAgICAgICAgdGhpcy5ob3VzZVRpbWVyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2RpciA9ICdsJztcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXh0RGlyID0gJ2wnO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RUaWxlID0gdGlsZS5nZXREKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BlZWQgPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TW9kZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoIXRpbGUuaXNIb3VzZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3R1cm5CYWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNb2RlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0ZyaWdodGVuZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZyaWdodGVuZWQgfHwgdGhpcy5tb2RlID09PSBNT0RFX0ZSSUdIVEVORUQ7XG4gICAgfVxuXG4gICAgaXNEZWFkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlID09PSBNT0RFX0RFQUQ7XG4gICAgfVxuXG4gICAgb25HYW1lR2xvYmFsTW9kZShtb2RlKSB7XG4gICAgICAgIGlmIChtb2RlKSB0aGlzLmdsb2JhbE1vZGUgPSBtb2RlO1xuICAgIH1cblxuICAgIG1vdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3VsZEV4aXRNb2RlKCkpIHtcbiAgICAgICAgICAgIHRoaXMub25FeGl0TW9kZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gTU9ERV9ERUFEKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRlYWRQcmVwYXJlRW50ZXIgJiYgdGhpcy5nZXRUaWxlKCkgPT09IHRoaXMuZGVhZFRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYWRQcmVwYXJlRW50ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlYWRQcmVwYXJlRW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZFggPSB0aGlzLmRlYWRFbmRYO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kWSA9IHRoaXMuZGVhZEVuZFk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNob3VsZCBnbyB0byBjZW50ZXIgZmlyc3RcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueSA8IGVuZFkpIGVuZFggPSB0aGlzLmRlYWRUYXJnZXQueCAtIHRoaXMubWFwLnR3IC8gMjtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGRpcmVjdGlvblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy54IDwgZW5kWCkgdGhpcy5kaXIgPSAncic7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMueCA+IGVuZFgpIHRoaXMuZGlyID0gJ2wnO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnkgPCBlbmRZKSB0aGlzLmRpciA9ICdkJztcbiAgICAgICAgICAgICAgICAgICAgLy8gTW92ZVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXIgPT09ICdkJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLmdldE1pbih0aGlzLmdldFN0ZXAoKSwgZW5kWSAtIHRoaXMueSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpciA9PT0gJ3InKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMuZ2V0TWluKHRoaXMuZ2V0U3RlcCgpLCBlbmRYIC0gdGhpcy54KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyID09PSAnbCcpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnggLT0gdGhpcy5nZXRNaW4odGhpcy5nZXRTdGVwKCksIHRoaXMueCAtIGVuZFgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TmV4dEFuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLm1vdmUodGhpcy5fZGlyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gTU9ERV9IT1VTRSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5ob3VzZVRpbWVyKSB0aGlzLmhvdXNlVGltZXIgPSBuZXcgVGltZXIodGhpcy53YWl0VGltZSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0aWxlID0gdGhpcy5nZXRUaWxlKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaG91c2VQcmVwYXJlRXhpdCAmJiB0aGlzLmhvdXNlVGltZXIuaXNFbGFwc2VkKCkgJiYgIXRpbGUuaXNXYWxsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3VzZVByZXBhcmVFeGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ID0gdGlsZS55O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyaWdodGVuZWQgJiYgdGhpcy5mcmlnaHRlbmVkVGltZXIuaXNFbGFwc2VkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmlnaHRlbmVkID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3VzZVByZXBhcmVFeGl0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnggPCB0aGlzLmhvdXNlRXhpdFRpbGVYKSB0aGlzLmRpciA9ICdyJztcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy54ID4gdGhpcy5ob3VzZUV4aXRUaWxlWCkgdGhpcy5kaXIgPSAnbCc7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5kaXIgPSAndSc7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyID09PSAndScpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnkgLT0gdGhpcy5nZXRNaW4odGhpcy5nZXRTdGVwKCksIHRoaXMueSAtIHRoaXMuaG91c2VFeGl0VGlsZS5nZXRVKCkueSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpciA9PT0gJ3InKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMuZ2V0TWluKHRoaXMuZ2V0U3RlcCgpLCB0aGlzLmhvdXNlRXhpdFRpbGVYIC0gdGhpcy54KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyID09PSAnbCcpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnggLT0gdGhpcy5nZXRNaW4odGhpcy5nZXRTdGVwKCksIHRoaXMueCAtIHRoaXMuaG91c2VFeGl0VGlsZVgpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueSA8PSB0aGlzLmhvdXNlVG9wICYmIHRoaXMuZGlyID09PSAndScpIHRoaXMuZGlyID0gJ2QnO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy55ID49IHRoaXMuaG91c2VCb3R0b20gJiYgdGhpcy5kaXIgPT09ICdkJykgdGhpcy5kaXIgPSAndSc7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyID09PSAndScpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnkgLT0gdGhpcy5nZXRNaW4odGhpcy5nZXRTdGVwKCksIHRoaXMueSAtIHRoaXMuaG91c2VUb3ApO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXIgPT09ICdkJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLmdldE1pbih0aGlzLmdldFN0ZXAoKSwgdGhpcy5ob3VzZUJvdHRvbSAtIHRoaXMueSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNldE5leHRBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdXBlci5tb3ZlKHRoaXMuX2Rpcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFYXQgb3IgZWF0ZW4hXG4gICAgICAgIGlmICghdGhpcy5fZWF0RXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBwdCA9IHRoaXMucGFjbWFuRGF0YS50aWxlLCB0ID0gdGhpcy5nZXRUaWxlKCksIG9wID0gdGhpcy5fZ2V0T3BEaXJlY3Rpb24odGhpcy5kaXIpO1xuICAgICAgICAgICAgaWYgKHB0ID09PSB0IHx8ICh0aGlzLnBhY21hbkRhdGEuZGlyID09PSBvcCAmJiBwdCA9PT0gdC5nZXQob3ApKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VhdEV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSBNT0RFX0ZSSUdIVEVORUQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gR2hvc3QgZWF0ZW4gYnkgUGFjbWFuIVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE1vZGUoTU9ERV9ERUFEKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdpdGVtOmVhdGVuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZGUgIT09IE1PREVfREVBRCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBFYXQgUGFjbWFuIVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2l0ZW06ZWF0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuR28oZGlyLCB0aWxlKSB7XG4gICAgICAgIGlmICghdGlsZSkgdGlsZSA9IHRoaXMuZ2V0VGlsZSgpO1xuXG4gICAgICAgIGNvbnN0IG5leHRUaWxlID0gdGlsZS5nZXQoZGlyKTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlID09PSBNT0RFX0RFQUQpIHJldHVybiAhbmV4dFRpbGUgfHwgIW5leHRUaWxlLmlzV2FsbCgpO1xuXG4gICAgICAgIGlmICghbmV4dFRpbGUpIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gIW5leHRUaWxlLmlzV2FsbCgpICYmICFuZXh0VGlsZS5pc0hvdXNlKCk7XG5cbiAgICB9XG5cbiAgICBnZXROZXh0RGlyZWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5tb2RlID09PSBNT0RFX0ZSSUdIVEVORUQpIHtcbiAgICAgICAgICAgIC8vIE5leHQgdGlsZS5cbiAgICAgICAgICAgIGNvbnN0IG5leHRUaWxlID0gdGhpcy5nZXRUaWxlKCkuZ2V0KHRoaXMuX2Rpcik7XG4gICAgICAgICAgICAvLyBDbG9ja3dpc2UgZGlyZWN0aW9uIG9yZGVyLlxuICAgICAgICAgICAgY29uc3QgZGlyZWN0aW9ucyA9IFsndScsICdyJywgJ2QnLCAnbCcsICd1JywgJ3InLCAnZCcsICdsJ107XG4gICAgICAgICAgICAvLyBTZWxlY3QgcmFuZG9tIGRpcmVjdGlvbi4gVGhlbiB0cnkgdGhhdCBkaXJlY3Rpb24gb3IgY2hhbmdlIGZvbGxvd2luZyBjbG9ja3dpc2Ugb3JkZXIuXG4gICAgICAgICAgICBsZXQgaWR4ID0gcm5kKDQpO1xuXG4gICAgICAgICAgICBsZXQgbmV4dERpcmVjdGlvbiA9IGRpcmVjdGlvbnNbaWR4XTtcblxuICAgICAgICAgICAgd2hpbGUgKG5leHREaXJlY3Rpb24gJiYgKG5leHREaXJlY3Rpb24gPT09IHRoaXMuX2dldE9wRGlyZWN0aW9uKHRoaXMuX2RpcikgfHwgIXRoaXMuY2FuR28obmV4dERpcmVjdGlvbiwgbmV4dFRpbGUpKSkge1xuICAgICAgICAgICAgICAgIG5leHREaXJlY3Rpb24gPSBkaXJlY3Rpb25zWysraWR4XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5leHREaXJlY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGFyZ2V0IFRpbGVcbiAgICAgICAgY29uc3QgdGFyZ2V0VGlsZSA9IHRoaXMubW9kZSA9PT0gTU9ERV9DSEFTRSA/IHRoaXMuZ2V0Q2hhc2VUYXJnZXQoKSA6XG4gICAgICAgICAgICB0aGlzLm1vZGUgPT09IE1PREVfU0NBVFRFUiA/IHRoaXMuc2NhdHRlclRhcmdldCA6XG4gICAgICAgICAgICB0aGlzLmRlYWRUYXJnZXQ7XG5cbiAgICAgICAgY29uc3QgX2RpciA9IHRoaXMuX2RpciB8fCB0aGlzLmRpcjtcbiAgICAgICAgLy8gTmV4dCB0aWxlLlxuICAgICAgICBjb25zdCBuZXh0VGlsZSA9IHRoaXMuZ2V0VGlsZSgpLmdldChfZGlyKTtcbiAgICAgICAgLy8gUHJlZmVycmVkIGRpcmVjdGlvbiBvcmRlci5cbiAgICAgICAgY29uc3QgZGlyZWN0aW9ucyA9IFsndScsICdsJywgJ2QnLCAnciddO1xuXG4gICAgICAgIGxldCBuZXh0RGlyZWN0aW9uLCBsYXN0RGlzdGFuY2U7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkaXIgPSBkaXJlY3Rpb25zW2ldO1xuICAgICAgICAgICAgLy8gQ2FudCd0IGdvIGJhY2suXG4gICAgICAgICAgICBpZiAoZGlyID09PSB0aGlzLl9nZXRPcERpcmVjdGlvbihfZGlyKSkgY29udGludWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNhbkdvKGRpciwgbmV4dFRpbGUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlc3RUaWxlID0gbmV4dFRpbGUuZ2V0KGRpcik7XG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gZ2V0RGlzdGFuY2UodGVzdFRpbGUsIHRhcmdldFRpbGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBsYXN0RGlzdGFuY2UgPT09ICd1bmRlZmluZWQnIHx8IGxhc3REaXN0YW5jZSA+IGRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHREaXJlY3Rpb24gPSBkaXI7XG4gICAgICAgICAgICAgICAgICAgIGxhc3REaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0RGlyZWN0aW9uO1xuICAgIH1cblxuICAgIHNldE5leHRBbmltYXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09IE1PREVfREVBRCkge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmRpcikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3UnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZXh0QW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25zLmRlYWRVcDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25leHRBbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZGVhZFJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmV4dEFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5kZWFkRG93bjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25leHRBbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZGVhZExlZnQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gTU9ERV9GUklHSFRFTkVEIHx8XG4gICAgICAgICAgICAodGhpcy5tb2RlID09PSBNT0RFX0hPVVNFICYmIHRoaXMuZnJpZ2h0ZW5lZCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZyaWdodGVuZWRUaW1lIC0gdGhpcy5mcmlnaHRlbmVkVGltZSAqIDAuMiA+IHRoaXMuZnJpZ2h0ZW5lZFRpbWVyLmdldEVsYXBzZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX25leHRBbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuZnJpZ2h0ZW5lZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmV4dEFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9ucy5mcmlnaHRlbmVkQmxpbms7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXBlci5zZXROZXh0QW5pbWF0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbk9iamVjdC5hc3NpZ24oR2hvc3QucHJvdG90eXBlLCBkZWZhdWx0cyk7XG5cbmV4cG9ydCBkZWZhdWx0IEdob3N0O1xuIiwiaW1wb3J0IFNwcml0ZSBmcm9tICcuL2VuZ2luZS9TcHJpdGUnO1xuXG5jbGFzcyBJdGVtIGV4dGVuZHMgU3ByaXRlIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMubWFwKSB0aGlzLm1hcCA9IG9wdGlvbnMubWFwO1xuICAgICAgICAvLyBIYWxmIHdpZHRoIGFuZCBoYWxmIGhlaWdodC5cbiAgICAgICAgdGhpcy5vZmZzZXRYID0gcGFyc2VJbnQodGhpcy53aWR0aCAvIDIpO1xuICAgICAgICB0aGlzLm9mZnNldFkgPSBwYXJzZUludCh0aGlzLmhlaWdodCAvIDIpO1xuICAgICAgICAvLyBSZW5kZXIuXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0VGlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmdldFRpbGUodGhpcy54LCB0aGlzLnksIHRydWUpO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKS5yZW1vdmVFbGVtZW50KCk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuZWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSXRlbTtcbiIsImltcG9ydCBQYWNtYW4gZnJvbSAnLi9QYWNtYW4nO1xuXG5jbGFzcyBMaXZlcyAge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5wYWNtYW5zID0gW107XG5cbiAgICAgICAgdGhpcy5tb2RlbCA9IG9wdGlvbnMubW9kZWw7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwYWNtYW4gPSBuZXcgUGFjbWFuKHtcbiAgICAgICAgICAgICAgICB4IDogb3B0aW9ucy54ICsgaSAqIDcwLFxuICAgICAgICAgICAgICAgIHkgOiBvcHRpb25zLnksXG4gICAgICAgICAgICAgICAgZmFjdG9yIDogb3B0aW9ucy5mYWN0b3IsXG4gICAgICAgICAgICAgICAgZGVmYXVsdEFuaW1hdGlvbiA6ICdyaWdodCcsXG4gICAgICAgICAgICAgICAgYWRkR2FtZUdob3N0RWF0RXZlbnRMaXN0ZW5lciA6ICgpID0+IHt9LFxuICAgICAgICAgICAgICAgIGFkZEdhbWVHaG9zdE1vZGVGcmlnaHRlbmVkRW50ZXIgOiAoKSA9PiB7fSxcbiAgICAgICAgICAgICAgICBhZGRHYW1lR2hvc3RNb2RlRnJpZ2h0ZW5lZEV4aXQgOiAoKSA9PiB7fSxcbiAgICAgICAgICAgICAgICBub3JtYWxpemVSZWZyYXNoUmF0ZSA6ICgpID0+IDFcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBvcHRpb25zLmFkZFNwcml0ZShwYWNtYW4pO1xuICAgICAgICAgICAgdGhpcy5wYWNtYW5zLnB1c2gocGFjbWFuKTtcblxuICAgICAgICAgICAgaWYgKGkgPiB0aGlzLm1vZGVsLmxpdmVzIC0gMikgdGhpcy5wYWNtYW5zW2ldLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW9kZWwub24oJ2NoYW5nZTpsaXZlcycsIHRoaXMucmVuZGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpID4gdGhpcy5tb2RlbC5saXZlcyAtIDIpIHRoaXMucGFjbWFuc1tpXS5oaWRlKCk7XG4gICAgICAgICAgICBlbHNlIHRoaXMucGFjbWFuc1tpXS5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExpdmVzO1xuIiwiaW1wb3J0IFRpbGUgZnJvbSAnLi9UaWxlLmpzJztcblxuY2xhc3MgTWFwIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgICAgIC8qXG4gICAgICAgIGRhdGEgPSBbJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nLFxuICAgICAgICAgICAgICAgICc9PT09PT09PT09PT09PT09PT09PT09PT09PT09JyxcbiAgICAgICAgICAgICAgICAnPS4uLi4uLj09Li4uLi4uLi4uLj09Li4uLi4uPScsXG4gICAgICAgICAgICAgICAgJz0qPT09PS49PS49PT09PT09PS49PS49PT09Kj0nXVxuICAgICAgICAqL1xuICAgICAgICAvLyBTdG9yZSB0aWxlcyBpbiBhcnJheS5cbiAgICAgICAgdGhpcy50aWxlcyA9IFtdO1xuICAgICAgICAvLyBTZXQgd2l0aCBhbmQgaGVpZ2h0IGFjY29yZGluZyB0byBkYXRhLlxuICAgICAgICB0aGlzLndpZHRoID0gZGF0YVswXS5sZW5ndGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gZGF0YS5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy50dW5uZWxzID0gW107XG5cbiAgICAgICAgLy8gSW5zdGFudGlhdGUgdGlsZXMgYW5kIHN0b3JlIHRoZW0uXG4gICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgdmFyIHIgPSBkYXRhW3ldO1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY29kZSA9IHIuY2hhckF0KHgpO1xuICAgICAgICAgICAgICAgIHZhciB0aWxlID0gbmV3IFRpbGUoY29kZSwgeCwgeSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy50aWxlcy5wdXNoKHRpbGUpO1xuICAgICAgICAgICAgICAgIGlmICh0aWxlLmlzSG91c2UoKSAmJiAhdGhpcy5ob3VzZSkgeyAvLyBTdG9yZSBsZWZ0IGhvdXNlIGRvb3JcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3VzZSA9IHRpbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aWxlLmlzVHVubmVsKCkgJiYgKHRpbGUuY29sID09PSAwIHx8IHRpbGUuY29sID09PSB0aGlzLndpZHRoIC0gMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50dW5uZWxzLnB1c2godGlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ob3VzZUNlbnRlciA9IHRoaXMuaG91c2UuZ2V0RCgpLmdldEQoKTtcblxuICAgICAgICAvLyBDYWNoZSB0aWxlIGRpbWVuc2lvbnNcbiAgICAgICAgdGhpcy50aWxlV2lkdGggPSB0aGlzLnRpbGVzWzBdLndpZHRoO1xuICAgICAgICB0aGlzLnRpbGVIZWlnaHQgPSB0aGlzLnRpbGVzWzBdLmhlaWdodDtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gdGlsZSBvYmplY3QuXG4gICAgZ2V0VGlsZShjb2wsIHJvdywgaW5QaXhlbHMpIHtcbiAgICAgICAgaWYgKGluUGl4ZWxzKSB7XG4gICAgICAgICAgICBjb2wgPSBwYXJzZUludChjb2wgLyB0aGlzLnRpbGVXaWR0aCk7XG4gICAgICAgICAgICByb3cgPSBwYXJzZUludChyb3cgLyB0aGlzLnRpbGVIZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbCA+IHRoaXMud2lkdGggLSAxKSBjb2wgPSAwO1xuICAgICAgICBpZiAoY29sIDwgMCkgY29sID0gdGhpcy53aWR0aCAtIDE7XG4gICAgICAgIGlmIChyb3cgPiB0aGlzLmhlaWdodCAtIDEpIHJvdyA9IDA7XG4gICAgICAgIGlmIChyb3cgPCAwKSByb3cgPSB0aGlzLmhlaWdodCAtIDE7XG5cbiAgICAgICAgdmFyIGlkeCA9IChyb3cgKiB0aGlzLndpZHRoKSArIGNvbDtcblxuICAgICAgICByZXR1cm4gdGhpcy50aWxlc1tpZHhdIHx8IG51bGw7XG4gICAgfVxuXG4gICAgZGVzdHJveUl0ZW1zKCkge1xuICAgICAgICB2YXIgaSA9IHRoaXMudGlsZXMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICB2YXIgdCA9IHRoaXMudGlsZXNbaV07XG4gICAgICAgICAgICBpZiAodC5pdGVtKSB0Lml0ZW0uZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZUl0ZW1zKCkge1xuICAgICAgICB2YXIgaSA9IHRoaXMudGlsZXMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICB2YXIgdCA9IHRoaXMudGlsZXNbaV07XG4gICAgICAgICAgICBpZiAodC5pdGVtKSB0Lml0ZW0uaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNYXA7XG4iLCJpbXBvcnQgQW5pbWF0aW9uLCB7IEFOSU1BVElPTl9IT1JJWk9OVEFMIH0gZnJvbSAnLi9lbmdpbmUvQW5pbWF0aW9uJztcbmltcG9ydCBDaGFyYWN0ZXIgZnJvbSAnLi9DaGFyYWN0ZXIuanMnO1xuXG5jb25zdCBhbmltYXRpb25CYXNlID0ge1xuICAgIGltYWdlVVJMIDogJ2ltZy9jaGFyYWN0ZXJzMS5wbmcnLFxuICAgIG51bWJlck9mRnJhbWUgOiAxLFxuICAgIGRlbHRhIDogNjQsXG4gICAgcmVmcmVzaFJhdGUgOiA2MCxcbiAgICBvZmZzZXRZIDogNjAsXG4gICAgdHlwZSA6IEFOSU1BVElPTl9IT1JJWk9OVEFMXG59O1xuXG5jb25zdCBhbmltYXRpb25zID0ge1xuICAgICdyaWdodCcgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgLi4uYW5pbWF0aW9uQmFzZVxuICAgIH0pLFxuXG4gICAgJ2Rvd24nIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgIG9mZnNldFggOiA2NCAqIDRcbiAgICB9KSxcblxuICAgICd1cCcgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgb2Zmc2V0WCA6IDY0ICogOFxuICAgIH0pLFxuXG4gICAgJ2xlZnQnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgIG9mZnNldFggOiA2NCAqIDEyXG4gICAgfSlcbn07XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICAgIGFuaW1hdGlvbnMsXG4gICAgZGlyIDogJ2wnLFxuICAgIGRlZmF1bHRBbmltYXRpb24gOiAnbGVmdCcsXG4gICAgcHJldHVybiA6IHRydWUsXG4gICAgZnJpZ2h0ZW5lZFNwZWVkIDogbnVsbCxcbiAgICBmcmlnaHRlbmVkRG90U3BlZWQgOiBudWxsLFxuICAgIGRvdFNwZWVkIDogbnVsbFxufTtcblxuY2xhc3MgUGFjbWFuIGV4dGVuZHMgQ2hhcmFjdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGRlZmF1bHRzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5IGluIG9wdGlvbnMpIHRoaXNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgYWRkR2FtZUdob3N0RWF0RXZlbnRMaXN0ZW5lcixcbiAgICAgICAgICAgIGFkZEdhbWVHaG9zdE1vZGVGcmlnaHRlbmVkRW50ZXIsXG4gICAgICAgICAgICBhZGRHYW1lR2hvc3RNb2RlRnJpZ2h0ZW5lZEV4aXRcbiAgICAgICAgfSA9IG9wdGlvbnM7XG5cbiAgICAgICAgdGhpcy5fZ2hvc3RGcmlnaHRlbmVkID0gMDtcblxuICAgICAgICAvLyBDaGFuZ2UgdGlsZS4gU2V0IGRpcmVjdGlvbi5cbiAgICAgICAgdGhpcy5vbignaXRlbTp0aWxlJywgKHRpbGUpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9naG9zdEZyaWdodGVuZWQpIHRoaXMuX3NwZWVkID0gdGhpcy5mcmlnaHRlbmVkU3BlZWQ7XG4gICAgICAgICAgICBlbHNlIHRoaXMuX3NwZWVkID0gdGhpcy5zcGVlZDtcblxuICAgICAgICAgICAgaWYgKHRpbGUuaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmICh0aWxlLmhhc1BpbGwoKSkgeyAvLyBQaWxsIVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2l0ZW06ZWF0cGlsbCcsIHRpbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aWxlLmhhc0RvdCgpKSB7IC8vIERvdCFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdpdGVtOmVhdGRvdCcsIHRpbGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZ2hvc3RGcmlnaHRlbmVkKSB0aGlzLl9zcGVlZCA9IHRoaXMuZnJpZ2h0ZW5lZERvdFNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHRoaXMuX3NwZWVkID0gdGhpcy5kb3RTcGVlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGlsZS5pdGVtLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aWxlLml0ZW0gPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFkZEdhbWVHaG9zdEVhdEV2ZW50TGlzdGVuZXIoZ2hvc3QgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZWF0ZW5UdXJucyA9IDk7XG4gICAgICAgICAgICB0aGlzLmRpciA9ICdyJztcbiAgICAgICAgICAgIHRoaXMucGF1c2VBbmltYXRpb24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYWRkR2FtZUdob3N0TW9kZUZyaWdodGVuZWRFbnRlcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9naG9zdEZyaWdodGVuZWQrKztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYWRkR2FtZUdob3N0TW9kZUZyaWdodGVuZWRFeGl0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2dob3N0RnJpZ2h0ZW5lZC0tO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgQ2hhcmFjdGVyLnByb3RvdHlwZS5yZXNldC5hcHBseSh0aGlzKTtcbiAgICAgICAgdGhpcy5fbGFzdEVhdGVuVHVybnNUaW1lID0gbnVsbDtcbiAgICB9XG5cbiAgICBtb3ZlKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2VhdGVuVHVybnMpIENoYXJhY3Rlci5wcm90b3R5cGUubW92ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBlbHNlIGlmICghdGhpcy5fZWF0ZW5UdXJuc0ZyYW1lcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2VhdGVuVHVybnMgPT09IDkpIHRoaXMuZW1pdCgnaXRlbTpkaWUnKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9lYXRlblR1cm5zID4gMikge1xuICAgICAgICAgICAgICAgIHZhciBkaXJlY3Rpb25zID0geydkJyA6ICdsJywgJ2wnIDogJ3UnLCAndScgOiAncicsICdyJyA6ICdkJ307XG4gICAgICAgICAgICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb25zW3RoaXMuZGlyXTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE5leHRBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VhdGVuVHVybnNGcmFtZXMgPSA1O1xuICAgICAgICAgICAgfSBlbHNlIHRoaXMuX2VhdGVuVHVybnNGcmFtZXMgPSAyNTtcblxuICAgICAgICAgICAgdGhpcy5fZWF0ZW5UdXJucy0tO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fZWF0ZW5UdXJucyA9PT0gMCkgdGhpcy5lbWl0KCdpdGVtOmxpZmUnKTtcblxuICAgICAgICB9IGVsc2UgdGhpcy5fZWF0ZW5UdXJuc0ZyYW1lcy0tO1xuICAgIH1cblxufTtcblxuT2JqZWN0LmFzc2lnbihQYWNtYW4ucHJvdG90eXBlLCBkZWZhdWx0cyk7XG5cbmV4cG9ydCBkZWZhdWx0IFBhY21hbjtcbiIsImltcG9ydCBTb3VuZCBmcm9tICcuL2VuZ2luZS9Tb3VuZCc7XG5cbmNsYXNzIFNvdW5kTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLnNvdW5kRW5hYmxlZCA9ICEhb3B0aW9ucy5zb3VuZEVuYWJsZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMuc291bmRFbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kcyA9IHtcbiAgICAgICAgICAgICAgICBpbnRybyA6IG5ldyBTb3VuZCgnYXVkaW8vaW50cm8ubXAzJyksXG4gICAgICAgICAgICAgICAgYmFjayA6IG5ldyBTb3VuZCgnYXVkaW8vYmFjay5tcDMnKSxcbiAgICAgICAgICAgICAgICBkb3QgOiBuZXcgU291bmQoJ2F1ZGlvL2RvdC5tcDMnKSxcbiAgICAgICAgICAgICAgICBlYXRlbiA6IG5ldyBTb3VuZCgnYXVkaW8vZWF0ZW4ubXAzJyksXG4gICAgICAgICAgICAgICAgZWF0IDogbmV3IFNvdW5kKCdhdWRpby9lYXQubXAzJyksXG4gICAgICAgICAgICAgICAgZnJpZ2h0ZW5lZCA6IG5ldyBTb3VuZCgnYXVkaW8vZnJpZ2h0ZW5lZC5tcDMnKSxcbiAgICAgICAgICAgICAgICBkZWFkIDogbmV3IFNvdW5kKCdhdWRpby9kZWFkLm1wMycpLFxuICAgICAgICAgICAgICAgIGJvbnVzIDogbmV3IFNvdW5kKCdhdWRpby9ib251cy5tcDMnKSxcbiAgICAgICAgICAgICAgICBsaWZlIDogbmV3IFNvdW5kKCdhdWRpby9saWZlLm1wMycpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnNvdW5kcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuYWRkU291bmQodGhpcy5zb3VuZHNba2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBsYXkobGFiZWwpIHtcbiAgICAgICAgaWYgKHRoaXMuc291bmRFbmFibGVkKSB0aGlzLnNvdW5kc1tsYWJlbF0ucGxheSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU291bmRNYW5hZ2VyO1xuIiwiY2xhc3MgVGlsZSB7XG4gICAgY29uc3RydWN0b3IoY29kZSwgY29sLCByb3csIG1hcCkgIHtcbiAgICAgICAgdGhpcy5jb2RlID0gY29kZTtcblxuICAgICAgICB0aGlzLmNvbCA9IGNvbDtcbiAgICAgICAgdGhpcy5yb3cgPSByb3c7XG5cbiAgICAgICAgdGhpcy5tYXAgPSBtYXA7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IDMyO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDMyO1xuXG4gICAgICAgIHRoaXMueCA9IHRoaXMuY29sICogdGhpcy53aWR0aCArIHRoaXMud2lkdGggLyAyO1xuXG4gICAgICAgIHRoaXMueSA9IHRoaXMucm93ICogdGhpcy5oZWlnaHQgKyB0aGlzLmhlaWdodCAvIDIgKyA0OyAvLyBPcmlnaW5hbCBQYWNtYW4gaGFzIHRpbGUncyBjZW50ZXIgYXQgeCA6IDQsIHkgOiA1IHBvc2l0aW9uLlxuICAgIH1cblxuICAgIGlzV2FsbCgpIHsgcmV0dXJuIHRoaXMuY29kZSA9PT0gJz0nOyB9XG5cbiAgICBpc0hvdXNlKCkgeyByZXR1cm4gdGhpcy5jb2RlID09PSAnaCc7IH1cblxuICAgIGlzVHVubmVsKCkgeyByZXR1cm4gdGhpcy5jb2RlID09PSAndCc7IH1cblxuICAgIGhhc0RvdCgpIHsgcmV0dXJuIHRoaXMuaXRlbSAmJiB0aGlzLmNvZGUgPT09ICcuJzsgfVxuXG4gICAgaGFzUGlsbCgpIHsgcmV0dXJuIHRoaXMuaXRlbSAmJiB0aGlzLmNvZGUgPT09ICcqJzsgfVxuXG4gICAgZ2V0KGRpcikge1xuICAgICAgICBpZiAoZGlyID09PSAndScpIHJldHVybiB0aGlzLmdldFUoKTtcbiAgICAgICAgaWYgKGRpciA9PT0gJ2QnKSByZXR1cm4gdGhpcy5nZXREKCk7XG4gICAgICAgIGlmIChkaXIgPT09ICdsJykgcmV0dXJuIHRoaXMuZ2V0TCgpO1xuICAgICAgICBpZiAoZGlyID09PSAncicpIHJldHVybiB0aGlzLmdldFIoKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZ2V0VSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmdldFRpbGUodGhpcy5jb2wsIHRoaXMucm93IC0gMSkgfHwgbnVsbDtcbiAgICB9XG5cbiAgICBnZXREKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXAuZ2V0VGlsZSh0aGlzLmNvbCwgdGhpcy5yb3cgKyAxKSB8fCBudWxsO1xuICAgIH1cblxuICAgIGdldEwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5nZXRUaWxlKHRoaXMuY29sIC0gMSwgdGhpcy5yb3cpIHx8IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0UigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmdldFRpbGUodGhpcy5jb2wgKyAxLCB0aGlzLnJvdykgfHwgbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRpbGU7XG4iLCJleHBvcnQgY29uc3QgQU5JTUFUSU9OX1ZFUlRJQ0FMID0gMTsgLy8gR2VuZXJhdGVkIGJ5IGEgdmVydGljYWwgb2Zmc2V0IG9mIHRoZSBiYWNrZ3JvdW5kXG5leHBvcnQgY29uc3QgQU5JTUFUSU9OX0hPUklaT05UQUwgPSAyOyAvLyBHZW5lcmF0ZWQgYnkgYSBob3Jpem9udGFsIG9mZnNldCBvZiB0aGUgYmFja2dyb3VuZFxuZXhwb3J0IGNvbnN0IEFOSU1BVElPTl9PTkNFID0gNDsgLy8gUGxheWVkIG9ubHkgb25jZSAoZWxzZSBsb29waW5nIGluZGVmaW5pdGVseSlcbmV4cG9ydCBjb25zdCBBTklNQVRJT05fQ0FMTEJBQ0sgPSA4OyAvLyBBIGNhbGxiYWNrIGlzIGV4ZWN0dWVkIGF0IHRoZSBlbmQgb2YgYSBjeWNsZVxuZXhwb3J0IGNvbnN0IEFOSU1BVElPTl9QSU5HUE9ORyA9IDMyOyAvLyBBdCB0aGUgbGFzdCBmcmFtZSBvZiB0aGUgYW5pbWF0aW9uIGl0IHJldmVyc2VzIChpZiB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggT05DRSBpdCB3aWxsIGhhdmUgbm8gZWZmZWN0KVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgICAvLyBUaGUgdXJsIG9mIHRoZSBpbWFnZSB0byBiZSB1c2VkIGFzIGFuIGFuaW1hdGlvbiBvciBzcHJpdGVcbiAgICBpbWFnZVVSTCA6IG51bGwsXG4gICAgLy8gVGhlIG51bWJlciBvZiBmcmFtZXMgdG8gYmUgZGlzcGxheWVkIHdoZW4gcGxheWluZyB0aGUgYW5pbWF0aW9uXG4gICAgbnVtYmVyT2ZGcmFtZSA6IDEsXG4gICAgLy8gVGhlIGRpc3RhbmNlIGluIHBpeGVscyBiZXR3ZWVuIHR3byBmcmFtZXNcbiAgICBkZWx0YSA6IDAsXG4gICAgLy8gVGhlIHJhdGUgYXQgd2hpY2ggdGhlIGZyYW1lcyBjaGFuZ2UgaW4gbWlsaXNlY29uZHNcbiAgICByZWZyZXNoUmF0ZSA6IDMwLFxuICAgIC8vIFRoZSB0eXBlIG9mIHRoZSBhbmltYXRpb24uVGhpcyBpcyBhIGJpdHdpc2UgT1Igb2YgdGhlIHByb3BlcnRpZXMuXG4gICAgdHlwZSA6IDAsXG4gICAgLy8gVGhlIHggY29vcmRpbmF0ZSB3aGVyZSB0aGUgZmlyc3Qgc3ByaXRlIGJlZ2luc1xuICAgIG9mZnNldFggOiAwLFxuICAgIC8vIFRoZSB5IGNvb3JkaW5hdGUgd2hlcmUgdGhlIGZpcnN0IHNwcml0ZSBiZWdpbnNcbiAgICBvZmZzZXRZIDogMFxufTtcblxuY2xhc3MgQW5pbWF0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGRlZmF1bHRzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gb3B0aW9ucykgdGhpc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkKCkge1xuICAgICAgICB0aGlzLmltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmltZy5zcmMgPSB0aGlzLmltYWdlVVJMO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgcmVzb2x2ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlzUmVhZHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmltZy5jb21wbGV0ZTtcbiAgICB9XG59XG5cbk9iamVjdC5hc3NpZ24oQW5pbWF0aW9uLnByb3RvdHlwZSwgZGVmYXVsdHMpO1xuXG5leHBvcnQgZGVmYXVsdCBBbmltYXRpb247XG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAncmFzdGknO1xuXG5pbXBvcnQgS2V5Ym9hcmQgZnJvbSAnLi9LZXlib2FyZCc7XG5pbXBvcnQgVG91Y2ggZnJvbSAnLi9Ub3VjaCc7XG5pbXBvcnQgU2NhbGluZyBmcm9tICcuL1NjYWxpbmcnO1xuXG4vLyBHYW1lIHN0YXRlc1xuZXhwb3J0IGNvbnN0IFNUQVRFX05FVyA9IDA7XG5leHBvcnQgY29uc3QgU1RBVEVfUlVOTklORyA9IDE7XG5leHBvcnQgY29uc3QgU1RBVEVfUEFVU0VEID0gMjtcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgaGVpZ2h0IDogMzIwLFxuICAgIHdpZHRoIDogNDgwLFxuICAgIG9yaWdpbmFsSGVpZ2h0IDogMzIwLFxuICAgIG9yaWdpbmFsV2lkdGggOiA0ODAsXG4gICAgcmVmcmVzaFJhdGUgOiAzMCxcbiAgICBwb3NpdGlvbiA6ICdhYnNvbHV0ZSdcbn07XG5cbmNsYXNzIEdhbWUgZXh0ZW5kcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGRlZmF1bHRzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gb3B0aW9ucykgdGhpc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNwcml0ZXMgPSB0aGlzLmNoaWxkcmVuOyAvLyBMaXN0IG9mIHNwcml0ZXMgd2l0aCBhbmltYXRpb25zIC8gaW1hZ2VzIHVzZWQgaW4gdGhlIGdhbWVcbiAgICAgICAgdGhpcy5zb3VuZHMgPSBbXTsgLy8gTGlzdCBvZiBzb3VuZHMgdXNlZCBpbiB0aGUgZ2FtZVxuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdOyAvLyBMaXN0IG9mIHRoZSBmdW5jdGlvbnMgY2FsbGVkIGF0IGVhY2ggcmVmcmVzaFxuICAgICAgICB0aGlzLmxvYWRlZFNwcml0ZXNJbmRleCA9IDA7IC8vIEtlZXAgdHJhY2sgb2YgdGhlIGxhc3QgbG9hZGVkIGFuaW1hdGlvblxuICAgICAgICB0aGlzLmxvYWRlZFNvdW5kc0luZGV4ID0gMDsgLy8gS2VlcCB0cmFjayBvZiB0aGUgbGFzdCBsb2FkZWQgc291bmRcblxuICAgICAgICB0aGlzLmtleWJvYXJkID0gbmV3IEtleWJvYXJkKCk7XG4gICAgICAgIHRoaXMudG91Y2ggPSBuZXcgVG91Y2goKTtcblxuICAgICAgICB0aGlzLnNjYWxpbmcgPSBuZXcgU2NhbGluZyh0aGlzLm9yaWdpbmFsV2lkdGgsIHRoaXMub3JpZ2luYWxIZWlnaHQpO1xuICAgICAgICB0aGlzLnNjYWxpbmcucmVzaXplKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblxuICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfTkVXO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgc3VwZXIucmVuZGVyKCk7XG5cbiAgICAgICAgLy8gV2UgaW5pdGlhbGl6ZSB0aGUgZGlzcGxheSBvZiB0aGUgZGl2XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5lbC5zdHlsZSwge1xuICAgICAgICAgICAgcG9zaXRpb24gOiB0aGlzLnBvc2l0aW9uLFxuICAgICAgICAgICAgZGlzcGxheSA6ICdibG9jaycsXG4gICAgICAgICAgICBvdmVyZmxvdyA6ICdoaWRkZW4nLFxuICAgICAgICAgICAgaGVpZ2h0IDogYCR7dGhpcy5zY2FsaW5nLmhlaWdodH1weGAsXG4gICAgICAgICAgICB3aWR0aCA6IGAke3RoaXMuc2NhbGluZy53aWR0aH1weGAsXG4gICAgICAgICAgICBmb250U2l6ZSA6IGAke3RoaXMuc2NhbGluZy5nZXRGYWN0b3IoKSAqIDJ9ZW1gXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2NlbmVncmFwaCA9IHRoaXMuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAgICAgc3R5bGUgOiAndmlzaWJpbGl0eTogaGlkZGVuOydcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLnNjZW5lZ3JhcGgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5rZXlib2FyZC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMudG91Y2guZGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgcmVzb3VyY2VzIGJlZm9yZSBzdGFydGluZyB0aGUgZ2FtZS5cbiAgICAgKi9cbiAgICBwcmVsb2FkKCkge1xuICAgICAgICAvLyBTdGFydCBsb2FkaW5nIHRoZSBpbWFnZXNcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc3ByaXRlcy5sZW5ndGggLSAxOyBpID49IHRoaXMubG9hZGVkU3ByaXRlc0luZGV4OyBpLS0pIHtcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlc1tpXS5sb2FkKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdGFydCBsb2FkaW5nIHRoZSBzb3VuZHNcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc291bmRzLmxlbmd0aCAtIDEgOyBpID49IHRoaXMubG9hZGVkU291bmRzSW5kZXg7IGktLSl7XG4gICAgICAgICAgICB0aGlzLnNvdW5kc1tpXS5sb2FkKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndhaXRGb3JSZXNvdXJjZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXYWl0IGZvciBhbGwgdGhlIHJlc291cmNlcyBjYWxsZWQgZm9yIGluIHByZWxvYWQoKSB0byBmaW5pc2ggbG9hZGluZy5cbiAgICAgKi9cbiAgICB3YWl0Rm9yUmVzb3VyY2VzKCkge1xuICAgICAgICAvLyBDaGVjayB0aGUgaW1hZ2VzXG4gICAgICAgIGxldCBzcHJpdGVDb3VudCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmxvYWRlZFNwcml0ZXNJbmRleDsgaSA8IHRoaXMuc3ByaXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3ByaXRlc1tpXS5pc1JlYWR5KCkpIHtcbiAgICAgICAgICAgICAgICBzcHJpdGVDb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIENoZWNrIHRoZSBzb3VuZHNcbiAgICAgICAgbGV0IHNvdW5kQ291bnQgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5sb2FkZWRTb3VuZHNJbmRleDsgaSA8IHRoaXMuc291bmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zb3VuZHNbaV0uaXNSZWFkeSgpKSB7XG4gICAgICAgICAgICAgICAgc291bmRDb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdCA9IHRoaXMuc3ByaXRlcy5sZW5ndGggKyB0aGlzLnNvdW5kcy5sZW5ndGggLSB0aGlzLmxvYWRlZFNwcml0ZXNJbmRleCAtIHRoaXMubG9hZGVkU291bmRzSW5kZXg7XG5cbiAgICAgICAgLy8gQ2FsbCB0aGUgbG9hZCBjYWxsYmFjayB3aXRoIHRoZSBjdXJyZW50IHByb2dyZXNzXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vbkxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgbGV0IHBlcmNlbnQgPSAoc3ByaXRlQ291bnQgKyBzb3VuZENvdW50KSAvIHJlc3QgKiAxMDA7XG4gICAgICAgICAgICB0aGlzLm9uTG9hZFByb2dyZXNzKHBlcmNlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNwcml0ZUNvdW50ICsgc291bmRDb3VudCA8IHJlc3QpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy53YWl0Rm9yUmVzb3VyY2VzLmJpbmQodGhpcyksIDEwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRlZFNwcml0ZXNJbmRleCA9IHRoaXMuc3ByaXRlcy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLmxvYWRlZFNvdW5kc0luZGV4ID0gdGhpcy5zb3VuZHMubGVuZ3RoO1xuXG4gICAgICAgICAgICAvLyBMYXVuY2ggdGhlIHJlZnJlc2ggbG9vcFxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IFNUQVRFX05FVyl7XG4gICAgICAgICAgICAgICAgc2V0SW50ZXJ2YWwodGhpcy5yZWZyZXNoLmJpbmQodGhpcyksIHRoaXMucmVmcmVzaFJhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUlVOTklORztcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9vblJlYWR5Q2FsbGJhY2sgPT09ICdmdW5jdGlvbicpe1xuICAgICAgICAgICAgICAgIHRoaXMuX29uUmVhZHlDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIHRoaXMuX29uUmVhZHlDYWxsYmFjayA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBNYWtlIHRoZSBzY2VuZWdyYXBoIHZpc2libGVcbiAgICAgICAgICAgIHRoaXMuc2NlbmVncmFwaC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIHNwcml0ZS5cbiAgICAgKi9cbiAgICBhZGRTcHJpdGUoc3ByaXRlKSB7XG4gICAgICAgIHRoaXMuc2NlbmVncmFwaC5hcHBlbmRDaGlsZCh0aGlzLmFkZENoaWxkKHNwcml0ZSkuZWwpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBTVEFURV9SVU5OSU5HID9cbiAgICAgICAgICAgIHNwcml0ZS5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZWRTcHJpdGVzSW5kZXgrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICB9KSA6XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEgc291bmQuXG4gICAgICovXG4gICAgYWRkU291bmQoc291bmQpIHtcbiAgICAgICAgdGhpcy5zb3VuZHMucHVzaChzb3VuZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBTVEFURV9SVU5OSU5HID9cbiAgICAgICAgICAgIHNvdW5kLmxvYWQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZFNvdW5kc0luZGV4Kys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSkgOlxuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGEgY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiB0aGUgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IHJhdGUgdGhlIHJhdGUgaW4gbXMgYXQgd2hpY2ggdGhlIGNhbGxiYWNrIHNob3VsZCBiZSBjYWxsZWQgKHNob3VsZCBiZSBhIG11bHRpcGxlIG9mIHRoZSBwbGF5Z3JvdW5kIHJhdGUgb3Igd2lsbCBiZSByb3VuZGVkKVxuICAgICAqL1xuICAgIGFkZENhbGxiYWNrKGNhbGxiYWNrLCByZWZyZXNoUmF0ZSA9IHRoaXMucmVmcmVzaFJhdGUpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaCh7IGZuIDogY2FsbGJhY2ssIHJlZnJlc2hSYXRlIDogdGhpcy5ub3JtYWxpemVSZWZyYXNoUmF0ZShyZWZyZXNoUmF0ZSksIGlkbGVDb3VudGVyIDogMCB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHBlcmlvZGljYWxseSB0byByZWZyZXNoIHRoZSBzdGF0ZSBvZiB0aGUgZ2FtZS5cbiAgICAgKi9cbiAgICByZWZyZXNoKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gU1RBVEVfUlVOTklORykge1xuICAgICAgICAgICAgdGhpcy5zcHJpdGVzLmZvckVhY2goc3ByaXRlID0+IHsgc3ByaXRlLnJlZnJlc2goKSB9KTtcblxuICAgICAgICAgICAgdmFyIGRlYWRDYWxsYmFja3MgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmNhbGxiYWNrcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhbGxiYWNrc1tpXS5pZGxlQ291bnRlciA9PT0gdGhpcy5jYWxsYmFja3NbaV0ucmVmcmVzaFJhdGUgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5jYWxsYmFja3NbaV0uZm4oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIGhhdmUgYSBib29sZWFuOiAndHJ1ZScgbWVhbnMgJ25vIG1vcmUgZXhlY3V0aW9uJywgJ2ZhbHNlJyBtZWFucyAna2VlcCBvbiBleGVjdXRpbmcnXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWFkQ2FsbGJhY2tzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIG51bWJlciBpdCByZS1kZWZpbmVzIHRoZSB0aW1lIHRvIHRoZSBuZXh0IGNhbGxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzW2ldLnJlZnJlc2hSYXRlID0gdGhpcy5ub3JtYWxpemVSZWZyYXNoUmF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrc1tpXS5pZGxlQ291bnRlciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3NbaV0uaWRsZUNvdW50ZXIgPSAodGhpcy5jYWxsYmFja3NbaV0uaWRsZUNvdW50ZXIgKyAxKSAlIHRoaXMuY2FsbGJhY2tzW2ldLnJlZnJlc2hSYXRlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gZGVhZENhbGxiYWNrcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3Muc3BsaWNlKGRlYWRDYWxsYmFja3NbaV0sIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFyIHRoZSBhbmltYXRpb25zIGFuZCBzb3VuZHMuXG4gICAgICovXG4gICAgY2xlYXIoY2xlYXJDYWxsYmFja3MpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95Q2hpbGRyZW4oKTtcbiAgICAgICAgdGhpcy5sb2FkZWRTcHJpdGVzSW5kZXggPSAwO1xuICAgICAgICB0aGlzLnNvdW5kcyA9IFtdO1xuICAgICAgICB0aGlzLmxvYWRlZFNvdW5kc0luZGV4ID0gMDtcbiAgICAgICAgaWYgKGNsZWFyQ2FsbGJhY2tzKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2NlbmVncmFwaC5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gICAgLyoqXG4gICAgKiBNdXRlIChvciB1bm11dGUpIGFsbCB0aGUgc291bmRzLlxuICAgICovXG4gICAgbXV0ZVNvdW5kKG11dGVkKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnNvdW5kcy5sZW5ndGggLSAxIDsgaSA+PSAwOyBpIC0tKSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kc1tpXS5tdXRlKG11dGVkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIFN0YXJ0cyB0aGUgZ2FtZS5cbiAgICAqL1xuICAgIHN0YXJ0KGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHRoaXMuX29uUmVhZHlDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLnByZWxvYWQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVE9ET1xuICAgICAqL1xuICAgIHBhdXNlKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUEFVU0VEO1xuICAgICAgICB0aGlzLnNjZW5lZ3JhcGguc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXN1bWUgdGhlIGdhbWUgaWYgaXQgd2FzIHBhdXNlZCBhbmQgY2FsbCB0aGUgY2FsbGJhY2sgcGFzc2VkIGluIGFyZ3VtZW50IG9uY2UgdGhlIG5ld2x5IGFkZGVkIHJlc3NvdXJjZXMgYXJlIGxvYWRlZC5cbiAgICAgKi9cbiAgICByZXN1bWUoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IFNUQVRFX1BBVVNFRCl7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB0aGlzLl9vblJlYWR5Q2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbm9ybWFsaXplUmVmcmFzaFJhdGUocmF0ZSkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChyYXRlIC8gdGhpcy5yZWZyZXNoUmF0ZSkgfHwgMTtcbiAgICB9XG59XG5cbk9iamVjdC5hc3NpZ24oR2FtZS5wcm90b3R5cGUsIGRlZmF1bHRzKTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tICdyYXN0aSc7XG5cbmV4cG9ydCBjb25zdCBLRVlfVVAgPSAzODtcbmV4cG9ydCBjb25zdCBLRVlfUklHSFQgPSAzOTtcbmV4cG9ydCBjb25zdCBLRVlfRE9XTiA9IDQwO1xuZXhwb3J0IGNvbnN0IEtFWV9MRUZUID0gMzc7XG5cbmV4cG9ydCBjb25zdCBFVkVOVF9LRVlfVVAgPSAna2V5dXAnO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0tFWV9ET1dOID0gJ2tleWRvd24nO1xuXG5jbGFzcyBLZXlib2FyZCBleHRlbmRzIFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgZWwgOiBkb2N1bWVudCAmJiBkb2N1bWVudC5ib2R5LFxuICAgICAgICAgICAgLi4ub3B0aW9uc1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmtleXMgPSB7fTtcbiAgICB9XG5cbiAgICBvbktleVVwKGV2ZW50KSB7XG4gICAgICAgIHRoaXMua2V5c1tldmVudC5rZXlDb2RlXSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVtaXQoRVZFTlRfS0VZX1VQLCBldmVudCk7XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHRoaXMua2V5c1tldmVudC5rZXlDb2RlXSA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1pdChFVkVOVF9LRVlfRE9XTiwgZXZlbnQpO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmtleXMgPSB7fTtcbiAgICB9XG59XG5cbktleWJvYXJkLnByb3RvdHlwZS5ldmVudHMgPSB7XG4gICAga2V5dXAgOiAnb25LZXlVcCcsXG4gICAga2V5ZG93biA6ICdvbktleURvd24nXG59O1xuXG5leHBvcnQgZGVmYXVsdCBLZXlib2FyZDtcbiIsImltcG9ydCB7IE1vZGVsIH0gZnJvbSAncmFzdGknO1xuXG5jbGFzcyBNb2RlbExvY2FsU3RvcmFnZSBleHRlbmRzIE1vZGVsIHtcbiAgICBjb25zdHJ1Y3RvcihhdHRycykge1xuICAgICAgICBzdXBlcihhdHRycyk7XG4gICAgfVxuXG4gICAgZmV0Y2goKSB7XG4gICAgICAgIGlmICh0aGlzLnVybCAmJiB3aW5kb3cubG9jYWxTdG9yYWdlKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMudXJsKTtcbiAgICAgICAgICAgIGlmIChpdGVtKSB0aGlzLnNldChKU09OLnBhcnNlKGl0ZW0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLnVybCAmJiB3aW5kb3cubG9jYWxTdG9yYWdlKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy51cmwsIEpTT04uc3RyaW5naWZ5KHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kZWxMb2NhbFN0b3JhZ2U7XG4iLCJcbmNsYXNzIFNjYWxpbmcge1xuICAgIGNvbnN0cnVjdG9yKHcsIGgpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFdpZHRoID0gdGhpcy53aWR0aCA9IHc7XG4gICAgICAgIHRoaXMub3JpZ2luYWxIZWlnaHQgPSB0aGlzLmhlaWdodCA9IGg7XG5cbiAgICAgICAgdGhpcy53aWR0aFRvSGVpZ2h0ID0gdyAvIGg7XG4gICAgfVxuXG4gICAgcmVzaXplKG5ld1dpZHRoLCBuZXdIZWlnaHQpIHtcbiAgICAgICAgY29uc3QgbmV3V2lkdGhUb0hlaWdodCA9IG5ld1dpZHRoIC8gbmV3SGVpZ2h0O1xuXG4gICAgICAgIGlmIChuZXdXaWR0aFRvSGVpZ2h0ID4gdGhpcy53aWR0aFRvSGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gbmV3SGVpZ2h0ICogdGhpcy53aWR0aFRvSGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBuZXdIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IG5ld1dpZHRoIC8gdGhpcy53aWR0aFRvSGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IG5ld1dpZHRoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RmFjdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aWR0aCAvIHRoaXMub3JpZ2luYWxXaWR0aDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjYWxpbmc7XG4iLCIvLyBTaW5nbGUgQXVkaW9Db250ZXh0IGZvciBhbGwgc291bmRzLlxubGV0IGF1ZGlvQ3R4O1xubGV0IGdhaW5Ob2RlO1xuXG4vLyBQb2x5ZmlsbCBkZWNvZGVBdWRpb0RhdGEgUHJvbWlzZS1iYXNlZCBzeW50YXggb24gc2FmYXJpLlxuY29uc3QgZGVjb2RlQXVkaW9EYXRhID0gKGFycmF5QnVmZmVyKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgYXVkaW9DdHguZGVjb2RlQXVkaW9EYXRhKGFycmF5QnVmZmVyLCByZXNvbHZlLCByZWplY3QpO1xufSk7XG5cbmNsYXNzIFNvdW5kIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwpIHtcbiAgICAgICAgaWYgKCFhdWRpb0N0eCkge1xuICAgICAgICAgICAgY29uc3QgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuICAgICAgICAgICAgYXVkaW9DdHggPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gICAgICAgICAgICBnYWluTm9kZSA9IGF1ZGlvQ3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgICAgIGdhaW5Ob2RlLmNvbm5lY3QoYXVkaW9DdHguZGVzdGluYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgfVxuXG4gICAgbG9hZCgpIHtcbiAgICAgICAgZmV0Y2godGhpcy51cmwpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4gZGVjb2RlQXVkaW9EYXRhKGFycmF5QnVmZmVyKSlcbiAgICAgICAgICAgIC50aGVuKGF1ZGlvQnVmZmVyID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvQnVmZmVyID0gYXVkaW9CdWZmZXJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGF1ZGlvQnVmZmVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBsYXkoKSB7XG4gICAgICAgIGlmIChhdWRpb0N0eC5zdGF0ZSA9PT0gJ3N1c3BlbmRlZCcpIHtcbiAgICAgICAgICAgIGF1ZGlvQ3R4LnJlc3VtZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHJhY2tTb3VyY2UgPSBhdWRpb0N0eC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgICAgdHJhY2tTb3VyY2UuYnVmZmVyID0gdGhpcy5hdWRpb0J1ZmZlcjtcbiAgICAgICAgdHJhY2tTb3VyY2UuY29ubmVjdChnYWluTm9kZSk7XG4gICAgICAgIHRyYWNrU291cmNlLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgbXV0ZShtdXRlZCkge1xuICAgICAgICAvLyBNdXRlZCBteSBkZWZhdWx0IHVubGVzcyBtdXRlZCA9PT0gZmFsc2UuXG4gICAgICAgIHRoaXMubXV0ZWQgPSBtdXRlZCAhPT0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMubXV0ZWQpIHtcbiAgICAgICAgICAgIGdhaW5Ob2RlLmdhaW4uc2V0VmFsdWVBdFRpbWUoMCwgYXVkaW9DdHguY3VycmVudFRpbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2Fpbk5vZGUuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgxLCBhdWRpb0N0eC5jdXJyZW50VGltZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1JlYWR5KCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLmF1ZGlvQnVmZmVyO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU291bmQ7XG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAncmFzdGknO1xuXG5pbXBvcnQge1xuICAgIEFOSU1BVElPTl9IT1JJWk9OVEFMLFxuICAgIEFOSU1BVElPTl9WRVJUSUNBTCxcbiAgICBBTklNQVRJT05fT05DRSxcbiAgICBBTklNQVRJT05fQ0FMTEJBQ0ssXG4gICAgQU5JTUFUSU9OX1BJTkdQT05HXG59IGZyb20gJy4vQW5pbWF0aW9uJztcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgd2lkdGggOiAzMixcbiAgICBoZWlnaHQgOiAzMixcbiAgICB4IDogMCxcbiAgICB5IDogMCxcbiAgICB6IDogMCxcbiAgICBvZmZzZXRYIDogMCxcbiAgICBvZmZzZXRZIDogMCxcbiAgICBpZGxlQ291bnRlciA6IDAsXG4gICAgY3VycmVudEZyYW1lIDogMCxcbiAgICBmcmFtZUluY3JlbWVudCA6IDEsXG4gICAgYW5nbGUgOiAwLFxuICAgIGZhY3RvciA6ICAxLFxuICAgIHBsYXlpbmcgOiB0cnVlLFxuICAgIGZhY3RvckggOiAxLFxuICAgIGZhY3RvclYgOiAxLFxuICAgIGFuaW1hdGlvbnMgOiB7fSxcbiAgICBkZWZhdWx0QW5pbWF0aW9uIDogJ2RlZmF1bHQnLFxuICAgIG5vcm1hbGl6ZVJlZnJhc2hSYXRlIDogbnVsbCxcbiAgICB0eXBlIDogbnVsbFxufTtcblxuY2xhc3MgU3ByaXRlIGV4dGVuZHMgVmlldyB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhkZWZhdWx0cykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5IGluIG9wdGlvbnMpIHRoaXNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZCgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5hbmltYXRpb25zKVxuICAgICAgICAgICAgICAgIC5tYXAobGFiZWwgPT4gdGhpcy5hbmltYXRpb25zW2xhYmVsXS5sb2FkKCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgaXNSZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuYW5pbWF0aW9ucylcbiAgICAgICAgICAgIC5zb21lKGxhYmVsID0+ICEhdGhpcy5hbmltYXRpb25zW2xhYmVsXS5pc1JlYWR5KCkpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmVsLnN0eWxlLCB7XG4gICAgICAgICAgICBwb3NpdGlvbiA6ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBvdmVyZmxvdyA6ICdoaWRkZW4nLFxuICAgICAgICAgICAgaGVpZ2h0IDogYCR7dGhpcy5oZWlnaHR9cHhgLFxuICAgICAgICAgICAgd2lkdGggOiBgJHt0aGlzLndpZHRofXB4YCxcbiAgICAgICAgICAgIHpJbmRleCA6IHRoaXMuelxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNldEFuaW1hdGlvbih0aGlzLmFuaW1hdGlvbnNbdGhpcy5kZWZhdWx0QW5pbWF0aW9uXSk7XG5cbiAgICAgICAgdGhpcy50cmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICByZWZyZXNoKCkge1xuICAgICAgICBpZiAoIXRoaXMuYW5pbWF0aW9uKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCh0aGlzLmlkbGVDb3VudGVyID09PSB0aGlzLm5vcm1hbGl6ZVJlZnJhc2hSYXRlKHRoaXMuYW5pbWF0aW9uLnJlZnJlc2hSYXRlKSAtIDEpICYmIHRoaXMucGxheWluZykge1xuICAgICAgICAgICAgLy8gRG9lcyAndGhpcycgbG9vcHM/XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24udHlwZSAmIEFOSU1BVElPTl9PTkNFKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudEZyYW1lIDwgdGhpcy5hbmltYXRpb24ubnVtYmVyT2ZGcmFtZSAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RnJhbWUgKz0gdGhpcy5mcmFtZUluY3JlbWVudDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudEZyYW1lID09IHRoaXMuYW5pbWF0aW9uLm51bWJlck9mRnJhbWUgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIERvZXMgJ3RoaXMnIGhhcyBhIGNhbGxiYWNrID9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLnR5cGUgJiBBTklNQVRJT05fQ0FMTEJBQ0spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLnR5cGUgJiBBTklNQVRJT05fUElOR1BPTkcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudEZyYW1lID09PSB0aGlzLmFuaW1hdGlvbi5udW1iZXJPZkZyYW1lIC0gMSAmJiB0aGlzLmZyYW1lSW5jcmVtZW50ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZyYW1lSW5jcmVtZW50ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50RnJhbWUgPT09IDAgJiYgdGhpcy5mcmFtZUluY3JlbWVudCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVJbmNyZW1lbnQgPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RnJhbWUgPSAodGhpcy5jdXJyZW50RnJhbWUgKyB0aGlzLmZyYW1lSW5jcmVtZW50KSAlIHRoaXMuYW5pbWF0aW9uLm51bWJlck9mRnJhbWU7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50RnJhbWUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9lcyAndGhpcycgaGFzIGEgY2FsbGJhY2sgP1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmFuaW1hdGlvbi50eXBlICYgQU5JTUFUSU9OX0NBTExCQUNLKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBiYWNrZ3JvdW5kXG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24ubnVtYmVyT2ZGcmFtZSA+IDEpIHtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IDAsIHkgPSAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uLnR5cGUgJiBBTklNQVRJT05fVkVSVElDQUwpIHtcbiAgICAgICAgICAgICAgICAgICAgeCA9IC10aGlzLmFuaW1hdGlvbi5vZmZzZXRYO1xuICAgICAgICAgICAgICAgICAgICB5ID0gLXRoaXMuYW5pbWF0aW9uLm9mZnNldFkgLSB0aGlzLmFuaW1hdGlvbi5kZWx0YSAqIHRoaXMuY3VycmVudEZyYW1lO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hbmltYXRpb24udHlwZSAmIEFOSU1BVElPTl9IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICAgICAgICAgIHggPSAtdGhpcy5hbmltYXRpb24ub2Zmc2V0WCAtIHRoaXMuYW5pbWF0aW9uLmRlbHRhICogdGhpcy5jdXJyZW50RnJhbWU7XG4gICAgICAgICAgICAgICAgICAgIHkgPSAtdGhpcy5hbmltYXRpb24ub2Zmc2V0WTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IGAke3h9cHggJHt5fXB4YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlkbGVDb3VudGVyID0gKHRoaXMuaWRsZUNvdW50ZXIgKyAxKSAlIHRoaXMubm9ybWFsaXplUmVmcmFzaFJhdGUodGhpcy5hbmltYXRpb24ucmVmcmVzaFJhdGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdG9wIHRoZSBhbmltYXRpb24gYXQgdGhlIGN1cnJlbnQgZnJhbWUuXG4gICAgICovXG4gICAgcGF1c2VBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMucGxheWluZyA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXN1bWUgdGhlIGFuaW1hdGlvbiAoaWYgcGF1c2VkKVxuXG4gICAgICovXG4gICAgcmVzdW1lQW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLnBsYXlpbmcgPSB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGFuZ2VzIHRoZSBhbmltYXRpb24gYXNzb2NpYXRlZCB3aXRoIGEgc3ByaXRlLlxuICAgICAqL1xuICAgIHNldEFuaW1hdGlvbihhbmltYXRpb24sIGluZGV4LCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IGFuaW1hdGlvbjtcblxuICAgICAgICB0aGlzLmN1cnJlbnRGcmFtZSA9IDA7XG4gICAgICAgIHRoaXMuZnJhbWVJbmNyZW1lbnQgPSAxO1xuXG4gICAgICAgIHRoaXMuZWwuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnJHthbmltYXRpb24uaW1hZ2VVUkx9JylgO1xuXG4gICAgICAgIGlmIChhbmltYXRpb24udHlwZSAmIEFOSU1BVElPTl9WRVJUSUNBTCkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gJ3JlcGVhdC14JztcbiAgICAgICAgfSBlbHNlIGlmIChhbmltYXRpb24udHlwZSAmIEFOSU1BVElPTl9IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSAncmVwZWF0LXknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gJ25vLXJlcGVhdCc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGlzdGFuY2VYID0gMDtcbiAgICAgICAgbGV0IGRpc3RhbmNlWSA9IDA7XG5cbiAgICAgICAgdGhpcy5lbC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSBgJHstZGlzdGFuY2VYIC0gYW5pbWF0aW9uLm9mZnNldFh9cHggJHstZGlzdGFuY2VZIC0gYW5pbWF0aW9uLm9mZnNldFl9cHhgO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpe1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEludGVybmFsIGZ1bmN0aW9uIGRvaW5nIHRoZSBjb21iaW5lZCBhY3Rpb25zIG9mIHJvdGF0ZSBhbmQgc2NhbGUuXG4gICAgICogUGxlYXNlIHVzZSAucm90YXRlKCkgb3IgLnNjYWxlKCkgaW5zdGVhZCBzaW5jZSB0aGV5IGFyZSBwYXJ0IG9mIHRoZSBzdXBwb3J0ZWQgQVBJIVxuICAgICAqL1xuICAgIHRyYW5zZm9ybSgpIHtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy54ICogdGhpcy5mYWN0b3IgLSB0aGlzLm9mZnNldFh9cHgsICR7dGhpcy55ICogdGhpcy5mYWN0b3IgLSB0aGlzLm9mZnNldFl9cHgpIHJvdGF0ZSgke3RoaXMuYW5nbGV9ZGVnKSBzY2FsZSgke3RoaXMuZmFjdG9yICogdGhpcy5mYWN0b3JIfSwgJHt0aGlzLmZhY3RvciAqIHRoaXMuZmFjdG9yVn0pYDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUm90YXRlIHRoZSBlbGVtZW50KHMpIGNsb2NrLXdpc2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYW5nbGUgdGhlIGFuZ2xlIGluIGRlZ3JlZXNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlbGF0aXZlIG9yIG5vdFxuICAgICAqL1xuICAgIHJvdGF0ZShhbmdsZSwgcmVsYXRpdmUpIHtcbiAgICAgICAgaWYgKHJlbGF0aXZlID09PSB0cnVlKXtcbiAgICAgICAgICAgIGFuZ2xlICs9IHRoaXMuYW5nbGU7XG4gICAgICAgICAgICBhbmdsZSAlPSAzNjA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFuZ2xlID0gcGFyc2VGbG9hdChhbmdsZSk7XG4gICAgICAgIHRoaXMudHJhbnNmb3JtKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoYW5nZSB0aGUgc2NhbGUgb2YgdGhlIHNlbGVjdGVkIGVsZW1lbnQocykuIFRoZSBwYXNzZWQgYXJndW1lbnQgaXMgYSByYXRpbzpcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBmYWN0b3IgYSByYXRpbzogMS4wID0gb3JpZ2luYWwgc2l6ZSwgMC41ID0gaGFsZiB0aGUgb3JpZ2luYWwgc2l6ZSBldGMuXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZWxhdGl2ZSBvciBub3RcbiAgICAgKi9cbiAgICBzY2FsZShmYWN0b3IsIHJlbGF0aXZlKSB7XG4gICAgICAgIGlmIChyZWxhdGl2ZSA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICBmYWN0b3IgKj0gdGhpcy5mYWN0b3I7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mYWN0b3IgPSBwYXJzZUZsb2F0KGZhY3Rvcik7XG4gICAgICAgIHRoaXMudHJhbnNmb3JtKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZsaXBzIHRoZSBlbGVtZW50KHMpIGhvcml6b250YWxseS5cbiAgICAgKi9cbiAgICBmbGlwSChmbGlwKSB7XG4gICAgICAgIGlmIChmbGlwID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5mYWN0b3JIICE9PSB1bmRlZmluZWQpID8gKHRoaXMuZmFjdG9ySCA9PT0gLTEpIDogZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoZmxpcCkge1xuICAgICAgICAgICAgdGhpcy5mYWN0b3JIID0gLTE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZhY3RvckggPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmFuc2Zvcm0oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmxpcHMgdGhlIGVsZW1lbnQocykgdmVydGljYWxseS5cbiAgICAgKi9cbiAgICBmbGlwVihmbGlwKXtcbiAgICAgICAgaWYgKGZsaXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmZhY3RvclYgIT09IHVuZGVmaW5lZCkgPyAodGhpcy5mYWN0b3JWID09PSAtMSkgOiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChmbGlwKSB7XG4gICAgICAgICAgICB0aGlzLmZhY3RvclYgPSAtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmFjdG9yViA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIHNldFhZWihvcHRpb25zLCByZWxhdGl2ZSkge1xuICAgICAgICBsZXQgdHJhbnNmb3JtID0gZmFsc2U7XG5cbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChjb29yZGluYXRlID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoY29vcmRpbmF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3gnOlxuICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMueCArPSB0aGlzLng7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy54ID0gb3B0aW9ucy54O1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3knOlxuICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMueSArPSB0aGlzLnk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ID0gb3B0aW9ucy55O1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3onOlxuICAgICAgICAgICAgICAgICAgICBpZihyZWxhdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy56ICs9IHRoaXMuejtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnogPSBvcHRpb25zLno7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuekluZGV4ID0gdGhpcy56O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRyYW5zZm9ybSkgdGhpcy50cmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICBzZXRXSChvcHRpb25zLCByZWxhdGl2ZSkge1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKGNvb3JkaW5hdGUgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChjb29yZGluYXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAndyc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWxhdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy53ICs9IHRoaXMud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aWR0aCA9IG9wdGlvbnMudztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS53aWR0aCA9IGAke3RoaXMud2lkdGh9cHhgO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICBpZihyZWxhdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5oICs9IHRoaXMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gb3B0aW9ucy5oO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmhlaWdodCA9IGAke3RoaXMuaGVpZ2h0fXB4YDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuT2JqZWN0LmFzc2lnbihTcHJpdGUucHJvdG90eXBlLCBkZWZhdWx0cyk7XG5cbmV4cG9ydCBkZWZhdWx0IFNwcml0ZTtcbiIsIi8vIFJldHVybiB0aW1lIHN0YW1wIGluIHNlY29uZHMuXG5leHBvcnQgY29uc3QgdHMgPSAoKSA9PiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDA7XG5cbmNsYXNzIFRpbWVyIHtcbiAgICBjb25zdHJ1Y3Rvcih0aW1lKSB7XG4gICAgICAgIHRoaXMudGltZSA9IHRpbWU7XG4gICAgICAgIHRoaXMuc3RhcnQgPSB0cygpO1xuICAgIH1cblxuICAgIHBhdXNlKCkge1xuICAgICAgICB0aGlzLnBhdXNlVGltZSA9IHRzKCk7XG4gICAgfVxuXG4gICAgcmVzdW1lKCkge1xuICAgICAgICB0aGlzLnN0YXJ0ICs9IHRzKCkgLSB0aGlzLnBhdXNlVGltZTtcbiAgICB9XG5cbiAgICBnZXRFbGFwc2VkKCkge1xuICAgICAgICByZXR1cm4gdHMoKSAtIHRoaXMuc3RhcnQ7XG4gICAgfVxuXG4gICAgaXNFbGFwc2VkKHRpbWUgPSB0aGlzLnRpbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RWxhcHNlZCgpID4gdGltZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRpbWVyO1xuIiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJ3Jhc3RpJztcblxuZXhwb3J0IGNvbnN0IEVWRU5UX1NXSVBFID0gJ3N3aXBlJztcblxuZXhwb3J0IGNvbnN0IEVWRU5UX1NXSVBFX1VQID0gJ3N3aXBlOnVwJztcbmV4cG9ydCBjb25zdCBFVkVOVF9TV0lQRV9SSUdIVCA9ICdzd2lwZTpyaWdodCc7XG5leHBvcnQgY29uc3QgRVZFTlRfU1dJUEVfRE9XTiA9ICdzd2lwZTpkb3duJztcbmV4cG9ydCBjb25zdCBFVkVOVF9TV0lQRV9MRUZUID0gJ3N3aXBlOmxlZnQnO1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgICB0aHJlc2hvbGQgOiAxMDAsIC8vIHJlcXVpcmVkIG1pbiBkaXN0YW5jZSB0cmF2ZWxlZCB0byBiZSBjb25zaWRlcmVkIHN3aXBlXG4gICAgcmVzdHJhaW50IDogMTUwLCAvLyBtYXhpbXVtIGRpc3RhbmNlIGFsbG93ZWQgYXQgdGhlIHNhbWUgdGltZSBpbiBwZXJwZW5kaWN1bGFyIGRpcmVjdGlvblxuICAgIGFsbG93ZWRUaW1lIDogNDAwIC8vIG1heGltdW0gdGltZSBhbGxvd2VkIHRvIHRyYXZlbCB0aGF0IGRpc3RhbmNlXG59O1xuXG5jbGFzcyBUb3VjaCBleHRlbmRzIFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgZWwgOiBvcHRpb25zLmVsIHx8IChkb2N1bWVudCAmJiBkb2N1bWVudC5ib2R5KVxuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3Qua2V5cyhkZWZhdWx0cykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5IGluIG9wdGlvbnMpIHRoaXNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vblRvdWNoU3RhcnQgPSB0aGlzLm9uVG91Y2hTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uVG91Y2hFbmQgPSB0aGlzLm9uVG91Y2hFbmQuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5vblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCk7XG4gICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmQpO1xuICAgIH1cblxuICAgIG9uVG91Y2hTdGFydChldmVudCkge1xuICAgICAgICBjb25zdCB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuXG4gICAgICAgIHRoaXMuc3RhcnRYID0gdG91Y2gucGFnZVg7XG4gICAgICAgIHRoaXMuc3RhcnRZID0gdG91Y2gucGFnZVk7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKTsgLy8gcmVjb3JkIHRpbWUgd2hlbiBmaW5nZXIgZmlyc3QgbWFrZXMgY29udGFjdCB3aXRoIHN1cmZhY2VcbiAgICB9XG5cbiAgICBvblRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIGxldCB0eXBlID0gbnVsbDtcblxuICAgICAgICBjb25zdCB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuXG4gICAgICAgIGNvbnN0IGRpc3RYID0gdG91Y2gucGFnZVggLSB0aGlzLnN0YXJ0WDsgLy8gZ2V0IGhvcml6b250YWwgZGlzdCB0cmF2ZWxlZCBieSBmaW5nZXIgd2hpbGUgaW4gY29udGFjdCB3aXRoIHN1cmZhY2VcbiAgICAgICAgY29uc3QgZGlzdFkgPSB0b3VjaC5wYWdlWSAtIHRoaXMuc3RhcnRZOyAvLyBnZXQgdmVydGljYWwgZGlzdCB0cmF2ZWxlZCBieSBmaW5nZXIgd2hpbGUgaW4gY29udGFjdCB3aXRoIHN1cmZhY2VcbiAgICAgICAgY29uc3QgZWxhcHNlZFRpbWUgPSBuZXcgRGF0ZSgpIC0gdGhpcy5zdGFydFRpbWU7IC8vIGdldCB0aW1lIGVsYXBzZWRcblxuICAgICAgICBpZiAoZWxhcHNlZFRpbWUgPD0gdGhpcy5hbGxvd2VkVGltZSkgeyAvLyBmaXJzdCBjb25kaXRpb24gZm9yIGF3aXBlIG1ldFxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpc3RYKSA+PSB0aGlzLnRocmVzaG9sZCAmJiBNYXRoLmFicyhkaXN0WSkgPD0gdGhpcy5yZXN0cmFpbnQpIHsgLy8gMm5kIGNvbmRpdGlvbiBmb3IgaG9yaXpvbnRhbCBzd2lwZSBtZXRcbiAgICAgICAgICAgICAgICB0eXBlID0gKGRpc3RYIDwgMCkgPyBFVkVOVF9TV0lQRV9MRUZUIDogRVZFTlRfU1dJUEVfUklHSFQ7IC8vIGlmIGRpc3QgdHJhdmVsZWQgaXMgbmVnYXRpdmUsIGl0IGluZGljYXRlcyBsZWZ0IHN3aXBlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2UgaWYgKE1hdGguYWJzKGRpc3RZKSA+PSB0aGlzLnRocmVzaG9sZCAmJiBNYXRoLmFicyhkaXN0WCkgPD0gdGhpcy5yZXN0cmFpbnQpIHsgLy8gMm5kIGNvbmRpdGlvbiBmb3IgdmVydGljYWwgc3dpcGUgbWV0XG4gICAgICAgICAgICAgICAgdHlwZSA9IChkaXN0WSA8IDApID8gRVZFTlRfU1dJUEVfVVAgOiBFVkVOVF9TV0lQRV9ET1dOOyAvLyBpZiBkaXN0IHRyYXZlbGVkIGlzIG5lZ2F0aXZlLCBpdCBpbmRpY2F0ZXMgdXAgc3dpcGVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbWl0KEVWRU5UX1NXSVBFLCB0eXBlLCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbk9iamVjdC5hc3NpZ24oVG91Y2gucHJvdG90eXBlLCBkZWZhdWx0cyk7XG5cbmV4cG9ydCBkZWZhdWx0IFRvdWNoO1xuIiwiaW1wb3J0IEFuaW1hdGlvbiBmcm9tICcuLi9lbmdpbmUvQW5pbWF0aW9uJztcbmltcG9ydCBCb251cywgeyBhbmltYXRpb25zLCBhbmltYXRpb25CYXNlIH0gZnJvbSAnLi4vQm9udXMnO1xuXG5leHBvcnQgZGVmYXVsdCAoaW5kZXgsIG9wdGlvbnMpID0+IG5ldyBCb251cyh7XG4gICAgYW5pbWF0aW9ucyA6IHtcbiAgICAgICAgLi4uYW5pbWF0aW9ucyxcbiAgICAgICAgZGVmYXVsdCA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgICAgIG9mZnNldFggOiA2MCAqIGluZGV4XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICAuLi5vcHRpb25zXG59KTtcbiIsImltcG9ydCBBbmltYXRpb24gZnJvbSAnLi4vZW5naW5lL0FuaW1hdGlvbic7XG5pbXBvcnQgSXRlbSBmcm9tICcuLi9JdGVtJztcblxuZXhwb3J0IGNvbnN0IGFuaW1hdGlvbkJhc2UgPSB7XG4gICAgaW1hZ2VVUkwgOiAnaW1nL3BpbGxzLnBuZycsXG4gICAgbnVtYmVyT2ZGcmFtZSA6IDFcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG9wdGlvbnMgPT4gbmV3IEl0ZW0oe1xuICAgIHdpZHRoIDogOCxcbiAgICBoZWlnaHQgOiA4LFxuICAgIGRlZmF1bHRBbmltYXRpb24gOiAnd2hpdGUnLFxuICAgIGFuaW1hdGlvbnMgOiB7XG4gICAgICAgICd3aGl0ZScgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgICAgICBvZmZzZXRYIDogMjRcbiAgICAgICAgfSksXG4gICAgICAgICd5ZWxsb3cnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICAgICAgb2Zmc2V0WCA6IDI0ICsgMzJcbiAgICAgICAgfSksXG4gICAgICAgICdyZWQnIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICAgICAgb2Zmc2V0WCA6IDI0ICsgMzIgKiAyXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICAuLi5vcHRpb25zXG59KTtcbiIsImltcG9ydCBBbmltYXRpb24gZnJvbSAnLi4vZW5naW5lL0FuaW1hdGlvbic7XG5pbXBvcnQgR2hvc3QsIHsgYW5pbWF0aW9ucywgYW5pbWF0aW9uQmFzZSB9IGZyb20gJy4uL0dob3N0JztcbmltcG9ydCBnZXREaXN0YW5jZSBmcm9tICcuLi9oZWxwZXIvZ2V0RGlzdGFuY2UnO1xuXG5leHBvcnQgY29uc3QgU1BSSVRFX1BJTktZID0gJ1NQUklURV9QSU5LWSc7XG5leHBvcnQgY29uc3QgU1BSSVRFX0JMSU5LWSA9ICdTUFJJVEVfQkxJTktZJztcbmV4cG9ydCBjb25zdCBTUFJJVEVfSU5LWSA9ICdTUFJJVEVfSU5LWSc7XG5leHBvcnQgY29uc3QgU1BSSVRFX1NVRSA9ICdTUFJJVEVfU1VFJztcblxuZXhwb3J0IGRlZmF1bHQgKGxhYmVsLCBvcHRpb25zKSA9PiB7XG4gICAgLy8gUGluayBHaG9zdFxuICAgIGlmIChsYWJlbCA9PT0gJ3Bpbmt5Jykge1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICB0eXBlIDogU1BSSVRFX1BJTktZLFxuICAgICAgICAgICAgZGlyIDogJ2QnLFxuICAgICAgICAgICAgZGVmYXVsdEFuaW1hdGlvbiA6ICdkb3duJyxcbiAgICAgICAgICAgIGdldENoYXNlVGFyZ2V0IDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHQgPSB0aGlzLnBhY21hbkRhdGEudGlsZTtcbiAgICAgICAgICAgICAgICB2YXIgZGlyID0gdGhpcy5wYWNtYW5EYXRhLmRpcjtcbiAgICAgICAgICAgICAgICByZXR1cm4gdC5nZXQoZGlyKS5nZXQoZGlyKS5nZXQoZGlyKS5nZXQoZGlyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmltYXRpb25zIDoge1xuICAgICAgICAgICAgICAgIC4uLmFuaW1hdGlvbnMsXG4gICAgICAgICAgICAgICAgcmlnaHQgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA6IDI1MixcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA6IC0yXG4gICAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgICBkb3duIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgOiAyNTIsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggOiA2NCAqIDIgLSAyXG4gICAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgICB1cCA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZIDogMjUyLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYIDogNjQgKiA0IC0gMlxuICAgICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgICAgbGVmdCA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZIDogMjUyLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYIDogNjQgKiA2IC0gMlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cbiAgICAvLyBSZWQgR2hvc3RcbiAgICBpZiAobGFiZWwgPT09ICdibGlua3knKSB7XG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIHR5cGUgOiBTUFJJVEVfQkxJTktZLFxuICAgICAgICAgICAgZGlyIDogJ2wnLFxuICAgICAgICAgICAgd2FpdFRpbWUgOiAwLFxuICAgICAgICAgICAgc2NhdHRlclRhcmdldCA6IDI1LFxuICAgICAgICAgICAgZGVmYXVsdEFuaW1hdGlvbiA6ICdsZWZ0JyxcbiAgICAgICAgICAgIGFuaW1hdGlvbnMgOiB7XG4gICAgICAgICAgICAgICAgLi4uYW5pbWF0aW9ucyxcbiAgICAgICAgICAgICAgICByaWdodCA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZIDogMTI0LFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYIDogLTJcbiAgICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAgIGRvd24gOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA6IDEyNCxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA6IDY0ICogMiAtIDJcbiAgICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAgIHVwIDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgOiAxMjQsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggOiA2NCAqIDQgLSAyXG4gICAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgICBsZWZ0IDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgOiAxMjQsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggOiA2NCAqIDYgLSAyXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIC8vIEN5YW4gR2hvc3RcbiAgICBpZiAobGFiZWwgPT09ICdpbmt5Jykge1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICB0eXBlIDogU1BSSVRFX0lOS1ksXG4gICAgICAgICAgICBkaXIgOiAndScsXG4gICAgICAgICAgICB3YWl0VGltZSA6IDYsXG4gICAgICAgICAgICBzY2F0dGVyVGFyZ2V0IDogOTc5LFxuICAgICAgICAgICAgZGVmYXVsdEFuaW1hdGlvbiA6ICd1cCcsXG4gICAgICAgICAgICBnZXRDaGFzZVRhcmdldCA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBwYWNtYW5UaWxlID0gdGhpcy5wYWNtYW5EYXRhLnRpbGU7XG4gICAgICAgICAgICAgICAgdmFyIGJsaW5reVRpbGUgPSB0aGlzLmJsaW5reS5nZXRUaWxlKCk7XG4gICAgICAgICAgICAgICAgdmFyIGRpciA9IHRoaXMucGFjbWFuRGF0YS5kaXI7XG5cbiAgICAgICAgICAgICAgICBwYWNtYW5UaWxlID0gcGFjbWFuVGlsZS5nZXQoZGlyKS5nZXQoZGlyKTsgLy8gVHdvIHRpbGVzIGluIGZyb250IG9mIHBhY21hblxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwLmdldFRpbGUocGFjbWFuVGlsZS5jb2wgKyBwYWNtYW5UaWxlLmNvbCAtIGJsaW5reVRpbGUuY29sLCBwYWNtYW5UaWxlLnJvdyArIHBhY21hblRpbGUucm93IC0gYmxpbmt5VGlsZS5yb3cpO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0aW9ucyA6IHtcbiAgICAgICAgICAgICAgICAuLi5hbmltYXRpb25zLFxuICAgICAgICAgICAgICAgIHJpZ2h0IDogbmV3IEFuaW1hdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgOiAzMTYsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggOiAtMlxuICAgICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgICAgZG93biA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZIDogMzE2LFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYIDogNjQgKiAyIC0gMlxuICAgICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgICAgdXAgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA6IDMxNixcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA6IDY0ICogNCAtIDJcbiAgICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAgIGxlZnQgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA6IDMxNixcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA6IDY0ICogNiAtIDJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG4gICAgLy8gT3JhbmdlIEdob3N0XG4gICAgaWYgKGxhYmVsID09PSAnc3VlJykge1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICB0eXBlIDogU1BSSVRFX1NVRSxcbiAgICAgICAgICAgIGRpciA6ICd1JyxcbiAgICAgICAgICAgIHdhaXRUaW1lIDogOCxcbiAgICAgICAgICAgIHNjYXR0ZXJUYXJnZXQgOiA5NTMsXG4gICAgICAgICAgICBkZWZhdWx0QW5pbWF0aW9uIDogJ3VwJyxcbiAgICAgICAgICAgIGdldENoYXNlVGFyZ2V0IDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHQgPSB0aGlzLnBhY21hbkRhdGEudGlsZTtcbiAgICAgICAgICAgICAgICB2YXIgZCA9IGdldERpc3RhbmNlKHQsIHRoaXMuZ2V0VGlsZSgpKTtcbiAgICAgICAgICAgICAgICBpZiAoZCA+IDE2ICogdC53KSByZXR1cm4gdDtcbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB0aGlzLnNjYXR0ZXJUYXJnZXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0aW9ucyA6IHtcbiAgICAgICAgICAgICAgICAuLi5hbmltYXRpb25zLFxuICAgICAgICAgICAgICAgICdyaWdodCcgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA6IDE4OCxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA6IC0yXG4gICAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgICAnZG93bicgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA6IDE4OCxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA6IDY0ICogMiAtIDJcbiAgICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAgICd1cCcgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA6IDE4OCxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA6IDY0ICogNCAtIDJcbiAgICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAgICdsZWZ0JyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAuLi5hbmltYXRpb25CYXNlLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZIDogMTg4LFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYIDogNjQgKiA2IC0gMlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgIH1cblxuICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgR2hvc3Qob3B0aW9ucyk7XG59XG4iLCJpbXBvcnQgQW5pbWF0aW9uLCB7IEFOSU1BVElPTl9WRVJUSUNBTCB9IGZyb20gJy4uL2VuZ2luZS9BbmltYXRpb24nO1xuaW1wb3J0IEl0ZW0gZnJvbSAnLi4vSXRlbSc7XG5cbmNvbnN0IGFuaW1hdGlvbkJhc2UgPSB7XG4gICAgaW1hZ2VVUkwgOiAnaW1nL3BpbGxzLnBuZycsXG4gICAgbnVtYmVyT2ZGcmFtZSA6IDIsXG4gICAgZGVsdGEgOiAyNCxcbiAgICByZWZyZXNoUmF0ZSA6IDQ1MCxcbiAgICB0eXBlIDogQU5JTUFUSU9OX1ZFUlRJQ0FMXG59O1xuXG5leHBvcnQgZGVmYXVsdCAob3B0aW9ucykgPT4gbmV3IEl0ZW0oe1xuICAgIHdpZHRoIDogMjQsXG4gICAgaGVpZ2h0IDogMjQsXG4gICAgYW5pbWF0aW9ucyA6IHtcbiAgICAgICAgJ3doaXRlJyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZVxuICAgICAgICB9KSxcbiAgICAgICAgJ3llbGxvdycgOiBuZXcgQW5pbWF0aW9uKHtcbiAgICAgICAgICAgIC4uLmFuaW1hdGlvbkJhc2UsXG4gICAgICAgICAgICBvZmZzZXRYIDogMjQgKyA4XG4gICAgICAgIH0pLFxuICAgICAgICAncmVkJyA6IG5ldyBBbmltYXRpb24oe1xuICAgICAgICAgICAgLi4uYW5pbWF0aW9uQmFzZSxcbiAgICAgICAgICAgIG9mZnNldFggOiAoMjQgKyA4KSAqIDJcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIC4uLm9wdGlvbnNcbn0pO1xuIiwiLy8gRGlzdGFuY2UgYmV0d2VlbiB0d28gdGlsZXMuXG5leHBvcnQgZGVmYXVsdCAodGlsZUEsIHRpbGVCKSA9PiB7XG4gICAgY29uc3QgeCA9IHRpbGVBLngsIHgxID0gdGlsZUIueCwgeSA9IHRpbGVBLnksIHkxID0gdGlsZUIueTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHggLSB4MSwgMikgKyBNYXRoLnBvdyh5IC0geTEsIDIpKTtcbn1cbiIsIi8vIFJldHVybiByYW5kb20gbnVtYmVyIGJldHdlZW4gMCBhbmQgdG90YWwgbGVzcyBvbmUuXG5leHBvcnQgZGVmYXVsdCB0b3RhbCA9PiBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogdG90YWwpKTtcbiIsImV4cG9ydCBkZWZhdWx0IFtcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyxcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyxcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyxcbic9PT09PT09PT09PT09PT09PT09PT09PT09PT09Jyxcbic9Li4uLi4uPT0uLi4uLi4uLi4uPT0uLi4uLi49Jyxcbic9Kj09PT0uPT0uPT09PT09PT0uPT0uPT09PSo9Jyxcbic9Lj09PT0uPT0uPT09PT09PT0uPT0uPT09PS49Jyxcbic9Li4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi49Jyxcbic9PT0uPT0uPT09PT0uPT0uPT09PT0uPT0uPT09JyxcbictLT0uPT0uPT09PT0uPT0uPT09PT0uPT0uPS0tJyxcbic9PT0uPT0uPT09PT0uPT0uPT09PT0uPT0uPT09Jyxcbid0dHQuPT0uLi4uLi4uPT0uLi4uLi4uPT0udHR0Jyxcbic9PT0uPT09PT0tPT09PT09PT0tPT09PT0uPT09JyxcbictLT0uPT09PT0tPT09PT09PT0tPT09PT0uPS0tJyxcbictLT0uLS0tLS0tLS0tLS0tLS0tLS0tLS0uPS0tJyxcbictLT0uPT09PT0tPT09aGg9PT0tPT09PT0uPS0tJyxcbictLT0uPT09PT0tPT09LS09PT0tPT09PT0uPS0tJyxcbictLT0uPT0tLS0tPS0tLS0tLT0tLS0tPT0uPS0tJyxcbictLT0uPT0tPT0tPT09PT09PT0tPT0tPT0uPS0tJyxcbic9PT0uPT0tPT0tPT09PT09PT0tPT0tPT0uPT09Jyxcbid0dHQuLS0tPT0tLS0tLS0tLS0tPT0tLS0udHR0Jyxcbic9PT0uPT09PT09PT0tPT0tPT09PT09PT0uPT09JyxcbictLT0uPT09PT09PT0tPT0tPT09PT09PT0uPS0tJyxcbictLT0uLi4uLi4uLS0tPT0tLS0uLi4uLi4uPS0tJyxcbictLT0uPT09PT0uPT09PT09PT0uPT09PT0uPS0tJyxcbic9PT0uPT09PT0uPT09PT09PT0uPT09PT0uPT09Jyxcbic9Li4uLi4uLi4uLi4uLS0uLi4uLi4uLi4uLi49Jyxcbic9Lj09PT0uPT09PT0uPT0uPT09PT0uPT09PS49Jyxcbic9Lj09PT0uPT09PT0uPT0uPT09PT0uPT09PS49Jyxcbic9Lj09PT0uPT0uLi4uPT0uLi4uPT0uPT09PS49Jyxcbic9Kj09PT0uPT0uPT09PT09PT0uPT0uPT09PSo9Jyxcbic9Lj09PT0uPT0uPT09PT09PT0uPT0uPT09PS49Jyxcbic9Li4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi49Jyxcbic9PT09PT09PT09PT09PT09PT09PT09PT09PT09JyxcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyxcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJ1xuXTtcbiIsImV4cG9ydCBkZWZhdWx0IFtcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyxcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyxcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyxcbic9PT09PT09PT09PT09PT09PT09PT09PT09PT09Jyxcbid0dHR0dHQtPT0uLi4uLi4uLi4uPT0tdHR0dHR0Jyxcbic9PT09PT0uPT0uPT09PT09PT0uPT0uPT09PT09Jyxcbic9PT09PT0uPT0uPT09PT09PT0uPT0uPT09PT09Jyxcbic9Ki4uLi4uLi4uLi4uPT0uLi4uLi4uLi4uLio9Jyxcbic9Lj09PT09PT0uPT0uPT0uPT0uPT09PT09PS49Jyxcbic9Lj09PT09PT0uPT0uPT0uPT0uPT09PT09PS49Jyxcbic9Lj09Li4uLi4uPT0uPT0uPT0uLi4uLi49PS49Jyxcbic9Lj09Lj09PT0tPT0uLi4uPT0tPT09PS49PS49Jyxcbic9Lj09Lj09PT0tPT09PT09PT0tPT09PS49PS49Jyxcbic9Li4uLi4uPT0tPT09PT09PT0tPT0uLi4uLi49Jyxcbic9PT09PT0uPT0tLS0tLS0tLS0tPT0uPT09PT09Jyxcbic9PT09PT0uPT0tPT09aGg9PT0tPT0uPT09PT09Jyxcbic9Li4uLi4uPT0tPT09LS09PT0tPT0uLi4uLi49Jyxcbic9Lj09PT0uPT0tPS0tLS0tLT0tPT0uPT09PS49Jyxcbic9Lj09PT0uLS0tPT09PT09PT0tLS0uPT09PS49Jyxcbic9Li4uPT0uPT0tPT09PT09PT0tPT0uPT0uLi49Jyxcbic9PT0uPT0uPT0tLS0tLS0tLS0tPT0uPT0uPT09JyxcbictLT0uPT0uPT09PS09PT09LT09PT0uPT0uPS0tJyxcbictLT0uPT0uPT09PS09PT09LT09PT0uPT0uPS0tJyxcbictLT0uLi4uLi4uLi49PT09Li4uLi4uLi4uPS0tJyxcbictLT0uPT09PT09PS49PT09Lj09PT09PT0uPS0tJyxcbic9PT0uPT09PT09PS49PT09Lj09PT09PT0uPT09Jyxcbid0dHQuLi4uPT0uLi4tLS0tLi4uPT0uLi4udHR0Jyxcbic9PT0uPT0uPT0uPT09PT09PT0uPT0uPT0uPT09Jyxcbic9PT0uPT0uPT0uPT09PT09PT0uPT0uPT0uPT09Jyxcbic9Ki4uPT0uLi4uLi4uPT0uLi4uLi4uPT0uLio9Jyxcbic9Lj09PT0uPT09PT0uPT0uPT09PT0uPT09PS49Jyxcbic9Lj09PT0uPT09PT0uPT0uPT09PT0uPT09PS49Jyxcbic9Li4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi49Jyxcbic9PT09PT09PT09PT09PT09PT09PT09PT09PT09JyxcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyxcbictLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJ1xuXTtcbiIsImV4cG9ydCBkZWZhdWx0ICBbXG4nLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScsXG4nLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScsXG4nLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScsXG4nPT09PT09PT09PT09PT09PT09PT09PT09PT09PScsXG4nPS4uLi4uLi4uLj09Li4uLj09Li4uLi4uLi4uPScsXG4nPS49PT09PT09Lj09Lj09Lj09Lj09PT09PT0uPScsXG4nPSo9PT09PT09Lj09Lj09Lj09Lj09PT09PT0qPScsXG4nPS49PS4uLi4uLi4uLj09Li4uLi4uLi4uPT0uPScsXG4nPS49PS49PS49PT09Lj09Lj09PT0uPT0uPT0uPScsXG4nPS4uLi49PS49PT09Lj09Lj09PT0uPT0uLi4uPScsXG4nPT09PS49PS49PT09Lj09Lj09PT0uPT0uPT09PScsXG4nPT09PS49PS4uLi4uLi4uLi4uLi4uPT0uPT09PScsXG4ndC4uLi49PT09LT09PT09PT09LT09PT0uLi4udCcsXG4nPS49PS09PT09LT09PT09PT09LT09PT0tPT0uPScsXG4nPS49PS0tLS0tLS0tLS0tLS0tLS0tLS0tPT0uPScsXG4nPS49PT09LT09LT09PWhoPT09LT09LT09PT0uPScsXG4nPS49PT09LT09LT09PS0tPT09LT09LT09PT0uPScsXG4nPS4tLS0tLT09LT0tLS0tLS09LT09LS0tLS0uPScsXG4nPS49PS09PT09LT09PT09PT09LT09PT0tPT0uPScsXG4nPS49PS09PT09LT09PT09PT09LT09PT0tPT0uPScsXG4nPS49PS0tLS0tLS0tLS0tLS0tLS0tLS0tPT0uPScsXG4nPS49PT09LT09PT09LT09LT09PT09LT09PT0uPScsXG4nPS49PT09LT09PT09LT09LT09PT09LT09PT0uPScsXG4nPS4uLi4uLj09Li4uLj09Li4uLj09Li4uLi4uPScsXG4nPT09Lj09Lj09Lj09PT09PT09Lj09Lj09Lj09PScsXG4nPT09Lj09Lj09Lj09PT09PT09Lj09Lj09Lj09PScsXG4nPSouLj09Li4uLi4uLi0tLi4uLi4uLj09Li4qPScsXG4nPS49PT09Lj09PT09Lj09Lj09PT09Lj09PT0uPScsXG4nPS49PT09Lj09PT09Lj09Lj09PT09Lj09PT0uPScsXG4nPS4uLi4uLj09Li4uLj09Li4uLj09Li4uLi4uPScsXG4nPS49PT09Lj09Lj09PT09PT09Lj09Lj09PT0uPScsXG4nPS49PT09Lj09Lj09PT09PT09Lj09Lj09PT0uPScsXG4nPS4uLi4uLj09Li4uLi4uLi4uLj09Li4uLi4uPScsXG4nPT09PT09PT09PT09PT09PT09PT09PT09PT09PScsXG4nLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScsXG4nLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSdcbl07XG4iLCJleHBvcnQgZGVmYXVsdCBbXG4nLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScsXG4nLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScsXG4nLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScsXG4nPT09PT09PT09PT09PT09PT09PT09PT09PT09PScsXG4nPS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uPScsXG4nPS49PS49PT09Lj09PT09PT09Lj09PT0uPT0uPScsXG4nPSo9PS49PT09Lj09PT09PT09Lj09PT0uPT0qPScsXG4nPS49PS49PT09Lj09Li4uLj09Lj09PT0uPT0uPScsXG4nPS49PS4uLi4uLj09Lj09Lj09Li4uLi4uPT0uPScsXG4nPS49PT09Lj09Lj09Lj09Lj09Lj09Lj09PT0uPScsXG4nPS49PT09Lj09Lj09Lj09Lj09Lj09Lj09PT0uPScsXG4nPS4uLi4uLj09Li4uLj09Li4uLj09Li4uLi4uPScsXG4nPT09Lj09PT09PT09LT09LT09PT09PT09Lj09PScsXG4nLS09Lj09PT09PT09LT09LT09PT09PT09Lj0tLScsXG4nLS09Li4uLj09LS0tLS0tLS0tLT09Li4uLj0tLScsXG4nPT09LT09Lj09LT09PWhoPT09LT09Lj09LT09PScsXG4ndHR0LT09Lj09LT09PS0tPT09LT09Lj09LXR0dCcsXG4nPT09PT09Li0tLT0tLS0tLS09LS0tLj09PT09PScsXG4nPT09PT09Lj09LT09PT09PT09LT09Lj09PT09PScsXG4ndHR0LT09Lj09LT09PT09PT09LT09Lj09LXR0dCcsXG4nPT09LT09Lj09LS0tLS0tLS0tLT09Lj09LT09PScsXG4nLS09Li4uLj09PT09LT09LT09PT09Li4uLj0tLScsXG4nLS09Lj09Lj09PT09LT09LT09PT09Lj09Lj0tLScsXG4nLS09Lj09Li4uLi0tLT09LS0tLi4uLj09Lj0tLScsXG4nLS09Lj09PT09Lj09LT09LT09Lj09PT09Lj0tLScsXG4nPT09Lj09PT09Lj09LT09LT09Lj09PT09Lj09PScsXG4nPS4uLi4uLi4uLj09LS0tLT09Li4uLi4uLi4uPScsXG4nPS49PT09Lj09Lj09PT09PT09Lj09Lj09PT0uPScsXG4nPS49PT09Lj09Lj09PT09PT09Lj09Lj09PT0uPScsXG4nPS49PS4uLj09Li4uLi4uLi4uLj09Li4uPT0uPScsXG4nPSo9PS49PT09PT09Lj09Lj09PT09PT0uPT0qPScsXG4nPS49PS49PT09PT09Lj09Lj09PT09PT0uPT0uPScsXG4nPS4uLi4uLi4uLi4uLj09Li4uLi4uLi4uLi4uPScsXG4nPT09PT09PT09PT09PT09PT09PT09PT09PT09PScsXG4nLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScsXG4nLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSdcbl07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9mb250cy9wcmVzcy1zdGFydC0ycC12OS1sYXRpbi1yZWd1bGFyLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9mb250cy9wcmVzcy1zdGFydC0ycC12OS1sYXRpbi1yZWd1bGFyLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuL2ltZy9tYXplLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4vaW1nL3N0YXJ0LnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyogcHJlc3Mtc3RhcnQtMnAtcmVndWxhciAtIGxhdGluICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdQcmVzcyBTdGFydCAyUCc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgc3JjOiBsb2NhbCgnJyksXG4gICAgICAgdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pIGZvcm1hdCgnd29mZjInKSwgLyogQ2hyb21lIDI2KywgT3BlcmEgMjMrLCBGaXJlZm94IDM5KyAqL1xuICAgICAgIHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX199KSBmb3JtYXQoJ3dvZmYnKTsgLyogQ2hyb21lIDYrLCBGaXJlZm94IDMuNissIElFIDkrLCBTYWZhcmkgNS4xKyAqL1xufVxuXG5ib2R5IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyO1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGNvbG9yOiAjRUZFRkVGO1xuICAgIGZvbnQtZmFtaWx5OiAnUHJlc3MgU3RhcnQgMlAnLCBjdXJzaXZlO1xuICAgIGZvbnQtc2l6ZTogMmVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fX30pO1xuICAgIGJhY2tncm91bmQtc2l6ZTogNDAwJSAyMDAlO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIHRvdWNoLWFjdGlvbjogbm9uZTtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kLndpdGgtYm9yZGVyIHtcbiAgICBib3JkZXItcmFkaXVzOiAwLjVlbTtcbiAgICBib3JkZXI6IDFlbSBzb2xpZCAjMDAwO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQud2l0aC1ib3JkZXIud2l0aC1saWdodCB7XG4gICAgYm94LXNoYWRvdzogMCAwIDFlbSAwLjFlbSAjRUVFO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQubWF6ZS0xIHtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZC5tYXplLTIge1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0xMDAlIDA7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZC5tYXplLTMge1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0yMDAlIDA7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZC5tYXplLTQge1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0zMDAlIDA7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZC5tYXplLTEuYmxpbmsge1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgLTEwMCU7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZC5tYXplLTIuYmxpbmsge1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0xMDAlIC0xMDAlO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQubWF6ZS0zLmJsaW5rIHtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMjAwJSAtMTAwJTtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kLm1hemUtNC5ibGluayB7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTMwMCUgLTEwMCU7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3BsYXNoIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19ffSk7XG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlIDEwMCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBib3R0b206IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbGVmdDogMDtcbiAgICB6LWluZGV4OiAxO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNwbGFzaCBhIHtcbiAgICBjb2xvcjogI0RERERERDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3BsYXNoIGE6aG92ZXIge1xuICAgIGNvbG9yOiAjRkZGO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNwbGFzaCBhLnN0YXJ0IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdG9wOiA2NSU7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBmb250LXNpemU6IDEuNmVtO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNwbGFzaCAudGl0bGUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDIyLjA0JTtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAvKiBjb2xvcjogI0ZDQjY0NDsgKi9cbiAgICBjb2xvcjogYmxhY2s7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3BsYXNoIHAubmVyZCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMzMuMTUlO1xuICAgIGxlZnQ6IDM1LjI2JTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6ICNGRkY7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3BsYXNoIHAgc3BhbiB7XG4gICAgY29sb3IgOiAjRkZGRjAwO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNwbGFzaCAua2V5cyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogODUlO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiAjRkZGO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNwbGFzaCAuY3JlZGl0cyB7XG4gICAgZm9udC1mYW1pbHk6ICdQcmVzcyBTdGFydCAyUCcsIGN1cnNpdmU7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGNvbG9yOiAjRkZGO1xuICAgIHBhZGRpbmc6IDAuMWVtO1xuICAgIGZvbnQtc2l6ZTogMC42ZW07XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3BsYXNoIC5jcmVkaXRzIHNwYW4ge1xuICAgIGNvbG9yOiAjRkYzMzMzO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNwbGFzaCAuY3JlZGl0cyBhIHtcbiAgICBjb2xvcjogI0ZGRkYwMDtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zcGxhc2ggLmNyZWRpdHMgYTpob3ZlciB7XG4gICAgY29sb3I6ICNGRkZGNEQ7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAubG9hZGJhciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNjUlO1xuICAgIGxlZnQ6IDIyLjMyJTtcbiAgICByaWdodDogMjIuMzIlO1xuICAgIGJhY2tncm91bmQ6ICNGRjA7XG4gICAgaGVpZ2h0OiAzLjQ3MiU7XG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgYm9yZGVyOiAycHggc29saWQgI0ZGRjtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5sb2FkYmFyIC5pbm5lciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJhY2tncm91bmQ6ICNGRjAwMDA7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAwO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNjb3JlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHJpZ2h0OiAwLjQ0NjQlO1xuICAgIGxlZnQ6IDAuNDQ2NCU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHotaW5kZXg6IDJcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zY29yZSAucDEtc2NvcmUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMjIlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNjb3JlIC5oaWdoLXNjb3JlIHtcbiAgICB3aWR0aDogNDAlO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zY29yZSAucDItc2NvcmUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMjIlO1xuICAgIHRvcDogMDtcbiAgICByaWdodDogMDtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zY29yZSBzcGFuIHtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICBkaXNwbGF5OiBibG9jaztcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zY29yZSAuaGlnaC1zY29yZSBzcGFuIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3RhcnQtcDEge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDM4LjcxJTtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBjb2xvcjogIzVFRTtcbn1cblxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5nYW1lLW92ZXIsXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnN0YXJ0LXJlYWR5LFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zb3VuZC1zdGF0dXMsXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnBhdXNlZCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNTUuNTUlO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiAjRjAwO1xufVxuXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNvdW5kLXN0YXR1cy5vbiBzcGFuLm9uLFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zb3VuZC1zdGF0dXMgc3Bhbi5vZmYge1xuICAgIGRpc3BsYXkgOiBpbmxpbmU7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc291bmQtc3RhdHVzLm9uIHNwYW4ub2ZmLFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zb3VuZC1zdGF0dXMgc3Bhbi5vbiB7XG4gICAgZGlzcGxheSA6IG5vbmU7XG59XG5cbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc291bmQtc3RhdHVzIC53cmFwLFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5wYXVzZWQgLndyYXAge1xuICAgIGJhY2tncm91bmQ6ICMwMDA7XG4gICAgcGFkZGluZzogMC4xZW07XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpIHtcbiAgICAvKiBib2R5IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbiAgICB9XG5cbiAgICAuanMtcGFjbWFuLXBsYXlncm91bmQud2l0aC1ib3JkZXIge1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgfSAqL1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSxtQ0FBbUM7QUFDbkM7RUFDRSw2QkFBNkI7RUFDN0Isa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQjs7NkRBRXVFLEVBQUUsZ0RBQWdEO0FBQzNIOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLFNBQVM7SUFDVCxVQUFVO0lBQ1YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGNBQWM7SUFDZCxzQ0FBc0M7SUFDdEMsY0FBYztJQUNkLHNCQUFzQjtJQUN0Qix5REFBdUM7SUFDdkMsMEJBQTBCO0lBQzFCLGFBQWE7SUFDYixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLG9CQUFvQjtJQUNwQixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSx3QkFBd0I7QUFDNUI7O0FBRUE7SUFDSSw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSSw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSSw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSSw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSSxnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSx5REFBd0M7SUFDeEMsMEJBQTBCO0lBQzFCLHNCQUFzQjtJQUN0QixrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLE1BQU07SUFDTixTQUFTO0lBQ1QsUUFBUTtJQUNSLE9BQU87SUFDUCxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsZUFBZTtJQUNmLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IseUJBQXlCO0lBQ3pCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsT0FBTztJQUNQLFFBQVE7SUFDUixrQkFBa0I7SUFDbEIsb0JBQW9CO0lBQ3BCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsV0FBVztJQUNYLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsV0FBVztBQUNmOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsT0FBTztJQUNQLFFBQVE7SUFDUixrQkFBa0I7SUFDbEIsV0FBVztBQUNmOztBQUVBO0lBQ0ksc0NBQXNDO0lBQ3RDLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsT0FBTztJQUNQLFFBQVE7SUFDUixXQUFXO0lBQ1gsY0FBYztJQUNkLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsWUFBWTtJQUNaLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLGlCQUFpQjtJQUNqQixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixRQUFRO0FBQ1o7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsTUFBTTtJQUNOLGNBQWM7SUFDZCxhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCO0FBQ0o7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLE1BQU07SUFDTixPQUFPO0FBQ1g7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsaUJBQWlCO0lBQ2pCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsTUFBTTtJQUNOLFFBQVE7QUFDWjs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFdBQVc7SUFDWCxPQUFPO0lBQ1AsUUFBUTtJQUNSLGtCQUFrQjtJQUNsQixXQUFXO0FBQ2Y7O0FBRUE7Ozs7SUFJSSxrQkFBa0I7SUFDbEIsV0FBVztJQUNYLE9BQU87SUFDUCxRQUFRO0lBQ1Isa0JBQWtCO0lBQ2xCLFdBQVc7QUFDZjs7QUFFQTs7SUFFSSxnQkFBZ0I7QUFDcEI7O0FBRUE7O0lBRUksY0FBYztBQUNsQjs7QUFFQTs7SUFFSSxnQkFBZ0I7SUFDaEIsY0FBYztBQUNsQjs7QUFFQTtJQUNJOzs7Ozs7OztPQVFHO0FBQ1BcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogcHJlc3Mtc3RhcnQtMnAtcmVndWxhciAtIGxhdGluICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ1ByZXNzIFN0YXJ0IDJQJztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBzcmM6IGxvY2FsKCcnKSxcXG4gICAgICAgdXJsKCcuL2ZvbnRzL3ByZXNzLXN0YXJ0LTJwLXY5LWxhdGluLXJlZ3VsYXIud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksIC8qIENocm9tZSAyNissIE9wZXJhIDIzKywgRmlyZWZveCAzOSsgKi9cXG4gICAgICAgdXJsKCcuL2ZvbnRzL3ByZXNzLXN0YXJ0LTJwLXY5LWxhdGluLXJlZ3VsYXIud29mZicpIGZvcm1hdCgnd29mZicpOyAvKiBDaHJvbWUgNissIEZpcmVmb3ggMy42KywgSUUgOSssIFNhZmFyaSA1LjErICovXFxufVxcblxcbmJvZHkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgY29sb3I6ICNFRkVGRUY7XFxuICAgIGZvbnQtZmFtaWx5OiAnUHJlc3MgU3RhcnQgMlAnLCBjdXJzaXZlO1xcbiAgICBmb250LXNpemU6IDJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuL2ltZy9tYXplLnBuZycpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDQwMCUgMjAwJTtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgdG91Y2gtYWN0aW9uOiBub25lO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQud2l0aC1ib3JkZXIge1xcbiAgICBib3JkZXItcmFkaXVzOiAwLjVlbTtcXG4gICAgYm9yZGVyOiAxZW0gc29saWQgIzAwMDtcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kLndpdGgtYm9yZGVyLndpdGgtbGlnaHQge1xcbiAgICBib3gtc2hhZG93OiAwIDAgMWVtIDAuMWVtICNFRUU7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZC5tYXplLTEge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZC5tYXplLTIge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMTAwJSAwO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQubWF6ZS0zIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTIwMCUgMDtcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kLm1hemUtNCB7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0zMDAlIDA7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZC5tYXplLTEuYmxpbmsge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIC0xMDAlO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQubWF6ZS0yLmJsaW5rIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTEwMCUgLTEwMCU7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZC5tYXplLTMuYmxpbmsge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMjAwJSAtMTAwJTtcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kLm1hemUtNC5ibGluayB7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0zMDAlIC0xMDAlO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNwbGFzaCB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnLi9pbWcvc3RhcnQucG5nJyk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB6LWluZGV4OiAxO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNwbGFzaCBhIHtcXG4gICAgY29sb3I6ICNEREREREQ7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3BsYXNoIGE6aG92ZXIge1xcbiAgICBjb2xvcjogI0ZGRjtcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zcGxhc2ggYS5zdGFydCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdG9wOiA2NSU7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIGZvbnQtc2l6ZTogMS42ZW07XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3BsYXNoIC50aXRsZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyMi4wNCU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIC8qIGNvbG9yOiAjRkNCNjQ0OyAqL1xcbiAgICBjb2xvcjogYmxhY2s7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3BsYXNoIHAubmVyZCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAzMy4xNSU7XFxuICAgIGxlZnQ6IDM1LjI2JTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBjb2xvcjogI0ZGRjtcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zcGxhc2ggcCBzcGFuIHtcXG4gICAgY29sb3IgOiAjRkZGRjAwO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNwbGFzaCAua2V5cyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA4NSU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjRkZGO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNwbGFzaCAuY3JlZGl0cyB7XFxuICAgIGZvbnQtZmFtaWx5OiAnUHJlc3MgU3RhcnQgMlAnLCBjdXJzaXZlO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJvdHRvbTogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIGNvbG9yOiAjRkZGO1xcbiAgICBwYWRkaW5nOiAwLjFlbTtcXG4gICAgZm9udC1zaXplOiAwLjZlbTtcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zcGxhc2ggLmNyZWRpdHMgc3BhbiB7XFxuICAgIGNvbG9yOiAjRkYzMzMzO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNwbGFzaCAuY3JlZGl0cyBhIHtcXG4gICAgY29sb3I6ICNGRkZGMDA7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3BsYXNoIC5jcmVkaXRzIGE6aG92ZXIge1xcbiAgICBjb2xvcjogI0ZGRkY0RDtcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5sb2FkYmFyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDY1JTtcXG4gICAgbGVmdDogMjIuMzIlO1xcbiAgICByaWdodDogMjIuMzIlO1xcbiAgICBiYWNrZ3JvdW5kOiAjRkYwO1xcbiAgICBoZWlnaHQ6IDMuNDcyJTtcXG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICNGRkY7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAubG9hZGJhciAuaW5uZXIge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGJhY2tncm91bmQ6ICNGRjAwMDA7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgd2lkdGg6IDA7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc2NvcmUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMDtcXG4gICAgcmlnaHQ6IDAuNDQ2NCU7XFxuICAgIGxlZnQ6IDAuNDQ2NCU7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgei1pbmRleDogMlxcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNjb3JlIC5wMS1zY29yZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDIyJTtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNjb3JlIC5oaWdoLXNjb3JlIHtcXG4gICAgd2lkdGg6IDQwJTtcXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zY29yZSAucDItc2NvcmUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAyMiU7XFxuICAgIHRvcDogMDtcXG4gICAgcmlnaHQ6IDA7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc2NvcmUgc3BhbiB7XFxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zY29yZSAuaGlnaC1zY29yZSBzcGFuIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnN0YXJ0LXAxIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDM4LjcxJTtcXG4gICAgbGVmdDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgY29sb3I6ICM1RUU7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuZ2FtZS1vdmVyLFxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc3RhcnQtcmVhZHksXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zb3VuZC1zdGF0dXMsXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5wYXVzZWQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTUuNTUlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBjb2xvcjogI0YwMDtcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zb3VuZC1zdGF0dXMub24gc3Bhbi5vbixcXG4uanMtcGFjbWFuLXBsYXlncm91bmQgLnNvdW5kLXN0YXR1cyBzcGFuLm9mZiB7XFxuICAgIGRpc3BsYXkgOiBpbmxpbmU7XFxufVxcblxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc291bmQtc3RhdHVzLm9uIHNwYW4ub2ZmLFxcbi5qcy1wYWNtYW4tcGxheWdyb3VuZCAuc291bmQtc3RhdHVzIHNwYW4ub24ge1xcbiAgICBkaXNwbGF5IDogbm9uZTtcXG59XFxuXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5zb3VuZC1zdGF0dXMgLndyYXAsXFxuLmpzLXBhY21hbi1wbGF5Z3JvdW5kIC5wYXVzZWQgLndyYXAge1xcbiAgICBiYWNrZ3JvdW5kOiAjMDAwO1xcbiAgICBwYWRkaW5nOiAwLjFlbTtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG9yaWVudGF0aW9uOiBwb3J0cmFpdCkge1xcbiAgICAvKiBib2R5IHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICAgIH1cXG5cXG4gICAgLmpzLXBhY21hbi1wbGF5Z3JvdW5kLndpdGgtYm9yZGVyIHtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XFxuICAgICAgICBib3gtc2hhZG93OiBub25lO1xcbiAgICAgICAgYm9yZGVyOiBub25lO1xcbiAgICB9ICovXFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG52YXIgX1ZpZXcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9WaWV3LmpzXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuLy8gVGhpcyBvcHRpb25zIGtleXMgd2lsbCBiZSBleHRlbmRlZCBvbiB2aWV3IGluc3RhbmNlLlxudmFyIGNvbXBvbmVudE9wdGlvbnMgPSB7XG4gIGtleTogdHJ1ZSxcbiAgc3RhdGU6IHRydWUsXG4gIG9uQ3JlYXRlOiB0cnVlLFxuICBvbkNoYW5nZTogdHJ1ZSxcbiAgb25SZW5kZXI6IHRydWVcbn07XG5cbi8qXG4gKiBIZWxwZXIgZnVuY3Rpb24uIEV4dHJhY3QgYXR0cmlidXRlcyBmcm9tIGh0bWwgdGFnXG4gKiBAcGFyYW0gdGV4dCB7c3RyaW5nfSBodG1sIHRleHRcbiAqIEByZXR1cm4ge29iamVjdH0gT2JqZWN0IHdpdGgga2V5cyAvIHZhbHVlcyByZXByZXNlbnRpbmcgYXR0cmlidXRlcy5cbiAqL1xudmFyIGV4dHJhY3RBdHRyaWJ1dGVzID0gZnVuY3Rpb24gZXh0cmFjdEF0dHJpYnV0ZXModGV4dCkge1xuICB2YXIgYXR0cmlidXRlcyA9IHt9O1xuICB2YXIgcmUgPSAvKFtcXHd8ZGF0YS1dKykoPzo9W1wiJ10/KCg/Oi4oPyFbXCInXT9cXHMrKD86XFxTKyk9fFxccypcXC8/Wz5cIiddKSkrLilbXCInXT8pPy9nO1xuICB2YXIgcmVzdWx0O1xuICB3aGlsZSAoKHJlc3VsdCA9IHJlLmV4ZWModGV4dCkpICE9PSBudWxsKSB7XG4gICAgYXR0cmlidXRlc1tyZXN1bHRbMV1dID0gdHlwZW9mIHJlc3VsdFsyXSA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogcmVzdWx0WzJdO1xuICB9XG4gIHJldHVybiBhdHRyaWJ1dGVzO1xufTtcblxuLypcbiAqIEhlbHBlciBmdW5jdGlvbi4gSWYgZmlyc3QgYXJnIGlzIGEgcGxhY2Vob2xkZXIgZm9yIGFuIGV4cHJlc3Npb24sIHJldHVybiB0aGUgZXhwcmVzc2lvbi5cbiAqL1xudmFyIGdldEV4cHJlc3Npb24gPSBmdW5jdGlvbiBnZXRFeHByZXNzaW9uKHBsYWNlaG9sZGVyLCBleHByZXNzaW9ucykge1xuICB2YXIgbWF0Y2ggPSBwbGFjZWhvbGRlciAmJiBwbGFjZWhvbGRlci5tYXRjaCAmJiBwbGFjZWhvbGRlci5tYXRjaChuZXcgUmVnRXhwKENvbXBvbmVudC5FWFBSRVNTSU9OX1BMQUNFSE9MREVSX1RFTVBMQVRFKCcoXFxcXGQrKScpKSk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXSA/IGV4cHJlc3Npb25zW21hdGNoWzFdXSA6IHBsYWNlaG9sZGVyO1xufTtcblxuLypcbiAqIEhlbHBlciBmdW5jdGlvbi4gSWYgZXhwcmVzc2lvbiBpcyBhIGZ1bmN0aW9uLCBjYWxsIGl0IHdpdGggY29udGV4dCBhbmQgYXJncy5cbiAqL1xudmFyIGV2YWxFeHByZXNzaW9uID0gZnVuY3Rpb24gZXZhbEV4cHJlc3Npb24oZXhwcmVzc2lvbiwgY29udGV4dCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cbiAgcmV0dXJuIHR5cGVvZiBleHByZXNzaW9uID09PSAnZnVuY3Rpb24nID8gZXhwcmVzc2lvbi5hcHBseShjb250ZXh0LCBhcmdzKSA6IGV4cHJlc3Npb247XG59O1xuXG4vKipcbiAqIENvbXBvbmVudHMgYXJlIGEgc3BlY2lhbCBraW5kIG9mIGBWaWV3YCB0aGF0IGlzIGRlc2lnbmVkIHRvIGJlIGVhc2lseSBjb21wb3NhYmxlLCBcbiAqIG1ha2luZyBpdCBzaW1wbGUgdG8gYWRkIGNoaWxkIHZpZXdzIGFuZCBidWlsZCBjb21wbGV4IHVzZXIgaW50ZXJmYWNlcy4gIFxuICogVW5saWtlIHZpZXdzLCB3aGljaCBhcmUgcmVuZGVyLWFnbm9zdGljLCBjb21wb25lbnRzIGhhdmUgYSBzcGVjaWZpYyBzZXQgb2YgcmVuZGVyaW5nIFxuICogZ3VpZGVsaW5lcyB0aGF0IGFsbG93IGZvciBhIG1vcmUgZGVjbGFyYXRpdmUgZGV2ZWxvcG1lbnQgc3R5bGUuICBcbiAqIENvbXBvbmVudHMgYXJlIGRlZmluZWQgd2l0aCB0aGUgYGNyZWF0ZWAgc3RhdGljIG1ldGhvZCwgd2hpY2ggdGFrZXMgYSB0YWdnZWQgdGVtcGxhdGUuXG4gKiBAbW9kdWxlXG4gKiBAZXh0ZW5kcyBSYXN0aS5WaWV3XG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBPYmplY3QgY29udGFpbmluZyBvcHRpb25zLiBUaGUgZm9sbG93aW5nIGtleXMgd2lsbCBiZSBtZXJnZWQgdG8gYHRoaXNgOiBtb2RlbCwgc3RhdGUsIGtleSwgb25EZXN0cm95LCBvblJlbmRlciwgb25DcmVhdGUsIG9uQ2hhbmdlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGtleSBBIHVuaXF1ZSBrZXkgdG8gaWRlbnRpZnkgdGhlIGNvbXBvbmVudC4gVXNlZCB0byByZWN5Y2xlIGNoaWxkIGNvbXBvbmVudHMuXG4gKiBAcHJvcGVydHkge29iamVjdH0gbW9kZWwgQSBgUmFzdGkuTW9kZWxgIG9yIGFueSBlbWl0dGVyIG9iamVjdCBjb250YWluaW5nIGRhdGEgYW5kIGJ1c2luZXNzIGxvZ2ljLlxuICogQHByb3BlcnR5IHtvYmplY3R9IHN0YXRlIEEgYFJhc3RpLk1vZGVsYCBvciBhbnkgZW1pdHRlciBvYmplY3QgY29udGFpbmluZyBkYXRhIGFuZCBidXNpbmVzcyBsb2dpYywgdG8gYmUgdXNlZCBhcyBpbnRlcm5hbCBzdGF0ZS5cbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBDb21wb25lbnQsIE1vZGVsIH0gZnJvbSAncmFzdGknO1xuICogLy8gQ3JlYXRlIFRpbWVyIGNvbXBvbmVudC5cbiAqIGNvbnN0IFRpbWVyID0gQ29tcG9uZW50LmNyZWF0ZWBcbiAqICAgICA8ZGl2PlxuICogICAgICAgICBTZWNvbmRzOiA8c3Bhbj4keyh7IG1vZGVsIH0pID0+IG1vZGVsLnNlY29uZHN9PC9zcGFuPlxuICogICAgIDwvZGl2PlxuICogYDtcbiAqIC8vIENyZWF0ZSBtb2RlbCB0byBzdG9yZSBzZWNvbmRzLlxuICogY29uc3QgbW9kZWwgPSBuZXcgTW9kZWwoeyBzZWNvbmRzOiAwIH0pO1xuICogLy8gTW91bnQgdGltZXIgb24gYm9keS5cbiAqIFRpbWVyLm1vdW50KHsgbW9kZWwgfSwgZG9jdW1lbnQuYm9keSk7XG4gKiAvLyBJbmNyZW1lbnQgYG1vZGVsLnNlY29uZHNgIGV2ZXJ5IHNlY29uZC5cbiAqIHNldEludGVydmFsKCgpID0+IG1vZGVsLnNlY29uZHMrKywgMTAwMCk7XG4gKi9cbnZhciBDb21wb25lbnQgPSBleHBvcnRzW1wiZGVmYXVsdFwiXSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX1ZpZXcpIHtcbiAgZnVuY3Rpb24gQ29tcG9uZW50KCkge1xuICAgIHZhciBfdGhpcztcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgX3RoaXMgPSBfVmlldy5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgLy8gRXh0ZW5kIFwidGhpc1wiIHdpdGggb3B0aW9ucywgbWFwcGluZyBjb21wb25lbnRPcHRpb25zIGtleXMuXG4gICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAoY29tcG9uZW50T3B0aW9uc1trZXldKSBfdGhpc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgIH0pO1xuICAgIC8vIFN0b3JlIG9wdGlvbnMgYnkgZGVmYXVsdC5cbiAgICBfdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAvLyBCaW5kIG9uQ2hhbmdlIHRvIHRoaXMgdG8gYmUgdXNlZCBhcyBsaXN0ZW5lci5cbiAgICAvLyBTdG9yZSBib3VuZCB2ZXJzaW9uLCBzbyBpdCBjYW4gYmUgcmVtb3ZlZCBvbiBvbkRlc3Ryb3kgbWV0aG9kLlxuICAgIF90aGlzLm9uQ2hhbmdlID0gX3RoaXMub25DaGFuZ2UuYmluZChfdGhpcyk7XG4gICAgLy8gTGlzdGVuIHRvIG1vZGVsIGNoYW5nZXMgYW5kIGNhbGwgb25DaGFuZ2UuXG4gICAgaWYgKF90aGlzLm1vZGVsICYmIF90aGlzLm1vZGVsLm9uKSBfdGhpcy5tb2RlbC5vbignY2hhbmdlJywgX3RoaXMub25DaGFuZ2UpO1xuICAgIGlmIChfdGhpcy5zdGF0ZSAmJiBfdGhpcy5zdGF0ZS5vbikgX3RoaXMuc3RhdGUub24oJ2NoYW5nZScsIF90aGlzLm9uQ2hhbmdlKTtcbiAgICAvLyBDYWxsIGxpZmUgY3ljbGUgbWV0aG9kLlxuICAgIF90aGlzLm9uQ3JlYXRlLmFwcGx5KF90aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qXG4gICAqIE92ZXJyaWRlLiBXZSBkb24ndCB3YW50IHRvIGVuc3VyZSBhbiBlbGVtZW50IG9uIGluc3RhbnRpYXRpb24uXG4gICAqIFdlIHdpbGwgcHJvdmlkZSBpdCBsYXRlci5cbiAgICovXG4gIF9pbmhlcml0c0xvb3NlKENvbXBvbmVudCwgX1ZpZXcpO1xuICB2YXIgX3Byb3RvID0gQ29tcG9uZW50LnByb3RvdHlwZTtcbiAgX3Byb3RvLmVuc3VyZUVsZW1lbnQgPSBmdW5jdGlvbiBlbnN1cmVFbGVtZW50KCkge1xuICAgIC8vIElmIGVsIGlzIHByb3ZpZGVkLCBkZWxlZ2F0ZSBldmVudHMuXG4gICAgaWYgKHRoaXMuZWwpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGVFdmVudHMoKTtcbiAgICAgIHRoaXMuaWQgPSB0aGlzLmVsLmlkO1xuICAgIH1cbiAgICAvLyBFbnN1cmUgaWQuXG4gICAgaWYgKCF0aGlzLmlkKSB7XG4gICAgICB0aGlzLmlkID0gdGhpcy5hdHRyaWJ1dGVzICYmIHRoaXMuYXR0cmlidXRlcy5pZCA/XG4gICAgICAvLyBJZiBpZCBpcyBwcm92aWRlZCwgZXZhbHVhdGUgaXQuXG4gICAgICBldmFsRXhwcmVzc2lvbih0aGlzLmF0dHJpYnV0ZXMuaWQsIHRoaXMsIHRoaXMpIDpcbiAgICAgIC8vIEdlbmVyYXRlIGEgdW5pcXVlIGlkIGFuZCBzZXQgaXQgYXMgaWQgYXR0cmlidXRlLlxuICAgICAgQ29tcG9uZW50LklEX1RFTVBMQVRFKHRoaXMudWlkKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBGaW5kIHZpZXcncyBlbGVtZW50IG9uIHBhcmVudCBub2RlLCB1c2luZyBpZC5cbiAgICovO1xuICBfcHJvdG8uZmluZEVsZW1lbnQgPSBmdW5jdGlvbiBmaW5kRWxlbWVudChwYXJlbnQpIHtcbiAgICByZXR1cm4gKHBhcmVudCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvcihcIiNcIiArIHRoaXMuaWQpO1xuICB9XG5cbiAgLypcbiAgICogRXZhbCBhdHRyaWJ1dGVzIGV4cHJlc3Npb25zLlxuICAgKi87XG4gIF9wcm90by5nZXRBdHRyaWJ1dGVzID0gZnVuY3Rpb24gZ2V0QXR0cmlidXRlcygpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICB2YXIgYWRkID0ge1xuICAgICAgaWQ6IHRoaXMuaWRcbiAgICB9O1xuICAgIHZhciByZW1vdmUgPSB7fTtcbiAgICB2YXIgaHRtbCA9IFtcImlkPVxcXCJcIiArIHRoaXMuaWQgKyBcIlxcXCJcIl07XG4gICAgaWYgKHRoaXMuYXR0cmlidXRlcykge1xuICAgICAgT2JqZWN0LmtleXModGhpcy5hdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ2lkJykgcmV0dXJuO1xuICAgICAgICAvLyBFdmFsdWF0ZSBhdHRyaWJ1dGUgdmFsdWUuXG4gICAgICAgIHZhciB2YWx1ZSA9IGV2YWxFeHByZXNzaW9uKF90aGlzMi5hdHRyaWJ1dGVzW2tleV0sIF90aGlzMiwgX3RoaXMyKTtcblxuICAgICAgICAvLyBUcmFuc2Zvcm0gYm9vbCBhdHRyaWJ1dGUgdmFsdWVzXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZW1vdmVba2V5XSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRba2V5XSA9ICcnO1xuICAgICAgICAgIGh0bWwucHVzaChrZXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB2YWx1ZSA9ICcnO1xuICAgICAgICAgIGFkZFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgaHRtbC5wdXNoKGtleSArIFwiPVxcXCJcIiArIHZhbHVlICsgXCJcXFwiXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGFkZDogYWRkLFxuICAgICAgcmVtb3ZlOiByZW1vdmUsXG4gICAgICBodG1sOiBodG1sLmpvaW4oJyAnKVxuICAgIH07XG4gIH1cblxuICAvKlxuICAgKiBVc2VkIGludGVybmFsbHkgb24gdGhlIHJlbmRlciBwcm9jZXNzLlxuICAgKiBBdHRhY2ggdGhlIHZpZXcgdG8gdGhlIGRvbSBlbGVtZW50LlxuICAgKi87XG4gIF9wcm90by5oeWRyYXRlID0gZnVuY3Rpb24gaHlkcmF0ZShwYXJlbnQpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcbiAgICB0aGlzLmVsID0gdGhpcy5maW5kRWxlbWVudChwYXJlbnQpO1xuICAgIHRoaXMuZGVsZWdhdGVFdmVudHMoKTtcbiAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICByZXR1cm4gY2hpbGQuaHlkcmF0ZShfdGhpczMuZWwpO1xuICAgIH0pO1xuICAgIHRoaXMub25SZW5kZXIuY2FsbCh0aGlzLCAnaHlkcmF0ZScpO1xuICB9XG5cbiAgLypcbiAgICogVXNlZCBpbnRlcm5hbGx5IG9uIHRoZSByZW5kZXIgcHJvY2Vzcy5cbiAgICogUmV1c2UgYSB2aWV3IHRoYXQgaGFzIGBrZXlgIHdoZW4gaXRzIHBhcmVudCBpcyByZW5kZXJlZC5cbiAgICovO1xuICBfcHJvdG8ucmVjeWNsZSA9IGZ1bmN0aW9uIHJlY3ljbGUocGFyZW50KSB7XG4gICAgLy8gRmluZCBlbGVtZW50IHRvIGJlIHJlcGxhY2VkLiBJdCBoYXMgc2FtZSBpZC5cbiAgICB2YXIgdG9CZVJlcGxhY2VkID0gdGhpcy5maW5kRWxlbWVudChwYXJlbnQpO1xuICAgIC8vIFJlcGxhY2UgaXQgd2l0aCB0aGlzLmVsLlxuICAgIHRvQmVSZXBsYWNlZC5yZXBsYWNlV2l0aCh0aGlzLmVsKTtcbiAgICAvLyBDYWxsIGBvblJlbmRlcmAgbGlmZWN5Y2xlIG1ldGhvZC5cbiAgICB0aGlzLm9uUmVuZGVyLmNhbGwodGhpcywgJ3JlY3ljbGUnKTtcbiAgfVxuXG4gIC8qXG4gICAqIE92ZXJyaWRlLiBBZGQgc29tZSBjdXN0b20gbG9naWMgdG8gc3VwZXIgYGRlc3Ryb3lgIG1ldGhvZC5cbiAgICovO1xuICBfcHJvdG8uZGVzdHJveSA9IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgX1ZpZXcucHJvdG90eXBlLmRlc3Ryb3kuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAvLyBTdG9wIGxpc3RlbmluZyB0byBgY2hhbmdlYC5cbiAgICAvLyBTZXQgZGVzdHJveWVkIGZsYWcgdG8gcHJldmVudCBhIGxhc3QgcmVuZGVyIGFmdGVyIGRlc3Ryb3llZC4gVE9ETzogUmV2aWV3XG4gICAgaWYgKHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5vZmYpIHRoaXMubW9kZWwub2ZmKCdjaGFuZ2UnLCB0aGlzLm9uQ2hhbmdlKTtcbiAgICBpZiAodGhpcy5zdGF0ZSAmJiB0aGlzLnN0YXRlLm9mZikgdGhpcy5zdGF0ZS5vZmYoJ2NoYW5nZScsIHRoaXMub25DaGFuZ2UpO1xuICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaWZlY3ljbGUgbWV0aG9kLiBDYWxsZWQgd2hlbiB0aGUgdmlldyBpcyBjcmVhdGVkIGF0IHRoZSBlbmQgb2YgdGhlIGNvbnN0cnVjdG9yLlxuICAgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0fSBUaGUgdmlldyBvcHRpb25zLlxuICAgKi87XG4gIF9wcm90by5vbkNyZWF0ZSA9IGZ1bmN0aW9uIG9uQ3JlYXRlKCkge31cblxuICAvKipcbiAgICogTGlmZWN5Y2xlIG1ldGhvZC4gQ2FsbGVkIHdoZW4gbW9kZWwgZW1pdHMgYGNoYW5nZWAgZXZlbnQuXG4gICAqIEJ5IGRlZmF1bHQgY2FsbHMgcmVuZGVyIG1ldGhvZC5cbiAgICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIGV4dGVuZGVkIHdpdGggY3VzdG9tIGxvZ2ljLlxuICAgKiBNYXliZSBjb21wYXJpbmcgbmV3IGF0dHJpYnV0ZXMgd2l0aCBwcmV2aW91cyBvbmVzIGFuZCBjYWxsaW5nXG4gICAqIHJlbmRlciB3aGVuIG5lZWRlZC4gT3IgZG9pbmcgc29tZSBkb20gdHJhbnNmb3JtYXRpb24uXG4gICAqIEBwYXJhbSBtb2RlbCB7UmFzdGkuTW9kZWx9IFRoZSBtb2RlbCB0aGF0IGVtaXR0ZWQgdGhlIGV2ZW50LlxuICAgKiBAcGFyYW0gY2hhbmdlZCB7b2JqZWN0fSBPYmplY3QgY29udGFpbmluZyBrZXlzIGFuZCB2YWx1ZXMgdGhhdCBoYXMgY2hhbmdlZC5cbiAgICogQHBhcmFtIFsuLi5hcmdzXSB7YW55fSBBbnkgZXh0cmEgYXJndW1lbnRzIHBhc3NlZCB0byBzZXQgbWV0aG9kLlxuICAgKi87XG4gIF9wcm90by5vbkNoYW5nZSA9IGZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogTGlmZWN5Y2xlIG1ldGhvZC4gQ2FsbGVkIHdoZW4gdGhlIHZpZXcgaXMgcmVuZGVyZWQuXG4gICAqIEBwYXJhbSB0eXBlIHtzdHJpbmd9IFRoZSByZW5kZXIgdHlwZS4gQ2FuIGJlIGByZW5kZXJgLCBgaHlkcmF0ZWAgb3IgYHJlY3ljbGVgLlxuICAgKi87XG4gIF9wcm90by5vblJlbmRlciA9IGZ1bmN0aW9uIG9uUmVuZGVyKCkge31cblxuICAvKipcbiAgICogTGlmZWN5Y2xlIG1ldGhvZC4gQ2FsbGVkIHdoZW4gdGhlIHZpZXcgaXMgZGVzdHJveWVkLlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBPcHRpb25zIG9iamVjdCBvciBhbnkgYXJndW1lbnRzIHBhc3NlZCB0byBgZGVzdHJveWAgbWV0aG9kLlxuICAgKi87XG4gIF9wcm90by5vbkRlc3Ryb3kgPSBmdW5jdGlvbiBvbkRlc3Ryb3koKSB7fVxuXG4gIC8qXG4gICAqIFJlcGxhY2UgZXhwcmVzc2lvbnMuXG4gICAqLztcbiAgX3Byb3RvLnJlcGxhY2VFeHByZXNzaW9ucyA9IGZ1bmN0aW9uIHJlcGxhY2VFeHByZXNzaW9ucyhzdHJpbmcsIGFkZENoaWxkKSB7XG4gICAgdmFyIF90aGlzNCA9IHRoaXM7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKG5ldyBSZWdFeHAoQ29tcG9uZW50LkVYUFJFU1NJT05fUExBQ0VIT0xERVJfVEVNUExBVEUoJyhcXFxcZCspJyksICdnJyksIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgdmFyIGV4cHJlc3Npb24gPSBnZXRFeHByZXNzaW9uKG1hdGNoLCBfdGhpczQudGVtcGxhdGUuZXhwcmVzc2lvbnMpO1xuICAgICAgLy8gRXZhbCBleHByZXNzaW9uLiBQYXNzIHZpZXcgYXMgYXJndW1lbnQuXG4gICAgICB2YXIgcmVzdWx0ID0gZXZhbEV4cHJlc3Npb24oZXhwcmVzc2lvbiwgX3RoaXM0LCBfdGhpczQpO1xuICAgICAgLy8gVHJlYXQgYWxsIGV4cHJlc3Npb25zIGFzIGFycmF5cy5cbiAgICAgIHZhciByZXN1bHRzID0gcmVzdWx0IGluc3RhbmNlb2YgQXJyYXkgPyByZXN1bHQgOiBbcmVzdWx0XTtcbiAgICAgIC8vIFJlcGxhY2UgZXhwcmVzc2lvbiB3aXRoIHRoZSByZXN1bHQgb2YgdGhlIGV2YWx1YXRpb24uXG4gICAgICByZXR1cm4gcmVzdWx0cy5yZWR1Y2UoZnVuY3Rpb24gKG91dCwgcmVzdWx0KSB7XG4gICAgICAgIHZhciBwYXJzZWQ7XG4gICAgICAgIC8vIElmIHJlc3VsdCBpcyB0cnVlLCByZXBsYWNlIGl0IHdpdGggYSBwbGFjZWhvbGRlci5cbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkgcGFyc2VkID0gQ29tcG9uZW50LlRSVUVfUExBQ0VIT0xERVI7XG4gICAgICAgIC8vIElmIHJlc3VsdCBpcyBmYWxzZSwgcmVwbGFjZSBpdCB3aXRoIGEgcGxhY2Vob2xkZXIuXG4gICAgICAgIGVsc2UgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHBhcnNlZCA9IENvbXBvbmVudC5GQUxTRV9QTEFDRUhPTERFUjtcbiAgICAgICAgLy8gUmVwbGFjZSBudWxsIG9yIHVuZGVmaW5lZCB3aXRoIGVtcHR5IHN0cmluZy5cbiAgICAgICAgZWxzZSBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgPT09ICd1bmRlZmluZWQnKSBwYXJzZWQgPSAnJztcbiAgICAgICAgLy8gSWYgcmVzdWx0IGlzIGEgdmlldywgY2FsbCBhZGRDaGlsZCBjYWxsYmFjay5cbiAgICAgICAgZWxzZSBpZiAocmVzdWx0ICYmIHR5cGVvZiByZXN1bHQucmVuZGVyID09PSAnZnVuY3Rpb24nKSBwYXJzZWQgPSBhZGRDaGlsZChyZXN1bHQpO1xuICAgICAgICAvLyBSZXR1cm4gZXhwcmVzc2lvbiBpdHNlbGYuXG4gICAgICAgIGVsc2UgcGFyc2VkID0gcmVzdWx0O1xuICAgICAgICAvLyBDb25jYXRlbmF0ZSBleHByZXNzaW9ucy5cbiAgICAgICAgcmV0dXJuIG91dCArIHBhcnNlZDtcbiAgICAgIH0sICcnKTtcbiAgICB9KVxuICAgIC8vIFJlcGxhY2UgYGF0dHJpYnV0ZT1cInRydWVcImAgd2l0aCBgYXR0cmlidXRlYFxuICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoW2Etel0rKT1bXFxcInwnXVwiICsgQ29tcG9uZW50LlRSVUVfUExBQ0VIT0xERVIgKyBcIltcXFwifCddXCIsICdnJyksICckMScpXG4gICAgLy8gUmVwbGFjZSBgYXR0cmlidXRlPVwiZmFsc2VcImAgd2l0aCBlbXB0eSBzdHJpbmcuXG4gICAgLnJlcGxhY2UobmV3IFJlZ0V4cChcIihbYS16XSspPVtcXFwifCddXCIgKyBDb21wb25lbnQuRkFMU0VfUExBQ0VIT0xERVIgKyBcIltcXFwifCddXCIsICdnJyksICcnKVxuICAgIC8vIFJlcGxhY2UgcmVzdCBvZiBmYWxzZSBleHByZXNzaW9ucyB3aXRoIGVtcHR5IHN0cmluZy5cbiAgICAucmVwbGFjZShuZXcgUmVnRXhwKENvbXBvbmVudC5GQUxTRV9QTEFDRUhPTERFUiwgJ2cnKSwgJycpO1xuICB9XG5cbiAgLypcbiAgICogVHJlYXQgdGhlIHdob2xlIHZpZXcgYXMgYSBIVE1MIHN0cmluZy5cbiAgICovO1xuICBfcHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICB2YXIgX3RoaXM1ID0gdGhpcztcbiAgICAvLyBOb3JtYWxseSB0aGVyZSB3b24ndCBiZSBhbnkgY2hpbGRyZW4sIGJ1dCBpZiB0aGVyZSBhcmUsIGRlc3Ryb3kgdGhlbS5cbiAgICB0aGlzLmRlc3Ryb3lDaGlsZHJlbigpO1xuICAgIC8vIEdldCB0YWcgbmFtZS5cbiAgICB2YXIgdGFnID0gdGhpcy50YWcgfHwgJ2Rpdic7XG4gICAgLy8gR2V0IGF0dHJpYnV0ZXMuXG4gICAgdmFyIGF0dHJpYnV0ZXMgPSB0aGlzLmdldEF0dHJpYnV0ZXMoKS5odG1sO1xuICAgIC8vIFJlcGxhY2UgZXhwcmVzc2lvbnMgb2YgaW5uZXIgdGVtcGxhdGUuXG4gICAgdmFyIGlubmVyID0gdGhpcy50ZW1wbGF0ZSAmJiB0aGlzLnRlbXBsYXRlLmlubmVyICYmIHRoaXMucmVwbGFjZUV4cHJlc3Npb25zKHRoaXMudGVtcGxhdGUuaW5uZXIsIGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgIC8vIEFkZCBjaGlsZCBjb21wb25lbnQuXG4gICAgICByZXR1cm4gX3RoaXM1LmFkZENoaWxkKGNvbXBvbmVudCk7XG4gICAgfSk7XG4gICAgLy8gR2VuZXJhdGUgb3V0ZXIgdGVtcGxhdGUuXG4gICAgcmV0dXJuIGlubmVyID8gXCI8XCIgKyB0YWcgKyBcIiBcIiArIGF0dHJpYnV0ZXMgKyBcIj5cIiArIGlubmVyICsgXCI8L1wiICsgdGFnICsgXCI+XCIgOiBcIjxcIiArIHRhZyArIFwiIFwiICsgYXR0cmlidXRlcyArIFwiIC8+XCI7XG4gIH1cblxuICAvKlxuICAgKiBWaWV3IHJlbmRlciBtZXRob2QuXG4gICAqLztcbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgX3RoaXM2ID0gdGhpcztcbiAgICAvLyBQcmV2ZW50IGEgbGFzdCByZSByZW5kZXIgaWYgdmlldyBpcyBhbHJlYWR5IGRlc3Ryb3llZC5cbiAgICBpZiAodGhpcy5kZXN0cm95ZWQpIHJldHVybiB0aGlzO1xuICAgIC8vIElmIGB0aGlzLmVsYCBpcyBub3QgcHJlc2VudCwgY3JlYXRlIGEgbmV3IGB0aGlzLnRhZ2AgZWxlbWVudC5cbiAgICBpZiAoIXRoaXMuZWwpIHtcbiAgICAgIHRoaXMuZWwgPSB0aGlzLmNyZWF0ZUVsZW1lbnQodGhpcy50YWcpO1xuICAgICAgdGhpcy5kZWxlZ2F0ZUV2ZW50cygpO1xuICAgIH1cbiAgICAvLyBTZXQgYHRoaXMuZWxgIGF0dHJpYnV0ZXMuXG4gICAgdmFyIGF0dHJpYnV0ZXMgPSB0aGlzLmdldEF0dHJpYnV0ZXMoKTtcbiAgICAvLyBSZW1vdmUgYXR0cmlidXRlcy5cbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzLnJlbW92ZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBfdGhpczYuZWwucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgfSk7XG4gICAgLy8gQWRkIGF0dHJpYnV0ZXMuXG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcy5hZGQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgX3RoaXM2LmVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXMuYWRkW2tleV0pO1xuICAgIH0pO1xuICAgIC8vIENoZWNrIGZvciBgdGVtcGxhdGUuaW5uZXJgIHRvIHNlZSBpZiB2aWV3IGhhcyBpbm5lckhUTUwuXG4gICAgaWYgKHRoaXMudGVtcGxhdGUgJiYgdGhpcy50ZW1wbGF0ZS5pbm5lcikge1xuICAgICAgdmFyIHByZXZpb3VzQ2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuO1xuICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAgICAgdmFyIG5leHRDaGlsZHJlbiA9IFtdO1xuICAgICAgdmFyIHJlY3ljbGVkQ2hpbGRyZW4gPSBbXTtcbiAgICAgIC8vIFN0b3JlIGFjdGl2ZSBlbGVtZW50LlxuICAgICAgdmFyIGFjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgLy8gUmVwbGFjZSBleHByZXNzaW9ucy4gU2V0IGh0bWwgaW5zaWRlIG9mIGB0aGlzLmVsYC5cbiAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gdGhpcy5yZXBsYWNlRXhwcmVzc2lvbnModGhpcy50ZW1wbGF0ZS5pbm5lciwgZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgICAgICB2YXIgb3V0ID0gY29tcG9uZW50O1xuICAgICAgICAvLyBDaGVjayBpZiBjaGlsZCBhbHJlYWR5IGV4aXN0cy5cbiAgICAgICAgdmFyIGZvdW5kID0gY29tcG9uZW50LmtleSAmJiBwcmV2aW91c0NoaWxkcmVuLmZpbmQoZnVuY3Rpb24gKHByZXZpb3VzQ2hpbGQpIHtcbiAgICAgICAgICByZXR1cm4gcHJldmlvdXNDaGlsZC5rZXkgPT09IGNvbXBvbmVudC5rZXk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICB2YXIgdGFnID0gZm91bmQuZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIHZhciBpZCA9IGZvdW5kLmVsLmlkO1xuICAgICAgICAgIC8vIElmIGNoaWxkIGFscmVhZHkgZXhpc3RzLCByZXBsYWNlIGl0IGh0bWwgYnkgaXRzIHJvb3QgZWxlbWVudC5cbiAgICAgICAgICBvdXQgPSBcIjxcIiArIHRhZyArIFwiIGlkPVxcXCJcIiArIGlkICsgXCJcXFwiPjwvXCIgKyB0YWcgKyBcIj5cIjtcbiAgICAgICAgICAvLyBBZGQgY2hpbGQgdG8gcmVjeWNsZWQgY2hpbGRyZW4uXG4gICAgICAgICAgcmVjeWNsZWRDaGlsZHJlbi5wdXNoKGZvdW5kKTtcbiAgICAgICAgICAvLyBEZXN0cm95IG5ldyBjaGlsZCBjb21wb25lbnQuIFVzZSByZWN5Y2xlZCBvbmUgaW5zdGVhZC5cbiAgICAgICAgICBjb21wb25lbnQuZGVzdHJveSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE5vdCBmb3VuZC4gQWRkIG5ldyBjaGlsZCBjb21wb25lbnQuXG4gICAgICAgICAgbmV4dENoaWxkcmVuLnB1c2goY29tcG9uZW50KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDb21wb25lbnQgaHRtbC5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgIH0pO1xuICAgICAgLy8gQWRkIG5ldyBjaGlsZHJlbi4gSHlkcmF0ZSB0aGVtLlxuICAgICAgbmV4dENoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKG5leHRDaGlsZCkge1xuICAgICAgICBfdGhpczYuYWRkQ2hpbGQobmV4dENoaWxkKS5oeWRyYXRlKF90aGlzNi5lbCk7XG4gICAgICB9KTtcbiAgICAgIC8vIFJlcGxhY2UgY2hpbGRyZW4gcm9vdCBlbGVtZW50cyB3aXRoIHJlY3ljbGVkIGNvbXBvbmVudHMuXG4gICAgICByZWN5Y2xlZENoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKHJlY3ljbGVkQ2hpbGQpIHtcbiAgICAgICAgX3RoaXM2LmFkZENoaWxkKHJlY3ljbGVkQ2hpbGQpLnJlY3ljbGUoX3RoaXM2LmVsKTtcbiAgICAgIH0pO1xuICAgICAgLy8gRGVzdHJveSB1bnVzZWQgY2hpbGRyZW4uXG4gICAgICBwcmV2aW91c0NoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKHByZXZpb3VzQ2hpbGQpIHtcbiAgICAgICAgdmFyIGZvdW5kID0gcmVjeWNsZWRDaGlsZHJlbi5pbmRleE9mKHByZXZpb3VzQ2hpbGQpID4gLTE7XG4gICAgICAgIGlmICghZm91bmQpIHByZXZpb3VzQ2hpbGQuZGVzdHJveSgpO1xuICAgICAgfSk7XG4gICAgICAvLyBSZXN0b3JlIGZvY3VzLlxuICAgICAgaWYgKHRoaXMuZWwuY29udGFpbnMoYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgYWN0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBDYWxsIG9uUmVuZGVyIGxpZmVjeWNsZSBtZXRob2QuXG4gICAgdGhpcy5vblJlbmRlci5jYWxsKHRoaXMsICdyZW5kZXInKTtcbiAgICAvLyBSZXR1cm4gdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIG1ldGhvZCB1c2VkIHRvIGV4dGVuZCBhIGBDb21wb25lbnRgLCBjcmVhdGluZyBhIHN1YmNsYXNzLlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3QgT2JqZWN0IGNvbnRhaW5pbmcgbWV0aG9kcyB0byBiZSBhZGRlZCB0byB0aGUgbmV3IGBDb21wb25lbnRgIHN1YmNsYXNzLiBBbHNvIGNhbiBiZSBhIGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXMgdGhlIHBhcmVudCBwcm90b3R5cGUgYW5kIHJldHVybnMgYW4gb2JqZWN0LlxuICAgKi87XG4gIENvbXBvbmVudC5leHRlbmQgPSBmdW5jdGlvbiBleHRlbmQob2JqZWN0KSB7XG4gICAgdmFyIEN1cnJlbnQgPSB0aGlzO1xuICAgIHZhciBFeHRlbmRlZCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0N1cnJlbnQpIHtcbiAgICAgIGZ1bmN0aW9uIEV4dGVuZGVkKCkge1xuICAgICAgICByZXR1cm4gX0N1cnJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgfVxuICAgICAgX2luaGVyaXRzTG9vc2UoRXh0ZW5kZWQsIF9DdXJyZW50KTtcbiAgICAgIHJldHVybiBFeHRlbmRlZDtcbiAgICB9KEN1cnJlbnQpO1xuICAgIE9iamVjdC5hc3NpZ24oRXh0ZW5kZWQucHJvdG90eXBlLCB0eXBlb2Ygb2JqZWN0ID09PSAnZnVuY3Rpb24nID8gb2JqZWN0KEN1cnJlbnQucHJvdG90eXBlKSA6IG9iamVjdCk7XG4gICAgcmV0dXJuIEV4dGVuZGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vdW50IHRoZSBjb21wb25lbnQgaW50byB0aGUgZG9tLlxuICAgKiBJdCBpbnN0YW50aWF0ZSB0aGUgQ29tcG9uZW50IHZpZXcgdXNpbmcgb3B0aW9ucywgXG4gICAqIGFwcGVuZHMgaXRzIGVsZW1lbnQgaW50byB0aGUgRE9NIChpZiBgZWxgIGlzIHByb3ZpZGVkKS5cbiAgICogQW5kIHJldHVybnMgdGhlIHZpZXcgaW5zdGFuY2UuXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgVGhlIHZpZXcgb3B0aW9ucy5cbiAgICogQHBhcmFtIHtub2RlfSBlbCBEb20gZWxlbWVudCB0byBhcHBlbmQgdGhlIHZpZXcgZWxlbWVudC5cbiAgICogQHBhcmFtIHtib29sZWFufSBoeWRyYXRlIElmIHRydWUsIHRoZSB2aWV3IHdpbGwgdXNlIGV4aXN0aW5nIGh0bWwuXG4gICAqIEByZXR1cm4ge1Jhc3RpLkNvbXBvbmVudH1cbiAgICovO1xuICBDb21wb25lbnQubW91bnQgPSBmdW5jdGlvbiBtb3VudChvcHRpb25zLCBlbCwgaHlkcmF0ZSkge1xuICAgIC8vIEluc3RhbnRpYXRlIHZpZXcuXG4gICAgdmFyIHZpZXcgPSBuZXcgdGhpcyhvcHRpb25zKTtcbiAgICAvLyBJZiBgZWxgIGlzIHBhc3NlZCwgbW91bnQgY29tcG9uZW50LlxuICAgIGlmIChlbCkge1xuICAgICAgaWYgKGh5ZHJhdGUpIHtcbiAgICAgICAgdmlldy50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICAgICAgLy8gQWRkIGh0bWwgdGV4dCBpbnRvIGVsZW1lbnQgaW5uZXIgaHRtbC5cbiAgICAgICAgZnJhZ21lbnQuaW5uZXJIVE1MID0gdmlldztcbiAgICAgICAgLy8gQWRkIHRvIGRvbS5cbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQoZnJhZ21lbnQuY29udGVudCk7XG4gICAgICB9XG4gICAgICB2aWV3Lmh5ZHJhdGUoZWwpO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gdmlldyBpbnN0YW5jZS5cbiAgICByZXR1cm4gdmlldztcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIHRhZ2dlZCB0ZW1wbGF0ZSBjb250YWluaW5nIGFuIEhUTUwgc3RyaW5nLCBcbiAgICogYW5kIHJldHVybnMgYSBuZXcgYENvbXBvbmVudGAgY2xhc3MuXG4gICAqIC0gVGhlIHRlbXBsYXRlIG91dGVyIHRhZyBhbmQgYXR0cmlidXRlcyB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlIHRoZSB2aWV3J3Mgcm9vdCBlbGVtZW50LlxuICAgKiAtIEJvb2xlYW4gYXR0cmlidXRlcyBzaG91bGQgYmUgcGFzc2VkIGluIHRoZSBmb3JtIG9mIGBhdHRyaWJ1dGU9XCIkeygpID0+IHRydWV9XCJgLlxuICAgKiAtIEV2ZW50IGhhbmRsZXJzIHNob3VsZCBiZSBwYXNzZWQsIGF0IHRoZSByb290IGVsZW1lbnQsIGluIHRoZSBmb3JtIG9mIGBvbkV2ZW50TmFtZT0ke3snc2VsZWN0b3InIDogbGlzdGVuZXIgfX1gLiBXaGVyZSBgc2VsZWN0b3JgIGlzIGEgY3NzIHNlbGVjdG9yLiBUaGUgZXZlbnQgd2lsbCBiZSBkZWxlZ2F0ZWQgdG8gdGhlIHZpZXcncyByb290IGVsZW1lbnQuXG4gICAqIC0gVGhlIHRlbXBsYXRlIGlubmVyIEhUTUwgd2lsbCBiZSB1c2VkIGFzIHRoZSB2aWV3J3MgdGVtcGxhdGUuXG4gICAqIC0gVGVtcGxhdGUgaW50ZXJwb2xhdGlvbnMgdGhhdCBhcmUgZnVuY3Rpb25zIHdpbGwgYmUgZXZhbHVhdGVkIG9uIHRoZSByZW5kZXIgcHJvY2Vzcy4gUmVjZWl2aW5nIHRoZSB2aWV3IGluc3RhbmNlIGFzIGFyZ3VtZW50LiBBbmQgYmVpbmcgYm91bmQgdG8gaXQuXG4gICAqIC0gSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgYG51bGxgLCBgdW5kZWZpbmVkYCwgYGZhbHNlYCBvciBlbXB0eSBzdHJpbmcsIHRoZSBpbnRlcnBvbGF0aW9uIHdvbid0IHJlbmRlciBhbnkgY29udGVudC5cbiAgICogLSBJZiB0aGUgZnVuY3Rpb24gcmV0dXJucyBhIGNvbXBvbmVudCBpbnN0YW5jZSwgaXQgd2lsbCBiZSBhZGRlZCBhcyBhIGNoaWxkIGNvbXBvbmVudC5cbiAgICogLSBJZiB0aGUgZnVuY3Rpb24gcmV0dXJucyBhbiBhcnJheSwgZWFjaCBpdGVtIHdpbGwgYmUgZXZhbHVhdGVkIGFzIGFib3ZlLlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBIVE1MIHRlbXBsYXRlIGZvciB0aGUgY29tcG9uZW50LlxuICAgKiBAcmV0dXJuIHtSYXN0aS5Db21wb25lbnR9XG4gICAqLztcbiAgQ29tcG9uZW50LmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShzdHJpbmdzKSB7XG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBleHByZXNzaW9ucyA9IG5ldyBBcnJheShfbGVuMiA+IDEgPyBfbGVuMiAtIDEgOiAwKSwgX2tleTIgPSAxOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICBleHByZXNzaW9uc1tfa2V5MiAtIDFdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG4gICAgdmFyIHBhcnRzID0gW107XG4gICAgLy8gUmVwbGFjZSBmdW5jdGlvbnMgYW5kIG9iamVjdHMgaW50ZXJwb2xhdGlvbnMgd2l0aCBge251bWJlcn1gLlxuICAgIC8vIFdoZXJlIGBudW1iZXJgIGlzIHRoZSBpbmRleCBvbiBleHByZXNzaW9ucyBhcnJheS5cbiAgICBzdHJpbmdzLmZvckVhY2goZnVuY3Rpb24gKHN0cmluZywgaSkge1xuICAgICAgLy8gQWRkIHN0cmluZyBwYXJ0LlxuICAgICAgcGFydHMucHVzaChzdHJpbmcpO1xuICAgICAgLy8gQWRkIGV4cHJlc3Npb24gcGxhY2Vob2xkZXIgZm9yIGxhdGVyIG9yIGV4cHJlc3Npb24gZXZhbC5cbiAgICAgIGlmIChleHByZXNzaW9uc1tpXSkge1xuICAgICAgICBwYXJ0cy5wdXNoKHR5cGVvZiBleHByZXNzaW9uc1tpXSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZXhwcmVzc2lvbnNbaV0gPT09ICdvYmplY3QnID8gQ29tcG9uZW50LkVYUFJFU1NJT05fUExBQ0VIT0xERVJfVEVNUExBVEUoaSkgOiBleHByZXNzaW9uc1tpXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gQ3JlYXRlIG91dHB1dCB0ZXh0IGZvciBtYWluIHRlbXBsYXRlLlxuICAgIHZhciBtYWluID0gcGFydHMuam9pbignJykudHJpbSgpLnJlcGxhY2UoL1xcbi9nLCAnJyk7XG4gICAgLy8gRXh0cmFjdCBvdXRlciB0YWcsIGF0dHJpYnV0ZXMgYW5kIGlubmVyIGh0bWwuXG4gICAgdmFyIHJlc3VsdCA9IG1haW4ubWF0Y2goL148KFthLXpdKykoLio/KT4oLiopPFxcL1xcMT4kLykgfHwgbWFpbi5tYXRjaCgvXjwoW2Etel0rKSguKj8pXFwvPiQvKTtcbiAgICAvLyBQYXJzZSBhdHRyaWJ1dGVzIGZyb20gaHRtbCB0ZXh0IGludG8gYW4gb2JqZWN0LlxuICAgIHZhciBhdHRyaWJ1dGVzID0gZXh0cmFjdEF0dHJpYnV0ZXMocmVzdWx0WzJdKTtcbiAgICAvLyBFdmVudHMgdG8gYmUgZGVsZWdhdGVkLlxuICAgIHZhciBldmVudHMgPSB7fTtcbiAgICAvLyBGaWx0ZXIgZXZlbnRzLiBUbyBnZW5lcmF0ZSBldmVudHMgb2JqZWN0LlxuICAgIC8vIEdlbmVyYXRlIGF0dHJpYnV0ZXMgb2JqZWN0LCByZXBsYWNlIHBsYWNlaG9sZGVycyB3aXRoIGV4cHJlc3Npb25zLlxuICAgIGF0dHJpYnV0ZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5yZWR1Y2UoZnVuY3Rpb24gKG91dCwga2V5KSB7XG4gICAgICAvLyBJcyBFdmVudD9cbiAgICAgIHZhciBtYXRjaEtleSA9IGtleS5tYXRjaCgvb24oKFtBLVpdezF9W2Etel0rKSspLyk7XG4gICAgICAvLyBJcyBwbGFjZWhvbGRlciBmb3IgZnVuY3Rpb24gb3Igb2JqZWN0P1xuICAgICAgLy8gR2V0IGV4cHJlc3Npb24gb3IgdmFsdWUuXG4gICAgICB2YXIgdmFsdWUgPSBnZXRFeHByZXNzaW9uKGF0dHJpYnV0ZXNba2V5XSwgZXhwcmVzc2lvbnMpO1xuICAgICAgLy8gSXMgZXZlbnQgaGFuZGxlci4gQWRkIHRvIGV2ZW50cyBvYmplY3QuXG4gICAgICBpZiAobWF0Y2hLZXkgJiYgbWF0Y2hLZXlbMV0pIHtcbiAgICAgICAgdmFyIGV2ZW50VHlwZSA9IG1hdGNoS2V5WzFdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgIHJldHVybiBldmVudHNbXCJcIiArIGV2ZW50VHlwZSArIChzZWxlY3RvciA9PT0gJyYnID8gJycgOiBcIiBcIiArIHNlbGVjdG9yKV0gPSB2YWx1ZVtzZWxlY3Rvcl07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgfVxuICAgICAgLy8gSXMgYXR0cmlidXRlLiBBZGQgdG8gYXR0cmlidXRlcyBvYmplY3QuXG4gICAgICBvdXRba2V5XSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIG91dDtcbiAgICB9LCB7fSk7XG4gICAgdmFyIEN1cnJlbnQgPSB0aGlzO1xuICAgIC8vIENyZWF0ZSBzdWJjbGFzcyBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAgcmV0dXJuIEN1cnJlbnQuZXh0ZW5kKHtcbiAgICAgIC8vIFNldCBldmVudHMuXG4gICAgICBldmVudHM6IGV2ZW50cyxcbiAgICAgIC8vIFNldCBhdHRyaWJ1dGVzLlxuICAgICAgYXR0cmlidXRlczogYXR0cmlidXRlcyxcbiAgICAgIC8vIFNldCB0ZW1wbGF0ZS5cbiAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgIC8vIFRlbXBsYXRlIGZvciBpbm5lckhUTUwgb2Ygcm9vdCBlbGVtZW50LlxuICAgICAgICBpbm5lcjogcmVzdWx0WzNdLFxuICAgICAgICAvLyBUZW1wbGF0ZSBleHByZXNzaW9ucy5cbiAgICAgICAgZXhwcmVzc2lvbnM6IGV4cHJlc3Npb25zXG4gICAgICB9LFxuICAgICAgLy8gU2V0IHJvb3QgZWxlbWVudCB0YWcuXG4gICAgICB0YWc6IHJlc3VsdFsxXVxuICAgIH0pO1xuICB9O1xuICByZXR1cm4gQ29tcG9uZW50O1xufShfVmlldzJbXCJkZWZhdWx0XCJdKTtcbkNvbXBvbmVudC5JRF9URU1QTEFURSA9IGZ1bmN0aW9uICh1aWQpIHtcbiAgcmV0dXJuIFwicmFzdGktY29tcG9uZW50LVwiICsgdWlkO1xufTtcbkNvbXBvbmVudC5FWFBSRVNTSU9OX1BMQUNFSE9MREVSX1RFTVBMQVRFID0gZnVuY3Rpb24gKGlkeCkge1xuICByZXR1cm4gXCJfX1JBU1RJX0VYUFJFU1NJT057XCIgKyBpZHggKyBcIn1cIjtcbn07XG5Db21wb25lbnQuVFJVRV9QTEFDRUhPTERFUiA9ICdfX1JBU1RJX1RSVUUnO1xuQ29tcG9uZW50LkZBTFNFX1BMQUNFSE9MREVSID0gJ19fUkFTVElfRkFMU0UnOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG4vKipcbiAqIGBFbWl0dGVyYCBpcyBhIGNsYXNzIHRoYXQgcHJvdmlkZXMgYW4gZWFzeSB3YXkgdG8gaW1wbGVtZW50IHRoZSBvYnNlcnZlciBwYXR0ZXJuIFxuICogaW4geW91ciBhcHBsaWNhdGlvbnMuICBcbiAqIEl0IGNhbiBiZSBleHRlbmRlZCB0byBjcmVhdGUgbmV3IGNsYXNzZXMgdGhhdCBoYXZlIHRoZSBhYmlsaXR5IHRvIGVtaXQgYW5kIGJpbmQgY3VzdG9tIG5hbWVkIGV2ZW50cy4gICBcbiAqIEVtaXR0ZXIgaXMgdXNlZCBieSBgTW9kZWxgIGFuZCBgVmlld2AgY2xhc3Nlcywgd2hpY2ggaW5oZXJpdCBmcm9tIGl0IHRvIGltcGxlbWVudCBcbiAqIGV2ZW50LWRyaXZlbiBmdW5jdGlvbmFsaXR5LlxuICpcbiAqIEBtb2R1bGVcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSAncmFzdGknO1xuICogLy8gQ3VzdG9tIGNhcnRcbiAqIGNsYXNzIFNob3BwaW5nQ2FydCBleHRlbmRzIEVtaXR0ZXIge1xuICogICAgIGNvbnN0cnVjdG9yKCkge1xuICogICAgICAgICBzdXBlcigpO1xuICogICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gKiAgICAgfVxuICpcbiAqICAgICBhZGRJdGVtKGl0ZW0pIHtcbiAqICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xuICogICAgICAgICAvLyBFbWl0IGEgY3VzdG9tIGV2ZW50IGNhbGxlZCBgaXRlbUFkZGVkYC5cbiAqICAgICAgICAgLy8gUGFzcyB0aGUgYWRkZWQgaXRlbSBhcyBhbiBhcmd1bWVudCB0byB0aGUgZXZlbnQgbGlzdGVuZXIuXG4gKiAgICAgICAgIHRoaXMuZW1pdCgnaXRlbUFkZGVkJywgaXRlbSk7XG4gKiAgICAgfVxuICogfVxuICogLy8gQ3JlYXRlIGFuIGluc3RhbmNlIG9mIFNob3BwaW5nQ2FydCBhbmQgTG9nZ2VyXG4gKiBjb25zdCBjYXJ0ID0gbmV3IFNob3BwaW5nQ2FydCgpO1xuICogLy8gTGlzdGVuIHRvIHRoZSBgaXRlbUFkZGVkYCBldmVudCBhbmQgbG9nIHRoZSBhZGRlZCBpdGVtIHVzaW5nIHRoZSBsb2dnZXIuXG4gKiBjYXJ0Lm9uKCdpdGVtQWRkZWQnLCAoaXRlbSkgPT4ge1xuICogICAgIGNvbnNvbGUubG9nKGBJdGVtIGFkZGVkIHRvIGNhcnQ6ICR7aXRlbS5uYW1lfSAtIFByaWNlOiAkJHtpdGVtLnByaWNlfWApO1xuICogfSk7XG4gKiAvLyBTaW11bGF0ZSBhZGRpbmcgaXRlbXMgdG8gdGhlIGNhcnRcbiAqIGNvbnN0IGl0ZW0xID0geyBuYW1lIDogJ1NtYXJ0cGhvbmUnLCBwcmljZSA6IDEwMDAgfTtcbiAqIGNvbnN0IGl0ZW0yID0geyBuYW1lIDogJ0hlYWRwaG9uZXMnLCBwcmljZSA6IDE1MCB9O1xuICpcbiAqIGNhcnQuYWRkSXRlbShpdGVtMSk7IC8vIE91dHB1dDogXCJJdGVtIGFkZGVkIHRvIGNhcnQ6IFNtYXJ0cGhvbmUgLSBQcmljZTogJDEwMDBcIlxuICogY2FydC5hZGRJdGVtKGl0ZW0yKTsgLy8gT3V0cHV0OiBcIkl0ZW0gYWRkZWQgdG8gY2FydDogSGVhZHBob25lcyAtIFByaWNlOiAkMTUwXCJcbiAqL1xudmFyIEVtaXR0ZXIgPSBleHBvcnRzW1wiZGVmYXVsdFwiXSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEVtaXR0ZXIoKSB7fVxuICB2YXIgX3Byb3RvID0gRW1pdHRlci5wcm90b3R5cGU7XG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGxpc3RlbmVyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUeXBlIG9mIHRoZSBldmVudCAoZS5nLiBgY2hhbmdlYCkuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyIENhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBldmVudCBpcyBlbWl0dGVkLlxuICAgKiBAZXhhbXBsZVxuICAgKiB0aGlzLm1vZGVsLm9uKCdjaGFuZ2UnLCB0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTsgLy8gUmUgcmVuZGVyIHdoZW4gbW9kZWwgY2hhbmdlcy5cbiAgICovXG4gIF9wcm90by5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdMaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmxpc3RlbmVycykgdGhpcy5saXN0ZW5lcnMgPSB7fTtcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzW3R5cGVdKSB0aGlzLmxpc3RlbmVyc1t0eXBlXSA9IFtdO1xuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgbGlzdGVuZXIgdGhhdCBleGVjdXRlcyBvbmNlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUeXBlIG9mIHRoZSBldmVudCAoZS5nLiBgY2hhbmdlYCkuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyIENhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBldmVudCBpcyBlbWl0dGVkLlxuICAgKiBAZXhhbXBsZVxuICAgKiB0aGlzLm1vZGVsLm9uY2UoJ2NoYW5nZScsICgpID0+IGNvbnNvbGUubG9nKCdUaGlzIHdpbGwgaGFwcGVuIG9uY2UnKSk7XG4gICAqLztcbiAgX3Byb3RvLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIF9saXN0ZW5lcjIpIHtcbiAgICBpZiAodHlwZW9mIF9saXN0ZW5lcjIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBfbGlzdGVuZXIgPSBfbGlzdGVuZXIyO1xuICAgICAgX2xpc3RlbmVyMiA9IGZ1bmN0aW9uIGxpc3RlbmVyKCkge1xuICAgICAgICBfbGlzdGVuZXIuYXBwbHkodm9pZCAwLCBhcmd1bWVudHMpO1xuICAgICAgICBzZWxmLm9mZih0eXBlLCBfbGlzdGVuZXIyKTtcbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMub24odHlwZSwgX2xpc3RlbmVyMik7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBldmVudCBsaXN0ZW5lcnMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZV0gVHlwZSBvZiB0aGUgZXZlbnQgKGUuZy4gYGNoYW5nZWApLiBJZiBpcyBub3QgcHJvdmlkZWQsIGl0IHJlbW92ZXMgYWxsIGxpc3RlbmVycy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gW2xpc3RlbmVyXSBDYWxsYmFjayBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC4gSWYgbGlzdGVuZXIgaXMgbm90IHByb3ZpZGVkLCBpdCByZW1vdmVzIGFsbCBsaXN0ZW5lcnMgZm9yIHNwZWNpZmllZCB0eXBlLlxuICAgKiBAZXhhbXBsZVxuICAgKiB0aGlzLm1vZGVsLm9mZignY2hhbmdlJyk7IC8vIFN0b3AgbGlzdGVuaW5nIHRvIGNoYW5nZXMuXG4gICAqLztcbiAgX3Byb3RvLm9mZiA9IGZ1bmN0aW9uIG9mZih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdHlwZSkge1xuICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFsaXN0ZW5lcikge1xuICAgICAgICBkZWxldGUgdGhpcy5saXN0ZW5lcnNbdHlwZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgICAgICB2YXIgY29weSA9IGxpc3RlbmVycy5zbGljZSgpO1xuICAgICAgICAgIGNvcHkuZm9yRWFjaChmdW5jdGlvbiAoZm4sIGlkeCkge1xuICAgICAgICAgICAgaWYgKGZuID09PSBsaXN0ZW5lcikgbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICghbGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMubGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBldmVudCBvZiBzcGVjaWZpZWQgdHlwZS4gTGlzdGVuZXJzIHdpbGwgcmVjZWl2ZSBzcGVjaWZpZWQgYXJndW1lbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUeXBlIG9mIHRoZSBldmVudCAoZS5nLiBgY2hhbmdlYCkuXG4gICAqIEBwYXJhbSB7YW55fSBbLi4uYXJnc10gQXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byBsaXN0ZW5lci5cbiAgICogQGV4YW1wbGVcbiAgICogdGhpcy5lbWl0KCdpbnZhbGlkJyk7IC8vIEVtaXQgdmFsaWRhdGlvbiBlcnJvciBldmVudC5cbiAgICovO1xuICBfcHJvdG8uZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cbiAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMgJiYgdGhpcy5saXN0ZW5lcnNbdHlwZV07XG4gICAgaWYgKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHJldHVybjtcbiAgICB2YXIgY29weSA9IGxpc3RlbmVycy5zbGljZSgpO1xuICAgIGNvcHkuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgIGZuLmFwcGx5KHZvaWQgMCwgYXJncyk7XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiBFbWl0dGVyO1xufSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG52YXIgX0VtaXR0ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9FbWl0dGVyLmpzXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuLyoqXG4gKiAtIE9yY2hlc3RyYXRlcyBkYXRhIGFuZCBidXNpbmVzcyBsb2dpYy5cbiAqIC0gRW1pdHMgZXZlbnRzIHdoZW4gZGF0YSBjaGFuZ2VzLlxuICogXG4gKiBBIGBNb2RlbGAgbWFuYWdlcyBhbiBpbnRlcm5hbCB0YWJsZSBvZiBkYXRhIGF0dHJpYnV0ZXMgYW5kIHRyaWdnZXJzIGNoYW5nZSBldmVudHMgd2hlbiBhbnkgb2YgaXRzIGRhdGEgaXMgbW9kaWZpZWQuICBcbiAqIE1vZGVscyBtYXkgaGFuZGxlIHN5bmNpbmcgZGF0YSB3aXRoIGEgcGVyc2lzdGVuY2UgbGF5ZXIuIFRvIGRlc2lnbiB5b3VyIG1vZGVscywgY3JlYXRlIGF0b21pYywgcmV1c2FibGUgb2JqZWN0cyBcbiAqIHRoYXQgY29udGFpbiBhbGwgdGhlIG5lY2Vzc2FyeSBmdW5jdGlvbnMgZm9yIG1hbmlwdWxhdGluZyB0aGVpciBzcGVjaWZpYyBkYXRhLiAgXG4gKiBNb2RlbHMgc2hvdWxkIGJlIGVhc2lseSBwYXNzZWQgdGhyb3VnaG91dCB5b3VyIGFwcCBhbmQgdXNlZCBhbnl3aGVyZSB0aGUgY29ycmVzcG9uZGluZyBkYXRhIGlzIG5lZWRlZC4gIFxuICogUmFzdGkgbW9kZWxzIHN0b3JlcyBpdHMgYXR0cmlidXRlcyBpbiBgdGhpcy5hdHRyaWJ1dGVzYCwgd2hpY2ggaXMgZXh0ZW5kZWQgZnJvbSBgdGhpcy5kZWZhdWx0c2AgYW5kIHRoZSBcbiAqIGNvbnN0cnVjdG9yIGBhdHRyc2AgcGFyYW1ldGVyLiBGb3IgZXZlcnkgYXR0cmlidXRlLCBhIGdldHRlciBpcyBnZW5lcmF0ZWQgdG8gcmV0cmlldmUgdGhlIG1vZGVsIHByb3BlcnR5IFxuICogZnJvbSBgdGhpcy5hdHRyaWJ1dGVzYCwgYW5kIGEgc2V0dGVyIGlzIGNyZWF0ZWQgdG8gc2V0IHRoZSBtb2RlbCBwcm9wZXJ0eSBpbiBgdGhpcy5hdHRyaWJ1dGVzYCBhbmQgZW1pdCBgY2hhbmdlYCBcbiAqIGFuZCBgY2hhbmdlOmF0dHJpYnV0ZWAgZXZlbnRzLlxuICogQG1vZHVsZVxuICogQGV4dGVuZHMgUmFzdGkuRW1pdHRlclxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJzIE9iamVjdCBjb250YWluaW5nIG1vZGVsIGF0dHJpYnV0ZXMgdG8gZXh0ZW5kIGB0aGlzLmF0dHJpYnV0ZXNgLiBHZXR0ZXJzIGFuZCBzZXR0ZXJzIGFyZSBnZW5lcmF0ZWQgZm9yIGB0aGlzLmF0dHJpYnV0dGVzYCwgaW4gb3JkZXIgdG8gZW1pdCBgY2hhbmdlYCBldmVudHMuXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgTW9kZWwgfSBmcm9tICdyYXN0aSc7XG4gKiAvLyBQcm9kdWN0IG1vZGVsXG4gKiBjbGFzcyBQcm9kdWN0TW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gKiAgICAgcHJlaW5pdGlhbGl6ZSgpIHtcbiAqICAgICAgICAgLy8gVGhlIFByb2R1Y3QgbW9kZWwgaGFzIGBuYW1lYCBhbmQgYHByaWNlYCBkZWZhdWx0IGF0dHJpYnV0ZXMuXG4gKiAgICAgICAgIC8vIGBkZWZhdWx0c2Agd2lsbCBleHRlbmQgYHRoaXMuYXR0cmlidXRlc2AuXG4gKiAgICAgICAgIC8vIEdldHRlcnMgYW5kIHNldHRlcnMgYXJlIGdlbmVyYXRlZCBmb3IgYHRoaXMuYXR0cmlidXRlc2AsXG4gKiAgICAgICAgIC8vIGluIG9yZGVyIHRvIGVtaXQgYGNoYW5nZWAgZXZlbnRzLlxuICogICAgICAgICB0aGlzLmRlZmF1bHRzID0ge1xuICogICAgICAgICAgICAgbmFtZTogJycsXG4gKiAgICAgICAgICAgICBwcmljZTogMFxuICogICAgICAgICB9O1xuICogICAgIH1cbiAqXG4gKiAgICAgc2V0RGlzY291bnQoZGlzY291bnRQZXJjZW50YWdlKSB7XG4gKiAgICAgICAgIC8vIEFwcGx5IGEgZGlzY291bnQgdG8gdGhlIHByaWNlIHByb3BlcnR5LlxuICogICAgICAgICAvLyBUaGlzIHdpbGwgY2FsbCBhIHNldHRlciB0aGF0IHdpbGwgdXBkYXRlIGBwcmljZWAgaW4gYHRoaXMuYXR0cmlidXRlc2AsXG4gKiAgICAgICAgIC8vIGFuZCBlbWl0IGBjaGFuZ2VgIGFuZCBgY2hhbmdlOnByaWNlYCBldmVudHMuXG4gKiAgICAgICAgIGNvbnN0IGRpc2NvdW50ID0gdGhpcy5wcmljZSAqIChkaXNjb3VudFBlcmNlbnRhZ2UgLyAxMDApO1xuICogICAgICAgICB0aGlzLnByaWNlIC09IGRpc2NvdW50O1xuICogICAgIH1cbiAqIH1cbiAqIC8vIENyZWF0ZSBhIHByb2R1Y3QgaW5zdGFuY2Ugd2l0aCBhIG5hbWUgYW5kIHByaWNlLlxuICogY29uc3QgcHJvZHVjdCA9IG5ldyBQcm9kdWN0TW9kZWwoeyBuYW1lOiAnU21hcnRwaG9uZScsIHByaWNlOiAxMDAwIH0pO1xuICogLy8gTGlzdGVuIHRvIHRoZSBgY2hhbmdlOnByaWNlYCBldmVudC5cbiAqIHByb2R1Y3Qub24oJ2NoYW5nZTpwcmljZScsICgpID0+IGNvbnNvbGUubG9nKCdOZXcgUHJpY2U6JywgcHJvZHVjdC5wcmljZSkpO1xuICogLy8gQXBwbHkgYSAxMCUgZGlzY291bnQgdG8gdGhlIHByb2R1Y3QuXG4gKiBwcm9kdWN0LnNldERpc2NvdW50KDEwKTsgLy8gT3V0cHV0OiBcIk5ldyBQcmljZTogOTAwXCJcbiAqL1xudmFyIE1vZGVsID0gZXhwb3J0c1tcImRlZmF1bHRcIl0gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9FbWl0dGVyKSB7XG4gIGZ1bmN0aW9uIE1vZGVsKCkge1xuICAgIHZhciBfdGhpcztcbiAgICB2YXIgYXR0cnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgIF90aGlzID0gX0VtaXR0ZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIC8vIENhbGwgcHJlaW5pdGlhbGl6ZS5cbiAgICBfdGhpcy5wcmVpbml0aWFsaXplLmFwcGx5KF90aGlzLCBhcmd1bWVudHMpO1xuICAgIC8vIGF0dHJpYnV0ZXMgb2JqZWN0LlxuICAgIF90aGlzLmF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCBfdGhpcy5kZWZhdWx0cyB8fCB7fSwgYXR0cnMpO1xuICAgIC8vIFByZXZpb3VzIGF0dHJpYnV0ZXMuXG4gICAgX3RoaXMucHJldmlvdXMgPSB7fTtcbiAgICAvLyBHZW5lcmF0ZSBnZXR0ZXJzL3NldHRlcnMgZm9yIGV2ZXJ5IGF0dHIuXG4gICAgT2JqZWN0LmtleXMoX3RoaXMuYXR0cmlidXRlcykuZm9yRWFjaChfdGhpcy5kZWZpbmVBdHRyaWJ1dGUuYmluZChfdGhpcykpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB5b3UgZGVmaW5lIGEgcHJlaW5pdGlhbGl6ZSBtZXRob2QsIGl0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBNb2RlbCBpcyBmaXJzdCBjcmVhdGVkLCBiZWZvcmUgYW55IGluc3RhbnRpYXRpb24gbG9naWMgaXMgcnVuIGZvciB0aGUgTW9kZWwuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBhdHRycyBPYmplY3QgY29udGFpbmluZyBtb2RlbCBhdHRyaWJ1dGVzIHRvIGV4dGVuZCBgdGhpcy5hdHRyaWJ1dGVzYC5cbiAgICovXG4gIF9pbmhlcml0c0xvb3NlKE1vZGVsLCBfRW1pdHRlcik7XG4gIHZhciBfcHJvdG8gPSBNb2RlbC5wcm90b3R5cGU7XG4gIF9wcm90by5wcmVpbml0aWFsaXplID0gZnVuY3Rpb24gcHJlaW5pdGlhbGl6ZSgpIHt9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGdldHRlci9zZXR0ZXIgZm9yIHRoZSBnaXZlbiBrZXkuIEluIG9yZGVyIHRvIGVtaXQgYGNoYW5nZWAgZXZlbnRzLlxuICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgaW50ZXJuYWxseSBieSB0aGUgY29uc3RydWN0b3JcbiAgICogZm9yIGB0aGlzLmF0dHJpYnV0ZXNgLlxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IEF0dHJpYnV0ZSBrZXkuXG4gICAqLztcbiAgX3Byb3RvLmRlZmluZUF0dHJpYnV0ZSA9IGZ1bmN0aW9uIGRlZmluZUF0dHJpYnV0ZShrZXkpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMi5nZXQoa2V5KTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgICBfdGhpczIuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbiBhdHRyaWJ1dGUgZnJvbSBgdGhpcy5hdHRyaWJ1dGVzYC5cbiAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGludGVybmFsbHkgYnkgZ2VuZXJhdGVkIGdldHRlcnMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgQXR0cmlidXRlIGtleS5cbiAgICogQHJldHVybiB7YW55fSBUaGUgYXR0cmlidXRlIHZhbHVlLlxuICAgKi87XG4gIF9wcm90by5nZXQgPSBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlc1trZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhbiBhdHRyaWJ1dGUgaW50byBgdGhpcy5hdHRyaWJ1dGVzYC4gIFxuICAgKiBFbWl0IGBjaGFuZ2VgIGFuZCBgY2hhbmdlOmF0dHJpYnV0ZWAgaWYgYSB2YWx1ZSBjaGFuZ2UuICBcbiAgICogQ291bGQgYmUgY2FsbGVkIGluIHR3byBmb3JtcywgYHRoaXMuc2V0KCdrZXknLCB2YWx1ZSlgIGFuZFxuICAgKiBgdGhpcy5zZXQoeyBrZXkgOiB2YWx1ZSB9KWAuICBcbiAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGludGVybmFsbHkgYnkgZ2VuZXJhdGVkIHNldHRlcnMuICBcbiAgICogVGhlIGBjaGFuZ2VgIGV2ZW50IGxpc3RlbmVyIHdpbGwgcmVjZWl2ZSB0aGUgbW9kZWwgaW5zdGFuY2UsIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBjaGFuZ2VkIGF0dHJpYnV0ZXMsIGFuZCB0aGUgcmVzdCBvZiB0aGUgYXJndW1lbnRzIHBhc3NlZCB0byBgc2V0YCBtZXRob2QuICBcbiAgICogVGhlIGBjaGFuZ2U6YXR0cmlidXRlYCBldmVudCBsaXN0ZW5lciB3aWxsIHJlY2VpdmUgdGhlIG1vZGVsIGluc3RhbmNlLCB0aGUgbmV3IGF0dHJpYnV0ZSB2YWx1ZSwgYW5kIHRoZSByZXN0IG9mIHRoZSBhcmd1bWVudHMgcGFzc2VkIHRvIGBzZXRgIG1ldGhvZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBBdHRyaWJ1dGUga2V5IG9yIG9iamVjdCBjb250YWluaW5nIGtleXMvdmFsdWVzLlxuICAgKiBAcGFyYW0gW3ZhbHVlXSBBdHRyaWJ1dGUgdmFsdWUuXG4gICAqIEByZXR1cm4ge3RoaXN9IFRoaXMgbW9kZWwuXG4gICAqIEBlbWl0cyBjaGFuZ2VcbiAgICogQGVtaXRzIGNoYW5nZTphdHRyaWJ1dGVcbiAgICovO1xuICBfcHJvdG8uc2V0ID0gZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcbiAgICB2YXIgYXR0cnMsIGFyZ3M7XG4gICAgLy8gSGFuZGxlIGJvdGggYFwia2V5XCIsIHZhbHVlYCBhbmQgYHtrZXk6IHZhbHVlfWAgc3R5bGUgYXJndW1lbnRzLlxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCByZXN0ID0gbmV3IEFycmF5KF9sZW4gPiAyID8gX2xlbiAtIDIgOiAwKSwgX2tleSA9IDI7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIHJlc3RbX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGF0dHJzID0ga2V5O1xuICAgICAgYXJncyA9IFt2YWx1ZV0uY29uY2F0KHJlc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX2F0dHJzO1xuICAgICAgYXR0cnMgPSAoX2F0dHJzID0ge30sIF9hdHRyc1trZXldID0gdmFsdWUsIF9hdHRycyk7XG4gICAgICBhcmdzID0gcmVzdDtcbiAgICB9XG4gICAgLy8gQXJlIHdlIGluIGEgbmVzdGVkIGBzZXRgIGNhbGw/XG4gICAgLy8gQ2FsbGluZyBhIGBzZXRgIGluc2lkZSBhIGBjaGFuZ2U6YXR0cmlidXRlYCBvciBgY2hhbmdlYCBldmVudCBsaXN0ZW5lclxuICAgIHZhciBjaGFuZ2luZyA9IHRoaXMuX2NoYW5naW5nO1xuICAgIHRoaXMuX2NoYW5naW5nID0gdHJ1ZTtcbiAgICAvLyBTdG9yZSBjaGFuZ2VkIGF0dHJpYnV0ZXMuXG4gICAgdmFyIGNoYW5nZWQgPSB7fTtcbiAgICAvLyBTdG9yZSBwcmV2aW91cyBhdHRyaWJ1dGVzLlxuICAgIGlmICghY2hhbmdpbmcpIHtcbiAgICAgIHRoaXMucHJldmlvdXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmF0dHJpYnV0ZXMpO1xuICAgIH1cbiAgICAvLyBTZXQgYXR0cmlidXRlcy5cbiAgICBPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAvLyBVc2UgZXF1YWxpdHkgdG8gZGV0ZXJtaW5lIGlmIHZhbHVlIGNoYW5nZWQuXG4gICAgICBpZiAoYXR0cnNba2V5XSAhPT0gX3RoaXMzLmF0dHJpYnV0ZXNba2V5XSkge1xuICAgICAgICBjaGFuZ2VkW2tleV0gPSBhdHRyc1trZXldO1xuICAgICAgICBfdGhpczMuYXR0cmlidXRlc1trZXldID0gYXR0cnNba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgY2hhbmdlZEtleXMgPSBPYmplY3Qua2V5cyhjaGFuZ2VkKTtcbiAgICAvLyBQZW5kaW5nIGBjaGFuZ2VgIGV2ZW50IGFyZ3VtZW50cy5cbiAgICBpZiAoY2hhbmdlZEtleXMubGVuZ3RoKSB0aGlzLl9wZW5kaW5nID0gWydjaGFuZ2UnLCB0aGlzLCBjaGFuZ2VkXS5jb25jYXQoYXJncyk7XG4gICAgLy8gRW1pdCBgY2hhbmdlOmF0dHJpYnV0ZWAgZXZlbnRzLlxuICAgIGNoYW5nZWRLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgX3RoaXMzLmVtaXQuYXBwbHkoX3RoaXMzLCBbXCJjaGFuZ2U6XCIgKyBrZXksIF90aGlzMywgYXR0cnNba2V5XV0uY29uY2F0KGFyZ3MpKTtcbiAgICB9KTtcbiAgICAvLyBEb24ndCBlbWl0IGBjaGFuZ2VgIGV2ZW50IHVudGlsIHRoZSBlbmQgb2YgdGhlIG5lc3RlZCBcbiAgICAvLyBgc2V0YCBjYWxscyBpbnNpZGUgYGNoYW5nZTphdHRyaWJ1dGVgIGV2ZW50IGxpc3RlbmVycy5cbiAgICBpZiAoY2hhbmdpbmcpIHJldHVybiB0aGlzO1xuICAgIC8vIEVtaXQgYGNoYW5nZWAgZXZlbnRzLCB0aGF0IG1pZ2h0IGJlIG5lc3RlZC5cbiAgICB3aGlsZSAodGhpcy5fcGVuZGluZykge1xuICAgICAgdmFyIHBlbmRpbmdDaGFuZ2UgPSB0aGlzLl9wZW5kaW5nO1xuICAgICAgdGhpcy5fcGVuZGluZyA9IG51bGw7XG4gICAgICB0aGlzLmVtaXQuYXBwbHkodGhpcywgcGVuZGluZ0NoYW5nZSk7XG4gICAgfVxuICAgIC8vIFJlc2V0IGZsYWdzLlxuICAgIHRoaXMuX3BlbmRpbmcgPSBudWxsO1xuICAgIHRoaXMuX2NoYW5naW5nID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIG9iamVjdCByZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgdG8gYmUgdXNlZCBmb3IgSlNPTiBzZXJpYWxpemF0aW9uLlxuICAgKiBCeSBkZWZhdWx0IHJldHVybnMgYHRoaXMuYXR0cmlidXRlc2AuXG4gICAqIEByZXR1cm4ge29iamVjdH0gT2JqZWN0IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCB0byBiZSB1c2VkIGZvciBKU09OIHNlcmlhbGl6YXRpb24uXG4gICAqLztcbiAgX3Byb3RvLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzO1xuICB9O1xuICByZXR1cm4gTW9kZWw7XG59KF9FbWl0dGVyMltcImRlZmF1bHRcIl0pOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG52YXIgX0VtaXR0ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9FbWl0dGVyLmpzXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuLy8gVGhpcyBvcHRpb25zIGtleXMgd2lsbCBiZSBleHRlbmRlZCBvbiB2aWV3IGluc3RhbmNlLlxudmFyIHZpZXdPcHRpb25zID0ge1xuICBlbDogdHJ1ZSxcbiAgdGFnOiB0cnVlLFxuICBhdHRyaWJ1dGVzOiB0cnVlLFxuICBldmVudHM6IHRydWUsXG4gIG1vZGVsOiB0cnVlLFxuICB0ZW1wbGF0ZTogdHJ1ZSxcbiAgb25EZXN0cm95OiB0cnVlXG59O1xuXG4vKipcbiAqIC0gTGlzdGVucyBmb3IgY2hhbmdlcyBhbmQgcmVuZGVycyBVSS5cbiAqIC0gSGFuZGxlcyB1c2VyIGlucHV0IGFuZCBpbnRlcmFjdGl2aXR5LlxuICogLSBTZW5kcyBjYXB0dXJlZCBpbnB1dCB0byB0aGUgbW9kZWwuXG4gKlxuICogQSBgVmlld2AgaXMgYW4gYXRvbWljIHVuaXQgb2YgdGhlIHVzZXIgaW50ZXJmYWNlIHRoYXQgY2FuIHJlbmRlciB0aGUgZGF0YSBmcm9tIGEgc3BlY2lmaWMgbW9kZWwgb3IgbXVsdGlwbGUgbW9kZWxzLlxuICogSG93ZXZlciwgdmlld3MgY2FuIGFsc28gYmUgaW5kZXBlbmRlbnQgYW5kIGhhdmUgbm8gYXNzb2NpYXRlZCBkYXRhLiAgXG4gKiBNb2RlbHMgbXVzdCBiZSB1bmF3YXJlIG9mIHZpZXdzLiBWaWV3cywgb24gdGhlIG90aGVyIGhhbmQsIG1heSByZW5kZXIgbW9kZWwgZGF0YSBhbmQgbGlzdGVuIHRvIHRoZSBjaGFuZ2UgZXZlbnRzIFxuICogZW1pdHRlZCBieSB0aGUgbW9kZWxzIHRvIHJlLXJlbmRlciB0aGVtc2VsdmVzIGJhc2VkIG9uIGNoYW5nZXMuICBcbiAqIEVhY2ggYFZpZXdgIGhhcyBhIHJvb3QgZWxlbWVudCwgYHRoaXMuZWxgLCB3aGljaCBpcyB1c2VkIGZvciBldmVudCBkZWxlZ2F0aW9uLiAgXG4gKiBBbGwgZWxlbWVudCBsb29rdXBzIGFyZSBzY29wZWQgdG8gdGhpcyBlbGVtZW50LCBhbmQgYW55IHJlbmRlcmluZyBvciBET00gbWFuaXB1bGF0aW9ucyBzaG91bGQgYmUgZG9uZSBpbnNpZGUgaXQuIFxuICogSWYgYHRoaXMuZWxgIGlzIG5vdCBwcmVzZW50LCBhbiBlbGVtZW50IHdpbGwgYmUgY3JlYXRlZCB1c2luZyBgdGhpcy50YWdgIChkZWZhdWx0aW5nIHRvIGRpdikgYW5kIGB0aGlzLmF0dHJpYnV0ZXNgLlxuICogQG1vZHVsZVxuICogQGV4dGVuZHMgUmFzdGkuRW1pdHRlclxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT2JqZWN0IGNvbnRhaW5pbmcgb3B0aW9ucy4gVGhlIGZvbGxvd2luZyBrZXlzIHdpbGwgYmUgbWVyZ2VkIHRvIGB0aGlzYDogZWwsIHRhZywgYXR0cmlidXRlcywgZXZlbnRzLCBtb2RlbCwgdGVtcGxhdGUsIG9uRGVzdHJveS5cbiAqIEBwcm9wZXJ0eSB7bm9kZX0gZWwgRXZlcnkgdmlldyBoYXMgYSByb290IGVsZW1lbnQsIGB0aGlzLmVsYC4gSWYgbm90IHByZXNlbnQgaXQgd2lsbCBiZSBjcmVhdGVkLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHRhZyBJZiBgdGhpcy5lbGAgaXMgbm90IHByZXNlbnQsIGFuIGVsZW1lbnQgd2lsbCBiZSBjcmVhdGVkIHVzaW5nIGB0aGlzLnRhZ2AuIERlZmF1bHQgaXMgYGRpdmAuXG4gKiBAcHJvcGVydHkge29iamVjdH0gYXR0cmlidXRlcyBJZiBgdGhpcy5lbGAgaXMgbm90IHByZXNlbnQsIGFuIGVsZW1lbnQgd2lsbCBiZSBjcmVhdGVkIHVzaW5nIGB0aGlzLmF0dHJpYnV0ZXNgLlxuICogQHByb3BlcnR5IHtvYmplY3R9IGV2ZW50cyBPYmplY3QgaW4gdGhlIGZvcm1hdCBgeydldmVudCBzZWxlY3RvcicgOiAnbGlzdGVuZXInfWAuIFVzZWQgdG8gYmluZCBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXJzIHRvIHJvb3QgZWxlbWVudC5cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBtb2RlbCBBIGBSYXN0aS5Nb2RlbGAgb3IgYW55IG9iamVjdCBjb250YWluaW5nIGRhdGEgYW5kIGJ1c2luZXNzIGxvZ2ljLlxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gdGVtcGxhdGUgQSBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIGRhdGEgYW5kIHJldHVybnMgYSBtYXJrdXAgc3RyaW5nIChodG1sIGZvciBleGFtcGxlKS5cbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBWaWV3IH0gZnJvbSAncmFzdGknO1xuICogXG4gKiBjbGFzcyBUaW1lciBleHRlbmRzIFZpZXcge1xuICogICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAqICAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gKiAgICAgICAgIC8vIENyZWF0ZSBtb2RlbCB0byBzdG9yZSBpbnRlcm5hbCBzdGF0ZS4gU2V0IGBzZWNvbmRzYCBhdHRyaWJ1dGUgaW50byAwLlxuICogICAgICAgICB0aGlzLm1vZGVsID0gbmV3IE1vZGVsKHsgc2Vjb25kcyA6IDAgfSk7XG4gKiAgICAgICAgIC8vIExpc3RlbiB0byBjaGFuZ2VzIGluIG1vZGVsIGBzZWNvbmRzYCBhdHRyaWJ1dGUgYW5kIHJlIHJlbmRlci5cbiAqICAgICAgICAgdGhpcy5tb2RlbC5vbignY2hhbmdlOnNlY29uZHMnLCB0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcbiAqICAgICAgICAgLy8gSW5jcmVtZW50IG1vZGVsIGBzZWNvbmRzYCBhdHRyaWJ1dGUgZXZlcnkgMTAwMCBtaWxsaXNlY29uZHMuXG4gKiAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLm1vZGVsLnNlY29uZHMrKywgMTAwMCk7XG4gKiAgICAgfVxuICpcbiAqICAgICB0ZW1wbGF0ZShtb2RlbCkge1xuICogICAgICAgICByZXR1cm4gYFNlY29uZHM6IDxzcGFuPiR7bW9kZWwuc2Vjb25kc308L3NwYW4+YDtcbiAqICAgICB9XG4gKiB9XG4gKiAvLyBSZW5kZXIgdmlldyBhbmQgYXBwZW5kIHZpZXcncyBlbGVtZW50IGludG8gYm9keS5cbiAqIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobmV3IFRpbWVyKCkucmVuZGVyKCkuZWwpO1xuICovXG52YXIgVmlldyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfRW1pdHRlcikge1xuICBmdW5jdGlvbiBWaWV3KCkge1xuICAgIHZhciBfdGhpcztcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgX3RoaXMgPSBfRW1pdHRlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgLy8gQ2FsbCBwcmVpbml0aWFsaXplLlxuICAgIF90aGlzLnByZWluaXRpYWxpemUuYXBwbHkoX3RoaXMsIGFyZ3VtZW50cyk7XG4gICAgLy8gR2VuZXJhdGUgdW5pcXVlIGlkLlxuICAgIC8vIFVzZWZ1bCB0byBnZW5lcmF0ZSBlbGVtZW50cyBpZHMuXG4gICAgX3RoaXMudWlkID0gXCJ1aWRcIiArICsrVmlldy51aWQ7XG4gICAgLy8gU3RvcmUgZGVsZWdhdGVkIGV2ZW50cyBsaXN0ZW5lcnMsXG4gICAgLy8gc28gdGhleSBjYW4gYmUgdW5ib3VuZCBsYXRlci5cbiAgICBfdGhpcy5kZWxlZ2F0ZWRFdmVudExpc3RlbmVycyA9IFtdO1xuICAgIC8vIFN0b3JlIGNoaWxkIHZpZXdzLFxuICAgIC8vIHNvIHRoZXkgY2FuIGJlIGRlc3Ryb3llZC5cbiAgICBfdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAgIC8vIEV4dGVuZCBcInRoaXNcIiB3aXRoIG9wdGlvbnMsIG1hcHBpbmcgdmlld09wdGlvbnMga2V5cy5cbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmICh2aWV3T3B0aW9uc1trZXldKSBfdGhpc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgIH0pO1xuICAgIC8vIEVuc3VyZSB0aGF0IHRoZSB2aWV3IGhhcyBhIHJvb3QgZWxlbWVudCBhdCBgdGhpcy5lbGAuXG4gICAgX3RoaXMuZW5zdXJlRWxlbWVudCgpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB5b3UgZGVmaW5lIGEgcHJlaW5pdGlhbGl6ZSBtZXRob2QsIGl0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSB2aWV3IGlzIGZpcnN0IGNyZWF0ZWQsIGJlZm9yZSBhbnkgaW5zdGFudGlhdGlvbiBsb2dpYyBpcyBydW4uXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBhdHRycyBPYmplY3QgY29udGFpbmluZyBtb2RlbCBhdHRyaWJ1dGVzIHRvIGV4dGVuZCBgdGhpcy5hdHRyaWJ1dGVzYC5cbiAgICovXG4gIF9pbmhlcml0c0xvb3NlKFZpZXcsIF9FbWl0dGVyKTtcbiAgdmFyIF9wcm90byA9IFZpZXcucHJvdG90eXBlO1xuICBfcHJvdG8ucHJlaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uIHByZWluaXRpYWxpemUoKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgbWF0Y2ggdGhlIHNlbGVjdG9yLCBcbiAgICogc2NvcGVkIHRvIERPTSBlbGVtZW50cyB3aXRoaW4gdGhlIGN1cnJlbnQgdmlldydzIHJvb3QgZWxlbWVudCAoYHRoaXMuZWxgKS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIENTUyBzZWxlY3Rvci5cbiAgICogQHJldHVybiB7bm9kZX0gRWxlbWVudCBtYXRjaGluZyBzZWxlY3RvciB3aXRoaW4gdGhlIHZpZXcncyByb290IGVsZW1lbnQgKGB0aGlzLmVsYCkuXG4gICAqLztcbiAgX3Byb3RvLiQgPSBmdW5jdGlvbiAkKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIHRoaXMuZWwucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGxpc3Qgb2YgZWxlbWVudHMgdGhhdCBtYXRjaCB0aGUgc2VsZWN0b3IsIFxuICAgKiBzY29wZWQgdG8gRE9NIGVsZW1lbnRzIHdpdGhpbiB0aGUgY3VycmVudCB2aWV3J3Mgcm9vdCBlbGVtZW50IChgdGhpcy5lbGApLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgQ1NTIHNlbGVjdG9yLlxuICAgKiBAcmV0dXJuIHtub2RlW119IExpc3Qgb2YgZWxlbWVudHMgbWF0Y2hpbmcgc2VsZWN0b3Igd2l0aGluIHRoZSB2aWV3J3Mgcm9vdCBlbGVtZW50IChgdGhpcy5lbGApLlxuICAgKi87XG4gIF9wcm90by4kJCA9IGZ1bmN0aW9uICQkKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSB0aGUgdmlldy5cbiAgICogRGVzdHJveSBjaGlsZHJlbiB2aWV3cyBpZiBhbnksIHVuZGVsZWdhdGUgZXZlbnRzLCBzdG9wIGxpc3RlbmluZyB0byBldmVudHMsIGNhbGwgYG9uRGVzdHJveWAgbGlmZWN5Y2xlIG1ldGhvZC5cbiAgICogQHJldHVybiB7UmFzdGkuVmlld30gUmV0dXJuIGB0aGlzYCBmb3IgY2hhaW5pbmcuXG4gICAqLztcbiAgX3Byb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIC8vIENhbGwgZGVzdHJveSBvbiBjaGlsZHJlbi5cbiAgICB0aGlzLmRlc3Ryb3lDaGlsZHJlbigpO1xuICAgIC8vIFVuZGVsZWdhdGUgYHRoaXMuZWxgIGV2ZW50IGxpc3RlbmVyc1xuICAgIHRoaXMudW5kZWxlZ2F0ZUV2ZW50cygpO1xuICAgIC8vIFVuYmluZCBgdGhpc2AgZXZlbnRzLlxuICAgIHRoaXMub2ZmKCk7XG4gICAgLy8gQ2FsbCBvbkRlc3Ryb3kgbGlmZWN5Y2xlIG1ldGhvZFxuICAgIHRoaXMub25EZXN0cm95LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgLy8gUmV0dXJuIGB0aGlzYCBmb3IgY2hhaW5pbmcuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogYG9uRGVzdHJveWAgbGlmZWN5Y2xlIG1ldGhvZCBpcyBjYWxsZWQgYWZ0ZXIgdmlldyBpcyBkZXN0cm95ZWQuXG4gICAqIE92ZXJyaWRlIHdpdGggeW91ciBjb2RlLiBVc2VmdWwgdG8gc3RvcCBsaXN0ZW5pbmcgdG8gbW9kZWwncyBldmVudHMuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9wdGlvbnMgb2JqZWN0IG9yIGFueSBhcmd1bWVudHMgcGFzc2VkIHRvIGBkZXN0cm95YCBtZXRob2QuXG4gICAqLztcbiAgX3Byb3RvLm9uRGVzdHJveSA9IGZ1bmN0aW9uIG9uRGVzdHJveSgpIHt9XG5cbiAgLyoqXG4gICAqIEFkZCBhIHZpZXcgYXMgYSBjaGlsZC5cbiAgICogQ2hpbGRyZW4gdmlld3MgYXJlIHN0b3JlZCBhdCBgdGhpcy5jaGlsZHJlbmAsIGFuZCBkZXN0cm95ZWQgd2hlbiB0aGUgcGFyZW50IGlzIGRlc3Ryb3llZC5cbiAgICogUmV0dXJucyB0aGUgY2hpbGQgZm9yIGNoYWluaW5nLlxuICAgKiBAcGFyYW0ge1Jhc3RpLlZpZXd9IGNoaWxkXG4gICAqIEByZXR1cm4ge1Jhc3RpLlZpZXd9XG4gICAqLztcbiAgX3Byb3RvLmFkZENoaWxkID0gZnVuY3Rpb24gYWRkQ2hpbGQoY2hpbGQpIHtcbiAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIHJldHVybiBjaGlsZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIGRlc3Ryb3kgbWV0aG9kIG9uIGNoaWxkcmVuIHZpZXdzLlxuICAgKi87XG4gIF9wcm90by5kZXN0cm95Q2hpbGRyZW4gPSBmdW5jdGlvbiBkZXN0cm95Q2hpbGRyZW4oKSB7XG4gICAgd2hpbGUgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB0aGlzLmNoaWxkcmVuLnNoaWZ0KCkuZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZSB0aGF0IHRoZSB2aWV3IGhhcyBhIHJvb3QgZWxlbWVudCBhdCBgdGhpcy5lbGAuXG4gICAqIFlvdSBzaG91bGRuJ3QgY2FsbCB0aGlzIG1ldGhvZCBkaXJlY3RseS4gSXQncyBjYWxsZWQgZnJvbSBjb25zdHJ1Y3Rvci5cbiAgICogWW91IG1heSBvdmVycmlkZSBpdCBpZiB5b3Ugd2FudCB0byB1c2UgYSBkaWZmZXJlbnQgbG9naWMgb3IgdG8gXG4gICAqIHBvc3Rwb25lIGVsZW1lbnQgY3JlYXRpb24uXG4gICAqLztcbiAgX3Byb3RvLmVuc3VyZUVsZW1lbnQgPSBmdW5jdGlvbiBlbnN1cmVFbGVtZW50KCkge1xuICAgIC8vIElmIFwidGhpcy5lbFwiIGlzIG5vdCBwcmVzZW50LFxuICAgIC8vIGNyZWF0ZSBhIG5ldyBlbGVtZW50IGFjY29yZGluZyBcInRoaXMudGFnXCJcbiAgICAvLyBhbmQgXCJ0aGlzLmF0dHJpYnV0ZXNcIi5cbiAgICBpZiAoIXRoaXMuZWwpIHRoaXMuZWwgPSB0aGlzLmNyZWF0ZUVsZW1lbnQodGhpcy50YWcsIHRoaXMuYXR0cmlidXRlcyk7XG4gICAgLy8gRGVsZWdhdGUgZXZlbnRzIG9uIGVsZW1lbnQuXG4gICAgdGhpcy5kZWxlZ2F0ZUV2ZW50cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBlbGVtZW50LlxuICAgKiBDYWxsZWQgZnJvbSBjb25zdHJ1Y3RvciBpZiBgdGhpcy5lbGAgaXMgdW5kZWZpbmVkLCB0byBlbnN1cmVcbiAgICogdGhlIHZpZXcgdG8gaGF2ZSBhIHJvb3QgZWxlbWVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUYWcgZm9yIHRoZSBlbGVtZW50LiBEZWZhdWx0IHRvIGBkaXZgXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBhdHRycyBBdHRyaWJ1dGVzIGZvciB0aGUgZWxlbWVudC5cbiAgICogQHJldHVybiB7bm9kZX0gVGhlIGNyZWF0ZWQgZWxlbWVudC5cbiAgICovO1xuICBfcHJvdG8uY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgdmFyIHRhZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJ2Rpdic7XG4gICAgdmFyIGF0dHJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAvLyBDcmVhdGUgZG9tIGVsZW1lbnQuXG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIC8vIEFkZCBlbGVtZW50IGF0dHJpYnV0ZXMuXG4gICAgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuICAgIH0pO1xuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYHRoaXMuZWxgIGZyb20gRE9NLlxuICAgKiBAcmV0dXJuIHtSYXN0aS5WaWV3fSBSZXR1cm4gYHRoaXNgIGZvciBjaGFpbmluZy5cbiAgICovO1xuICBfcHJvdG8ucmVtb3ZlRWxlbWVudCA9IGZ1bmN0aW9uIHJlbW92ZUVsZW1lbnQoKSB7XG4gICAgdGhpcy5lbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZWwpO1xuICAgIC8vIFJldHVybiBgdGhpc2AgZm9yIGNoYWluaW5nLlxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb3ZpZGUgZGVjbGFyYXRpdmUgbGlzdGVuZXJzIGZvciBET00gZXZlbnRzIHdpdGhpbiBhIHZpZXcuIElmIGFuIGV2ZW50cyBoYXNoIGlzIG5vdCBwYXNzZWQgZGlyZWN0bHksIHVzZXMgYHRoaXMuZXZlbnRzYCBhcyB0aGUgc291cmNlLiAgXG4gICAqIEV2ZW50cyBhcmUgd3JpdHRlbiBpbiB0aGUgZm9ybWF0IGB7J2V2ZW50IHNlbGVjdG9yJyA6ICdsaXN0ZW5lcid9YC4gVGhlIGxpc3RlbmVyIG1heSBiZSBlaXRoZXIgdGhlIG5hbWUgb2YgYSBtZXRob2Qgb24gdGhlIHZpZXcsIG9yIGEgZGlyZWN0IGZ1bmN0aW9uIGJvZHkuXG4gICAqIE9taXR0aW5nIHRoZSBzZWxlY3RvciBjYXVzZXMgdGhlIGV2ZW50IHRvIGJlIGJvdW5kIHRvIHRoZSB2aWV3J3Mgcm9vdCBlbGVtZW50IChgdGhpcy5lbGApLiAgXG4gICAqIEJ5IGRlZmF1bHQsIGBkZWxlZ2F0ZUV2ZW50c2AgaXMgY2FsbGVkIHdpdGhpbiB0aGUgVmlldydzIGNvbnN0cnVjdG9yLCBcbiAgICogc28gaWYgeW91IGhhdmUgYSBzaW1wbGUgZXZlbnRzIGhhc2gsIGFsbCBvZiB5b3VyIERPTSBldmVudHMgd2lsbCBhbHdheXMgYWxyZWFkeSBiZSBjb25uZWN0ZWQsIGFuZCB5b3Ugd2lsbCBuZXZlciBoYXZlIHRvIGNhbGwgdGhpcyBmdW5jdGlvbiB5b3Vyc2VsZi4gICBcbiAgICogQWxsIGF0dGFjaGVkIGxpc3RlbmVycyBhcmUgYm91bmQgdG8gdGhlIHZpZXcgYXV0b21hdGljYWxseSwgc28gd2hlbiB0aGUgbGlzdGVuZXJzIGFyZSBpbnZva2VkLCBgdGhpc2AgY29udGludWVzIHRvIHJlZmVyIHRvIHRoZSB2aWV3IG9iamVjdC4gIFxuICAgKiBXaGVuIGBkZWxlZ2F0ZUV2ZW50c2AgaXMgcnVuIGFnYWluLCBwZXJoYXBzIHdpdGggYSBkaWZmZXJlbnQgZXZlbnRzIGhhc2gsIGFsbCBsaXN0ZW5lcnMgYXJlIHJlbW92ZWQgYW5kIGRlbGVnYXRlZCBhZnJlc2guXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbZXZlbnRzXSBPYmplY3QgaW4gdGhlIGZvcm1hdCBgeydldmVudCBzZWxlY3RvcicgOiAnbGlzdGVuZXInfWAuIFVzZWQgdG8gYmluZCBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXJzIHRvIHJvb3QgZWxlbWVudC5cbiAgICogQHJldHVybiB7UmFzdGkuVmlld30gUmV0dXJuIGB0aGlzYCBmb3IgY2hhaW5pbmcuXG4gICAqIEBleGFtcGxlXG4gICAqIE15Vmlldy5wcm90b3R5cGUuZXZlbnRzID0ge1xuICAgKiAgICAgICdjbGljayBidXR0b24ub2snIDogJ29uQ2xpY2tPa0J1dHRvbicsXG4gICAqICAgICAgJ2NsaWNrIGJ1dHRvbi5jYW5jZWwnIDogZnVuY3Rpb24oKSB7fVxuICAgKiB9O1xuICAgKi87XG4gIF9wcm90by5kZWxlZ2F0ZUV2ZW50cyA9IGZ1bmN0aW9uIGRlbGVnYXRlRXZlbnRzKCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuICAgIHZhciBldmVudHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRoaXMuZXZlbnRzO1xuICAgIGlmICghZXZlbnRzKSByZXR1cm4gdGhpcztcbiAgICBpZiAodGhpcy5kZWxlZ2F0ZWRFdmVudExpc3RlbmVycy5sZW5ndGgpIHRoaXMudW5kZWxlZ2F0ZUV2ZW50cygpO1xuXG4gICAgLy8gU3RvcmUgZXZlbnRzIGJ5IHR5cGUgaS5lLjogXCJjbGlja1wiLCBcInN1Ym1pdFwiLCBldGMuXG4gICAgdmFyIGV2ZW50VHlwZXMgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhldmVudHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIGtleVBhcnRzID0ga2V5LnNwbGl0KCcgJyk7XG4gICAgICB2YXIgdHlwZSA9IGtleVBhcnRzLnNoaWZ0KCk7XG4gICAgICB2YXIgc2VsZWN0b3IgPSBrZXlQYXJ0cy5qb2luKCcgJyk7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBldmVudHNba2V5XTtcbiAgICAgIC8vIExpc3RlbmVyIG1heSBiZSBhIHN0cmluZyByZXByZXNlbnRpbmcgYSBtZXRob2QgbmFtZSBvbiB0aGUgdmlldyxcbiAgICAgIC8vIG9yIGEgZnVuY3Rpb24uXG4gICAgICBsaXN0ZW5lciA9ICh0eXBlb2YgbGlzdGVuZXIgPT09ICdzdHJpbmcnID8gX3RoaXMyW2xpc3RlbmVyXSA6IGxpc3RlbmVyKS5iaW5kKF90aGlzMik7XG4gICAgICBpZiAoIWV2ZW50VHlwZXNbdHlwZV0pIGV2ZW50VHlwZXNbdHlwZV0gPSBbXTtcbiAgICAgIGV2ZW50VHlwZXNbdHlwZV0ucHVzaCh7XG4gICAgICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcbiAgICAgICAgbGlzdGVuZXI6IGxpc3RlbmVyXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBPYmplY3Qua2V5cyhldmVudFR5cGVzKS5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAvLyBMaXN0ZW5lciBmb3IgdGhlIHR5cGUgb2YgZXZlbnQuXG4gICAgICB2YXIgdHlwZUxpc3RlbmVyID0gZnVuY3Rpb24gdHlwZUxpc3RlbmVyKGV2ZW50KSB7XG4gICAgICAgIC8vIEl0ZXJhdGUgYW5kIHJ1biBldmVyeSBpbmRpdmlkdWFsIGxpc3RlbmVyIGlmIHRoZSBzZWxlY3RvciBtYXRjaGVzLlxuICAgICAgICBldmVudFR5cGVzW3R5cGVdLmZvckVhY2goZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBfcmVmLnNlbGVjdG9yLFxuICAgICAgICAgICAgbGlzdGVuZXIgPSBfcmVmLmxpc3RlbmVyO1xuICAgICAgICAgIGlmICghc2VsZWN0b3IgfHwgZXZlbnQudGFyZ2V0LmNsb3Nlc3Qoc2VsZWN0b3IpKSBsaXN0ZW5lcihldmVudCwgX3RoaXMyKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgX3RoaXMyLmRlbGVnYXRlZEV2ZW50TGlzdGVuZXJzLnB1c2goe1xuICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICBsaXN0ZW5lcjogdHlwZUxpc3RlbmVyXG4gICAgICB9KTtcbiAgICAgIF90aGlzMi5lbC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIHR5cGVMaXN0ZW5lcik7XG4gICAgfSk7XG4gICAgLy8gUmV0dXJuIGB0aGlzYCBmb3IgY2hhaW5pbmcuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgb2YgdGhlIHZpZXcncyBkZWxlZ2F0ZWQgZXZlbnRzLiBVc2VmdWwgaWYgeW91IHdhbnQgdG8gZGlzYWJsZSBvciByZW1vdmUgYSB2aWV3IGZyb20gdGhlIERPTSB0ZW1wb3JhcmlseS4gQ2FsbGVkIGF1dG9tYXRpY2FsbHkgd2hlbiB0aGUgdmlldyBpcyBkZXN0cm95ZWQuXG4gICAqIEByZXR1cm4ge1Jhc3RpLlZpZXd9IFJldHVybiBgdGhpc2AgZm9yIGNoYWluaW5nLlxuICAgKi87XG4gIF9wcm90by51bmRlbGVnYXRlRXZlbnRzID0gZnVuY3Rpb24gdW5kZWxlZ2F0ZUV2ZW50cygpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcbiAgICB0aGlzLmRlbGVnYXRlZEV2ZW50TGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICB2YXIgdHlwZSA9IF9yZWYyLnR5cGUsXG4gICAgICAgIGxpc3RlbmVyID0gX3JlZjIubGlzdGVuZXI7XG4gICAgICBfdGhpczMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG4gICAgfSk7XG4gICAgdGhpcy5kZWxlZ2F0ZWRFdmVudExpc3RlbmVycyA9IFtdO1xuICAgIC8vIFJldHVybiBgdGhpc2AgZm9yIGNoYWluaW5nLlxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlciB0aGUgdmlldy5cbiAgICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJyaWRkZW4gd2l0aCBjdXN0b20gbG9naWMuXG4gICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHNldHMgaW5uZXJIVE1MIG9mIGB0aGlzLmVsYCB3aXRoIGB0aGlzLnRlbXBsYXRlYC5cbiAgICogQ29udmVudGlvbnMgYXJlIHRvIG9ubHkgbWFuaXB1bGF0ZSB0aGUgZG9tIGluIHRoZSBzY29wZSBvZiBgdGhpcy5lbGAsIFxuICAgKiBhbmQgdG8gcmV0dXJuIGB0aGlzYCBmb3IgY2hhaW5pbmcuXG4gICAqIElmIHlvdSBhZGRlZCBhbnkgY2hpbGQgdmlldywgeW91IG11c3QgY2FsbCBgdGhpcy5kZXN0cm95Q2hpbGRyZW5gLlxuICAgKiBAcmV0dXJuIHtSYXN0aS5WaWV3fSBSZXR1cm4gYHRoaXNgIGZvciBjaGFpbmluZy5cbiAgICovO1xuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnRlbXBsYXRlKSB0aGlzLmVsLmlubmVySFRNTCA9IHRoaXMudGVtcGxhdGUodGhpcy5tb2RlbCk7XG4gICAgLy8gUmV0dXJuIGB0aGlzYCBmb3IgY2hhaW5pbmcuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIHJldHVybiBWaWV3O1xufShfRW1pdHRlcjJbXCJkZWZhdWx0XCJdKTtcbi8qXG4gKiBVbmlxdWUgSWRcbiAqL1xuVmlldy51aWQgPSAwOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIF9FbWl0dGVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9FbWl0dGVyLmpzXCIpKTtcbmV4cG9ydHMuRW1pdHRlciA9IF9FbWl0dGVyW1wiZGVmYXVsdFwiXTtcbnZhciBfTW9kZWwgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL01vZGVsLmpzXCIpKTtcbmV4cG9ydHMuTW9kZWwgPSBfTW9kZWxbXCJkZWZhdWx0XCJdO1xudmFyIF9WaWV3ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9WaWV3LmpzXCIpKTtcbmV4cG9ydHMuVmlldyA9IF9WaWV3W1wiZGVmYXVsdFwiXTtcbnZhciBfQ29tcG9uZW50ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9Db21wb25lbnQuanNcIikpO1xuZXhwb3J0cy5Db21wb25lbnQgPSBfQ29tcG9uZW50W1wiZGVmYXVsdFwiXTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfSIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiLy8gSW1hZ2VzXG5pbXBvcnQgJy4vaW1nL2NoYXJhY3RlcnMxLnBuZyc7XG5pbXBvcnQgJy4vaW1nL21pc2MucG5nJztcbmltcG9ydCAnLi9pbWcvcGlsbHMucG5nJztcbi8vIEF1ZGlvXG5pbXBvcnQgJy4vYXVkaW8vYmFjay5tcDMnO1xuaW1wb3J0ICcuL2F1ZGlvL2JvbnVzLm1wMyc7XG5pbXBvcnQgJy4vYXVkaW8vZGVhZC5tcDMnO1xuaW1wb3J0ICcuL2F1ZGlvL2RvdC5tcDMnO1xuaW1wb3J0ICcuL2F1ZGlvL2VhdC5tcDMnO1xuaW1wb3J0ICcuL2F1ZGlvL2VhdGVuLm1wMyc7XG5pbXBvcnQgJy4vYXVkaW8vZnJpZ2h0ZW5lZC5tcDMnO1xuaW1wb3J0ICcuL2F1ZGlvL2ludHJvLm1wMyc7XG5pbXBvcnQgJy4vYXVkaW8vbGlmZS5tcDMnO1xuLy8gQ1NTXG5pbXBvcnQgJy4vc3R5bGVzLmNzcyc7XG5cbmltcG9ydCBHYW1lIGZyb20gJy4vanMvR2FtZSc7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXBhY21hbi1jb250YWluZXInKTtcblxuICAgIGNvbnN0IHZ3ID0gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IDAsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApO1xuICAgIGNvbnN0IHZoID0gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCAwLCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCk7XG5cbiAgICBjbGFzcyBHYW1lV2l0aFBvc2l0aW9uIGV4dGVuZHMgR2FtZSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gJzUwJSc7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLm1hcmdpbkxlZnQgPSBgLSR7dGhpcy5lbC5vZmZzZXRXaWR0aCAvIDJ9cHhgO1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS50b3AgPSAnNTAlJztcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUubWFyZ2luVG9wID0gYC0ke3RoaXMuZWwub2Zmc2V0SGVpZ2h0IC8gMn1weGA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBnYW1lID0gbmV3IEdhbWVXaXRoUG9zaXRpb24oe1xuICAgICAgICBlbCA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1wYWNtYW4tcGxheWdyb3VuZCcpLFxuICAgICAgICB3aWR0aCA6IHZ3ICogMC45LFxuICAgICAgICBoZWlnaHQgOiB2aCAqIDAuOVxuICAgIH0pO1xuXG59KTtcbiJdLCJuYW1lcyI6WyJBbmltYXRpb24iLCJDaGFyYWN0ZXIiLCJnZXREaXN0YW5jZSIsImFuaW1hdGlvbkJhc2UiLCJpbWFnZVVSTCIsIm9mZnNldFkiLCJvZmZzZXRYIiwiYW5pbWF0aW9ucyIsIl9leHRlbmRzIiwiZGVmYXVsdHMiLCJzcGVlZCIsInNjb3JlIiwiQm9udXMiLCJfQ2hhcmFjdGVyIiwib3B0aW9ucyIsIl90aGlzIiwiY2FsbCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYWRkUGFjbWFuUG9zaXRpb25FdmVudExpc3RlbmVyIiwib24iLCJ0aWxlIiwiX2RpciIsIl9uZXh0RGlyIiwiZ2V0TmV4dERpcmVjdGlvbiIsIl9lYXRFdmVudCIsImdldFRpbGUiLCJfZ2V0VGFyZ2V0IiwiX3RhcmdldEZvdW5kIiwiZW1pdCIsImRhdGEiLCJwYWNtYW5EYXRhIiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJtb3ZlIiwicGFjbWFuVGlsZSIsIm9wcG9zaXRlIiwiX2dldE9wRGlyZWN0aW9uIiwiZGlyIiwiZ2V0IiwiX25leHRBbmltYXRpb24iLCJ1cGRhdGUiLCJ0YXJnZXRUaWxlIiwibmV4dFRpbGUiLCJkaXJlY3Rpb25zIiwibmV4dERpcmVjdGlvbiIsImxhc3REaXN0YW5jZSIsImkiLCJjYW5HbyIsInRlc3RUaWxlIiwiZGlzdGFuY2UiLCJpc1dhbGwiLCJpc0hvdXNlIiwibWFwIiwidHVubmVscyIsInNldE5leHRBbmltYXRpb24iLCJhc3NpZ24iLCJtYWtlQm9udXMiLCJCb251c2VzIiwiYm9udXNlcyIsIngiLCJ5IiwibW9kZWwiLCJib251cyIsImZhY3RvciIsIm5vcm1hbGl6ZVJlZnJhc2hSYXRlIiwiYWRkU3ByaXRlIiwicHVzaCIsImxldmVsIiwiaGlkZSIsInJlbmRlciIsImJpbmQiLCJzaG93IiwiSXRlbSIsIndpZHRoIiwiaGVpZ2h0Iiwic3RlcCIsInByZXR1cm4iLCJhbmltYXRpb25MYWJlbHNCeURpcmVjdGlvbnMiLCJsIiwiciIsInUiLCJkIiwib3Bwb3NpdGVEaXJlY3Rpb25zIiwiX0l0ZW0iLCJwYXVzZUFuaW1hdGlvbiIsIl9tb3ZpbmciLCJfbGFzdFgiLCJfbGFzdFkiLCJfc3BlZWQiLCJfbmV4dERpcmVjdGlvbiIsIl9zYXZlRGVmYXVsdHMiLCJfdGhpczIiLCJfZGVmYXVsdHMiLCJyZXNldCIsInRyYW5zZm9ybSIsInNldEFuaW1hdGlvbiIsImFuaW1hdGlvbiIsIk1hdGgiLCJhYnMiLCJzZXRYWVoiLCJyZXN1bWVBbmltYXRpb24iLCJfZ2V0UG9zaXRpb25EYXRhIiwiX3N0ZXAiLCJnZXRTdGVwIiwiX3ByZXR1cm4iLCJfaXNDZW50ZXJlZCIsIl9pc1YiLCJkaWZmWCIsImdldE1pbiIsIl9pc0giLCJkaWZmWSIsInRpbGVXaWR0aCIsInRpbGVIZWlnaHQiLCJfbGFzdFRpbGUiLCJ4eSIsIm1pbiIsImFyZ3VtZW50cyIsImxlbmd0aCIsIkdhbWUiLCJTb3VuZE1hbmFnZXIiLCJNYXAiLCJHYW1lTW9kZWwiLCJtYWtlR2hvc3QiLCJtYWtlRG90IiwibWFrZVBpbGwiLCJQYWNtYW4iLCJMaXZlcyIsIkVWRU5UX0tFWV9ET1dOIiwiS0VZX1VQIiwiS0VZX1JJR0hUIiwiS0VZX0RPV04iLCJLRVlfTEVGVCIsIkVWRU5UX1NXSVBFIiwiRVZFTlRfU1dJUEVfVVAiLCJFVkVOVF9TV0lQRV9SSUdIVCIsIkVWRU5UX1NXSVBFX0RPV04iLCJFVkVOVF9TV0lQRV9MRUZUIiwiZWwiLCJzdHlsZSIsImRpc3BsYXkiLCJvcmlnaW5hbFdpZHRoIiwib3JpZ2luYWxIZWlnaHQiLCJkb3RTY29yZSIsInBpbGxTY29yZSIsImRlZmF1bHRMaXZlcyIsInNvdW5kRW5hYmxlZCIsImV2ZW50cyIsIkpzUGFjbWFuIiwiX0dhbWUiLCJsaXZlcyIsImZldGNoIiwiZWxlbWVudHMiLCJzcGxhc2giLCIkIiwic3RhcnQiLCJzdGFydFAxIiwic3RhcnRSZWFkeSIsImhpZ2hTY29yZSIsImdhbWVPdmVyIiwic291bmRTdGF0dXMiLCJwYXVzZWQiLCJsb2FkIiwia2V5Ym9hcmQiLCJfb25LZXlEb3duIiwidG91Y2giLCJfb25Td2lwZSIsInNvdW5kIiwiYWRkU291bmQiLCJzY2FsaW5nIiwiZ2V0RmFjdG9yIiwiX29uR2hvc3RFYXRlbiIsIl9vbkdob3N0RWF0IiwiX29uQ2hhbmdlU2NvcmUiLCJfb25DaGFuZ2VIaWdoU2NvcmUiLCJfb25DaGFuZ2VMaXZlcyIsIl9vbkNoYW5nZUV4dHJhTGl2ZXMiLCJfb25DaGFuZ2VNb2RlIiwibWFrZUxldmVsIiwic3RhcnRMZXZlbCIsIl93aW4iLCJfZ2FtZU92ZXIiLCJwbGF5IiwiYWRkQ2FsbGJhY2siLCJtYWluTG9vcCIsIm1vZGUiLCJwaW5reSIsImRlc3Ryb3kiLCJibGlua3kiLCJpbmt5Iiwic3VlIiwicGFjbWFuIiwiZGVzdHJveUl0ZW1zIiwib2ZmIiwiY2xlYXIiLCJfaW5wdXREaXJlY3Rpb24iLCJfbGFzdFN3aXBlIiwiZ2V0U2V0dGluZ3MiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJtYXplIiwiZG90QW5pbWF0aW9uTGFiZWwiLCJfcGF1c2VGcmFtZXMiLCJfZGVzdHJveUJvbnVzIiwiX3Nob3dCb251cyIsInRpbGVzIiwidG90YWwiLCJjb2RlIiwiZG90IiwiZGVmYXVsdEFuaW1hdGlvbiIsIml0ZW0iLCJwaWxsIiwidG90YWxJdGVtcyIsImFkZEdhbWVHaG9zdEVhdEV2ZW50TGlzdGVuZXIiLCJsaXN0ZW5lciIsImFkZEdhbWVHaG9zdE1vZGVGcmlnaHRlbmVkRW50ZXIiLCJhZGRHYW1lR2hvc3RNb2RlRnJpZ2h0ZW5lZEV4aXQiLCJ0IiwiYWRkU2NvcmUiLCJ3aW4iLCJnaG9zdCIsInNob3dHaG9zdHMiLCJfcGFjbWFuRWF0ZW4iLCJfc3RhcnQiLCJib251c1RpbGUiLCJib251c0luZGV4IiwiYm9udXNTY29yZSIsInBhcnNlSW50IiwiZ2hvc3RBdHRycyIsImFkZEdhbWVHbG9iYWxNb2RlRXZlbnRMaXN0ZW5lciIsImFkZEdhbWVHaG9zdEVhdGVuRXZlbnRMaXN0ZW5lciIsImFkZFBhY21hbkVhdFBpbGxFdmVudExpc3RlbmVyIiwicGlua3lUaWxlIiwiaG91c2VDZW50ZXIiLCJnZXRSIiwiYWRkRXZlbnRMaXN0ZW5lcnNUb0dob3N0IiwiYmxpbmt5VGlsZSIsImhvdXNlIiwiZ2V0VSIsImlua3lUaWxlIiwiZ2V0TCIsInN1ZVRpbGUiLCJoaWRlR2hvc3RzIiwiX3RoaXMzIiwidXBkYXRlTW9kZSIsIl9nZXRJbnB1dERpcmVjdGlvbiIsIl9zaG93UGFjbWFuIiwiX3NvdW5kQmFja1BhdXNlRnJhbWVzIiwiX2lzR2hvc3REZWFkIiwiX2lzR2hvc3RGcmlnaHRlbmVkIiwicGF1c2UiLCJtdXRlU291bmQiLCJyZXN1bWUiLCJfbXV0ZWQiLCJfdGhpczQiLCJ0aW1lcyIsInRvZ2dsZSIsInJlZnJlc2hSYXRlIiwiaGlkZUl0ZW1zIiwiaXNGcmlnaHRlbmVkIiwiaXNEZWFkIiwiZGlyZWN0aW9uIiwib25Mb2FkUHJvZ3Jlc3MiLCJwZXJjZW50IiwicXVlcnlTZWxlY3RvciIsInR5cGUiLCJldiIsImV2ZW50Iiwia2V5Q29kZSIsIl9oaWRlU291bmRTdGF0dXNUaW1lb3V0IiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsIl9wYXVzZWQiLCJpbm5lclRleHQiLCJzYXZlIiwidGVtcGxhdGUiLCJNb2RlbCIsIlRpbWVyIiwiTU9ERV9TQ0FUVEVSIiwiTU9ERV9DSEFTRSIsIm1hcDEiLCJtYXAyIiwibWFwMyIsIm1hcDQiLCJ0aW1lIiwiX01vZGVsIiwiYXR0cnMiLCJleHRyYUxpdmVzIiwiZXh0cmFMaWZlU2NvcmUiLCJ1cmwiLCJvbkNoYW5nZVNjb3JlIiwibW9kZVRpbWVyIiwiX3RoaXMkZ2V0U2V0dGluZ3MiLCJpc0VsYXBzZWQiLCJvYmoiLCJwYXJ0cyIsInNwbGl0IiwidG9KU09OIiwiQU5JTUFUSU9OX0hPUklaT05UQUwiLCJybmQiLCJNT0RFX0ZSSUdIVEVORUQiLCJNT0RFX0hPVVNFIiwiTU9ERV9ERUFEIiwibnVtYmVyT2ZGcmFtZSIsImRlbHRhIiwiZnJpZ2h0ZW5lZFRpbWUiLCJ3YWl0VGltZSIsInNjYXR0ZXJUYXJnZXQiLCJzY29yZXMiLCJnZXRDaGFzZVRhcmdldCIsInR1bm5lbFNwZWVkIiwiZnJpZ2h0ZW5lZFNwZWVkIiwiZnJpZ2h0ZW5lZEZsYXNoZXMiLCJHaG9zdCIsImRlYWRUYXJnZXQiLCJkZWFkRW5kWCIsImRlYWRFbmRZIiwiZGVhZEVuZCIsImhvdXNlVG9wIiwiaG91c2VCb3R0b20iLCJob3VzZUV4aXRUaWxlIiwiaG91c2VFeGl0VGlsZVgiLCJzZXRNb2RlIiwiaXNUdW5uZWwiLCJfdHVybkJhY2siLCJvbkdhbWVHbG9iYWxNb2RlIiwiaG91c2VUaW1lciIsImZyaWdodGVuZWRUaW1lciIsImhvdXNlUHJlcGFyZUV4aXQiLCJmcmlnaHRlbmVkIiwiZ2xvYmFsTW9kZSIsIm9uRW50ZXJNb2RlIiwic2hvdWxkRXhpdE1vZGUiLCJkZWFkUHJlcGFyZUVudGVyIiwib25FeGl0TW9kZSIsImdldEQiLCJlbmRYIiwiZW5kWSIsInR3IiwicHQiLCJvcCIsImlkeCIsImRlYWRVcCIsImRlYWRSaWdodCIsImRlYWREb3duIiwiZGVhZExlZnQiLCJnZXRFbGFwc2VkIiwiZnJpZ2h0ZW5lZEJsaW5rIiwiU3ByaXRlIiwiX1Nwcml0ZSIsInJlbW92ZUVsZW1lbnQiLCJwYWNtYW5zIiwiVGlsZSIsImNoYXJBdCIsImNvbCIsInJvdyIsImluUGl4ZWxzIiwiZnJpZ2h0ZW5lZERvdFNwZWVkIiwiZG90U3BlZWQiLCJfZ2hvc3RGcmlnaHRlbmVkIiwiaGFzUGlsbCIsImhhc0RvdCIsIl9lYXRlblR1cm5zIiwiYXBwbHkiLCJfbGFzdEVhdGVuVHVybnNUaW1lIiwiX2VhdGVuVHVybnNGcmFtZXMiLCJTb3VuZCIsInNvdW5kcyIsImludHJvIiwiYmFjayIsImVhdGVuIiwiZWF0IiwiZGVhZCIsImxpZmUiLCJsYWJlbCIsIkFOSU1BVElPTl9WRVJUSUNBTCIsIkFOSU1BVElPTl9PTkNFIiwiQU5JTUFUSU9OX0NBTExCQUNLIiwiQU5JTUFUSU9OX1BJTkdQT05HIiwiaW1nIiwiSW1hZ2UiLCJzcmMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJpc1JlYWR5IiwiY29tcGxldGUiLCJWaWV3IiwiS2V5Ym9hcmQiLCJUb3VjaCIsIlNjYWxpbmciLCJTVEFURV9ORVciLCJTVEFURV9SVU5OSU5HIiwiU1RBVEVfUEFVU0VEIiwicG9zaXRpb24iLCJfVmlldyIsInNwcml0ZXMiLCJjaGlsZHJlbiIsImNhbGxiYWNrcyIsImxvYWRlZFNwcml0ZXNJbmRleCIsImxvYWRlZFNvdW5kc0luZGV4IiwicmVzaXplIiwic3RhdGUiLCJvdmVyZmxvdyIsImZvbnRTaXplIiwic2NlbmVncmFwaCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsIm9uRGVzdHJveSIsInByZWxvYWQiLCJ3YWl0Rm9yUmVzb3VyY2VzIiwic3ByaXRlQ291bnQiLCJzb3VuZENvdW50IiwicmVzdCIsInNldEludGVydmFsIiwicmVmcmVzaCIsIl9vblJlYWR5Q2FsbGJhY2siLCJ2aXNpYmlsaXR5Iiwic3ByaXRlIiwiYWRkQ2hpbGQiLCJ0aGVuIiwiY2FsbGJhY2siLCJmbiIsImlkbGVDb3VudGVyIiwiZGVhZENhbGxiYWNrcyIsInZhbHVlIiwic3BsaWNlIiwiY2xlYXJDYWxsYmFja3MiLCJkZXN0cm95Q2hpbGRyZW4iLCJpbm5lckhUTUwiLCJtdXRlZCIsIm11dGUiLCJyYXRlIiwicm91bmQiLCJFVkVOVF9LRVlfVVAiLCJkb2N1bWVudCIsImJvZHkiLCJvbktleVVwIiwib25LZXlEb3duIiwia2V5dXAiLCJrZXlkb3duIiwiTW9kZWxMb2NhbFN0b3JhZ2UiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic2V0IiwiSlNPTiIsInBhcnNlIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsInciLCJoIiwid2lkdGhUb0hlaWdodCIsIm5ld1dpZHRoIiwibmV3SGVpZ2h0IiwibmV3V2lkdGhUb0hlaWdodCIsImF1ZGlvQ3R4IiwiZ2Fpbk5vZGUiLCJkZWNvZGVBdWRpb0RhdGEiLCJhcnJheUJ1ZmZlciIsIkF1ZGlvQ29udGV4dCIsIndlYmtpdEF1ZGlvQ29udGV4dCIsImNyZWF0ZUdhaW4iLCJjb25uZWN0IiwiZGVzdGluYXRpb24iLCJyZXNwb25zZSIsImF1ZGlvQnVmZmVyIiwidHJhY2tTb3VyY2UiLCJjcmVhdGVCdWZmZXJTb3VyY2UiLCJidWZmZXIiLCJnYWluIiwic2V0VmFsdWVBdFRpbWUiLCJjdXJyZW50VGltZSIsInoiLCJjdXJyZW50RnJhbWUiLCJmcmFtZUluY3JlbWVudCIsImFuZ2xlIiwicGxheWluZyIsImZhY3RvckgiLCJmYWN0b3JWIiwiYWxsIiwic29tZSIsInpJbmRleCIsImJhY2tncm91bmRQb3NpdGlvbiIsImluZGV4IiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZFJlcGVhdCIsImRpc3RhbmNlWCIsImRpc3RhbmNlWSIsInJvdGF0ZSIsInJlbGF0aXZlIiwicGFyc2VGbG9hdCIsInNjYWxlIiwiZmxpcEgiLCJmbGlwIiwidW5kZWZpbmVkIiwiZmxpcFYiLCJjb29yZGluYXRlIiwic2V0V0giLCJfdGhpczUiLCJ0cyIsIkRhdGUiLCJnZXRUaW1lIiwicGF1c2VUaW1lIiwidGhyZXNob2xkIiwicmVzdHJhaW50IiwiYWxsb3dlZFRpbWUiLCJvblRvdWNoU3RhcnQiLCJvblRvdWNoRW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNoYW5nZWRUb3VjaGVzIiwic3RhcnRYIiwicGFnZVgiLCJzdGFydFkiLCJwYWdlWSIsInN0YXJ0VGltZSIsImRpc3RYIiwiZGlzdFkiLCJlbGFwc2VkVGltZSIsIlNQUklURV9QSU5LWSIsIlNQUklURV9CTElOS1kiLCJTUFJJVEVfSU5LWSIsIlNQUklURV9TVUUiLCJyaWdodCIsImRvd24iLCJ1cCIsImxlZnQiLCJ0aWxlQSIsInRpbGVCIiwieDEiLCJ5MSIsInNxcnQiLCJwb3ciLCJmbG9vciIsInJhbmRvbSIsImNvbnRhaW5lciIsInZ3IiwibWF4IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJpbm5lcldpZHRoIiwidmgiLCJjbGllbnRIZWlnaHQiLCJpbm5lckhlaWdodCIsIkdhbWVXaXRoUG9zaXRpb24iLCJtYXJnaW5MZWZ0Iiwib2Zmc2V0V2lkdGgiLCJ0b3AiLCJtYXJnaW5Ub3AiLCJvZmZzZXRIZWlnaHQiLCJnYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==