// Mad respect to https://codepen.io/bts/pen/BygMzB for figuring this out

const canvas = document.getElementById("wheeee");
const ctx = canvas.getContext("2d");

const numberOfDots = (canvas.width * canvas.height) / 1000;

let idCounter = 0;
const dots = {};

setInterval(() => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const dotsToAdd = numberOfDots - Object.keys(dots).length;

    for(let i = 0; i < dotsToAdd; i++) {
        const id = idCounter;
        idCounter += 1;

        const initialOffset = canvas.width > canvas.height ? canvas.width : canvas.height;

        const dx = Math.random() * 10 - 5;
        const dy = Math.random() * 10 - 5;

        dots[id] = {
            x: (canvas.width / 2) + (dx * (initialOffset / 10)),
            y: canvas.height / 2 + (dy * (initialOffset / 10)),
            dx,
            dy,
            width: 1,
            height: 1,
        }
    }

    ctx.fillStyle = "#ffffff";

    for(const [id, before] of Object.entries(dots)) {
        const after = {
            ...before,
            x: before.x + before.dx,
            y: before.y + before.dy,
            dx: before.dx + (before.dx / 50),
            dy: before.dy + (before.dy / 50)
        };

        if((after.x + after.width) < 0  || after.x > canvas.width ||
           (after.y + after.height) < 0 || after.y > canvas.height) {
            delete dots[id];
        } else {
            dots[id] = after;
            ctx.fillRect(after.x, after.y, after.width, after.height);
        }
    }
}, 40);