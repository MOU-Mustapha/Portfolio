import React, { useState, useEffect } from "react";
import "./Testimonial.css";
import { motion } from "framer-motion";
import AppWrap from "../../wrapper/AppWrap.js";
import { client, urlFor } from "../../client.js";
import MotionWrap from "../../wrapper/MotionWrap";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Testimonial = () => {
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const brandsQuery = '*[_type == "brands"]';
    const testimonialsQuery = '*[_type == "testimonials"]';
    client.fetch(brandsQuery).then((data) => setBrands(data));
    client.fetch(testimonialsQuery).then((data) => setTestimonials(data));
  }, []);
  const handleClick = (index) => {
    setCurrentIndex(index);
  };
  return (
    <>
      {testimonials.length && (
        <>
          <div className="app-testimonial-item app-flex">
            <img
              src={urlFor(testimonials[currentIndex].imgUrl)}
              alt="testimonial"
            />
            <div className="app-testimonial-content">
              <p className="p-text">{testimonials[currentIndex].feedback}</p>
              <div>
                <h4 className="bold-text">{testimonials[currentIndex].name}</h4>
                <h5 className="p-text">{testimonials[currentIndex].company}</h5>
              </div>
            </div>
          </div>
          <div className="app-testimonial-btns app-flex">
            <div
              className="app-flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>
            <div
              className="app-flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}
      <div className="app-testimonial-brands app-flex">
        {brands?.map((brand, index) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={index}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, "app-testimonial app-flex"),
  "testimonials",
  "app-primary-bg"
);
