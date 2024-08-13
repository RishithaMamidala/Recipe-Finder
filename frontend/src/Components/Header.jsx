import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, resetLoginUser, signOutUser } from './State/Users/Action';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { fetchFavorites } from './State/Favorites/Action';


const Header = () => {
  const isLoggedIn = useSelector(state => state.loginUser.isLoggedIn);
  const dispatch = useDispatch();
  const [selectedButton, setSelectedButton] = useState('Home');
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const userName = useSelector(state => state.loginUser.name); 
  const { favorites, loading, error } = useSelector(state => state.favorites);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setSelectedButton('Home');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    if (buttonName === 'SignIn') {
      navigate('/signin');
    } else if (buttonName === 'Home') {
      navigate('/');
    }else if (buttonName === 'Profile') {
      setShowDropdown(prevState => !prevState);
    }
  };

  const handleSignOutClick = () => {
    dispatch(signOutUser());
    setShowDropdown(false);
    navigate('/');
  };

  const handleViewFavorites = () => {
    
    setShowDropdown(false);
    // console.log(favorites)
    navigate('/favorites');
  };


  // const toggleDropdown = () => {
  //   setShowDropdown(!showDropdown);
  // };

  const buttonClass = (buttonName) => {
    const baseClass = 'px-4 py-2 rounded-full transition-colors duration-200';
    const defaultClass = 'bg-blue-500 text-white hover:bg-blue-600';
    const selectedClass = 'bg-blue-700 text-white';

    return selectedButton === buttonName ? `${baseClass} ${selectedClass}` : `${baseClass} ${defaultClass}`;
  };

  return (
    <div className='flex flex-row bg-gray-500'>
        <div className='basis-1/2 flex-auto text-start p-3 m-1'>
            <h2 className='text-white text-3xl'>Recipe Finder</h2>
        </div>
        <div className='flex text-end space-x-2 p-3 m-1'>
        {isLoggedIn ? (
          <div className='relative'>
          <button className={buttonClass('Profile')} onClick={() => handleButtonClick('Profile')}>
            <AccountCircleIcon />
            <ArrowDropDownIcon />
          </button>
          {showDropdown && (
            <div ref={dropdownRef} className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10'>
              <div className='p-4'>
                <p className='text-gray-800 font-bold text-center'>{`Welcome ${userName}`}</p>
                <hr className='my-2 border-gray-400' />
                <button className='block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200' onClick={handleViewFavorites}>
                    My Favorites
                </button>
                <button className='block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200' onClick={handleSignOutClick}>
                    Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
        ) : (
          (location.pathname !== '/signin' && location.pathname !== '/forgotpassword' && location.pathname !== '/register') && (
            <button className={buttonClass('SignIn')} onClick={() => handleButtonClick('SignIn')}>
              SignIn
            </button>
          )
        )}
          <button className={buttonClass('Home')} onClick={() => handleButtonClick('Home')}>
            Home
          </button>
        </div>
        
    </div>
  )
}

export default Header
