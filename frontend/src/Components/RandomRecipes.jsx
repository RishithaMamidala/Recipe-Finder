import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, fetchRecipesByIngredients, fetchRecipesInformation } from './State/Recipes/Action';
import RecipeModal from './RecipeModal';

const RandomRecipes = () => {
  const dispatch = useDispatch();
  const { ingredientrecipes, randomrecipes, loading, error } = useSelector(state => state.recipes);
  const [visibleRandomRecipes, setVisibleRandomRecipes] = useState([]);
  const [visibleIngredientRecipes, setVisibleIngredientRecipes] = useState([]);
  const searchQuery = useSelector(state => state.recipes.searchQuery);
  const [loadMore, setLoadMore] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  useEffect(() => {
    // Fetch recipes on component mount
    dispatch(fetchRecipes());
  }, [dispatch]);

  // useEffect(() => {
  //   if (randomrecipes?.length > 0) 
  //   {
  //     setVisibleRandomRecipes(prevRecipes => [...prevRecipes, ...randomrecipes]); 
  //     setVisibleRandomRecipes([]);
  //   } 
  //   else if (ingredientrecipes?.length > 0) 
  //   {
  //     setVisibleIngredientRecipes(prevRecipes => [...prevRecipes, ...ingredientrecipes]); 
  //     setVisibleRandomRecipes([]);
  //   }
  // }, [randomrecipes, ingredientrecipes]);


  useEffect(() => {
    if (randomrecipes?.length > 0) {
      setVisibleRandomRecipes(prevRecipes => [...prevRecipes, ...randomrecipes]);
    } else {
      setVisibleRandomRecipes([]);
    }
  }, [randomrecipes]);

  useEffect(() => {
    if (loadMore === true && ingredientrecipes?.length > 0) {
      setVisibleIngredientRecipes(prevRecipes => [...prevRecipes, ...ingredientrecipes]);
    } else if (loadMore === false && ingredientrecipes?.length > 0) {
      setVisibleIngredientRecipes([...ingredientrecipes]);
    }else {
      setVisibleIngredientRecipes([]);
    }
    setLoadMore(false); 
  }, [ingredientrecipes]);

//   useEffect(() => {
//     if (recipes?.length > 0) {
//         setVisibleRecipes(recipes);
//     }
// }, [recipes]);

  const handleLoadMore = () => {
    if (searchQuery.trim() !== '') {
      setLoadMore(true);
      dispatch(fetchRecipesByIngredients(searchQuery));
    } else {
      dispatch(fetchRecipes()); // Fetch random recipes
    }
  };

//   const handleRecipeClick = async (recipeId) => {
//     try {
//       console.log(recipeId)
//         await dispatch(fetchRecipesInformation(recipeId));
//         setSelectedRecipe(recipeId);
//     } catch (error) {
//         console.error('Error fetching recipe information:', error);
//         // Handle error (e.g., show error message)
//     }
// };

  const handleRecipeClick = (recipeId) => {
    // console.log(recipeId)
    setSelectedRecipeId(recipeId);
  };

  const handleCloseModal = () => {
    setSelectedRecipeId(null);
  };

  return (
    <div className="p-4">
      <h3 className="text-2xl mb-4">Random Recipes</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleRandomRecipes?.length > 0 && visibleRandomRecipes.map((recipe) => (
          <button onClick={() => handleRecipeClick(recipe.id)}>
          <li key={recipe.id} className="bg-white p-4 rounded shadow-md" >
            <h4 className="font-bold text-blue-500">{recipe.title}</h4>
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded mt-2" />
            {/* <p className="mt-2 text-gray-800">{recipe.summary ? recipe.summary.slice(0, 100) + '...' : 'No summary available.'}</p> */}
          </li>
          </button>
        ))}
        {visibleIngredientRecipes?.length > 0 && visibleIngredientRecipes.map((recipe) => (
          <button onClick={() => handleRecipeClick(recipe.id)}>
          <li key={recipe.id} className="bg-white p-4 rounded shadow-md" onClick={() => handleRecipeClick(recipe)}>
            <h4 className="font-bold text-blue-500">{recipe.title}</h4>
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded mt-2" />
            {/* <p className="mt-2 text-gray-800">{recipe.summary ? recipe.summary.slice(0, 100) + '...' : 'No summary available.'}</p> */}
          </li>
          </button>
        ))}
      </ul>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleLoadMore}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
      <RecipeModal
        isOpen={selectedRecipeId != null} 
        recipeId={selectedRecipeId} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default RandomRecipes;
