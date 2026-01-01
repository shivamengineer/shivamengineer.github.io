const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var queue = new Queue();

function enqueueNumber(){
    const enqueueInput = document.getElementById("Enqueue").value;
    var num = parseInt(enqueueInput);
    if(num != NaN && num >= 0){
        queue.enqueue(num);
    }
    document.getElementById("Enqueue").value = "";
}

function dequeueNumber(){
    if(queue.size() > 0){
        queue.dequeue();
    }
}

function clearscreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw(){
    clearscreen();
    queue.drawQueue();
}

function keyboard(e){
    switch(e.keyCode){
        case 13:
            const enqueueInput = document.getElementById("Enqueue");
            if(document.activeElement === enqueueInput){
                this.enqueueNumber();
            }
            break;
    }
}

window.addEventListener('keydown', keyboard);
setInterval(draw, 16);