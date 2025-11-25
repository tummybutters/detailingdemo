import { motion } from "framer-motion";

const THEME = {
  primary: "#FF7F50",
  dark: "#0a0a0a",
};

interface LoadingScreenProps {
  progress: number;
}

export default function LoadingScreen({ progress }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: THEME.dark,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "80px",
          height: "80px",
          background: THEME.primary,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "2.5rem",
          color: "white",
          marginBottom: "32px",
          boxShadow: `0 0 40px ${THEME.primary}40`,
        }}
      >
        H
      </motion.div>

      <h1
        style={{
          margin: 0,
          color: "white",
          fontFamily: '"Playfair Display", serif',
          fontSize: "2rem",
          letterSpacing: "0.5px",
          marginBottom: "48px",
        }}
      >
        Hardy&apos;s Wash N&apos; Wax
      </h1>

      <div
        style={{
          width: "300px",
          height: "4px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "2px",
          overflow: "hidden",
          marginBottom: "16px",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${THEME.primary}, #ff9f7f)`,
            borderRadius: "2px",
            boxShadow: `0 0 10px ${THEME.primary}`,
          }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "0.9rem",
          margin: 0,
        }}
      >
        Loading 3D Model... {Math.round(progress)}%
      </motion.p>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          marginTop: "32px",
          width: "40px",
          height: "40px",
          border: `3px solid rgba(255, 255, 255, 0.1)`,
          borderTop: `3px solid ${THEME.primary}`,
          borderRadius: "50%",
        }}
      />
    </motion.div>
  );
}
