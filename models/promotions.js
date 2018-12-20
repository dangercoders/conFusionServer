const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
	image: {
        type: String,
        required: true
       
    },
	label: {
        type: String,
        required: true,
        unique: true
    },
	price: {
        type: currency,
        required: true,
        min:0
    },
    description: {
        type: String,
        required: true
    },
	featured: {
        type: boolean,
        default: true
    }
},{
    timestamps: true
});

var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;