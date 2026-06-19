"use client";

import { useEffect } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Dynamic map view controller
function MapViewHandler({ center, markers, activeMarker }) {
  const map = useMap();

  // If a specific marker is activated (e.g. from "Locate on Map" button), fly to it
  useEffect(() => {
    if (activeMarker) {
      map.flyTo([Number(activeMarker.lat), Number(activeMarker.lng)], 16, {
        animate: true,
        duration: 1.2,
      });
    }
  }, [activeMarker, map]);

  // Adjust zoom to fit all markers when the marker set changes (but only if no activeMarker is set)
  useEffect(() => {
    if (markers && markers.length > 0 && !activeMarker) {
      const bounds = L.latLngBounds(
        markers.map((m) => [Number(m.lat), Number(m.lng)])
      );
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [markers, activeMarker, map]);

  // If no markers but center changed
  useEffect(() => {
    if (center && (!markers || markers.length === 0)) {
      map.setView(center, 15);
    }
  }, [center, markers, map]);

  return null;
}

// Helper to create beautiful SVG-based map markers
const createCustomIcon = (index, total, isSelected) => {
  let color = "#f59e0b"; // Amber/Orange for intermediate stops
  if (isSelected) {
    color = "#3b82f6"; // Blue for currently selected/highlighted stop
  } else if (index === 0) {
    color = "#10b981"; // Green for start
  } else if (index === total - 1) {
    color = "#ef4444"; // Red for end
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="38" height="38">
    <path fill="${color}" stroke="#ffffff" stroke-width="1.5" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="7" fill="#ffffff"/>
    <text x="12" y="12" font-family="'Plus Jakarta Sans', sans-serif" font-size="10px" font-weight="800" fill="${color}" text-anchor="middle">${index + 1}</text>
  </svg>`;

  return L.divIcon({
    html: svg,
    className: "custom-leaflet-marker",
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });
};

export default function Map({
  center = [21.1702, 72.8311],
  zoom = 15,
  markers = [],
  activeMarker = null,
  onMarkerClick = null,
}) {
  useEffect(() => {
    // Delete standard leaflet icon styles
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">Google Maps</a>'
        url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
      />

      <MapViewHandler
        center={center}
        markers={markers}
        activeMarker={activeMarker}
      />

      {markers.map((marker, index) => {
        const isSelected =
          activeMarker &&
          activeMarker.lat === marker.lat &&
          activeMarker.lng === marker.lng;
        return (
          <Marker
            key={index}
            position={[Number(marker.lat), Number(marker.lng)]}
            icon={createCustomIcon(index, markers.length, isSelected)}
            eventHandlers={{
              click: () => {
                if (onMarkerClick) onMarkerClick(marker);
              },
            }}
          >
            <Popup>
              <div style={{ color: "#0f172a", fontFamily: "sans-serif" }}>
                <strong style={{ fontSize: "14px", display: "block", marginBottom: "4px" }}>
                  {marker.title || marker.clientName || `Stop ${index + 1}`}
                </strong>
                <div style={{ fontSize: "12px", color: "#475569", margin: "2px 0" }}>
                  ⏱ <strong>Time:</strong> {marker.time}
                </div>
                {marker.duration && (
                  <div style={{ fontSize: "12px", color: "#475569", margin: "2px 0" }}>
                    ⏳ <strong>Duration:</strong> {marker.duration}
                  </div>
                )}
                <div style={{ fontSize: "12px", color: "#3b82f6", marginTop: "4px", fontWeight: "500" }}>
                  {marker.activity}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {markers.length > 1 && (
        <Polyline
          positions={markers.map((marker) => [
            Number(marker.lat),
            Number(marker.lng),
          ])}
          color="#3b82f6"
          weight={3}
          opacity={0.8}
          dashArray="5, 10"
        />
      )}
    </MapContainer>
  );
}
