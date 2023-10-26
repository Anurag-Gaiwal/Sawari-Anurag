const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

//Creating a SCHEMA & MODEL : 
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true,
        maxlength: [40, 'Maximun 40 words'],
        minlength: [10, 'Minimum 10 words'],
        validate: [validator.isAlpha, 'Tour name should only contain Characters']
    },
    slug: { type: String },
    duration: {
        type: Number,
        required: [true, "Please enter the Duration of your Tour"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have maximum group size']
    },
    difficulty: {
        type: String,
        required: true,
        enum: {
            values: ['easy', 'medium', 'difficulty'],
            message: 'Choose from Difficulty, Medium and Easy'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        max: [5, 'Rating must be below 5'],
        min: [1, 'Rating must be above 1']
    },
    // Basically Reviews
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
                // this only pints to current doc on NEW document, and not works on UPDATING !!
                return val < this.price;
            }
        },
        message: "Discount price ({VALUE}) should be less than regular price"
    },
    summary: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: true
    },
    images: [String],
    createAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date]
})

tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
})

///////* ************************ *//////

// Virtual for Tour's URL
// MODEL
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;

// 4 TYPES OF MIDDLEWARES IN EXPRESS : [REMAINING]
// > Document --> Acts on the currently preocess document.
// > Query
// > Aggregate
// > Model