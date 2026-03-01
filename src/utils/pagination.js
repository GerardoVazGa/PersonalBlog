export const paginate = (query, options = {}) => {
    const {maxLimit = 50, defaultLimit = 5} = options

    if(!query || typeof query !== 'object') {
        return { page: 1, limit: defaultLimit, offset: 0 }
    }

    const page = Math.max(1, parseInt(query.page) || 1)
    const limit = Math.min(maxLimit, parseInt(query.limit) || defaultLimit)
    const offset = (page - 1) * limit

    return { page,limit, offset }

}

export const getPaginationMeta = (totalItems, currentPage, limit) => {
    const totalPages = Math.ceil(totalItems / limit)
    const hasNextPage = currentPage < totalPages
    const hasPrevPage = currentPage > 1

    return {
        currentPage,
        totalPages,
        totalItems,
        hasNextPage,
        hasPrevPage
    }
}