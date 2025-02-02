import { QuestionSetType } from "@/types";
import { motion } from "framer-motion";
import NavButtons from "./NavButtons";
import Option from "./Option";

type QuizPropType = {
  allQuestions: QuestionSetType[];
  currentIndex: number;
};

const Quiz = ({ allQuestions, currentIndex }: QuizPropType) => {
  const { question, selectedOption, options } = allQuestions[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:p-10 flex-1 h-full bg-white rounded-2xl flex flex-col gap-4 md:gap-10"
    >
      <h2 className="text-sm font-medium text-gray-500">
        Question {currentIndex + 1} of {allQuestions.length}
      </h2>
      <div className="px-3 md:px-6 flex-1">
        <p className="font-medium md:text-lg max-w-4xl text-pretty">
          {question}
        </p>
        <div className="md:my-10 my-5 flex flex-col gap-2 lg:gap-4">
          {options.map((option, index) => {
            return (
              <Option
                key={option.id}
                option={option}
                index={index}
                selected={selectedOption?.id === option.id}
              />
            );
          })}
        </div>
      </div>
      <NavButtons />
    </motion.div>
  );
};

export default Quiz;
