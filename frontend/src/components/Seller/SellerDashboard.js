import React from 'react';
import SellerSidebar from './SellerSidebar';

function SellerDashboard(props) {
    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-9 col-12'>
                    {/* Main content goes here */}
                </div>
                <div className='col-md-3 col-12'>
                    {/* Adjust the width of the column here */}
                    <SellerSidebar/>
                </div>
            </div>
        </div>
    );
}

export default SellerDashboard;

