import React, { useEffect, useState } from "react";
import RecipeList from "../../components/RecipeList/RecipeList";
import { firestore } from "../../firebase/config";
import "./home.css";

const Home = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);
    const unSub = firestore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No recipes to load");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setData(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unSub();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">isPending</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Home;
