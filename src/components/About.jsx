import React, { memo } from "react";
import { motion } from "framer-motion";
//import { Tilt } from "react-parallax-tilt"; // Assuming you're using react-parallax-tilt
import Tilt from "react-parallax-tilt";
import mypic from "../assets/mypic.png"; // Import your photo

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// Memoized ServiceCard to prevent unnecessary re-renders
const ServiceCard = memo(({ index, title, icon }) => (
  <Tilt
    tiltMaxAngleX={45}
    tiltMaxAngleY={45}
    scale={1}
    transitionSpeed={450}
    className='xs:w-[250px] w-full'
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      style={{ willChange: "transform, opacity" }} // Hint browser for smoother animations
    >
      <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
        <img
          src={icon}
          alt={title}
          className='w-16 h-16 object-contain'
          loading='lazy' // Lazy load images
        />
        <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
      </div>
    </motion.div>
  </Tilt>
));

const About = () => {
  return (
    <>
      {/* Introduction Section */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      {/* About Content with Photo */}
      <div className='flex flex-col lg:flex-row items-center gap-10 mt-10'>
        {/* Photo Section */}
        <motion.div
          variants={fadeIn("right", "tween", 0.2, 1)}
          className='flex-1 flex justify-center'
        >
          <img
            src={mypic} // Your photo
            alt='My Photo'
            className='w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full object-cover border-4 border-secondary shadow-lg'
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          variants={fadeIn("left", "tween", 0.2, 1)}
          className='flex-1'
        >
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className='text-secondary text-[17px] max-w-3xl leading-[30px]'
          >
            I'm a skilled software developer with experience in TypeScript and
            JavaScript, and expertise in frameworks like React, Node.js, and
            Three.js. I'm a quick learner and collaborate closely with clients to
            create efficient, scalable, and user-friendly solutions that solve
            real-world problems. Let's work together to bring your ideas to life!
          </motion.p>
        </motion.div>
      </div>

      {/* Services Section */}
      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");