import React from 'react';
import Form from './index.jsx';
import { FileUpload } from '../index.js';

export default {
  title: 'Form/FileUpload',
  component: FileUpload,
};

const initialValues = {
  singleFile: [],
  multipleFiles: [],
};

export const SingleFile = () => (
  <Form
    initialValues={initialValues}
    validationSchema={null}
    onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
  >
    {() => (
      <>
        <FileUpload
          label="Legal Opinion (Single File)"
          name="singleFile"
          maxFiles={1}
          helperText="Upload PDF, DOCX, or JPG (Max 10MB)"
        />
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </>
    )}
  </Form>
);

export const MultipleFiles = () => (
  <Form
    initialValues={initialValues}
    validationSchema={null}
    onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
  >
    {() => (
      <>
        <FileUpload
          label="Supporting Documents (Max 3 Files)"
          name="multipleFiles"
          maxFiles={3}
          helperText="Upload up to 3 files (PDF, DOCX, JPG, Max 10MB each)"
        />
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </>
    )}
  </Form>
); 