// import React from 'react';
// import logo from '../logo.svg';

// function CategoryPodcasts(){
//     return (
//         <div className='container mt-4'>
//         <h3 className='mb-4'><span className='text-success'>Python</span> Podcasts</h3>
//         <div className='row row-cols-1 row-cols-md-4 g-4'>
//         {/* Card 1 */}
//         <div className='col'>
//           <div className="card h-100">
//             <img src={logo} className="card-img-top" alt="Card Image" />
//             <div className="card-body">
//               <h4 className="card-title">Podcast Title</h4>
//               {/* <h5 className="card-title text-muted">Price: 100$</h5> */}
//             </div>
//             <div className='card-footer'>
//               <button title="Add to Cart" className='btn btn-success btn-sm'><i className="fas fa-cart-plus"></i></button>
//               <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'><i className="fas fa-heart"></i></button>
//             </div>
//           </div>
//         </div>
//         {/* Add Card 2, Card 3, Card 4 */}
//         {/* Card 2 */}
//         <div className='col'>
//           <div className="card h-100">
//             <img src={logo} className="card-img-top" alt="Card Image" />
//             <div className="card-body">
//               <h4 className="card-title">Podcast Title</h4>
//               {/* <h5 className="card-title text-muted">Price: 100$</h5> */}
//             </div>
//             <div className='card-footer'>
//               <button title="Add to Cart" className='btn btn-success btn-sm'><i className="fas fa-cart-plus"></i></button>
//               <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'><i className="fas fa-heart"></i></button>
//             </div>
//           </div>
//         </div>
//         {/* Card 3 */}
//         <div className='col'>
//         <div className="card h-100">
//             <img src={logo} className="card-img-top" alt="Card Image" />
//             <div className="card-body">
//               <h4 className="card-title">Podcast Title</h4>
//               {/* <h5 className="card-title text-muted">Price: 100$</h5> */}
//             </div>
//             <div className='card-footer'>
//               <button title="Add to Cart" className='btn btn-success btn-sm'><i className="fas fa-cart-plus"></i></button>
//               <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'><i className="fas fa-heart"></i></button>
//             </div>
//           </div>
//         </div>
//         {/* Card 4 */}
//         <div className='col'>
//         <div className="card h-100">
//             <img src={logo} className="card-img-top" alt="Card Image" />
//             <div className="card-body">
//               <h4 className="card-title">Podcast Title</h4>
//               {/* <h5 className="card-title text-muted">Price: 100$</h5> */}
//             </div>
//             <div className='card-footer'>
//               <button title="Add to Cart" className='btn btn-success btn-sm'><i className="fas fa-cart-plus"></i></button>
//               <button title="Add to Wishlist" className='btn btn-danger btn-sm ms-1'><i className="fas fa-heart"></i></button>
//             </div>
//           </div>
//         </div>      
//       </div>
    
//     <nav aria-label="Page navigation example">
//         <ul class="pagination">
//             <li class="page-item">
//             <a class="page-link" href="#" aria-label="Previous">
//                 <span aria-hidden="true">&laquo;</span>
//             </a>
//             </li>
//             <li class="page-item"><a class="page-link" href="#">1</a></li>
//             <li class="page-item"><a class="page-link" href="#">2</a></li>
//             <li class="page-item"><a class="page-link" href="#">3</a></li>
//             <li class="page-item">
//             <a class="page-link" href="#" aria-label="Next">
//                 <span aria-hidden="true">&raquo;</span>
//             </a>
//             </li>
//         </ul>
//      </nav>

//     </div>
//     );
// }

// import React from 'react';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import {useState, useEffect} from 'react';
// import SinglePodcast from './SinglePodcast';
// import { useSearchParams } from 'react-router-dom';

// function CategoryPodcasts() {

//   const [Podcasts,setPodcasts]=useState([]) 
//   let [searchParams, setSearchParams]= useSearchParams();
//   console.log(useSearchParams)
//   useEffect(()=>{
//     fetchData ('http://127.0.0.1:8000/api/podcasts/')
//   });

//   function fetchData(baseUrl){
//     fetch(baseUrl)
//     .then((response)=>response.json())
//     .then((data)=>setPodcasts(data.results));
//   }
//   return (
//     <>
//       {/* Latest Podcasts */}
//       <main className='mt-4'>
//         <div className='container'>
//           <h3 className='mb-4'>All Podcasts</h3>
//           <div className='row mb-4'>
//             {
//               Podcasts.map((podcast)=> <SinglePodcast podcast={podcast} />)
//             }
//           </div>
//         </div>
//       </main>
//       </>
//   );
// }

// export default CategoryPodcasts;


// import React, { useState, useEffect } from 'react';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import SinglePodcast from './SinglePodcast';
// import { useSearchParams } from 'react-router-dom';

// function CategoryPodcasts() {
//   const [Podcasts, setPodcasts] = useState([]);
//   let [searchParams, setSearchParams] = useSearchParams();
//   const currentPage = searchParams.get('page') || 1;
//   const limit = 10; // You can adjust this limit as needed

//   useEffect(() => {
//     fetchData(`http://127.0.0.1:8000/api/podcasts/?page=${currentPage}&limit=${limit}`);
//   }, [currentPage]);

//   function fetchData(baseUrl) {
//     console.log(`Fetching data from ${baseUrl}`);
//     fetch(baseUrl)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log('API response data:', data);
//         setPodcasts(data.results); // Ensure this matches the API response structure
//       })
//       .catch((error) => {
//         console.error('Fetching error:', error);
//       });
//   }

//   return (
//     <>
//       {/* Latest Podcasts */}
//       <main className='mt-4'>
//         <div className='container'>
//           <h3 className='mb-4'>All Podcasts</h3>
//           <div className='row mb-4'>
//             {Podcasts.map((podcast) => (
//               <SinglePodcast key={podcast.id} podcast={podcast} />
//             ))}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

// export default CategoryPodcasts;


import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SinglePodcast from './SinglePodcast';
import { useParams, useSearchParams } from 'react-router-dom';

function CategoryPodcasts() {
  const { categoryId } = useParams(); // Get the category ID from the URL
  const [podcasts, setPodcasts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1;
  const limit = 10; // You can adjust this limit as needed

  useEffect(() => {
    fetchData(`http://127.0.0.1:8000/api/podcasts/?category=${categoryId}&page=${currentPage}&limit=${limit}`);
  }, [categoryId, currentPage]);

  function fetchData(baseUrl) {
    console.log(`Fetching data from ${baseUrl}`);
    fetch(baseUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('API response data:', data);
        setPodcasts(data.results);
      })
      .catch((error) => {
        console.error('Fetching error:', error);
      });
  }

  return (
    <>
      <main className='mt-4'>
        <div className='container'>
          <h3 className='mb-4'>Podcasts in Category</h3>
          <div className='row mb-4'>
            {podcasts.map((podcast) => (
              <SinglePodcast key={podcast.id} podcast={podcast} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default CategoryPodcasts;
