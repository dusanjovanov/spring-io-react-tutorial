import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow
} from "semantic-ui-react";

const EmployeeTable = ({ employees }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>First Name</TableHeaderCell>
          <TableHeaderCell>Last Name</TableHeaderCell>
          <TableHeaderCell>Description</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((e, idx) => (
          <TableRow key={e._links.self.href}>
            <TableCell>{e.firstName}</TableCell>
            <TableCell>{e.lastName}</TableCell>
            <TableCell>{e.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
