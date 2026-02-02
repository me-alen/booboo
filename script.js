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
  "My heart is racing… please say YES 🥺💗",
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

  launchConfetti();
  explodeHearts();
});

// NO button
noBtn.addEventListener("click", () => {
  clickCount++;

  // Start heartbeat
  if (heartBeat && heartBeat.paused) {
    heartBeat.play();
  }

  // Increase heartbeat speed
  heartbeatSpeed += 0.1;
  if (heartBeat) {
    heartBeat.playbackRate = heartbeatSpeed;
  }

  // Add shake effect
  const container = document.querySelector(".container");
  container.classList.add("shake");

  setTimeout(() => {
    container.classList.remove("shake");
  }, 400);

  if (clickCount === 5 && heartModal) {
    heartModal.style.display = "flex";
  }

  if (clickCount >= 5 && !hasTypedOnce) {
    typeMessage("My heart can’t take this 😭💔 Please say YES 🥺💖");
  }

  // Change button text
  const textIndex = clickCount % noTexts.length;
  noBtn.innerText = noTexts[textIndex];

  // Move button randomly (keep inside container)
  // Move button randomly across the whole screen (safe area)
  const padding = 20;

  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const randomX = Math.random() * (maxX - padding) + padding;

  const randomY = Math.random() * (maxY - padding) + padding;

  noBtn.style.position = "fixed";
  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
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
