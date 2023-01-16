import express from 'express'
import { getPlayer, getPlayers, updatePlayer, deletePlayer} from '../controllers/players.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

router.get('/', verifyToken, getPlayers)
router.get('/:id', verifyToken, getPlayer)
router.put('/:id', verifyToken, updatePlayer)
router.delete('/:id', verifyToken, deletePlayer)

export default router