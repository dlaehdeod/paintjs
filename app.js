const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const fillButton = document.getElementById("jsFill");
const saveButton = document.getElementById("jsSave");

let isDrawing = false;
let isFilling = false;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = "2.5";

Array.from(colors).forEach(
    color => color.addEventListener("click", onColorClick)
);

range.addEventListener("input", onRangeValueChanged);
fillButton.addEventListener("click", onFillButtonDown);
saveButton.addEventListener("click", onSaveButtonDown);

function onSaveButtonDown () {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "myPaint.png";
    link.click();
}

function onFillButtonDown (event) {
    isFilling = !isFilling;

    if (isFilling) {
        fillButton.innerText = "paint";
    }
    else {
        fillButton.innerText = "fill";
    }
}

function onRangeValueChanged (event) {
    ctx.lineWidth = event.srcElement.value;
}

function onColorClick (event) {
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = ctx.strokeStyle;
}

function onMouseMove (event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (isDrawing) {
        ctx.lineTo(x, y);
        ctx.stroke();   
    }
    else {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
}

function onMouseDown (event) {
    if (event.button == 0) {
        isDrawing = true;
    }
}

function onMouseUp (event) {
    isDrawing = false;
}

function onMouseLeave (event) {
    isDrawing = false;
}

function fillCanvas () {
    if (isFilling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function showContextMenu (event) {
    event.preventDefault();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", fillCanvas);
    canvas.addEventListener("contextmenu", showContextMenu);
}