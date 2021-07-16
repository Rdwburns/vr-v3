let apiKey = 'c5fca7ad2280d64fd6493f6daafef804424cfb11fa8124350533f64e';
let path = window.location.pathname;
let cookieValue = (document.cookie.match(/^(?:.*;)?\s*vr_geo\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1]



function json(url) {
    return fetch(url).then(res => res.json());
}


if (!!cookieValue && cookieValue != window.location.hostname) {
    console.log('cookie found')
    window.location.href = "https://" + cookieValue + path
} else {
    json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
        if (data.country_code == 'UK' && window.location.hostname != "vicereversa.co.uk") {
            window.location.href = "https://vicereversa.co.uk" + path;
            document.cookie = `vr_geo=${window.location.hostname}}; Secure`;
        } else if (data.country_code == 'DE' && window.location.hostname != "vicereversa.de") {
            window.location.href = "https://vicereversa.de" + path;
            document.cookie = `vr_geo=${window.location.hostname}}; Secure`;
        } else if (data.country_code == 'FR' && window.location.hostname != "vicereversa.fr") {
            window.location.href = "https://vicereversa.fr" + path;
            document.cookie = `vr_geo=${window.location.hostname}}; Secure`;
        } else if (data.country_code == 'IE' && window.location.hostname != "vicereversa.ie") {
            window.location.href = "https://vicereversa.ie" + path;
            document.cookie = `vr_geo=${window.location.hostname}}; Secure`;
        } else if (data.country_code == 'AU') {
            window.location.href = "https://vicereversaskin.com.au" + path;
            document.cookie = `vr_geo=${window.location.hostname}}; Secure`;
        } else if (data.continent_code == 'EU' && window.location.hostname != "vicereversaskin.eu" && data.languages.map(name => name).includes('English')) {
            window.location.href = "https://vicereversaskin.eu" + path;
            document.cookie = `vr_geo=${window.location.hostname}}; Secure`;
        } else if (data.continent_code == 'EU' && window.location.hostname != "vicereversaskin.eu/de" && data.languages.map(name => name).includes('German')) {
            window.location.href = "https://vicereversaskin.eu/de" + path;
            document.cookie = `vr_geo=${window.location.hostname}}; Secure`;
        } else if (data.continent_code == 'EU' && window.location.hostname != "vicereversaskin.eu/fr" && data.languages.map(name => name).includes('French')) {
            window.location.href = "https://vicereversaskin.eu/fr" + path;
            document.cookie = `vr_geo=${window.location.hostname}}; Secure`;
        }
    });
}