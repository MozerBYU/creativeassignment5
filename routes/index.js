var express = require('express');
var router = express.Router();
var request = require('request');
var mongodb = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/NCAATeamsDB', { useNewUrlParser: true });

var TeamsSchema = mongoose.Schema({
    name: String,
    rankingSpot: Number,
    //avatarUrl:Image(75, 75)         //make sure this portion works with returning the images
});

var Teams = mongoose.model('Teams', TeamsSchema);
var connection = mongoose.createConnection('mongodb://localhost:27017')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected');
});

/* Get route */

router.get('/', function(req, res) {
    res.sendFile('homepage.html', { root: 'public' });
});

router.get('/NCAATeamsGet', function(req, res) {
    console.log("In NCAATeams get route");
    console.log(req.body);
    collection.find().toArray(function(err, result) {
        if (err) {
            console.log("Error in get route");
        }
        else if (result.length) {
            console.log("Query Worked");
            console.log(result);
            res.send(result);
        }
        else {
            console.log("No Data Found");
        }
    });
    res.send(teams);
});

router.delete('/NCAATeamsDelete', function(req, res) {
    console.log("In NCAATeam delete route");
    console.log(req.body);
    var teamName = name;
        Teams.deleteOne({ name: teamName }, function(err, result) {
            if (err) {
                console.log("Error in delete route");
            }
            else {
                console.log(teamName + " has been deleted");
                res.send(result);
            }
        })
});

router.post('/NCAATeamsPost', function(req, res) {
    console.log("In NCAATeam post route");
    console.log(req.body);
    collection.insertOne(req.body, function(err, result) {
        if (err) {
            console.log("Error in post route");
        }
        else {
            res.end('{"success" : "Updated Successfully", "status" : 200}');
        }
    })
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

module.exports = router;

/* Array of NCAAF teams and their rankings */

var NCAAFTeamRankings = [{
        name: "Alabama",
        rankingSpot: "1",
        avatarUrl: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjE6r3LvMPeAhUKLnwKHVdQDmIQjRx6BAgBEAU&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFile%3AAlabama_Crimson_Tide_logo.svg&psig=AOvVaw0awa2fpqTAPz25V8herW9C&ust=1541721044743081"
    },
    {
        name: "Clemson",
        rankingSpot: "2",
        avatarUrl: "https://www.google.com/imgres?imgurl=http%3A%2F%2Fcontent.sportslogos.net%2Flogos%2F30%2F643%2Ffull%2F9528_clemson_tigers-primary-1965.png&imgrefurl=http%3A%2F%2Fwww.sportslogos.net%2Flogos%2Fview%2F64395281965%2FClemson_Tigers%2F1965%2FPrimary_Logo&docid=VPqrToVkFmFtsM&tbnid=GfGBpZDVJjAvsM%3A&vet=10ahUKEwjy_p3evMPeAhWIj1QKHf9LDCsQMwiOASgUMBQ..i&w=682&h=833&safe=active&bih=700&biw=1440&q=clemson%20logo&ved=0ahUKEwjy_p3evMPeAhWIj1QKHf9LDCsQMwiOASgUMBQ&iact=mrc&uact=8"
    },
    {
        name: "Notre Dame",
        rankingSpot: "3",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fsportslogohistory-tvgu1jdkm2wvqi.netdna-ssl.com%2Fwp-content%2Fuploads%2F2018%2F02%2Fnotre_dame_fighting_irish_1994-presa.png&imgrefurl=https%3A%2F%2Fsportslogohistory.com%2Fnotre-dame-fighting-irish-alternate-logo&docid=CnNHtS7OkrzwtM&tbnid=bR58_Ir42jNAKM%3A&vet=10ahUKEwjK05ecvcPeAhWJKHwKHQzDAGgQMwh4KAowCg..i&w=250&h=250&safe=active&bih=700&biw=1440&q=notre%20dame%20logo&ved=0ahUKEwjK05ecvcPeAhWJKHwKHQzDAGgQMwh4KAowCg&iact=mrc&uact=8"
    },
    {
        name: "Michigan",
        rankingSpot: "4",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fih1.redbubble.net%2Fimage.265531830.3047%2Fflat%2C1000x1000%2C075%2Cf.u7.jpg&imgrefurl=https%3A%2F%2Fwww.redbubble.com%2Fpeople%2Fsloanehaley%2Fworks%2F23403047-michigan-logo&docid=xICxq5WBhWdkzM&tbnid=scEJ6aWmtsyqQM%3A&vet=10ahUKEwijjOqovcPeAhVLxVQKHa5uDncQMwh4KAcwBw..i&w=1000&h=1000&safe=active&bih=700&biw=1440&q=michiga%20logo&ved=0ahUKEwijjOqovcPeAhVLxVQKHa5uDncQMwh4KAcwBw&iact=mrc&uact=8"
    },
    {
        name: "Georgia",
        rankingSpot: "5",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages-na.ssl-images-amazon.com%2Fimages%2FI%2F61UKW%252BdDQaL._SY355_.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.com%2FNCAA-Georgia-Bulldogs-Vinyl-Magnet%2Fdp%2FB0007KMVPK&docid=yxyE1Yg9K3DthM&tbnid=nEC488I95DgDtM%3A&vet=10ahUKEwjR5PK3vcPeAhXI5p8KHXHMD7EQMwhuKAAwAA..i&w=355&h=355&safe=active&bih=700&biw=1440&q=georgia%20logo&ved=0ahUKEwjR5PK3vcPeAhXI5p8KHXHMD7EQMwhuKAAwAA&iact=mrc&uact=8"
    },
    {
        name: "Oklahoma",
        rankingSpot: "6",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F61%2FOklahoma_Sooners_logo.svg%2F795px-Oklahoma_Sooners_logo.svg.png&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFile%3AOklahoma_Sooners_logo.svg&docid=DU5ASKH9lQ949M&tbnid=oWD3M5oG49MuhM%3A&vet=10ahUKEwikzajCvcPeAhXmlFQKHVv0DtsQMwhkKAAwAA..i&w=795&h=1024&safe=active&bih=700&biw=1440&q=oklahoma%20logo&ved=0ahUKEwikzajCvcPeAhXmlFQKHVv0DtsQMwhkKAAwAA&iact=mrc&uact=8"
    },
    {
        name: "West Virginia",
        rankingSpot: "7",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fe%2Fe8%2FWest_Virginia_Mountaineers_logo.svg%2F2000px-West_Virginia_Mountaineers_logo.svg.png&imgrefurl=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AWest_Virginia_Mountaineers_logo.svg&docid=V_HFREWaM1nldM&tbnid=VRaegatmWVM4oM%3A&vet=10ahUKEwjy3uHcvcPeAhWjMnwKHcBjCgwQMwhpKAAwAA..i&w=2000&h=2061&safe=active&bih=700&biw=1440&q=wvu%20logo&ved=0ahUKEwjy3uHcvcPeAhWjMnwKHcBjCgwQMwhpKAAwAA&iact=mrc&uact=8"
    },
    {
        name: "Ohio State",
        rankingSpot: "8",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fc%2Fc1%2FOhio_State_Buckeyes_logo.svg%2F2000px-Ohio_State_Buckeyes_logo.svg.png&imgrefurl=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AOhio_State_Buckeyes_logo.svg&docid=Xkyl0DvIzAMNVM&tbnid=bVoWm1pZv4qfEM%3A&vet=10ahUKEwjF8puYvsPeAhWR-VQKHcYHCn4QMwhwKAEwAQ..i&w=2000&h=1968&safe=active&bih=700&biw=1440&q=ohio%20state%20logo&ved=0ahUKEwjF8puYvsPeAhWR-VQKHcYHCn4QMwhwKAEwAQ&iact=mrc&uact=8"
    },
    {
        name: "Louisana State University",
        rankingSpot: "9",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages-na.ssl-images-amazon.com%2Fimages%2FI%2F71ns-BiaqlL._SY355_.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.com%2FSheet-Tigers-Edible-Cupcake-Topper%2Fdp%2FB00B0H307C&docid=l4BYAi-FoWJAZM&tbnid=v8PDMurElaUCkM%3A&vet=10ahUKEwjBy7qfvsPeAhXEy1QKHeETC1IQMwh1KAQwBA..i&w=353&h=355&safe=active&bih=700&biw=1440&q=lsu%20logo&ved=0ahUKEwjBy7qfvsPeAhXEy1QKHeETC1IQMwh1KAQwBA&iact=mrc&uact=8"
    },
    {
        name: "Washington State",
        rankingSpot: "10",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fs3.wp.wsu.edu%2Fuploads%2Fsites%2F1387%2F2016%2F07%2FCougarhead_201.jpg&imgrefurl=https%3A%2F%2Ftrademarks.wsu.edu%2Flogo-history%2F&docid=yAodKyKb5FES6M&tbnid=vrXlP8RjxptYcM%3A&vet=10ahUKEwj245OrvsPeAhUEHHwKHR3XDH4QMwhaKAAwAA..i&w=1393&h=1390&safe=active&bih=700&biw=1440&q=wsu%20logo&ved=0ahUKEwj245OrvsPeAhUEHHwKHR3XDH4QMwhaKAAwAA&iact=mrc&uact=8"
    },
    {
        name: "University of Central Florida",
        rankingSpot: "11",
        avatarUrl: "https://www.google.com/imgres?imgurl=http%3A%2F%2Fimage.cdnllnwnl.xosnetwork.com%2Fpics33%2F800%2FMO%2FMOYSJMYGFJFBTCR.20180728020226.jpg&imgrefurl=http%3A%2F%2Fucfknights.com%2FViewArticle.dbml%3FDB_OEM_ID%3D34100%26ATCLID%3D211740063&docid=6nBGaz4sCOqb3M&tbnid=2STibjF9BmkNXM%3A&vet=10ahUKEwizsaLwx8PeAhXLv1QKHcW8B7gQMwhsKAQwBA..i&w=705&h=800&safe=active&bih=700&biw=1440&q=ucf%20logo&ved=0ahUKEwizsaLwx8PeAhXLv1QKHcW8B7gQMwhsKAQwBA&iact=mrc&uact=8"
    },
    {
        name: "Kentucky",
        rankingSpot: "12",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fb%2Fb6%2FKentucky_Wildcats_logo.svg%2F2000px-Kentucky_Wildcats_logo.svg.png&imgrefurl=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AKentucky_Wildcats_logo.svg&docid=buQe7ZLWt1NUjM&tbnid=B1Atc1aGFQ5oqM%3A&vet=10ahUKEwiIoL_6x8PeAhWnwlQKHdSCB5wQMwhqKAIwAg..i&w=2000&h=1636&safe=active&bih=700&biw=1440&q=kentucky%20logo&ved=0ahUKEwiIoL_6x8PeAhWnwlQKHdSCB5wQMwhqKAIwAg&iact=mrc&uact=8"
    },
    {
        name: "Syracuse",
        rankingSpot: "13",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F65%2F2f%2Fd8%2F652fd820a8a7242aabe853095b35e8b9.gif&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F351491945889196294%2F&docid=tibYtuPJxfBJqM&tbnid=9VAeKNPcszaKkM%3A&vet=10ahUKEwibpMnLhMTeAhVJilQKHbJOD_AQMwhsKAQwBA..i&w=300&h=263&safe=active&bih=700&biw=1440&q=syracuse%20logo&ved=0ahUKEwibpMnLhMTeAhVJilQKHbJOD_AQMwhsKAQwBA&iact=mrc&uact=8"
    },
    {
        name: "North Carolina State",
        rankingSpot: "14",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fe%2Fe1%2FNorth_Carolina_State_University_Athletic_logo.svg%2F857px-North_Carolina_State_University_Athletic_logo.svg.png&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFile%3ANorth_Carolina_State_University_Athletic_logo.svg&docid=SznadO0kv5DC-M&tbnid=nh6ee6OUqOMKEM%3A&vet=10ahUKEwjI4MrehMTeAhVEMnwKHU_uDvoQMwhTKAAwAA..i&w=857&h=1024&safe=active&bih=700&biw=1440&q=north%20carolina%20state%20logo&ved=0ahUKEwjI4MrehMTeAhVEMnwKHU_uDvoQMwhTKAAwAA&iact=mrc&uact=8"
    },
    {
        name: "Florida",
        rankingSpot: "15",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fs3.amazonaws.com%2Ffreebiesupply%2Flarge%2F2x%2Fflorida-gators-logo-png-transparent.png&imgrefurl=https%3A%2F%2Ffreebiesupply.com%2Flogos%2Fflorida-gators-logo%2F&docid=FMOsTk7FpbRS_M&tbnid=EdpxpOdQQlrEdM%3A&vet=10ahUKEwjhv5nrhMTeAhWF6FQKHZCUDyYQMwh0KAMwAw..i&w=2400&h=1597&safe=active&bih=700&biw=1440&q=florida%20logo&ved=0ahUKEwjhv5nrhMTeAhWF6FQKHZCUDyYQMwh0KAMwAw&iact=mrc&uact=8"
    },
    {
        name: "Mississippi State",
        rankingSpot: "16",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F3%2F36%2FMississippi_State_Bulldogs_logo.svg%2F2000px-Mississippi_State_Bulldogs_logo.svg.png&imgrefurl=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AMississippi_State_Bulldogs_logo.svg&docid=eTLcixOLtNED4M&tbnid=GpZULBYdiP7RWM%3A&vet=10ahUKEwiepZD1hMTeAhVFhlQKHfzPCdAQMwhoKAMwAw..i&w=2000&h=1224&safe=active&bih=700&biw=1440&q=mississippi%20logo&ved=0ahUKEwiepZD1hMTeAhVFhlQKHfzPCdAQMwhoKAMwAw&iact=mrc&uact=8"
    },
    {
        name: "Boston College",
        rankingSpot: "17",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fbotw-pd.s3.amazonaws.com%2Fstyles%2Flogo-thumbnail%2Fs3%2F062015%2Fboston_college_eagles_76005.png%3Fitok%3D4IAicR9c&imgrefurl=http%3A%2F%2Fwww.brandsoftheworld.com%2Flogo%2Fboston-college-eagles&docid=Afw36AzlSdFyIM&tbnid=eMY0SPFXF5KrSM%3A&vet=10ahUKEwiY7dn_hMTeAhVhwMQHHZnXBokQMwhjKAIwAg..i&w=195&h=195&safe=active&bih=700&biw=1440&q=botson%20college%20logo&ved=0ahUKEwiY7dn_hMTeAhVhwMQHHZnXBokQMwhjKAIwAg&iact=mrc&uact=8"
    },
    {
        name: "Michgan State",
        rankingSpot: "18",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fsportslogohistory.com%2Fwp-content%2Fuploads%2F2018%2F02%2Fmichigan_state_spartans_1987-pres-a.png&imgrefurl=https%3A%2F%2Fsportslogohistory.com%2Fmichigan-state-spartans-alternate-logo&docid=quMOJ4q9Gks1MM&tbnid=5hbqhQ3pVJdU7M%3A&vet=10ahUKEwipncKOhcTeAhVjwcQHHdqYCckQMwh0KAQwBA..i&w=250&h=250&safe=active&bih=700&biw=1440&q=michigan%20state%20logo&ved=0ahUKEwipncKOhcTeAhVjwcQHHdqYCckQMwh0KAQwBA&iact=mrc&uact=8"
    },
    {
        name: "Texas",
        rankingSpot: "19",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fsportslogohistory-tvgu1jdkm2wvqi.netdna-ssl.com%2Fwp-content%2Fuploads%2F2018%2F01%2Ftexas_longhorns_1974-pres_s.png&imgrefurl=https%3A%2F%2Fsportslogohistory.com%2Ftexas-longhorns-primary-logo&docid=b3XGQLK1Ek0IzM&tbnid=F7mLS47WIKAzhM%3A&vet=10ahUKEwiHwrPGhcTeAhWprFQKHQK1DpEQMwiAASgQMBA..i&w=250&h=250&safe=active&bih=700&biw=1440&q=texas%20logo&ved=0ahUKEwiHwrPGhcTeAhWprFQKHQK1DpEQMwiAASgQMBA&iact=mrc&uact=8"
    },
    {
        name: "Penn State",
        rankingSpot: "20",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2F1000logos.net%2Fwp-content%2Fuploads%2F2017%2F11%2Fpenn-state-football-logo.jpg&imgrefurl=https%3A%2F%2F1000logos.net%2Fpenn-state-logo%2F&docid=zZ5ZtQNX0WNHHM&tbnid=mBgjiOhPYykx9M%3A&vet=10ahUKEwiKwaLShcTeAhVLxlQKHbJzD20QMwhzKAYwBg..i&w=1560&h=1074&safe=active&bih=700&biw=1440&q=penn%20state%20logo&ved=0ahUKEwiKwaLShcTeAhVLxlQKHbJzD20QMwhzKAYwBg&iact=mrc&uact=8"
    },
    {
        name: "Iowa",
        rankingSpot: "21",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fiowahawkeyedecals.com%2Fimages%2Flarge%2FIowa-Hawkeyes-Logo-wordmark-vinyl-decal1.JPG&imgrefurl=https%3A%2F%2Fiowahawkeyedecals.com%2Fitem_405%2FIowa-Hawkeyes-Tigerhawk.htm&docid=eyB7GbtGNxeNaM&tbnid=hbCyCErZA31_HM%3A&vet=10ahUKEwiQjtvfhcTeAhWHhlQKHWL5ANgQMwhuKAwwDA..i&w=507&h=350&safe=active&bih=700&biw=1440&q=iowa%20logo&ved=0ahUKEwiQjtvfhcTeAhWHhlQKHWL5ANgQMwhuKAwwDA&iact=mrc&uact=8"
    },
    {
        name: "Iowa State",
        rankingSpot: "22",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Ff%2Ff9%2FIowa_State_Cyclones_logo.svg%2F2000px-Iowa_State_Cyclones_logo.svg.png&imgrefurl=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AIowa_State_Cyclones_logo.svg&docid=5tBdSK2jpcOy-M&tbnid=C9KxCmxqI030_M%3A&vet=10ahUKEwiB-YDqhcTeAhXmyFQKHQUEDoQQMwhlKAAwAA..i&w=2000&h=1379&safe=active&bih=700&biw=1440&q=iowa%20state%20logo&ved=0ahUKEwiB-YDqhcTeAhXmyFQKHQUEDoQQMwhlKAAwAA&iact=mrc&uact=8"
    },
    {
        name: "Fresno State",
        rankingSpot: "23",
        avatarUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Ftechflourish.com%2Fimages%2Ffresno-state-clipart-logo-jpg-1.jpg&imgrefurl=https%3A%2F%2Ftechflourish.com%2Fcategories%2Ffresno-state-clipart-logo-jpg.html&docid=u5U2OlVxae2wMM&tbnid=JCaiIdOijP3YWM%3A&vet=10ahUKEwjK0rn6hcTeAhUUwMQHHXdaCRUQMwhkKAQwBA..i&w=909&h=629&safe=active&bih=700&biw=1440&q=fresno%20state%20logo&ved=0ahUKEwjK0rn6hcTeAhUUwMQHHXdaCRUQMwhkKAQwBA&iact=mrc&uact=8"
    },
    {
        name: "Auburn",
        rankingSpot: "24",
        avatarUrl: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjO0tOJhsTeAhVmlFQKHfbbANoQjRx6BAgBEAU&url=http%3A%2F%2Fwww.wtvy.com%2Fsports%2Fheadlines%2FDothans-Kasey-Cooper-has-taken-the-auburn-softball-program-by-storm-Just-a-freshman-Cooper-leads-the-Tigers-with-a-420-batting-average--250241861.html&psig=AOvVaw39aQcRHDjpWyfWyCZVd2Ju&ust=1541740764644817"
    },
    {
        name: "Washington",
        rankingSpot: "25",
        avatarUrl: "https://www.google.com/imgres?imgurl=http%3A%2F%2Fstatic1.squarespace.com%2Fstatic%2F56e336467da24f27960d22c8%2F5716a5401bbee0d40d7496fb%2F5b6b2fbcf950b794664b167a%2F1533751377015%2F3140_washington_huskies-alternate-2007.jpeg%3Fformat%3D1000w&imgrefurl=http%3A%2F%2Fwww.pacificharbors.org%2Fmaster-events-page%2F2018%2F9%2F29%2Fscout-day-with-the-washington-huskies&docid=voq3U7c1H6mgRM&tbnid=vOBNLDCx7eItnM%3A&vet=10ahUKEwj5nLOShsTeAhWrslQKHT2wA08QMwhsKAUwBQ..i&w=960&h=625&safe=active&bih=700&biw=1440&q=washington%20logo&ved=0ahUKEwj5nLOShsTeAhWrslQKHT2wA08QMwhsKAUwBQ&iact=mrc&uact=8"
    }
]
