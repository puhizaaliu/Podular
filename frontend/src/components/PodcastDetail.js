import logo from './logo.svg'
import { Link } from 'react-router-dom';
import {useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import SinglePodcast from './SinglePodcast';

function PodcastDetail(){
    const baseUrl='http://127.0.0.1:8000/api';
    const [podcastData,setpodcastData]=useState([]);
    const {podcast_slug,podcast_id} = useParams();

    useEffect(() => {
        fetchData(baseUrl+'/podcast/'+ podcast_id);
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setpodcastData(data);
        });
    }

    return (
        <section className="container mt-4">
            <div className="row">
                <div className="col-4">
                <div id="productThumbnailSlider" className="carousel carousel-dark slide
                carousel-fade" data-bs-ride="true">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#productThumbnailSlider"
                        data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide
                        1"></button>
                        <button type="button" data-bs-target="#productThumbnailSlider"
                        data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#productThumbnailSlider"
                        data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={logo} className="img-thumbnail mb-5" alt="..." />
                        </div>
                        <div className="carousel-item active">
                            <img src={logo} className="img-thumbnail mb-5" alt="..." />
                        </div>
                        <div className="carousel-item active">
                            <img src={logo} className="img-thumbnail mb-5" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button"
                    data-bs-target="#productThumbnailSlider" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                     <button className="carousel-control-next" type="button"
                    data-bs-target="#productThumbnailSlider" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button> 
                </div>
                </div>
                <div className="col-8">
                    <h3>Podcast Title {podcastData.title}</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.{podcastData.detail}</p>
                    <h5 className="card-title">Price: 100 $ {podcastData.price}</h5>
                    <p className='mt-3'>
                        <button title="Add to Cart" className='btn btn-primary'>Add to Cart <i
                        className="fa-solid fa-cart-plus"></i></button>
                        <button title="Buy Now" className='btn btn-success ms-1'>Buy Now <i
                        className="fa-solid fa-bag-shopping"></i></button>
                        <button title="Add to Wishlist" className='btn btn-danger ms-1'>Wishlist <i
                        className="fa fa-heart"></i></button>
                    </p>
                    <div className='podcasttags mt-4'>
                        <h5>Tags</h5>
                        <p>
                            <Link to="#" className='badge bg-secondary text-white me-1'>Python</Link>
                            <Link to="#" className='badge bg-secondary text-white me-1'>Django</Link>
                            <Link to="#" className='badge bg-secondary text-white me-1'>Web Scripts</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PodcastDetail;