//Schema of project only 5 items 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Book = new Schema({
    name :{type:String} ,
    author : {type:String},
    language : {type:String},
    price : {type:Number},
    description : {type:String}
},
{
    collection:'books'
})

module.exports = mongoose.model('Book', Book);