import Chats from "../../features/chats/ui/pages/Chats";
import Dashboard from "../../features/dashboard/ui/pages/Dashboard";
import Settings from "../../features/settings/ui/pages/Settings";

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
    }
]