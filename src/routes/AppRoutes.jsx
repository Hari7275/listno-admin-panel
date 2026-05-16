import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
//import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
//import Dashboard from "../pages/adminPanel/page";
import UserManagement from "../pages/adminPanel/users";
import ContentPage from "../pages/adminPanel/content";
import DashboradPage from "../pages/adminPanel/dashboard";
import ModerationPage from "../pages/adminPanel/listenerManagement/moderation";
import LiveMonitoringPage from "../pages/adminPanel/listenerManagement/liveMonitoring";
import DailyPerformancePage from "../pages/adminPanel/listenerManagement/dailyPerformance";
import EarningsPayoutsPage from "../pages/adminPanel/listenerManagement/earnings";
import ListenerApprovalsPage from "../pages/adminPanel/listenerManagement/listenerApprovals";
import ListenerProfile from "../pages/adminPanel/listenerManagement/Listeners";
import KnowledgeCenter from "../pages/adminPanel/knowledgeCenter";
import AdminLayout from "../components/AdminLayout";
import DashboardContent from "../pages/adminPanel/creatorConsole/myDashboard";
import ReferralPage from "../pages/adminPanel/creatorConsole/myReferrals";
import ReferralDashboard from "../pages/adminPanel/creatorConsole/myReferrals";
import OffersDashboard from "../pages/adminPanel/Offers/dashboard";
import OfferManagement from "../pages/adminPanel/Offers/offerManagement";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoute />}>
<Route path="/adminPanel" element={<AdminLayout />}>
<Route index element={<DashboradPage />} />
<Route path="dashboard" element={<DashboradPage />} />

<Route path="listenerManagement">
             <Route path="listenerApprovals" element={<ListenerApprovalsPage/>} />
             <Route path="liveMonitoring" element={<LiveMonitoringPage/>} />
             <Route path="dailyPerformance" element={<DailyPerformancePage/>} />
             <Route path="earnings" element={<EarningsPayoutsPage/>} />
             <Route path="moderation" element={<ModerationPage/>} />

    <Route path="listeners/:coachId" element={<ListenerProfile />} />

          </Route>

          <Route path="creatorConsole">
              <Route path="myDashboard" element={<DashboardContent/>} />
              <Route path="myReferrals" element={<ReferralDashboard/>} />
              <Route path="earnings" element={<div>Creator Earnings</div>} />
              <Route path="settings" element={<div>Creator Settings</div>} />
            </Route>"

              <Route path="Offers">
              <Route path="dashboard" element={<OffersDashboard/>} />
              <Route path="offerManagement" element={<OfferManagement/>} />
              <Route path="ruleEngine" element={<div>Rule Engine</div>} />
              <Route path="listenerPricing" element={<div>Listener Pricing</div>} />
              <Route path="subscription" element={<div>Subscription</div>} />
              <Route path="userInsights" element={<div>User Insights</div>} />
            </Route>"



          <Route path="users" element={<UserManagement />} />
          <Route path="knowledgeCenter" element={<KnowledgeCenter />} />
          <Route path="coaches" element={<div>Coaches Page</div>} />
          <Route path="sessions" element={<div>Sessions Page</div>} />
          <Route path="payments" element={<div>Payments Page</div>} />
          <Route path="content" element={<ContentPage/>} />
          <Route path="categories" element={<div>Categories Page</div>} />
          <Route path="analytics" element={<div>Analytics Page</div>} />
          <Route path="notifications" element={<div>Notifications Page</div>} />
          <Route path="emails" element={<div>Emails Page</div>} />
          <Route path="messages" element={<div>Messages Page</div>} />
          <Route path="settings" element={<div>Settings Page</div>} />

  </Route>
      </Route>

      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center text-gray-500">
            404 — Not Found
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
