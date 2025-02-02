import { QuestionSetType } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type QuestionData = {
  id: number;
  description: string;
  detailed_solution: string;
  options: [];
};

type OptionData ={
  id: number;
  description: string;
  is_correct: boolean;
}

type InitialStateType = {
  allQuestions: QuestionSetType[];
  currentIndex: number;
  score: number;
  loading: boolean;
  error: string | undefined;
}


const API_URL = "https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX";

export const fetchQuestions = createAsyncThunk('quiz/fetchQuestions', async () => {
  const response = await axios.get(API_URL);
  return response.data.questions.map((question: QuestionData) => ({
    id: question.id,
    question: question.description,
    options: question.options.map((option: OptionData) => ({
      id: option.id,
      description: option.description,
      isCorrect: option.is_correct,
    })),
    explanation: question.detailed_solution,
    correctOption: question.options.find((option: OptionData) => option.is_correct),
  }));
});

const initialState: InitialStateType = {
  allQuestions: [],
  currentIndex: 0,
  score: 0,
  loading: false,
  error: undefined,
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    nextQuestion: (state) => {
      if (state.currentIndex + 1 < state.allQuestions.length) {
        state.currentIndex += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
      }
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setUserOption: (state, action) => {
      state.allQuestions[state.currentIndex].selectedOption = action.payload;
    },
    checkAnswers: (state) => {
      if(state.score) return;
      state.allQuestions.forEach((question) => {
        if (question.selectedOption?.isCorrect) {
          state.score += 1;
        }
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.allQuestions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { nextQuestion, previousQuestion, setCurrentIndex, setUserOption, checkAnswers } = quizSlice.actions;
export default quizSlice.reducer;
