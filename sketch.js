let numMoles = 9; // モグラの数
let moleX = [];
let moleY = [];
let moleVisible = [];
let moleAppearTime = []; // モグラの表示開始時間を追跡
let moleSize = 50;
let score = 0;
let timeRemaining = 30; // ゲームの制限時間（秒）
let startTime;
let gameStarted = false;
let moleImage;
let moleVisibleDuration = 2000; // モグラの表示時間（ミリ秒）
let currentMoleIndex = -1; // 現在表示されているモグラのインデックス

function preload() {
  moleImage = loadImage('mogura.png');
}

function setup() {
  createCanvas(600, 600);
  moleImage.resize(moleSize, moleSize); // モグラのサイズにリサイズ
  for (let i = 0; i < numMoles; i++) {
    moleX[i] = (i % 3) * 200 + 75;
    moleY[i] = Math.floor(i / 3) * 200 + 75;
    moleVisible[i] = false;
  }
  textAlign(CENTER, CENTER);
  textSize(32);
}

function draw() {
  background(255);

  if (!gameStarted) {
    fill(0);
    text('Click to Start', width / 2, height / 2);
    return;
  }

  let currentTime = millis();
  let elapsedTime = (currentTime - startTime) / 1000;
  timeRemaining = 30 - elapsedTime;

  if (timeRemaining <= 0) {
    gameOver();
    return;
  }

  if (currentMoleIndex != -1) {
    if (currentTime - moleAppearTime[currentMoleIndex] > moleVisibleDuration) {
      moleVisible[currentMoleIndex] = false;
      currentMoleIndex = -1; // モグラを消したのでインデックスをリセット
    } else {
      image(moleImage, moleX[currentMoleIndex] - moleSize / 2, moleY[currentMoleIndex] - moleSize / 2); // モグラ画像を描画
    }
  }

  fill(0);
  text('Time: ' + Math.ceil(timeRemaining), width - 100, 30);
  text('Score: ' + score, 100, 30);

  if (currentMoleIndex == -1 && random(100) < 3) { // ランダムにモグラを表示する確率を調整
    currentMoleIndex = Math.floor(random(numMoles));
    moleVisible[currentMoleIndex] = true;
    moleAppearTime[currentMoleIndex] = currentTime; // 表示開始時間を記録
  }
}

function mousePressed() {
  if (!gameStarted) {
    gameStarted = true;
    startTime = millis();
    return;
  }

  if (currentMoleIndex != -1 && moleVisible[currentMoleIndex] && dist(mouseX, mouseY, moleX[currentMoleIndex], moleY[currentMoleIndex]) < moleSize / 2) {
    moleVisible[currentMoleIndex] = false;
    score++;
    currentMoleIndex = -1; // モグラを叩いたのでインデックスをリセット
  }
}

function gameOver() {
  background(255);
  fill(0);
  text('Game Over', width / 2, height / 2 - 40);
  text('Final Score: ' + score, width / 2, height / 2);
  noLoop();
}
