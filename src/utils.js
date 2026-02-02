export const formatPrice = (price) => {
  if (price === null || price === undefined || price === "") {
    return "0.00";
  }

  const numPrice = typeof price === "number" ? price : parseFloat(price);

  if (isNaN(numPrice)) {
    return "0.00";
  }

  return numPrice.toFixed(2);
};
