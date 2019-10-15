import React from "react";
import useForm from "react-hook-form";
import { Form } from "semantic-ui-react";

const AddEmployeeForm = ({ schema, onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {Object.keys(schema.properties).map(field => {
        return (
          <Form.Field key={field}>
            <label>{schema.properties[field].title}</label>
            <input id={field} type="text" name={field} ref={register} />
          </Form.Field>
        );
      })}
      <Form.Button type="submit">Add</Form.Button>
    </Form>
  );
};

export default AddEmployeeForm;
