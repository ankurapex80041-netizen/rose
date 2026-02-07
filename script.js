// Background Music Control
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.querySelector('.music-icon');
let isPlaying = false;

bgMusic.currentTime = 15;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicIcon.textContent = '🔇';
        musicToggle.classList.remove('playing');
        isPlaying = false;
    } else {
        bgMusic.play();
        musicIcon.textContent = '🔊';
        musicToggle.classList.add('playing');
        isPlaying = true;
    }
});

window.addEventListener('load', () => {
    bgMusic.currentTime = 25;
    bgMusic.play().then(() => {
        musicIcon.textContent = '🔊';
        musicToggle.classList.add('playing');
        isPlaying = true;
    }).catch(() => {
        console.log('Auto-play blocked. Click the music button to play.');
    });
});

// Falling Petals
function createPetal() {
    const petalsContainer = document.getElementById('petalsContainer');
    const petal = document.createElement('div');
    petal.classList.add('petal');

    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 8 + 7) + 's';
    petal.style.animationDelay = Math.random() * 3 + 's';
    petal.style.width = (Math.random() * 10 + 12) + 'px';
    petal.style.height = (Math.random() * 12 + 15) + 'px';

    petalsContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 15000);
}

// Petals quantity MORE reduced
setInterval(createPetal, 1500);

for (let i = 0; i < 30; i++) {
    setTimeout(createPetal, i * 150);
}

// Enter Button
const enterBtn = document.getElementById('enterBtn');
const welcomeScreen = document.getElementById('welcomeScreen');
const mainContent = document.getElementById('mainContent');

enterBtn.addEventListener('click', () => {
    for (let i = 0; i < 80; i++) {
        setTimeout(createPetal, i * 15);
    }

    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        mainContent.classList.add('active');
    }, 600);
});

// Moments So Far - Live Counter
const startDate = new Date("2025-10-05T00:00:00");

function updateMomentsSoFar() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

setInterval(updateMomentsSoFar, 1000);
updateMomentsSoFar();

// Screen Navigation
let currentScreen = 1;

function goToScreen(screenNumber) {
    const currentScreenEl = document.getElementById(`screen${currentScreen}`);
    const nextScreenEl = document.getElementById(`screen${screenNumber}`);
    const dots = document.querySelectorAll('.dot');

    currentScreenEl.classList.remove('active');
    currentScreenEl.classList.add('exit');

    dots[currentScreen - 1].classList.remove('active');
    dots[screenNumber - 1].classList.add('active');

    setTimeout(() => {
        currentScreenEl.classList.remove('exit');
        nextScreenEl.classList.add('active');
        currentScreen = screenNumber;

        for (let i = 0; i < 30; i++) {
            setTimeout(createPetal, i * 40);
        }
    }, 600);
}

// Dot Navigation
document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToScreen(index + 1);
    });
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (mainContent.classList.contains('active')) {
        if (e.key === 'ArrowRight' && currentScreen < 6) {
            goToScreen(currentScreen + 1);
        } else if (e.key === 'ArrowLeft' && currentScreen > 1) {
            goToScreen(currentScreen - 1);
        }
    }
});

// Restart Journey
function restartJourney() {
    const currentScreenEl = document.getElementById(`screen${currentScreen}`);
    const dots = document.querySelectorAll('.dot');

    currentScreenEl.classList.remove('active');

    dots.forEach(dot => dot.classList.remove('active'));
    dots[0].classList.add('active');

    setTimeout(() => {
        mainContent.classList.remove('active');
        welcomeScreen.classList.remove('hidden');
        currentScreen = 1;
        document.getElementById('screen1').classList.add('active');

        for (let i = 0; i < 100; i++) {
            setTimeout(createPetal, i * 10);
        }
    }, 600);
}

// Petal Quotes
const petalReasons = [
    "Your beautiful smile that makes my day better 😊",
    "The way you care about me 💕",
    "Your kindness and pure heart ✨",
    "You make me feel happy without trying 🌸",
    "Your cute little habits 💫",
    "You make me feel comfortable 💖",
    "Your eyes that I get lost in 😍",
    "Because you are special to me ❤️"
];

let pickedPetals = 0;
const totalPetals = 8;

function pickPetal(petalElement) {
    if (petalElement.classList.contains("picked")) return;

    const index = petalElement.getAttribute("data-reason");
    petalElement.classList.add("picked");
    pickedPetals++;

    const box = document.getElementById("reasonText");
    box.textContent = petalReasons[index];
    box.style.background = "white";
    box.style.color = "#000";
    box.style.padding = "15px";
    box.style.borderRadius = "10px";

    document.getElementById("petalsLeft").textContent =
        (totalPetals - pickedPetals) + " petals remaining";
}

console.log('🌹 Rose Day Website Loaded! Made with love ❤️');
