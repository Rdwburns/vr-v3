let apiKey = 'c5fca7ad2280d64fd6493f6daafef804424cfb11fa8124350533f64e';
let path = window.location.pathname;
let cookieValue = (document.cookie.match(/^(?:.*;)?\s*vr_geo\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1]
let currentSite = 'United Kingdom'

function json(url) {
    return fetch(url).then(res => res.json());
}

function switchCountries(home, destination, destinationUrl){
    document.body.style.overflow = 'hidden'
    document.getElementById('geo-modal-home').innerText = `${home}`
    document.getElementById('geo-modal-destinaton').innerText = `${destination}`
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
        if (data.country_code == 'GB' && window.location.hostname != "vicereversa.co.uk") {
            switchCountries(currentSite, data.country_name, 'https://vicereversa.co.uk')
        } else if (data.country_code == 'DE' && window.location.hostname != "vicereversa.de") {
            switchCountries(currentSite, data.country_name, 'https://vicereversa.de')
        } else if (data.country_code == 'FR' && window.location.hostname != "vicereversa.fr") {
            switchCountries(currentSite, data.country_name, 'https://vicereversa.fr')
        } else if (data.country_code == 'IE' && window.location.hostname != "vicereversa.ie") {
            switchCountries(currentSite, data.country_name, 'https://vicereversa.ie')
        } else if (data.country_code == 'AU') {
            switchCountries(currentSite, data.country_name, 'https://vicereversa.com.au')
        } else if (data.continent_code == 'EU' && window.location.hostname != "vicereversaskin.eu" ) {
            switchCountries(currentSite, data.country_name, 'https://vicereversa.ie')
        }
    });
    document.body.style.overflow = '';
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