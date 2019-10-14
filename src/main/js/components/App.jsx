import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeList from "./EmployeeTable";
import { Container, Header } from "semantic-ui-react";

const App = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/employees")
      .then(res => setEmployees(res.data._embedded.employees));
  }, [setEmployees]);

  return (
    <Container>
      <Header as="h1">Employees</Header>
      <EmployeeList employees={employees} />
    </Container>
  );
};

export default App;
