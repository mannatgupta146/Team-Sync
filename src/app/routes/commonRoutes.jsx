import Chats from "../../features/chats/ui/pages/Chats";
import Dashboard from "../../features/dashboard/ui/pages/Dashboard";
import Settings from "../../features/settings/ui/pages/Settings";
import Attendance from "../../features/employee module/Attendance/ui/pages/Attendance";
import MyTask from "../../features/employee module/MyTask/ui/pages/MyTask";
import Profile from "../../features/employee module/Profile/ui/pages/Profile";
import Department from "../../features/admin module/departments/ui/pages/Department";
import Document from "../../features/admin module/documents/ui/pages/Document";
import Employee from "../../features/admin module/employees/ui/pages/Employee";
import Tasks from "../../features/admin module/tasks/ui/pages/Tasks";

export const commonRoutes = [
    {
        path: "",
        element: <Dashboard />,
    },
    {
        path: "chats",
        element: <Chats />
    },
    {
        path: "settings",
        element: <Settings />
    },
    {
        path: "myTask",
        element: <MyTask />
    },
    {
        path: "attendance",
        element: <Attendance />
    },
    {
        path: "profile",
        element: <Profile />
    },
    {
        path: "tasks",
        element: <Tasks />
    },
    {
        path: "department",
        element: <Department />
    },
    {
        path: "employee",
        element: <Employee />
    },
    {
        path: "document",
        element: <Document />
    }
]