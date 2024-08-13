import React, { useEffect, useRef } from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipesInformation, resetRecipeInformation } from './State/Recipes/Action';
import { addToFavorites } from './State/Favorites/Action';
import {store} from './State/store';

const FavoritesModal = ({ isOpen, recipeId, onClose }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

//   const {recipes, loading, error} = useSelector(state => state.favoritesInformation);
const {favorites, recipes, loading, error} = useSelector(state => state.favorites);
  const recipe = recipes && recipes.find(r => r.id === recipeId);
  

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);


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

export default FavoritesModal;
