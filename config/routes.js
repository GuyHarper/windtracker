const router = require('express').Router();
const darkSky = require('../controllers/darkSky');

router.get('/weather', darkSky.proxy);


router.all('/*', (req, res) => res.notFound());

module.exports = router;
