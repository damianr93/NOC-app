import mongoose from "mongoose";

const logSchema = new mongoose.Schema({

    level: {
        type:String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    message: {
        type:String,
        require: true
    },
    origin: {
        type:String
    },
    createAt: {
        type:Date,
        default: new Date()
    },


})


export const LogModel = mongoose.model('Log', logSchema)
