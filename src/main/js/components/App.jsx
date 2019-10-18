import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Header,
  Icon,
  Modal
} from "semantic-ui-react";
import AddEmployeeForm from "./AddEmployeeForm";
import EmployeeTable from "./EmployeeTable";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [schema, setSchema] = useState(null);
  const [links, setLinks] = useState({
    first: null,
    prev: null,
    next: null,
    last: null
  });
  const [pageSize, setPageSize] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loadData = url => {
    return axios.get(url).then(res => {
      setEmployees(res.data._embedded.employees);
      setLinks({
        first: res.data._links.first,
        prev: res.data._links.prev,
        next: res.data._links.next,
        last: res.data._links.last
      });
      return res.data;
    });
  };

  const loadSchema = data => {
    axios
      .get(data._links.profile.href, {
        headers: {
          Accept: "application/schema+json"
        }
      })
      .then(res => setSchema(res.data));
  };

  useEffect(() => {
    loadData("/api/employees?page=0&size=20").then(loadSchema);
  }, [pageSize]);

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

  const onNavigate = to => () => {
    const url = links[to].href;
    loadData(url);
  };

  const onChangePageSize = e => {
    setPageSize(e.currentTarget.value);
  };

  const onDeleteEmployee = employee => {
    axios
      .delete(employee._links.self.href)
      .then(() => loadData("/api/employees?page=0&size=20"));
  };

  return (
    <Container>
      <Header as="h1">Employees</Header>
      <Button onClick={onClickAdd}>Add Employee</Button>
      <Form>
        <div style={{ marginTop: "1em" }}>
          <Form.Field
            label="Num. of rows"
            control="select"
            width={5}
            inline
            value={pageSize}
            onChange={onChangePageSize}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
          </Form.Field>
        </div>
      </Form>
      <EmployeeTable employees={employees} onDelete={onDeleteEmployee} />
      <>
        <Button icon onClick={onNavigate("first")} disabled={!links.first}>
          <Icon name="angle double left" />
        </Button>
        <Button icon onClick={onNavigate("prev")} disabled={!links.prev}>
          <Icon name="angle left" />
        </Button>
        <Button icon onClick={onNavigate("next")} disabled={!links.next}>
          <Icon name="angle right" />
        </Button>
        <Button icon onClick={onNavigate("last")} disabled={!links.last}>
          <Icon name="angle double right" />
        </Button>
      </>
      <Modal open={isModalVisible} onClose={onCloseModal}>
        <Modal.Header>Add Employee</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {schema && <AddEmployeeForm schema={schema} onSubmit={onSubmit} />}
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </Container>
  );
};

export default App;
