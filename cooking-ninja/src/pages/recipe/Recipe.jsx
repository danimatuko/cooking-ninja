import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import "./Recipe.css";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { firestore } from "../../firebase/config";

const Recipe = () => {
  const { id } = useParams();
  const { mode } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);
    firestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setRecipe(doc.data());
        } else {
          setError("Could not find recipe");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsPending(false));
  }, [id]);

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
