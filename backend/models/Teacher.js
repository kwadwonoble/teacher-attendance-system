const mongoose = require("mongoose");

const teacherSchema =
  new mongoose.Schema(

    {

      firstName: {
        type: String,
        required: true,
      },

      lastName: {
        type: String,
        required: true,
      },

      subject: {
        type: String,
        required: true,
      },

      jhsSubject: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        required: true,
      },

      town: {
        type: String,
        required: true,
      },

    },

    {
      timestamps: true,
    }

  );

module.exports =
  mongoose.model(
    "Teacher",
    teacherSchema
  );