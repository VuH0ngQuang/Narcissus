import { useState, useEffect } from 'react';
import { host } from '../../config.js';

const UserDetailForm = () => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    username: '',
    address: '',
    phoneNumber: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${host}/user/getDetails`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authToken')
          }
        });
        if (response.status === 401) window.location.href = '/login';
        if (response.ok) {
          const data = await response.json();
          setUserDetails(data);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('An error occurred while fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        const response = await fetch(`${host}/user/updateDetails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authToken')
          },
          body: JSON.stringify(userDetails)
        });

        if (response.ok) {
          console.log('User details updated successfully');
        } else {
          console.error('Failed to save user details');
        }
      } catch (error) {
        console.error('An error occurred while saving user details:', error);
      }
    }

    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleLogout = () => {
    console.log("Logout clicked!");
    fetch(`${host}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authToken')
      }
    }).then((response) => {
      if (response.status === 401) window.location.href = '/login';
      if (response.ok) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('role');
        window.location.href = '/login';
      } else {
        console.error('Failed to logout');
      }
    }).catch((error) => {
      console.error('An error occurred while logging out:', error);
    });
  };

  const handleAccess = () => {
    console.log("Access clicked!");
    window.location.href = '/admin/dashboard';
  };

  return (
      <div className="divide-y-2 divide-black">
        <div className="h-12"></div>
        <div>
          <div className="border-b-2 border-black pb-2">
            <h2 className="text-6xl ml-10 mt-5 mb-5">User Details</h2>
          </div>

          <div className="flex justify-center">
            <div>
              {['username', 'email', 'address', 'phoneNumber'].map((field) => (
                  <div key={field} className="mb-4">
                    <label className="block text-lg font-semibold text-gray-700 mb-4 mt-4 capitalize">
                      {field}
                    </label>
                    {field === 'email' ? (
                        // Email is always displayed as plain text
                        <div className="bg-gray-200 p-2 rounded text-gray-700 w-[500px]">
                          {userDetails.email}
                        </div>
                    ) : field === 'address' ? (
                        isEditing ? (
                            <textarea
                                name={field}
                                value={userDetails[field]}
                                onChange={handleInputChange}
                                className="bg-gray-200 p-2 rounded text-gray-700 w-[500px] h-36 overflow-y-auto text-base leading-6 break-words"
                            />
                        ) : (
                            <div className="bg-gray-200 p-2 rounded text-gray-700 w-[500px] h-36 overflow-y-auto text-base leading-6 break-words">
                              {userDetails[field]}
                            </div>
                        )
                    ) : isEditing ? (
                        <input
                            type="text"
                            name={field}
                            value={userDetails[field]}
                            onChange={handleInputChange}
                            className="bg-gray-200 p-2 rounded text-gray-700 w-[500px]"
                        />
                    ) : (
                        <div className="bg-gray-200 p-2 rounded text-gray-700 w-[500px]">
                          {userDetails[field]}
                        </div>
                    )}
                  </div>
              ))}

              <div className="flex justify-end mb-8 mt-8 space-x-4">
                {localStorage.getItem('role') === 'ROLE_ADMIN' && (
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
                        onClick={handleAccess}
                    >
                      Access
                    </button>
                )}
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
                    onClick={handleLogout}
                >
                  Logout
                </button>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                    onClick={handleEditClick}
                >
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default UserDetailForm;
