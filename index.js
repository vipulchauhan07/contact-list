const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// // middleware-1
// app.use(function(req, res, next) {
//     //console.log('middleWare-1 called!');
//     req.myName='Vipul Chauhan';
//     next();
// });

// // middleware-2
// app.use(function(req, res, next){
//     console.log('My name from MW#2', req.myName)
// ;    //  console.log('Middleware 2 called!');
//     next();
// });
var contactList = [
    {
        name: 'Vipul Chauhan',
        phone: '9897565137'
    },

    {
        name: 'Tony Stark',
        phone: '1234567890'
    },


    {
        name: "Coding Ninja",
        phone: "8934793474"
    }

];



app.get('/', function(req, res){
    // console.log(__dirname);
    // res.send('<h1>Cool!, It is running or is it?<h1>');
    // console.log('From the get route controller',req.myName);
    
    Contact.find({} , function(err, contacts) {
        if(err)
        {
            console.log('Error in fetching contacts from db');
            return;
        }

        return res.render('home', {
            title: 'Contacts List',
            contact_list: contacts
        });
    });
     
});
// For deleting the contact without db 

/*app.get('/delete-contact/', function(req, res) {
    // console.log(req.query);
    // get the query from the url
    let phone = req.query.phone;

    let contactIndex = contactList.findIndex(contact =>contact.phone == phone);
    
    if(contactIndex != -1) {
        contactList.splice(contactIndex, 1);
    }
    return res.redirect('back');
});
*/
// deleting a contact using db
app.get('/delete-contact', function(req, res) {
    // get the id from query in the url 
    let id = req.query.id;

    // find the contact in the db using id and deleting it
    Contact.findByIdAndDelete(id, function(err) {
        if(err) {
            console.log('error in deleting an object from db');
            return;
        }
        return res.redirect('back');
    });
});


app.post('/create-contact', function(req, res) {
    //return res.redirect('/practice');
    // contactList.push({
    //         name: req.body.name,
    //         phone: req.body.phone
    //     });
    // return res.redirect('/');
    // contactList.push(req.body);

    // for uploading in the database
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact) {
        if(err)
        {
            console.log('error in creating a contact!');
            return;
        }
        console.log('*********', newContact);
        return res.redirect('back');
    });
    // return res.redirect('back');
});


app.get('/practice',function(req, res) {
    return res.render('practice', {
        title: 'Let us play with ejs'
    } );
})


app.listen(port, function(err) {
    if(err) {
        console.log('Error in running the server', err);
    }
    console.log('Server up.....#',port);
});