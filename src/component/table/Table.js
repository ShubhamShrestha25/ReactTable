import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FileBase from "react-file-base64";
import MenuItem from "@mui/material/MenuItem";
import "./Table.css";
import TableData from "./TableData";
import api from "../../api/api";

const Table = ({ currentId, setCurrentId }) => {
  const [input, setInput] = useState({
    layout: "",
    name: "",
    capacity: "",
    selectedFile: "",
    id: "",
    status: true,
  });

  const createTable = async () => {
    const res = await api.post("/tables", input);
    setInput({ ...input, res });
    clear();
  };

  const updateTable = async () => {
    const res = await api.put(`/tables/${input.id}`, input);
    setInput({ ...input, res });
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setInput({
      layout: "",
      name: "",
      capacity: "",
      selectedFile: "",
      status: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      updateTable();
    } else {
      createTable();
    }
  };

  return (
    <div className="table">
      <h3>{currentId ? "Editing Table" : "Creating Table"}</h3>
      <p></p>
      <div className="form">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="formInput">
            <label id="layout" style={{ marginRight: "2rem" }}>
              Layout:
            </label>
            <TextField
              id="layout"
              value={input.layout}
              label="Select Layout"
              onChange={(e) => setInput({ ...input, layout: e.target.value })}
              select
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                width: 400,
              }}
              required
            >
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
            </TextField>
          </div>
          <div className="formInput">
            <label style={{ marginRight: "2.5rem" }}>Name:</label>
            <TextField
              id="name"
              label="Enter Name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              sx={{
                width: 400,
              }}
              required
            />
          </div>
          <div className="formInput">
            <label style={{ marginRight: "1.5rem" }}>Capacity:</label>
            <TextField
              id="capacity"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              label="Enter the number of capacity"
              variant="outlined"
              value={input.capacity}
              onChange={(e) => setInput({ ...input, capacity: e.target.value })}
              sx={{
                width: 400,
              }}
              required
            />
          </div>
          <div className="formInput">
            <label style={{ marginRight: "2rem" }}>Status:</label>
            <Checkbox
              defaultChecked
              value={input.status}
              onChange={() => setInput({ ...input, status: !input.status })}
            />
          </div>
          <div className="formInput">
            <label style={{ marginRight: "2.5rem" }}>Image:</label>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setInput({ ...input, selectedFile: base64 })
              }
            />
          </div>
          <div className="formButton">
            <Button
              variant="contained"
              color="success"
              type="submit"
              style={{ marginRight: "5px" }}
            >
              {currentId ? "Update Table" : "Creating Table"}
            </Button>
            <Button variant="contained" color="error" onClick={clear}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
      <TableData
        setInput={setInput}
        setCurrentId={setCurrentId}
        input={input}
      />
    </div>
  );
};

export default Table;
