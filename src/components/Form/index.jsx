import React, {forwardRef, useImperativeHandle} from "react";
import {Formik, Form as FormikForm} from "formik";

const Form = forwardRef(function Form(
  {initialValues, validationSchema, onSubmit, children},
  ref
) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => {
        // 👇 Wrap render-prop output in a proper React component
        return (
          <FormikWrapper
            formikProps={formikProps}
            children={children}
            ref={ref}
          />
        );
      }}
    </Formik>
  );
});

const FormikWrapper = forwardRef(function FormikWrapper(
  {formikProps, children},
  ref
) {
  useImperativeHandle(ref, () => formikProps);

  return (
    <FormikForm>
      {typeof children === "function" ? children(formikProps) : children}
    </FormikForm>
  );
});

export default Form;
