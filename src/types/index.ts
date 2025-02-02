export type OptionType = {
  id: number;
  description: string;
  isCorrect: boolean;
};

export type QuestionSetType = {
  id: number;
  question: string;
  options: OptionType[];
  correctOption: OptionType;
  selectedOption: OptionType | null;
  explanation: string;
};
