import React from "react";
import { useFetch } from "../../hooks/useFetch";
import "./Recipe.css";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const Recipe = () => {
  const { mode } = useTheme();

  let params = useParams();

  const {
    data: recipe,
    isPending,
    error,
  } = useFetch(`http://localhost:3000/recipes/${params.id}`);
  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p>isPending...</p>}
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
