const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d", { willReadFrequently: true });

ctx.lineCap = "round";
ctx.lineJoin = "round";

const draw = document.getElementById('draw');
const erase = document.getElementById('erase');
const size = document.getElementById('sizeBtn');
const color = document.getElementById('colorPicker');
const undo = document.getElementById('undo');
const clean = document.getElementById('clean');
const stamp = document.getElementById('stamp');

let isDrawing = false;
let currentTool = "draw";
let currentColor = color.value;
let currentSize = size.value;
let undoStack = [];

ctx.strokeStyle = currentColor;
ctx.lineWidth = currentSize;

function setActiveButton(activeBtn) {
    [draw, erase, stamp].forEach(function (btn) {
        btn.classList.remove("active");
    });
    activeBtn.classList.add("active");
}

function saveSnapshot() {
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    undoStack.push(snapshot);
}

function drawStamp(x, y) {
    ctx.font = currentSize * 4 + "px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = currentColor;
    ctx.fillText("★", x, y);
}

color.addEventListener("input", function (event) {
    currentColor = event.target.value;
    ctx.strokeStyle = currentColor;
});

size.addEventListener("input", function (event) {
    currentSize = event.target.value;
    ctx.lineWidth = currentSize;
});

draw.addEventListener("click", function () {
    ctx.globalCompositeOperation = 'source-over';
    currentTool = "draw";
    setActiveButton(draw);
});

erase.addEventListener("click", function () {
    ctx.globalCompositeOperation = 'destination-out';
    currentTool = "erase";
    setActiveButton(erase);
});

clean.addEventListener("click", function () {
    saveSnapshot();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
});

stamp.addEventListener("click", function () {
    ctx.globalCompositeOperation = 'source-over';
    currentTool = "stamp";
    setActiveButton(stamp);
});

canvas.addEventListener("mousedown", function (event) {
    if (currentTool === "stamp") {
        saveSnapshot();
        drawStamp(event.offsetX, event.offsetY);
        return;
    }
    saveSnapshot();
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
});

canvas.addEventListener("mousemove", function (event) {
    if (!isDrawing) return;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    ctx.beginPath();
});

canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
    ctx.beginPath();
});

undo.addEventListener("click", function () {
    if (undoStack.length > 0) {
        const prev = undoStack.pop();
        ctx.putImageData(prev, 0, 0);
    }
});