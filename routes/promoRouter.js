const express = require('express');
const bodyParser = require('body-parser');

const promotions = express.Router();
const cors = require('./cors');

promotions.use(bodyParser.json());

promotions.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.cors, (req,res,next) => {
    res.end('Will send all the promotions to you!');
})
.post(cors.corsWithOptions,(req, res, next) => {
    res.end('Will add the promotions: ' + req.body.name + ' with details: ' + req.body.description);
})
.put(cors.corsWithOptions,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(cors.corsWithOptions,(req, res, next) => {
    res.end('Deleting all promotions');
});

promotions.route('/:promoId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.cors, (req,res,next) => {
    res.end('Will send the detail of promotion: '+ req.params.promoId+ 'to you!');
})
.post(cors.corsWithOptions,(req, res, next) => {
	res.statusCode = 403;
    res.end('POST operation not supported on /promotions');
})
.put(cors.corsWithOptions,(req, res, next) => {
    
    res.write('Updating the promotion: ' + req.params.promoId +'\n');
    res.end('Will add the leaders: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete(cors.corsWithOptions,(req, res, next) => {
    res.end('Deleted promotion: ' + req.params.promoId);
});

module.exports = promotions;