mapboxgl.accessToken = 'pk.eyJ1IjoieWh0c2VuZzExMDEiLCJhIjoiY2tiZ3A1emtnMGFmdjJ5cGJoajBqMWhjaCJ9.U4uHML8If_tXoEM6N8QZ6w';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/yhtseng1101/ckbgtxnhf27pf1jumhcakpj1z/draft', // stylesheet location
    center: [120.8, 23.5], // starting position [lng, lat]
    zoom: 1,// starting zoom
});

map.on('load', function() {
    map.addSource('places', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [121.33, 25.04]
                    },
                    'properties': {
                        'description': '<strong>Home Town</strong><p>Taipei, Taiwan</p>',
                        'icon': 'pitch'
                    }
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-96.73, 32.99]
                    },
                    'properties': {
                        'description': '<strong>Where I study now</strong><p>The University of Texas at Dallas</p>',
                        'icon': 'library'
                    }
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [135.43, 34.66]
                    },
                    'properties': {
                        'description': '<strong>My Dream Land</strong><p>Universal Studio Japan</p>',
                        'icon': 'amusement-park'
                    }
                }
            ]
        }
    })


    // add a layer showing the places
    map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
            'icon-image': '{icon}-15',
            'icon-allow-overlap': true,
        }
    })

    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });
        
    map.on('mouseenter', 'places', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;
        
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
        // Populate the popup and set its coordinates
        // based on the feature found.
        popup
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });
        
    map.on('mouseleave', 'places', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
});