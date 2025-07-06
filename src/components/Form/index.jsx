import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

const Form = ({ initialValues, validationSchema, onSubmit, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => (
        <FormikForm>
          {typeof children === 'function' ? children(formikProps) : children}
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form; 