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
        var x = (this.coefficient * key) + this.constant;
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
        return this.buckets[hashValue].delete(key);
    }

    drawMap(){
        for(var i = 0; i < this.size; i++){
            this.buckets[i].drawBucket();
        }
    }
}