import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import thunderImage from '../../assets/EffectCard/Thunder.png';

const LightningEffect = () => {
    const controls = useAnimation();

    useEffect(() => {
        const interval = setInterval(() => {
            controls.start({
                opacity: [0, 1, 0],
                transition: {
                    duration: 0.2,
                    times: [0, 0.1, 1],
                    ease: 'easeOut',
                },
            });
        }, 3000 + Math.random() * 2000); // rastgele yıldırım

        return () => clearInterval(interval);
    }, [controls]);

    return (
        <motion.img
            src={thunderImage}
            alt="Thunder Effect"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
                duration: 0.5,
                times: [0, 0.2, 1],
                ease: 'easeOut',
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                objectFit: 'cover',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        />
    );
};
export default LightningEffect;
