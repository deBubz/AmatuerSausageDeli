const router = require('express').Router();


router.route('/').get((req, res) => {
    try {
        res.json({
            'hey': 'something worked'
        });
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
})


module.exports = router;