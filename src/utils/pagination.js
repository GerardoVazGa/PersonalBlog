export const paginate = (query) => {
    const page = Math.max(1, parseInt(query.page) || 1)
    const limit = Math.min(50, parseInt(query.limit) || 5)
    const offset = (page - 1) * limit

    return { page,limit, offset }

}