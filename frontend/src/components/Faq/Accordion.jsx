import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const Accordion = ({ id, title, content }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  return (
    <div className={`border-b border-black`}>
      <button
        aria-label="submit"
        type="button"
        className={`flex justify-between w-full py-8 text-left ${
          isActive ? "relative" : ""
        }`}
        onClick={toggleAccordion}
      >
        <span
          className={`font-bold text-xl text-dark w-3/5 md:h-[80px] sm:h-[70px] ${
            isActive ? "text-dark" : ""
          }`}
        >
          {title}
        </span>
        {isActive ? (
          <AiOutlineMinus size={24} className="text-primary" />
        ) : (
          <AiOutlinePlus size={24} className="text-primary" />
        )}
      </button>
      {isActive && <div className="py-5">{content}</div>}
    </div>
  );
};

export default Accordion;
