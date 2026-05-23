const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true,
    trim: true,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
  },

  subject: {
    type: String,
    required: true,
  },


  jhsSubject: {
  type: String,
},

  phone: {
    type: String,
    required: true,
    unique: true,
  },

  town: {
    type: String,
    required: true,
  },

}, {

  timestamps: true,

});

module.exports =
  mongoose.model("Teacher", teacherSchema);