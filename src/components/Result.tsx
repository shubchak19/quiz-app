import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCurrentIndex } from "@/redux/slices/quizSlice";
import { LaptopMinimalCheckIcon } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Solution from "./Solution";

const Result = () => {
  const [showSolution, setShowSolution] = useState(false);
  const navigate = useNavigate();
  const { score, allQuestions } = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (allQuestions.length <= 0) navigate("/");
  });
  const handlePlayAgain = () => {
    dispatch(setCurrentIndex(0));
    navigate("/");
  };

  return (
    <div className="w-screen min-h-screen lg:overflow-hidden flex flex-col lg:justify-center lg:flex-row gap-4 lg:gap-6 p-4 lg:p-8 bg-orange-100 overflow-auto">
      <motion.div
        layout
        className="flex flex-col gap-4 lg:gap-6 items-center justify-center flex-1 rounded-2xl lg:max-w-3xl h-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.8 }}
          className="bg-white flex-1 p-10 rounded-2xl w-full flex flex-col justify-center items-center"
        >
          <LaptopMinimalCheckIcon
            size={200}
            stroke="darkgreen"
            strokeWidth={1}
          />
          <h2 className="lg:text-2xl text-xl font-bold -mt-3 text-center">
            Quiz Completed!
          </h2>
          <button onClick={handlePlayAgain} className="btn btn-blue m-4">
            Play Again
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:text-lg font-medium bg-white lg:p-12 p-4 rounded-2xl w-full flex justify-center"
        >
          <p>
            Your Score is {score}/{allQuestions.length}
          </p>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="text-blue-700 underline underline-offset-2 font-medium mx-3"
          >
            {showSolution ? "Hide" : "View"} Solutions
          </button>
        </motion.div>
        <div className="flex gap-4 lg:gap-6 w-full font-bold">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="container-white"
          >
            <p className="lg:text-2xl">{score}</p>
            <p className="text-green-700">Correct</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="container-white"
          >
            <p className="lg:text-2xl">
              {allQuestions.filter((questionObj) => questionObj.selectedOption)
                .length - score}
            </p>
            <p className="text-red-700">Wrong</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="container-white"
          >
            <p className="lg:text-2xl">
              {allQuestions.length -
                allQuestions.filter((questionObj) => questionObj.selectedOption)
                  .length}
            </p>
            <p>Skipped</p>
          </motion.div>
        </div>
      </motion.div>
      <AnimatePresence mode="popLayout">
        {showSolution && allQuestions.length > 0 && <Solution />}
      </AnimatePresence>
    </div>
  );
};

export default Result;
