import mongoose from 'mongoose'

const chatMateSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received:Boolean
});

export default mongoose.model('messagecontent', chatMateSchema);