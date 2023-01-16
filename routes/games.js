import express from 'express'
import { getGame, getGames, addGame, updateGame, deleteGame } from '../controllers/games.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router({mergeParams: true})

router.get('/', verifyToken, getGames)
router.get('/:id', verifyToken, getGame)
router.post('/', verifyToken, addGame)
router.put('/:id', verifyToken, updateGame)
router.delete('/:id', verifyToken, deleteGame)

export default router