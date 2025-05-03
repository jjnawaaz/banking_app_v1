import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2 h-[calc(100vh-100px)]">
      <div className="flex flex-col relative">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 1, opacity: 100 }}
          transition={{ type: "tween", duration: 1 }}
        >
          <img
            src="/cash.png"
            alt="No hand"
            className="h-[45vh] absolute left-52 "
          />
        </motion.div>
        <motion.div
          initial={{ x: -800, y: 800, opacity: 0 }}
          animate={{ x: 1, y: 1, opacity: 100 }}
          transition={{ type: "tween", duration: 1 }}
        >
          <img src="/hand.png" alt="No hand" className="absolute top-44" />
        </motion.div>
      </div>
      <motion.div
        initial={{ x: 1000, opacity: 0 }}
        animate={{ x: 1, opacity: 100 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className=" flex flex-col justify-center"
      >
        <h1 className=" flex flex-wrap justify-items-start mt-6 mx-3 font-extrabold text-3xl">
          Welcome to HDFCI Bank
        </h1>
        <h1 className=" text-gray-700 flex flex-wrap justify-items-start mx-3 mt-2 text-xl">
          Your Trusted Financial Partner
        </h1>
        <p className=" mx-4 mt-4 text-lg text-gray-700">
          At <span className="font-bold text-black">HDFCI Bank</span>, we
          empower your financial journey with cutting-edge digital banking
          solutions. Experience seamless transactions, personalized wealth
          management, and 24/7 secure access to your accounts through our
          award-winning platform.
        </p>
        <p className="mx-4 mt-4 text-lg">
          <span className="font-bold  text-lg">Why Choose HDFCI?</span>
          <h1 className="text-xs sm:text-lg text-gray-700">
            <span className="font-bold sm:text-lg text-black">
              Instant Digital Banking:{" "}
            </span>
            Open accounts in 90 seconds
          </h1>
          <h1 className="text-lg text-gray-700">
            <span className="font-bold text-lg text-black">
              Smart Security:
            </span>{" "}
            AI-powered fraud detection
          </h1>
          <h1 className="text-lg text-gray-700">
            <span className="text-lg font-bold text-black">5M+ Customers</span>{" "}
            trust us worldwide
          </h1>
          <h1 className="text-lg text-gray-700">
            <span className="font-bold text-lg text-black">24/7 Support:</span>{" "}
            Real-human assistance anytime
          </h1>
        </p>
      </motion.div>
    </div>
  );
};

export default HomePage;
