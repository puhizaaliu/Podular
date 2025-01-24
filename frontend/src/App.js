import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Browse from './components/Browse';
import Create from './components/Create';
import Navbar from './components/NavBar';
import Shop from './components/Shop';
import Following from './components/Following';
import Favorites from './components/Favorites';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import OrderFailure from './components/OrderFailure';
import AllPodcasts from './components/AllPodcasts';
import PodcastDetail from './components/PodcastDetail';
import Footer from './components/Footer';
import CategoryPodcasts from './components/CategoryPodcasts';
import SingleCreator from './components/SingleCreator';
import AllCreators from './components/AllCreators';

//Admin panel
import AdminLogin from './components/Admin/AdminLogin';
import AllSellers from './components/Admin/AllSellers';
import SingleSeller from './components/Admin/SingleSeller';
import SellerDetails from './components/Admin/SellerDetails';
import EditSeller from './components/Admin/EditSeller';

//Seller panel
import SellerRegister from './components/Seller/SellerRegister';
import SellerLogin from './components/Seller/SellerLogin';
import SellerLogout from './components/Seller/SellerLogout';
import SellerDashboard from './components/Seller/SellerDashboard';
import SellerProducts from './components/Seller/SellerProducts';
import AddProduct from './components/Seller/AddProduct';
import UpdateProduct from './components/Seller/UpdateProduct';
import SellerOrders from './components/Seller/SellerOrders';
import Customers from './components/Seller/Customers';
import Reports from './components/Seller/Reports';
import SellerProfile from './components/Seller/SellerProfile';
import SellerDetail from './components/Seller/SellerDetail';


//Customer panel
import Register from './components/Customer/Register';
import Login from './components/Customer/Login';
import CustomerLogout from './components/Customer/CustomerLogout';
import Dashboard from './components/Customer/Dashboard';
import AddressList from './components/Customer/AddressList';
import AddAddress from './components/Customer/AddAddress';
import SellerChangePassword from './components/Seller/SellerChangePassword';
import UpdateAddress from './components/Customer/UpdateAddress';
import DeleteAddress from './components/Customer/DeleteAddress';
import AddReview from './components/Customer/AddReview';
import Wishlist from './components/Customer/Wishlist';
import Profile from './components/Customer/Profile';
import ChangePassword from './components/Customer/ChangePassword';
import Orders from './components/Customer/Orders';

import Merch from './components/Seller/Merch';
import Test from './components/Seller/Test';

function App() {
  const navWidth = 220
  return (
    <div className="App">
      <Navbar 
        drawerWidth={navWidth}
        content = {
          <Routes>
            <Route path="" element={<Home/>}/>
            <Route path="/browse" element={<Browse/>}/>
            <Route path="/create" element={<Create/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/following" element={<Following/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/order/success' element={<OrderSuccess/>}/>
            <Route path='/order/failure' element={<OrderFailure/>}/>
            <Route path='/allpodcasts' element={<AllPodcasts/>}/>
            <Route path='/podcastdetail' element={<PodcastDetail/>}/>
            <Route path='/footer' element={<Footer/>}/>
            <Route path='/category/:categoryId' element={<CategoryPodcasts/>}/>
            <Route path='/podcast/:podcastId' element={<PodcastDetail/>}/>
            <Route path='/singlecreator' element={<SingleCreator/>}/>
            <Route path='/allcreators' element={<AllCreators/>}/>

            {/*Admin Routes*/}
            <Route path='/admin/AllSellers' element={<AllSellers/>}/>
            <Route path='/admin/SingleSeller' element={<SingleSeller/>}/>
            <Route path='/admin/login' element={<AdminLogin/>}/>
            <Route path="*" element={<Navigate replace to="/admin/login" />} />
            <Route path='/seller/:id' element={<SellerDetails/>}/>
            <Route path="/seller/edit/:id" component={<EditSeller/>} />

            {/*Seller Routes*/}
            <Route path="/seller/register" element={<SellerRegister/>} />
            <Route path="/creator/:creator_id" element={<SellerDetail/>}/>
            <Route path="/seller/login" element={<SellerLogin/>} />
            <Route path="/seller/logout" element={<SellerLogout/>}/>
            <Route path="/seller/dashboard" element={<SellerDashboard/>} />
            <Route path="/seller/products" element={<SellerProducts/>} />
            <Route path='/seller/add-product' element={<AddProduct/>}/>
            <Route path='/seller/update-product/:podcast_id' element={<UpdateProduct/>}/>
            <Route path='/seller/orders' element={<SellerOrders/>}/>
            <Route path='/seller/customers' element={<Customers/>}/>
            <Route path='/seller/reports' element={<Reports/>}/>
            <Route path='/seller/profile' element={<SellerProfile/>}/>
            <Route path='/seller/seller-change-password' element={<SellerChangePassword/>}/>
            
            {/*Customer Routes*/}
            <Route path='/customer/register' element={<Register/>}/>
            <Route path='/customer/login' element={<Login/>}/>
            <Route path='/customer/logout' element={<CustomerLogout/>}/>
            <Route path='/customer/dashboard' element={<Dashboard/>}/>
            <Route path='/customer/addresses' element={<AddressList/>}/>
            <Route path='/customer/add-address' element={<AddAddress/>}/>
            <Route path='/customer/update-address/:address_id' element={<UpdateAddress/>}/>
            <Route path='/customer/delete-address/:address_id' element={<DeleteAddress/>}/>
            <Route path='/customer/wishlist' element={<Wishlist/>}/>
            <Route path='/customer/profile' element={<Profile/>}/>
            <Route path='/customer/change-password' element={<ChangePassword/>}/>
            <Route path='/customer/add-review/' element={<AddReview/>}/>
            <Route path='/customer/orders' element={<Orders/>}/>
            <Route path='/order/success' element={<OrderSuccess/>}/>
            <Route path='/seller/merch' element={<Merch/>}/>
            <Route path='/test' element={<Test/>}/>

            
          </Routes>
        
        }
      />
   </div>
  );
}

export default App;