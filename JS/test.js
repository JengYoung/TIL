class Student {
  name = 'Jaeyoung';
  getName = function() {
    return this.name;
  }
}

const me = new Student();
console.log(me.getName);