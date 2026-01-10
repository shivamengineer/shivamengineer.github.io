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
        this.elements.push(new Element(key, value));
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
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.drawList();
    }

    drawList(){
        for(var i = 0; i < this.elements.length; i++){
            this.elements[i].drawElement();
        }
    }
}