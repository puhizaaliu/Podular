function SellerLogout(){
    localStorage.removeItem('creator_login');
    localStorage.removeItem('creator_username');
    localStorage.removeItem('creator_id');
    window.location.href='/seller/login';
}
export default SellerLogout;