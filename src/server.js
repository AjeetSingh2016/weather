const express = require('express');
const path = require('path');
const hbs = require("hbs");
const geocode = require('./utils/geocode');
const temperature = require('./utils/temperature');
const { response } = require('express');


const PORT = process.env.PORT || 3000; 
const app = express();

const publicDir = path.join(__dirname,'../public');
const templatePath = path.join(__dirname, '../Templates/views');
const partialPath = path.join(__dirname, '../Templates/partials');

console.log(templatePath);

app.set("views", templatePath);
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath);


app.use(express.static(publicDir))

app.get("/",(req,res)=>{
    res.render('index',{
        Name: "Ajeet singh chauhan"
    })

})
// app.get('/weather',(req,res)=>{

//     console.log(req.query.address);
//     geocode(req.query.address, (error,{latitude,longitude,location})=>{
//         console.log(latitude);
//         console.log(longitude);
//         console.log(location);
//         temperature(latitude,longitude,(error, data)=>{
//             console.log(data);
    
//         })
//     })
   
// })

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }


    geocode(req.query.address, (error, {latitude,longitude,location} = {})=>{
        if(error){
            res.send({error})
        }
        else{
           temperature(latitude,longitude,(error,data)=>{
               if(error){
                   res.send({error})
               }
               else{
                   res.send({
                       temperature: data,
                       location: location
                   })
               }
           })
        }
    })
})
app.get('/contact',(req,res)=>{
    res.render('contact');
})

app.get('/json',(req,res)=>{
    res.send([{
        Name: 'Ajeet singh',
        age: 20,
        location: 'Luknow'
    },{
        Student_2: "Ankit singh",
        Age: '21',
        Location: 'Lakhimpur' 
        
    }])
})
app.get('/contact/*', (req,res)=>{
    res.render("404",{
        errorMEssage: "Contact  article not found"

    });
})

app.get('*', (req,res)=>{
    res.render("404",{
        errorMEssage: "Page not found"

    });
})

app.listen(PORT,()=>{
    console.log(`Listing on port ${PORT}`);
})