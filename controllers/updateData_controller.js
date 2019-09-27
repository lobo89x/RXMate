const express = require("express");
const router = express.Router();
var db = require("../models");
var email = require('../utils/email');
var mailOptions = require('../utils/mailOptions');


router.put("/api/updateRx/:userId", function (req, res) {
    //update the values
    db.User.update(req.body,
        {
            where:{ 
                 id: req.params.userId
            }
        }).then((obj) => {
            console.log('userObj :', obj);
            // Find email
            db.User.findOne({
                where: {
                    id: req.params.userId
                }
            }).then((userObj) => {
                //call send email
                //sendEmail(userObj.email);
                console.log('email: ', userObj.email);
                
                mailOptions.to = userObj.email;
                mailOptions.subject = 'RxMate - User information updated';
                mailOptions.text = 'Dear '+userObj.username+ ', your information was updated'
                
                email.sendEmail(mailOptions);
                res.json(userObj);
            })
        });
        
});

router.put("/api/updateRx/:userId/:id", function (req, res) {
    //update the values
    db.Prescription.update(req.body,
        {
            where:{ 
                 Id: req.params.id
            }
        }).then((obj) => {
            console.log('userObj :', obj);
            // Find email
            db.User.findOne({
                where: {
                    id: req.params.userId
                }
            }).then((userObj) => {
                //call send email
                //sendEmail(userObj.email);
                console.log('email: ', userObj.email);
                
                mailOptions.to = userObj.email;
                mailOptions.subject = 'Sending Email using Node.js';
                mailOptions.text = 'text';
                
                email.sendEmail(mailOptions);
                res.json(userObj);
            })
        });
        
});

router.pos

module.exports = router;
