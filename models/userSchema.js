
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;

// input your schema here and export them
const user = new Schema({
  fullName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

user.set('toJSON', {
  transform: (document, returnedObject) =>
  {
    // convert mongoDB _id to id
    returnedObject.id = returnedObject._id.toString(),
      delete returnedObject._id
    delete returnedObject.__v
    // do not reveal password hash
    delete returnedObject.password
  }
})


const userSchema = mongoose.model("users", user);
module.exports = userSchema;
