// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchRecipesInformation } from './State/Recipes/Action';
// import { useNavigate } from 'react-router-dom';
// import RecipeModal from './RecipeModal';
// import { removeFromFavorites, fetchFavorites } from './State/Favorites/Action';

// const FavoritesPage = () => {
//     const dispatch = useDispatch();
//     const favorites = useSelector(state => state.favorites.favorites); // Update to match your state structure
//     const recipeInformation = useSelector(state => state.recipeInformation.recipe); // Fetching complete recipe information from state
//     const [selectedRecipeId, setSelectedRecipeId] = useState(null);
//     // const [recipesInfo, setRecipesInfo] = useState([]); // Local state to store recipes information

//     useEffect(() => {
//         dispatch(fetchFavorites()); // Fetch favorites on component mount
//     }, [dispatch]);

  

   
//     const handleRemoveFavorite = async (recipeId) => {
//         try {
//           await dispatch(removeFromFavorites(recipeId));
//           // After successful removal, update local state and potentially fetch information
//           //setRecipesInfo(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
          
//         } catch (error) {
//           console.error('Error removing from favorites:', error);
//           // Handle error state or notification to user
//         }
//       };

//     const handleRecipeClick = (recipeId) => {
//         setSelectedRecipeId(recipeId); // Set the selected recipe id for modal display
//     };
    
//     const handleCloseModal = () => {
//         setSelectedRecipeId(null); // Close the modal by resetting selected recipe id
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl mb-4">Favorites</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {recipeInformation ? (
//                     // recipeInformation.map(recipe => (
//                         <div key={recipeInformation.id} className="bg-white p-4 rounded shadow-md">
//                             <button onClick={() => handleRecipeClick(recipeInformation.id)}>
//                                 <img src={recipeInformation.image} alt={recipeInformation.title} className="w-full h-48 object-cover rounded mt-2" />
//                             </button>
//                             <div className="p-4">
//                                 <h2 className="font-bold text-blue-500">{recipeInformation.title}</h2>
//                                 <button onClick={() => handleRemoveFavorite(recipeInformation.id)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-200">Remove from Favorites</button>
//                             </div>
//                         </div>
                    
//                 ) : (
//                     <p className='text-red-600'>No favorite recipes found</p>
//                 )}
//                 <RecipeModal
//                     isOpen={selectedRecipeId != null} 
//                     recipeId={selectedRecipeId} 
//                     onClose={handleCloseModal} 
//                 />
//             </div>
//         </div>
//     );
// };

// export default FavoritesPage;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {  } from './State/Recipes/Action';
import { fetchFavorites, removeFromFavorites, fetchFavRecipesInformation } from './State/Favorites/Action';
import RecipeModal from './RecipeModal';
import FavoritesModal from './FavoritesModal';
import {store} from './State/store';

const FavoritesPage = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.favorites || []);
    //const recipesInformation = useSelector(state => state.favoritesInformation.recipes || []);
    const recipesInformation = useSelector(state => state.favorites.recipes || []);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    useEffect(() => {
        if (favorites.length >= 0) {
            const favoriteRecipeIds = favorites.map(favorite => favorite.recipe_id);
            dispatch(fetchFavRecipesInformation(favoriteRecipeIds));
        }
    }, [favorites, dispatch]);


    const handleRemoveFavorite = async (recipeId) => {
        try {
            await dispatch(removeFromFavorites(recipeId));
            console.log('qqqq',favorites);
            console.log('fav state ui', store.getState().favorites);
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    const handleRecipeClick = (recipeId) => {
        setSelectedRecipeId(recipeId);
    };

    const handleCloseModal = () => {
        setSelectedRecipeId(null);
    };
    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Favorites</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipesInformation.length > 0 ? (
                    recipesInformation.map(recipe => (
                        <div key={recipe.id} className="bg-white p-4 rounded shadow-md">
                            <button onClick={() => handleRecipeClick(recipe.id)}>
                                <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded mt-2" />
                            </button>
                            <div className="p-4">
                                <h2 className="font-bold text-blue-500">{recipe.title}</h2>
                                <button onClick={() => handleRemoveFavorite(recipe.id)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-200">Remove from Favorites</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-red-600'>No favorite recipes found</p>
                )}
                <FavoritesModal
                    isOpen={selectedRecipeId != null} 
                    recipeId={selectedRecipeId} 
                    onClose={handleCloseModal} 
                />
            </div>
        </div>
    );
};

export default FavoritesPage;
