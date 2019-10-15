import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Header, Modal } from "semantic-ui-react";
import AddEmployeeForm from "./AddEmployeeForm";
import EmployeeList from "./EmployeeTable";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [schema, setSchema] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    axios
      .get("/api/employees?size=10")

      .then(res => {
        setEmployees(res.data._embedded.employees);
        axios
          .get(res.data._links.profile.href, {
            headers: {
              Accept: "application/schema+json"
            }
          })
          .then(res => setSchema(res.data));
      });
  }, [setEmployees]);

  const onSubmit = data => {
    axios.post("/api/employees", data).then(() => {
      axios
        .get("/api/employees")
        .then(res => setEmployees(res.data._embedded.employees));
    });
    setIsModalVisible(false);
  };

  const onClickAdd = () => setIsModalVisible(true);
  const onCloseModal = () => setIsModalVisible(false);

  return (
    <Container>
      <Header as="h1">Employees</Header>
      <Modal
        open={isModalVisible}
        onClose={onCloseModal}
        trigger={<Button onClick={onClickAdd}>Add Employee</Button>}
      >
        <Modal.Header>Add Employee</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {schema && <AddEmployeeForm schema={schema} onSubmit={onSubmit} />}
          </Modal.Description>
        </Modal.Content>
      </Modal>
      <EmployeeList employees={employees} />
    </Container>
  );
};

export default App;
