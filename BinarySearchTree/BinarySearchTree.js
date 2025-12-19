class BinarySearchTree {
    constructor(){
        this.height = 0;
        this.selectedNode = -999;
        this.mouseX = 0;
    }

    insert(value){
        var n = new Node(value, 1);
        this.insertWithNode(n);
    }

    insertWithNode(node){
        if(this.root == null){
            node.id = 1;
            this.root = node;
            this.root.position = 1;
            this.root.numLeft = 0;
            this.root.numRight = 0;
            this.numNodes = 1;
            this.root.height = 1;
            this.height = 1;
        } else {
            node.inserting = true;
            this.numNodes++;
            node.setNodeDrawingAttributes(this.root.x, this.root.y - 60, 50)
            this.insertNode(this.root, node);
            this.setMoving(this.root);
        }
    }

    insertNode(root, node){
        node.height = root.height + 1;
        if(node.height > this.height) { this.height = node.height; }
        if(node.value > root.value){
            if(root.right == null){
                node.id = (root.id * 2) + 1;
                root.right = node;
                node.position = root.position + 1;
                node.setTargetDrawingAttributes(this.getX(node), this.getY(node));
            } else {
                node.setTargetDrawingAttributes(this.getX(root.right), this.getY(root.right) - 60);
                this.insertNode(root.right, node);
            }
        } else {
            root.position++;
            this.increasePositionForSubtree(root.right);
            if(root.left == null){
                node.id = root.id * 2;
                root.left = node;
                node.position = root.position - 1;
                node.setTargetDrawingAttributes(this.getX(node), this.getY(node));
            } else {
                node.setTargetDrawingAttributes(this.getX(root.left), this.getY(root.left) - 60);
                this.insertNode(root.left, node);
            }
        }
    }

    remove(value){
        this.root = this.removeNode(this.root, value);
    }

    removeNode(node, value){
        if(node == null){
            return null;
        } else if(value < node.value){
            this.removeNode(node.left, value);
            node.position--;
            this.decreasePositionForSubtree(node.right);
            this.updateTreeHeight();
            return node;
        } else if(value > node.value){
            this.removeNode(node.right, value);
            this.updateTreeHeight();
            return node;
        } else {
            if(node.left == null && node.right == null){
                node = null;
                this.updateTreeHeight();
                return null;
            }
            if(node.left == null){
                node = node.right;
                this.updateTreeHeight();
                return node;
            } else if(node.right == null){
                node = node.left;
                this.updateTreeHeight();
                return node;
            }

            var nextNode = this.findMinNode(node.right);
            node.value = nextNode.value;

            node.right = this.removeNode(node.right, nextNode.value);
            this.updateTreeHeight();
            return node;
        }
    }

    findMinNode(node){
        if(node.left == null){
            return null;
        }
        var minNode = node;
        while(minNode.left != null){
            minNode = minNode.left;
        }
        return minNode;
    }
    
    increasePositionForSubtree(node){
        if(node != null){
            node.position++;
            this.increasePositionForSubtree(node.left);
            this.increasePositionForSubtree(node.right);
        }
    }

    decreasePositionForSubtree(node){
        if(node != null){
            node.position--;
            this.decreasePositionForSubtree(node.left);
            this.decreasePositionForSubtree(node.right);
        }
    }

    findNodeFromValue(value){
        if(this.root == null){
            return null;
        } else {
            var found = false;
            var n = this.root;
            while(!found){
                if(n.value == value){
                    return n;
                } else if(n.value < value){
                    if(n.right != null){
                        n = n.right;
                    } else {
                        return null;
                    }
                } else if(n.value > value){
                    if(n.left != null){
                        n = n.left;
                    } else {
                        return null;
                    }
                }
            }
        }
    }

    findParentFromValue(value){
        if(this.root == null){
            return null;
        } else {
            var found = false;
            var n = this.root;
            while(!found){
                if(n.value < value){
                    if(n.right != null){
                        if(n.right.value == value){
                            return n;
                        } else {
                            n = n.right;
                        }
                    } else {
                        return null;
                    }
                } else if(n.value > value){
                    if(n.left != null){
                        if(n.left.value == value){
                            return n;
                        } else {
                            n = n.left;
                        }
                    } else {
                        return null;
                    }
                }
            }
        }
    }

    resetPositionRight(node, parentID){
        node.id = (parentID * 2) + 1;
        if(node.left != null){
            this.resetPositionLeft(node.left, node.id);
        }
        if(node.right != null){
            this.resetPositionRight(node.right, node.id);
        }
    }

    resetPositionLeft(node, parentID){
        node.id = parentID * 2;
        if(node.left != null){
            this.resetPositionLeft(node.left, node.id);
        }
        if(node.right != null){
            this.resetPositionRight(node.right, node.id);
        }
    }

    rotateRight(value){
        var n = this.findNodeFromValue(value);
        if(n != null) this.rotateNodeRight(n);
    }

    rotateNodeRight(node){
        node.rotating = true;
        if(node.value == this.root.value){
            if(this.root.left != null){
                this.root.left.rotatingUp = true;
                var n = this.root;
                this.root = this.root.left;
                if(this.root.right != null){
                    n.left = this.root.right;
                } else {
                    n.left = null;
                }
                this.root.right = n;
                this.root.id = 1;
                if(this.root.left != null){
                    this.resetPositionLeft(this.root.left, 1);
                }
                this.resetPositionRight(this.root.right, 1);
            }
        } else {
            var parent = this.findParentFromValue(node.value);
            if(node.left != null){
                node.left.rotatingUp = true;
                var leftNode = node.left;
                if(leftNode.right != null){
                    node.left = leftNode.right;
                } else {
                    node.left = null;
                }
                leftNode.right = node;
                if(parent.left != null && parent.left.value == node.value){
                    parent.left = leftNode;
                    this.resetPositionLeft(leftNode, parent.id);
                } else {
                    parent.right = leftNode;
                    this.resetPositionRight(leftNode, parent.id);
                }
            }
        }
        this.updateTreeHeight();
        this.setMoving(this.root);
    }

    rotateLeft(value){
        var n = this.findNodeFromValue(value);
        if(n != null)
            this.rotateNodeLeft(n);
    }

    rotateNodeLeft(node){
        node.rotating = true;
        if(node.value == this.root.value){
            if(this.root.right != null){
                this.root.right.rotatingUp = true;
                var n = this.root;
                this.root = this.root.right;
                if(this.root.left != null){
                    n.right = this.root.left;
                } else {
                    n.right = null;
                }
                this.root.left = n;
                this.root.id = 1;
                if(this.root.right != null){
                    this.resetPositionRight(this.root.right, 1);
                }
                this.resetPositionLeft(this.root.left, 1);
            }
        } else {
            var parent = this.findParentFromValue(node.value);
            if(node.right != null){
                node.right.rotatingUp = true;
                var rightNode = node.right;
                if(rightNode.left != null){
                    node.right = rightNode.left;
                } else {
                    node.right = null;
                }
                rightNode.left = node;
                if(parent.right != null && parent.right.value == node.value){
                    parent.right = rightNode;
                    this.resetPositionRight(rightNode, parent.id);
                } else {
                    parent.left = rightNode;
                    this.resetPositionLeft(rightNode, parent.id);
                }
            }
        }
        this.updateTreeHeight();
        this.setMoving(this.root);
    }

    updateTreeHeight(){
        this.height = 0;
        this.updateHeightsOfTree(this.root, 1);
    }

    updateHeightsOfTree(node, height){
        node.height = height;
        if(this.height < node.height) { this.height = node.height; }
        if(node.left != null) { this.updateHeightsOfTree(node.left, height + 1); }
        if(node.right != null) { this.updateHeightsOfTree(node.right, height + 1); }
    }

    draw(){
        if(this != null)
            this.drawCurrentNode(this.root);
    }

    getX(node){
        if(this.selectedNode != node.value) {
            return (((innerWidth * 5 / 6) / this.numNodes) * node.position);
        } else {
            return this.mouseX;
        }
    }

    getY(node){
        if(this.selectedNode != node.value){
            return (((innerHeight * 5 / 6) / this.height) * node.height);
        } else {
            return this.mouseY;
        }
    }

    collidesWithNode(x, y){
        return this.collidesWith(this.root, x, y);
    }

    collidesWith(node, x, y){
        if(node.collides(x, y)){
            this.selectedNode = node.value;
            return node.value;
        }
        var ret = -999;
        if(node.left != null){
            ret = this.collidesWith(node.left, x, y);
            if(ret != -999){
                this.selectedNode = ret;
                return ret;
            }
        }
        if(node.right != null){
            ret = this.collidesWith(node.right, x, y);
            if(ret != -999){
                this.selectedNode = ret;
                return ret;
            }
        }
        return ret;
    }

    resetSelectedNode(){
        this.selectedNode = -999;
    }

    moveNodeX(x, y){
        this.mouseX = x;
        this.mouseY = y;
    }

    setMoving(node){
        if(node != null){
            this.setHeight(node);
            node.setTargetDrawingAttributes(this.getX(node), this.getY(node));
            node.moving = true;
            this.setMoving(node.left);
            this.setMoving(node.right);
        }
    }

    drawCurrentNode(node){
        if(node != null){
            this.setHeight(node);
            if(node.moving){
                node.updateDrawingAttributes();
            } else {
                node.setNodeDrawingAttributes(this.getX(node), this.getY(node), 50);
            }
            if(node.left != null){
                this.setLineColors(node.left);
                this.drawLine(node.x, node.y, node.left.x, node.left.y);
            }
            if(node.right != null){
                this.setLineColors(node.right);
                this.drawLine(node.x, node.y, node.right.x, node.right.y);
            }
            node.fillNode();
            node.drawNode();
            this.drawCurrentNode(node.left);
            this.drawCurrentNode(node.right);
        }
    }

    drawLine(x1, y1, x2, y2){
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    setHeight(node){
        node.height = -1;
        var level = 0;
        while(node.height == -1){
            if(node.id < (2 ** level)){
                node.height = level;
            } else {
                level++;
            }
        }
    }

    setLineColors(node){
        this.setHeight(node);
        if(node.inserting){
            ctx.strokeStyle = "#1876adff"
        } else if(node.rotating){
            ctx.strokeStyle = "#a11996ff";
        } else if(node.rotatingUp){
            ctx.strokeStyle = "#31ff31ff";
        } else {
           ctx.strokeStyle = "#FF2400";
        }
    }    
}