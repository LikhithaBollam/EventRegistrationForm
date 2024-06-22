"use client"; 

import React, { useState, useEffect } from 'react';

const useFormValidation = (initialState, validate, callback) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        callback();
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setValues({
      ...values,
      [name]: newValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

const validate = (values) => {
  let newErrors = {};

  if (!values.name) {
    newErrors.name = 'Full Name is required';
  } else if (values.name.length < 5) {
    newErrors.name = 'Full Name must include at least 5 characters';
  } else if (/[^a-zA-Z\s]/.test(values.name)) {
    newErrors.name = 'Full Name should not include numbers or special characters';
  }

  if (!values.email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    newErrors.email = 'Email address is invalid';
  }

  if (!values.age) {
    newErrors.age = 'Age is required';
  } else if (values.age <= 0) {
    newErrors.age = 'Age must be greater than 0';
  }

  if (values.attendingWithGuest && !values.guestName) {
    newErrors.guestName = 'Guest name is required';
  }

  return newErrors;
};

const EventRegistrationForm = () => {
  const initialState = {
    name: '',
    email: '',
    age: '',
    attendingWithGuest: false,
    guestName: '',
  };

  const submitForm = () => {
    alert(`Form submitted successfully!\n${JSON.stringify(values, null, 2)}`);
    resetForm();
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormValidation(initialState, validate, submitForm);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Event Registration Form</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
            value={values.age}
            onChange={handleChange}
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Are you attending with a guest?</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="attendingYes"
              name="attendingWithGuest"
              checked={values.attendingWithGuest}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="attendingYes" className="mr-4 text-gray-700">Yes</label>
            <input
              type="checkbox"
              id="attendingNo"
              name="attendingWithGuest"
              checked={!values.attendingWithGuest}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="attendingNo" className="text-gray-700">No</label>
          </div>
        </div>

        {values.attendingWithGuest && (
          <div className="mb-4">
            <label className="block text-gray-700">Guest Name</label>
            <input
              type="text"
              name="guestName"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${errors.guestName ? 'border-red-500' : 'border-gray-300'}`}
              value={values.guestName}
              onChange={handleChange}
            />
            {errors.guestName && <p className="text-red-500 text-sm">{errors.guestName}</p>}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EventRegistrationForm;
