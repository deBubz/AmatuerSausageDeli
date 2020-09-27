/* 
    Dog Dates Controller
*/
const DogDate = require('../models/dogDate.model');
const User = require('../models/user.model');
const Dog = require('../models/dog.model');
const { merge, use } = require('../routes/dogDate');

// Creates a new date
exports.createDate = (req, res) => {
    let dogDate = new DogDate(req.body);
    dogDate.save()
        .then(dogDate => {
            return res.status(200).json({dogDate});    
    })
    .catch(err => {
        return res.status(400).json({ 'error': err });    
    });
}

// Updates the date of and the location of an existing date
exports.updateDate = async(req, res) => {
    let updatedDate = await DogDate.findOneAndUpdate({
        _id: req.params.id
    }, {
        status: "Requested",
        dateOn: req.body.dateOn,
        location: req.body.location,
    }, {new: true})
    console.log(updatedDate);
    if(!updatedDate)
        return res.status(400).json({ 'error': 'Could not find dog date with that ID'});
    else {
        return res.status(200).json({ 
            'message': 'Dog Date has been updated',
            'Updated Date': updatedDate 
        });
    }
}

// It works dude
exports.viewAllUsersDates = async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) 
        return res.status(400).json({
            'Error': "Could not find dogs"
        });
    else {
        let userDogs = user.dogs;
        let userDogDates = []
        for (let i = 0; i < userDogs.length; ++i) {
            let receivedDates = await DogDate.find({
                "receiverDogID": userDogs[i]
            })
            let sentDates = await DogDate.find({
                "senderDogID": userDogs[i]
            })
            if ((await receivedDates).length != 0)
                userDogDates.push(receivedDates)
            if ((await sentDates).length != 0)
                userDogDates.push(sentDates)
        }
        let mergedArray = [].concat.apply([],userDogDates);
        const requested = mergedArray.filter(dogDate => {
            return dogDate.status === 'Requested';
        })
        let requestedArray = [];
        for (let i = 0; i < userDogs.length; ++i) {
            for (let j = 0; j < requested.length; ++j) {
                if (requested[j].receiverDogID.toString() === userDogs[i].toString())
                    requestedArray.push(requested[j])
            }
        }
        const upcoming = mergedArray.filter(dogDate => {
            return dogDate.status === 'Upcoming';
        })
        const completed = mergedArray.filter(dogDate => {
            return dogDate.status === 'Completed';
        })
        return res.status(200).json({
            'Message': 'Successful',
            'requested': requestedArray,
            'upcoming': upcoming,
            'completed': completed,
        })
    }
}    

exports.alternateAllUsersDates = async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) 
        return res.status(400).json({
            'Error': "Could not find dogs"
        });
    else {
        let userDogs = user.dogs;
        let userDogDates = []
        for (let i = 0; i < userDogs.length; ++i) {
            let receivedDates = await DogDate.find({"receiverDogID": userDogs[i] })
            let recDog = await Dog.findById(userDogs[i])
            let sentDates = await DogDate.find({ "senderDogID": userDogs[i] })
            let senDog = await Dog.findById(userDogs[i])
            if ((await recDog).length != 0 && (await receivedDates).length != 0) {
                let receiver = {
                    receiverDogID: userDogs[i],
                    name: recDog.Name
                }
                let combinedReceive = {
                    ...receivedDates,
                    ...receiver
                }
                userDogDates.push(combinedReceive)
            }
            if ((await senDog).length != 0 && (await sentDates).length != 0) {
                let sender = {
                    senderDogID: userDogs[i],
                    name: senDog.Name
                }
                let combinedSender = {
                    ...sentDates,
                    ...sender
                }
                userDogDates.push(combinedSender)
            }
        }
        let mergedArray = [].concat.apply([],userDogDates);
        return res.status(200).json({
            'Message': 'Successful',
            'Merged': mergedArray,
        })
        
        
        
        
        
        // const requested = mergedArray.filter(dogDate => {
        //     return dogDate.status === 'Requested';
        // })
        // let requestedArray = [];
        // for (let i = 0; i < userDogs.length; ++i) {
        //     for (let j = 0; j < requested.length; ++j) {
        //         if (requested[j].receiverDogID.toString() === userDogs[i].toString())
        //             requestedArray.push(requested[j])
        //     }
        // }
        // const upcoming = mergedArray.filter(dogDate => {
        //     return dogDate.status === 'Upcoming';
        // })
        // const completed = mergedArray.filter(dogDate => {
        //     return dogDate.status === 'Completed';
        // })
        // return res.status(200).json({
        //     'Message': 'Successful',
        //     'requested': requestedArray,
        //     'upcoming': upcoming,
        //     'completed': completed,
        // })
    }
}    

// Accepts a requested date 
exports.acceptDate = (req, res) => {
    DogDate.findById(req.params.id, function(err, dogDate) {
        if(!dogDate) {  // not found
            return res.status(400).json({ 'error': 'Could not find dog date with that ID'});
        }
        dogDate.status = "Upcoming";
        dogDate.save()
            .then(dogDate => {
                return res.status(200).json({ 
                    'message': 'Dog Date has been accepted',
                });
            })
            .catch(err => {
                return res.status(400).send({ 
                    'error': 'Could not accept the dog date',
                    'err': err 
                });
            });
    });
}

// Declines a requested date and deletes a created date
exports.declineDate = (req, res) => {
    DogDate.findById(req.params.id, function(err, dogDate) {
        if(!dogDate) {
            return res.status(400).json({ 
                'error': 'Could not find dog date with that ID',
            });
        } 
        dogDate.deleteOne()
            .then(dogDate =>{
                return res.status(200).json({ 
                    'message': 'Dog Date request has been declined',
                });
            }).catch(err => {
                return res.status(400).json({ 'error': 'Could not decline the dog date' });
            });
    });
}

/* 
- the decline date currently only deletes the date
- doesnt notify the inviter
*/
