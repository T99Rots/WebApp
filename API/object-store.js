module.exports.ObjectStore = class ObjectStore {
  static fromArray (array, indexedKeys) {
    if(!array) throw new TypeError('Failed to construct \'ObjectStore\': 2 argument required, but only 0 present');
    if(!indexedKeys) throw new TypeError('Failed to construct \'ObjectStore\': 2 argument required, but only 1 present');
    const store = new this(indexedKeys);
    store.add(...array);
    return store;
  }

  constructor(...indexedKeys) {
    if(!indexedKeys) throw new TypeError('Failed to construct \'ObjectStore\': 1 argument required, but only 0 present');
    this._indexedKeys = [...indexedKeys];
    this._indexes = {};
    this._values = []
    for(const key of indexedKeys) {
      this._indexes[key] = {};
    }
  }

  add (...values) {
    for(const value of values) {
      for(let indexedKey of this._indexedKeys) {
        if(typeof value == 'object' && indexedKey in value) this._indexes[indexedKey][value[indexedKey]] = value; 
      }
      this._values.push(value);
    }
  }

  get(key, value) {
    if(!(this._indexedKeys.includes(key))) throw new Error(`Key ${key} is not indexed`);
    return this._indexes[key][value];
  }

  deleteByKey(key, value) {
    this.delete(this.get(key, value));
  }

  has(obj) {
    return this._values.includes(obj);
  }

  delete(obj) {
    const index = this._values.indexOf(obj);
    if(index !== -1) {
      for(let key of this._indexedKeys) {
        if(
          key in obj
          && obj[key] in this._indexes[key]
          && this._indexes[key][obj[key]] === obj
        ) delete this._indexes[key][obj[key]];
      }
      this._values.splice(index,1);
    }
  }

  forEach(callback) {
    for(const value of this) {
      callback(value);
    }
  }

  [Symbol.iterator]() {
    return this._values.values();
  }

  values () {
    return this._values;
  }
}