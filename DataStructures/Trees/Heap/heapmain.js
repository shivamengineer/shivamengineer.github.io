const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var heap = new Heap();

function insertNumber(){
    const insertInput = document.getElementById("Insert").value;
    var num = parseInt(insertInput);
    if(num != NaN && num >= 0){
        heap.insertNumber(num);
    }
    document.getElementById("Insert").value = "";
}

function extractMax(){
    if(heap.size() > 0){
        heap.extractMax();
    }
}

function clearscreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw(){
    clearscreen();
    queue.drawHeap();
}

function keyboard(e){
    switch(e.keyCode){
        case 13:
            const insertInput = document.getElementById("Insert");
            if(document.activeElement === insertInput){
                this.insertNumber();
            }
            break;
    }
}

window.addEventListener('keydown', keyboard);
setInterval(draw, 16);