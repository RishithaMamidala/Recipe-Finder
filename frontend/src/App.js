import './App.css';
import React, { useEffect } from 'react';
import axios from 'axios';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import { darkTheme } from './Theme/DarkTheme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Components/SignIn';
import Register from './Components/Register';
import ForgotPassword from './Components/ForgotPassword';
import RandomRecipes from './Components/RandomRecipes';
import FavoritesPage from './Components/FavoritesPage';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Router>
          <div className="App">
            <Header />
            <Routes>
            <Route path="/" element={
                <>
                  <SearchBar />
                  <RandomRecipes />
                </>
              } />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/forgotpassword" element={<ForgotPassword/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/favorites" element={<FavoritesPage/>} />
            </Routes>
          </div>
        </Router>
      </CssBaseline>
    </ThemeProvider>  
  );
}

export default App;
