import URLS from "./urls";

// ###############    Methods   #################
export const apiGet = async (subRoute: String) => {
  const res = await fetch(URLS.BASE_URL + subRoute).catch((err) => {
    console.error(err);
  });
  return await res.json();
};
