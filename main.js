var form = document.querySelector('#form1');
var forms = document.querySelector('.forms');
var city = document.querySelector('#city');
var adults = document.querySelector('#adults');
var children = document.querySelector('#children');
var date = document.querySelector('#date');
let comments = document.querySelector('.comments')
let commentsForm = document.querySelector('.form')
let username = document.querySelector('#name')
let comment = document.querySelector('#comment')
let commentBtn =    document.querySelector('#comment-submit')

var cityId;

let cityName = document.querySelector('.city-name');
let hostCards = document.querySelector('.cards');

addEventListener('DOMContentLoaded', (event) => {
    // prompt("Welcome")
});

const delay = (ms = 1000) => new Promise(r => setTimeout(r, ms));

async function getCityID() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f3840985cdmsh164f4bca44cd1e2p1fec19jsn9460b16ca752',
            'X-RapidAPI-Host': 'airbnb19.p.rapidapi.com'
        }
    };

    return (await fetch('https://airbnb19.p.rapidapi.com/api/v1/searchDestination?query=' + city.value, options)).json();
}
async function loadHosts() {

    const placeOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f3840985cdmsh164f4bca44cd1e2p1fec19jsn9460b16ca752',
            'X-RapidAPI-Host': 'airbnb19.p.rapidapi.com'
        }
    };

    return (await fetch('https://airbnb19.p.rapidapi.com/api/v1/searchPropertyByPlace?id=' + cityId + '&totalRecords=12&currency=USD&adults=' + adults.value + '&children='+  children.value + '&checkin=' + date.value, placeOptions)).json();

}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    var cityData = [];

    cityData = await getCityID();
    console.log(cityData);

    cityId = cityData["data"][0]["id"].toString();
    cityName.innerHTML = cityData["data"][0]["location_name"].toString();
    await delay()

    var hosts = [];
    hosts = await loadHosts();
    console.log(hosts);

    hosts['data'].forEach(host => {

        hostCards.innerHTML += '<div class="properties-card"><img class="card-img"src="'+host['images'][0]+'"alt="" /><div class="card-txt"><h4>'+host['listingName']+'</h4><p>'+host['price']+'</p></div></div>'
    });

    document.querySelector('.hidden').classList.remove('hidden');
})

function formatDate(date, format) {
    
}

commentBtn.addEventListener('click', (event) => {
    event.preventDefault()
    var today = moment().format('D MMMM YYYY, hh:mma');
    comments.innerHTML += '<div class="comment"><div class="title"><p class="name">'+username.value+'</p><p class="date">~ '+today+'</p></div><p>'+comment.value+'</p></div>'
    commentsForm.reset()
})