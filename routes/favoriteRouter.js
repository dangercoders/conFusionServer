const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

const Favorites = require('../models/favorite');
var authenticate = require('../authenticate');
const cors = require('./cors');

const favoritesRouter = express.Router();

favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ User: req.user._id })
            .populate('User')
            .populate('Dishes')
            .then((favorites) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ User: req.user._id })
            .then((favorites) => {
                if (favorites != null) {
                    req.body.forEach(element => {
                        if (favorites.Dishes.indexOf(element)) {
                            //do nothing favorite already there
                        }
                        else {
                            favorites.Dishes.push(element._id);
                        }
                    });
                    favorites.save();
                }
                else {
                    let newfavs = [];
                    req.body.forEach(element => {
                        newfavs.push(element);
                    });
                    favorites = new Favorites({
                        User: req.user._id,
                        Dishes: newfavs
                    });
                    favorites.save();
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }, (err) => next(err))
            .catch((err) => next(err));

    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.remove({ User: req.user._id })
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

favoritesRouter.route('/:favId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('Get operation not supported on /favorites/favId');
    })
    .put(cors.cors, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('Put operation not supported on /favorites/favId');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ User: req.user._id })
            .then((favorites) => {
                if (favorites != null) {
                    if (favorites.Dishes.indexOf(req.params.favId) >= 0) {
                      
                    }
                    else {

                        favorites.Dishes.push(req.params.favId);
                        favorites.save();
                    }
                }
                else {
                    favorites = new Favorites({
                    });
                    favorites.User = req.user._id;
                    favorites.Dishes.push(req.params.favId);
                    favorites.save();
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({User: req.user._id})
            .then((favorites) => {
                if (favorites != null) {
                    favorites.Dishes.remove(req.params.favId);
                    favorites.save();
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = favoritesRouter;