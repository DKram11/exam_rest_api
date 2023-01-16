import mongoose from 'mongoose'

const PlayerSchema = new mongoose.Schema(
    {
         firstName: { type: String, required: true },
         lastName: { type: String, required: true},
         email: { type: String, required: true, unique: true},
         password: { type: String, required: true}
    },
    { timestamps: true }
)

const Player = mongoose.model('Player', PlayerSchema)
export default Player