const { expect } = require('chai');
const { MemoryCollection } = require('../../dist/index.umd.js');

describe('item', function () {
    it('empty', async function () {
        const collection = new MemoryCollection('empty');
        const nonExistent = await collection.fetchById('foo');
        expect(nonExistent).to.not.exist;
    });
    it('insert-fetch-delete', async function () {
        const collection = new MemoryCollection('empty');
        const nonExistent = await collection.fetchById('foo');
        expect(nonExistent).to.not.exist;
        collection.insert('foo','hello');
        const found = await collection.fetchById('foo');
        expect(found).to.exist;
        expect(found.length).to.equal('hello'.length);
        await collection.deleteById('foo');
        const nonExistent2 = await collection.fetchById('foo');
        expect(nonExistent2).to.not.exist;
    });
});
