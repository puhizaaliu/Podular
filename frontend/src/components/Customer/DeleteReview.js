import { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function DeleteReview(){
    
    const { review_id } = useParams();

   
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');

    
    const history = useHistory();

    const deleteReview = () => {
        
        axios.delete(baseUrl+'/review/'+parseInt(review_id)+'/')
        .then((response) => {
            
            if(response.status === 204){
                setSuccessMsg('Review deleted successfully');
                setErrorMsg('');
            
                history.push('/reviews');
            } else {
                setSuccessMsg('');
                setErrorMsg('Failed to delete review');
            }
        })
        .catch((error) => {
            console.log(error);
            setErrorMsg('Failed to delete review');
        });
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3 col-12 mb-2">
                    {/* Sidebar */}
                </div>
                <div className="col-md-9 col-12 mb-2">
                    <div className="card">
                        <h4 className="card-header">Delete Review</h4>
                        <div className="card-body">
                            {/* Display error and success messages */}
                            {ErrorMsg && <p className="alert alert-danger">{ErrorMsg}</p>}
                            {SuccessMsg && <p className="alert alert-success">{SuccessMsg}</p>}
                            {/* Confirmation message */}
                            <p>Are you sure you want to delete this review?</p>
                            {/* Delete button */}
                            <button type="button" onClick={deleteReview} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteReview;
