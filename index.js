import express from 'express' 
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import playerRoutes from './routes/players.js'
import gdcRoutes from './routes/gdcs.js'
import categoryRoutes from './routes/categories.js'
import gameRoutes from './routes/games.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())

app.use('/auth', authRoutes)
app.use('/players', playerRoutes)
app.use('/gdcs', gdcRoutes)
app.use('/gdcs/:gdcId/categories', categoryRoutes)
app.use('/categories/:categoryId/games/', gameRoutes)

const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
  dbName: 'gamer_identification'
})
.then(() => app.listen(PORT, () => console.log('Server listening on ${PORT}')))
.catch((error) => console.log('${error} did not connect'))
