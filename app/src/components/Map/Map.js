import { useEffect, useState } from 'react';
// import L from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import './map.scss';

function Map({ props, funct }) {
  const [activities, setActivities] = useState([]);
  const position = JSON.parse(localStorage.getItem('coordinate'));

  useEffect(() => {
    setActivities(props.searchResult);
  }, [props.searchResult]);

  // const iconTest = new L.Icon({
  //   iconUrl:
  //     'https://i.picsum.photos/id/279/200/300.jpg?hmac=fYDbVmnm7vDGt7SA51v-qMUKHIn7HKCp5v9d8Wx_SVM',
  //   iconSize: [50, 50],
  //   iconAnchor: [25, 25],
  // });

  return (
    <div id='map' className='map'>
      <link
        rel='stylesheet'
        href='https://unpkg.com/leaflet@1.8.0/dist/leaflet.css'
        integrity='sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=='
        crossOrigin=''
      />
      <script
        src='https://unpkg.com/leaflet@1.8.0/dist/leaflet.js'
        integrity='sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=='
        crossOrigin=''
      />

      <MapContainer
        center={position}
        zoom={13}
        // change this option to active zoom on scroll
        scrollWheelZoom={true}>
        <TileLayer
          attribution='OpenStreetMap'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {activities.map((activity) => {
          if (activity.landmark) {
            const tmp = JSON.parse(activity.landmark);
            const x = tmp[0];
            const y = tmp[1];

            return (
              <Marker
                key={activity.id}
                position={[x, y]}
                eventHandlers={{
                  click: () => {
                    funct.handleActivity(activity.id);
                  },
                }}
              />
            );
          }
          return null;
        })}
      </MapContainer>
    </div>
  );
}

export default Map;

/*
<FontAwesomeIcon icon="fa-solid fa-person-running" />
<FontAwesomeIcon icon="fa-solid fa-card-club" />
*/
