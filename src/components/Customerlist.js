import React, { useState, useEffect, forwardRef } from "react";
import MaterialTable from "material-table";
import AddCustomer from "./AddCustomer.js";
import EditCustomer from "./EditCustomer.js";
import AddTraining from "./AddTraining.js";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Snackbar from "@material-ui/core/Snackbar";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

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

export default function Customerlist() {
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [customers, setCustomers] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content));
  };

  const saveCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => fetchData())
      .catch((err) => console.error(err));
    setSnackOpen(true);
    setSnackMessage("New customer added.");
  };

  const updateCustomer = (link, customer) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => fetchData())
      .catch((err) => console.error(err));
    setSnackOpen(true);
    setSnackMessage("Customer info has been updated.");
  };

  const deleteCustomer = (link) => {
    if (window.confirm("Are you sure you wish to delete the customer?")) {
      fetch(link, {
        method: "DELETE",
      })
        .then((response) => fetchData())
        .catch((err) => console.error(err));
      setSnackOpen(true);
      setSnackMessage("Customer has been deleted.");
    }
  };

  const saveTraining = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(training),
    })
      .then((response) => fetchData())
      .catch((err) => console.error(err));
    setSnackOpen(true);
    setSnackMessage("New training has been added.");
  };

  const columns = [
    {
      title: "Actions",
      render: (rowData) => (
        <ButtonGroup color="primary">
          <EditCustomer updateCustomer={updateCustomer} customer={rowData} />
          <IconButton
            onClick={() => deleteCustomer(rowData.links[0].href)}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
          <AddTraining saveTraining={saveTraining} customer={rowData} />
        </ButtonGroup>
      ),
    },
    {
      title: "First name",
      field: "firstname",
    },
    {
      title: "Last name",
      field: "lastname",
    },
    {
      title: "Street address",
      field: "streetaddress",
    },
    {
      title: "Postal code",
      field: "postcode",
    },
    {
      title: "City",
      field: "city",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Phone",
      field: "phone",
    },
  ];

  return (
    <div>
      <AddCustomer saveCustomer={saveCustomer} />
      <MaterialTable
        columns={columns}
        data={customers}
        icons={tableIcons}
        title="Customers"
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

