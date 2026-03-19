let gameseq = [];
let userseq = [];
let btns = ["red", "green", "yellow", "purple"];

let started = false;
let level = 0;

// High score (stored permanently)
let highScore = localStorage.getItem("highScore") || 0;

let h2 = document.querySelector("h2");

// Start game
document.addEventListener("keydown", function () {
    if (!started) {
        started = true;
        gameseq = [];
        userseq = [];
        level = 0;
        levelup();
    }
});

// Flash animation
function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

// Level up
function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIDX = Math.floor(Math.random() * btns.length);
    let randomcolor = btns[randomIDX];
    let randombtn = document.querySelector(`.${randomcolor}`);

    gameseq.push(randomcolor);
    btnflash(randombtn);
}

// Check answer
function checkAns() {
    let idx = userseq.length - 1;

    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        let score = level - 1;

        // Update high score ONLY if beaten
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }

        h2.innerHTML = `Game Over!<br>
            Your Score: <b>${score}</b><br>
            Your Highest Score: <b>${highScore}</b><br>
            Press any key to restart`;

        document.body.style.background = "red";
        setTimeout(() => {
            document.body.style.background = "white";
        }, 150);

        reset();
    }
}

// Button press
function btnpress() {
    let btn = this;
    btnflash(btn);

    let usercolor = btn.classList[1];
    userseq.push(usercolor);

    checkAns();
}

// Reset game
function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

// Button listeners
let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}
