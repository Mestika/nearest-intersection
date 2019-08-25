process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let assert = chai.assert;
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

let Intersections = require('../routes/');

let testSuite = {
  lat: 37.7958527,
  lot: -122.4036102
};

chai.use(chaiHttp);

describe('Nearest Intersection', () => {
  // Add BeforeEach for real-world test-suite

  describe('Find nearest intersection', () => {
    it('should get the nearest intersection based on the coordinates', (done) => {
      chai.request(app)
        .get('/api/nearest/' + testSuite.lat +'/' + testSuite.lot)
        .end((err, res) => {
          let result = res.body.result;
          /**
           * RESULT SHOULD BE:
            {
              "CNN": 24758000,
              "Active": 1,
              "X": 6011757.26,
              "Y": 2117725.199,
              "GISObjectID": 303845,
              "Latitude": 37.79553182,
              "Longitude": -122.4033169,
              "DateInsert": "00,00.0",
              "DateUpdate": "00,00.0",
              "streetname": "COLUMBUS AVE",
              "cross_street": "MONTGOMERY ST \\ WASHINGTON ST"
            }
           */

          /**
           * Assert is only one way to test "assertions".
           * Another way could be to use `expect` or `should`
           */
          assert.equal(res.body.success, 'true');
          assert.isObject(result);
          assert.exists(result.distance);
          assert.exists(result.bearing);
          assert.exists(result.direction);
          assert.equal(result.distance, 0.04401401462151049);
          assert.equal(result.bearing, 144.15999083745055);
          assert.equal(result.direction, 'SE');
          assert.equal(result.CNN, 24758000);
          assert.isNumber(result.distance);
          assert.isNumber(result.bearing);
          assert.isString(result.direction);

          /**
           * Other testing method is `expect`
           * expect(result).to.be.an('object');
           * expect(result).to.have.a.property('distance');
           * expect(result).to.have.a.property('bearing');
           * expect(result).to.have.a.property('direction');
           * expect(result.distance).to.equal(0.04401401462151049)
           * expect(result.bearing).to.equal(144.15999083745055)
           * expect(result.direction).to.equal('SE')
           * expect(result.CNN).to.equal(24758000)
           */

          /**
           * Other testing method is `should`
           * result.should.be.a('object'),
           * result.should.have.property('distance'),
           * result.should.have.property('bearing'),
           * result.should.have.property('direction'),
           * result.should.have.property('CNN').eql(24758000);
           */

          done();
        })
    })
  })
})