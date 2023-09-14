// utils.js

function formatNumberWithSpaces(number) {
  if (typeof number !== "number") {
    return "Invalid Input";
  }

  const formattedNumber = number.toFixed(2);
  const [integerPart, decimalPart] = formattedNumber.split(".");
  const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const result = decimalPart
    ? `${integerWithCommas}.${decimalPart}`
    : integerWithCommas;

  return result;
}

module.exports = {
  formatNumberWithSpaces,
};
