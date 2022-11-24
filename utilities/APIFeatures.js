class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1A) Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    // mongoDB filtering: {difficulty: 'easy', duration: {$gte: 5}}
    // query parsed obj { difficulty: 'easy', duration: { gte: '5' }}
    // gte, gt, lte, lt
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (matched) => `$${matched}`
    );

    this.query.find(JSON.parse(queryStr));
    return this;

    // Filtering - mongoose Methods
    // const tours = await Tour.find()
    // .where('duration')
    // .equals(5)
    // .where('difficulty')
    // .equals('easy');

    // Filtering - mongoDB
    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy',
    // });
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
      // multiple criterias: sort('price ratingsAverage')
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
      //selecting certain fields: PROJECTING => select('name duration price')
    } else {
      this.query = this.query.select('-__v'); // minus: excluding fields
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
