import React, { useState } from 'react';
import axios from 'axios';

function SellerRegister(props) {
  const baseUrl = 'http://127.0.0.1:8000/api/';

  // State for storing form input values
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [registerFormData, setRegisterFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    mobile: '',
    address: '',
    password: '',
  });

  const inputHandler = (event) => {
    setRegisterFormData({
      ...registerFormData,
      [event.target.name]: event.target.value
    });
  };

  const submitHandler = (event) => {
    const formData = new FormData();
    for (const key in registerFormData) {
      formData.append(key, registerFormData[key]);
    }

    axios.post(baseUrl + 'creators/register', formData)
      .then(response => {
        if (response.data.bool === false) {
          setErrorMsg(response.data.msg);
          setSuccessMsg('');
        } else {
          setRegisterFormData({
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            mobile: '',
            address: '',
            password: '',
          });
          setErrorMsg('');
          setSuccessMsg(response.data.msg);
        }
      })
      .catch(error => {
        console.error('Registration Error:', error);
      });
  };

  const buttonEnable = Object.values(registerFormData).every(value => value.trim() !== '');

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Seller Register</h2>
              {successMsg && <p className="text-success">{successMsg}</p>}
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
              <form>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input type="text" className="form-control" id="firstName" name="first_name" autoComplete="given-name" value={registerFormData.first_name} onChange={inputHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input type="text" className="form-control" id="lastName" name="last_name" autoComplete="family-name" value={registerFormData.last_name} onChange={inputHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" className="form-control" id="username" name="username" autoComplete="username" value={registerFormData.username} onChange={inputHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" className="form-control" id="email" name="email" autoComplete="email" value={registerFormData.email} onChange={inputHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">Mobile</label>
                  <input type="text" className="form-control" id="mobile" name="mobile" value={registerFormData.mobile} onChange={inputHandler} />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <textarea className="form-control" id="address" name="address" autoComplete="address" value={registerFormData.address} onChange={inputHandler}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name="password" value={registerFormData.password} onChange={inputHandler} />
                </div>
                <button type="button" className="btn btn-primary btn-block" disabled={!buttonEnable} onClick={submitHandler}>Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerRegister;
