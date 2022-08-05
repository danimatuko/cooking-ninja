import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import "./RecipeList.css";
import TrashIcon from "../../assets/trash.svg";
import { firestore } from "../../firebase/config";

const RecipeList = ({ recipes }) => {
  const { mode } = useTheme();

  if (recipes.length === 0) {
    return <h1 className="error">No recipes found</h1>;
  }

  const handleDelete = (id) => {
    firestore.collection("recipes").doc(id).delete();
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title} </h3>
          <p>{recipe.cookingTime} to make</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img
            src={TrashIcon}
            className="delete"
            onClick={() => handleDelete(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
