// "use client";

// import { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import { selectCount } from "./redux/Slices/counterSlice";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchStaff } from "./redux/Slices/staffSlice";

// // Dynamically import Leaflet Map component with SSR disabled
// const Map = dynamic(() => import("./components/Map"), {
//   ssr: false,
//   loading: () => (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//         width: "100vw",
//         backgroundColor: "#0f172a",
//         color: "#94a3b8",
//         fontFamily: "'Plus Jakarta Sans', sans-serif",
//       }}
//     >
//       <div style={{ textAlign: "center" }}>
//         <div
//           style={{
//             border: "4px solid rgba(59, 130, 246, 0.1)",
//             borderTop: "4px solid #3b82f6",
//             borderRadius: "50%",
//             width: "40px",
//             height: "40px",
//             animation: "spin 1s linear infinite",
//             margin: "0 auto 16px auto",
//           }}
//         />
//         <style>{`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}</style>
//         <p style={{ fontWeight: 600, fontSize: "16px", margin: 0 }}>
//           Initializing Interactive Map...
//         </p>
//         <p style={{ fontSize: "12px", opacity: 0.7, marginTop: "4px" }}>
//           Loading geospatial components
//         </p>
//       </div>
//     </div>
//   ),
// });

// export default function Home() {
//   const select = useSelector(selectCount);
//   const dispatch = useDispatch();

//   // Get staff state from Redux
//   const { staffList, loading, error } = useSelector((state) => state.staff);

//   // Active tracking state
//   const [selectedStaffId, setSelectedStaffId] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [activeMarker, setActiveMarker] = useState(null);

//   // Trigger API call to fetch employees from /api/staff/read on mount
//   useEffect(() => {
//     dispatch(fetchStaff());
//   }, [dispatch]);

//   // Set default selection once staffList is loaded
//   useEffect(() => {
//     if (staffList && staffList.length > 0 && !selectedStaffId) {
//       setSelectedStaffId(staffList[0].id);
//     }
//   }, [staffList, selectedStaffId]);

//   const selectedStaff =
//     staffList.find((s) => s.id === selectedStaffId) || staffList[0] || null;

//   const dates = selectedStaff && selectedStaff.location
//     ? selectedStaff.location.map((l) => l.date)
//     : [];

//   // Update selected date when staff changes or available dates list updates
//   useEffect(() => {
//     if (dates.length > 0) {
//       if (!selectedDate || !dates.includes(selectedDate)) {
//         setSelectedDate(dates[0]);
//       }
//     } else {
//       setSelectedDate("");
//     }
//     setActiveMarker(null);
//   }, [selectedStaffId, dates, selectedDate]);

//   const activeDayTimeline =
//     selectedStaff && selectedStaff.location && selectedDate
//       ? selectedStaff.location.find((l) => l.date === selectedDate)?.timeline || []
//       : [];

//   // Format active day timeline to Leaflet markers props
//   const mapMarkers = activeDayTimeline.map((item, index) => ({
//     lat: item.lat,
//     lng: item.lng,
//     title: item.clientName,
//     clientName: item.clientName,
//     time: item.time,
//     duration: item.duration,
//     activity: item.activity,
//   }));

//   const handleCardLocate = (stop) => {
//     setActiveMarker({ lat: stop.lat, lng: stop.lng, time: stop.time });
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Active":
//         return "#10b981"; // Emerald
//       case "On Site":
//         return "#f59e0b"; // Amber
//       case "In Transit":
//         return "#3b82f6"; // Blue
//       default:
//         return "#64748b"; // Slate
//     }
//   };

//   return (
//     <main style={{ position: "relative", height: "100vh", width: "100vw", overflow: "hidden" }}>
//       {/* Global CSS for style customizers */}
//       <style>{`
//         .sidebar-container {
//           backdrop-filter: blur(16px);
//           -webkit-backdrop-filter: blur(16px);
//           background: rgba(15, 23, 42, 0.85);
//           border: 1px solid rgba(255, 255, 255, 0.08);
//           box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
//         }
//         .staff-item {
//           transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
//           border: 1px solid transparent;
//         }
//         .staff-item:hover:not(.active) {
//           background: rgba(255, 255, 255, 0.05);
//           transform: translateY(-1px);
//         }
//         .staff-item.active {
//           background: rgba(59, 130, 246, 0.12);
//           border-color: rgba(59, 130, 246, 0.3);
//           box-shadow: inset 0 0 12px rgba(59, 130, 246, 0.05);
//         }
//         .timeline-card {
//           transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
//           border: 1px solid transparent;
//         }
//         .timeline-card:hover {
//           background: rgba(255, 255, 255, 0.04);
//           transform: translateX(4px);
//           border-color: rgba(255, 255, 255, 0.08);
//         }
//         .timeline-card.active {
//           background: rgba(59, 130, 246, 0.08);
//           border-color: rgba(59, 130, 246, 0.35);
//         }
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 5px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(255, 255, 255, 0.15);
//           border-radius: 99px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(255, 255, 255, 0.3);
//         }
//         .date-pill {
//           transition: all 0.2s ease;
//           border: 1px solid rgba(255, 255, 255, 0.1);
//         }
//         .date-pill:hover:not(.active) {
//           background: rgba(255, 255, 255, 0.08);
//           color: #ffffff;
//         }
//         .locate-btn {
//           transition: all 0.2s ease;
//           background: rgba(59, 130, 246, 0.1);
//           color: #60a5fa;
//           border: 1px solid rgba(59, 130, 246, 0.2);
//         }
//         .locate-btn:hover {
//           background: #3b82f6;
//           color: #ffffff;
//           border-color: #3b82f6;
//           box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
//         }
//       `}</style>

//       {/* Map layer in background */}
//       <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
//         <Map
//           center={[21.1702, 72.8311]}
//           markers={mapMarkers}
//           activeMarker={activeMarker}
//           onMarkerClick={(marker) => {
//             setActiveMarker({ lat: marker.lat, lng: marker.lng, time: marker.time });
//           }}
//         />
//       </div>

//       {/* Z-Index 999: Floating CRM Staff Left Sidebar */}
//       <div
//         className="sidebar-container custom-scrollbar"
//         style={{
//           position: "absolute",
//           top: "20px",
//           left: "20px",
//           bottom: "20px",
//           width: "390px",
//           zIndex: 999,
//           borderRadius: "16px",
//           display: "flex",
//           flexDirection: "column",
//           color: "#f1f5f9",
//           overflowY: "auto",
//           padding: "24px 20px",
//         }}
//       >
//         {/* Header */}
//         <div style={{ marginBottom: "20px" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//             <span style={{ fontSize: "24px" }}>🗺️</span>
//             <div>
//               <h1
//                 style={{
//                   fontSize: "18px",
//                   fontWeight: 800,
//                   margin: 0,
//                   letterSpacing: "-0.025em",
//                   background: "linear-gradient(to right, #60a5fa, #38bdf8)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 HRM Field Staff Tracker
//               </h1>
//               <p style={{ fontSize: "11px", color: "#94a3b8", margin: "2px 0 0 0", fontWeight: 500 }}>
//                 Date-wise Client Visit Timeline
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Loading and Error Indicators */}
//         {loading && (
//           <div style={{ padding: "8px 12px", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: "8px", fontSize: "12px", color: "#60a5fa", display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
//             <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#3b82f6", animation: "ping 1s infinite" }} />
//             Syncing live location database...
//           </div>
//         )}

//         {error && (
//           <div style={{ padding: "8px 12px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "8px", fontSize: "11px", color: "#f87171", marginBottom: "16px", lineHeight: "1.4" }}>
//             <strong>💡 Sync Notice:</strong> Using offline fallback data ({typeof error === "string" ? error : "Unauthenticated API request"}).
//           </div>
//         )}

//         {/* Directory Section */}
//         <div style={{ marginBottom: "24px" }}>
//           <h2
//             style={{
//               fontSize: "12px",
//               textTransform: "uppercase",
//               letterSpacing: "0.05em",
//               color: "#64748b",
//               fontWeight: 700,
//               marginBottom: "12px",
//             }}
//           >
//             Employee Directory
//           </h2>
//           <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//             {staffList.map((staff) => {
//               const isActive = staff.id === selectedStaffId;
//               const curAvatar = staff.avatarSymbol || "👤";
//               return (
//                 <button
//                   key={staff.id}
//                   id={`staff-btn-${staff.id}`}
//                   onClick={() => setSelectedStaffId(staff.id)}
//                   className={`staff-item ${isActive ? "active" : ""}`}
//                   style={{
//                     textAlign: "left",
//                     padding: "12px",
//                     borderRadius: "12px",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "12px",
//                     width: "100%",
//                     cursor: "pointer",
//                     background: "rgba(255, 255, 255, 0.02)",
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: "24px",
//                       background: "rgba(255, 255, 255, 0.05)",
//                       borderRadius: "10px",
//                       width: "42px",
//                       height: "42px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       border: "1px solid rgba(255, 255, 255, 0.05)",
//                     }}
//                   >
//                     {curAvatar}
//                   </div>
//                   <div style={{ flex: 1, minWidth: 0 }}>
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <span style={{ fontWeight: 600, fontSize: "14px", color: isActive ? "#60a5fa" : "#f1f5f9" }}>
//                         {staff.name}
//                       </span>
//                       <span
//                         style={{
//                           width: "8px",
//                           height: "8px",
//                           borderRadius: "50%",
//                           backgroundColor: getStatusColor(staff.status),
//                         }}
//                         title={staff.status}
//                       />
//                     </div>
//                     <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                       {staff.role}
//                     </div>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Date Selector Section */}
//         {dates.length > 0 && (
//           <div style={{ marginBottom: "24px" }}>
//             <h2
//               style={{
//                 fontSize: "12px",
//                 textTransform: "uppercase",
//                 letterSpacing: "0.05em",
//                 color: "#64748b",
//                 fontWeight: 700,
//                 marginBottom: "12px",
//               }}
//             >
//               Select Tracking Date
//             </h2>
//             <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//               {dates.map((d) => {
//                 const isActive = d === selectedDate;
//                 const dateObj = new Date(d);
//                 const displayDate = dateObj.toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                   year: "numeric",
//                 });
//                 return (
//                   <button
//                     key={d}
//                     id={`date-pill-${d}`}
//                     onClick={() => {
//                       setSelectedDate(d);
//                       setActiveMarker(null);
//                     }}
//                     className={`date-pill ${isActive ? "active" : ""}`}
//                     style={{
//                       padding: "6px 12px",
//                       borderRadius: "20px",
//                       fontSize: "12px",
//                       fontWeight: 600,
//                       cursor: "pointer",
//                       background: isActive ? "#3b82f6" : "rgba(255, 255, 255, 0.03)",
//                       color: isActive ? "#ffffff" : "#94a3b8",
//                     }}
//                   >
//                     {displayDate}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Timeline Section */}
//         <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
//           <h2
//             style={{
//               fontSize: "12px",
//               textTransform: "uppercase",
//               letterSpacing: "0.05em",
//               color: "#64748b",
//               fontWeight: 700,
//               marginBottom: "16px",
//             }}
//           >
//             Visit Logs Timeline ({activeDayTimeline.length} Visits)
//           </h2>

//           {activeDayTimeline.length === 0 ? (
//             <div style={{ padding: "20px", textAlign: "center", color: "#64748b", fontSize: "14px" }}>
//               No timeline logs found for this date.
//             </div>
//           ) : (
//             <div
//               className="custom-scrollbar"
//               style={{
//                 flex: 1,
//                 overflowY: "auto",
//                 paddingRight: "4px",
//                 position: "relative",
//               }}
//             >
//               {/* Connecting Vertical Line */}
//               <div
//                 style={{
//                   position: "absolute",
//                   left: "17px",
//                   top: "24px",
//                   bottom: "24px",
//                   width: "2px",
//                   backgroundColor: "rgba(59, 130, 246, 0.2)",
//                   zIndex: 0,
//                 }}
//               />

//               <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//                 {activeDayTimeline.map((stop, index) => {
//                   const isMarkerActive =
//                     activeMarker &&
//                     activeMarker.lat === stop.lat &&
//                     activeMarker.lng === stop.lng &&
//                     activeMarker.time === stop.time;

//                   return (
//                     <div
//                       key={index}
//                       className={`timeline-card ${isMarkerActive ? "active" : ""}`}
//                       style={{
//                         position: "relative",
//                         zIndex: 1,
//                         padding: "14px 16px 14px 40px",
//                         borderRadius: "12px",
//                         background: "rgba(255, 255, 255, 0.02)",
//                         border: "1px solid rgba(255, 255, 255, 0.03)",
//                       }}
//                     >
//                       {/* Timeline Node Point */}
//                       <div
//                         style={{
//                           position: "absolute",
//                           left: "9px",
//                           top: "20px",
//                           width: "18px",
//                           height: "18px",
//                           borderRadius: "50%",
//                           border: "3px solid #0f172a",
//                           backgroundColor: isMarkerActive
//                             ? "#3b82f6"
//                             : index === 0
//                             ? "#10b981"
//                             : index === activeDayTimeline.length - 1
//                             ? "#ef4444"
//                             : "#f59e0b",
//                           boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.15)",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           fontSize: "8px",
//                           fontWeight: "bold",
//                           color: "#ffffff",
//                         }}
//                       >
//                         {index + 1}
//                       </div>

//                       {/* Header (Time & Duration) */}
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "between",
//                           gap: "8px",
//                           fontSize: "11px",
//                           color: "#64748b",
//                           fontWeight: 700,
//                           marginBottom: "4px",
//                         }}
//                       >
//                         <span style={{ color: "#3b82f6", background: "rgba(59, 130, 246, 0.1)", padding: "2px 6px", borderRadius: "4px" }}>
//                           {stop.time}
//                         </span>
//                         {stop.duration && (
//                           <span style={{ fontSize: "11px", fontWeight: 500 }}>
//                             ⏳ {stop.duration}
//                           </span>
//                         )}
//                       </div>

//                       {/* Client Name */}
//                       <h3 style={{ fontSize: "14px", fontWeight: 700, margin: "4px 0", color: "#f8fafc" }}>
//                         {stop.clientName}
//                       </h3>

//                       {/* Activity Details */}
//                       <p style={{ fontSize: "12px", color: "#94a3b8", margin: "6px 0 10px 0", lineHeight: "1.4" }}>
//                         {stop.activity}
//                       </p>

//                       {/* Action Button */}
//                       <button
//                         onClick={() => handleCardLocate(stop)}
//                         className="locate-btn"
//                         style={{
//                           padding: "5px 10px",
//                           borderRadius: "6px",
//                           fontSize: "11px",
//                           fontWeight: 700,
//                           cursor: "pointer",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "4px",
//                         }}
//                       >
//                         📍 Locate Visit
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer (Redux State Check & Credits) */}
//         <div
//           style={{
//             marginTop: "16px",
//             paddingTop: "14px",
//             borderTop: "1px solid rgba(255, 255, 255, 0.05)",
//             fontSize: "11px",
//             color: "#64748b",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <span>Alpha CRM Suite v1.2</span>
//           <span style={{ background: "rgba(255, 255, 255, 0.05)", padding: "2px 6px", borderRadius: "4px" }}>
//             Redux Counter: {select}
//           </span>
//         </div>
//       </div>
//     </main>
//   );
// }

import React from "react";

const page = () => {
  return (
    <>
      <p>test alpha is online</p>
    </>
  );
};

export default page;
