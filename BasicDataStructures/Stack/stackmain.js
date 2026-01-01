const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var stack = new Stack();

function pushNumber(){
    const pushInput = document.getElementById("Push").value;
    var num = parseInt(pushInput);
    if(num != NaN && num >= 0){
        stack.push(num);
    }
    document.getElementById("Push").value = "";
}

function popNumber(){
    if(stack.size() > 0){
        stack.pop();
    }
}

function clearscreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw(){
    clearscreen();
    stack.drawStack();
}

function keyboard(e){
    switch(e.keyCode){
        case 13:
            const pushInput = document.getElementById("Push");
            if(document.activeElement === pushInput){
                this.pushNumber();
            }
            break;
        case 46:
            if(lastSelected != -999){
                bst.deleteNode(bst.root, lastSelected);
                bst.clearSelected(bst.root);
            }
            lastSelected = -999;
            break;
    }
}

window.addEventListener('keydown', keyboard);
setInterval(draw, 16);