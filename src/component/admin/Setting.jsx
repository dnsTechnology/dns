import React from "react";
import { User, Settings, Bell } from "lucide-react";

const Setting = () => {
  const settingsOptions = [
    { icon: <User size={18} />, title: "Profile", description: "Update your profile info" },
    { icon: <Settings size={18} />, title: "Account", description: "Manage account settings" },
    { icon: <Bell size={18} />, title: "Notifications", description: "Manage notification preferences" },
  ];

  return (
    <div className="p-6 bg-white text-gray-900">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <div className="flex flex-col gap-4">
        {settingsOptions.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 border border-gray-300 cursor-pointer hover:bg-gray-100"
          >
            <div>{item.icon}</div>
            <div className="flex flex-col">
              <span className="font-medium">{item.title}</span>
              <span className="text-sm text-gray-600">{item.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Setting;
