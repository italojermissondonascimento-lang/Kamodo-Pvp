
const player = document.getElementById("player");
const enemy = document.getElementById("enemy");

const playerHealth = document.getElementById("playerHealth");
const enemyHealth = document.getElementById("enemyHealth");
const message = document.getElementById("message");

const arena = document.querySelector(".arena");

let playerX = 35;
let enemyX = 450;
let hpPlayer = 100;
let hpEnemy = 100;
let gameOver = false;

function update() {
  player.style.left = playerX + "px";
  enemy.style.left = enemyX + "px";

  playerHealth.style.width = hpPlayer + "%";
  enemyHealth.style.width = hpEnemy + "%";
}

function move(direction) {
  if (gameOver) return;

  const max = arena.clientWidth - 90;

  playerX += direction * 15;
  playerX = Math.max(0, Math.min(max, playerX));

  update();
}

document.getElementById("left").addEventListener("pointerdown", () => move(-1));
document.getElementById("right").addEventListener("pointerdown", () => move(1));

function shoot() {
  if (gameOver) return;

  const distance = Math.abs((playerX + 45) - (enemyX + 45));

  if (distance < 180) {
    hpEnemy -= 20;

    if (hpEnemy <= 0) {
      hpEnemy = 0;
      finish("VOCÊ VENCEU!");
    }
  }

  update();
}

document.getElementById("fire").addEventListener("pointerdown", shoot);

function enemyAttack() {
  if (gameOver) return;

  hpPlayer -= 10;

  if (hpPlayer <= 0) {
    hpPlayer = 0;
    finish("VOCÊ PERDEU!");
  }

  update();
}

function finish(text) {
  gameOver = true;
  message.textContent = text;
}

const enemyTimer = setInterval(() => {
  if (!gameOver) enemyAttack();
}, 2500);

document.getElementById("restart").addEventListener("click", () => {
  playerX = 35;
  enemyX = arena.clientWidth - 125;
  hpPlayer = 100;
  hpEnemy = 100;
  gameOver = false;
  message.textContent = "";
  update();
});

enemyX = arena.clientWidth - 125;
update();
