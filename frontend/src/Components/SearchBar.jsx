import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { handleSearch, clearSearch } from './State/Recipes/Action';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(handleSearch(searchQuery));
  };

  const handleClear = () => {
    setSearchQuery("");
    dispatch(clearSearch());
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className='flex justify-center p-2'>
      <TextField
        placeholder='Search...'
        value={searchQuery}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        variant='outlined'
        fullWidth={false} 
        style={{ width: '900px', backgroundColor: '#ffffff', borderRadius: '10px' }} 
        // className='w-100 bg-white rounded-lg p-2 text-black'
        InputProps={{
            style: { color: 'black' }, 
          endAdornment: (
            <React.Fragment>
              {searchQuery && (
                <IconButton onClick={handleClear} size='large'>
                  <ClearIcon style={{ color: 'black' }}/>
                </IconButton>
              )}
              <IconButton onClick={handleSubmit} size='large'>
                <SearchIcon style={{ color: 'black' }}/>
              </IconButton>
            </React.Fragment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
