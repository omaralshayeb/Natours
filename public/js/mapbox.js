/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoib21hcmFsc2hheWViIiwiYSI6ImNrdXR3ZDdweTA4aXYycXFvOHRvd3N5dGUifQ.P_WUWXxvND6f9oPr91ppuw';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/omaralshayeb/ckutyyipy4bfu17rw1fsa17er',
    scrollZoom: false
    // center: [-118.113491, 34.111745],
    // zoom: 7,
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    //Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    //Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
