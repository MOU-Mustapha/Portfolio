import React, { useState, useEffect } from "react";
import "./Skills.css";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import AppWrap from "../../wrapper/AppWrap.js";
import { client, urlFor } from "../../client.js";
import MotionWrap from "../../wrapper/MotionWrap";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  useEffect(() => {
    const experienceQuery = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';
    client.fetch(experienceQuery).then((data) => setExperiences(data));
    client.fetch(skillsQuery).then((data) => setSkills(data));
  }, []);
  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>
      <div className="app-skills-container">
        <motion.div className="app-skills-list">
          {skills?.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app-skills-item app-flex"
              key={skill.name}
            >
              <div
                className="app-flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.imgUrl)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="app-skills-exp">
          {experiences?.map((experience) => (
            <motion.div className="app-skills-exp-item" key={experience.year}>
              <div className="app-skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app-skills-exp-works">
                {experience.works.map((work) => (
                  <>
                    <motion.div
                      key={work.name}
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app-skills-exp-work"
                      data-tooltip-id={work.name}
                      data-tooltip-content={work.desc}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <Tooltip id={work.name} className="skills-tooltip" />
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app-skills app-flex"),
  "skills",
  "app-white-bg"
);
