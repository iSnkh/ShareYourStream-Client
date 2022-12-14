import { Navigate, RouteObject } from "react-router"

import DashboardPage from "@/pages/dashboard"
import DashboardHomePage from "@/pages/dashboard/DashboardHomePage"
import ProfilePage from "@/pages/dashboard/profile"
import ProfileOverview from "@/pages/dashboard/profile/ProfileOverview"
import StreamHistoryPage from "@/pages/dashboard/streams/StreamHistoryPage"
import ExportSavedPage from "@/pages/dashboard/tools/exportSaved/ExportSavedPage"
import ToolsPage from "@/pages/dashboard/tools/ToolsPage"
import DashboardErrorPage from "@/pages/dashboard/utils/DashboardErrorPage"

import Path from "@/routes/paths"


const DashboardRouter: RouteObject[] = [
    {
        path: Path.Dashboard.Root,
        element: <DashboardPage />,
        errorElement: <DashboardErrorPage />,
        children: [
            { index: true, element: <DashboardHomePage />, handle: { title: "Home" } },
            { 
                path: Path.Dashboard.Profile.Root, 
                element: <ProfilePage />,
                
                children: [
                    { index: true, element: <Navigate to="@me" /> },
                    { path: Path.Dashboard.Profile.Me, element: <ProfileOverview />, handle: { title: "Profile • Overview" }}
                ] 
            },
            {
                path: Path.Dashboard.Tools.Root, 
                children: [
                    { index: true, element: <ToolsPage /> },
                    { path: Path.Dashboard.Tools.ExportSaved, element: <ExportSavedPage /> },
                ]
            },
            { path: Path.Dashboard.Streams.History, element: <StreamHistoryPage /> }
        ]
    }
]

export default DashboardRouter;