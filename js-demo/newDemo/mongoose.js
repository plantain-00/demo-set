/// <reference path="typings/tsd.d.ts" />
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/my_database');
var catSchema = new mongoose.Schema({
    name: String
});
var CatModel = mongoose.model('Cat', catSchema);
var kitty = new CatModel({ name: 'test' });
kitty.save(function (error) {
    if (error) {
        console.log(error);
        return;
    }
    CatModel.find({
        name: 'test'
    }).exec().then(function (cat) {
        console.log(cat.length);
        console.log('success');
    }, function (error) {
        console.log(error);
    });
});
