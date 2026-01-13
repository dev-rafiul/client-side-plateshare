import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const parseQuantity = (quantityStr) => {
    if (typeof quantityStr === "number") return quantityStr;
    const match = quantityStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  useEffect(() => {
    fetch("https://plateshare-server-mu.vercel.app/foods")
      .then((res) => res.json())
      .then((data) => {
        const sortedFoods = data
          .sort(
            (a, b) =>
              parseQuantity(b.food_quantity) - parseQuantity(a.food_quantity)
          )
          .slice(0, 6);
        setFoods(sortedFoods);
      })
      .catch(() => setFoods([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="my-16 px-6 md:px-10 text-center">
        <p className="text-base-content opacity-60">Loading featured foods...</p>
      </section>
    );
  }

  if (!foods.length) {
    return (
      <section className="my-16 px-6 md:px-10 text-center">
        <p className="text-base-content opacity-60">No featured foods available.</p>
      </section>
    );
  }

  return (
    <section className="my-16 px-6 md:px-10 max-w-7xl mx-auto bg-base-100">
      <div className="text-center mb-4">
        <span className="px-4 py-1 bg-primary bg-opacity-20 text-white rounded-full text-sm font-medium">
          🍛 Featured Foods
        </span>
      </div>
      <h2 className="text-3xl font-bold text-center mb-3 text-base-content">
        Discover our <span className="text-primary">Handpicked</span> meals
        ready
      </h2>
      <p className="text-center text-base-content opacity-60 max-w-xl mx-auto mb-14">
        Highlighting the best meals available right now.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {foods.map((food) => (
          <div
            key={food._id}
            className="card bg-base-100 shadow-md hover:shadow-lg transition"
          >
            <figure>
              <img
                src={food.food_image}
                alt={food.food_name}
                className="h-56 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-base-content">{food.donator_image}</h2>
              <p className="text-base-content opacity-70">Quantity: {food.food_quantity}</p>
              <p className="text-base-content opacity-60 text-sm">
                Location: {food.pickup_location}
              </p>
              <div className="card-actions justify-end">
                <Link
                  to={`/food/${food._id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/availableFoods" className="btn btn-outline btn-primary">
          Show All
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
