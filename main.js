const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game objects
const paddleWidth = 10, paddleHeight = 100;
const ballSize = 10;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2 - ballSize / 2;
let ballY = canvas.height / 2 - ballSize / 2;
let ballSpeedX = 4, ballSpeedY = 4;
let upPressed = false, downPressed = false;

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

    // Draw ball
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
}

// Update ball and paddles
function update() {
    // Move player paddle
    if (upPressed && leftPaddleY > 0) leftPaddleY -= 6;
    if (downPressed && leftPaddleY < canvas.height - paddleHeight) leftPaddleY += 6;

    // Simple AI for right paddle
    if (rightPaddleY + paddleHeight / 2 < ballY) rightPaddleY += 4;
    if (rightPaddleY + paddleHeight / 2 > ballY) rightPaddleY -= 4;

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top/bottom
    if (ballY <= 0 || ballY + ballSize >= canvas.height) ballSpeedY *= -1;

    // Ball collision with paddles
    if (
        ballX <= paddleWidth &&
        ballY + ballSize > leftPaddleY &&
        ballY < leftPaddleY + paddleHeight
    ) ballSpeedX *= -1;

    if (
        ballX + ballSize >= canvas.width - paddleWidth &&
        ballY + ballSize > rightPaddleY &&
        ballY < rightPaddleY + paddleHeight
    ) ballSpeedX *= -1;

    // Ball out of bounds (reset)
    if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width / 2 - ballSize / 2;
        ballY = canvas.height / 2 - ballSize / 2;
        ballSpeedX *= -1;
    }
}

// Game loop
function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') upPressed = true;
    if (e.key === 'ArrowDown') downPressed = true;
});
document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') upPressed = false;
    if (e.key === 'ArrowDown') downPressed = false;
});

// Start game
loop();