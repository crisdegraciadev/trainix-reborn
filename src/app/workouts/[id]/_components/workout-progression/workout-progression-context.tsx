"use client";

import { ProgressionDetails } from "@typings/entities/progression";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type ProgressionDatesState = {
  selectedDate?: Date;
  matchDates: Date[];
};

type _ContextProps = {
  workoutId?: string;
  isCreateDialogOpen: boolean;
  progressionTimeData: ProgressionDatesState;
  setWorkoutId: Dispatch<SetStateAction<string | undefined>>;
  setIsCreateDialogOpen: Dispatch<SetStateAction<boolean>>;
  setProgressionTimeData: Dispatch<SetStateAction<ProgressionDatesState>>;
};

export const WorkoutProgressionContext = createContext<null | _ContextProps>(null);

type _ProviderProps = {
  children: ReactNode;
};

export const WorkoutProgressionContextProvider = ({ children }: _ProviderProps) => {
  const [workoutId, setWorkoutId] = useState<string | undefined>();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [progressionTimeData, setProgressionTimeData] = useState<ProgressionDatesState>({
    selectedDate: undefined,
    matchDates: [],
  });

  return (
    <WorkoutProgressionContext.Provider
      value={{
        workoutId,
        setWorkoutId,
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
