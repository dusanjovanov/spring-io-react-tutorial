import React from "react";
import { TableRow, TableCell, Button, Icon } from "semantic-ui-react";

const EmployeeRow = ({ employee, onDelete }) => {
  const onClickDelete = () => onDelete(employee);

  return (
    <TableRow key={employee._links.self.href}>
      <TableCell>{employee.firstName}</TableCell>
      <TableCell>{employee.lastName}</TableCell>
      <TableCell>{employee.description}</TableCell>
      <TableCell>
        <Button icon onClick={onClickDelete}>
          <Icon name="delete" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default EmployeeRow;
