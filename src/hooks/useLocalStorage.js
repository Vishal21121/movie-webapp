const useLocalStorage = () => {
  const getItem = (itemName) => {
    let itemFound = localStorage.getItem(itemName);
    if (itemFound) {
      return itemFound;
    }
    localStorage.setItem(itemName, JSON.stringify([]));
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

  return { getItem, pushElement };
};

export { useLocalStorage };
