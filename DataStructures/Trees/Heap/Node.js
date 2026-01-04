class Node {
    constructor(value, id){
        this.value = value;
        this.id = id;
        this.moving = false;
    }

    setNodeDrawingAttributes(x, y, radius){
        this.x = x;
        this.y = y;
        this.counter = 0;
        this.radius = radius;
    }

    setTargetDrawingAttributes(x, y){
        this.startX = x;
        this.startY = y;
        this.targetX = x;
        this.targetY = y;
        this.moving = true;
        this.movingX = true;
        this.movingY = true;
    }

    collides(mouseX, mouseY){
        return (((mouseX - this.x) ** 2) + ((mouseY - this.y) ** 2) < (this.radius ** 2));
    }

    updateDrawingAttributes(){
        this.moveX();
        this.moveY();
        if( !this.movingX && !this.movingY ){ 
            this.moving = false;
            this.inserting = false;
        }
    }

    moveX(){
        if(this.x < this.targetX - 4){
            this.x += 5;
        } else if(this.x > this.targetX + 4){
            this.x -= 5;
        } else {
            this.movingX = false;
        }
    }

    moveY(){
        if(this.y < this.targetY - 4){
            this.y += 5;
        } else if(this.y > this.targetY + 4){
            this.y -= 5;
        } else {
            this.movingY = false;
        }
    }

    isMoving(){
        return moving;
    }

    setDrawColors(){
        if(this.inserting){
            ctx.strokeStyle = "#1876adff";
            ctx.fillStyle = "#1876adff";
        } else {
            ctx.strokeStyle = "#FF2400";
            ctx.fillStyle = "white";
        }
    }

    setDefaultColors(){
        ctx.strokeStyle = "#FF2400";
        ctx.fillStyle = "#FF2400";
    }

    setTextColors(){
        if(this.inserting || this.rotating || this.rotatingUp || this.deleting || this.selected){
            ctx.fillStyle = "black";
        } else {
            ctx.fillStyle = "red";
        }
    }

    drawNode(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.lineWidth = 5;
        this.setDefaultColors();
        ctx.stroke();

        var fontSize = "";
        fontSize += this.radius;
        fontSize += "px Arial";
        ctx.font = fontSize;
        this.setTextColors();
        ctx.fillText(this.value, this.x - (this.radius / 4), this.y + (this.radius / 3), this.radius);
    }

    fillNode(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.setDrawColors();
        ctx.fill();
    }
}