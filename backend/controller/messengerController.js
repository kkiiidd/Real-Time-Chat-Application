const getFriends = async (req, res) => {
    const myId = req.id;
    console.log('myId', myId);
    const userSchema = require('../models/authModel');
    try {
        const friends = await userSchema.find({});
        const filteredFriends = friends.filter(frd => frd.id !== myId);
        // console.log('filteredFriends', filteredFriends)
        res.status(200).json({
            successMessage: 'successfully get friends',
            friends: filteredFriends
        })
    } catch (error) {
        res.status(500).json({
            error: {
                errorMessage: ['Interval Server Error']
            }
        })
    }
}

module.exports.getFriends = getFriends;