import React, { useEffect, useState } from 'react';
import ProfileCard from '../Components/ProfileCard';
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useApiProgress} from '../shared/ApiProgress';
import Spinner from '../Components/Spinner';
import HoaxFeed from '../Components/HoaxFeed';

const UserPage = () => {
    const [user, setUser] = useState({});
    const[notFound, setNotFound] = useState(false) ;

    const { username } = useParams();

    const { t } = useTranslation();

    const pendingApiCall = useApiProgress('get','/api/1.0/users/' + username, true);

    useEffect(() => {
        setNotFound(false);
    }, [user]);

    useEffect(() => {
      const loadUser = async () => {
         try {
            const response = await getUser(username);
            setUser(response.data);

            } catch(error) {
                setNotFound(true);
            }
    };
        loadUser();
    }, [username]);

    if(notFound) {
        return (
        <div className="container">
            <div className="alert alert-danger text-center">
               <div>
               <i className="material-icons" style= {{fontSize: '48px'}}>error</i>
               </div>
                {t('User Not Found')}
            </div>
        </div>
        );
    }

    if(pendingApiCall || user.username !== username ){
        return (
            <Spinner />
        );
    }

    return (
        <div className = "container">
            <div className="row">
                <div className="col">
                <ProfileCard user={user}/>
                </div>
                <div className="col">
                    <HoaxFeed/>
                </div>
            </div>
        </div>
    );
};

export default UserPage;