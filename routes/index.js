var express = require('express');
var router = express.Router();
var request = require('request');
var mongodb = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/NCAATeamsDB', { useNewUrlParser: true });

var TeamsSchema = mongoose.Schema({
    name: String,
    rankingSpot: Number,
    avatarUrl: String         //make sure this portion works with returning the images
});

var Teams = mongoose.model('Teams', TeamsSchema);
var connection = mongoose.createConnection('mongodb://localhost:27017')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected');
    Teams.find(function(err, teamsList) {
        if(err) console.error(err);
        else {
            if(teamsList.length == 0) {
                console.log("size is 0");
                NCAAFTeamRankings.forEach(function(item) {
                    let newTeam = new Teams(item);
                    newTeam.save(function(err, post) {
                        if(err) console.error(err); return;
                    });
                });
            }
        }
    });
});

/* Get route */

router.get('/', function(req, res) {
    res.sendFile('homepage.html', { root: 'public' });
});

router.get('/NCAATeamsGet', function(req, res) {
    console.log("In NCAATeams get route");
    Teams.find(function(err, teamList) {
        if(err) console.error(err);
        else {
            teamList.sort(function(a, b) {
                return a.rankingSpot - b.rankingSpot;
            });
            res.json(teamList);
        }
    });
});

router.delete('/NCAATeamsDelete', function(req, res) {
    console.log("In NCAATeam delete route");
    var ranking = parseInt(req.query.q, 10);
    
    
    Teams.remove({rankingSpot: ranking}, function(err) {
        if(err) console.log(err);
        else {
            res.sendStatus(200);
        }
    });
});

router.post('/NCAATeamsPost', function(req, res) {
    console.log("In NCAATeam post route");
    console.log(req.body);
    let newTeam = new Teams(req.body);
    newTeam.save(function(err, post) {
        if(err) console.error(err);
        else {
            res.sendStatus(200); 
        }
    });
});

module.exports = router;

/* Array of NCAAF teams and their rankings */

var NCAAFTeamRankings = [{
        name: "Alabama",
        rankingSpot: "1",
        avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Alabama_Crimson_Tide_logo.svg/375px-Alabama_Crimson_Tide_logo.svg.png"
    },
    {
        name: "Clemson",
        rankingSpot: "2",
        avatarUrl: "http://content.sportslogos.net/logos/30/643/full/9528_clemson_tigers-primary-1965.png"
    },
    {
        name: "Notre Dame",
        rankingSpot: "3",
        avatarUrl: "https://bloximages.newyork1.vip.townnews.com/oanow.com/content/tncms/assets/v3/editorial/e/0b/e0b7d0f2-69b0-11e7-80c4-a762d4a37a5c/596a9dbcade72.image.jpg"
    },
    {
        name: "Michigan",
        rankingSpot: "4",
        avatarUrl: "http://larrybrownsports.com/wp-content/uploads/2018/02/michigan-logo.jpg"
    },
    {
        name: "Georgia",
        rankingSpot: "5",
        avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Georgia_Athletics_logo.svg/2000px-Georgia_Athletics_logo.svg.png"
    },
    {
        name: "Oklahoma",
        rankingSpot: "6",
        avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Oklahoma_Sooners_logo.svg/795px-Oklahoma_Sooners_logo.svg.png"
    },
    {
        name: "West Virginia",
        rankingSpot: "7",
        avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/West_Virginia_Mountaineers_logo.svg/2000px-West_Virginia_Mountaineers_logo.svg.png"
    },
    {
        name: "Ohio State",
        rankingSpot: "8",
        avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ohio_State_Buckeyes_logo.svg/2000px-Ohio_State_Buckeyes_logo.svg.png"
    },
    {
        name: "Louisana State University",
        rankingSpot: "9",
        avatarUrl: "https://i.pinimg.com/originals/06/fb/09/06fb09b432edcd014b5a5b201847af9d.png"
    },
    {
        name: "Washington State",
        rankingSpot: "10",
        avatarUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Washington_State_Cougars_logo.svg/1200px-Washington_State_Cougars_logo.svg.png"
    },
    {
        name: "University of Central Florida",
        rankingSpot: "11",
        avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/UCF_Knights_logo.svg/1200px-UCF_Knights_logo.svg.png"
    },
    {
        name: "Kentucky",
        rankingSpot: "12",
        avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Kentucky_Wildcats_logo.svg/1200px-Kentucky_Wildcats_logo.svg.png"
    },
    {
        name: "Syracuse",
        rankingSpot: "13",
        avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Syracuse_Orange_logo.svg/2000px-Syracuse_Orange_logo.svg.png"
    },
    {
        name: "North Carolina State",
        rankingSpot: "14",
        avatarUr: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/North_Carolina_State_University_Athletic_logo.svg/1200px-North_Carolina_State_University_Athletic_logo.svg.png"
    },
    {
        name: "Florida",
        rankingSpot: "15",
        avatarUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Florida_Gators_logo.svg/1200px-Florida_Gators_logo.svg.png"
    },
    {
        name: "Mississippi State",
        rankingSpot: "16",
        avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Mississippi_State_Bulldogs_logo.svg/1200px-Mississippi_State_Bulldogs_logo.svg.png"
    }
];
