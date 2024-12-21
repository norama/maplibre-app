import { Marker } from "@vis.gl/react-maplibre";
import { Pin } from "./Pin";

interface Props {
  longitude: number;
  latitude: number;
  onClick: () => void;
}

export function PinMarker({ longitude, latitude, onClick }: Props) {
  return (
    <Marker
      longitude={longitude}
      latitude={latitude}
      anchor="bottom"
      onClick={(e: any) => {
        // If we let the click event propagates to the map, it will immediately close the popup
        // with `closeOnClick: true`
        e.originalEvent.stopPropagation();
        onClick();
      }}
    >
      <Pin />
    </Marker>
  );
}
