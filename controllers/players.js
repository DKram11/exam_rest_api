import Player from '../models/Player.js'
import bcrypt from 'bcryptjs'

export const getPlayers = async (req, res) => {
    try {
        const players = await Player.find()
        if (players.length !==0)
            res.status(200).json(players)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getPlayer = async (req, res) => {
    try {
        const { id } = req.params
        const player = await Player.findById(id)
        if (player)
            res.status(200).json(player)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const deletePlayer = async (req, res) => {
    try {
        await Player.deleteOne({_id: req.params.id })
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

export const updatePlayer = async (req, res) => {
    try {
        const filter = {_id: req.params.id }
        const { firstName, lastName, email, password } = req.body
        const salt = await bcryptjs.gensalt()
        const encryptedPassword = await bcryptjs.hash(password, salt)
        
        const update = {
            firstName,
            lastName,
            email,
            password: encryptedPassword
        }
      
        await Player.findOneAndUpdate(filter. update)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}
