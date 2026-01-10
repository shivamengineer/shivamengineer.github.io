class Bucket {
    constructor(index, size){
        this.elements = new Array();
        this.width = (innerWidth / size) * 0.95;
        this.index = index;
        this.x = index * (innerWidth / size) + 5;
        this.y = innerHeight / 6;
        this.height = 100;
    }

    insert(key, value){
        for(var i = 0; i < this.elements.length; i++){
            if(this.elements[i].key === key){
                this.elements[i].value = value;
                return;
            }
        }
        var e = new Element(key, value);
        e.setElementDrawingAttributes(this.x, this.y + 30 + ((this.elements.length + 1) * this.height), this.width, this.height);
        this.elements.push(e);
    }

    get(key){
        for(var i = 0; i < this.elements.length; i++){
            if(this.elements[i].key === key){
                return this.elements[i].value;
            }
        }
        return null;
    }

    delete(key){
        for(var i = 0; i < this.elements.length; i++){
            if(this.elements[i].key === key){
                var ret = this.elements[i];
                this.elements.splice(i, 1);
                return ret;
            }
        }
    }

    drawBucket(){
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Bucket " + this.index, this.x + 10, this.y + 20);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.drawList();
    }

    drawList(){
        for(var i = 0; i < this.elements.length; i++){
            this.elements[i].drawElement();
        }
    }
}