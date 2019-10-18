import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Header,
  Modal,
  Pagination,
  Select
} from "semantic-ui-react";
import AddEmployeeForm from "./AddEmployeeForm";
import EmployeeList from "./EmployeeTable";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [schema, setSchema] = useState(null);
  const [pagination, setPagination] = useState({
    totalPages: -1,
    currentPage: -1
  });
  const [pageSize, setPageSize] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loadData = pageNumber => {
    return axios
      .get(`/api/employees?page=${pageNumber}&size=${pageSize}`)
      .then(res => {
        setEmployees(res.data._embedded.employees);
        setPagination({
          totalPages: res.data.page.totalPages,
          currentPage: res.data.page.number
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
    loadData(0).then(loadSchema);
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

  const onPageChange = (e, data) => {
    loadData(data.activePage - 1);
  };

  const onChangePageSize = e => {
    setPageSize(e.currentTarget.value);
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
      <EmployeeList employees={employees} />
      {pagination.totalPages > 1 && (
        <Pagination
          totalPages={pagination.totalPages}
          activePage={pagination.currentPage + 1}
          onPageChange={onPageChange}
        />
      )}
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
