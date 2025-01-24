import Sidebar from './Sidebar';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseUrl = 'http://127.0.0.1:8000/api/';

function AddAddress() {
    var customer_id = localStorage.getItem('customer_id');
    const [formError, setFormError] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');
    const [AddressFormData, setAddressFormData] = useState({
        'address': '',
        'customer': customer_id
    });

    const inputHandler = (event) => {
        setAddressFormData({
            ...AddressFormData,
            [event.target.name]: event.target.value
        });
    };
    const navigate = useNavigate();
    const submitHandler = () => {
        const formData = new FormData();
        formData.append('address',AddressFormData.address);
        formData.append('customer',AddressFormData.customer);
        
        axios.post(baseUrl+'address/', formData)
            .then(function (response) {
                if (response.data.bool == false) {
                    setFormError(true);
                    setErrorMsg(response.data.msg);
                } else {
                    setAddressFormData({
                        'address': '',
                        'customer': customer_id
                    });
                    setFormError(false);
                    setSuccessMsg(response.data.msg);
                    navigate('/customer/addresses');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    

    const disableBtn = AddressFormData.address === '';

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3 col-12 mb-2">
                    <Sidebar />
                </div>
                <div className="col-md-9 col-12 mb-2">
                    <div className="card">
                        <h4 className="card-header">Add Address</h4>
                        <div className="card-body">
                            {ErrorMsg && <p className="alert alert-danger">{ErrorMsg}</p>}
                            {SuccessMsg && <p className="alert alert-success">{SuccessMsg}</p>}
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address:</label>
                                <textarea className="form-control" name="address" onChange={inputHandler} value={AddressFormData.address} id="address"></textarea>
                            </div>
                            <button type="button" disabled={disableBtn} onClick={submitHandler} className="btn btn-success">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddAddress;
