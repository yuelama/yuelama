import { Outlet, Link, useLocation } from "react-router";
import { Calendar, FileText, User } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "课程预约", icon: Calendar },
    { path: "/orders", label: "我的订单", icon: FileText },
    { path: "/profile", label: "个人资料", icon: User },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
      {/* 主内容区域 */}
      <main className="flex-1 overflow-y-auto pb-16">
        <Outlet />
      </main>

      {/* 底部导航栏 */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 safe-area-inset-bottom">
        <div className="flex justify-around items-center h-16">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
