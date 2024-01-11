import { CollegeData } from "../Assets/CollegeData";
import { courseWithDic } from "../Assets/CourseData";

const Bonafide = ({ dataFromCSV }) => {
  dataFromCSV.forEach((bd) => {
    bd["Student_Name"] = bd["Student_Name"]?.replace(/[^a-zA-Z\s]/gi, "");
    bd["Student_Father_Name"] = bd["Student_Father_Name"]?.replace(
      /[^a-zA-Z\s]/gi,
      ""
    );
    bd["Student_Mother_Name"] = bd["Student_Mother_Name"]?.replace(
      /[^a-zA-Z\s]/gi,
      ""
    );

    CollegeData.forEach((value) => {
      if (bd["College_Name"] === value.COLLEGE_NAME) {
        bd["College_SSP_Code"] = value.COLLEGE_SSP_CODE;
        bd["District_SSP_Code"] = value.DISTRICT_SSP_CODE;
        bd["College_District_Name"] = value.College_District_Name;
        bd["Taluk_SSP_Code"] = value.TALUK_SSP_CODE;
        bd["College_Taluk_Name"] = value.College_Taluk_Name;
        bd["College_Type_SSP_Code"] = value.COLLEGE_TYPE_SSP_CODE;
        bd["College_Type"] = value.College_type;
        bd["Seat_Type_Name"] = value.SEAT_TYPE_NAME;
        bd["Seat_Type_SSP_Code"] = value.SEAT_TYPE_SSP_CODE;
        return;
      }
    });

    courseWithDic.forEach((course) => {
      if (course.Course_Name === bd["Course_Name"]) {
        bd["Course_Code"] = course.Course_Code;
        bd["Discipline_Code"] = course.Descipline_Code;
        bd["Discipline_Name"] = course.Descipline_name;
        return;
      }
    });
  });

  return (
    <div>
      {dataFromCSV?.map((data) => {
        return `{
                        "Academic_Year_code":"2324",
                        "University_Registration_Number":"${data["University_Registration_Number"]
          }",
                        "Student_Name":"${data["Student_Name"]}",
                        "Student_Father_Name":"${data["Student_Father_Name"]}",
                        "Student_Mother_Name":"${data["Student_Mother_Name"]}",
                        "Student_Guardian_Name":"NA",
                        "Gender":"${data["Gender"]}",
                        "University_SSP_Code":"1040",
                        "University_Name":"Karnataka State Law University, Hubli(Id: U-0227)",
                        "College_Name":"${data["College_Name"]}",
                        "College_SSP_Code":"${data["College_SSP_Code"]}",
                        "College_Type":"${data["College_Type"]}",
                        "College_Type_SSP_Code":"${data["College_Type_SSP_Code"]
          }",
                        "College_District_Name":"${data["College_District_Name"]
          }",
                        "District_SSP_Code":"${data["District_SSP_Code"]}",
                        "College_Taluk_Name":"${data["College_Taluk_Name"]}",
                        "Taluk_SSP_Code":"${data["Taluk_SSP_Code"]}",
                        "Study_Mode":"Regular",
                        "Course_Name":"${data["Course_Name"]}",
                        "Course_Code":"${data["Course_Code"]}",
                        "Discipline_Name":"${data["Discipline_Name"]}",
                        "Discipline_Code":"${data["Discipline_Code"]}",
                        "Course_Year":"${data["Course_Year"]}",
                        "Seat_Type_Name":"${data["Seat_Type_Name"]}",
                        "Seat_Type_SSP_Code":"${data["Seat_Type_SSP_Code"]}",
                        "Admission_Year":"${data["Admission_Year"]}",
                        "Is_Lateral_Entry":"N",
                        "Name_As_In_Aadhaar":"${data["Student_Name"]}",
                        "DOB_As_In_Tenth":"", 
                        "SSP_Student_ID":"${data["SSP_Student_ID"]}",
                        "Hash_of_Student_Aadhaar":"",
                        "Vault_Reference_Number":"",
                        "Previous_Course_Passed_Year":"", 
                        "Previous_Year_SSP_University_Code":"",
                        "Previous_Year_SSP_University_Name":"",
                        "Previous_Year_SSP_College_Code":"",
                        "Previous_Year_SSP_College_Name":"",
                        "Previous_Year_SSP_Course_Code":"",
                        "Previous_Year_SSP_Course_Name":"",
                        "Previous_Year_SSP_Discipline_Code":"",
                        "Previous_Year_SSP_Discipline_Name":"",
                        "Previous_Year_Course_Year":"",
                        "Previous_Year_SSP_Seat_Type_Code":"",
                        "Previous_Year_SSP_Seat_Type_Name":"",
                        "Previous_Year_Max_Marks":"",
                        "Previous_Year_Obtained_Marks":"",
                        "Previous_Year_Percentage_Obtained":"",
                        "PASS_or_FAIL":"",
                        "Promoted":"",
                        "Temp_University_Registration_Number":"",
                        "Mobile_Number":"${data["Mobile_Number"]?.length == 10 ? data["Mobile_Number"] : ""}",
                        "Percentile":"",
                        "Encrypted_Mobile_Number":"",
                        "Admission_Approved":"Y",
                        "UG_PG": "${data["Course_Name"] === "L.L.M." ? "PG" : "UG"
          }"
            },`;
      })}
    </div>
  );
};

export default Bonafide;
