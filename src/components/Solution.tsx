import { useAppSelector } from "@/redux/hooks";
import { OptionType } from "@/types";
import { sanitize } from "@/utils/sanitize";
import { motion } from "framer-motion";
import NavButtons from "./NavButtons";

function Solution() {
  const { allQuestions, currentIndex } = useAppSelector((state) => state.quiz);
  const { selectedOption, correctOption, question, explanation, options } =
    allQuestions[currentIndex];

  function renderSolutionStatus() {
    if (!selectedOption) return <p>Skipped</p>;
    if (selectedOption?.id === correctOption.id)
      return <p className="text-green-800">Correct</p>;
    return <p className="text-red-800">Wrong</p>;
  }

  function getOptionColor(option: OptionType) {
    const isSelectedOption = selectedOption?.id === option.id;
    const isOptionCorrect = correctOption.id === option.id;
    if (isOptionCorrect) return "bg-green-500 text-white";
    if (!isSelectedOption) return "text-black bg-gray-100";
    return "bg-red-500 text-white";
  }

  return (
    <motion.div
    initial={{ x: "100%" }}
    animate={{  x: 0 }}
    exit={{ x: "100%" }}
    transition={{ duration: 0.5 }}
    className="max-w-4xl bg-white p-6 lg:p-8 rounded-2xl flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center font-medium text-sm ">
        <h2 className=" text-gray-500">
          Solution {currentIndex + 1} of {allQuestions.length}
        </h2>
        {renderSolutionStatus()}
      </div>
      <div className="px-1 flex-1 ">
        <p className="font-medium max-w-4xl text-pretty">{question}</p>
        <div className="mt-4 flex flex-col gap-2">
          {options.map((option, index) => {
            return (
              <div
                key={option.id}
                className={`block w-full text-left pl-4 py-2 text-sm font-medium ${getOptionColor(
                  option
                )}`}
              >
                <span className="mr-4">{String.fromCharCode(65 + index)}</span>
                <span>{option.description}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Solution</h3>
        <p
          className="overflow-auto bg-slate-100 p-4 rounded-xl text-xs lg:text-base lg:max-h-56 max-h-48"
          dangerouslySetInnerHTML={{
            __html: sanitize(explanation),
          }}
        ></p>
      </div>
      <NavButtons solutionMode={true}/>
    </motion.div>
  );
}

export default Solution;
