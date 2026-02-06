class Heap {
    constructor(){
        this.arr = [];
    }

    insert(number){
        var n = new Node(number, this.arr.length + 1);
        this.insertNode(n);
    }

    insertNode(node){
        node.inserting = true;
        this.arr.push(node);
        this.updateHeight();
        node.setNodeDrawingAttributes(this.getX(node), this.getY(node), 50);
        this.siftUp();
        this.updateHeight();
        this.updateNodePositions();
    }

    siftDown(){
        var node = this.arr[0];
        node.siftingDown = true;
        var sifting = true;
        while(sifting){
            sifting = this.trySwapDown(node.id);
        }
    }

    siftUp(){
        var node = this.arr[this.arr.length - 1];
        node.siftingUp = true;
        var sifting = true;
        while(sifting){
            sifting = this.trySwapUp(node.id);
        }
    }

    extractMax(){
        this.arr[this.arr.length - 1].setTargetDrawingAttributes(this.getX(this.arr[0]), this.getY(this.arr[0]));
        this.swapNodes(0, this.arr.length - 1);
        this.arr[this.arr.length - 1].deleting = true;
        var max = this.arr.pop();
        this.siftDown();
        this.updateHeight();
        this.updateNodePositions();
        return max; 
    }

    //former parent is node1
    swapNodes(i, j){
        this.arr[i].swapping = true;
        [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
        var temp = this.arr[i].id;
        this.arr[i].id = this.arr[j].id;
        this.arr[j].id = temp;
    }

    trySwapDown(id){
        if(this.arr[this.arr.length - 1].id >= (2 * id) + 1 && this.arr[id - 1].value < this.arr[(2 * id)].value){
            if(this.arr[(2 * id)].value < this.arr[(2 * id) - 1].value){
                this.arr[2 * id - 1].setTargetDrawingAttributes(this.getX(this.arr[id - 1]), this.getY(this.arr[id - 1]));
                this.arr[id - 1].setTargetDrawingAttributes(this.getX(this.arr[2 * id - 1]), this.getY(this.arr[2 * id - 1]));
                this.swapNodes(id - 1, 2 * id - 1);
            } else {
                this.arr[2 * id].setTargetDrawingAttributes(this.getX(this.arr[id - 1]), this.getY(this.arr[id - 1]));
                this.arr[id - 1].setTargetDrawingAttributes(this.getX(this.arr[2 * id]), this.getY(this.arr[2 * id]));
                this.swapNodes(id - 1, 2 * id);
            }
        } else if(this.arr[this.arr.length - 1].id >= 2 * id && this.arr[id - 1].value < this.arr[(2 * id) - 1].value){
            this.arr[2 * id - 1].setTargetDrawingAttributes(this.getX(this.arr[id - 1]), this.getY(this.arr[id - 1]));
            this.arr[id - 1].setTargetDrawingAttributes(this.getX(this.arr[2 * id - 1]), this.getY(this.arr[2 * id - 1]));
            this.swapNodes(id - 1, (2 * id) - 1);
        } else {
            return false;
        }
        return true;
    }

    trySwapUp(id){
        if(id == 1) return false;

        var parentIndex = Math.floor(id / 2) - 1;
        if(this.arr[parentIndex].value < this.arr[id - 1].value){
            this.arr[parentIndex].setTargetDrawingAttributes(this.getX(this.arr[id - 1]), this.getY(this.arr[id - 1]));
            this.arr[id - 1].setTargetDrawingAttributes(this.getX(this.arr[parentIndex]), this.getY(this.arr[parentIndex]));
            this.swapNodes(parentIndex, id - 1);
            return true;
        }
        return false;
    }

    updateHeight(){
        this.height = Math.floor(Math.log2(this.arr.length)) + 1;
    }

    getX(node){
        var height = node.getNodeHeight();
        var numNodesAtHeight = Math.pow(2, height - 1);
        var middle = innerWidth / 2;
        var leftStart = innerWidth / 10;
        var treeWidth = innerWidth * 0.8;
        var pos = node.id - Math.pow(2, height - 1) + 1;
        var middle = innerWidth / 2;
        return ((innerWidth / (numNodesAtHeight + 1)) * pos);
    }

    getY(node){
        return (((innerHeight * 5 / 6) / this.height) * node.getNodeHeight());
    }

    drawHeap(){
        for(var i = 0; i < this.arr.length; i++){
            var j = i + 1;
            if(this.arr.length >= 2 * j){
                this.drawLine(this.arr[i].x, this.arr[i].y, this.arr[(2 * j) - 1].x, this.arr[(2 * j) - 1].y);
            }
            if(this.arr.length >= (2 * j) + 1){
                this.drawLine(this.arr[i].x, this.arr[i].y, this.arr[2 * j].x, this.arr[2 * j].y);
            }
            this.arr[i].fillNode();
            this.arr[i].drawNode();
            if(this.arr[i].moving){
                this.arr[i].updateDrawingAttributes();
            }
        }
    }

    drawLine(x1, y1, x2, y2){
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    updateNodePositions(){
        for(var i = 0; i < this.arr.length; i++){
            this.arr[i].setTargetDrawingAttributes(this.getX(this.arr[i]), this.getY(this.arr[i]));
            this.arr[i].moving = true;
        }
    }

    size(){
        return this.arr.length;
    }
}