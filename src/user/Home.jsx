import React, { useEffect } from "react";
import {BsSearch,BsPencilSquare,BsFileEarmarkPdf} from "react-icons/bs";
import { AiOutlineDownload, AiOutlineRise, AiOutlineReload } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import "../../public/css/Home.css";
import { useNavigate } from "react-router";
import AutoTextChange from "./Text1";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const services = [
    {
      title: "Document Uploading",
      icon: <BsFileEarmarkPdf size={40} />,
      description: "Upload PDFs, images, and multiple file types easily.",
    },
    {
      title: "Form Data Management",
      icon: <BsPencilSquare size={40} />,
      description: "Store & manage user-submitted form data securely.",
    },
    {
      title: "Search & Filtering",
      icon: <BsSearch size={40} />,
      description: "Quickly find documents and form entries.",
    },
    {
      title: "Document Download",
      icon: <AiOutlineDownload size={40} />,
      description: "Download files uploaded by users instantly.",
    },
    {
      title: "Status Tracking",
      icon: <AiOutlineRise size={40} />,
      description: "Track submission status & updates instantly.",
    },
    {
      title: "Form Re-Submit System",
      icon: <AiOutlineReload size={40} />,
      description: "Users can resubmit forms with updated information.",
    },
  ];
const imageSections = [
  {
    title: "Document Uploading",
    description: "Upload and organize all your important documents securely Our system supports multiple file types including PDF, JPG and PNG.Files are stored in a secure cloud environment for full safety. Easily access, preview, and manage documents anytime."
    ,
    image: "/images/1.jpg",
  },
  {
    title: "Form Data Management",
    description: 
    "  Collect, store, and manage all form-submitted data seamlessly. Our automated backend ensures structured and clean data storageAdmins can review, edit, and export form submissions anytime.Advanced security keeps all user-submitted information safe.",
    image: "/images/2.jpg",
  },
  {
    title: "Search & Filtering",
    description: "Quickly search through thousands of documents using smart filters. Real-time results help you find important files in seconds. Multiple filtering options such as name, date, and category. A fully optimized system ensures instant and accurate searching.",
    image: "/images/3.jpg",
  },
  {
    title: "Document Download",
    description: " Download documents instantly with our fast retrieval system. Users can download single or multiple files in one click. System supports PDF, images, and all standard file formats. Smooth downloading experience with secure access handling.",
    image: "/images/5.jpg",
  },
];



  return (
    <>
      {/* HERO SECTION */}
      <section className="stats-section">
        <div className="container-center">
          <h1 className="hero-title">Welcome to Form Manager</h1>
          <AutoTextChange/>
          <p className="hero-subtitle">
            Manage, store, and track documents and forms effortlessly.
          </p>

          <button className="hero-btn" onClick={() => navigate("/submit")}>
            Get Started
          </button>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-5">
        <div className="container-center">
          <h2 className="text-center fw-bold mb-5 text-primary">System Features</h2>
          <div className="row g-4">
            {services.map((service, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-4" data-aos="fade-up">
                <div className="service-card shadow-sm p-4 text-center h-100">
                  <div className="service-icon">{service.icon}</div>
                  <h4 className="fw-bold mt-3 text-dark">{service.title}</h4>
                  <p className="text-secondary mt-2">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE SECTIONS */}
      {imageSections.map((section, i) => (
        <section className="py-5 image-section" key={i}>
          <div className="container-center">
            <div className="row align-items-center gy-4">
              <div className={`col-md-6 ${i % 2 !== 0 ? "order-md-2" : ""}`} data-aos="fade-right">
                <img src={section.image} alt={section.title} className="img-fluid rounded shadow" />
              </div>
              <div className={`col-md-6 ${i % 2 !== 0 ? "order-md-1" : ""}`} data-aos="fade-left">
                <h2 className="fw-bold mb-3">{section.title}</h2>
                <p className="text-secondary">{section.description}</p>
              </div>
            </div>
          </div>
        </section>
      ))}
  
      {/* STATS SECTION */}
      <section className="stats-section text-white text-center py-5">
        <div className="container-center">
          <div className="row gy-4">
            <div className="col-12 col-md-4">
              <h2><CountUp end={10000} duration={3} separator="," />+</h2>
              <p>Documents Stored</p>
            </div>
            <div className="col-12 col-md-4">
              <h2><CountUp end={5000} duration={3} separator="," />+</h2>
              <p>Forms Submitted</p>
            </div>
            <div className="col-12 col-md-4">
              <h2><CountUp end={99.9} decimals={1} duration={3} />%</h2>
              <p>System Uptime</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
