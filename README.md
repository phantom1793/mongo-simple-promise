Mongo-Simple-Promise
====

Overview

This module simplifies the complex mongodb async flow by using Promise.

By this module, you can use "CURD" method of mongodb API more comfortably.

## Demo

`var mongoSimple = require("mogno-simple-promise");

var mydb = new mongoSimple("mongodb://localhost:27017");

var data = [
  {a: "aaa"},
  {b: "bbb"},
  {c: "ccc"},
  {x: 1, y: 2, z: 3},
  {x:1},
  {x: 1, a1:2}
];

//Connct to database
mydb.connect("testA")
.then(() => {
  //find datas
  //the datas are given to next "then"s atribute
  return mydb.find("arcive",{});
})
.then((resolve) => {
  console.log(resolve); // display given data
  //remove datas
  return mydb.remove("arcive",{x: 1});
})
.then(() => {
  //update datas
  return mydb.update("arcive",{a: "aaa"},{ $set: {money: 99999999}});
})
.then(() => {
  //insert datas
  return mydb.insert("arcive",data);
})
.then(() => {
  //close the database
  return mydb.close();
});`

## install

`npm install mongo-simple-promise`

## Author

shirosmith
