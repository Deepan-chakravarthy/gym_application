export const exerciseOptions = {
  method: "GET",
  // headers: {
  //   'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  //   'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
  // },
};

export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
    "X-RapidAPI-Key": "9545104a85mshf5d5bb1d837090fp18a18ajsn07cc27373800",
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();
  // console.log(data)
  return data;
};
