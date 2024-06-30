const mongodb=require('mongodb')

const getDb = require('../util/database').getDb;



class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    const db = getDb();
    return db.collection('products')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb(); // Fetch the database instance here
    return db.collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(error => {
        console.log(error);
        throw error; // Optionally re-throw the error to handle it in the calling code
      });
  }

  static findById(prodId){
    const db=getDb();
    return db.collection('products').find({_id:new mongodb.ObjectId(prodId)}).next().then(product=>{
      console.log(product);
      return product;
    }).catch(error=>{
      console.log(error)
    })
  }
}

module.exports = Product;