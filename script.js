const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

const draw = document.getElementById('draw');
const erase = document.getElementById('erase');
const size = document.getElementById('sizeBtn');
const color = document.getElementById('colorPicker');
const undo = document.getElementById('undo');
const clean = document.getElementById('clean');
const stamp = document.getElementById('stamp');

let isDrawing = false;
let currentTool = "draw";

draw.addEventListener("click", function () {
    currentTool = "draw";
    console.log("tool:", currentTool);
});

erase.addEventListener("click", function () {
    currentTool = "erase";
    console.log("tool:", currentTool);
});

undo.addEventListener("click", function () {
    currentTool = "undo";
    console.log("draw:", currentTool);
});

clean.addEventListener("click", function () {
    currentTool = "draw";
    console.log("tool:", currentTool);
});

stamp.addEventListener("click", function () {
    currentTool = "stamp";
    console.log("tool:", currentTool);
});