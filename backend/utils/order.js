const calcSkip = (page, pageSize) => (page - 1) * pageSize;

const calcTotalPages = (total, pageSize) => Math.ceil(total / pageSize);

const orderDirection = (field, direction) => {
    return { [field]: direction === 'desc' ? -1 : 1 };
};

module.exports = {
    calcSkip,
    calcTotalPages,
    orderDirection,
};
