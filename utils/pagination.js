

const getPagination = (page_index, page_size) => {
  const limit = page_size ? + page_size : 5;
  const offset = page_index ? (page_index - 1) * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page_index, limit) => {
    const { count, rows } = data;
    const current_page = page_index ? page_index : 1;
    const total_pages = Math.ceil(count / limit);
    
    return { total_items: count, total_pages, current_page, data: rows };
};
  
module.exports={  getPagingData, getPagination  }