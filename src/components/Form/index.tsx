import React, { forwardRef, useImperativeHandle, ReactNode } from "react";
import { Formik, Form as FormikForm, FormikProps, FormikValues } from "formik";

interface FormProps<T extends FormikValues = FormikValues> {
  initialValues: T;
  validationSchema?: unknown;
  onSubmit: (values: T) => void | Promise<void>;
  children: ReactNode | ((formikProps: FormikProps<T>) => ReactNode);
}

const Form = forwardRef(function Form<T extends FormikValues = FormikValues>(
  { initialValues, validationSchema, onSubmit, children }: FormProps<T>,
  ref: React.Ref<FormikProps<T>>
) {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {(formikProps: FormikProps<T>) => {
        // 👇 Wrap render-prop output in a proper React component
        return (
          <FormikWrapper
            formikProps={formikProps as unknown as FormikProps<FormikValues>}
            children={
              children as ReactNode | ((formikProps: FormikProps<FormikValues>) => ReactNode)
            }
            ref={ref as React.Ref<FormikProps<FormikValues>>}
          />
        );
      }}
    </Formik>
  );
});

interface FormikWrapperProps {
  formikProps: FormikProps<FormikValues>;
  children: ReactNode | ((formikProps: FormikProps<FormikValues>) => ReactNode);
}

const FormikWrapper = forwardRef<FormikProps<FormikValues>, FormikWrapperProps>(
  function FormikWrapper({ formikProps, children }, ref) {
    useImperativeHandle(ref, () => formikProps);

    return (
      <FormikForm>{typeof children === "function" ? children(formikProps) : children}</FormikForm>
    );
  }
);

export default Form;
