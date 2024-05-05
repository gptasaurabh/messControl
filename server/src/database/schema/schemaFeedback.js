
const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        ref: 'studentSchema',
        // required: true
    },
    rating: {
        type: Array,
        of: mongoose.Types.ObjectId
    },
    date: {
        type: Date,
        // required: true
    }
})

const FeedbackSchema = mongoose.model('feedbackSchema', feedbackSchema)

module.exports = FeedbackSchema