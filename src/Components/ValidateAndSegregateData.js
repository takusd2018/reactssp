import { CollegeData } from "../Assets/CollegeData";
import { courseWithDic } from "../Assets/CourseData";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { writeToCSV } from "../utils/csvUtils"; // Import a utility function to write to CSV files


const ValidateAndSegregateData = ({ dataFromCSV }) => {
  const [validData, setValidData] = useState([]);
  const [invalidData, setInvalidData] = useState([]);

  useEffect(() => {
    const apiUrl = "https://your-validation-api.com/validate"; // Replace with your API URL

    const processStudentData = async () => {
      for (const studentData of dataFromCSV) {
        try {
          // Send a POST request to the validation API for each student data
          const response = await axios.post(apiUrl, studentData, {headers:{
            "Username":"UNID1040",
            "password":"Scst@0227"
          }});

          if (response.data.isValid) {
            // If the API response indicates that the data is valid
            setValidData((prevValidData) => [...prevValidData, studentData]);
          } else {
            // If the API response indicates that the data is invalid
            setInvalidData((prevInvalidData) => [...prevInvalidData, studentData]);
          }
        } catch (error) {
          console.error("Error validating student data:", error);
        }
      }
    };

    processStudentData();
  }, [dataFromCSV]);

   // Write the valid and invalid data to separate CSV files
  writeToCSV("valid-data.csv", validData); // Replace with your CSV writing logic
  writeToCSV("invalid-data.csv", invalidData); // Replace with your CSV writing logic

  return (
    <div>
      Completed
    </div>
  );
};

export default ValidateAndSegregateData;
