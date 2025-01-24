import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import React from 'react';
import axios from 'axios';
const baseUrl='http:127.0.0.1:8000/api';

function Profile() {
  const [ProfileData,setProfileData]=useState({
    'user_id':'',
    'first_name':'',
    'last_name':'',
    'username':'',
    'email':'',
    'mobile':'',
    'p_image':''
  });

  var customer_id=localStorage.getItem('customer_id');

  useEffect(() => {
    fetchData(baseUrl+'/customer/'+customer_id);
  },[]);

  function fetchData(baseUrl){
    fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      setProfileData({
        'user_id':data.user.id,
        'first_name':data.user.first_name,
        'last_name':data.user.last_name,
        'username':data.user.username,
        'email':data.user.email,
        'mobile':data.mobile,
        'p_image':data.profile_img
      });
    });
  }

  const inputHandler = (event) => {
    setProfileData({
      ...ProfileData,
      [event.target.name]:event.target.value
    });
  };
  
  const handleFileChange = (event) => {
    setProfileData({
      ...ProfileData,
      [event.target.name]:event.target.files[0]
    });
  };

  const submitHandler = (event) => {
    const formData=new FormData();
    formData.append('user',ProfileData.user_id);
    formData.append('mobile',ProfileData.mobile);
    formData.append('profile_img',ProfileData.p_image);

    //Submit Data
    axios.put(baseUrl + '/customer/'+customer_id+'/',formData)
    .then(function (response){
      console.log(response);
    })
    .catch(function (error){
        console.log(error);
    });
    //Submit user data
    const formUserData=new FormData();
    formUserData.append('first_name',ProfileData.first_name);
    formUserData.append('last_name',ProfileData.last_name);
    formUserData.append('username',ProfileData.username);
    formUserData.append('email',ProfileData.email);

    axios.put(baseUrl + '/user/'+ProfileData.user_id+'/',formUserData,{
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(function (response){
      console.log(response);
    })
    .catch(function (error){
        console.log(error);
    });
};

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-3 col-12 mb-2'>
          <Sidebar/>
        </div>
        <div className='col-md-9 col-12 mb-2'>
          <h3 className='mb-3'>Welcome <span className='text-success'>{ProfileData.username}</span></h3>
          <div className='card'>
            <h4 className='card-header'>Update Profile</h4>
            <div className='card-body'>
              <form>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input type="text" name="first_name" onChange={inputHandler} value={ProfileData.first_name} className="form-control" id="firstName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input type="text" name="last_name" onChange={inputHandler} value={ProfileData.last_name} className="form-control" id="lastName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" name="username" onChange={inputHandler} value={ProfileData.username} className="form-control" id="username" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" name="email" onChange={inputHandler} value={ProfileData.email} className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">Mobile</label>
                  <input type="number" name="mobile" onChange={inputHandler} value={ProfileData.mobile} className="form-control" id="mobile" />
                </div>
                <div className="mb-3">
                  <div className="mb-3">
                     <p>
                      <img src={ProfileData.p_image} width="100" className='mt-2 rounded'></img>
                    </p>
                    <label htmlFor="profileImg" className="form-label">Profile Image</label>
                    <input type="file" name="p_image" onChange={handleFileChange} className="form-control" id="profileImg" />
                  </div>
                </div>
                <button type='submit' onClick={submitHandler} className='btn btn-success'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
