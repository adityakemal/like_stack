const express = require('express')
const router = express.Router();
const models = require('../models')

const dbUser = models.User
const dbQuest = models.Quest
const dbAnswer = models.Answer

//login
router.post('/login', (req, res) => {
  dbUser.findOne({
    where: {
      username: req.body.username
    }
  }).then((data) => {
    if (data != null) {
      if (data.password === req.body.password) {
        req.session.user = data.username
        res.redirect('/home')
      } else {
        req.flash('info', 'Maaf, Anda tidak dapat mengakses halaman yang Anda tuju!');
        res.redirect('/')
      }
    } else {
      console.log('data kosong');
      res.redirect('/')
    }
    console.log(data);
  })
})

// daftar
router.post('/register', (req, res) => {
  dbUser.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }).then((user) => {
    console.log(user);
    req.session.user = data.username

    res.redirect('/home')
  }).catch((err) => {
    console.log(err);
  })
  // console.log(req.body.username);
})

router.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/home')
  }
  res.render('index')
})

//home
router.get('/home', (req, res) => {
  if (req.session.user) {

    dbQuest.findAll({
      include: [
        {
          model: dbUser,
        },
        {
          model: dbAnswer,
          include: [{
            model: dbUser
          }]
        }
      ],
    }).then((allquest) => {
      var myData = []
      for (data of allquest) {
        if (data.User.username == req.session.user) {
          myData.push(data)
        }
      }
      console.log('myyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy', myData);
      res.render('home', {
        data: allquest,
        dataMe: myData,
        myname: req.session.user,
      })
      // res.send(allquest)
    }).catch((err) => {
      console.log(err);
    })

  } else {
    res.redirect('/')
  }
})

// logout
router.post('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

// quest
router.post('/quest', (req, res) => {
  dbUser.findOne({
    where: {
      username: req.session.user
    }
  }).then((user) => {
    dbQuest.create({
      userId: user.id,
      question: req.body.question
    }).then((q) => {
      console.log('sukses :', q);
      res.redirect('/home')
      res.end()
    }).catch((err) => {
      console.log(err);
    })
  }).catch((err) => {
    console.log(err);
  })
})


router.post('/delete/:id', (req, res) => {
  dbQuest.destroy({
    where: {
      id: req.params.id
    }
  }).then((succes) => {
    res.redirect('/home')
    console.log(succes);
  }).catch((err) => {
    console.log(err);
  })
})

router.get('/qna', (req, res) => {
  dbQuest.findAll({
    include: [{
      model: dbUser
    }, {
      model: dbAnswer
    }],
  }).then((data) => {
    res.send(data)
  })
})

// jawab
router.post('/answer/:questId', (req, res) => {
  // console.log(req.body.answer);
  // res.end()
  dbUser.findOne({
    where: {
      username: req.session.user
    }
  }).then((dataUser) => {
    dbAnswer.create({
      answer: req.body.answer,
      questId: req.params.questId,
      userId: dataUser.id,
    }).then((data) => {
      console.log('created', data);
      res.redirect('/home')
    })
  }).catch((err) => {
    console.log(err);
  })



})





router.get('*', function(req, res, next) {
  res.status(404).send('404');
});

//
router.post('*', function(req, res, next) {
  res.status(404).send('404');
});

module.exports = router
