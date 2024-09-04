export function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const capitalize = (str) => {
  if (typeof str !== "string" || str.length === 0) return str;

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
