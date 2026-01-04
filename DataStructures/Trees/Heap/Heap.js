class Heap {
    constructor(){
        this.arr = [];
    }

    insert(number){
        var n = new Node(number, this.arr.length + 1);
        this.insertNode(n);
    }

    insertNode(node){
        this.arr.push(node);
        this.updateHeight();
        node.setNodeDrawingAttributes(this.getX(node), this.getY(node), 50);
        this.siftUp();
        this.updateHeight();
        this.updateNodePositions();
    }

    siftDown(){
        var node = this.arr[0];
        var sifting = true;
        while(sifting){
            sifting = this.trySwapDown(node.id);
        }
    }

    siftUp(){
        var node = this.arr[this.arr.length - 1];
        var sifting = true;
        while(sifting){
            sifting = this.trySwapUp(node.id);
        }
    }

    extractMax(){
        this.swapNodes(0, this.arr.length - 1);
        var max = this.arr.pop();
        this.siftDown();
        this.updateHeight();
        this.updateNodePositions();
        return max;
    }

    //former parent is node1
    swapNodes(i, j){
        [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
        var temp = this.arr[i].id;
        this.arr[i].id = this.arr[j].id;
        this.arr[j].id = temp;
    }

    trySwapDown(id){
        if(this.arr[this.arr.length - 1].id >= (2 * id) + 1 && this.arr[id - 1].value < this.arr[(2 * id)].value){
            if(this.arr[(2 * id)].value < this.arr[(2 * id) - 1].value){
                this.swapNodes(id - 1, 2 * id - 1);
            } else {
                this.swapNodes(id - 1, 2 * id);
            }
        } else if(this.arr[this.arr.length - 1].id >= 2 * id && this.arr[id - 1].value < this.arr[(2 * id) - 1].value){
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
        var numNodesAtHeight = Math.pow(2, height);
        var pos = node.id - Math.pow(2, height - 1);
        var middle = innerWidth / 2;
        return ((2 * innerWidth / (numNodesAtHeight + 1)) * (pos + 1));
    }

    getY(node){
        return (((innerHeight * 5 / 6) / this.height) * node.getNodeHeight());
    }

    drawHeap(){
        for(var i = 0; i < this.arr.length; i++){
            this.arr[i].drawNode();
            if(this.arr[i].moving){
                this.arr[i].updateDrawingAttributes();
            }
        }
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