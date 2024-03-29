const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(socialnetworkdb => res.json(socialnetworkdb))
        .catch(error => {
            console.log(error);
            res.sendStatus(400);
        });
    },

    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(socialnetworkdb => res.json(socialnetworkdb))
        .catch(err => {
            console.log(error);
            res.sendStatus(400);
        });
    },

      createThought({ body }, res) {
        Thought.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then((socialnetworkdb) => {
            if (!socialnetworkdb) {
              return res
                .status(404)
                .json({ message: 'Thought created but no user found with this id!' });
            }
    
            res.json({ message: "Thought successfully created!" });
          })
          .catch((error) => res.json(error));
      },

      updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {
          new: true,
          runValidators: true,
        })
          .then((socialnetworkdb) => {
            if (!socialnetworkdb) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(socialnetworkdb);
          })
          .catch((error) => res.json(error));
      },
    

    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.id})
        .then((thought) => {
            if(!thought){
                res.status(404).json({message: 'No thought with that ID'}) 
            }    

            
            return User.findOneAndUpdate(
                {thoughts: params.id},
                {$pull:{thoughts:thought._id}},
                {new:true}
            );
       }).then((socialnetworkdb) => {
            if(!socialnetworkdb){
               return res.status(404).json({message: 'No user with that ID'})
            }
            res.json({message: "Thought Deleted!!"});
        })
        .catch((error) => res.json(error));
    },
   

    addReaction(req, res) {
        console.log('You are adding a reaction');
        console.log(req.body);
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body} },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No friend found with that ID ' })
              : res.json(thought)
          )
          .catch((error) => res.status(500).json(error));
      },

      deleteReaction(req, res) {
        console.log(req.params)
      
          Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId} } },
            { runValidators: true, new: true }
          )
            .then((thought) =>
              !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought found with that ID' })
                : res.json(thought)
            )
            .catch((error) => res.status(500).json(error));
        },
};

module.exports = thoughtController;