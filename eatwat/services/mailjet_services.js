require('dotenv').config()

module.exports = {
    sendAccountCreated: (req,res) => {
        const mailjet = require ('node-mailjet')
            .connect(`${process.env.MAILJET_APIKEY}`, `${process.env.MAILJET_SECRET}`)
        const request = mailjet
            .post("send", {'version': 'v3.1'})
            .request({
            "Messages":[
                {
                "From": {
                    "Email": "lingy93@gmail.com",
                    "Name": "Eatwat Team"
                },
                "To": [
                    {
                    "Email": req.body.email,
                    "Name": req.body.user
                    }
                ],
                "TemplateID": 2964906,
                "TemplateLanguage": true,
				"Subject": "nil",
				"Variables": {
                "name": req.body.user,
                "link": ''
                }
            }]
            })
            request
            .then((result) => {
                console.log(result.body)
            })
            .catch((err) => {
                console.log(err.statusCode)
            })
    },
    sendResetEmail: (req,res,user) => {
        console.log(user)
        const mailjet = require ('node-mailjet')
            .connect(`${process.env.MAILJET_APIKEY}`, `${process.env.MAILJET_SECRET}`)
        const request = mailjet
            .post("send", {'version': 'v3.1'})
            .request({
            "Messages":[
                {
                "From": {
                    "Email": "lingy93@gmail.com",
                    "Name": "Eatwat Team"
                },
                "To": [
                    {
                    "Email": req.body.email,
                    "Name": user.user
                    }
                ],
                "TemplateID": 2965065,
                "TemplateLanguage": true,
				"Subject": "nil",
				"Variables": {
                "name": req.user.user,
                "link": ''
                }
            }]
            })
            request
            .then((result) => {
                console.log(result.body)
            })
            .catch((err) => {
                console.log(err.statusCode)
            })
    }
}