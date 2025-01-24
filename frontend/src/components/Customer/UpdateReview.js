//import Sidebar from './Sidebar';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function UpdateReview(){
    const { review_id } = useParams();
    var customer_id = localStorage.getItem('customer_id');
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');
    const [ReviewFormData, setReviewFormData] = useState({
        'content': '',
        'customer': customer_id
    });

    useEffect(() => {
        fetchData(baseUrl+'/review/'+review_id);
    },[]);

    function fetchData(baseUrl){
        axios.get(baseUrl)
        .then((response) => {
            setReviewFormData({
                'content': response.data.content,
                'customer': response.data.customer_id
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const inputHandler = (event) =>{
        setReviewFormData({
            ...ReviewFormData,
            [event.target.name]:event.target.value
        });
    };


    const submitHandler = () =>{
    
        const formData = new FormData();
        formData.append('content', ReviewFormData.content);
        formData.append('customer', ReviewFormData.customer);

        axios.put(baseUrl+'/review/'+parseInt(review_id)+'/', formData)
        .then((response) => {
        
            if(response.status !== 200){
                setErrorMsg('Data not saved');
                setSuccessMsg('');
            } else {
                setErrorMsg('');
                setSuccessMsg('Data saved');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const disableBtn = (ReviewFormData.content === '');

    console.log(ReviewFormData);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3 col-12 mb-2">
                    {/* Sidebar */}
                </div>
                <div className="col-md-9 col-12 mb-2">
                    <div className="card">
                        <h4 className="card-header">Update Review</h4>
                        <div className="card-body">
                            {/* Display error and success messages */}
                            {ErrorMsg && <p className="alert alert-danger">{ErrorMsg}</p>}
                            {SuccessMsg && <p className="alert alert-success">{SuccessMsg}</p>}
                            {/* Review content input field */}
                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">Review:</label>
                                <textarea className="form-control" name="content" onChange={inputHandler} value={ReviewFormData.content} id="content"></textarea>
                            </div>
                            {/* Submit button */}
                            <button type="button" disabled={disableBtn} onClick={submitHandler} className="btn btn-success">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateReview;
