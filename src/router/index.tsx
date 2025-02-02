import ErrorPage from "@/pages/ErrorPage";
import QuizPage from "@/pages/QuizPage";
import ResultPage from "@/pages/ResultPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuizPage />,
    errorElement: <ErrorPage/>
  },
  {
    path: "/result",
    element: <ResultPage />,
    errorElement: <ErrorPage/>
  },
]);

export default router;
