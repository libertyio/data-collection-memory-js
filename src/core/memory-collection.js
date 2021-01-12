/*
Copyright (C) 2020 Liberty Infrasystems LLC
https://liberty.io
*/

class MemoryCollection {
    constructor(name, { storage = {}, log = console } = {}) {
        this.name = name;
        this.storage = storage;
        this.log = log;
    }

    async insert(id, content) {
        if (this.storage[id]) {
            this.log.info(`collection ${this.name}: insert failed for id: ${id}`);
            return false;
        }
        this.storage[id] = content;
        this.log.info(`collection ${this.name}: insert id ${id} content: ${JSON.stringify(content)}`);
        return true;
    }

    async editById(id, content) {
        const existing = this.storage[id];
        if (typeof existing === 'string' && typeof content === 'string') {
            this.storage[id] = content;
            this.log.info(`collection ${this.name}: edit id ${id} content: ${JSON.stringify(content)}`);
            return true;
        }
        if (typeof existing === 'object' && typeof content === 'object') {
            this.storage[id] = { ...existing, ...content };
            this.log.info(`collection ${this.name}: edit id ${id} content: ${JSON.stringify(content)}`);
            return true;
        }
        this.log.info(`collection ${this.name}: edit failed for id: ${id}`);
        return false;
    }

    async fetchById(id) {
        if (typeof this.storage[id] === 'object' || typeof this.storage[id] === 'string') {
            this.log.info(`collection ${this.name}: fetch id ${id} content: ${JSON.stringify(this.storage[id])}`);
            return this.storage[id];
        }
        this.log.info(`collection ${this.name}: fetch failed for id: ${id}`);
        return null;
    }

    async deleteById(id) {
        if (this.storage[id]) {
            this.log.info(`collection ${this.name}: delete id ${id} content: ${JSON.stringify(this.storage[id])}`);
            delete this.storage[id];
            return true;
        }
        this.log.info(`collection ${this.name}: delete failed for id: ${id}`);
        return false;
    }
}

export { MemoryCollection };
