const intersections = require('./data/intersections');

function Calculations(lat, lon) {
  let nearest = false;

  for (let i = 0; i < intersections.length; i++) {
    let section = intersections[i];
    const section_lat = parseFloat(section.Latitude);
    const section_lon = parseFloat(section.Longitude);

    const distance = calcDistance(lat, lon, section_lat, section_lon);
    section.distance = distance;

    if(!nearest || nearest.distance > section.distance){
      nearest = section;
    }
  }

  const bearing = calcBearing(lat, lon, parseFloat(nearest.Latitude), parseFloat(nearest.Longitude))
  const direction = calcCardinal(bearing);
  nearest.bearing = bearing;
  nearest.direction = direction;
  return nearest;
}

module.exports = Calculations;

/**
 * calcDistance calculates the distance between two coordinates using the
 * Haversine formula
 * a = sin²(Δφ / 2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ / 2)
 * c = 2 ⋅ atan2(√a, √(1− a))
 * d = R ⋅ c
 *
 *
 * @author   Emil Devantie Brockdorff
 * @throws   [none]
 *
 * @version  2019-08-24
 * @since    2019-08-24
 *
 * @todo     [?]
 * @tbd      [?]
 * @note
 *
 * @param    {float}       lat1    Latitude 1: The user input
 * @param    {float}       lon1    Longitude 1: The user input
 * @param    {float}       lat2    Latitude 2: The intersection latitude
 * @param    {float}       lon2    Longitude 2: The intersection longitude

 * @return   {float}               The distance as floating pointer
 */
function calcDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earch radius in km
  let deltaLat = toRadians(lat2 - lat1);
  let deltaLon = toRadians(lon2 - lon1);

  // a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
  let a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  // c = 2 ⋅ atan2( √a, √(1−a) )
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  /**
   * The atan2() function widely used here takes two arguments, atan2(y, x), and computes the arc
   * tangent of the ratio y / x.It is more flexible than atan(y / x), since it handles x = 0,
   * and it also returns values in all 4 quadrants - π to + π
   * (the atan function returns values in the range - π / 2 to + π / 2).
   * https://www.movable-type.co.uk/scripts/latlong.html
   */

  // d = R ⋅ c
  let d = R * c;
  return d;
}

/**
 * calcBearing calculates the bearing between two coordinates using the formula:
 * θ = atan2(sin Δλ⋅ cos φ2, cos φ1⋅ sin φ2− sin φ1⋅ cos φ2⋅ cos Δλ)
 * where φ1, λ1 is the start point, φ2, λ2 the end point(Δλ is the difference in longitude)
 *
 * All angles must be in radians
 *
 * @author   Emil Devantie Brockdorff
 * @throws   [none]
 *
 * @version  2019-08-24
 * @since    2019-08-24
 *
 * @todo     [?]
 * @tbd      [?]
 * @note
 *
 * @param    {float}       lat1    Latitude 1: The user input
 * @param    {float}       lon1    Longitude 1: The user input
 * @param    {float}       lat2    Latitude 2: The intersection latitude
 * @param    {float}       lon2    Longitude 2: The intersection longitude

 * @return   {float}               The bearing angel/degree
 */
function calcBearing(lat1, lon1, lat2, lon2) {
  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);

  let x = Math.cos(lat1) * Math.sin(lat2) -
  Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  let y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  let bearing = Math.atan2(y, x);

  /**
   * Since atan2 returns values in the range - π...+π(that is, -180°...+180°),
   * to normalise the result to a compass bearing( in the range 0°...360°, with –ve values transformed into the
   * range 180°...360°), convert to degrees and then use(θ + 360) % 360, where % is(floating point) modulo.
   * For final bearing, simply take the initial bearing from the end point to the start point and
   * reverse it(using θ = (θ + 180) % 360).
   */
  bearing = toDegrees(bearing);
  return (bearing + 360) % 360;
}

/**
 * calcCardinal calculates and set the cardinal direction (or heading) for the angel
 * θ = atan2(sin Δλ⋅ cos φ2, cos φ1⋅ sin φ2− sin φ1⋅ cos φ2⋅ cos Δλ)
 * where φ1, λ1 is the start point, φ2, λ2 the end point(Δλ is the difference in longitude)
 *
 * All angles must be in radians
 *
 * @author   Emil Devantie Brockdorff
 * @throws   [none]
 *
 * @version  2019-08-24
 * @since    2019-08-24
 *
 * @todo     [?]
 * @tbd      [?]
 * @note
 *
 * @param    {float}       lat1    Latitude 1: The user input
 * @param    {float}       lon1    Longitude 1: The user input
 * @param    {float}       lat2    Latitude 2: The intersection latitude
 * @param    {float}       lon2    Longitude 2: The intersection longitude

 * @return   {float}               The bearing angel/degree
 */
function calcCardinal2(angle) {
  if (typeof angle === 'string') angle = parseInt(angle);
  if (angle <= 0 || angle > 360 || typeof angle === 'undefined') return '☈';
  const arrows = {
    north: 'N',
    north_east: 'NE',
    east: 'E',
    south_east: 'SE',
    south: 'S',
    south_west: 'SW',
    west: 'W',
    north_west: 'NW'
  };
  const directions = Object.keys(arrows);
  const degree = 360 / directions.length;
  angle = angle + degree / 2;
  for (let i = 0; i < directions.length; i++) {
    if (angle >= (i * degree) && angle < (i + 1) * degree) return arrows[directions[i]];
  }
  return arrows['north'];
}

function calcCardinal(angle) {
  if (typeof angle === 'string') angle = parseInt(angle);
  if (angle <= 0 || angle > 360 || typeof angle === 'undefined') return null;

  const directions = 8;
  const degree = 360 / directions; // = 45
  angle = angle + degree / 2;

  /**
   * All bearings has a set-point to true north, 0° = N, 90° = E, etc;
   */
  if (angle >= 0 * degree && angle < 1 * degree)
    return "N";
  if (angle >= 1 * degree && angle < 2 * degree)
    return "NE";
  if (angle >= 2 * degree && angle < 3 * degree)
    return "E";
  if (angle >= 3 * degree && angle < 4 * degree)
    return "SE";
  if (angle >= 4 * degree && angle < 5 * degree)
    return "S";
  if (angle >= 5 * degree && angle < 6 * degree)
    return "SW";
  if (angle >= 6 * degree && angle < 7 * degree)
    return "W";
  if (angle >= 7 * degree && angle < 8 * degree)
    return "NW";

  return null;
}

// Converts from numeric degrees to radians.
function toRadians(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from numeric radians to degrees.
function toDegrees(radians) {
  return radians * 180 / Math.PI;
}