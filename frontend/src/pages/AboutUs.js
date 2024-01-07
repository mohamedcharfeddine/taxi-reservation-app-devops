import About from "@/components/About/About";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";

const AboutUs = () => {
  return (
    <div className="xl:mt-36 mt-36">
      <InView triggerOnce>
        {({ inView, ref }) => (
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <About />
          </motion.div>
        )}
      </InView>
    </div>
  );
};

export default AboutUs;
