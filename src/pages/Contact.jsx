import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert("Form submitted successfully!");
        setFormData({ fullName: "", email: "", phone: "", message: "" });
      } catch (error) {
        alert("An error occurred. Please try again.");
      }
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - Contact Information */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Get in Touch</h1>
              <p className="text-lg opacity-80">
                We would love to hear from you. Send us a message and we will respond as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <FaPhone className="text-2xl text-blue-600" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-2xl text-blue-600" />
                <span>contact@example.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-2xl text-blue-600" />
                <span>123 Business Street, Tech City, TC 12345</span>
              </div>
            </div>

            <div className="flex space-x-6">
              <FaLinkedin className="text-3xl hover:text-blue-600 transition-colors cursor-pointer" />
              <FaTwitter className="text-3xl hover:text-blue-400 transition-colors cursor-pointer" />
              <FaGithub className="text-3xl hover:text-gray-600 transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                  placeholder="Full Name"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                  placeholder="Email Address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                  placeholder="Phone Number (Optional)"
                />
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                  placeholder="Your Message"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg bg-blue-600 text-white font-semibold
                  ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"}
                  transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        <div className="fixed top-4 right-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors"
          >
            {isDarkMode ? "🌞" : "🌙"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;