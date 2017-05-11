/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function Coin() {
	this.x = Math.floor(Math.random() * 10);
	this.y = Math.floor(Math.random() * 10);
}

module.exports = Coin;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function Furry() {
	this.x = 0;
	this.y = 0;
	this.direction = 'right';
}

module.exports = Furry;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Furry = __webpack_require__(1);
var Coin = __webpack_require__(0);

function Game() {

	var self = this;
	this.board = document.querySelectorAll('#board > div');
	this.furry = new Furry();
	this.coin = new Coin();
	this.score = 0;
	this.audio = new Audio('./szyszko.mp3');
	this.omnomnom = new Audio('./omnomnom.mp3');
	this.index = function(x, y) {
		return x + (y * 10);
	}

	this.showFurry = function() {
	this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
	this.checkCoinCollision();
	}

	this.hideVisibleFurry = function() {
		document.querySelector('.furry').classList.remove('furry');
	};


	this.showCoin = function() { this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
	}

	this.turnFurry = function(event) {
			switch (event.which) {
				case 37:
				this.furry.direction = 'left';
				break;
				case 39:
				this.furry.direction = 'right';
				break;
				case 38:
				this.furry.direction = 'up';
				break;
				case 40:
				this.furry.direction = 'down';
			}
	};

	this.moveFurry = function() {
		this.hideVisibleFurry();
		if (this.furry.direction === 'right') {
			this.furry.x++;
		} else if (this.furry.direction === 'left') {
			this.furry.x--;
		} else if (this.furry.direction === 'down') {
			this.furry.y++;
		} else if (this.furry.direction === 'up') {
			this.furry.y--;
		}
		this.gameOver();
	};

	this.checkCoinCollision = function() {
		if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
			document.querySelector('.coin').classList.remove('coin');
			this.omnomnom.play();
			this.score++;
			document.querySelector('div.score > strong').innerText = this.score;
			this.coin = new Coin();
			this.showCoin();
		}

	};

	this.gameOver = function() {
		if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
			clearInterval(this.idSetInterval);
			this.audio.play();
			this.board[0].parentElement.classList.add('invisible');
			document.querySelector('.score').classList.add('invisible');
			document.querySelector('#over').classList.remove('invisible')
			document.querySelector('#over').innerHTML = '<h1>Game Over</h1><h2>Zjedzonych drzew: ' + this.score + ' </h2><blockquote><p>"Nie chodzi o to,"</p></blockquote>';
		} else {
			this.showFurry();
		}
	};

	this.startGame = function() {
		return this.idSetInterval = setInterval(function() {
			self.moveFurry();
		}, 250);
	};

}

module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var Coin = __webpack_require__(0);
	var Furry = __webpack_require__(1);
	var Game = __webpack_require__(2);


	var game = new Game();
	game.showCoin();
	game.showFurry();
	game.startGame();


	document.addEventListener('keydown', function(event) {
		game.turnFurry(event);
	});


/***/ })
/******/ ]);