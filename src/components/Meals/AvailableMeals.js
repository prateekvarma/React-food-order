import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(); //undefined as the starting value
  
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch("XXX/meals.json");
      
      if(!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedMeals = [];
      for(const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }
      //Below, we're chaining a  .catch() block instead of a try-catch block, because in a try-catch we would need to create another function and set it as async. This is cleaner.
      fetchMeals().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    
  }, []);

  if(isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>...Loading</p>
      </section>
    )
  }

  if(httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
