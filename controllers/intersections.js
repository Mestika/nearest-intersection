const calculations = require('../helpers/calculations');

class IntersectionController {

  findNearest(req, res){
    const lat = parseFloat(req.params.lat);
    const lon = parseFloat(req.params.lon);
    let result = calculations(lat, lon);
    return res.status(200).send({
      success: 'true',
      message: 'Nearest Intersection Found',
      result: result,
      });
  }
}

const IntersectionCtrl = new IntersectionController();
module.exports = IntersectionCtrl;

