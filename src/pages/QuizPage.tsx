import NavBar from "@/components/NavBar";
import Quiz from "@/components/Quiz";
import SideBar from "@/components/SideBar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchQuestions } from "@/redux/slices/quizSlice";
import { AnimatePresence } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect } from "react";
import ErrorPage from "./ErrorPage";

const QuizPage = () => {
  const dispatch = useAppDispatch();
  const { allQuestions, currentIndex, error,loading } = useAppSelector(
    (state) => state.quiz
  );

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  if (error) return <ErrorPage />;

  return (
    <div className="h-screen overflow-auto w-screen bg-orange-100 lg:p-8 p-4 flex flex-col gap-3 lg:gap-6">
      <AnimatePresence>
        <NavBar />
        <div className="flex flex-col lg:flex-row justify-center items-center flex-1 gap-3 lg:gap-6">
          {loading && <LoaderCircleIcon size={50} stroke="hsl(210,90%, 40%)" className="animate-spin"/>}
          {allQuestions.length !== 0 && (
            <>
              <Quiz allQuestions={allQuestions} currentIndex={currentIndex} />
              <SideBar />
            </>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default QuizPage;
