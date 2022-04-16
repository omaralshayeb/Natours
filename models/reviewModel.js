const mongoose = require("mongoose");
const Tour = require("./tourModel");

//Define Review Schema
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review can not be empty!"],
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      //link with Tour Model
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "Review must belong to a tour."],
    },
    user: {
      //link with User Model
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
  },
  {
    //virtual properties (not stored in DB)
    toJSN: { virtuals: true },
    toObject: { virtiuals: true },
  }
);

//Indexing the tour, user fields
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

//A pre find hook (qurey middleware)
reviewSchema.pre(/^find/, function(next) {
  // this.populate({ path: 'tour', select: 'name' }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // });
  //we got rid of populating the tour in the review to avoid a populate chain

  this.populate({
    path: "user",
    select: "name photo", //populate these fields
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function(tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: "$tour",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

//A post save hook (document middleware)
reviewSchema.post("save", function() {
  //this points to current review
  this.constructor.calcAverageRatings(this.tour);
});

//Qurey middleware
reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
});

reviewSchema.post(/^findOneAnd/, async function() {
  //  this.r = await this.findOne(); // does NOT work here beacause the query has already executed
  await this.r.constructor.calcAverageRatings(this.r.tour);
});

//The Model based on Schema
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
