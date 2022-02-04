const request = require('postman-request');

const temperature = (latitude,longitude, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=fe7620a46c8e872737b1b4b7d64bb79d&query=' + latitude +  ',' + longitude +'&units=m'

    request({url, json: true},(error,response)=>{
        if(error){
            callback('Unable to connect location services !', undefined)
        }
        else if(response.body.success==false){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined, response.body.current.temperature)
        }
    })

}
module.exports = temperature;