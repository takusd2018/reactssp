import "./App.css";
import { useState } from "react";
import Papa from "papaparse";
import Admission from "./Components/Admission";
import Bonafide from "./Components/Bonafide";
import ValidateAndSegregateData from "./Components/ValidateAndSegregateData";

function App() {
  //State to hold all records from csv
  let i=0;
  const [dataFromCSV, setDataFromCSV] = useState([]);

  const [type, setType] = useState("");
  const changeHandler = async (event, type) => {
    try {
      const parsedData = await new Promise((resolve, reject) => {
        Papa.parse(event.target.files[0], {
          header: true,
          skipEmptyLines: true,
          complete: (results) => resolve(results.data),
          error: (error) => reject(error),
        });
      });
  
      setDataFromCSV([]);
      setDataFromCSV(parsedData);
      setType(type);
      console.log(parsedData);
    } catch (error) {
      console.error('Error parsing CSV:', error);
    }
  };
  

  return (
    <div>
      <div
        style={{
          display: "flex",
        }}
      >
        {/* File Uploader */}
        For Validation of Data
        <input
          type="file"
          name="validation"
          onChange={(event) => changeHandler(event, "validation")}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          style={{ display: "block", margin: "10px auto" }}
        />
        For Admission Data
        <input
          type="file"
          name="admission"
          onChange={(event) => changeHandler(event, "admission")}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          style={{ display: "block", margin: "10px auto" }}
        />
        For Bonafide Data
        <input
          type="file"
          name="bonafide"
          onChange={(event) => changeHandler(event, "bonafide")}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          style={{ display: "block", margin: "10px auto" }}
        />
        {/* For Marks Data
      <input
        type="file"
        name="bonafide"
        onChange={(event) => changeHandler(event, "bonafide")}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        style={{ display: "block", margin: "10px auto" }}
         <PreviousMarks dataFromCSV={dataFromCSV} />
      /> */}
      </div>
      <br />
      <br />
      {type === "admission" ? (
        <Admission dataFromCSV={dataFromCSV} />
      ) : type === "bonafide" ? (
        <Bonafide dataFromCSV={dataFromCSV} />
      ) : (
        type === "validation" ? (
          <div><ValidateAndSegregateData dataFromCSV={dataFromCSV} />
          {++i}
          </div>
        ):<div></div>
      )}

    </div>
  );
}

export default App;
