class BucketHashMap {
    constructor(size){
        this.size = size;
        this.buckets = new Array(size);
        for(var i = 0; i < size; i++){
            this.buckets[i] = new Bucket(i, size);
        }
        this.hash = null;
    }

    setHashFunction(hashFunction){
        this.hash = hashFunction;
    }

    hash(key){
        return this.hash(key);
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
        bucket.push(new Element(key, value));
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