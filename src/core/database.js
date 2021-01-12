import { MemoryCollection } from './memory-collection';

class Database {
    constructor({ storage = {}, log = console } = {}) {
        this.storage = storage;
        this.log = log;
    }

    collection(name) {
        if (typeof this.storage[name] !== 'object') {
            this.storage[name] = {};
        }
        return new MemoryCollection(name, { storage: this.storage[name], log: this.log });
    }
}

export { Database };
