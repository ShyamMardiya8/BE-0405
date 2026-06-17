"use client";
import dynamic from "next/dynamic";
import Map from "./components/Map";
import { selectCount } from "./redux/Slices/counterSlice";
import { useSelector } from "react-redux";

export default function Home() {
  const select = useSelector(selectCount);
  console.info("🚀 ~ Home ~ select:", select);
  return (
    <main>
      <h1>Leaflet Map</h1>
      <Map
        center={[21.1702, 72.8311]}
        markers={[
          {
            lat: 21.1702,
            lng: 72.8311,
            title: "Surat",
          },
          {
            lat: 21.18,
            lng: 72.84,
            title: "Office",
          },
        ]}
      />
    </main>
  );
}
