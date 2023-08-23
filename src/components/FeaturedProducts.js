import { useState, useEffect } from "react";

import Highlights from "./Highlights";

export default function FeaturedProducts() {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/e-commerce/products/all/active`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // This variables will be used to store the random numbers and featured products data.
        const numbers = [];
        const featured = [];

        const generateRandomNums = () => {
          let randomNum = Math.floor(Math.random() * data.length);

          if (numbers.indexOf(randomNum) === -1) {
            numbers.push(randomNum);
          } else {
            generateRandomNums();
          }
        };
        for (let i = 0; i < 3; i++) {
          generateRandomNums();
          featured.push(
            <Highlights
              data={data[numbers[i]]}
              key={data[numbers[i]]._id}
              breakPoint={4}
            />
          );
        }
        setPreviews(featured);
      });
  }, []);

  return <>{previews}</>;
}
