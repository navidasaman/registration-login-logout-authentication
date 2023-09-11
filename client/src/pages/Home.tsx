import React from 'react';
import '../index.css'
interface HomePageProps {
  username: string;
}

const HomePage: React.FC<HomePageProps> = ({ username }) => {
  return (
    <div className="bg-slate-400
     p-5 shadow-md rounded-md
     font-sans hover:font-serif
     text-7xl	
     tracking-widest
     hue-rotate-90		
     ">
      Welcome {username}!
    </div>
  );
};

export default HomePage;