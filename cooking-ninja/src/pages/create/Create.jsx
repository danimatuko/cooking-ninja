import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../firebase/config";
import { useFetch } from "../../hooks/useFetch";
import "./Create.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = {
      title,
      method,
      cookingTime: cookingTime + " Mintues",
      ingredients,
    };

    firestore
      .collection("recipes")
      .add(doc)
      .then(() => navigate("/"))
      .catch((err) => console.log(err.message));
  };

  const addIngredient = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  return (
    <div className="create">
      <h1 className="page-title">Add a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>{" "}
        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={addIngredient}>
              add
            </button>
          </div>
        </label>
        <label>
          <p>
            Current Ingredients:{" "}
            {ingredients.map((ing) => (
              <em key={ing}>{ing}, </em>
            ))}
          </p>
          <span>Recipe Method:</span>
          <textarea
            type="text"
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Recpie Cooking Time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
