const Attendance = require("../models/Attendance");
const PDFDocument = require("pdfkit");

// SAVE ATTENDANCE
const saveAttendance = async (req, res) => {
  try {
    const { date, records } = req.body;

    let attendance;

    const existing = await Attendance.findOne({ date });

    if (existing) {
      existing.records = records;
      attendance = await existing.save();
    } else {
      attendance = await Attendance.create({
        date,
        records,
      });
    }

    res.json(attendance);

     } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL ATTENDANCE
const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("records.teacherId");

    res.json(attendance);

    } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET BY DATE
const getAttendanceByDate = async (req, res) => {
  try {
    const attendance = await Attendance.findOne({
      date: req.params.date,
    }).populate("records.teacherId");

    res.json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GENERATE PDF REPORT

const generateAttendancePDF = async (req, res) => {

  try {

    const attendance = await Attendance.findOne({
      date: req.params.date,
    }).populate("records.teacherId");

    if (!attendance) {

      return res.status(404).json({
        message: "No record found",
      });

    }

    const PDFDocument = require("pdfkit");

    const doc = new PDFDocument({

      margin: 50,

      size: "A4",

    });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=attendance-${req.params.date}.pdf`
    );

    doc.pipe(res);

    // TITLE
    doc
      .fontSize(20)
      .text(
        "SCHOOL ATTENDANCE REPORT",
        {
          align: "center",
        }
      );

    doc.moveDown();

    doc
      .fontSize(12)
      .text(`Date: ${attendance.date}`);

    doc.moveDown(2);

    // TABLE START POSITION
    const tableTop = 180;

    // COLUMN POSITIONS
    const teacherX = 50;
    const statusX = 300;
    const timeX = 420;

    // TABLE HEADER
    doc
      .font("Helvetica-Bold")
      .fontSize(12);

    doc.text(
      "Teacher",
      teacherX,
      tableTop
    );

    doc.text(
      "Status",
      statusX,
      tableTop
    );

    doc.text(
      "Time",
      timeX,
      tableTop
    );

    // HEADER LINE
    doc.moveTo(50, tableTop + 20)
      .lineTo(550, tableTop + 20)
      .stroke();

    // TABLE ROWS
    let y = tableTop + 35;

    attendance.records.forEach((record) => {

      const teacherName =
        record.teacherId
          ? `${record.teacherId.firstName} ${record.teacherId.lastName}`
          : "Unknown";

      doc
        .font("Helvetica")
        .fontSize(11);

      doc.text(
        teacherName,
        teacherX,
        y
      );

      doc.text(
        record.status,
        statusX,
        y
      );

      doc.text(
        record.time || "--",
        timeX,
        y
      );

      // ROW LINE
      doc.moveTo(50, y + 18)
        .lineTo(550, y + 18)
        .strokeColor("#cccccc")
        .stroke();

      y += 30;

    });

    doc.end();

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// DASHBOARD STATS
const getDashboardStats = async (req, res) => {

  try {

    const teachers =
      await require("../models/Teacher")
      .countDocuments();

    const attendance =
      await Attendance.find();

    let totalPresent = 0;
    let totalAbsent = 0;

    attendance.forEach((day) => {

      day.records.forEach((record) => {

        if (record.status === "present") {
          totalPresent++;
        } else {
          totalAbsent++;
        }

      });

    });

    res.json({

      totalTeachers: teachers,

      totalAttendanceDays:
        attendance.length,

      totalPresent,

      totalAbsent,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// MONTHLY ABSENCE ANALYTICS
const getMonthlyAbsentees = async (req, res) => {

  try {

    const { month } = req.params;

    const attendance =
      await Attendance.find()
      .populate("records.teacherId");

    const absenceMap = {};

    attendance.forEach((day) => {

      // FILTER MONTH
      if (day.date.startsWith(month)) {

        day.records.forEach((record) => {

          if (
            record.status === "absent" &&
            record.teacherId
          ) {

            const teacherName =
              `${record.teacherId.firstName} ${record.teacherId.lastName}`;

            if (!absenceMap[teacherName]) {

              absenceMap[teacherName] = 0;

            }

            absenceMap[teacherName]++;

          }

        });

      }

    });

    const result =
      Object.keys(absenceMap).map((teacher) => ({

        teacher,

        absences: absenceMap[teacher],

      }));

    res.json(result);

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }
};




module.exports = {
  saveAttendance,
  getAttendance,
  getAttendanceByDate,
  generateAttendancePDF,
  getDashboardStats,
  getMonthlyAbsentees,
};
