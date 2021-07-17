let apiKey = 'c5fca7ad2280d64fd6493f6daafef804424cfb11fa8124350533f64e';
let path = window.location.pathname;
let cookieValue = (document.cookie.match(/^(?:.*;)?\s*vr_geo\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1]
let currentSite = 'United Kingdom'
const sites = {
    uk:{
        name: 'United Kingdom',
        locale: 'en_GB',
        menu_name: 'gb - GBP',
        url:'https://vicereversa.co.uk'
    },
    germany:{
        name: 'Germany',
        locale: 'de_DE',
        menu_name: 'de - EUR',
        url:'https://vicereversa.de'
    },
    france:{
        name: 'France',
        locale: 'fr_FR',
        menu_name: 'fr - EUR',
        url:'https://vicereversa.fr'
    },
    ireland:{
        name: 'Ireland',
        locale: 'en_IE',
        menu_name: 'ie - EUR',
        url:'https://vicereversa.ie'
    },
    australia:{
        name: 'Australia',
        locale: 'en_AU',
        menu_name: 'au - AUD',
        url:'https://vicereversa.com.au'
    }
}

function json(url) {
    return fetch(url).then(res => res.json());
}

function switchCountries(home, destination, destinationUrl){
    document.body.style.overflow = 'hidden'
    document.getElementById('geo-modal-text').innerHTML = `<p>You are currently on our ${home} site, but you appear to be in ${destination}, would you like to visit that site instead?</p><div class="modal-buttons"><button onclick="window.location.href='${destinationUrl}${path}'">Shop in ${destination}</button><button data-dismiss="modal">Stay Here</button></div>`
    document.getElementById('geo-modal').classList.add('open');
    document.cookie = `vr_geo=true; path=/; Secure`;
}

if (!cookieValue){
    document.addEventListener('click', function (e) {
        e = e || window.event;
        var target = e.target;
    
        // Close modal window with 'data-dismiss' attribute or when the backdrop is clicked
        if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
            var modal = document.querySelector('[class="modal open"]');
            document.body.style.overflow = ''
            modal.classList.remove('open');
        }
        
    }, false);    
    json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
        console.log(data)
        if (data.country_code == 'GB' && window.location.hostname != "vicereversa.co.uk") {
            switchCountries(currentSite, data.country_name, sites.uk.url)
        } else if (data.country_code == 'DE' && window.location.hostname != "vicereversa.de") {
            switchCountries(currentSite, data.country_name, sites.germany.url)
        } else if (data.country_code == 'FR' && window.location.hostname != "vicereversa.fr") {
            switchCountries(currentSite, data.country_name, sites.france.url)
        } else if (data.country_code == 'IE' && window.location.hostname != "vicereversa.ie") {
            switchCountries(currentSite, data.country_name, sites.ireland.url)
        } else if (data.country_code == 'AU') {
            switchCountries(currentSite, data.country_name, sites.australia.url)
        } else if (data.continent_code == 'EU' && window.location.hostname != "vicereversaskin.eu" && data.languages.map(name => name).includes('English')) {
            switchCountries(currentSite, data.country_name, sites.ireland.url)
        } else if (data.continent_code == 'EU' && window.location.hostname != "vicereversaskin.eu/de" && data.languages.map(name => name).includes('German')) {
            switchCountries(currentSite, data.country_name, sites.germany.url)
        } else if (data.continent_code == 'EU' && window.location.hostname != "vicereversaskin.eu/fr" && data.languages.map(name => name).includes('French')) {
            switchCountries(currentSite, data.country_name, sites.france.url)
        }
    });
}


document.addEventListener('click', function (f) {
    
    f = f || window.event;
    var target = f.target;

    console.log(target)
    if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
        if (target.hasAttribute('data-target')) {
            document.getElementById('geo-pop-modal').classList.add('open');
        }
    }

    // Close modal window with 'data-dismiss' attribute or when the backdrop is clicked
    if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
        var modal = document.querySelector('[class="modal open"]');
        document.body.style.overflow = ''
        modal.classList.remove('open');
    }
    
}, false);    