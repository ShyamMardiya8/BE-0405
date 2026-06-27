import { errMessage } from "../constant";
import Attendance from "../Models/attendance.model";
import ApiErrorHandler from "../utility/ApiErrorHandler";

export const attendanceRepo = {
  createAttendance: async (attendanceData) => {
    try {
      const existingAttendance = await Attendance.findOne({
        staffId: attendanceData.staffId,
        date: attendanceData.date,
      });
      if (existingAttendance) {
        throw new ApiErrorHandler("Attendance already marked for today", 400);
      }
      const attendance = await Attendance.create(attendanceData);
      if (!attendance) {
        throw new ApiErrorHandler(errMessage.create, 500);
      }
      return attendance;
    } catch (error) {
      if (error instanceof ApiErrorHandler) {
        throw error;
      }
      console.error(error, "attendanceRepo.createAttendance");
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  readAttendance: async (query = {}) => {
    try {
      const readAttendance = await Attendance.find(query);
      if (!readAttendance) {
        throw new ApiErrorHandler(errMessage.get, 404);
      }
      return readAttendance;
    } catch (error) {
      console.error(error, "attendanceRepo.readAttendance");
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  updateAttendance: async (queryOrId, body) => {
    try {
      const filter =
        typeof queryOrId === "string" ? { _id: queryOrId } : queryOrId;
      const updateAttendance = await Attendance.findOneAndUpdate(filter, body, {
        new: true,
      });
      if (!updateAttendance) {
        throw new ApiErrorHandler("Attendance record not found", 404);
      }
      return updateAttendance;
    } catch (error) {
      if (error instanceof ApiErrorHandler) {
        throw error;
      }
      console.error(error, "attendanceRepo.updateAttendance");
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  deleteAttendance: async (id) => {
    try {
      const deleteAttendance = await Attendance.findByIdAndDelete(id);
      if (!deleteAttendance) {
        throw new ApiErrorHandler(errMessage.delete, 500);
      }
      return deleteAttendance;
    } catch (error) {
      console.error(error, "attendanceRepo.deleteAttendance");
      throw new ApiErrorHandler(error.message, 500);
    }
  },
};

export default attendanceRepo;
