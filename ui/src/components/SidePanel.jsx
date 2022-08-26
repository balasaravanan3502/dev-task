import React from "react";

import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Button from "@mui/material/Button";

import "./SidePanel.css";

const SidePanel = ({
  title,
  changeTitle,
  author,
  changeAuthor,
  subjectSelected,
  changeSubjectSelected,
  fromDate,
  changeFromDate,
  toDate,
  changeToDate,
  applyFilter,
  fetchData,
}) => {
  const navigate = useNavigate();
  return (
    <div className="panel">
      <div className="mainLogo">
        <div
          to="/"
          style={{ textDecoration: "none" }}
          className="mainLogo"
          onClick={async () => {
            navigate("/");
            fetchData();
          }}
        >
          Library
        </div>
      </div>
      <div className="input_group">
        <p className="label">Title</p>
        <TextField
          id="standard-basic"
          variant="standard"
          value={title}
          onChange={changeTitle}
        />
      </div>
      <div className="input_group">
        <p className="label">Author</p>
        <TextField
          id="standard-basic"
          variant="standard"
          value={author}
          onChange={changeAuthor}
        />
      </div>

      <div className="input_group">
        <p className="label">Subject</p>
        {subjectSelected.map((subject) => (
          <FormControlLabel
            control={<Checkbox />}
            label={subject.label}
            key={subject.id}
            checked={subject.checked}
            onChange={() => changeSubjectSelected(subject.id)}
          />
        ))}
      </div>

      <div className="input_group">
        <p className="label">From Date</p>
        <DesktopDatePicker
          inputFormat="dd/MM/yyyy"
          value={fromDate}
          onChange={changeFromDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <div className="input_group">
        <p className="label">To Date</p>
        <DesktopDatePicker
          inputFormat="dd/MM/yyyy"
          value={toDate}
          onChange={changeToDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <Button
        variant="contained"
        onClick={applyFilter}
        style={{
          borderRadius: 35,
          backgroundColor: "#000000",
          padding: "14px 30px",
          fontSize: "15px",
        }}
      >
        Apply Filter
      </Button>
    </div>
  );
};

export default SidePanel;
