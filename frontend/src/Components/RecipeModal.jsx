import React, { useEffect, useRef } from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipesInformation, resetRecipeInformation } from './State/Recipes/Action';
import { addToFavorites } from './State/Favorites/Action';
import {store} from './State/store';

const RecipeModal = ({ isOpen, recipeId, onClose }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const recipe = useSelector(state => state.recipeInformation.recipe);
  const loading = useSelector(state => state.recipeInformation.loading);
  const error = useSelector(state => state.recipeInformation.error);
  const isLoggedIn = useSelector(state => state.loginUser.isLoggedIn);
  const favorites = useSelector(state => state.favorites.favorites || []);

  useEffect(() => {
    if (isOpen && recipeId) {
      dispatch(fetchRecipesInformation(recipeId));
    }
  }, [isOpen, recipeId, dispatch]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      dispatch(resetRecipeInformation); // Dispatch an action to reset recipe information state
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

//   const handleAddToFavorites = async () => {
//     if (isLoggedIn) {
//         const success = await dispatch(addToFavorites(recipeId));
//         if (success) {
//             alert("Added to favorites");
//             onClose(); // Close the modal on successful addition
//         } else {
//             alert("Failed to add to favorites. Please try again later.");
//         }
//     } else {
//         alert("Please log in to add to favorites.");
//         // Redirect or handle login flow as needed
//     }
// };


const handleAddToFavorites = async () => {
  if (isLoggedIn) {
      try {
          const { success, message } = await dispatch(addToFavorites(recipeId));
          if (success) {
              onClose(); // Close the modal on successful addition
          }
          alert(message); // Display appropriate message
          console.log(store.getState().favorites.favorites);
      } catch (error) {
          console.error('Error adding to favorites:', error);
          alert('Failed to add to favorites. Please try again later.');
      }
  } else {
      alert('Please log in to add to favorites.');
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl h-screen overflow-y-auto">
        <IconButton
          onClick={onClose}
          style={{
            backgroundColor: '#3333',
            color: '#333',
            marginBottom: 20,
          }}
        >
          <CloseIcon style={{ color: '#000' }} />
        </IconButton>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {recipe && (
          <>
            <h3 className="text-2xl mb-2 font-bold text-red-500">{recipe.title}</h3>
            <p className='text-black mb-3'>{recipe.readyInMinutes} Minutes</p>
            <button className="bg-blue-500 text-white hover:bg-blue-600 font-bold py-2 px-4 rounded mb-4" onClick={() => handleAddToFavorites(recipe.id)} >
              Add to Favorites
            </button>
            <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded mb-4" />
            <div>
              <h4 className="font-bold text-lg mb-2 text-blue-500">Ingredients</h4>
              <ul className="list-disc list-inside">
                {recipe.extendedIngredients.map((ingredient, id) => (
                  <li key={id} className='text-black'>{ingredient.original}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h4 className="font-bold text-lg mb-2 text-blue-500">Recipe</h4>
              <div className="text-black" dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeModal;
