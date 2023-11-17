var express = require('express');
const Guitar_controlers= require('../controllers/Guitar')
var router = express.Router();


router.get('/', Guitar_controlers.Guitar_view_all_Page);
/* GET detail Guitar page */
router.get('/detail', Guitar_controlers.Guitar_view_one_Page);

/* GET create Guitar page */
router.get('/create', Guitar_controlers.Guitar_create_Page);

/* GET create update page */
router.get('/update', Guitar_controlers.Guitar_update_Page);
/* GET delete Guitar page */
router.get('/delete', Guitar_controlers.Guitar_delete_Page);




module.exports = router;