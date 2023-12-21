import React, { useState, useEffect } from "react";
import axios from "axios";

const ValidateAndSegregateData = ({ dataFromCSV }) => {
  console.log(dataFromCSV);
  const [validData, setValidData] = useState([]);
  const [invalidData, setInvalidData] = useState([]);
  const [dataProcessed, setDataProcessed] = useState(false);
  const apiUrl = 'http://localhost:3000/processData'; // Update the URL with your server's URL

  useEffect(() => {
    const processData = async () => {
      const newValidData = [];
      const newInvalidData = [];
  
      for (const element of dataFromCSV) {
        const studentData = {
          Gender: element.Gender,
          SSP_Student_ID: element.SSP_Student_ID,
          Name_As_In_Aadhaar: element.Student_Name,
        };
  
        try {
          const response = await axios.post(apiUrl, studentData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.data.Message_Type === 'SUCCESS' && response.data.Message_Status === 'Y') {
            const isStudentIdInPrevValidData = newValidData.some(
              (prevRow) => prevRow.SSP_Student_ID === element.SSP_Student_ID
            );
  
            if (!isStudentIdInPrevValidData) {
              newValidData.push(element);
            }
          } else {
            const isStudentIdInPrevInvalidData = newInvalidData.some(
              (prevRow) => prevRow.SSP_Student_ID === element.SSP_Student_ID
            );
  
            if (!isStudentIdInPrevInvalidData) {
              newInvalidData.push(element);
            }
          }
        } catch (error) {
          console.error('Error validating student data:', error);
        }
      }
  
      // Set the dataProcessed flag to true once the processing is complete
      setDataProcessed(true);
      setValidData(newValidData);
      setInvalidData(newInvalidData);
    };
  
    // Call processData when the component mounts
    processData();
  }, [dataFromCSV, apiUrl]);
  const generateCSV = (data) => {
    console.log(data);
    if (data.length === 0) {
      alert('No data to export.');
      return;
    }

    const columns = Object.keys(data[0]);
    const csvContent =
      columns.join(',') +
      '\n' +
      data
        .map((row) =>
          columns
            .map((col) =>
              `"${row[col].toString().replace(/"/g, '""')}"`
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

  // Render loading message while data is being processed
  if (!dataProcessed) {
    return <div>Loading...</div>;
  }

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
