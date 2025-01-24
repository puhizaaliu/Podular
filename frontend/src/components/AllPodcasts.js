import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useState, useEffect} from 'react';
import SinglePodcast from './SinglePodcast';


function AllPodcasts() {
  const podcasts=[
    {
      'title':'Podcast 1',
      'price':100
    },
    {
      'title':'Podcast 2',
      'price':100
    },
    {
      'title':'Podcast 3',
      'price':100
    },
    {
      'title':'Podcast 4',
      'price':100
    },
  ]

  const [Podcasts,setPodcasts]=useState([]) 

  useEffect(()=>{
    fetchData ('http://127.0.0.1:8000/api/podcasts/')
  });

  function fetchData(baseUrl){
    fetch(baseUrl)
    .then((response)=>response.json())
    .then((data)=>setPodcasts(data.results));
  }
  return (
    <>
      {/* Latest Podcasts */}
      <main className='mt-4'>
        <div className='container'>
          <h3 className='mb-4'>All Podcasts</h3>
          <div className='row mb-4'>
            {
              Podcasts.map((podcast)=> <SinglePodcast podcast={podcast} />)
            }
          </div>
        </div>
      </main>
      </>
  );
}

export default AllPodcasts;