import MyTask from "../../features/employee module/MyTask/ui/pages/MyTask";
import Attendance from "../../features/employee module/Attendance/ui/pages/Attendance";
import Profile from "../../features/employee module/Profile/ui/pages/Profile";

export const employeeRoutes = [
    {
        path: "/home/myTask",
        element: <MyTask />
    },
    {
        path: "/home/attendance",
        element: <Attendance />
    },
    {
        path: "/home/profile",
        element: <Profile />
    }
]
