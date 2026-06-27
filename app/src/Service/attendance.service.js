import attendanceRepo from "../Repo/attendance.repo";
import ApiErrorHandler from "../utility/ApiErrorHandler";

export const attendanceService = {
  createAttendance: async (attendanceData) => {
    try {
      const record = await attendanceRepo.createAttendance(attendanceData);
      return record;
    } catch (error) {
      console.error(error, "Error while creating attendance");
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  readAttendance: async (query = {}) => {
    try {
      const records = await attendanceRepo.readAttendance(query);
      return records;
    } catch (error) {
      console.error(error, "Error while reading attendance");
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  updateAttendance: async (id, body) => {
    try {
      const record = await attendanceRepo.updateAttendance(id, body);
      return record;
    } catch (error) {
      console.error(error, "Error while updating attendance");
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  deleteAttendance: async (id) => {
    try {
      const record = await attendanceRepo.deleteAttendance(id);
      return record;
    } catch (error) {
      console.error(error, "Error while deleting attendance");
      throw new ApiErrorHandler(error.message, 500);
    }
  },
};

export default attendanceService;
