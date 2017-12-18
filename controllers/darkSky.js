const rp = require('request-promise');

function darkSkyProxy(req, res) {
  rp({
    url: `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${req.query.lat},${req.query.lng}?units=si`,
    method: 'GET',
    json: true
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
}

module.exports = {
  proxy: darkSkyProxy
};
