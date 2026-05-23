import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { addTeacher } from "../services/teacherService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddTeacher() {

  const navigate = useNavigate();
  const [phoneError, setPhoneError] =
  useState("");
  

  const [formData, setFormData] = useState({

    firstName: "",

    lastName: "",

    Class: "",

    jhsSubject: "",

    phone: "",

    town: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await addTeacher(formData);

      toast.success(
        "Teacher added successfully"
      );

      navigate("/teachers");

    } catch (err) {

      toast.error(
        "Failed to add teacher"
      );

    }

  };

  return (

    <DashboardLayout>

      <div className="bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6">
          Add Teacher
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* FIRST NAME */}

          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-3 w-full rounded-lg"
            required
          />

          {/* LAST NAME */}

          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-3 w-full rounded-lg"
            required
          />

          {/* CLASS SELECT */}

          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg"
            required
          >

            <option value="">
              Select Class
            </option>

            <option value="Class One">
              Class One
            </option>

            <option value="Class Two">
              Class Two
            </option>

            <option value="Class Three">
              Class Three
            </option>

            <option value="Class Four">
              Class Four
            </option>

            <option value="Class Five">
              Class Five
            </option>

            <option value="Class Six">
              Class Six
            </option>

            <option value="JHS">
              JHS
            </option>

          </select>

          {/* JHS SUBJECT SELECT */}

          {formData.subject === "JHS" && (

            <select
              name="jhsSubject"
              value={formData.jhsSubject}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg"
              required
            >

              <option value="">
                Select JHS Subject
              </option>

              <option value="Core Maths Teacher">
                Core Maths Teacher
              </option>

              <option value="Int. Science Teacher">
                Int. Science Teacher
              </option>

              <option value="Social Studies Teacher">
                Social Studies Teacher
              </option>

              <option value="English Language Teacher">
                English Language Teacher
              </option>

              <option value="TWI Teacher">
                TWI Teacher
              </option>

              <option value="R.M.E Teacher">
                R.M.E Teacher
              </option>

              <option value="Computing Teacher">
                Computing Teacher
              </option>

              <option value="Career Technology Teacher">
                Career Technology Teacher
              </option>

              <option value="Creative Arts and Design Teacher">
                Creative Arts and Design Teacher
              </option>

            </select>

          )}

          {/* PHONE */}

{/* PHONE */}

          {/* PHONE */}

<div>

  <input
    type="text"
    name="phone"
    value={formData.phone}
    placeholder="Phone Number"
    className={`border p-3 w-full rounded-lg ${
      phoneError
        ? "border-red-500"
        : ""
    }`}
    required

    onChange={(e) => {

      // REMOVE NON-DIGITS
      const value =
        e.target.value.replace(/\D/g, "");

      // LIMIT TO 10 DIGITS
      if (value.length <= 10) {

        setFormData({

          ...formData,

          phone: value,

        });

      }

      // VALIDATION MESSAGE
      if (
        value.length > 0 &&
        value.length < 10
      ) {

        setPhoneError(
          "Phone number must be 10 digits"
        );

      } else {

        setPhoneError("");

      }

    }}
  />

  {/* ERROR MESSAGE */}

  {phoneError && (

    <p className="text-red-500 text-sm mt-1">

      {phoneError}

    </p>

  )}

</div>


          {/* TOWN */}

          <input
            name="town"
            value={formData.town}
            onChange={handleChange}
            placeholder="Town"
            className="border p-3 w-full rounded-lg"
            required
          />

          {/* BUTTON */}

          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg w-full"
          >
            Save Teacher
          </button>

        </form>

      </div>

    </DashboardLayout>

  );
}

export default AddTeacher;