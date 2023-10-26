const Tour  = require('./../models/tourModels');
const APIFeatures = require('./../utils/apiFeatures');

const catchAsync = require('./../utils/catchAsync');

exports.alisaTopTour = (req, res, next) => {
    // PRE FILLIG THE QUERY FOR THE USER
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {

    // FINAL STEP ------> Execute query <------
    console.log(req.query);

    const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitfields()
        .paginate();
    const tours = await features.query;


    // SENDING RESPONE :
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});

exports.getTour = catchAsync(async (req, res, next) => {

    //ALTERNATE : 
    // const tour = await Tour.findOne({ _id: req.params.id })

    // Shorthand that mongoose provided us :)
    const tour = await Tour.findById(req.params.id);
    // console.log(req.params);

    // HANDLING NON FOUND [404] ERRORS
    if(!tour){
        return next(new AppError(`No tour found with Tour ID: ${req.params.id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        },
    });
});

exports.createTour = catchAsync(async (req, res, next) => {
    // const newTour = new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body);
    // console.log(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });
});

exports.updateTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    // HANDLING NON FOUND [404] ERRORS
    if(!tour){
        return next(new AppError(`No tour found with Tour ID: ${req.params.id}`, 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    // HANDLING NON FOUND [404] ERRORS
    if(!tour){
        return next(new AppError(`No tour found with Tour ID: ${req.params.id}`, 404));
    }


    res.status(204).json({
        status: "success",
        data: null
    });
});

exports.getTourStats = catchAsync(async (req, res, next) => {

    const stats = await Tour.aggregate([
        {
            $match: { ratingsAverage: { $gte: 4.3 } }
        },
        {
            $group: {
                _id: "$difficulty",
                numTours: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
            }
        },
        {
            $sort: { avgPrice: 1 }
        }
    ]);
    res.status(200).json({
        status: 'success',
        data: {
            stats
        },
    });
});

exports.getMonthPlan = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numTourStats: { $sum: 1 },
                tours: { $push: '$name' }
            },
        },
        {
            $addFields: { month: '$_id' }
        },
        {
            $project: {
                _id: 0
            }
        },
        {
            $sort: { numTourStats: 1 }
        },
        {
            //Sets a limit to the data
            $limit: 12
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            plan
        }
    });
});
