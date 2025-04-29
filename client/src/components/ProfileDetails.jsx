import React from 'react';

const ProfileDetails = ({ userData }) => (
  <div>
    <p><strong>Trips:</strong> {userData.tripList.length}</p>
    <p><strong>Wishlist:</strong> {userData.wishList.length}</p>
    <p><strong>Properties:</strong> {userData.propertyList.length}</p>
    <p><strong>Reservations:</strong> {userData.reservationList.length}</p>
  </div>
);

export default ProfileDetails;
