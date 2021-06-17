const moogoose = require('mongoose');
const {ObjectId} = moogoose.Schema.Types

const postSchema = new moogoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required:true
    },
    photo: {
        type: String,
        required:true
    },
    likes:[{type:ObjectId, ref:"User"}],
    comments:[{
        text:String,
        postedBy:{type:ObjectId, ref:"User"}
    }],
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
})

moogoose.model("Post", postSchema)