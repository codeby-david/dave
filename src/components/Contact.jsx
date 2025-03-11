import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      // Basic email validation
      if (!/\S+@\S+\.\S+/.test(form.email)) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
      }

      try {
        await emailjs.send(
          import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
          {
            from_name: form.name,
            to_name: "My Website",
            from_email: form.email,
            to_email: "davidgatheru51@gmail.com",
            message: form.message,
          },
          import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
        );

        setLoading(false);
        // Show a success toast notification
        toast.success("Thank you! I will get back to you as soon as possible.", {
          position: "bottom-right", // Change position to bottom-right
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setForm({ name: "", email: "", message: "" });
      } catch (err) {
        setLoading(false);
        setError("Ahh, something went wrong. Please try again.");
        console.error(err);
      }
    },
    [form]
  );

  const { name, email, message } = form;

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
        style={{ willChange: "transform" }} // Hint browser for smoother animations
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
          aria-labelledby='contact-form'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              required
              aria-required='true'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Email</span>
            <input
              type='email'
              name='email'
              value={email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              required
              aria-required='true'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              required
              aria-required='true'
            />
          </label>

          {error && (
            <p className='text-red-500 text-sm mt-2' aria-live='polite'>
              {error}
            </p>
          )}

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
            disabled={loading}
            aria-label={loading ? "Sending message..." : "Send message"}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
        style={{ willChange: "transform" }} // Hint browser for smoother animations
      >
        <EarthCanvas />
      </motion.div>

      {/* Toast Container */}
      <ToastContainer
        position="bottom-right" // Change position to bottom-right
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="custom-toast" // Add custom class for styling
        bodyClassName="custom-toast-body" // Add custom class for styling
      />
    </div>
  );
};

export default SectionWrapper(Contact, "contact");