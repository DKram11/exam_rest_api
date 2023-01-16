import express from 'express'
//Game Developer Company (Gdc)
import { getGdc, getGdcs, addGdc, updateGdc, deleteGdc } from '../controllers/gdcs.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router({mergeParams: true})

router.get('/', verifyToken, getGdcs)
router.get('/:id', verifyToken, getGdc)
router.post('/', verifyToken, addGdc)
router.put('/:id', verifyToken, updateGdc)
router.delete('/:id', verifyToken, deleteGdc)

export default router
