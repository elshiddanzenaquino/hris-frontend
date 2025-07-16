import { motion } from "framer-motion";

const AnimatedButton = ({ children, onClick, className, type = "button" }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            type={type}
            className={`px-4 py-2 rounded-md font-semibold shadow transition-colors duration-300 ${className}`}
        >
            {children}
        </motion.button>
    );
};

export default AnimatedButton;
