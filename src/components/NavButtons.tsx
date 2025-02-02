import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  checkAnswers,
  nextQuestion,
  previousQuestion,
  setCurrentIndex,
} from "@/redux/slices/quizSlice";
import { useNavigate } from "react-router-dom";

function NavButtons({ solutionMode = false }: { solutionMode?: boolean }) {
  const { allQuestions, currentIndex } = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSubmit() {
    dispatch(checkAnswers());
    dispatch(setCurrentIndex(0));
    navigate("/result");
  }
  return (
    <div className={`flex gap-2 justify-between`}>
      <button
        onClick={() => dispatch(previousQuestion())}
        className="btn btn-outlined"
      >
        Previous
      </button>
      <div className="flex gap-4">
        {currentIndex >= allQuestions.length - 1 && !solutionMode ? (
          <button className="btn btn-green" onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          <button
            className="btn btn-blue"
            onClick={() => dispatch(nextQuestion())}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default NavButtons;
