const express = require("express");
const router = express.Router();

var app = express();

app.use('/', router);

router.get("/users/:id/all-prescriptions", function (req, res) {
    db.Schedule.findAll({
        where: {
          user_id: req.params.id
        },
        include: [{
          model: db.User,
          include: [{
            model:db.Schedule
          }]
        }
      }).then(function(dbRXSched) {
        res.json(dbRXSched);
      });
      
    res.render("index");    
});

router.get("/users/:id/all-prescriptions", function (req, res) {
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        console.log('in get');
        console.log(res.body);
    });
    res.render("searches");    
});

// post route to get data entered in the user form

router.post('/user-login',(req, res) =>{
    var user = {
        username: req.body.username,
        password: req.body.password
    };
    res.json(user);
    // possibly call a function to check authentication
});


      // }).then(function(dbRXSched) {
      //   res.json(dbRXSched);

      // });
      // db.RX.findAll({
      //   where: {
      //     user_id: req.params.id
      //   }
      // }).then(function(dbRX) {
      //   res.json(dbRX);
      // });
          res.json(resObj)
          res.render("searches", {
              RXTotal: resObj
        });
    //   });
    // });


router.post('/new-user',(req,res) => {
    var user = {
        userName : req.body.userName,
        address : req.body.address,
        email: req.body.email,
        age: req.body.age
    }
    res.json(user);
    // call sequelize function to add the new user     
});

router.post('/new-prescription/:id' ,(req,res) => {
    var userID = req.params.id;
    
    var newPrescription = {
        prescriptionName : req.body.prescriptionName,
        prescriptionDetails : req.body.prescriptionDetails,
        prescriptionPower: req.body.prescriptionPower,
        prescriptionUnit: req.body.prescriptionUnit,
        prescriptionFrequencyUnit: req.body.prescriptionFrequencyUnit,
        prescriptionFrequency: req.body.prescriptionFrequency,
        comments: req.body.comments
    }
        res.json(newPrescription);
    // call sequelize to add the new user - send userID     
});


  });
});
