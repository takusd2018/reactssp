import { CollegeData } from "../Assets/CollegeData";
import { courseWithDic } from "../Assets/CourseData";

const PreviousMarks = ({ dataFromCSV }) => {
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
                        "SSP_Student_ID":"",
                        "Student_Name":"${data["Student_Name"]}",
                        "University_Name":"Karnataka State Law University, Hubli(Id: U-0227)",
                        "University_SSP_Code":"1040",
                        "University_Registration_Number":"${
                          data["University_Registration_Number"]
                        }",
                        "UG_PG": "${
                          data["Course_Name"] === "L.L.M." ? "PG" : "UG"
                        }",
                        "Previous_Course_Passed_Year":"${
                          data["Previous_Course_Passed_Year"]
                        }",
                        "Previous_Year_SSP_University_Code":"1040",
                        "Previous_Year_SSP_University_Name":"Karnataka State Law University, Hubli(Id: U-0227)"
                        "Previous_Year_SSP_College_Code":"${
                          data["Previous_Year_SSP_College_Code"]
                        }",
                        "Previous_Year_SSP_College_Name":"${
                          data["Previous_Year_SSP_College_Name"]
                        }",
                        "Previous_Year_SSP_Course_Code":"${
                          data["Previous_Year_SSP_Course_Code"]
                        }",
                        "Previous_Year_SSP_Course_Name":"${
                          data["Previous_Year_SSP_Course_Name"]
                        }",
                        "Previous_Year_SSP_Discipline_Code":"${
                          data["Previous_Year_SSP_Discipline_Code"]
                        }",
                        "Previous_Year_SSP_Discipline_Name":"${
                          data["Previous_Year_SSP_Discipline_Name"]
                        }",
                        "Previous_Year_Course_Year":"${
                          data["Previous_Year_Course_Year"]
                        }",
                        "Previous_Year_Max_Marks":"${
                          data["Previous_Year_Max_Marks"]
                        }",
                        "Previous_Year_Obtained_Marks":"${
                          data["Previous_Year_Obtained_Marks"]
                        }",
                        "Previous_Year_Percentage_Obtained":"${
                          data["Previous_Year_Percentage_Obtained"]
                        }",
                        "PASS_or_FAIL":"${data["PASS_or_FAIL"]}",
                        "Promoted":"${data["Promoted"]}"
            },`;
      })}
    </div>
  );
};

export default PreviousMarks;
