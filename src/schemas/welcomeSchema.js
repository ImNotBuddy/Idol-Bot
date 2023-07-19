const { model, Schema } = require("mongoose");

const welcomeSchema = new Schema({
    guildID: {
        type: String,
        default: null,
        required: true
    },
    channelID: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    color: {
        type: String
    },
    image: {
        type: String
    }
});

module.exports = model("welcomeSchema", welcomeSchema, "welcomeMessages");