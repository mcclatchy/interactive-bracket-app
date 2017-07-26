import L from 'leaflet'

class Starter{
  render() {

  let centerMarker = [28.13013, -83.12256]

  let options = {
        attributionControl: false,
        center: centerMarker,
        zoom: 6,
        scrollWheelZoom: false,
      }

  // Standard leaflet init stuff
  const map = new L.Map('map', options);

  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWFsYnJpZ2h0LW1oIiwiYSI6ImNqM3ExYTFrbzAwdWoyd3BmOXBsdWlraWoifQ.4ZSAZpc41c39EWcwFhUjoA').addTo(map);

  L.control.attribution({prefix: false})
           .addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, &copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>')
           .addTo(map);

  // Snippet that helps you find and use the map center.
  // map.on('mouseup', () => {
  //   console.log(`${map.getCenter()}`)
  // });

  }
}

const myMap = () => {
  new Starter().render()
}

export { myMap }