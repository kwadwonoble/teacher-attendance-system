const express = require("express");

const router = express.Router();

const Attendance =
  require("../models/Attendance");

const Teacher =
  require("../models/Teacher");

const PDFDocument =
  require("pdfkit");

// SAVE ATTENDANCE
router.post("/", async (req, res) => {

  try {

    const { date, records } =
      req.body;

    // CHECK EXISTING DATE
    const existingAttendance =
      await Attendance.findOne({
        date,
      });

    if (existingAttendance) {

      existingAttendance.records =
        records;

      await existingAttendance.save();

      return res.json({
        message:
          "Attendance updated",
      });

    }

    const attendance =
      new Attendance({
        date,
        records,
      });

    await attendance.save();

    res.status(201).json({
      message:
        "Attendance saved",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Failed to save attendance",
    });

  }

});

// GET ALL ATTENDANCE
router.get("/", async (req, res) => {

  try {

    const attendance =
      await Attendance.find()

        .populate("records.teacherId")

        .sort({ date: -1 });

    res.json(attendance);

  } catch (error) {

    res.status(500).json({
      message:
        "Failed to fetch attendance",
    });

  }

});

// DASHBOARD STATS
router.get(
  "/dashboard/stats",
  async (req, res) => {

    try {

      const totalTeachers =
        await Teacher.countDocuments();

      const attendanceDays =
        await Attendance.countDocuments();

      const attendanceRecords =
        await Attendance.find();

      let totalPresent = 0;

      let totalAbsent = 0;

      attendanceRecords.forEach(
        (attendance) => {

          attendance.records.forEach(
            (record) => {

              if (
                record.status ===
                "present"
              ) {

                totalPresent++;

              } else {

                totalAbsent++;

              }

            }
          );

        }
      );

      res.json({

        totalTeachers,

        totalAttendanceDays:
          attendanceDays,

        totalPresent,

        totalAbsent,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to load dashboard stats",
      });

    }

  }
);

// ABSENCE ANALYTICS
router.get(
  "/analytics/absences/:month",
  async (req, res) => {

    try {

      const month =
        req.params.month;

      const attendance =
        await Attendance.find()

          .populate(
            "records.teacherId"
          );

      const absenceMap = {};

      attendance.forEach((day) => {

        if (
          day.date.startsWith(month)
        ) {

          day.records.forEach(
            (record) => {

              if (
                record.status ===
                "absent"
              ) {

                const teacherName =

                  `${record.teacherId.firstName} ${record.teacherId.lastName}`;

                if (
                  absenceMap[
                    teacherName
                  ]
                ) {

                  absenceMap[
                    teacherName
                  ]++;

                } else {

                  absenceMap[
                    teacherName
                  ] = 1;

                }

              }

            }
          );

        }

      });

      const result =
        Object.entries(
          absenceMap
        ).map(
          ([teacher, absences]) => ({

            teacher,

            absences,

          })
        );

      res.json(result);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to load analytics",
      });

    }

  }
);

// PDF DOWNLOAD
router.get(
  "/pdf/:date",
  async (req, res) => {

    try {

      const attendance =
        await Attendance.findOne({

          date:
            req.params.date,

        }).populate(
          "records.teacherId"
        );

      if (!attendance) {

        return res.status(404).send(
          "Attendance not found"
        );

      }

      const doc =
        new PDFDocument({
          margin: 40,
        });

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",

        `attachment; filename=attendance-${attendance.date}.pdf`
      );

      doc.pipe(res);

      doc
        .fontSize(20)
        .text(
          "Attendance Sheet",
          {
            align: "center",
          }
        );

      doc.moveDown();

      doc
        .fontSize(14)
        .text(
          `Date: ${attendance.date}`
        );

      doc.moveDown();

      // TABLE HEADER
      doc.fontSize(12);

      doc.text(
        "Teacher",
        50,
        doc.y,
        {
          width: 180,
        }
      );

      doc.text(
        "Status",
        250,
        doc.y - 15,
        {
          width: 100,
        }
      );

      doc.text(
        "Time",
        400,
        doc.y - 15,
        {
          width: 100,
        }
      );

      doc.moveDown();

      attendance.records.forEach(
        (record) => {

          const teacherName =
            record.teacherId
              ? `${record.teacherId.firstName} ${record.teacherId.lastName}`
              : "Unknown";

          doc.text(
            teacherName,
            50,
            doc.y,
            {
              width: 180,
            }
          );

          doc.text(
            record.status,
            250,
            doc.y - 15,
            {
              width: 100,
            }
          );

          doc.text(
            record.time || "--",
            400,
            doc.y - 15,
            {
              width: 100,
            }
          );

          doc.moveDown();

        }
      );

      doc.end();

    } catch (error) {

      console.log(error);

      res.status(500).send(
        "Failed to generate PDF"
      );

    }

  }
);

module.exports = router;