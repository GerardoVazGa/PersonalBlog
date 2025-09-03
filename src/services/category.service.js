import * as CategoryModel from '../models/category.model.js'

export const listCategories = async () => {
    const categories = await CategoryModel.getAllCategories()
    return categories
}