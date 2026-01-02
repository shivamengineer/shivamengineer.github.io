class Queue {
    constructor() {
        this.items = [];
        this.elements = [];
        this.leaving = [];
    }

    setElementTargetPosition(){
        for(var i = 0; i < this.elements.length; i++){
            var difference = 60 * i;
            this.elements[i].setTargetDrawingAttributes(innerWidth * 0.1 + difference, innerHeight * 0.3);
        }
    }

    enqueue(element) {
        var e = new Element(element);
        var difference = 60 * this.items.length;
        e.setElementDrawingAttributes(innerWidth * 0.1, innerHeight * 0.1, 60, innerHeight * 0.05);
        e.setTargetDrawingAttributes(innerWidth * 0.1 + difference, innerHeight * 0.3);
        e.moveXFirst = true;
        this.items.push(element);
        this.elements.push(e);
    }

    dequeue() {
        if (this.items.length > 0){
            var difference = 60 * this.leaving.length;
            this.elements[0].setTargetDrawingAttributes(innerWidth * 0.6 + difference, innerHeight * 0.5);
            this.elements[0].moveYFirst = true;
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
