const calculations = require('../helpers/calculations');

/**
 * IntersectionController takes care of everything CRUD related to intersections
 * For now, the only function is "findNearest" which will find the nearest intersection
 */
class IntersectionController {

  /**
   * findNearest function get input from the API (latitude and longitude) and calculates
   * (using the calculator helper function) the nearest intersection based on API input.
   *
   * @author   Emil Devantie Brockdorff
   * @throws   Error if latitude or longitude is not valid
   *
   * @version  2019-08-24
   * @since    2019-08-24
   *
   * @todo     [?]
   * @tbd      [?]
   * @note
   *
   * @param    {obj}         req     The request object
   * @param    {obj}         res     The response object

  * @return   {res(result)}          The nearest intersection
  */
  findNearest(req, res) {

    const lat = parseFloat(req.params.lat);
    const lon = parseFloat(req.params.lon);
    if (isNaN(lat) || isNaN(lon)) {
      const err = new Error("latitude or longitude is not a valid number");
      err.status = 400;
      throw err;
    }

    const result = calculations(lat, lon);
    return res.status(200).send({
      message: 'Nearest Intersection Found',
      result: result,
    });
  }
}

const IntersectionCtrl = new IntersectionController();
module.exports = IntersectionCtrl;