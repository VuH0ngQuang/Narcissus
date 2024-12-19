import UserDetailForm from "./UserDetailForm.jsx";
import {useEffect} from "react";

const UserDetails = () => {
    useEffect(() => {
        if (localStorage.getItem('authToken') === null) {
            window.location.href = '/login';
        }
    }, []);
     return (
          <div>
               <UserDetailForm />
          </div>
     );
}

export default UserDetails;