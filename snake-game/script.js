const CELL_SIZE = 20;
const CANVAS_SIZE = 600;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
};
let MOVE_INTERVAL = 200;

function initPosition() {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT),
  };
}
function clearRect(c) {
  c.clearRect(0, 0, WIDTH, HEIGHT);
}

function initHeadAndBody() {
  let head = initPosition();
  let body = [{ x: head.x, y: head.y }];
  return {
    head: head,
    body: body,
  };
}

function initDirection() {
  return Math.floor(Math.random() * 4);
}

function initSnake(color, nyawa) {
  return {
    color: color,
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
    level: 1,
    nyawa: nyawa,
  };
}
let snake1 = initSnake("green", 3);

let apple1 = {
  color: "red",
  position: initPosition(),
};

let apple2 = {
  color: "red",
  position: initPosition(),
};

let obstacles = [
	{
		position: {
			x1: 152.5,
			x2: 152.5,
			y1: 100,
			y2: 430
		}
	},
	{
		position: {
			x1: 150,
			x2: 480,
			y1: 322.5,
			y2: 322.5
		}
	},
	{
		position: {
			x1: 150,
			x2: 470,
			y1: 430,
			y2: 430
		}
	},
	{
		position: {
			x1: 112.5,
			x2: 112.5,
			y1: 60,
			y2: 390
		}
	},
	{
		position: {
			x1: 337.5,
			x2: 337.5,
			y1: 60,
			y2: 390
		}
	},
]

//nyawa
// let apple3 = {
//   color: "black",
//   position: initPosition(),
// };
let blood = {
  color: "black",
  position: initPosition(),
};
function drawBlood(ctx, x, y, color) {
  ctx.fillStyle = color;
  let img = document.getElementById("lives");
  //   ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawCell(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawSnake(ctx, x, y) {
  let img = document.getElementById("snake-head");
  ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawSnakeBody(ctx, x, y) {
  let img = document.getElementById("snake-body");
  ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawApple(ctx, x, y) {
  let img = document.getElementById("apple");
  ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawObstacle(ctx, x1, x2, y1, y2) {
	ctx.lineWidth = CELL_SIZE;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function initObsticleLevel2(ctx) {
	drawObstacle(
		ctx,
		obstacles[0].position.x1,
		obstacles[0].position.x2,
		obstacles[0].position.y1,
		obstacles[0].position.y2
	);
}

function initObsticleLevel3(ctx) {
	for (let i = 0; i < 2; i++) {
		drawObstacle(
			ctx,
			obstacles[i].position.x1,
			obstacles[i].position.x2,
			obstacles[i].position.y1,
			obstacles[i].position.y2
		);
	}
}

function initObsticleLevel4(ctx) {
	for (let i = 0; i < 3; i++) {
		drawObstacle(
			ctx,
			obstacles[i].position.x1,
			obstacles[i].position.x2,
			obstacles[i].position.y1,
			obstacles[i].position.y2
		);
	}
}

function initObsticleLevel5(ctx) {
	for (let i = 3; i < 5; i++) {
		drawObstacle(
			ctx,
			obstacles[i].position.x1,
			obstacles[i].position.x2,
			obstacles[i].position.y1,
			obstacles[i].position.y2
		);
	}
}
//function drawLives(ctx, x, y) {
//let img = document.getElementById('lives');
//tx.drawImage(img, 10, 10, CELL_SIZE, CELL_SIZE);
//}

function drawScore(snake) {
  let scoreCanvas;
  if (snake.color == snake1.color) {
    scoreCanvas = document.getElementById("score1Board");
  } else {
    scoreCanvas = document.getElementById("score2Board");
  }
  let scoreCtx = scoreCanvas.getContext("2d");

  scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  scoreCtx.font = "25px Arial";
  scoreCtx.fillStyle = "green";
  scoreCtx.fillText("Score", 15, scoreCanvas.scrollHeight / 4);
  scoreCtx.fillText(snake.score, 43, scoreCanvas.scrollHeight / 1.5);
}

//speed
function drawSpeed(snake) {
  let canvasSpeed;
  canvasSpeed = document.getElementById("speed");
  let ctxSpeed = canvasSpeed.getContext("2d");

  ctxSpeed.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctxSpeed.font = "25px Arial";
  ctxSpeed.fillStyle = "green";
  ctxSpeed.fillText("Speed", 18, canvasSpeed.scrollHeight / 4);
  ctxSpeed.fillText(MOVE_INTERVAL + "ms", 15, canvasSpeed.scrollHeight / 1.5);
}

// Level
function drawLevel(snake) {
  let levelSnake;
  levelSnake = document.getElementById("level");
  let scoreLevel = levelSnake.getContext("2d");

  scoreLevel.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  scoreLevel.font = "25px Arial";
  scoreLevel.fillStyle = "red";
  scoreLevel.fillText("Level", 18, levelSnake.scrollHeight / 4);
  scoreLevel.fillText(snake.level, 43, levelSnake.scrollHeight / 1.5);
}
//nyawa
/*function drawLife(snake) {
  let lifeSnake;
  lifeSnake = document.getElementById("life");
  let scoreLife = lifeSnake.getContext("2d");
  scoreLife.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  scoreLife.font = "25px Arial";
  scoreLife.fillStyle = "blue";
  scoreLife.fillText("Nyawa", 12, lifeSnake.scrollHeight / 4);
  scoreLife.fillText(snake.nyawa, 43, lifeSnake.scrollHeight / 1.5);

}*/

function draw() {
  setInterval(function () {
    let snakeCanvas = document.getElementById("snakeBoard");

    let ctx = snakeCanvas.getContext("2d");

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    var heart = document.getElementById("lives-prime");
    for (let i = 0; i < snake1.nyawa; i++) {
      ctx.drawImage(heart, i * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE);
    }

    // drawCell(ctx, snake1.head.x, snake1.head.y, snake1.color);
    drawSnake(ctx, snake1.head.x, snake1.head.y, snake1.color);
    for (let i = 1; i < snake1.body.length; i++) {
      //   drawCell(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
      drawSnakeBody(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
    }
    drawApple(ctx, apple1.position.x, apple1.position.y, apple1.color);
    drawApple(ctx, apple2.position.x, apple2.position.y, apple2.color);
    drawScore(snake1);
    drawLevel(snake1);
    drawSpeed(snake1);

    //drawObstacle
    if (snake1.level == 2) {
      snake1.speed = 165;
			initObsticleLevel2(ctx)
		} else if (snake1.level == 3) {
      snake1.speed = 130;
			initObsticleLevel3(ctx);
		} else if (snake1.level == 4) {
      snake1.speed = 95;
			initObsticleLevel4(ctx);
		} else if (snake1.level == 5) {
      snake1.speed = 60;
			initObsticleLevel5(ctx);
		}
    //drawLife(snake1);
    if (snake1.score == 2 || (snake1.score % 2 == 1 && snake1.score != 1)) {
      drawBlood(ctx, blood.position.x, blood.position.y, blood.color);
      drawBlood(snake1);
      blood.position = initPosition;
    }
  }, REDRAW_INTERVAL);
}

function teleport(snake) {
  if (snake.head.x < 0) {
    snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.head.x >= WIDTH) {
    snake.head.x = 0;
  }
  if (snake.head.y < 0) {
    snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.head.y >= HEIGHT) {
    snake.head.y = 0;
  }
}
// Memakan Nyawa
function eatBlood(snake, apple3) {}

// Memakan apel
function eat(snake, apple) {
  var audio = new Audio("assets/eat-apple.wav");
  if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
    apple.position = initPosition();
    snake.score++;
    audio.play();

    var audio = new Audio("assets/level-up.mp3");
    if (snake.score % 5 == 0) {
      audio.play();
      snake.level++;
      MOVE_INTERVAL -= 35;
      //   alert("Anda naik level " + snake.level);
    }
    // if (snake.score == 2 || (snake.score % 2 == 1 && snake.score != 1)) {
    //   if (snake.nyawa == 3) {
    //     alert("Nyawa dah full bro");
    //   } else {
    //     snake.nyawa++;
    //     alert("Nyawa Bertambah");
    //   }
    // }
    snake.body.push({ x: snake.head.x, y: snake.head.y });
  }
  if (snake.head.x == blood.position.x && snake.head.y == blood.position.y) {
    // alert("Nyawa Bertambah dan Score Bertambah");
    var audio = new Audio("assets/eat-apple.wav");
    audio.play();
    snake.score++;
    snake.nyawa++;
    blood.position = initPosition();
    // blood.position = initPosition();
  }
}

function moveLeft(snake) {
  snake.head.x--;
  teleport(snake);
  eat(snake, apple1);
  eat(snake, apple2);
}

function moveRight(snake) {
  snake.head.x++;
  teleport(snake);
  eat(snake, apple1);
  eat(snake, apple2);
}

function moveDown(snake) {
  snake.head.y++;
  teleport(snake);
  eat(snake, apple1);
  eat(snake, apple2);
}

function moveUp(snake) {
  snake.head.y--;
  teleport(snake);
  eat(snake, apple1);
  eat(snake, apple2);
}

function hitObsticle() {
	let isHit = false;
	let headX = (snake1.head.x + 1) * CELL_SIZE;
	let headY = (snake1.head.y + 1) * CELL_SIZE;

	if (snake1.level == 2) {
		let obstacle = obstacles[0];
		if (headX > obstacle.position.x1 && headX <= obstacle.position.x2 &&
			headY >= obstacle.position.y1 && headY <= obstacle.position.y1 + 7.5) {
			isHit = true;
		}
	} else if (snake1.level == 3) {
		for (let i = 0; i < obstacles.length - 3; i++) {
			let obstacle = obstacles[i];
			if (headX > obstacle.position.x1 && headX <= obstacle.position.x2 &&
				headY >= obstacle.position.y1 && headY <= obstacle.position.y1 + 7.5) {
				isHit = true;
			}
		}
	} else if (snake1.level == 4) {
		for (let i = 0; i < obstacles.length - 2; i++) {
			let obstacle = obstacles[i];
			if (headX > obstacle.position.x1 && headX <= obstacle.position.x2 &&
				headY >= obstacle.position.y1 && headY <= obstacle.position.y1 + 7.5) {
				isHit = true;
			}
		}
	} else if (snake1.level == 5) {
		for (let i = 3; i < obstacles.length; i++) {
			let obstacle = obstacles[i];
			if (headY > obstacle.position.y1 && headY <= obstacle.position.y2 &&
				headX >= obstacle.position.x1 && headX <= obstacle.position.x1 + 7.5) {
				isHit = true;
			}
		}
	}

	if (isHit) {
		snake1.nyawa--;
		snake1 = initSnake("green", snake1.nyawa);
		snake1.body = [{ x: snake1.head, y: snake1.head.y }];
		if (snake1.nyawa == 0) {
			gameOver();
		}
	}

	return isHit;
}

function checkCollision(snakes) {
  let isCollide = false;
  //this
  for (let i = 0; i < snakes.length; i++) {
    for (let j = 0; j < snakes.length; j++) {
      for (let k = 1; k < snakes[j].body.length; k++) {
        if (
          snakes[i].head.x == snakes[j].body[k].x &&
          snakes[i].head.y == snakes[j].body[k].y
        ) {
          if (snake1.nyawa > 0) {
            snake1.nyawa--;
            alert("Nyawa tinggal " + snake1.nyawa);
            snake1.position = initPosition();
            isCollide = false;
          } else {
            isCollide = true;
          }
        }
      }
    }
  }
  if (isCollide) {
    var audio = new Audio("assets/game-over.mp3");
    audio.play();
    alert("Game over");
    snake1 = initSnake("green");
    MOVE_INTERVAL = 200;
  }
  return isCollide;
}

function move(snake) {
  switch (snake.direction) {
    case DIRECTION.LEFT:
      moveLeft(snake);
      break;
    case DIRECTION.RIGHT:
      moveRight(snake);
      break;
    case DIRECTION.DOWN:
      moveDown(snake);
      break;
    case DIRECTION.UP:
      moveUp(snake);
      break;
  }
  moveBody(snake);
  if (!checkCollision([snake1])) {
    setTimeout(function () {
      move(snake);
    }, MOVE_INTERVAL);
  } else {
    initGame();
  }
}

function moveBody(snake) {
  snake.body.unshift({ x: snake.head.x, y: snake.head.y });
  snake.body.pop();
}

function turn(snake, direction) {
  const oppositeDirections = {
    [DIRECTION.LEFT]: DIRECTION.RIGHT,
    [DIRECTION.RIGHT]: DIRECTION.LEFT,
    [DIRECTION.DOWN]: DIRECTION.UP,
    [DIRECTION.UP]: DIRECTION.DOWN,
  };

  if (direction !== oppositeDirections[snake.direction]) {
    snake.direction = direction;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    turn(snake1, DIRECTION.LEFT);
  } else if (event.key === "ArrowRight") {
    turn(snake1, DIRECTION.RIGHT);
  } else if (event.key === "ArrowUp") {
    turn(snake1, DIRECTION.UP);
  } else if (event.key === "ArrowDown") {
    turn(snake1, DIRECTION.DOWN);
  }
});

function initGame() {
  move(snake1);
}

initGame();
