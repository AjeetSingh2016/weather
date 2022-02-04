
console.log("client side js is loaded");

const form = document.querySelector('button');
const input = document.querySelector('input');
const message = document.querySelector('.message')
const error = document.querySelector('.location')



form.addEventListener('click',(e)=>{
    e.preventDefault();

    const location = input.value
    error.textContent = 'Location: Loading...';
    message.textContent = 'Temparature: loading...';

    fetch('/weather?address=' + location).then((respnse)=>{
    respnse.json().then((data)=>{
        if(data.error){
            message.textContent = data.error;
            error.textContent = '';
        }
        else{
            error.textContent = 'Location: ' + data.location;
            message.textContent = 'Temparature: ' + data.temperature  + "°C";
        }
    })
})

    console.log(location);
})