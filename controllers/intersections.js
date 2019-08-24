const Calculations = require('../calculations');

class intersectionController {

  findNearest(req, res){
    const lat = parseFloat(req.params.lat);
    const lon = parseFloat(req.params.lon);
    let result = new Calculations(lat, lon);
    return res.status(200).send({
      success: 'true',
      message: 'Nearest Intersection Found',
      result: result,
      });
  }
}

const intersectionCtrl = new intersectionController();
module.exports = intersectionCtrl;