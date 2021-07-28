import React from 'react';
import { useSelector } from 'react-redux';
import HoaxFeed from '../Components/HoaxFeed';
import HoaxSubmit from '../Components/HoaxSubmit';
import UserList from '../Components/UserList';

const HomePage = () => {
       const { isLoggedIn } = useSelector(store => ({isLoggedIn: store.isLoggedIn}))
       return (
       <div className="container">
        <div className="row">
         <div className="col">
          {isLoggedIn && (
            <div className="mb-1">
              <HoaxSubmit/>
            </div>
          )}
          <HoaxFeed/>
         </div>
        <div className="col">
              <UserList/>
         </div>
        </div>
       </div>
       );
};

export default HomePage;