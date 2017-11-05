const rp = require('request-promise');

function darkSkyProxy(req, res) {
  rp({
    url: `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${req.query.lat},${req.query.lng}`,
    method: 'GET',
    json: true
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
}

module.exports = {
  proxy: darkSkyProxy
};
