
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favoritesSchema = new Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    Dishes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' } ]
});

var Favorites = mongoose.model('Favorites', favoritesSchema);

module.exports = Favorites;