const { asyncHandler } = require('../utlis/asyncHandler');
const { ApiError } = require('../utlis/ApiError');
const { apiResponse } = require('../utlis/ApiResponse');
const Review = require('../models/Review');

// Render the reviews page and list all reviews
exports.getReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find().populate('user', 'firstName lastName profilePicture').sort({ createdAt: -1 });

    let averageRating = 0;
    if (reviews.length > 0) {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        averageRating = (totalRating / reviews.length).toFixed(1);
    }

    res.render('pages/reviews', {
        title: 'User Reviews - E-Waste Management',
        path: '/reviews',
        reviews: reviews,
        averageRating: averageRating,
        totalReviews: reviews.length
    });
});

// Create a new review
exports.postReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
        throw new ApiError(400, 'Rating and comment are required');
    }

    const ratingVal = parseInt(rating);
    if (isNaN(ratingVal) || ratingVal < 1 || ratingVal > 5) {
        throw new ApiError(400, 'Rating must be a number between 1 and 5');
    }

    const newReview = new Review({
        user: req.session.user._id,
        rating: ratingVal,
        comment
    });

    await newReview.save();
    
    // Demonstrate usage of apiResponse structure if we log or process response meta
    const responseData = new apiResponse(201, newReview, 'Review created successfully');
    console.log(`[Review API Success]: Status ${responseData.statusCode}, Message: ${responseData.message}`);

    res.redirect('/reviews');
});

// Render the edit review page
exports.getEditReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
        throw new ApiError(404, 'Review not found');
    }

    if (review.user.toString() !== req.session.user._id) {
        throw new ApiError(403, 'Unauthorized to edit this review');
    }

    res.render('pages/reviews-edit', {
        title: 'Edit Review - E-Waste Management',
        path: '/reviews',
        review: review
    });
});

// Update an existing review
exports.postEditReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
        throw new ApiError(400, 'Rating and comment are required');
    }

    const ratingVal = parseInt(rating);
    if (isNaN(ratingVal) || ratingVal < 1 || ratingVal > 5) {
        throw new ApiError(400, 'Rating must be a number between 1 and 5');
    }

    const review = await Review.findById(req.params.id);

    if (!review) {
        throw new ApiError(404, 'Review not found');
    }

    if (review.user.toString() !== req.session.user._id) {
        throw new ApiError(403, 'Unauthorized to edit this review');
    }

    review.rating = ratingVal;
    review.comment = comment;
    await review.save();

    res.redirect('/reviews');
});

// Delete a review
exports.deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
        throw new ApiError(404, 'Review not found');
    }

    if (review.user.toString() !== req.session.user._id) {
        throw new ApiError(403, 'Unauthorized to delete this review');
    }

    await Review.findByIdAndDelete(req.params.id);
    res.redirect('/reviews');
});
