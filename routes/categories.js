import express from 'express'
import { getCategory, getCategories, addCategory, updateCategory, deleteCategory} from '../controllers/categories.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router({mergeParams: true})

router.get('/', verifyToken, getCategories)
router.get('/:id', verifyToken, getCategory)
router.post('/', verifyToken, addCategory)
router.put('/:id', verifyToken, updateCategory)
router.delete('/:id', verifyToken, deleteCategory)

export default router