import HoursRegistration from "@/components/HoursRegistration";
import AttendanceStatus from "@/components/AttendanceStatus";

export default function HoursAndAttendance() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <HoursRegistration />
      <AttendanceStatus />
    </div>
  );
}
