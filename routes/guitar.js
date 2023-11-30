var express = require('express');
const Guitar_controlers= require('../controllers/Guitar')
var router = express.Router();


router.get('/', Guitar_controlers.Guitar_view_all_Page);
/* GET detail Guitar page */
router.get('/detail', Guitar_controlers.Guitar_view_one_Page);

const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
    }
/* GET create Guitar page */
router.get('/create',secured,  Guitar_controlers.Guitar_create_Page);

/* GET create update page */
router.get('/update',secured,  Guitar_controlers.Guitar_update_Page);
/* GET delete Guitar page */
router.get('/delete',secured, Guitar_controlers.Guitar_delete_Page);

module.exports = router;