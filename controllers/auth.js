import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Player from '../models/Player.js'

export const register = async (req, res) => {
    try { 
        const { firstName, lastName, email, password } = req.body
        const salt = await bcryptjs.genSalt()
        const encryptedPassword = await bcryptjs.hash(password, salt)
        const newPlayer = await Player.create({
            firstName,
            lastName,
            email,
            password: encryptedPassword
        })
        const savedPlayer = await newPlayer.save()
        res.status(201).json(savedPlayer)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        
        const player = await Player.findOne({
          email: email
        })
        
        if (!player) return res.status(400).json({msg: 'invalid email/password'})
        
        const isPasswordValid = await bcryptjs.compare(password, player.password)
        
        if (isPasswordValid) {
            const token = jwt.sign({ id: player._id }, process.env.JWT_SECRET)
            player.password = '***'
            res.status(200).json({token, player})
        } else {
            res.status(400).json({msg: 'invalid credentials'})
        }
    } catch (error) {
        res.status(500).json({ error: err.message })
    }
}
