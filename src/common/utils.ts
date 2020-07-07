export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const noop = () => {
  // do nothing
};

export const getCityOffers = (currentCity, offers) => {
  return offers.filter((offer) => offer.city.name === currentCity);
};
export const getCities = (offers) => {
  const cities = offers.map((offer) => offer.city.name);
  return Array.from(new Set(cities));
};

export const getEnumKeys = <T>(obj: T) => {
  return (Object.keys(obj) as Array<keyof T>);
}
