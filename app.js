//Include Packages
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');
const fs = require('fs-extra');


//Project Folder
var ProjectPath = __dirname;
fs.mkdirs(ProjectPath,function(err){
    if(err){
        console.log(err)
        return
    }
})

exports.ProjectPath = ProjectPath;
const app = express();
const port = 3000;
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
//Enforce HTTPS on production
if(app.get('env') === 'production'){
  app.use(function(req,res,next){
     var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  })
}



//HomePage
app.get('/', (req, res) =>{
	res.sendFile(path.join(__dirname,'public/index.html'))
});

app.listen(port,() => console.log('Joniki website on port 3k'+port));
