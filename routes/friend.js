const router = require('express').Router();
let Friend = require('../models/friend.model');

router.route('/').get((req, res) => {
  Friend.find()
    .then(friends => res.json(friends))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const user_email = req.body.user_email;
  const name = req.body.name;
  const level = req.body.level;
  const last_contacted = req.body.last_contacted;

  const newFriend = new Friend({ user_email, name, level, last_contacted });

  newFriend.save()
    .then(() => res.json('Friend added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// route to get by id
router.route('/:id').get((req, res) => {
  Friend.findById(req.params.id)
    .then(friend => res.json(friend))
    .catch(err => res.status(400).json('Error: ' + err));
});

// route to delete by id
router.route('/:id').delete((req, res) => {
  Friend.findByIdAndDelete(req.params.id)
    .then(() => res.json('Friend deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// route to update by id
router.route('/update/:id').post((req, res) => {
  Friend.findById(req.params.id)
    .then(friend => {
      friend.user_email = req.body.user_email;
      friend.name = req.body.name;
      friend.level = req.body.level;
      friend.last_contacted = req.body.last_contacted;

      friend.save()
        .then(() => res.json('Friend updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;