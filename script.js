const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

const noTexts = [
  "Are you sure? 🥺",
  "Pleaseee 😭",
  "Don’t break my heart 💔",
  "Think again 😏",
  "Last chance 😤",
  "Come onnn 😘",
  "Say yes already 💕",
];

let clickCount = 0;

const music = document.getElementById("bgMusic");
const heartsContainer = document.querySelector(".hearts");

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💖";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  heart.style.animationDuration = Math.random() * 3 + 3 + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}

setInterval(createHeart, 300);

yesBtn.addEventListener("click", () => {
  message.innerHTML =
    "Yayyyy Anu!! 💖🥰 I knew it! You are my Valentine forever 😘💘";

  noBtn.style.display = "none";
  yesBtn.style.transform = "translateX(-50%) scale(1.2)";

  music.play();

  launchConfetti();
});

// NO button
noBtn.addEventListener("click", () => {
  clickCount++;

  // Change text
  const textIndex = clickCount % noTexts.length;
  noBtn.innerText = noTexts[textIndex];

  // Move button randomly
  const container = document.querySelector(".container");

  const maxX = container.clientWidth - noBtn.offsetWidth;
  const maxY = container.clientHeight - noBtn.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
});

function launchConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.background = ["#ff1493", "#ff69b4", "#ffc0cb", "#fff0f5"][
      Math.floor(Math.random() * 4)
    ];

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}
