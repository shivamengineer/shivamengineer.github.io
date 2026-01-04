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
        this.siftUp();
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
        return max;
    }

    //former parent is node1
    swapNodes(i, j){
        var tempNode = this.arr[i];
        this.arr[i] = this.arr[j];
        this.arr[j] = tempNode;
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
        }
    }

    updateHeight(){
        this.height = Math.floor(Math.log2(this.arr.length)) + 1;
    }
}