import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCurrentIndex } from "@/redux/slices/quizSlice";
import { motion } from "framer-motion";

function SideBar() {
  const { allQuestions, currentIndex } = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className="h-full bg-white p-8 rounded-2xl hidden lg:block"
    >
      <h2 className="font-medium mb-4">All Questions</h2>
      <div className="grid grid-cols-2 gap-3">
        {allQuestions.map((question, index) => {
          const answered = question.selectedOption ? true : false;
          return (
            <button
              key={question.id}
              onClick={() => dispatch(setCurrentIndex(index))}
              className={`rounded transition-colors min-w-20 font-medium p-4
                ${
                  currentIndex === index
                    ? "btn-orange"
                    : answered
                    ? "btn-green-outlined"
                    : "btn-slate"
                }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default SideBar;
