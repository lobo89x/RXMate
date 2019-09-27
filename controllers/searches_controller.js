const express = require("express");
const router = express.Router();

var db = require("../models"); 
var Cookies = require("js-cookie");
var email = require('../utils/email');
var mailOptions = require('../utils/mailOptions');

router.get("/users/:id/all-prescriptions", function (req, res) {
  console.log("=====================");
  console.log("all-prescriptions");

  db.User.findAll({
    where: {
      id: req.params.id
    },
    include: [db.Prescription]
  }).then(users => {  
    //res.json(users);
    //console.log(users);
    var RXObj = users[0].Prescriptions;
    var SchedObj = users[0].Schedules;
    var RXSchObj = [];
    console.log(RXObj[0].name);
    //console.log(SchedObj);
    for (var i = 0; i < RXObj.length; i++) {
    //   for (var j = 0; j < SchedObj.length; j++) {
    //       if (RXObj[i].id===SchedObj[j].PrescriptionId){
              var a ={
                name: RXObj[i].name,
                frequencyUnit: RXObj[i].frequencyUnit,
                frequency: RXObj[i].frequency,
                comments: RXObj[i].comments
              }
              console.log(a);
              RXSchObj.push(a);
    //       }
    //   }
    }
    console.log(RXSchObj);
    res.render("searches", { RXCard: RXSchObj });

  });

});


router.get("/search/:id", function (req, res) {
  console.log("=====================");
  console.log(":id");
  
  db.Schedule.findAll({
      where: {
          UserId: req.params.id
      }
  }).then(function(dbRXSched) {
    res.json(dbRXSched);
  });
});

// router.get("/:id", function (req, res) {
//   console.log("=====================");
//   console.log(":id");

//   db.Schedule.findAll({
//       where: {
//           UserId: req.params.id
//       }
//   }).then(function(dbRXSched) {
//     res.json(dbRXSched);
//   });
// });

router.get("/search", function (req, res) {
  console.log("=====================");
  console.log("grabbing User List");
  db.User.findAll().then(function(UserList) {
    //res.json(UserList);
    console.log(JSON.stringify(UserList));
    res.render("searches", { Users: UserList });
  });
});
  
// route to create a new user
router.post("/api/newUser", function (req, res) {


  console.log("=====================");
  console.log("newUser");

  console.log(JSON.stringify(req.body));
  // req.body.append({UerID: 1});

  // db.Prescription.create(req.body).then(function(newRX) {
  //   res.json(newRX);
  // });

  db.User.create(req.body).then(function (newUser) {
    // Find email
    db.User.findOne({
      where: {
          id: newUser.id
      }
      }).then((userObj) => {
      console.log('email: ', userObj.email);
      
      mailOptions.to = userObj.email;
      mailOptions.subject = 'RxMate - A new user account is created';
      mailOptions.text = 'Welcome to RxMate!\n\n Your user accout '+newUser.username+ ' is ready to use.'
      
      email.sendEmail(mailOptions);

    });
    res.json(newUser);
  });
});

// route to create a new prescription and  schedule
router.post("/api/newPrescription", function (req, res) {
  var responseObject = {};
  console.log("=====================");
  console.log("newPrescription"); 
 
  console.log("req.body 124", req.body);
  console.log("strigify req.body 125", JSON.stringify(req.body));
  console.log("req.body.prescription 126", req.body.prescription);
  console.log("this is our new rx  "+req.body[1])

  db.Prescription.create(req.body).then(function (newRx) {
    responseObject.prescription = newRx;
    // console.log("=====================");
    // console.log("NewSchedule");
    // console.log(JSON.stringify(req.body.schedule));

    // db.Schedule.create(req.body.schedule).then(function (newSched) {
    //   responseObject.schedule = newSched;
    //   //console.log('newRx',newRx);
    //   //email 
    //   // Find email
    db.User.findOne({
      where: {
          id: newRx.UserId
      }
      }).then((userObj) => {
      console.log('email: ', userObj.email);
      
      mailOptions.to = userObj.email;
      mailOptions.subject = 'RxMate - A new prescription schedule is created';
      mailOptions.text = 'Dear '+userObj.username+ ', your new prescription schedule is created.'
      
      email.sendEmail(mailOptions);

    });
      
    //   res.json(responseObject);
    // });
  });
});

// route for new schedule (-- redundant)
router.post("/api/newSchedule", function (req, res) {

  console.log("=====================");
  console.log("NewSchedule");
  console.log(req.body);
    db.Prescription.findOne({
      where: {
        name: req.body.name
      }
      }).then((newRXObj) => {
      //console.log('email: ', userObj.email);
      console.log("this is the ouptu of the get get"+json(newRXObj));
      var schedReq = {
                frequency: req.body.frequency,
                frequencyUnit: req.body.frequencyUnit,
                comments: req.body.comments,
                UserId: req.body.UserId,
                prescriptionid: newRXObj.id
                
      }
      
        db.Schedule.create(schedReq).then(function (newSched) {
          res.json(newSched);
        });


    });
});

router.get("/", function (req, res) {

  console.log("=====================");
  console.log("Show Index");
  res.render("index");
});

router.get("/search", function (req, res) {

  console.log("=====================");
  console.log("Show search");
  res.render("searches");
});

router.get("/404", function(req, res) {

  console.log("=====================");
  console.log("Show 404");

  res.render("404");
});

module.exports = router;