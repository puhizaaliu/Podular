import SellerSidebar from './SellerSidebar';
import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api/';

function UpdateProduct() {
  const {podcast_id} = useParams();
  const vendor_id=localStorage.getItem('vendor_id');
  const [ErrorMsg,setErrorMsg]=useState('');
  const [SuccessMsg,setSuccessMsg]=useState('');

  const [IsImageDeleted,setIsImageDeleted]=useState(false);
  const [IsMultiplePodcastImagesSelected,setIsMultiplePodcastImagesSelected]=useState(false);


  const [PodcastCategoryData, setPodcastCategoryData]=useState([]);
  const [PodcastData, setPodcastData]=useState({
    'category':'',
    'vendor':'',
    'title':'',
    'detail':'',
    'price':'',
    'image':'',
    'podcast_imgs':'',
  });

  const [ImgUploadErrorMsg,setImgUploadErrorMsg]=useState('');
  const [ImgUploadSuccessMsg,setImgUploadSuccessMsg]=useState('');
  const [PodcastImgs,setPodcastImgs]=useState([]);

  const inputHandler = (event) =>{
    setPodcastData({
      ...PodcastData,
      [event.target.name]:event.target.value
    })
  };

  const fileHandler = (event) =>{
    setPodcastData({
      ...PodcastData,
      [event.target.name]:event.target.files[0]
    })
  };

  const multipleFilesHandler = (event) =>{
    var files=event.target.files;
    if(files.length>0){
      setIsMultiplePodcastImagesSelected(true);
      setPodcastImgs(files);
    }
  }

  const submitHandler = () =>{
    const formData=new FormData();
    formData.append('vendor',PodcastData.vendor);
    formData.append('category',PodcastData.category);
    formData.append('title',PodcastData.title);
    formData.append('detail',PodcastData.detail);
    formData.append('price',PodcastData.price);
    formData.append('image',PodcastData.image);

    axios.patch(baseUrl+'podcasts/'+podcast_id+'/',formData,{
      headers: {
        'content-type' : 'multipart/form-data'
      }
    })

    .then(function (response){
      console.log(response);
      if(response.status == 200){
        {/*setPodcastData({
          'category':'',
          'vendor':'',
          'title':'',
          'detail':'', #70-maybe should delete-E 
          'price':'',
          'image':''
        });
        */}
        setErrorMsg('');
        setSuccessMsg(response.statusText);

        console.log(IsMultiplePodcastImagesSelected);
        if(IsMultiplePodcastImagesSelected){
          for(let i=0;i<PodcastImgs.length;i++){
            const ImageFormData=new FormData();
            ImageFormData.append('podcast',response.data.id);
            ImageFormData.append('image',PodcastImgs[i]);
            // Submit multiple Images
            axios.post(baseUrl + 'podcast-imgs/', ImageFormData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
          }

        }
      

      }else{
        setSuccessMsg('');
        setErrorMsg(response.statusText);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  useEffect(() => {
    setPodcastData({
      ...PodcastData,
      'vendor':vendor_id
    });
    fetchData(baseUrl+ 'categories/');
    fetchPodcastData(baseUrl+ 'podcast/'+podcast_id);
  }, []);


  function fetchData(baseurl){
    fetch(baseurl)
    .then((response) => response.json())
    .then((data) => {
      setPodcastCategoryData(data.results);
    });
  }

  function deleteImage(image_id){
    axios.delete(baseUrl+'podcast-img'+image_id+'/')
    .then(function (response){
      if(response.status==204){
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }


  function fetchPodcastData(baseurl){
    fetch(baseurl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setPodcastData({
        'category':data.category,
        'vendor':data.vendor,
        'title':data.title,
        'detail':data.detail,
        'price':data.price,
        'image':data.image,
        'podcast_imgs':data.podcast_imgs,
      });
    });
  }


  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-9 col-12 mx-auto'> {/* Center the content */}
          <div className='row'>
            <div className='col-md-9 col-12 mb-2'> {/* Column for the form */}
              <div className='card'>
                <h4 className='card-header'>Update Podcast</h4>
                <div className='card-body'>
                {SuccessMsg && <p className="text-success">{SuccessMsg}</p>}
                {ErrorMsg && <p className="text-danger">{ErrorMsg}</p>}
                <form>
                  <div className='mb-3'>
                  <label htmlFor='category' className='form-label'>Category</label>  
                  <select id='category' className='form-control' name='category' onChange={inputHandler}>
                    {
                      PodcastCategoryData.map((item, index) => 
                      <option selected={item.id==PodcastData.category} value={item.id}>{item.title}</option>  // Added key for React elements in lists
                      )
                    }
                        {/*
                        <option value='comedy'>Comedy</option>
                        <option value='history'>History</option>
                        <option value='truecrime'>True Crime</option>
                        <option value='relationships'>Relationships</option>
                        <option value='selfcare'>Self-care</option>
                        <option value='educational'>Educational</option>
                        <option value='newsandpolitics'>News and Politics</option>
                        <option value='stories'>Stories</option>
                      */}
                      </select>
                    </div>
                    <div className='mb-3'>
                      <label for='title' className='form-label'>Title</label>
                      <input type='text' name="title" value={PodcastData.title} onChange={inputHandler} className='form-control' id='title' />
                    </div>
                    <div className='mb-3'>
                      <label for='price' className='form-label'>Price</label>
                      <input type='number' name="price" value={PodcastData.price} onChange={inputHandler} className='form-control' id='price' />
                    </div>
                    <div className='mb-3'>
                      <label for='description' className='form-label'>Description</label>
                      <textarea className='form-control' name="detail" value={PodcastData.detail} onChange={inputHandler} rows='8' id='description' />
                    </div>
                    <div className='mb-3'>
                      <label for='productImg' className='form-label'>Podcast Image</label>
                      <input type='file' className='form-control mb-3' name="image" onChange={multipleFilesHandler} id='podcastImg' />
                      <img src={PodcastData.image} className='img rounded border mt-2' width="200"/>
                      <>
                      {
                        PodcastData.podcast_imgs && PodcastData.podcast_imgs.map((img,index)=>
                        <span class="image-box d-inline p-3 my-2" onClick={()=>deleteImage(img.id)}>
                          <i class="fa fa-trash text-danger" style={styles.deleteBtn} role='button'></i>
                          <img src={img.image} className='my-4' width="200" />
                        </span> )
                      }
                      </>
                    </div>
                    <button type="submit" onClick={submitHandler} className='btn btn-primary'>Submit</button>
                  </form>
                </div>
              </div>
            </div>
            <div className='col-md-3 col-12 mb-2 order-first order-md-last'> {/* Column for the sidebar, displayed on the right */}
              <SellerSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  'deleteBtn':{
    'position':'absolute',
  }
};

export default UpdateProduct;

