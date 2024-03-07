const { Schema, model, SchemaType } = require('mongoose');

const UserSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    thought: [ {
        type: SchemaType.objectID,
        ref: 'Thought'
    }
],
friend: [ 
    { 
        type: SchemaType.objectID,
        ref: 'User'
    },
],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

UserSchema.virtual('friendCount').get(function () {
    return this.friend.length;
});
const User = model('User', UserSchema);
module.exports = User;