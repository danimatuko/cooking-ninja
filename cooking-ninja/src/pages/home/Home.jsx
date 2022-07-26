import React from "react";
import RecipeList from "../../components/RecipeList/RecipeList";
import useFetch from "../../hooks/useFetch";
import "./home.css";

const Home = () => {
  const {
    data: recipes,
    isPending,
    error,
  } = useFetch("http://localhost:3000/recipes");

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
};

export default Home;
