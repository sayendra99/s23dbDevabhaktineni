var Guitar = require('../models/Guitar');
// List of all Guitars
exports.Guitar_list = async function(req, res) {
    try{
        theGuitars = await Guitar.find();
        res.send(theGuitars);
        }
        catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
        }
};
    
// for a specific Guitar.
exports.Guitar_detail = function(req, res) {
res.send('NOT IMPLEMENTED: Guitar detail: ' + req.params.id);
};

// Handle Guitar delete form on DELETE.
exports.Guitar_delete = function(req, res) {
res.send('NOT IMPLEMENTED: Guitar delete DELETE ' + req.params.id);
};
// Handle Guitar update form on PUT.
exports.Guitar_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: Guitar update PUT' + req.params.id);
};

// VIEWS
// Handle a show all view
exports.Guitar_view_all_Page = async function(req, res) {
    try{
    console.log("IN")
    theGuitars = await Guitar.find();
    console.log(theGuitars)
    res.render('Guitar', { title: 'Search Results - Guitars', results: theGuitars });
    }
    catch(err){
    //res.status(500);
    res.send(`{"error": ${err}}`);
    }
}

// Handle Guitar create on POST.
exports.Guitar_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Guitar();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"Guitar_type":"goat", "cost":12, "size":"large"}
    document.type = req.body.type;
    document.cost = req.body.cost;
    document.material = req.body.material;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };