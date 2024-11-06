import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Light = ({ color, isActive, onClick, clickCount }) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0.5 }}
      animate={{
        opacity: isActive ? [1, 0.3, 1, 0.3, 1] : 0.5,  
        scale: isActive ? [1, 1.2, 1] : 1, 
      }}
      transition={{
        duration: 1,  
        ease: "easeInOut",
        repeat: isActive ? Infinity : 0, 
      }}
      style={{
        backgroundColor: color,
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        margin: "10px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        color: "white",
        boxShadow: isActive ? "0px 0px 20px 10px rgba(255,255,255,0.7)" : "none",
      }}
    >
      {clickCount} {/* Лічильник натискань */}
    </motion.div>
  );
};

Light.propTypes = {
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  clickCount: PropTypes.number.isRequired,
};

export default Light;
