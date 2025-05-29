import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizzes } from "./data/QuizzesWithTranslations";
import btnWall from "./assets/btnWall.png";
import wallVideo from "./assets/wall2.mp4";
import startSound from "/sound/gameStart.mp3";
import { useTranslation } from "react-i18next";
import { useSound } from "./contexts/SoundContext";
import { motion } from "framer-motion";

const ChooseTestPage = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const { isSoundOn } = useSound();

  const navigate = useNavigate();

  const handleStartQuiz = (quizId) => {
    const sound = new Audio(startSound);
    if (isSoundOn) {
      sound.play().catch((err) => console.warn("فشل تشغيل الصوت", err));
    }

    navigate(`/quiz/${quizId}`);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      {/* 🎥 خلفية الفيديو */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src={wallVideo} type="video/mp4" />
        {t("video_error_message")}
      </video>

      {/* 🎯 المحتوى */}
      <div
        style={{
          padding: 40,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // justifyContent: "start",
          gap: 30,
          zIndex: 1,
          color: "#fff",
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? 20 : 30,
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.678)",
          }}
        >
          {/* اختر اختبارًا للبدء */}
          {t("choose_test")}
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          {quizzes.map((quiz) => (
            <motion.button
              whileTap={{ scale: 0.9 }}
              key={quiz.id}
              onClick={() => handleStartQuiz(quiz.id)}
              style={{
                fontSize: isMobile ? 20 : 30,
                border: "none",
                backgroundColor: "transparent",
                color: "#fff",
                cursor: "pointer",
                backgroundImage: `url(${btnWall})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: 100,
                width: isMobile ? 270 : 350,
                textShadow: "0px 3px 4px rgba(0, 0, 0, 0.836)",

                // shadow: "0px 4px 6px rgba(0, 0, 0, 0.63)",
              }}
            >
              {quiz.title[language]}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseTestPage;
