import { CollegeData } from "../Assets/CollegeData";
import { courseWithDic } from "../Assets/CourseData";

const Admission = ({ dataFromCSV }) => {
  console.log(dataFromCSV);
  dataFromCSV.forEach((bd) => {
    bd["Student_Name"] = bd["Student_Name"].replace(/[^a-zA-Z\s]/gi, "");
    CollegeData.forEach((value) => {
      if (bd["College_Name"] === value.COLLEGE_NAME) {
        bd["COLLEGE_SSP_CODE"] = value.COLLEGE_SSP_CODE;
        bd["DISTRICT_SSP_CODE"] = value.DISTRICT_SSP_CODE;
        bd["College_District_Name"] = value.College_District_Name;
        bd["TALUK_SSP_CODE"] = value.TALUK_SSP_CODE;
        bd["College_Taluk_Name"] = value.College_Taluk_Name;
        bd["COLLEGE_TYPE_SSP_CODE"] = value.COLLEGE_TYPE_SSP_CODE;
        bd["College_type"] = value.College_type;
        bd["SEAT_TYPE_NAME"] = value.SEAT_TYPE_NAME;
        bd["SEAT_TYPE_SSP_CODE"] = value.SEAT_TYPE_SSP_CODE;
        return;
      }
    });

    courseWithDic.forEach((course) => {
      if (course.Course_Name === bd["Course_Name"]) {
        bd["COURSE_CODE"] = course.Course_Code;
        bd["DISCIPLINE_CODE"] = course.Descipline_Code;
        bd["DISCIPLINE_NAME"] = course.Descipline_name;
        return;
      }
    });
  });

  return (
    <div>
      {dataFromCSV?.map(
        (data) => `{
                "University_Code": "1040",
                "University_name": "Karnataka State Law University, Hubli(Id: U-0227)",
                "Academic_Year": "2223",
                "Registration_Number": "${
                  data["University_Registration_Number"]
                }",
                "Student_Name": "${data["Student_Name"]}",
                "College_Name": "${data["College_Name"]}",
                "College_SSP_Code": "${data["COLLEGE_SSP_CODE"]}",
                "Course_Name": "${data["Course_Name"]}",
                "Course_Code": "${data["COURSE_CODE"]}",
                "Discipline_Code": "${data["DISCIPLINE_CODE"]}",
                "Discipline_Name": "${data["DISCIPLINE_NAME"]}",
                "Course_Year": "${data["Course_Year"]}",
                "UG_PG": "${data["Course_Name"] === "L.L.M." ? "PG" : "UG"}"
            },`
      )}
    </div>
  );
};

export default Admission;
