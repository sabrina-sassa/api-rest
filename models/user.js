let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  nom: {type:String},
  prenom: {type:String},
  age: {type:Number}
})

const User = mongoose.model('User', userSchema)

module.exports = User