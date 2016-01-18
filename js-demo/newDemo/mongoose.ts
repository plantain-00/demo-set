/// <reference path="typings/tsd.d.ts" />

import * as mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/my_database');

interface Cat extends mongoose.Document {
  name: string
}

const catSchema = new mongoose.Schema({
  name: String
});
const CatModel = mongoose.model<Cat>('Cat', catSchema);

const kitty = new CatModel({ name: 'test' });
kitty.save(function(error) {
  if (error) {
    console.log(error);
    return;
  }

  CatModel.find({
    name: 'test'
  }).exec().then((cat: Cat[]) => {
    console.log(cat.length);

    console.log('success');
  }, error=> {
    console.log(error);
  });
});