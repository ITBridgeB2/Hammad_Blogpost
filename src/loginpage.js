import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogdetailsservice from './blogdetailsservice';


export default function LoginForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    mobileNumber: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const validate = () =>{
    const newErrors = {}

    if(!formData.mobileNumber)
    {
        newErrors.mobileNumber = 'Enter your 10-digit number'
    }
    else if(!/^d{10}$/.test(formData.mobileNumber))
    {
        newErrors.mobileNumber = 'Mobile number must be 10 digits'
    }

    if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };



  const handleSubmit = (e) => {
    e.preventDefault();
    blogdetailsservice.validateUser(formData.mobileNumber, formData.password)
      .then((response) => {
        if (response.status === 200) {
          alert("WELCOME - " + response.data.firstName);
          navigate("/tolist");
        }
      })
      .catch(() => {
        alert('TRY AGAIN');
      });
  };

  return(
    <div className="login-form-container">

    <form onSubmit={handleSubmit} className="form-container" >
      <div>
        <h2>Login to your account</h2>
        <label>Mobile Number : </label>
        <input
          className='form-control'
          required
          id="mobileNumber"
          pattern="[0-9]{10}"
          placeholder="Enter 10-digit number"
          type="tel"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
        />
        {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}
      </div>

      <div>
        <label>Password : </label>
        <input
        className='form-control'
        placeholder="Enter your password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>


      <div className="login-form-buttons">

  <button type="button" className="back-btn" onClick={() => navigate("/")}>
    Back
  </button>
  <button type="submit" className="submit-btn">
    Login
  </button>
</div>

</form>
</div>
);
}