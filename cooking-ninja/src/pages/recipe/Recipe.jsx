import React from "react";
import useFetch from "../../hooks/useFetch";
import "./Recipe.css";
import { Link, useParams } from "react-router-dom";

const Recipe = () => {
  let params = useParams();

  const {
    data: recipe,
    isPending,
    error,
  } = useFetch(`http://localhost:3000/recipes/${params.id}`);

  return (
    <div className="recipe">
      {error && <p className="error">{error}</p>}
      {isPending && <p>Loading...</p>}
      {recipe && (
        <>
          <h1 className="page-title">{recipe.title}</h1>
          <p>Takes {recipe.cookingTime} to cook</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p>{recipe.method}</p>
        </>
      )}
    </div>
  );
};

export default Recipe;
