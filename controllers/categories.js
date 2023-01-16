import Category from '../models/Category.js'

export const getCategories = async (req, res) => {
    try {
        const categories = await Category
            .find({ gdcId: req.params.gdcId })
            .populate('gdcId')
            .select('genre description gdcId')
        if (categories.length !==0 )
            res.status(200).json(categories)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getCategory = async (req, res) => {
    try {
        const { id } = req.params
        const category = await Category.findById(id)
            .populate('gdcId')
            .select('genre description gdcId')
        if (category)
           res.status(200).json(curriculum)
        else
           res.status(404).json({ error: 'resource not found'})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const addCategory = async (req, res) => {
    try {
        const { genre, description } = req.body
        const gdcId = req.params.gdcId
        const newCategory = await Category.create({
            genre,
            description,
            gdcId
        })
        const savedCategory = await newCategory.save()
        res.status(201).json({ id: savedCategory._id })
    } catch (err) {
        res.status(500).json({ error: err.mesaage })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        await Category.deleteOne({
            gdcId: req.params.gdcId,
            _id: req.params.id
        })
        res.status(204).send()
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const filter = {
            gdcId: req.params.gdcId,
            _id: req.params.id
        }
        const { genre, description } = req.body
        const update = {
            genre: genre,
            description: description
        }
        
        await Category.findOneAndUpdate(filter, update)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}