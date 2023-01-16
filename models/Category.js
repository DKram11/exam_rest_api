import mongoose from 'mongoose'
import { GameSchema } from './Game.js'

const CategorySchema = new mongoose.Schema(
    {
        genre: { type: String, required: true, unique: false},
        description: { type: String, required: false },
        gdcId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gdc',
            required: true
        },
        games: [GameSchema]
    },
    { timestamps: true }
)

const Category = mongoose.model('Category', CategorySchema)
export default Category
