"use client";

import { ProgressionDetails } from "@typings/entities/progression";
import { WorkoutDetails } from "@typings/entities/workout";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ProgressionDatesState = {
  selectedDate?: Date;
  matchDates: Date[];
};

type _ContextProps = {
  currentWorkout?: WorkoutDetails;
  isCreateDialogOpen: boolean;
  progressionTimeData: ProgressionDatesState;
  setCurrentWorkout: Dispatch<SetStateAction<WorkoutDetails | undefined>>;
  setIsCreateDialogOpen: Dispatch<SetStateAction<boolean>>;
  setProgressionTimeData: Dispatch<SetStateAction<ProgressionDatesState>>;
};

export const WorkoutProgressionContext = createContext<null | _ContextProps>(null);

type _ProviderProps = {
  children: ReactNode;
};

export const WorkoutProgressionContextProvider = ({ children }: _ProviderProps) => {
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutDetails>();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [progressionTimeData, setProgressionTimeData] = useState<ProgressionDatesState>({
    selectedDate: undefined,
    matchDates: [],
  });

  return (
    <WorkoutProgressionContext.Provider
      value={{
        currentWorkout,
        setCurrentWorkout,
        isCreateDialogOpen,
        setIsCreateDialogOpen,
        progressionTimeData,
        setProgressionTimeData,
      }}
    >
      {children}
    </WorkoutProgressionContext.Provider>
  );
};

export const useWorkoutProgressionContext = () => {
  const context = useContext(WorkoutProgressionContext);

  if (!context) {
    throw new Error(
      "useWorkoutProgressionContext must be used within WorkoutProgressionContextProvider"
    );
  }

  return context;
};
