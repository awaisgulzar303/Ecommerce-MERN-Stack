class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = { ...this.queryStr.keyword }
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  //filter products by category
  filter() {
    const queryCopy = { ...this.queryStr };

    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    if (queryCopy.category) {
      queryCopy.category = { $regex: this.queryStr.category, $options: "i" };
    }

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // filter method made by me
  filter1() {
    const category = { ...this.queryStr.category }
      ? {
          category: {
            $regex: this.queryStr.category,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...category });
    return this;
  }

  priceFilter() {
    let priceRange = JSON.stringify(this.queryStr);
    priceRange = priceRange.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    const queryObject = JSON.parse(priceRange);
    this.query = this.query.find(queryObject);
    return this;
  }

  filterbyStock = () => {
    let stock = JSON.stringify(this.queryStr);
    stock = stock.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    const convertToobject = JSON.parse(stock);
    this.query = this.query.find(convertToobject);
  };

  pagination(productsPerPage) {
    const currentpage = Number(this.queryStr.page) || 1;
    const skip = productsPerPage * (currentpage - 1);
    this.query = this.query.limit(productsPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeature;
