import "./App.css";
import { useState } from "react";
import Papa from "papaparse";
import Admission from "./Components/Admission";
import Bonafide from "./Components/Bonafide";
import PreviousMarks from "./Components/PreviousMarks";

function App() {
  //State to hold all records from csv

  const [dataFromCSV, setDataFromCSV] = useState([]);

  const [type, setType] = useState("");
  const changeHandler = (event, type) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setDataFromCSV(results.data);
        setType(type);
        console.log(dataFromCSV);
      },
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
        }}
      >
        {/* File Uploader */}
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
      /> */}
      </div>
      <br />
      <br />
      {type === "admission" ? (
        <Admission dataFromCSV={dataFromCSV} />
      ) : type === "bonafide" ? (
        <Bonafide dataFromCSV={dataFromCSV} />
      ) : (
        <PreviousMarks dataFromCSV={dataFromCSV} />
      )}
    </div>
  );
}

export default App;
