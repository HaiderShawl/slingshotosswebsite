const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const fetch = require('node-fetch')



router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



router.get('/redirect', async ({ query }, res) => {
	const { code } = query;

	if (code) {
		try {
			const token = await getToken(code)
			res.cookie('token', token)

            // res.redirect(`http://localhost:3000/userpage`)            
            res.redirect(`https://slingshotoss.herokuapp.com/userpage`)

		} catch (error) {
			// NOTE: An unauthorized token will not throw an error;
			// it will return a 401 Unauthorized response in the try block above
			console.error(error);
		}
	}
});

router.post('/getUser', async (req, res) => {
	const token = req.body.token 
	const user = await getUser(token)
	let account = await User.findOne( {discord_id:user.id} )

	if (account == null) {
		account = await User.create({
			name: user.username,
			email: user.email,
			discord_id: user.id,
			submissions: []
		})
	}

	res.json({account})


	console.log(req.body.token)

})




const getToken = async (code) => {
	const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		body: new URLSearchParams({
			client_id: process.env.CLIENT_ID || '884129859373269073',
			client_secret: process.env.CLIENT_SECRET || 'Rq9phDm_1zTuTmV0JRkBMoKmYT0GnYS9',
			code,
			grant_type: 'authorization_code',
			// redirect_uri: `http://localhost:5000/redirect`,
			redirect_uri: 'https://slingshotoss.herokuapp.com/redirect',
			scope: 'identify',
		}),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	const oauthData = await oauthResult.json();

	return oauthData.access_token	
}


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