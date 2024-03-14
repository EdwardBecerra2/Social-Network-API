const req = require("express/lib/request");
const { Thought, User } = require("../models");

    const userController = {
        getAllUsers(req, res) {
            User.find().then((users) => res.json(users)).catch((error) => res.status(500).json(error));
    
        },
        createUser(req, res) {
            User.create(req.body).then((socialnetworkdb) => res.json(socialnetworkdb)).catch((error) => res.status(500).json(error));
        },


    updateUser(req, res) {
        User.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, {
            runValidators: true,
            new: true
        }).then((user) => {
            !user ? res.status(404).json({ message: 'No user found :(' }) : res.json(user);

        }).catch((error) => res.status(500).json(error));


    },


    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id }).then((user) => !user ? res.status(404).json({ message: 'No user found with that ID' }) : Thought.deleteMany({
            _id: {
                $in: user.thoughts
            }
        })).then(() => res.json({ message: 'User and apps deleted!' })).catch((error) => res.status(500).json(error));
    },
    getUserById(req, res) {
        User.findOne({ _id: req.params.id }).then((user) => !user ? res.status(404).json({ message: 'No user found with that ID' }) : res.json(user)).catch((error) => res.status(500).json(error));
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $addToSet: { friends: params.friendId } },
          { new: true, runValidators: true }
        )
          .then((socialnetworkdb) => {
            if (!socialnetworkdb) {
              res.status(404).json({ message: 'No friend found with this id :(' });
              return;
            }
            res.json(socialnetworkdb);
          })
          .catch((error) => res.json(error));
      },

      removeFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { friends: params.friendId } },
          { new: true }
        )
          .then((socialnetworkdb) => {
            if (!socialnetworkdb) {
              return res.status(404).json({ message: 'No friend found with this id :(' });
            }
            res.json(socialnetworkdb);
          })
          .catch((err) => res.json(err));
      },
    };

module.exports = userController;