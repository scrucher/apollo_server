let lat;
let long;

if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log(lat, lon);
        document.getElementById('latitude').textContent = lat;
        document.getElementById('longitude').textContent = lon;

        const mymap = L.map('mymap').setView([lat, lon], 15);
        const attribution =
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const tiles = L.tileLayer(tileUrl, { attribution });
        tiles.addTo(mymap);
        const marker = L.marker([lat, lon]).addTo(mymap);
    });
} else {
    console.log('geolocation not available');
}


// MAP BOX SCRIPT

mapboxgl.accessToken = 'pk.eyJ1Ijoic2NydWNoZXIiLCJhIjoiY2t3dW5tYnNlMXM1MTJxdXMwb3BlZWJmYiJ9.2iqhSE1FU68zhi4MgrsFwg';
var map = new mapboxgl.Map({
    container: 'map',
    // center: [-122.486052, 37.830348],
    style: 'mapbox://styles/mapbox/streets-v11'
});

map.on('load', () => {
    map.addSource('route', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': [lat, long]
            }
        }
    });
    map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#888',
            'line-width': 8
        }
    });
});