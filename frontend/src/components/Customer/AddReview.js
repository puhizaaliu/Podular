/*import Sidebar from './Sidebar';*/
import { useState } from "react";
import {useParams } from "react-router-dom"
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';

function AddReview(){
    const {podcast_id} = useParams();
    var customer_id=localStorage.getItem('customer_id');
    const [ErrorMsg,setErrorMsg]=useState('');
    const [SuccessMsg,setSuccessMsg]=useState('');
    const [ReviewFormData,setReviewFormData]=useState({
        'reviews':'',
        'rating': ''
    });
    const inputHandler = (event) =>{
        setReviewFormData({
            ...ReviewFormData,
            [event.target.name]:event.target.value
        });
    };
    const submitHandler = () =>{
        const formData=new FormData();
        formData.append('reviews',ReviewFormData.reviews);
        formData.append('rating',ReviewFormData.rating);
        formData.append('customer',customer_id);
        formData.append('podcast',podcast_id);


        axios.put(baseUrl+'/podcastrating/',formData)
        .then(function(response){
            if(response.status!=201){
                setErrorMsg('Data not saved');
                setSuccessMsg('');
            }else{
                setErrorMsg('');
                setSuccessMsg('Data saved');
                ReviewFormData({
                    'reviews':'',
                    'rating': ''

                });
            }
           
        })
        .catch(function(error){
            console.log(error);
        });
    };
    const disableBtn=(ReviewFormData.rating==''|| ReviewFormData.reviews=='');
    
    //console.log(ReviewFormData);
    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3 col-12 mb-2">
                    {/*Sidebar*/}
                </div>
                <div className="col-md-9 col-12 mb-2">
                    <div className="card">
                        <h4 className="card-header">Add Review</h4>
                        <div className="card-body">
                            {ErrorMsg && <p className="alert alert-danger">{ErrorMsg}</p>}
                            {SuccessMsg && <p className="alert alert-success">{SuccessMsg}</p>}
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Review</label>
                                <textarea className="form-control" name="reviews" onChange={inputHandler} value={ReviewFormData.reviews} id="reviews"></textarea>
                            </div>
                            <div className="mb-3">
                            <label htmlFor="address" className="form-label">Rating</label>
                            <select className="form-control" name='rating' onChange={inputHandler}>

                                <option value= "1"> 1</option>
                                <option value= "2"> 2</option>
                                <option value= "3"> 3</option>
                                <option value= "4"> 4</option>
                                <option value= "5"> 5</option>
                            </select>

                            </div>
                            <button type="button" disabled={disableBtn} onClick={submitHandler} className="btn btn-success">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
           </div>
        )
    }
export default AddReview;