const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var map;

function createMap(numBuckets){
    map = new BucketHashMap(numBuckets);
}

function initializeMap(){
    const sizeInput = document.getElementById("Size").value;
    if(sizeInput != "" && sizeInput > 0){
        createMap(sizeInput);
    } else {
        alert("Must enter valid size to initialize map!");
    }
    this.document.getElementById("Size").value = "";
}

function setHashFunction(){
    const hashFunctionInput = document.getElementById("HashFunction").value;
    if(hashFunctionInput != ""){
        map.hash = function(key){
            var hashValue = 0;
            for(var i = 0; i < key.length; i++){
                hashValue += key.charCodeAt(i);
            }
            return hashValue % this.size;
        }
    } else {
        alert("Must enter valid hash function!");
    }
}

function insertPair(){
    if(map == null){
        alert("Must initialize map first!");
        return;
    }
    const keyInput = document.getElementById("Key").value;
    const valueInput = document.getElementById("Value").value;
    if(keyInput != "" && valueInput != ""){
        map.insert(keyInput, valueInput);
    }
    document.getElementById("Key").value = "";
    document.getElementById("Value").value = "";
}

function get(key){
    if(map == null){
        alert("Must initialize map first!");
        return;
    }

    var value = map.get(key);
    if(value != null){
        alert("Value: " + value);
    } else {
        alert("Key not found in map");
    }
}

function deletePair(){
    if(map == null){
        alert("Must initialize map first!");
        return;
    }

    const deleteKeyInput = document.getElementById("RemoveKey").value;
    if(deleteKeyInput == ""){
        alert("Must enter key to delete!");
        return;
    }

    var element = map.delete(deleteKeyInput);
    if(element != null){
        alert("Deleted element with key: " + element.key + ", value: " + element.value);
    } else {
        alert("Key not found in map");
    }
}

function clearscreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw(){
    clearscreen();
    if(map != null){
        map.drawMap();
    }
}

function keyboard(e){
    switch(e.keyCode){
        case 13:
            const keyInput = document.getElementById("Key");
            const valueInput = document.getElementById("Value");
            const initializeInput = document.getElementById("Size");
            if(document.activeElement === keyInput || document.activeElement === valueInput){
                this.insertPair();
            } else if(document.activeElement === initializeInput){
                this.initializeMap();
            }
            break;
    }
}

window.addEventListener('keydown', keyboard);
setInterval(draw, 16);