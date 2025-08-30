import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition transform hover:scale-105 overflow-hidden">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{recipe.strMeal}</h3>
        <p className="text-gray-600 text-sm">
          {recipe.strCategory} • {recipe.strArea}
        </p>
        <Link
          to={`/recipe/${recipe.idMeal}`}
          className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

