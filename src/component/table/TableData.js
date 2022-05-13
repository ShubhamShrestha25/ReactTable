import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "./TableData.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TableData = ({ setInput, setCurrentId, input }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getTableData = async () => {
      const res = await api.get("/tables");
      setData(res.data);
    };
    getTableData();
  }, [input]);

  const deleteHandler = async (id) => {
    const res = await api.delete(`/tables/${id}`, input);
    setInput({ ...input, res });
  };

  return (
    <div className="TableData">
      {data.length === 0 ? (
        ""
      ) : (
        <TableContainer component={Paper} style={{ margin: "3rem 0rem" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>layout</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((d) => (
                <TableRow
                  key={d.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {d.layout}
                  </TableCell>
                  <TableCell>
                    {d.selectedFile ? (
                      <img src={d.selectedFile} alt="" className="tableImg" />
                    ) : (
                      <img
                        src="https://statinfer.com/wp-content/uploads/dummy-user.png"
                        alt=""
                        className="tableImg"
                      />
                    )}
                  </TableCell>
                  <TableCell>{d.name}</TableCell>
                  <TableCell>{d.capacity}</TableCell>
                  <TableCell>{d.status ? "checked" : "unchecked"}</TableCell>
                  <TableCell>
                    <EditIcon
                      style={{ marginRight: "3px" }}
                      onClick={() => {
                        setInput({
                          name: d.name,
                          layout: d.layout,
                          capacity: d.capacity,
                          id: d.id,
                          selectedFile: d.selectedFile,
                          status: true,
                        });
                        setCurrentId(d.id);
                      }}
                    >
                      Edit
                    </EditIcon>
                    <DeleteIcon onClick={() => deleteHandler(d.id)}>
                      delete
                    </DeleteIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TableData;
