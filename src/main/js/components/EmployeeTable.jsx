import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow
} from "semantic-ui-react";
import EmployeeRow from "./EmployeeRow";

const EmployeeTable = ({ employees, onDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>First Name</TableHeaderCell>
          <TableHeaderCell>Last Name</TableHeaderCell>
          <TableHeaderCell>Description</TableHeaderCell>
          <TableHeaderCell></TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map(employee => (
          <EmployeeRow
            key={employee._links.self.href}
            employee={employee}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
