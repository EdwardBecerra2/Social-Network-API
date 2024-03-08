const { Schema, model } = require('mongoose');

const UserSchema = new Schema({

    username: {
        type: String,
        unique: true,
         required: true,
         trim: true
       
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]  //regex for email validation
    },
    thought: [ {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }
],
friend: [ 
    { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
],
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,
}
);

UserSchema.virtual('friendCount').get(function () {
    return this.friend.length;
});
const User = model('User', UserSchema);

module.exports = User;