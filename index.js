"use strict";
const MongoClient = require("mongodb").MongoClient;

class MongoSimplePromise{

  constructor(url){
    this.url = url;
    this.client;
    this.db;
  }

  connect(dbName){
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url, (err, client) => {
        if(err) reject(err);
        try{
          this.client = client;
          this.db = client.db(dbName);
        } catch(e) {
          reject(e);
        }
        resolve();
      });
    });
  }

  close(){
    return new Promise((resolve, reject) => {
      try{
        this.client.close();
      }catch(e){
        reject(e);
      }
      resolve();
    });
  }
  find(collectionName,query){
    var callback = arguments[2];
    return new Promise((resolve,reject)=>{
      this.db.collection(collectionName).find(query).toArray((err, docs) => {
        if(err) reject(err);
        if(callback) callback(docs);
        resolve(docs);
      });
    });
  }
  insert(collectionName, data){
    return new Promise((resolve,reject)=>{
      if(!(data instanceof Array)) data = [data];
      this.db.collection(collectionName).insertMany(data,(err,result) => {
        if(err) reject(err);
        resolve(result);
      });
    });
  }
  update(collectionName, filter, update){
    return new Promise((resolve,reject) => {
      this.db.collection(collectionName).updateMany(filter,update,(err, result) => {
        if(err) reject(err);
        resolve(result);
      });
    });
  }
  remove(collectionName, filter){
    return new Promise((resolve,reject)=>{
      this.db.collection(collectionName).remove(filter, (err, result)=>{
        if(err) reject(err);
        resolve(result);
      });
    });
  }
}

function test(){
  var mydb = new MongoSimple("mongodb://localhost:27017");
  mydb.connect("pansiko")
  .then(() => {
    return mydb.find("article",{});
  })
  .then((result) => {
    console.log(result);
    return mydb.close();
  });
}
module.exports = MongoSimplePromise;
