import mongoose from 'mongoose'

export const GameSchema = new mongoose.Schema(
    {
        gameName: { type: String, required: true, unique: true },
        gameType: { type: String, required: true },
        mode: { type: String, required: true },
        yrPlayed: { type: Number, required: true}
    },
    { timestamp: true }
)

const Game = mongoose.model('Game', GameSchema)
export default Game
