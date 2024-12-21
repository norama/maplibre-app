import { useState } from "react";
import {
  Map,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "@vis.gl/react-maplibre";

import CITIES from "./data/cities.json";
import { City } from "types/data";
import "maplibre-gl/dist/maplibre-gl.css";
import { PinMarker } from "./components/PinMarker";

export function App() {
  const [popupInfo, setPopupInfo] = useState<City | null>(null);

  return (
    <Map
      initialViewState={{
        latitude: 40,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
      }}
      style={{ width: "600px", height: "600px" }}
      mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />

      {CITIES.map((city) => (
        <PinMarker
          key={city.city}
          longitude={city.longitude}
          latitude={city.latitude}
          onClick={() => setPopupInfo(city)}
        />
      ))}

      {popupInfo && (
        <Popup
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          onClose={() => setPopupInfo(null)}
        >
          <div>
            {popupInfo.city}, {popupInfo.state} |{" "}
            <a
              target="_new"
              href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
            >
              Wikipedia
            </a>
          </div>
          <img width="100%" src={popupInfo.image} />
        </Popup>
      )}
    </Map>
  );
}
