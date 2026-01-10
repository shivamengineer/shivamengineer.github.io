class BucketHashMap {
    constructor(size){
        this.size = size;
        this.buckets = new Array(size);
        for(var i = 0; i < size; i++){
            this.buckets[i] = new Bucket(i, size);
        }
    }

    setHashFunction(coefficient, constant, modulus){
        this.coefficient = parseInt(coefficient);
        this.constant = parseInt(constant);
        this.modulus = parseInt(modulus);
    }

    hash(key){
        console.log("Hashing key: " + key);
        var x = (this.coefficient * key) + this.constant;
        console.log("before mod: " + x);
        return x % this.modulus;
    }

    insert(key, value){
        var hashValue = this.hash(key);
        var bucket = this.buckets[hashValue];
        for(var i = 0; i < bucket.length; i++){
            if(bucket[i].key === key){
                bucket[i].value = value;
                return;
            }
        }
        bucket.insert(key, value);
    }

    get(key){
        var hashValue = this.hash(key);
        var bucket = this.buckets[hashValue];
        for(var i = 0; i < bucket.length; i++){
            if(bucket[i].key === key){
                return bucket[i].value;
            }
        }
        return null;
    }

    delete(key){
        var hashValue = this.hash(key);
        var bucket = this.buckets[hashValue];
        for(var i = 0; i < bucket.length; i++){
            if(bucket[i].key === key){
                var ret = bucket[i];
                bucket.splice(i, 1);
                return ret;
            }
        }
    }

    drawMap(){
        for(var i = 0; i < this.size; i++){
            this.buckets[i].drawBucket();
        }
    }
}