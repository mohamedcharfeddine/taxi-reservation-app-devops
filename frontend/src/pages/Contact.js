import { useState } from "react";
import { BiPhoneCall, BiUserCircle } from "react-icons/bi";
import { SiGooglepodcasts } from "react-icons/si";
import { createMessage } from "./api/appConfig";
import { useTranslation } from "next-i18next";

const Contact = () => {
  const { t } = useTranslation("common");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createMessage(formData);

      setSuccessMessage("Message sent successfully");
      setErrorMessage("");
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      console.error(error);
      setSuccessMessage("");
      setErrorMessage("Failed to send message");
    }
  };

  return (
    <div className="xl:mt-40 mt-32">
      <div className="w-full flex flex-row items-center justify-center gap-4 ">
        <SiGooglepodcasts size={32} />
        <span className="text-4xl font-bold">{t("contactHedding")}</span>
      </div>

      <div className="w-full flex flex-col sm:flex-row mt-11 justify-around">
        <div className="flex flex-col justify-center items-center  gap-6">
          <span className="font-bold text-2xl">{t("Onze Tarienven")}</span>
          <p className="max-w-[380px] text-[20px]">{t("contactContent")}</p>
        </div>
        <form
          className=" w-3/4 xl:w-2/4 mx-12 xl:-ml-10 font-medium text-base/loose text-secondary "
          onSubmit={handleSubmit}
        >
          <div className="grid md:grid-cols-2 md:gap-4">
            <div className="relative z-0 w-full mb-6 group">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block font-normal py-3 px-3 w-full text-sm text-gray-900 bg-primary rounded-lg border-0 border-b-2 border-gray-300 appearance-none peer"
                  placeholder="Your Name"
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >
                  Your Name
                </label>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <BiUserCircle size={24} color="Black" />
                </div>
              </div>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <div className="relative">
                <input
                  type="text"
                  name="phoneNumber"
                  id="phonenumber"
                  className="block font-normal py-3 px-3 w-full text-sm text-gray-900 bg-primary rounded-lg border-0 border-b-2 border-gray-300 appearance-none peer"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  value={formData.phoneNumber}
                  required
                />
                <label
                  htmlFor="phonenumber"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >
                  Phone Number
                </label>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <BiPhoneCall size={24} color="Black" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-1 md:gap-4">
            <div className="relative z-0 w-full mb-6 group">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="Email Address"
                  className="block font-normal py-3 px-3 w-full text-sm text-gray-900 bg-primary rounded-lg border-0 border-b-2 border-gray-300 appearance-none peer"
                  placeholder="Email Address"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >
                  Email Address
                </label>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-1 md:gap-4">
            <div className="relative z-0 w-full mb-6 group">
              <div className="relative">
                <input
                  type="text"
                  name="message"
                  id="message"
                  className="block font-normal py-3 px-3 w-full text-sm text-gray-900 bg-primary rounded-lg border-0 border-b-2 border-gray-300 appearance-none peer h-40"
                  placeholder="Message"
                  onChange={handleChange}
                  value={formData.message}
                  required
                />
                <label
                  htmlFor="message"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >
                  Add a message
                </label>
              </div>
            </div>
          </div>

          <button
            aria-label="submit"
            type="submit"
            className="text-white float-right bg-dark focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            submit
          </button>
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
