const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

const noTexts = [
  "Are you sure? 🥺",
  "Pleaseee 😭",
  "Think again 😏",
  "Don’t break my heart 💔",
  "Last chance 😤",
  "Come onnn 😘",
  "Say yes already 💕",
  "My heart is racing… 💓",
  "Why are you doing this 😭",
];

let clickCount = 0;
let heartbeatSpeed = 1;
let hasShownLoading = false;
let hasTypedOnce = false;
let typingInterval = null;

const music = document.getElementById("bgMusic");
const heartBeat = document.getElementById("heartBeat");
const heartsContainer = document.querySelector(".hearts");
const heartModal = document.getElementById("heartModal");
const loadingModal = document.getElementById("loadingModal");
const closeModalBtn = document.getElementById("closeModal");
const bossModal = document.getElementById("bossModal");

// Almost-click prank variables
let prankCooldown = false;
let prankEnabled = false;
let bossMode = false;
let bossInterval = null;
let prankDistance = 80;
let prankTimeout = null;

// Mode control
let currentMode = "normal"; // normal | prank | boss

// Reusable teleport function for NO button
function moveNoButton() {
  const padding = 20;

  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const randomX = Math.random() * (maxX - padding) + padding;
  const randomY = Math.random() * (maxY - padding) + padding;

  // Teleport + fade
  noBtn.classList.add("no-fade");

  setTimeout(() => {
    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";

    // Change text on every teleport in BOSS mode
    if (currentMode === "boss") {
      const bossTexts = [
        "I’m gonna cry now 🥲",
        "That hurts 😢",
        "Ouch 💔",
        "Pls baby 🥺👉👈",
        "You’re playing hard 😏",
        "Don’t be mean 😭💘",
        "Try YES once 😘",
        "I’m serious now 😤❤️",
        "My mom likes you 😆💖",
        "Future us is crying 🥹",
        "Okay… last last chance 😅",
        "I bought chocolates already 🍫😭",
        "Say YES or I’ll be sad forever 🥲",
        "Heart.exe crashing 💔💻",
        "Loading love… failed 😭",
        "This button is tired 😵💘",
      ];

      const randomIndex = Math.floor(Math.random() * bossTexts.length);
      noBtn.innerText = bossTexts[randomIndex];
    }
  }, 150);

  setTimeout(() => {
    noBtn.classList.remove("no-fade");
  }, 350);
}

function typeMessage(text, speed = 40) {
  if (typingInterval) return; // Prevent restarting

  message.innerHTML = "";
  let i = 0;

  typingInterval = setInterval(() => {
    if (i < text.length) {
      message.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
      typingInterval = null;
      hasTypedOnce = true;
    }
  }, speed);
}

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
  if (!hasTypedOnce) {
    typeMessage(
      "💖🥰\nYayyyy Boo Boo!!\nI knew you’d say yes!\nYou are my Valentine forever\n😘💘",
    );
  }

  noBtn.style.display = "none";
  yesBtn.style.transform = "translateX(-50%) scale(1.2)";

  if (loadingModal && !hasShownLoading) {
    hasShownLoading = true;
    loadingModal.style.display = "flex";

    setTimeout(() => {
      loadingModal.style.display = "none";
      music.play();
    }, 100);
  } else {
    music.play();
  }

  if (heartBeat) {
    heartBeat.pause();
    heartBeat.currentTime = 0;
  }

  // Reset all modes on YES
  if (bossInterval) {
    clearInterval(bossInterval);
    bossInterval = null;
  }

  bossMode = false;
  prankEnabled = false;
  currentMode = "normal";

  launchConfetti();
  explodeHearts();
});

noBtn.addEventListener("click", () => {
  // ======================
  // MODE FLOW CONTROLLER
  // normal (0–2) -> prank (5s) -> boss (10+)
  // ======================

  // Count only in normal & boss mode
  if (currentMode !== "prank") {
    clickCount++;
  }

  // ---- Enter PRANK mode after 3 clicks ----
  if (clickCount === 9 && currentMode === "normal") {
    currentMode = "prank";
    prankEnabled = true;
    prankDistance = 120;

    if (prankTimeout) clearTimeout(prankTimeout);

    // End prank after 5s -> Start BOSS mode immediately
    prankTimeout = setTimeout(() => {
      prankEnabled = true;
      currentMode = "boss";
      bossMode = true;
      prankDistance = 160;

      // Show Boss Warning
      if (bossModal) {
        bossModal.style.display = "flex";
        setTimeout(() => {
          bossModal.style.display = "none";
        }, 1500);
      }

      // Auto teleport in boss mode
      if (bossInterval) clearInterval(bossInterval);
      bossInterval = setInterval(() => {
        moveNoButton();
      }, 2000); // Slower teleport in boss mode
    }, 5000);
  }

  // ---- Enter BOSS mode by clicks (fallback) ----
  if (clickCount >= 10 && !bossMode && currentMode !== "prank") {
    currentMode = "boss";
    bossMode = true;
    prankEnabled = true;
    prankDistance = 160;

    // Show Boss Warning
    if (bossModal) {
      bossModal.style.display = "flex";
      setTimeout(() => {
        bossModal.style.display = "none";
      }, 1500);
    }

    // Auto teleport in boss mode
    bossInterval = setInterval(() => {
      moveNoButton();
    }, 2000); // Slower teleport in boss mode
  }

  // ======================
  // HEARTBEAT
  // ======================
  if (heartBeat && heartBeat.paused) {
    heartBeat.play();
  }

  heartbeatSpeed += 0.1;
  if (heartBeat) {
    heartBeat.playbackRate = heartbeatSpeed;
  }

  // ======================
  // SHAKE EFFECT
  // ======================
  const container = document.querySelector(".container");
  container.classList.add("shake");

  setTimeout(() => {
    container.classList.remove("shake");
  }, 400);

  // ======================
  // EMOTIONAL MESSAGE
  // ======================
  if (clickCount === 5 && heartModal) {
    heartModal.style.display = "flex";
  }

  if (clickCount >= 5 && !hasTypedOnce) {
    typeMessage("My heart can’t take this 😭💔 Please say YES 🥺💖");
  }

  // ======================
  // TEXT CONTROL
  // ======================

  // Boss mode uses only desperate texts
  let texts = noTexts;

  if (currentMode === "boss") {
    texts = [
      "SYSTEM OVERLOAD 💀💔",
      "LOVE.exe FAILED 😭",
      "EMERGENCY 🚨💘",
      "NO ESCAPE 😈❤️",
      "JUST SAY YES 😤🔥",
    ];
  }

  const textIndex = clickCount % texts.length;
  noBtn.innerText = texts[textIndex];

  // ======================
  // MOVE BUTTON
  // ======================
  moveNoButton();
});

function launchConfetti() {
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    const randomLeft = Math.random() * 100;

    confetti.style.left = randomLeft + "vw";
    confetti.style.background = ["#ff1493", "#ff69b4", "#ffc0cb", "#fff0f5"][
      Math.floor(Math.random() * 4)
    ];

    document.body.appendChild(confetti);

    // After falling, stick to bottom (pile up)
    setTimeout(() => {
      const bottomOffset = Math.random() * 30; // random small pile height
      confetti.style.animation = "none";
      confetti.style.top = "auto";
      confetti.style.bottom = bottomOffset + "px";
    }, 3000);
  }
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    heartModal.style.display = "none";
  });
}

function explodeHearts() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("div");
    heart.classList.add("explosion-heart");
    heart.innerHTML = "💖";

    const x = (Math.random() - 0.5) * 400 + "px";
    const y = (Math.random() - 0.5) * 400 + "px";

    heart.style.left = centerX + "px";
    heart.style.top = centerY + "px";
    heart.style.setProperty("--x", x);
    heart.style.setProperty("--y", y);

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1000);
  }
}

// "Almost clicked" prank: dodge when cursor gets close
window.addEventListener("mousemove", (e) => {
  if (noBtn.style.display === "none") return; // If YES clicked
  if (prankCooldown || !prankEnabled) return;

  const rect = noBtn.getBoundingClientRect();

  const btnCenterX = rect.left + rect.width / 2;
  const btnCenterY = rect.top + rect.height / 2;

  const dx = e.clientX - btnCenterX;
  const dy = e.clientY - btnCenterY;

  const distance = Math.sqrt(dx * dx + dy * dy);

  // If cursor is very close, dodge
  if (distance < prankDistance) {
    prankCooldown = true;

    // Teleport when cursor is close
    moveNoButton();

    setTimeout(() => {
      prankCooldown = false;
    }, 350);
  }
});

// Slow motion when cursor is near YES button
window.addEventListener("mousemove", (e) => {
  const rect = yesBtn.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;

  const distance = Math.sqrt(dx * dx + dy * dy);

  // If close to YES, enable slow motion
  if (distance < 120) {
    document.body.classList.add("slowmo");
  } else {
    document.body.classList.remove("slowmo");
  }
});
