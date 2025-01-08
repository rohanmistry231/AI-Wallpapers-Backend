// Pagination utility for handling database queries
const paginate = async (model, page, limit) => {
  // Ensure page and limit are numbers and set defaults if not provided
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  // Skip the records based on page number and limit
  const skip = (page - 1) * limit;

  // Get the total number of records to calculate total pages
  const totalItems = await model.countDocuments();
  const totalPages = Math.ceil(totalItems / limit);

  // Fetch the data for the current page
  const items = await model.find().skip(skip).limit(limit);

  return {
    page,
    totalPages,
    totalItems,
    items,
  };
};

module.exports = paginate;
