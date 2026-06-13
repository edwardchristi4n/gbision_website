import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import Home from "@/pages/public/Home";
import About from "@/pages/public/About";
import Programs from "@/pages/public/Programs";
import Schedule from "@/pages/public/Schedule";
import Gallery from "@/pages/public/Gallery";
import Blog from "@/pages/public/Blog";
import Announcements from "@/pages/public/Announcements";
import Contact from "@/pages/public/Contact";
import AdminLogin from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import ManagePrograms from "@/pages/admin/ManagePrograms";
import ManageBlog from "@/pages/admin/ManageBlog";
import ManageGallery from "@/pages/admin/ManageGallery";
import ManagePastors from "@/pages/admin/ManagePastors";
import ManageSchedule from "@/pages/admin/ManageSchedule";
import ManageAnnouncements from "@/pages/admin/ManageAnnouncements";
import ManageUsers from "@/pages/admin/ManageUsers";
import Pastors from "@/pages/public/Pastors";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tentang" element={<About />} />
          <Route path="/pendeta" element={<Pastors />} />
          <Route path="/program" element={<Programs />} />
          <Route path="/jadwal" element={<Schedule />} />
          <Route path="/galeri" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pengumuman" element={<Announcements />} />
          <Route path="/kontak" element={<Contact />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/program" element={<ManagePrograms />} />
            <Route path="/admin/blog" element={<ManageBlog />} />
            <Route path="/admin/galeri" element={<ManageGallery />} />
            <Route path="/admin/pendeta" element={<ManagePastors />} />
            <Route path="/admin/jadwal" element={<ManageSchedule />} />
            <Route path="/admin/pengumuman" element={<ManageAnnouncements />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
