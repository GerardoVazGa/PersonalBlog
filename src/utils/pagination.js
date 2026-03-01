export const paginate = (query) => {
    const page = Math.max(1, parseInt(query.page) || 1)
    const limit = Math.min(50, parseInt(query.limit) || 5)
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