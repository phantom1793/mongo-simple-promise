var mongoSimple = require("../index");

var mydb = new mongoSimple("mongodb://localhost:27017");

var data = [
  {a: "aaa"},
  {b: "bbb"},
  {c: "ccc"},
  {x: 1, y: 2, z: 3},
  {x:1},
  {x: 1, a1:2}
];

mydb.connect("testA")
.then(() => {
  return mydb.insert("arcive",data);
})
.then(() => {
  return mydb.remove("arcive",{x: 1});
})
.then(() => {
  return mydb.update("arcive",{a: "aaa"},{ $set: {money: 99999999}});
})
.then(() => {
  return mydb.close();
});
