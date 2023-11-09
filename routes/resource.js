var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var Guitar_controller = require('../controllers/Guitar');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// Guitar ROUTES ///
// POST request for creating a Guitar.
router.post('/Guitars', Guitar_controller.Guitar_create_post);
// DELETE request to delete Guitar.
router.delete('/Guitars/:id', Guitar_controller.Guitar_delete);
// PUT request to update Guitar.
router.put('/Guitars/:id', Guitar_controller.Guitar_update_put);
// GET request for one Guitar.
router.get('/Guitars/:id', Guitar_controller.Guitar_detail);
// GET request for list of all Guitar items.
router.get('/Guitars', Guitar_controller.Guitar_list);
module.exports = router;

