export const setList = (givenList) => {
  localStorage.setItem("list", JSON.stringify(givenList));
};

export const getList = () => {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
};
