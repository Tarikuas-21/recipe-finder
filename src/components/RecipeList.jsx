import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes }) {
  if (!recipes || recipes.length === 0) {
    return (
      <p className="text-center text-gray-600 p-6">
        No recipes found. Try searching for something else!
      </p>
    );
  }

  return (
    <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  );
}

