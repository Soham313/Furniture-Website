import { useState } from "react";
import emailjs from "@emailjs/browser"; // Import EmailJS
import "./contactus.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  // Email validation
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Phone validation (10 digits)
  const validatePhone = (phone) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate email and phone
    if (name === "email") {
      setErrors({
        ...errors,
        email: value && !validateEmail(value) ? "Invalid Email" : "",
      });
    }
    if (name === "phone") {
      setErrors({
        ...errors,
        phone: value && !validatePhone(value) ? "Phone must be 10 digits" : "",
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and phone before submitting
    if (!validateEmail(formData.email) || !validatePhone(formData.phone)) {
      alert("Please fix errors before submitting.");
      return;
    }

    // EmailJS service ID, template ID, and public key
    const serviceID = "service_0g2ffoj"; // Replace with your EmailJS service ID
    const templateID = "template_7ryugt4"; // Replace with your EmailJS template ID
    const publicKey = "zCtE7K3GFJsGmiO6K"; // Replace with your EmailJS public key

    try {
      // Send email using EmailJS
      await emailjs.send(serviceID, templateID, formData, publicKey);

      // Success message
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="contact-page" id="contact-page">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>📍 Location: 123 Furniture St, City, Country</p>
          <p>📞 Phone: +91 74149799**</p>
          <p>📧 Email: sohambhalerao317@gmail.com</p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-group">
            <input
              type="text"
              name="phone"
              placeholder="Your Phone (10 digits)"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <div className="input-group">
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
