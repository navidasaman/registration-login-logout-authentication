import React from 'react';
import axios from 'axios';

interface HomeProps {
  username: string;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home: React.FC<HomeProps> = ({ username, setIsLoggedIn }) => {
  const handleLogout = () => {
    axios.get(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_LOGOUT_ENDPOINT}`)
      .then(response => {
        // Handle successful logout
        sessionStorage.removeItem('isLoggedIn'); // Clear isLoggedIn 
        sessionStorage.removeItem('username'); // Clear username from session storage
        console.log(response.data.message);
        setIsLoggedIn(false); // Update isLoggedIn state
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="bg-slate-400
      p-5 shadow-md rounded-md
      font-sans hover:font-serif
      text-7xl	
      tracking-widest
      hue-rotate-90		
      ">
        <h1>Welcome {username}!</h1>
      </div>
    <button className='bg-green-200 p-3 border border-gray-300 mt-10 rounded-xl'
    onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;