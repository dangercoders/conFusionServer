const express = require('express');
const bodyParser = require('body-parser');

const leaders = express.Router();
const cors = require('./cors');
leaders.use(bodyParser.json());

leaders.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.cors, (req,res,next) => {
    res.end('Will send all the leaders to you!');
})
.post(cors.corsWithOptions,(req, res, next) => {
    res.end('Will add the leaders: ' + req.body.name + ' with details: ' + req.body.description);
})
.put(cors.corsWithOptions,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete(cors.corsWithOptions,(req, res, next) => {
    res.end('Deleting all leaders');
});


leaders.route('/:leaderId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.cors, (req,res,next) => {
    res.end('Will send the detail of leader:'+ req.params.leaderId + 'to you!');
})
.post(cors.corsWithOptions,(req, res, next) => {
	 res.statusCode = 403;
    res.end('POST operation not supported on /leaders');
})
.put(cors.corsWithOptions,(req, res, next) => {
	res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will add the leaders: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete(cors.corsWithOptions,(req, res, next) => {
    res.end('Deleted the leader: ' + req.params.leaderId);
});

module.exports = leaders;