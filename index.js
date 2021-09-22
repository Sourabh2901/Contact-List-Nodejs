const express = require('express');
const path    = require('path');
const port    = 8000;

const db      = require('./config/mongoose');
const Contact = require('./models/contact');
const app     = express();

app.set('view engine' , 'ejs');
app.set('views' ,path.join(__dirname , 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

//middleware1
// app.use(function(req,res,next){
//     console.log("middleware 1");
//     next();
// });

//middleware2
// app.use(function(req,res,next){
//     console.log("middleware 2");
//     next();
// });

var contactList = [
    {
        name : 'sourabh',
        number : '9131727387'
    },
    {
        name : 'Mummy',
        number : '8319864844'
    },
    {
        name : 'papa',
        number : '7000426463'
    }
]

app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
            console.log("Error While fetching contact from DB!");
            return;
        }
        return res.render('home',{
            title : 'Contact List',
            contact_List : contacts
        });

    });

});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title : 'Contact List',
        flag  : 'false'
    });
});

app.post('/create-contact',function(req,res){
    // contactList.push(req.body);
    // contactList.push({
    //     name : req.body.name,
    //     number : req.body.number,
    // });
    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    },function(err,newContact){
        if(err){
            console.log("Error While Creating Contact!!");
            return;
        }
        console.log("****",newContact);
        return res.redirect('back');
    })
});

//For deleteting a particular Contact
app.get('/delete-contact/',function(req,res){

        //Fetch The Id From Query in URL
        console.log(req.query);
        let id = req.query.id;

        //Find a particular fetched contact and delete it
        Contact.findByIdAndDelete(id ,function(err){
            if(err){
                console.log("Error in deleting a object from database!");
                return;
            }
            console.log('Deleted successfully!');
            return res.redirect('back');
        });
    // console.log(req.params);
    // let number = req.params.phone;
    // console.log(req.query);
    // let number = req.query.phone;
    // let contactIndex = contactList.findIndex(contact => contact.number == number);
    // let contactIndex = contactList.findIndex(function(){
    //     for(let i = 0;i < contactList.length;i++){
    //         if(contactList[i] == number){
    //             return i;
    //         }
    //     }
    //     return -1;
});

app.listen(port ,function(err){
    if(err){
        console.log("402 Payment required ", err);
        return;
    }
    console.log("server is running on port ",port);
});

// here delete is not working
//ok, letme check