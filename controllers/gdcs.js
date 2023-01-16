import Gdc from '../models/Gdc.js'

// Game Developer Company (Gdc)

export const getGdcs = async (req, res) => {
    try {
        const gdcs = await Gdc.find()
        if (gdcs.length !==0)
            res.status(200).json(gdcs)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getGdc = async (req, res) => {
    try {
        const { id } = req.params
        const gdc = await Gdc.findById(id)
        if (gdc)
            res.status(200).json(gdc)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const addGdc = async (req, res) => {
    try {
        const { gdcName, yrFounded } = req.body
        const newGdc = await Gdc.create({
          gdcName,
          yrFounded
        })
        const savedGdc = await newGdc.save()
        res.status(201).json({ id: savedGdc._id})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteGdc = async (req, res) => {
    try {
        await Gdc.deleteOne({_id: req.params.id })
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

export const updateGdc = async (req, res) => {
    try {
        const filter = { _id: req.params.id }
        const { gdcName, yrFounded } = req.body
        const update = {
            gdcName: gdcName,
            yrFounded: yrFounded
        }
      
        await Gdc.findOneAndUpdate(filter, update)
        res.status(204).send()
    } catch (err) {
      console.log(err)
      res.status(404).json({ error: err.message })
    }
}
