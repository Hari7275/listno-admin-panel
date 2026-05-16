import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  UserCheck,
  Video,
  CreditCard,
  FileText,
  Layers,
  BarChart3,
  Bell,
  Mail,
  MessageSquare,
  Settings,
  LogOut,
  Globe,
  Activity,
  DollarSign,
  Shield,
  ChevronDown,
  ChevronRight,
  Headphones,
  BookOpen,
  Wallet,
  Flame,
  Gift,
  SlidersVertical,
  Tag,
  TrendingUp,
  Sparkle,
} from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/adminPanel/dashboard" },
    {
      name: "Listener Management",
      icon: Headphones,
      subItems: [
        {
          name: "Listeners & Approvals",
          icon: UserCheck,
          path: "/adminPanel/listenerManagement/listenerApprovals",
          badge: "2",
        },
        {
          name: "Live Monitoring",
          icon: Activity,
          path: "/adminPanel/listenerManagement/liveMonitoring",
        },
        {
          name: "Daily Performance",
          icon: BarChart3,
          path: "/adminPanel/listenerManagement/dailyPerformance",
        },
        {
          name: "Earnings & Payouts",
          icon: DollarSign,
          path: "/adminPanel/listenerManagement/earnings",
        },
        {
          name: "Moderation",
          icon: Shield,
          path: "/adminPanel/listenerManagement/moderation",
        },
      ],
    },

    {
      name: "Creator Console",
      icon: Sparkle,
      subItems: [
       {
          name: "My Dashboard",
          icon: LayoutDashboard,
          path: "/adminPanel/creatorConsole/myDashboard",
        },

       {
          name: "My Referrals",
          icon: Users,
          path: "/adminPanel/creatorConsole/myReferrals",
        },

         {
          name: "Earnings & Payouts",
          icon: Wallet,
          path: "/adminPanel/creatorConsole/earnings",
        },
         {
          name: "Settings",
          icon: Settings,
          path: "/adminPanel/creatorConsole/settings",
        },

      ],

    },

    {
      name: "Offers",
      icon: Flame,
      subItems: [
       {
          name: "Offers Dashboard",
          icon: LayoutDashboard,
          path: "/adminPanel/Offers/dashboard",
        },

       {
          name: "Offer Management",
          icon: Gift,
          path: "/adminPanel/Offers/offerManagement",
        },

         {
          name: "Rule Engine",
          icon: SlidersVertical,
          path: "/adminPanel/Offers/ruleEngine",
        },
         {
          name: "Listener Pricing",
          icon: Tag,
          path: "/adminPanel/Offers/listenerPricing",
        },

         {
          name: "Subscription",
          icon: CreditCard,
          path: "/adminPanel/Offers/subscription",
        },
         {
          name: "User Insights",
          icon: TrendingUp,
          path: "/adminPanel/Offers/userInsights",
        },
      ],

    },


    { name: "Users", icon: Users, path: "/adminPanel/users" },
    { name: "Coaches", icon: UserCheck, path: "/adminPanel/coaches" },
     { name: "Knowledge Center", icon: BookOpen, path: "/adminPanel/knowledgeCenter" },
    { name: "Sessions", icon: Video, path: "/adminPanel/sessions" },
    { name: "Payments", icon: CreditCard, path: "/adminPanel/payments" },
    { name: "Content", icon: FileText, path: "/adminPanel/content" },
    { name: "Categories", icon: Layers, path: "/adminPanel/categories" },
    { name: "Analytics", icon: BarChart3, path: "/adminPanel/analytics" },
    { name: "Notifications", icon: Bell, path: "/adminPanel/notifications" },
    { name: "Emails", icon: Mail, path: "/adminPanel/emails" },
    { name: "Messages", icon: MessageSquare, path: "/adminPanel/messages" },
    { name: "Settings", icon: Settings, path: "/adminPanel/settings" },
  ];

  return (
    <div className="flex h-screen bg-[#f6f7fb]">
      {/* Sidebar */}
      <div className="w-[280px] bg-white shadow-md flex flex-col justify-between">
        <div className="overflow-y-auto no-scrollbar pb-6">
          {/* Logo */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
              <Headphones size={20} />
            </div>
            <h2 className="font-semibold text-[16px] text-gray-800">
              Listeno Admin
            </h2>
          </div>

          {/* Menu */}
          <div className="px-3 space-y-1">
            {menu.map((item, i) => {
              const Icon = item.icon;
              const hasSubItems = !!item.subItems;
              const isOpen = openMenus[item.name];

              if (hasSubItems) {
                return (
                  <div key={i} className="mb-2">
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-600 hover:bg-[#eef2f7] transition"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span className="text-[14px] font-medium">
                          {item.name}
                        </span>
                      </div>
                      {isOpen ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>

                    {isOpen && (
                      <div className="mt-1 space-y-1 pl-2">
                        {item.subItems.map((sub, j) => {
                          const SubIcon = sub.icon;
                          const isActive = pathname === sub.path;

                          return (
                            <button
                              key={j}
                              onClick={() => navigate(sub.path)}
                              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition
                              ${
                                isActive
                                  ? "bg-[#fbf9ff] text-purple-700 font-medium border-l-4 border-purple-600"
                                  : "text-gray-600 hover:bg-[#eef2f7] border-l-4 border-transparent"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <SubIcon size={17} />
                                <span className="text-[13.5px]">
                                  {sub.name}
                                </span>
                              </div>

                              {sub.badge && (
                                <span className="bg-[#fff8cc] text-[#b48811] text-[11px] font-bold px-2 py-0.5 rounded-full">
                                  {sub.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === item.path;

              return (
                <button
                  key={i}
                  onClick={() => item.path && navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition
                  ${
                    isActive
                      ? "bg-[#fbf9ff] text-purple-700 font-medium border-l-4 border-purple-600"
                      : "text-gray-600 hover:bg-[#eef2f7] border-l-4 border-transparent"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-[14px] font-medium">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom */}
        <div className="p-5 space-y-3 border-t border-gray-100">
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition">
            <Globe size={18} />
            <span className="text-[14px] font-medium">
              Switch to Website
            </span>
          </button>

          <div className="flex items-center justify-between px-2 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#e2e8f0] flex items-center justify-center font-bold text-gray-700">
                A
              </div>
              <div>
                <p className="text-[14px] font-medium text-gray-800">
                  Admin User
                </p>
                <p className="text-[12px] text-gray-500">Superadmin</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-red-500 transition">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-9 overflow-y-auto">
        <Outlet/>
      </div>
    </div>
  );
}