import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const useremail = localStorage.getItem("userEmail");
  console.log(useremail);
  useEffect(() => {
    // Fetch data from the backend API
     const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/getuser/${useremail}`,{
          method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if(data){
        console.log(data);
        setUserData(data); // Assuming data.data contains the user data
        }
        else{
          console.log("Data is not Fetched");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className='bg-primary text-white pt-1' style={{ marginBottom: '10px', display: 'flex' }}>
      <h4 style={{ marginLeft: '150px', padding: '15px', textDecoration: 'underline' }}>
        Project Developed For Internship purpose
      </h4>
      {!localStorage.getItem('authToken') ? (
        <div style={{ marginLeft: '250px', padding: '15px' }}>
          <Link to='/signup'>
            <button type='button' className='btn btn-danger btn-center'>
              Sign In
            </button>
          </Link>
        </div>
      ) : (
        <div className='d-flex'>
          <span style={{marginLeft:"450px"}}>
          {userData?.userData?.name && (
    <h5 className='btn bg-white text-success mx-3 my-3'>
      Hello {userData.userData.name}
    </h5> )}
          </span>
          <div className='btn bg-white text-danger my-3' onClick={handleLogout}>
            Logout !!
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
