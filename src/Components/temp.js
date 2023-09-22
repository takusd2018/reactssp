import { CollegeData } from "../Assets/CollegeData";
import { courseWithDic } from "../Assets/CourseData";
import React, { useEffect, useState } from "react";
import axios from "axios";


const ValidateAndSegregateData = ({ dataFromCSV }) => {
  const [validData, setValidData] = useState([]);
  const [invalidData, setInvalidData] = useState([]);
  console.log(dataFromCSV);

  const apiUrl = 'http://localhost:3000/processData'; // Update the URL with your server's URL

  useEffect(() => {
    const fetchData = async () => {
      for (const csvRow of dataFromCSV) {
        // Map CSV columns to the JSON structure expected by the API
        const studentData = {
          SSP_Student_ID: csvRow.SSP_Student_ID,
          Name_As_In_Aadhaar: csvRow.Student_Name,
          Gender: csvRow.Gender,
        };

        try {
          // Send a POST request to the validation API for each student data
          const response = await axios.post(apiUrl, studentData, {
            headers: {
              'Content-Type': 'application/json', // Set the content type
              'Username': 'UNID1040',
              'password': 'Scst@0227',
            },
          });

          if (response.data.Message_Type === 'SUCCESS' && response.data.Message_Status === 'Y') {
            // If the API response indicates that the data is valid
            const isStudentIdInPrevValidData = validData.some(
              (prevRow) => prevRow.SSP_Student_ID === csvRow.SSP_Student_ID
            );
  
            if (!isStudentIdInPrevValidData) {
              // If the API response indicates that the data is valid
              setValidData((prevValidData) => [...prevValidData, csvRow]);
            }
          } else {
            // If the API response indicates that the data is invalid
            const isStudentIdInPrevInvalidData = invalidData.some(
              (prevRow) => prevRow.SSP_Student_ID === csvRow.SSP_Student_ID
            );
  
            if (!isStudentIdInPrevInvalidData) {
              // If the API response indicates that the data is valid
              setInvalidData((prevInvalidData) => [...prevInvalidData, csvRow]);

            }
          }
        } catch (error) {
          console.error('Error validating student data:', error);
        }
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect once

  const generateCSV = (data) => {
    console.log(data);
    if (data.length === 0) {
      alert('No data to export.');
      return;
    }

    const columns = Object.keys(data[0]); // Extract column names from the first object
    const csvContent =
      columns.join(',') +
      '\n' +
      data
        .map((row) =>
          columns
            .map((col) =>
              `"${row[col].toString().replace(/"/g, '""')}"` // Wrap values in double quotes
            )
            .join(',')
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Valid Data</h1>
      <button onClick={() => generateCSV(validData)}>Download Valid CSV</button>

      <h1>Invalid Data</h1>
      <button onClick={() => generateCSV(invalidData)}>Download Invalid CSV</button>
    </div>
  );
};

export default ValidateAndSegregateData;
