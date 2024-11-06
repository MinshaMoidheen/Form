import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
    birth: Yup.date().required('Date of Birth is required'),
    gender: Yup.string()
      .oneOf(['male', 'female', 'other'], 'Gender is required')
      .required('Gender is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string()
      .oneOf(['India', 'USA', 'UK', 'Australia'], 'Please select a valid country')
      .required('Country is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    photo: Yup.mixed()
      .required('Photo is required')
      .test('fileType', 'Only images are allowed', (value) => {
        return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
      }),
      agreeToTerms: Yup.boolean()
      .oneOf([true], 'You must agree to the terms and conditions')
      .required('You must agree to the terms and conditions'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    toast.success('Form Submitted', values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <>
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
        birth: '',
        gender: '',
        address: '',
        country: '',
        password: '',
        confirmPassword: '',
        photo: null,
        agreeToTerms: false,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form>
          <Card style={{ width: '50rem', margin: '50px auto' }}>
            <Card.Body>
              <Card.Title style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '30px' }}>
                Registration Form
              </Card.Title>

              <div style={{ margin: '20px 40px' }}>
                <label htmlFor="name">Name</label>
                <br />
                <Field type="text" name="name" style={{ width: '100%', padding: '10px' }} />
                <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
              </div>

              <div style={{ margin: '20px 40px' }}>
                <label htmlFor="email">Email</label>
                <br />
                <Field type="email" name="email" style={{ width: '100%', padding: '10px' }} />
                <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
              </div>

              <div style={{ margin: '20px 40px' }}>
                <label htmlFor="phone">Phone Number</label>
                <br />
                <Field type="text" name="phone" style={{ width: '100%', padding: '10px' }} />
                <ErrorMessage name="phone" component="div" style={{ color: 'red' }} />
              </div>

              <div style={{ margin: '20px 40px' }}>
                <label htmlFor="birth">Date of Birth</label>
                <br />
                <Field type="date" name="birth" style={{ width: '100%', padding: '10px' }} />
                <ErrorMessage name="birth" component="div" style={{ color: 'red' }} />
              </div>

              <div style={{ margin: '20px 40px' }}>
                <label>Gender</label>
                <br />
                <div role="group" aria-labelledby="gender">
                  <label>
                    <Field type="radio" name="gender" value="male" />
                    Male
                  </label>
                  <label style={{ marginLeft: '15px' }}>
                    <Field type="radio" name="gender" value="female" />
                    Female
                  </label>
                  <label style={{ marginLeft: '15px' }}>
                    <Field type="radio" name="gender" value="other" />
                    Other
                  </label>
                </div>
                <ErrorMessage name="gender" component="div" style={{ color: 'red' }} />
              </div>

              
              <div style={{ margin: '20px 40px' }}>
                <label htmlFor="password">Password</label>
                <br />
                <Field type="password" name="password" style={{ width: '100%', padding: '10px' }} />
                <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
              </div>

              <div style={{ margin: '20px 40px' }}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <br />
                <Field type="password" name="confirmPassword" style={{ width: '100%', padding: '10px' }} />
                <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />
              </div>

              <div style={{ margin: '20px 40px' }}>
                <label htmlFor="address">Address</label>
                <br />
                <Field type="text" name="address" style={{ width: '100%', padding: '10px' }} />
                <ErrorMessage name="address" component="div" style={{ color: 'red' }} />
              </div>

              <div style={{ margin: '20px 40px' }}>
                <label htmlFor="country">Country</label>
                <br />
                <Field as="select" name="country" style={{ width: '100%', padding: '10px' }}>
                  <option value="">Select a country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Australia">Australia</option>
                </Field>
                <ErrorMessage name="country" component="div" style={{ color: 'red' }} />
              </div>

              <div style={{ margin: '20px 40px' }}>
                <label htmlFor="photo">Upload Photo</label>
                <br />
                <input
                  type="file"
                  name="photo"
                  onChange={(event) => setFieldValue('photo', event.currentTarget.files[0])}
                  style={{ width: '100%', padding: '10px' }}
                />
                <ErrorMessage name="photo" component="div" style={{ color: 'red' }} />
              </div>


              <div style={{ margin: '20px 40px' }}>
                <label>
                  <Field type="checkbox" name="agreeToTerms" />
                  {' '}I agree to the terms and conditions
                </label>
                <ErrorMessage name="agreeToTerms" component="div" style={{ color: 'red' }} />
              </div>

              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Form>
      )}
    </Formik>
    <ToastContainer/>
    </>
    
  );
}

export default App;
