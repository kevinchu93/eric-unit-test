const assert = require('assert');
const expect = require('expect.js');
const should = require('should');
const sinon = require('sinon');

const MyClass = require('../MyClass');

// mocha suggests grouping tests in "describe" functions, and "it" functions
describe('MyClass', () =>
{
  const games = ['pubg', 'overwatch', 'dota 2'];
  describe('.getLength', () =>
  {
    it('should return the correct length', () =>
    {
      // sut = system under test
      const sut = new MyClass(games);
      // you can assert stuff using the assert module
      assert.equal(sut.getLength(), 3);
    });
    
    it('should return 0 when given an empty array', () =>
    {
      const sut = new MyClass([]);
      // you can also use the expect.js module
      expect(sut.getLength()).to.be(0);
    });
  });

  describe('.ensure(index)', () =>
  {
    it('should not throw errors when index exist', () =>
    {
      const sut = new MyClass(games);
      // you can also use the should module
      should(() => sut.ensure(1)).not.throw();
    });
    
    it('should throw errors when index does not exist', () =>
    {
      const sut = new MyClass(games);
      assert.throws(() => sut.ensure(12));
    });
  });

  describe('.get(index)', () =>
  {
    it('should return the correct item', () =>
    {
      const sut = new MyClass(games);
      assert.equal(sut.get(1), games[1]);
    });
    
    it('should return null if item does not exist', () =>
    {
      const sut = new MyClass(games);
      assert.equal(sut.get(12), null);
    });
  });

  describe('.getWithBugs(index)', () =>
  {
    it('should return the correct item', () =>
    {
      const sut = new MyClass(games);
      assert.equal(sut.getWithBugs(1), games[1]);
    });
    
    it('should return null if item does not exist', () =>
    {
      const sut = new MyClass(games);
      assert.equal(sut.getWithBugs(12), null);
    });
  });

  describe('.getRandomBoolean()', () =>
  {
    it('should return true if generator returns even', () =>
    {
        // We have a more complex dependency, randomIntGenerator
        // Instead of implementing this dependency, let's mock it out
        // we use sinon to mock it out
        const mockGenerator = sinon.stub().returns(10);
        const sut = new MyClass(null, mockGenerator);
        expect(sut.getRandomBoolean()).to.be.true;
    });

    it('should return false if generator returns odd', () =>
    {
        const mockGenerator = sinon.stub().returns(1);
        const sut = new MyClass(null, mockGenerator);
        expect(sut.getRandomBoolean()).to.be.false;
        // since we mock out the dependency, we should probably also
        // ensure that it was called correctly
        assert.ok(mockGenerator.calledOnce);
    });
  });
});
