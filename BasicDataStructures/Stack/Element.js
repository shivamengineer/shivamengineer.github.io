class Element {
    constructor(value){
        this.value = value;
        this.moving = false;
    }

    setElementDrawingAttributes(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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

    updateDrawingAttributes(otherElement){
        if(otherElement != null && this.collides(otherElement)){
            return;
        }
        if(this.moveXFirst){
            this.updateDrawingAttributesXFirst();
        } else if(this.moveYFirst){
            this.updateDrawingAttributesYFirst();
        } else {
            this.updateDrawingAttributesBase();
        }
    }

    updateDrawingAttributesBase(){
        for(var i = 0; i < 2; i++){
            this.moveX();
            this.moveY();
        }
        if(!this.movingX && !this.movingY){ 
            this.moving = false;
        }
    }

    updateDrawingAttributesXFirst(){
        for(var i = 0; i < 2; i++){
            if(this.movingX){
                this.moveX();
            } else if(this.movingY){
                this.moveY();
            }
        }
        if(!this.movingX && !this.movingY){ 
            this.moving = false;
            this.moveXFirst = false;
            this.moveYFirst = false;
        }
    }

    updateDrawingAttributesYFirst(){
        for(var i = 0; i < 2; i++){
            if(this.movingY){
                this.moveY();
            } else if(this.movingX){
                this.moveX();
            }
        }
        if(!this.movingX && !this.movingY){ 
            this.moving = false;
            this.moveXFirst = false;
            this.moveYFirst = false;
        }
    }

    drawElement(){
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(this.value, this.x + this.width / 2.5, this.y + (3 * this.height / 4));
    }

    collides(element2){
        if(this.x < element2.x + element2.width &&
           this.x + this.width > element2.x &&
           this.y < element2.y + element2.height &&
           this.y + this.height > element2.y){
            return true;
        }
    }
}