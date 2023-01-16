import Category from "../models/Category.js"

export const getGames = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId)
        const { gameType, mode } = req.query
        
        if (gameType) {
            category.games = category.games.filter((item) => item.gameType == gameType)
        }
        if (mode) {
            category.games = category.games.filter((item) => item.mode == mode)
        }
        
        if (category.games.length !==0)
            res.status(200).json(category.games)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getGame = async (req,res) => {
    try {
        const {categoryId, id } = req.params
        const category = await Category.findById(categoryId)
        const game = category.games.id(id)
        if (game)
            res.status(200).json(game)
        else 
            res.status(204).json({ error: 'resource not found' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const addGame = async  (req, res) => {
    try {
        const newGame = req.body
        const category = await Category.findById(req.params.categoryId)
        category.games.push(newGame)
        await category.save()
        const idNewGame = category.games[category.games.length-1]._id
        res.status(201).json({ id: idNewGame})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteGame = async (req, res) => {
    try {
        const {categotyId, id } = req.params
        const category = await Category.findById(categoryId)
        category.games.id(id).remove();
        await category.save()
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

export const updateGame = async (req, res) => {
    try {
        const {categoryId, id } = req.params
        const category = await Category.findById(categoryId)
        
        const {gameName, gameType, mode, yrPlayed } = req.body
        category.games.id(id).gameName = gameName
        category.games.id(id).gameType = gameType
        category.games.id(id).mode = mode
        category.games.id(id).yrPlayed = yrPlayed
        
        await category.save()
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}
