import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import services from "../../features/index";

// Fallback CRM/HRM mock tracking data
const mockStaffData = [
  {
    id: "staff_1",
    name: "Aarav Mehta",
    email: "aarav.mehta@alpha.com",
    role: "Senior Sales Manager",
    avatarSymbol: "👨‍💼",
    status: "Active",
    location: [
      {
        date: "2026-06-19",
        timeline: [
          {
            time: "09:15 AM",
            activity: "Shift Started - Checked in at Head Office",
            clientName: "Alpha Headquarters",
            lat: 21.1702,
            lng: 72.8311,
            duration: "30 mins",
          },
          {
            time: "10:30 AM",
            activity: "Sales pitch & product demo for ERP system",
            clientName: "Reliance Retail HQ",
            lat: 21.1855,
            lng: 72.822,
            duration: "1 hr 15 mins",
          },
          {
            time: "01:00 PM",
            activity: "Quarterly review with procurement team",
            clientName: "L&T Infotech Center",
            lat: 21.1925,
            lng: 72.848,
            duration: "2 hrs",
          },
          {
            time: "04:30 PM",
            activity: "Follow-up visit regarding software license agreement",
            clientName: "Adani Green Energy Surat",
            lat: 21.168,
            lng: 72.8625,
            duration: "45 mins",
          },
          {
            time: "05:45 PM",
            activity:
              "Shift Ended - Returned to Head Office & submitted daily report",
            clientName: "Alpha Headquarters",
            lat: 21.1702,
            lng: 72.8311,
            duration: "15 mins",
          },
        ],
      },
      {
        date: "2026-06-18",
        timeline: [
          {
            time: "09:30 AM",
            activity: "Shift Started at Head Office",
            clientName: "Alpha Headquarters",
            lat: 21.1702,
            lng: 72.8311,
            duration: "15 mins",
          },
          {
            time: "11:00 AM",
            activity: "Contract signing ceremony",
            clientName: "HDFC Corporate Office",
            lat: 21.155,
            lng: 72.815,
            duration: "1 hr 30 mins",
          },
          {
            time: "02:30 PM",
            activity: "Integration support & troubleshooting visit",
            clientName: "ICICI Bank Regional Branch",
            lat: 21.201,
            lng: 72.855,
            duration: "2 hrs",
          },
          {
            time: "05:15 PM",
            activity: "Shift Ended - Checked out",
            clientName: "Home Office",
            lat: 21.1702,
            lng: 72.8311,
            duration: "10 mins",
          },
        ],
      },
    ],
  },
  {
    id: "staff_2",
    name: "Elena Rostova",
    email: "elena.r@alpha.com",
    role: "Field Service Engineer",
    avatarSymbol: "👩‍🔧",
    status: "On Site",
    location: [
      {
        date: "2026-06-19",
        timeline: [
          {
            time: "08:30 AM",
            activity:
              "Checked in from home - Preparing tools & hardware inventory",
            clientName: "Tech Service Depot",
            lat: 21.182,
            lng: 72.835,
            duration: "45 mins",
          },
          {
            time: "10:00 AM",
            activity:
              "Critical server hardware maintenance & rack configuration",
            clientName: "Surat Data Center",
            lat: 21.144,
            lng: 72.802,
            duration: "3 hrs",
          },
          {
            time: "02:00 PM",
            activity: "Fiber network patch panel installation",
            clientName: "TCS Synergy Park",
            lat: 21.215,
            lng: 72.872,
            duration: "1 hr 45 mins",
          },
          {
            time: "04:30 PM",
            activity: "Routine security audit & router firmware upgrade",
            clientName: "Infosys Campus",
            lat: 21.199,
            lng: 72.85,
            duration: "1 hr",
          },
        ],
      },
      {
        date: "2026-06-17",
        timeline: [
          {
            time: "09:00 AM",
            activity: "Hardware diagnostics checklist completed",
            clientName: "Tech Service Depot",
            lat: 21.182,
            lng: 72.835,
            duration: "30 mins",
          },
          {
            time: "11:00 AM",
            activity: "UPS battery replacement & backup generator test",
            clientName: "Apollo Hospital Surat",
            lat: 21.161,
            lng: 72.825,
            duration: "2 hrs 30 mins",
          },
          {
            time: "03:00 PM",
            activity: "Emergency router reconfiguration",
            clientName: "Surat Airport Command Center",
            lat: 21.115,
            lng: 72.775,
            duration: "1 hr 30 mins",
          },
        ],
      },
    ],
  },
  {
    id: "staff_3",
    name: "Kabir Roy",
    email: "kabir.roy@alpha.com",
    role: "Account Executive",
    avatarSymbol: "👨‍💻",
    status: "In Transit",
    location: [
      {
        date: "2026-06-19",
        timeline: [
          {
            time: "09:00 AM",
            activity: "Pre-briefing meeting with management",
            clientName: "Alpha Headquarters",
            lat: 21.1702,
            lng: 72.8311,
            duration: "1 hr",
          },
          {
            time: "11:15 AM",
            activity: "CRM onboarding workshop with HR division",
            clientName: "Wipro Tech Center",
            lat: 21.163,
            lng: 72.845,
            duration: "2 hrs",
          },
          {
            time: "02:30 PM",
            activity: "Service level agreement negotiations",
            clientName: "L&T Heavy Engineering Office",
            lat: 21.198,
            lng: 72.885,
            duration: "1 hr 45 mins",
          },
          {
            time: "05:00 PM",
            activity: "Debriefing and contract copy drop-off",
            clientName: "SBI Surat Regional HQ",
            lat: 21.175,
            lng: 72.828,
            duration: "45 mins",
          },
        ],
      },
    ],
  },
];

const initialState = {
  staffList: mockStaffData,
  loading: false,
  error: null,
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(services.fetchStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(services.fetchStaff.fulfilled, (state, action) => {
        state.loading = false;
        // Verify response contains data list
        if (action.payload && action.payload.data) {
          state.staffList = action.payload.data;
        }
      })
      .addCase(services.fetchStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        // Keep initial mockStaffData as fallback if fetch fails
      });
  },
});

export default staffSlice.reducer;
