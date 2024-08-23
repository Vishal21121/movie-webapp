const useLocalStorage = () => {
  const getItem = (itemName) => {
    let itemFound = localStorage.getItem(itemName);
    if (itemFound) {
      return itemFound;
    }
    localStorage.setItem(itemName, JSON.stringify([]));
    return null;
  };
  const pushElement = (element, itemName) => {
    let itemFound = JSON.parse(getItem(itemName));
    if (!itemFound) {
      return "please provide proper itemName";
    }
    if (itemFound.length >= 4) {
      itemFound.pop();
      let isElement = itemFound.some((el) => el.movieId === element.movieId);
      if (!isElement) {
        itemFound.unshift(element);
      }
    } else {
      let isElement = itemFound.some((el) => el.movieId === element.movieId);
      if (!isElement) {
        itemFound.unshift(element);
      }
    }
    localStorage.setItem(itemName, JSON.stringify(itemFound));
  };
  const clearElements = () => {
    localStorage.clear();
  };
  const removeElement = (movieId) => {
    const movies = getItem("movieList");
    if (movies) {
      let length = JSON.parse(movies).length;
      if (length > 0) {
        let filteredMovies = JSON.parse(movies).filter(
          (el) => el.movieId !== movieId
        );
        localStorage.setItem("movieList", JSON.stringify(filteredMovies));
        return filteredMovies;
      }
    }
    return null;
  };

  return { getItem, pushElement, clearElements, removeElement };
};

export { useLocalStorage };
