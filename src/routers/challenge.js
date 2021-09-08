const express = require('express')
const Challenge = require('../models/challenge')
const User = require('../models/user')
const router = new express.Router()
const fetch = require('node-fetch')


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.post('/create', async (req, res) => {
    const challenge = req.body
    console.log(challenge)
    try {
        const r = await Challenge.create(challenge)
        res.json(r)
    } catch (e) {
        res.json(e)
    }
})


router.get('/challenges', async (req, res) => {
    try {
        const challenges = await Challenge.find({})
        res.json(challenges)
    } catch (e) {
        res.send(e)
    }

})


router.get('/challenges/:id', async (req, res) => {
    const id = req.params.id
    try {
        const challenge = await Challenge.findById(id)
        res.json(challenge)
    } catch (e) {
        res.send(e)
    }

})



router.post('/submit', async (req, res) => {
    const submission = req.body.submission
    const challenge_id = req.body.id
    const challenge_name = req.body.title
    const token = req.cookies.token


    try {
        const user = await getUser(token)
        const prevSubmissions = await User.findOne({ discord_id: user.id, submissions: {'$elemMatch': {challenge_id}} })

        console.log(prevSubmissions)
        if (prevSubmissions == null) {
            await User.updateOne({discord_id: user.id}, {'$push': { submissions: {challenge_id, challenge_name,submission} }})
        } else {
            console.log(submission)
            await User.updateOne({discord_id: user.id, "submissions.challenge_id":challenge_id}, { '$set': {
                "submissions.$.submission": submission
            }})
        }

        res.json({})
    } catch (e) {
        res.json(e)
    }
})



const getUser = async (token) => {
	const r = await fetch('https://discord.com/api/users/@me', {
		headers: {
			authorization: `Bearer ${token}`,
		},
	});

	const user = await r.json()
	return user
}


module.exports = router