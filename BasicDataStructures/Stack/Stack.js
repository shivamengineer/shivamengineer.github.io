class Stack {
    constructor() {
        this.items = [];
        this.elements = [];
        this.leaving = [];
    }

    push(element) {
        var e = new Element(element);
        var difference = innerHeight * 0.05 * this.items.length;
        e.setElementDrawingAttributes(innerWidth * 0.1, innerHeight * 0.1, innerWidth * 0.2, innerHeight * 0.05);
        e.setTargetDrawingAttributes(innerWidth * 0.4, innerHeight * 0.85 - difference);
        this.items.push(element);
        this.elements.push(e);
    }   

    pop() {
        if (this.items.length != 0){
            var difference = innerHeight * 0.05 * this.leaving.length;
            this.elements[this.elements.length - 1].setTargetDrawingAttributes(innerWidth * 0.8, innerHeight * 0.2 + difference);
            this.leaving.push(this.elements.pop());
            return this.items.pop();
        } else {
            return null;
        }
    }

    peek() {
        if (this.items.length == 0)
            return "No elements in Stack";

        return this.items[this.items.length - 1];

    }

    printStack() {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }

    drawStack(){
        if(this.items.length > 0 || this.leaving.length > 0){
            ctx.beginPath();
            ctx.strokeStyle = "white";
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            if(this.elements.length > 0 && this.elements[0].moving){
                ctx.moveTo(innerWidth * 0.4, innerHeight * 0.9);
                ctx.lineTo(innerWidth * 0.6, innerHeight * 0.9);
                ctx.stroke();
            }
            
            for(var i = 0; i < this.elements.length; i++){
                this.elements[i].drawElement();
                if(i > 0){
                    this.elements[i].updateDrawingAttributes(this.elements[i-1]);
                } else {
                    this.elements[i].updateDrawingAttributes();
                }
            }

            for(var i = 0; i < this.leaving.length; i++){
                this.leaving[i].drawElement();
                if(i > 0){
                    this.leaving[i].updateDrawingAttributes(this.leaving[i - 1]);
                } else {
                    this.leaving[i].updateDrawingAttributes();
                }
                if(!this.leaving[i].moving){
                    this.leaving.splice(i, 1);
                    i--;
                }
            }
        }
    }
}