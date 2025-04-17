'use client';

import { motion } from "framer-motion";

const LoadingLineMonthlyReport = () => {
    return (
        <div
            className="max-w-[1096px] w-full h-5 relative overflow-hidden"
        >
            <motion.div
                className="absolute top-1/2 h-1 w-1/4 bg-gradient-to-r from-themeprimary to-themesecondary rounded-md"
                initial={{
                    translateX: '-100%',
                }}
                animate={{
                    translateX: '400%',
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'linear',
                }}
            />
        </div>
    )
}

export default LoadingLineMonthlyReport