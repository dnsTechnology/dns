import { NavLink, useNavigate } from "react-router-dom";
import {
  HiX,
  HiHome,
  HiUser,
  HiCog,
  HiLogout,
  HiUserGroup,
} from "react-icons/hi";
import {
  BriefcaseBusiness,
  ListOrdered,
  PenSquare,
  PlusSquareIcon,
  ShieldQuestionIcon,
  ShoppingBag,
} from "lucide-react";
import { BiCategory, BiLogoProductHunt, BiSolidCategory } from "react-icons/bi";
import logo from "../../image/logo.png";
import { useLogoutMutation } from "../../redux/main.js";
import { toast } from "react-hot-toast";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (!confirm) return; // user canceled

    try {
      const response = await logout().unwrap(); // call the mutation
      console.log(response);
      if (response.success) {
        localStorage.removeItem("userInfo"); // remove token from local storage
        toast.success(response.message || "Logged out successfully"); // success toast
        navigate("/login"); // redirect to login page
      } else {
        toast.error(response.message || "Logout failed. Please try again."); // error toast
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.data?.message || "Logout failed. Please try again.");
    }
  };

  const links = [
    { to: "/admin", label: "Dashboard", icon: <HiHome className="w-5 h-5" /> },
    {
      to: "/admin/users",
      label: "Users",
      icon: <HiUser className="w-5 h-5" />,
    },

    {
      to: "/admin/blogs",
      label: "Blogs",
      icon: <PenSquare className="w-5 h-5" />,
    },
    {
      to: "/admin/blogs/category",
      label: "Blogs Category",
      icon: <BiCategory className="w-5 h-5" />,
    },

    {
      to: "/admin/products",
      label: "Products",
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      to: "/admin/product/new?type=create",
      label: "New Product",
      icon: <PlusSquareIcon className="w-5 h-5" />,
    },

    {
      to: "/admin/projects",
      label: "Projects",
      icon: <BiLogoProductHunt className="w-5 h-5" />,
    },
    {
      to: "/admin/project/new?type=create",
      label: "New Project",
      icon: <PlusSquareIcon className="w-5 h-5" />,
    },
    {
      to: "/admin/product/category",
      label: "Product Category",
      icon: <BiSolidCategory className="w-5 h-5" />,
    },
    {
      to: "/admin/orders",
      label: "Orders",
      icon: <ListOrdered className="w-5 h-5" />,
    },
    {
      to: "/admin/team",
      label: "Team Management",
      icon: <HiUserGroup className="w-5 h-5" />,
    },
    {
      to: "/admin/enquiries",
      label: "Enquiries",
      icon: <ShieldQuestionIcon className="w-5 h-5" />,
    },
    {
      to: "/admin/careers",
      label: "Career Management",
      icon: <BriefcaseBusiness className="w-5 h-5" />,
    },
    {
      to: "/admin/settings",
      label: "Settings",
      icon: <HiCog className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed top-0 left-0 h-screen w-full bg-opacity-30 z-20 transition-opacity md:hidden ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`
          fixed left-0 top-0 h-screen w-64 bg-white text-gray-800 shadow-sm z-30 transform
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex-shrink-0
          flex flex-col justify-between
        `}
      >
        <div>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="w-10 h-6 object-cover" />
              <span className="text-xl font-bold text-gray-800">
                Admin Panel
              </span>
            </div>
            <button
              className="md:hidden p-2 rounded hover:bg-gray-200"
              onClick={() => setSidebarOpen(false)}
            >
              <HiX className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col p-4 mt-4 gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 mb-1 rounded font-medium transition-colors
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            disabled={isLoading} // optional: disable while request is pending
            className="flex items-center gap-3 px-3 py-2 w-full rounded hover:bg-gray-100 text-red-600 font-medium"
          >
            <HiLogout className="w-5 h-5" />
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
}
