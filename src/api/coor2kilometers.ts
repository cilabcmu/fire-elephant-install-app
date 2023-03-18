const coordinateToKilometers = (position_a: [number, number], position_b: [number, number]): number => {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.

  const lon1 = (position_a[0] * Math.PI) / 180;
  const lon2 = (position_b[0] * Math.PI) / 180;
  const lat1 = (position_a[1] * Math.PI) / 180;
  const lat2 = (position_b[1] * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 3956;

  // calculate the result
  return c * r;
};

export default coordinateToKilometers;
