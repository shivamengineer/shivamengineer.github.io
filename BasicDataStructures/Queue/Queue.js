class Queue {
    constructor() {
        this.items = [];
        this.elements = [];
        this.leaving = [];
    }

    setElementTargetPosition(){
        for(var i = 0; i < this.elements.length; i++){
            var difference = innerHeight * 0.05 * i;
            this.elements[i].setTargetDrawingAttributes(innerWidth * 0.4, innerHeight * 0.1 + difference);
        }
    }

    enqueue(element) {
        var e = new Element(element);
        var difference = innerHeight * 0.05 * this.items.length;
        e.setElementDrawingAttributes(innerWidth * 0.1, innerHeight * 0.1, innerWidth * 0.1, innerHeight * 0.05);
        e.setTargetDrawingAttributes(innerWidth * 0.4, innerHeight * 0.1 + difference);
        this.items.push(element);
        this.elements.push(e);
    }

    dequeue() {
        if (this.items.length > 0){
            var difference = innerHeight * 0.05 * this.leaving.length;
            this.elements[0].setTargetDrawingAttributes(innerWidth * 0.8, innerHeight * 0.2 + difference);
            this.leaving.push(this.elements.shift());
            this.setElementTargetPosition();
            return this.items.shift();
        } else {
            return null;
        }
    }

    front() {
        if (this.items.length == 0)
            return "No elements in Queue";

        return this.items[0];
    }

    printQueue() {
        var str = "";
        for (var i = 0; i < this.items.length; i++){
            str += this.items[i] + " ";
        }
        return str;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
        this.elements = [];
        this.leaving = [];
    }

    drawQueue(){
        if(this.items.length > 0 || this.leaving.length > 0){
            ctx.beginPath();
            ctx.strokeStyle = "white";
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            if(this.elements.length > 0 && this.elements[0].moving){
                ctx.moveTo(innerWidth * 0.4, innerHeight * 0.05);
                ctx.lineTo(innerWidth * 0.6, innerHeight * 0.05);
                ctx.stroke();
            }
            for(var i = 0; i < this.elements.length; i++){
                this.elements[i].drawElement();
                this.elements[i].updateDrawingAttributes();
            }
            for(var j = 0; j < this.leaving.length; j++){
                this.leaving[j].drawElement();
                this.leaving[j].updateDrawingAttributes();
                if(!this.leaving[j].moving){
                    this.leaving.splice(j, 1);
                    j--;
                }
            }   
        }
    }
}
