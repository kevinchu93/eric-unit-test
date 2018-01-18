// This is the class that we want to test
// depends on arr and a random int generator
class MyClass
{
  constructor(arr, randomIntGenerator) {
    this.arr = arr;
    this.randomIntGenerator = randomIntGenerator;
  }
  
  getLength() {
    return this.arr.length;
  }
  
  ensure(index) {
    if (index < 0 || index >= this.arr.length)
      throw 'Does not exist'
  }
  
  get(index) {
    return this.arr[index];
  }
  
  getWithBugs(index) {
    return this.arr[index + 1];
  }

  getRandomBoolean() {
    return (this.randomIntGenerator() % 2) === 0;
  }
}

module.exports = MyClass;
