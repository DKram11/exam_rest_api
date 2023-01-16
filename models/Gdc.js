import mongoose from 'mongoose'

//Game Developer Company (Gdc)

const GdcSchema = new mongoose.Schema(
    {
        gdcName: { type: String, required: true, unique: true },
        yrFounded: { type: Number, required: true}
    },
    { timestamps: true }
)

const Gdc = mongoose.model('Gdc', GdcSchema)
export default Gdc
