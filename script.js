const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

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

ctx.strokeStyle = currentColor;
ctx.lineWidth = currentSize;

color.addEventListener("input", function (event) {
    currentColor = event.target.value;
    ctx.strokeStyle = currentColor;
});

size.addEventListener("input", function (event) {
    currentSize = event.target.value;
    ctx.lineWidth = currentSize;
});

draw.addEventListener("click", function () {
    currentTool = "draw";
    console.log("tool:", currentTool);
});

erase.addEventListener("click", function () {
    currentTool = "erase";
    console.log("tool:", currentTool);
});

undo.addEventListener("click", function () {
    console.log("draw:", currentTool);
});

clean.addEventListener("click", function () {
    console.log("tool:", currentTool);
});

stamp.addEventListener("click", function () {
    currentTool = "stamp";
    console.log("tool:", currentTool);
});

canvas.addEventListener("mousedown", function (event) {
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
