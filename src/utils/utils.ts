export const addToLocalStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("Error adding data to local storage:", error);
  }
};

export const getFromLocalStorage = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error("Error getting data from local storage:", error);
  }
};
