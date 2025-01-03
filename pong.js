const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
const pauseOverlay = document.createElement('div');
const backgrounds = [
    'url("background1.jpg")',
    'url("background2.jpg")',
    'url("background3.jpg")',
];

let settingsMenuOpen = false;
let selectedBackground = backgrounds[0];

function changeBackground(bg) {
    document.body.style.backgroundImage = bg;
}
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function toggleSettingsMenu() {
    const settingsDiv = document.querySelector('.settings-menu');

    if (settingsMenuOpen) {
        if (settingsDiv) {
            settingsDiv.classList.remove('active');
            setTimeout(() => {
                settingsDiv.remove();
            }, 300);
        }
        settingsMenuOpen = false;
    } else {
        showSettingsMenu();
        settingsMenuOpen = true;
    }
}

function drawBackground() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedBackground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

let gameMode = 'normal';
let paddleSpeed = 5;
let ballSpeed;
let arrowVisible = false;
let playerScore = 0;
let ballInitialSpeed = 5;
let animationFrameId = null;
let paddleWidth = 10;
let paddleHeight = 100;

const player1 = { x: 0, y: 0, dy: 0 };
const player2 = { x: 0, y: 0, dy: 0 };
const ball = { x: 0, y: 0, radius: 10, dx: ballInitialSpeed, dy: ballInitialSpeed };

let highScores = JSON.parse(localStorage.getItem('highScores')) || { easy: [], normal: [], hard: [] };

function resetGame() {
    player1.y = canvas.height / 2 - paddleHeight / 2;
    player2.y = canvas.height / 2 - paddleHeight / 2;
    player2.x = canvas.width - paddleWidth;
    paddleWidth = 10;
    paddleHeight = 100;
    paddleSpeed = 5;
    arrowVisible = false;
    if (gameMode == 'hard') {
        ballInitialSpeed = 7;
        paddleHeight = 50;

    }
    else {
        ballInitialSpeed = 5;
        paddleHeight = 100;
    }
    ballSpeed = ballInitialSpeed;
    resetBall();
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
    arrowVisible = (gameMode === 'easy');
}

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${playerScore}`, canvas.width / 2 - 40, 30);
}

function drawArrow() {
    if (!arrowVisible) return;
    ctx.strokeStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(ball.x, ball.y);

    let tempX = ball.x;
    let tempY = ball.y;
    let tempDx = ball.dx;
    let tempDy = ball.dy;

    while (tempX > 0 && tempX < canvas.width) {
        let nextY;
        if (tempDy > 0) {
            nextY = canvas.height;
        } else {
            nextY = 0;
        }

        const slope = tempDy / tempDx;
        let nextX = tempX + (nextY - tempY) / slope;

        if (nextX < 0 || nextX > canvas.width) {
            nextX = tempDx > 0 ? canvas.width : 0;
            nextY = tempY + slope * (nextX - tempX);
        }

        ctx.lineTo(nextX, nextY);

        tempX = nextX;
        tempY = nextY;
        tempDy *= -1;
    }
    ctx.stroke();
}

function update() {
    if (!isPaused) {
        
    player1.y = Math.max(Math.min(player1.y + player1.dy, canvas.height - paddleHeight), 0);
    player2.y = Math.max(Math.min(player2.y + player2.dy, canvas.height - paddleHeight), 0);

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
        if (gameMode == 'easy') {
            arrowVisible = true;
        }
    }

    if (
        (ball.x - ball.radius < player1.x + paddleWidth && ball.y > player1.y && ball.y < player1.y + paddleHeight) ||
        (ball.x + ball.radius > player2.x && ball.y > player2.y && ball.y < player2.y + paddleHeight)
    ) {
        ball.dx *= -1;
        playerScore++;
        if (gameMode == 'easy') {
            arrowVisible = true;
            }
        }
        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
            resetHighScore();
            resetBall();
        }
    }
}

function checkHighScore() {
    const scoreData = highScores[gameMode];
    if (!scoreData.length || playerScore > scoreData[0].score) {
        const name = prompt("New Personal Record! Enter your name:");
        scoreData.unshift({ name, score: playerScore });
        highScores[gameMode] = scoreData.slice(0, 5);
        localStorage.setItem('highScores', JSON.stringify(highScores));
        alert(`New High Score Saved: ${name} - ${playerScore}`);
    }
}

function resetHighScore() {
    checkHighScore();
    playerScore = 0;
}

function game() {
    update();
    render();
    if (!isPaused) {
        animationFrameId = requestAnimationFrame(game);
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isPaused || countdownValue >= 0) {
        drawBackground();
        drawScore();
        drawBall(ball.x, ball.y, ball.radius, 'white');
        drawRect(player1.x, player1.y, paddleWidth, paddleHeight, 'white');
        drawRect(player2.x, player2.y, paddleWidth, paddleHeight, 'white');
        drawArrow();
    }
}

function showSettingsMenu() {
    const settingsDiv = document.createElement('div');
    settingsDiv.className = 'settings-menu active';
    settingsDiv.innerHTML = '<h2>Settings</h2>';

    const backgrounds = ['url(background1.jpg)', 'url(background2.jpg)', 'url(background3.jpg)'];

    backgrounds.forEach((bg, index) => {
        const button = document.createElement('button');
        button.textContent = `Background ${index + 1}`;
        button.onclick = () => {
            changeBackground(bg);
        };
        settingsDiv.appendChild(button);
    });
    document.body.appendChild(settingsDiv);
}

function startGame(mode) {
    document.getElementById('menu').style.display = 'none';
    canvas.style.display = 'block';
    gameMode = mode;

    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    switch (gameMode) {
        case 'easy':
            paddleHeight = 100;
            arrowVisible = true;
            isPaused = false;
            break;
        case 'normal':
            paddleHeight = 100;
            arrowVisible = false;
            isPaused = false;
            break;
        case 'hard':
            paddleHeight = 50;
            arrowVisible = false;
            isPaused = false;
            break;
    }

    resetGame();
    window.addEventListener('load', () => {
        resizeCanvas();
        resetGame();
    });
    window.addEventListener('resize', resizeCanvas);
    game();
}

function showHighScores() {
    const highScoresDiv = document.createElement('div');
    highScoresDiv.className = 'high-scores';
    highScoresDiv.style.position = 'absolute';
    highScoresDiv.style.top = '10%';
    highScoresDiv.style.left = '10%';
    highScoresDiv.style.color = 'white';
    highScoresDiv.style.padding = '20px';
    highScoresDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';

    highScoresDiv.innerHTML = `<h2>High Scores</h2>`;
    Object.keys(highScores).forEach((mode) => {
        highScoresDiv.innerHTML += `<h3>${mode.charAt(0).toUpperCase() + mode.slice(1)}</h3>`;
        highScores[mode].forEach((score, index) => {
            highScoresDiv.innerHTML += `<p>${index + 1}. ${score.name}: ${score.score}</p>`;
        });
    });

    highScoresDiv.innerHTML += `<button onclick="this.parentNode.remove()">Close</button>`;
    document.body.appendChild(highScoresDiv);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'w') player1.dy = -paddleSpeed;
    if (e.key === 's') player1.dy = paddleSpeed;
    if (e.key === 'ArrowUp') player2.dy = -paddleSpeed;
    if (e.key === 'ArrowDown') player2.dy = paddleSpeed;
    if (e.key.toLowerCase() === 'p') togglePause();
    if (e.key === 'Escape') {
        togglePause();
        showMenu();
    }
    if (e.key === 'o') {
        toggleSettingsMenu();
    }
});


document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 's') player1.dy = 0;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') player2.dy = 0;
});

function showMenu() {
    document.getElementById('menu').style.display = 'block';
    canvas.style.display = 'none';
    pauseOverlay.style.display = 'none';

    window.removeEventListener('resize', resizeCanvas);
}

window.onload = () => {
    showMenu();
    resizeCanvas();
};

let hue = 0;
let hueIncrement = 1;

let isPaused = false;
let originalBallX, originalBallY;
let pausedBall = { x: 0, y: 0, radius: 25, dx: 1, dy: 1 };
let countdownValue = 3;
let countdownInterval;

function updatePausedBallColor() {
    hue = (hue + hueIncrement) % 360;
    return `hsl(${hue}, 100%, 50%)`;
}

function movePausedBall() {
    if (isPaused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pausedBall.x += pausedBall.dx;
        pausedBall.y += pausedBall.dy;

        if (pausedBall.x <= pausedBall.radius || pausedBall.x >= canvas.width - pausedBall.radius) {
            pausedBall.dx *= -1;
        }
        if (pausedBall.y <= pausedBall.radius || pausedBall.y >= canvas.height - pausedBall.radius) {
            pausedBall.dy *= -1;
        }

        ctx.fillStyle = updatePausedBallColor();
        ctx.beginPath();
        ctx.arc(pausedBall.x, pausedBall.y, pausedBall.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.font = "24px Arial";
        ctx.fillStyle = 'black';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("P", pausedBall.x, pausedBall.y);

        requestAnimationFrame(movePausedBall);
    }
}

function displayCountdown() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    render();

    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(countdownValue, canvas.width / 2, canvas.height / 2);

    countdownValue--;
    if (countdownValue < 0) {
        clearInterval(countdownInterval);
        countdownValue = 3;
        isPaused = false;
        ball.x = originalBallX;
        ball.y = originalBallY;
        game();
    }
}

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        originalBallX = ball.x;
        originalBallY = ball.y;

        ball.x = -1000;
        ball.y = -1000;

        pausedBall.x = originalBallX;
        pausedBall.y = originalBallY;
        pausedBall.dx = Math.random() > 0.5 ? 1 : -1;
        pausedBall.dy = Math.random() > 0.5 ? 1 : -1;

        cancelAnimationFrame(animationFrameId);
        movePausedBall();
    } else {
        clearInterval(countdownInterval);
        countdownValue = 3;
        ball.x = originalBallX;
        ball.y = originalBallY;
        countdownInterval = setInterval(displayCountdown, 1000);
    }
}

function toggleControls() {
    const controlsMenu = document.getElementById('controls-menu');
    controlsMenu.style.display = (controlsMenu.style.display === 'block') ? 'none' : 'block';
}