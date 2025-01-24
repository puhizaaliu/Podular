import React from 'react';
import SellerSidebar from './SellerSidebar';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
const baseUrl='http://127.0.0.1:8000/api/';

function SellerProducts(props) {
    const [PodcastData,setPodcastData]=useState([]);
    useEffect(() => {
        fetchData(baseUrl+'podcasts/');
      }, []);
    
    
    function fetchData(baseUrl){
        fetch(baseUrl)
        .then((response) => response.json())
        .then((data) => {
          setPodcastData(data.results);
        });
    }

    function showConfirm(podcast_id){
        var _confirm=window.confirm('Are you sure you want to delete this product?');
        if(_confirm){
            fetch(baseUrl+'podcast/'+podcast_id,{
                method: 'DELETE'
            })
            .then((response) => {
                if(response.status==204){
                    fetchData(baseUrl+'podcasts/');
                }
            });
        }
    }

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-9 col-12'>
                    {/* Adjust the width of the column here */}
                    <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <td colSpan="6" align='right'>
                                        <Link to="/seller/add-product" className='btn btn-primary mb-2'> Add Podcast </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th>#</th>
                                    <th>Category</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    PodcastData.map((podcast,index)=><tr>
                                        <td>{podcast.id}</td>
                                        <td>{podcast.category}</td>
                                        <td><Link to={'/seller/update-product/${podcast.id}'}>{podcast.title}</Link></td>
                                        <td>{podcast.image}</td>
                                        <td>{podcast.price}</td>
                                        <td>None</td>
                                        <td>
                                            <a href='#' className='btn btn-info'>View</a>
                                            <Link to={'/seller/update-product/${podcast.id}'} className='btn btn-primary ms-1'>Edit</Link>
                                            <Link to={'/seller/delete-product/${podcast.id}'} onClick={()=>showConfirm(podcast.id)} className='btn btn-danger ms-1'>Delete</Link>
                                        </td>
                                    </tr>)
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-md-3 col-12'>
                    {/* Adjust the width of the sidebar column */}
                    <SellerSidebar />
                </div>
            </div>
        </div>
    );
}

export default SellerProducts;
