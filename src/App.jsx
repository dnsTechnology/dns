// App.js
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "./component/scrolltotop.jsx";

// Public Components
import Home from "./component/home";
import About from "./component/about";
import Products from "./component/products";
import Services from "./component/services";
import Contact from "./component/contact";
import Portfolio from "./component/portfolio";
import Nav from "./component/nav";
import Footer from "./component/footer";
import Homehero from "./component/homehero";
import NotFound from "./component/not-found";
import Eg from "./component/services.jsx";
import Servicedetailed from "./component/servicedetailed";
import Liscence from "./component/liscence.jsx";
import Blogs from "./component/blogs.jsx";
import Blogdetail from "./component/blogdetail.jsx";

// Admin Components
import AdminLayout from "./component/admin/AdminLayout.jsx";
import Dashboard from "./pages/admin.jsx";
import Users from "./component/admin/users.jsx";
import Setting from "./component/admin/Setting.jsx";
import Blog from "./component/admin/Blog.js";
import Newblog from "./component/admin/Newblog.jsx";
import BlogCategory from "./component/admin/BlogCategory.jsx";
import Login from "./component/admin/Login.jsx";
import ProtectedRoute from "./component/middleware/ProtectedRoute.jsx";
import ProductCategory from "./component/admin/Product/ProductCategory.jsx";
import ProductsAll from "./component/admin/Product/ProductsAll.jsx";
import ProductDetails from "./component/ProductDetails.jsx";
import NewProduct from "./component/admin/Product/NewProduct.jsx";
import Team from "./component/admin/Team.jsx";
import BookingForm from "./component/ProductBook.jsx";
import Order from "./component/admin/Order.jsx";
import Enquiries from "./component/admin/Enquiries.jsx";
import EnquiryDetail from "./component/admin/EnquiryDetail.jsx";
import OrderDetails from "./component/admin/OrderDetails.jsx";
import NewProject from "./component/admin/Project/NewProject.jsx";
import ProjectsAll from "./component/admin/Project/ProjectsAll.jsx";
import ProjectDetail from "./component/admin/ProjectDetail.jsx";
import Careers from "./component/careers.jsx";
import CareerManagement from "./component/admin/carrier/CareerManagement.jsx";
import JobsCategories from "./component/admin/carrier/JobsCategories.jsx";
import JobsCreation from "./component/admin/carrier/JobsCreation.jsx";
import JobDetail from "./component/JobDetail.jsx";
import ApplicationProcessForjob from "./component/ApplicationProcessForjob.jsx";

import ApplicationFinished from "./component/ApplicationFinished.jsx";
import AllApplications from "./component/admin/carrier/AllApplications.jsx";

// Wrapper to handle Footer visibility
function AppWrapper() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!hideFooter && <Nav />}
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/product/:id" element={<BookingForm />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/liscence" element={<Liscence />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/homehero" element={<Homehero />} />
        <Route path="/eg" element={<Eg />} />
        <Route path="/svc" element={<Servicedetailed />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:id" element={<JobDetail />} />
        <Route path="/careers/apply/done" element={<ApplicationFinished />} />
        <Route
          path="/careers/apply/:id"
          element={<ApplicationProcessForjob />}
        />
        <Route path="/blogdetail/:id" element={<Blogdetail />} />
        <Route path="/portfolio/project/:id" element={<ProjectDetail />} />
        <Route path="/login" element={<Login />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Setting />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="products" element={<ProductsAll />} />
          <Route path="careers" element={<CareerManagement />} />
          <Route path="careers/new" element={<JobsCreation />} />
          <Route
            path="careers/applications/:id"
            element={<AllApplications />}
          />
          <Route path="careers/categories" element={<JobsCategories />} />
          <Route path="product/category" element={<ProductCategory />} />
          <Route path="blogs/category" element={<BlogCategory />} />
          <Route path="blogs/new" element={<Newblog />} />
          <Route path="product/new" element={<NewProduct />} />
          <Route path="projects" element={<ProjectsAll />} />
          <Route path="project/new" element={<NewProject />} />
          <Route path="team" element={<Team />} />
          <Route path="orders" element={<Order />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<EnquiryDetail />} />
        </Route>

        {/* ================= NOT FOUND ================= */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}

// Main App
export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
