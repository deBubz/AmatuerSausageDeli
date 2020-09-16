/* 
    dog dates controller
*/
const DogDate = require('../models/dogDate.model');

// GET - all dates 
// from everyone? not all date 1 user/ dog have?
exports.getDates = (req, res) => {
	DogDate.find()
        .then(dogDate => res.status(200).json(dogDate))
        .catch(err => res.status(400).json({ 'error': err }));
};

// create a new date
exports.createDate = (req, res) => {
    let dogDate = new DogDate(req.body);
    dogDate.save()
        .then(dogDate => {
            return res.status(200).json({
                'msg': 'Date added successfully',
                'date': dogDate,    
            });    
    })
    .catch(err => {
        return res.status(400).json({ 'error': err });    
    });
}

// accept date
exports.acceptDate = (req, res) => {
    DogDate.findById(req.params.id, function(err, dogDate) {
        if(!dogDate) {  // not found
            return res.status(400).json({ 'error': 'Could not find dog date with that ID'});
        }
        
        dogDate.status = "Upcoming";
        dogDate.save()
            .then(dogDate => {
                return res.status(200).json({ 'error': 'Dog Date has been accepted' });
            })
            .catch(err => {
                return res.status(400).send({ 'error': 'Could not accep the dog date' });
            });
    });
}

// decline date // delete date
exports.declineDate = (req, res) => {
    DogDate.findById(req.params.id, function(err, dogDate) {
        if(!dogDate) {
            return res.status(400).json({ 'error': 'Could not find dog date with that ID'});
        } 

        dogDate.deleteOne()
            .then(dogDate =>{
                return res.status(200).json({ 'msg': 'Dog Date request has been declined' });
            }).catch(err => {
                return res.status(400).json({ 'error': 'Could not decline the dog date' });
            });
    });
}

/* 
- the decline date currently only deletes the date
- doesnt notify the inviter
*/
