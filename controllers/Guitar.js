var Guitar = require('../models/Guitar');
// List of all Guitars
exports.Guitar_list = async function (req, res) {
    try {
        theGuitars = await Guitar.find();
        res.send(theGuitars);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// for a specific Guitar.
exports.Guitar_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Guitar detail: ' + req.params.id);
};

// Handle Guitar delete form on DELETE.
//exports.Guitar_delete = function (req, res) {
    //res.send('NOT IMPLEMENTED: Guitar delete DELETE ' + req.params.id);
//};

// Handle Guitar delete on DELETE.
exports.Guitar_delete = async function(req, res) {
console.log("delete " + req.params.id)
try {
result = await Guitar.findByIdAndDelete( req.params.id)
console.log("Removed " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": Error deleting ${err}}`);
}
};

// Handle a show one view with id specified by query
exports.Guitar_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await Guitar.findById( req.query.id)
    res.render('Guitardetail', { title: 'Guitar Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };

// Handle building the view for creating a Guitar.
// No body, no in path parameter, no query.
// Does not need to be async
exports.Guitar_create_Page = function(req, res) {
console.log("create view")
try{
res.render('Guitarcreate', { title: 'Guitar Create'});
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};



// Handle building the view for updating a Guitar.
// query provides the id
exports.Guitar_update_Page = async function(req, res) {
console.log("update view for item "+req.query.id)
try{
let result = await Guitar.findById(req.query.id)
res.render('Guitarupdate', { title: 'Guitar Update', toShow: result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

// Handle a delete one view with id from query
exports.Guitar_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await Guitar.findById(req.query.id)
    res.render('Guitardelete', { title: 'Guitar Delete', toShow:
    result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };


// Handle Guitar update form on PUT.
exports.Guitar_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: Guitar update PUT' + req.params.id);
};

// VIEWS
// Handle a show all view
exports.Guitar_view_all_Page = async function (req, res) {
    try {
        console.log("IN")
        theGuitars = await Guitar.find();
        console.log(theGuitars)
        res.render('Guitar', { title: 'Search Results - Guitars', results: theGuitars });
    }
    catch (err) {
        //res.status(500);
        res.send(`{"error": ${err}}`);
    }
}

// Handle Guitar create on POST.
exports.Guitar_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Guitar();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"Guitar_type":"goat", "cost":12, "size":"large"}
    document.type = req.body.type;
    document.cost = req.body.cost;
    document.material = req.body.material;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific guitars.
exports.Guitar_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Guitar.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle Guitar update form on PUT.
exports.Guitar_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Guitar.findById(req.params.id)
        // Do updates of properties
        if (req.body.type)
            toUpdate.type = req.body.type;
        if (req.body.cost) toUpdate.cost = req.body.cost;
        if (req.body.material) toUpdate.material = req.body.material;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
    }
};