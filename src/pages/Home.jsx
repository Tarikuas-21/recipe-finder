import { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeList from "../components/RecipeList";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await res.json();
      if (data.meals) setRecipes(data.meals);
      else setRecipes([]);
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 text-center font-bold text-xl">
        🍴 Recipe Finder
      </header>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="text-center p-6">Loading...</p>}
      {error && <p className="text-center text-red-600 p-6">{error}</p>}

      <RecipeList recipes={recipes} />
    </div>
  );
}

