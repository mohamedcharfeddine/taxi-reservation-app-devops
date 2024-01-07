import { motion } from "framer-motion";
const Reveal = ({ children, className, variants, transition }) => {
  return (
    <motion.div
      className={`${className}`}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
