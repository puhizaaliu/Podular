import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import SinglePodcast from './SinglePodcast';
import AllPodcasts from './AllPodcasts';
import Testimonial from './Testimonial';
import { useState,useEffect } from 'react';

function Home() {
  const baseUrl='http://127.0.0.1:8000/api';
  const [podcasts,setPodcasts]=useState([]);
  const [ReviewList,setReviewList]=useState([]);


    useEffect(()=> {
      fetchData(baseUrl+'/podcasts/?fetch_limit=4');
      fetchTestimonialData(baseUrl+'/podcastrating');
    },[]);

  function fetchData(baseUrl){
    fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      setPodcasts(data.results);
    });
  }

  function fetchTestimonialData(baseurl){
    fetch(baseurl)
    .then((response) => response.json())
    .then((data) => {
        setReviewList(data.results);
    });
}
  return (
    <>
   {/* Latest Podcasts */}
   <main className='mt-4'>
        <div className='container'>
          <h3 className='mb-4'>Latest Podcasts <Link to='/allpodcasts' className='float-end btn btn-dark'>View All Podcasts <i className="fas fa-arrow-right"></i></Link></h3>
          <div className='row mb-4'>
            {
              podcasts.map((podcast)=> <SinglePodcast podcast={podcast} />)
            }
          </div>
        </div>
      </main>
      
      {/* Start of row for Latest Podcasts */}
      <div className='row row-cols-1 row-cols-md-4 g-4'>
        {/* Card 1 */}
        <div className='col'>
          <div className="card h-100">
            <img src={logo} className="card-img-top" alt="Card Image" />
            <div className="card-body">
              <h4 className="card-title">Podcast Title</h4>
              {/* <h5 className="card-title text-muted">Price: 100$</h5> */}
            </div>
            <div className='card-footer'>
              <button title="Add to Cart" className='btn btn-success btn-sm'><i className="fas fa-cart-plus"></i></button>
              <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'><i className="fas fa-heart"></i></button>
            </div>
          </div>
        </div>
        {/* Add Card 2, Card 3, Card 4 */}
        {/* Card 2 */}
        <div className='col'>
          <div className="card h-100">
            <img src={logo} className="card-img-top" alt="Card Image" />
            <div className="card-body">
              <h4 className="card-title">Podcast Title</h4>
              {/* <h5 className="card-title text-muted">Price: 100$</h5> */}
            </div>
            <div className='card-footer'>
              <button title="Add to Cart" className='btn btn-success btn-sm'><i className="fas fa-cart-plus"></i></button>
              <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'><i className="fas fa-heart"></i></button>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className='col'>
        <div className="card h-100">
            <img src={logo} className="card-img-top" alt="Card Image" />
            <div className="card-body">
              <h4 className="card-title">Podcast Title</h4>
              {/* <h5 className="card-title text-muted">Price: 100$</h5> */}
            </div>
            <div className='card-footer'>
              <button title="Add to Cart" className='btn btn-success btn-sm'><i className="fas fa-cart-plus"></i></button>
              <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'><i className="fas fa-heart"></i></button>
            </div>
          </div>
        </div>
        {/* Card 4 */}
        <div className='col'>
        <div className="card h-100">
            <img src={logo} className="card-img-top" alt="Card Image" />
            <div className="card-body">
              <h4 className="card-title">Podcast Title</h4>
              {/* <h5 className="card-title text-muted">Price: 100$</h5> */}
            </div>
            <div className='card-footer'>
              <button title="Add to Cart" className='btn btn-success btn-sm'><i className="fas fa-cart-plus"></i></button>
              <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'><i className="fas fa-heart"></i></button>
            </div>
          </div>
        </div>
      </div>
      {/* End of row for Latest Podcasts */}

      {/* Popular Categories */}
      <main className='mt-4'>
        <div className='container'>
          <h3 className='mb-4'>Popular Categories <a href='#' className='float-end btn btn-dark'>View All Categories <i className="fas fa-arrow-right"></i></a></h3>
        </div>
      </main>
      
      {/* Start of row for Popular Categories */}
      <div className='row row-cols-1 row-cols-md-4 g-4'>
        {/* Card 1 */}
        <div className='col'>
        <div className="card h-100">
            <img src={logo} className="card-img-top" alt="Card Image" />
            <div className="card-body">
              <h4 className="card-title">Podcast Category</h4>
            </div>
            <div className='card-footer'>
              Downloads : 100
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className='col'>
        <div className="card h-100">
            <img src={logo} className="card-img-top" alt="Card Image" />
            <div className="card-body">
              <h4 className="card-title">Podcast Category</h4>
            </div>
            <div className='card-footer'>
              Downloads : 100
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className='col'>
        <div className="card h-100">
            <img src={logo} className="card-img-top" alt="Card Image" />
            <div className="card-body">
              <h4 className="card-title">Podcast Category</h4>
            </div>
            <div className='card-footer'>
              Downloads : 100
            </div>
          </div>
        </div>
        {/* Card 4 */}
        <div className='col'>
        <div className="card h-100">
            <img src={logo} className="card-img-top" alt="Card Image" />
            <div className="card-body">
              <h4 className="card-title">Podcast Category</h4>
            </div>
            <div className='card-footer'>
              Downloads : 100
            </div>
          </div>
        </div>
      </div>
      {/* End of row for Popular Categories */}

      {/* Popular Podcasts */}
      <main className='mt-4'>
        <div className='container'>
          <h3 className='mb-4'>Popular Podcasts <Link href='#' className='float-end btn btn-dark'>View All Podcasts <i className="fas fa-arrow-right"></i></Link></h3>
        </div>
      </main>
      
      {/* Start of row for Popular Podcasts */}
      <div className='row row-cols-1 row-cols-md-4 g-4'>
        {/* Card 1 */}
        <div className='col'>
        <div className='col'>
          <div className="card h-100">
            <img src={logo} className="card-img-top" alt="Card Image" />
            <div className="card-body">
              <h4 className="card-title">Podcast Title</h4>
              {/* <h5 className="card-title text-muted">Price: 100$</h5> */}
            </div>
            <div className='card-footer'>
              <button title="Add to Cart" className='btn btn-success btn-sm'><i className="fas fa-cart-plus"></i></button>
              <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'><i className="fas fa-heart"></i></button>
            </div>
          </div>
        </div>
        </div>
        {/* Card 2 */}
        <div className='col'>
        <div className='col'>
          <div className="card h-100">
            <img src={logo} className="card-img-top" alt="Card Image" />
            <div className="card-body">
              <h4 className="card-title">Podcast Title</h4>
              {/* <h5 className="card-title text-muted">Price: 100$</h5> */}
            </div>
            <div className='card-footer'>
              <button title="Add to Cart" className='btn btn-success btn-sm'><i className="fas fa-cart-plus"></i></button>
              <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'><i className="fas fa-heart"></i></button>
            </div>
          </div>
        </div>
        </div>
        {/* Card 3 */}
        <div className='col'>
        <div className='col'>
          <div className="card h-100">
            <img src={logo} className="card-img-top" alt="Card Image" />
            <div className="card-body">
              <h4 className="card-title">Podcast Title</h4>
              {/* <h5 className="card-title text-muted">Price: 100$</h5> */}
            </div>
            <div className='card-footer'>
              <button title="Add to Cart" className='btn btn-success btn-sm'><i className="fas fa-cart-plus"></i></button>
              <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'><i className="fas fa-heart"></i></button>
            </div>
          </div>
        </div>
        </div>
        {/* Card 4 */}
        <div className='col'>
        <div className='col'>
          <div className="card h-100">
            <img src={logo} className="card-img-top" alt="Card Image" />
            <div className="card-body">
              <h4 className="card-title">Podcast Title</h4>
              {/* <h5 className="card-title text-muted">Price: 100$</h5> */}
            </div>
            <div className='card-footer'>
              <button title="Add to Cart" className='btn btn-success btn-sm'><i className="fas fa-cart-plus"></i></button>
              <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'><i className="fas fa-heart"></i></button>
            </div>
          </div>
        </div>
        </div>
      </div>
      {/* End of row for Popular Podcasts */}

      {/* Popular Sellers */}
      <main className='mt-4'>
        <div className='container'>
          <h3 className='mb-4'>Popular Sellers <Link to='/allcreators' className='float-end btn btn-dark'>View All Sellers <i className="fas fa-arrow-right"></i></Link></h3>
        </div>
      </main>
      
      {/* Start of row for Popular Sellers */}
      <div className='row row-cols-1 row-cols-md-4 g-4'>
        {/* Card 1 */}

        <div className='col'>
        <div className="card h-100">
            <img src={logo} className="card-img-top" alt="Card Image" />
            <div className="card-body">
              <h4 className="card-title">Seller Name</h4>
            </div>
            <div className='card-footer'>
              Categories : <a href="#">Python</a>, <a href="#">React</a>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className='col'>
        <div className="card h-100">
            <img src={logo} className="card-img-top" alt="Card Image" />
            <div className="card-body">
              <h4 className="card-title">Seller Name</h4>
            </div>
            <div className='card-footer'>
              Categories : <a href="#">PHP</a>, <a href="#">React</a>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className='col'>
        <div className="card h-100">
            <img src={logo} className="card-img-top" alt="Card Image" />
            <div className="card-body">
              <h4 className="card-title">Seller Name</h4>
            </div>
            <div className='card-footer'>
              Categories : <a href="#">UI</a>, <a href="#">UX</a>
            </div>
          </div>
        </div>
        {/* Card 4 */}
        <div className='col'>
        <div className="card h-100">
            <img src={logo} className="card-img-top" alt="Card Image" />
            <div className="card-body">
              <h4 className="card-title">Seller Name</h4>
            </div>
            <div className='card-footer'>
              Categories : <a href="#">WordPress</a>, <a href="#">Graphic Design</a>
            </div>
          </div>
        </div>
      </div>
      {/* End of row for Popular Sellers */}

      {/* Rating and Reviews start */ }
      <div id="carouselExampleIndicators" className="carousel slide my-4 border bg-dark text-white p-5" data-bs-ride="true">
        <div className="carousel-indicators">
          {
            ReviewList.map((item,index)=> 
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"
            aria-current="true" aria-label="Slide 1"></button>)
          }
        </div>
        <div className="carousel-inner">

            {
              ReviewList.map((item,index)=> <Testimonial index={index} item={item} />)
            }

            {/*
            <Testimonial index="0" />
            <Testimonial index="1" />
            <Testimonial index="2" />
           */}
            
        </div>
        
        <button className="carousel-control-prev" type="button"
        data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button"
        data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
        </button>
      </div>
      
      {/* Rating and Reviews End */} 
      
    </>
  );
}

export default Home;