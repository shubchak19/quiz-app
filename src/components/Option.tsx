import { useAppDispatch } from "@/redux/hooks";
import { setUserOption } from "@/redux/slices/quizSlice";
import { OptionType } from "@/types";

type OptionPropType = { option: OptionType, index: number, selected: boolean }

function Option({ option, index, selected }: OptionPropType) {
  const dispatch = useAppDispatch();
  const {id, description} = option;
  return (
    <button
      id={id.toString()}
      onClick={() => dispatch(setUserOption(option))}
      className={`cursor-pointer text-sm lg:text-base block w-full text-left pl-4 py-3 font-medium border-l-4 border-blue-600
              ${
                selected
                  ? "bg-blue-500 text-white"
                  : "text-black bg-gray-100 hover:bg-blue-100"
              }`}
    >
      <span className="mr-5">{String.fromCharCode(65 + index)}</span>
      <span>{description}</span>
    </button>
  );
}

export default Option;
