import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data.meals[0]))
      .catch(() => setRecipe(null));
  }, [id]);

  if (!recipe) return <p className="text-center p-6">Loading...</p>;

  // Build ingredients array
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ing) ingredients.push({ ing, measure });
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 max-w-4xl mx-auto">
      {/* Hero Image */}
      <div className="relative">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
        />
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-4 rounded text-white">
          <h1 className="text-2xl md:text-4xl font-bold">{recipe.strMeal}</h1>
          <p className="text-sm md:text-base">
            {recipe.strCategory} • {recipe.strArea}
          </p>
        </div>
      </div>

      {/* Ingredients */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ingredients.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-600" />
              <span>{item.measure} {item.ing}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Instructions */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {recipe.strInstructions}
        </p>
      </section>

      {/* YouTube Video */}
      {recipe.strYoutube && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Video Tutorial</h2>
          <div className="relative w-full aspect-video">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src={`https://www.youtube.com/embed/${recipe.strYoutube.split("v=")[1]}`}
              title="YouTube video"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      )}

      {/* Source Link */}
      {recipe.strSource && (
        <section className="mt-6 text-center">
          <a
            href={recipe.strSource}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            View Full Recipe
          </a>
        </section>
      )}

      {/* Back Button */}
      <div className="mt-6 text-center">
        <Link
          to="/"
          className="text-blue-600 hover:underline"
        >
          ← Back to Recipes
        </Link>
      </div>
    </div>
  );
}

