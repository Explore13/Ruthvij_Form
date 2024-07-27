// src/components/Form.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    receiverEmailID: '',
    rollNumber: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    // Email validation
    if (!formData.receiverEmailID) {
      errors.receiverEmailID = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.receiverEmailID)) {
      errors.receiverEmailID = 'Email address is invalid';
    }

    // Roll number validation
    if (!formData.rollNumber.trim()) {
      errors.rollNumber = 'Roll Number is required';
    } else if (!/^[A-Za-z0-9]+$/.test(formData.rollNumber)) {
      errors.rollNumber = 'Roll Number can only contain letters and numbers';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    setLoading(true);
    setResponseMessage('');
    setError('');

    try {
      const response = await axios.post('https://ruthvij-form-api.vercel.app/sendEmail', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResponseMessage(response.data.message || 'Email sent successfully!');
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred!');
      setResponseMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-center text-green-500 text-4xl font-bold mb-6">🎉 Ruthvij'2024 🎉</h1>

      <div className="max-w-md w-full p-6 border border-gray-300 rounded-lg shadow bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">Invitation Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${validationErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              required
              disabled={loading}
            />
            {validationErrors.name && <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>}
          </div>
          <div>
            <label htmlFor="receiverEmailID" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="receiverEmailID"
              name="receiverEmailID"
              value={formData.receiverEmailID}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${validationErrors.receiverEmailID ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              required
              disabled={loading}
            />
            {validationErrors.receiverEmailID && <p className="text-red-500 text-sm mt-1">{validationErrors.receiverEmailID}</p>}
          </div>
          <div>
            <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">Roll Number</label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${validationErrors.rollNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              required
              disabled={loading}
            />
            {validationErrors.rollNumber && <p className="text-red-500 text-sm mt-1">{validationErrors.rollNumber}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Sending Email...' : 'Send Email'}
          </button>
        </form>
        {responseMessage && <p className="mt-4 text-green-500 text-center">{responseMessage}</p>}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Form;
