import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const AboutUs = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);

  const teamMembers = [
    {
      name: "John Smith",
      role: "Founder & CEO",
      image: "images.unsplash.com/photo-1560250097-0b93528c311a",
      description: "With over 20 years of experience in interior design and window treatments."
    },
    {
      name: "Sarah Johnson",
      role: "Design Director",
      image: "images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      description: "Award-winning designer specializing in custom window solutions."
    },
    {
      name: "Michael Brown",
      role: "Installation Manager",
      image: "images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      description: "Expert in professional installations and customer satisfaction."
    }
  ];

  const testimonials = [
    {
      name: "Emma Wilson",
      text: "The team transformed our home with beautiful custom curtains. Exceptional service!",
      rating: 5
    },
    {
      name: "David Clark",
      text: "Professional installation and amazing attention to detail. Highly recommended!",
      rating: 5
    },
    {
      name: "Lisa Thompson",
      text: "Outstanding quality and wonderful customer service. Will definitely use again!",
      rating: 5
    }
  ];

  const galleryImages = [
    "images.unsplash.com/photo-1513694203232-719a280e022f",
    "images.unsplash.com/photo-1513519245088-0e12902e5a38",
    "images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    "images.unsplash.com/photo-1519710164239-da123dc03ef4",
    "images.unsplash.com/photo-1513694203232-719a280e022f",
    "images.unsplash.com/photo-1513519245088-0e12902e5a38"
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f"
          alt="Elegant curtains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              Welcome to Elegant Drapes
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl"
            >
              Transforming Spaces with Stunning Window Treatments
            </motion.p>
          </div>
        </div>
      </div>

      {/* Company Introduction */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-8">Our Story</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center">
          Since 2000, Elegant Drapes has been transforming homes with exquisite window treatments. 
          Our commitment to quality, innovation, and customer satisfaction has made us a leader in 
          the industry. We take pride in offering personalized solutions that perfectly match our 
          clients' vision and lifestyle.
        </p>
      </motion.section>

      {/* Team Members */}
      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={`https://${member.image}`}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-blue-600 mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Custom Curtains",
              "Designer Blinds",
              "Motorized Solutions",
              "Professional Installation",
              "Fabric Selection",
              "Maintenance Services"
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold mb-4">{service}</h3>
                <p className="text-gray-600">
                  Professional solutions tailored to your specific needs and preferences.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Client Testimonials</h2>
          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: selectedTestimonial === index ? 1 : 0,
                    display: selectedTestimonial === index ? "block" : "none"
                  }}
                  className="bg-gray-50 p-8 rounded-lg text-center"
                >
                  <p className="text-xl italic mb-4">"{testimonial.text}"</p>
                  <p className="font-bold">{testimonial.name}</p>
                  <div className="flex justify-center mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-2xl">★</span>
                    ))}
                  </div>
                </motion.div>
              ))}
              <div className="flex justify-center mt-6 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTestimonial(index)}
                    className={`w-3 h-3 rounded-full ${
                      selectedTestimonial === index ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden group rounded-lg"
              >
                <img
                  src={`https://${image}`}
                  alt="Gallery item"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <p className="text-gray-600 mb-6">
                We'd love to hear from you. Please fill out the form below or reach out through our social media channels.
              </p>
              <div className="flex space-x-4 mb-8">
                <FaFacebook className="text-3xl text-blue-600 cursor-pointer" />
                <FaTwitter className="text-3xl text-blue-400 cursor-pointer" />
                <FaInstagram className="text-3xl text-pink-600 cursor-pointer" />
                <FaLinkedin className="text-3xl text-blue-700 cursor-pointer" />
              </div>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;