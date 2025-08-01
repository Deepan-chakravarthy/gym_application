import { useEffect, useState } from "react";

export const FetchImageFunc = (id) => {
  // console.log(id,"id")
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      // const url = `https://exercisedb.p.rapidapi.com/image?resolution=180&exerciseId=${id}`;
      const url = `http://localhost:5000/image?resolution=180&exerciseId=${id}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
            "x-rapidapi-host": "exercisedb.p.rapidapi.com",
          },
        });

        const blob = await response.blob();

        const objectURL = URL.createObjectURL(blob);

        setImageUrl(objectURL);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [id]);

  return imageUrl;
};
