import Department from "../../features/admin module/departments/ui/pages/Department";
import Document from "../../features/admin module/documents/ui/pages/Document";
import Employee from "../../features/admin module/employees/ui/pages/Employee";
import Tasks from "../../features/admin module/tasks/ui/pages/Tasks";

export const adminRoutes = [
    {
        path: "/home/employee",
        element: <Employee />
    },
    {
        path: "/home/department",
        element: <Department />
    },
    {
        path: "/home/tasks",
        element: <Tasks />
    },
    {
        path: "/home/document",
        element: <Document />
    }
]
