const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

  date: {
    type: String,
    required: true,
  },

  records: [

    {

      teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },

      status: {
        type: String,
        enum: ["present", "absent"],
        default: "absent",
      },

      time: {
        type: String,
        default: null,
      },

    },

  ],

});

module.exports =
  mongoose.model("Attendance", attendanceSchema);