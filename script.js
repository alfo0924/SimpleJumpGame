const character = document.getElementById('character');
const obstacle = document.getElementById('obstacle');

let isJumping = false;
let gameOver = false;

// 監聽鍵盤事件，空白鍵或上鍵跳躍
document.addEventListener('keydown', (event) => {
    if ((event.code === 'Space' || event.code === 'ArrowUp') && !isJumping && !gameOver) {
        jump();
    }
});

function jump() {
    isJumping = true;
    character.classList.add('jump');

    // 跳躍動畫結束後移除 class，允許下一次跳躍
    character.addEventListener('animationend', () => {
        character.classList.remove('jump');
        isJumping = false;
    }, { once: true });
}

// 遊戲主迴圈，檢查碰撞
const gameLoop = setInterval(() => {
    const characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
    const obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue('right'));

    // 障礙物接近角色範圍判斷碰撞
    if (obstacleRight > 550 && obstacleRight < 580 && characterBottom < 60) {
        gameOver = true;
        alert('遊戲結束！你撞到了障礙物。');
        obstacle.style.animationPlayState = 'paused';
        clearInterval(gameLoop);
    }
}, 20);
