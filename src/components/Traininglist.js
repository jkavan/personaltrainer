import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { Link } from "react-router-dom";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function Traininglist() {
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data));
  };

  const deleteTraining = (id) => {
    if (window.confirm("Are you sure you wish to delete the training?")) {
      fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, {
        method: "DELETE",
      })
        .then((response) => fetchData())
        .catch((err) => console.error(err));
      setSnackOpen(true);
      setSnackMessage("Training has been deleted.");
    }
  };

  const columns = [
    {
      title: "Actions",
      render: (rowData) => (
        <IconButton
          onClick={() => deleteTraining(rowData.id)}
          color="secondary"
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      ),
      width: 10,
    },
    {
      title: "Date",
      field: "date",
      type: "datetime",
    },
    {
      title: "Duration",
      field: "duration",
      type: "numeric",
      render: (rowData) => <span>{rowData.duration} min</span>,
    },
    {
      title: "Activity",
      field: "activity",
    },
    {
      title: "Customer",
      field: "customer.firstname",
      render: (rowData) => (
        <Link to={`/customers/${rowData.customer.id}`}>
          {rowData.customer.firstname} {rowData.customer.lastname}
        </Link>
      ),
    },
  ];

  return (
    <div>
      <MaterialTable
        columns={columns}
        data={trainings}
        icons={tableIcons}
        title="Trainings"
      />
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message={<span id="message-id">{snackMessage}</span>}
      />
    </div>
  );
}
