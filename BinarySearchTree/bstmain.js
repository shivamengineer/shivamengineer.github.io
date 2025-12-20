const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

/*var inputNum = 0;
var initialWidth = 50;
var inputBox = {height: 60, width: initialWidth, x: 20, y: 20, color: "white", text: 0};
var input = false;
var changeSize = false;*/

var bst = new BinarySearchTree();

var mousedown = false;
var canRotate = false;
var lastSelected = -999;
var lastX;
var lastY;
var startScrollY = -90;
var scrollX = 0;
var scrollY = 0;

function clearscreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawRect(rect){
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    ctx.fillStyle = "#FF2400";
    ctx.strokeStyle = "#FF2400";
    ctx.lineWidth = 5;
    ctx.font = "50px Arial";
    ctx.strokeText(rect.text, rect.x + 10, rect.y + (3 * rect.height / 4));
}

function draw(){
    clearscreen();
    bst.draw();
}

function addNodeFromNumber(){
    const numberInput = document.getElementById("BSTNumber").value;
    var num = parseInt(numberInput);
    if(num != NaN && num >= 0){
        bst.insert(num);
    }
    document.getElementById("BSTNumber").value = "";
}

function mouseCollides(x, y, rect){
    return (x >= rect.x &&
        x <= rect.x + rect.width &&
        y >= rect.y &&
        y <= rect.y + rect.height)
}

function mouseDown(e){
    var x = e.clientX;
    var y = e.clientY + startScrollY + scrollY;
    lastX = x;
    lastY = y;

    if(bst.height > 0){ canRotate = bst.collidesWithNode(x, y); }
    mousedown = true;
    bst.moveNodeX(x, y);
}

function mouseMove(e){
    if(mousedown){
        var x = e.clientX;
        var y = e.clientY + startScrollY + scrollY;
        bst.moveNodeX(x, y);
    }
}

function mouseUp(e){
    var x = e.clientX;
    var y = e.clientY + startScrollY + scrollY;
    var startX = x;
    var startY = y;
    bst.resetSelectedNode();
    if(canRotate != -999){
        lastSelected = canRotate;
        if(x > lastX + 50 && y > lastY + 50){
            bst.rotateRight(canRotate);
        } else if(x < lastX - 50 && y > lastY + 50){
            bst.rotateLeft(canRotate);
        }
    }
    mousedown = false;
}

function keyboard(e){
    switch(e.keyCode){
        case 13:
            this.addNodeFromNumber();
            break;
        case 46:
            if(lastSelected != -999){
                //bst.remove(lastSelected);
            }
            lastSelected = -999;
            break;
    }
}

function scroll(e){
    const currentScrollX = document.documentElement.scrollLeft;
    const currentScrollY = document.documentElement.scrollTop;
    scrollY = currentScrollY;
}

window.addEventListener("scroll", scroll, true);
window.addEventListener("mousedown", mouseDown, true);
window.addEventListener("mousemove", mouseMove, true);
window.addEventListener("mouseup", mouseUp, true);
window.addEventListener("touchstart", mouseDown, true);
window.addEventListener("touchmove", mouseMove, true);
window.addEventListener("touchend", mouseUp, true);
window.addEventListener("keydown", keyboard, true);
setInterval(draw, 16);