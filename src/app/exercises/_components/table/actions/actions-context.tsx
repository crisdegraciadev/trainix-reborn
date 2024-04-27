import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type _ContextProps = {
  toggleDeleteDialog: () => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  toggleUpdateDialog: () => void;
  isUpdateDialogOpen: boolean;
  setIsUpdateDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export const ExerciseActionsContext = createContext<null | _ContextProps>(null);

type _ProviderProps = {
  children: ReactNode;
};

export const ExerciseActionsContextProvider = ({ children }: _ProviderProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const toggleDeleteDialog = () => {
    setIsDeleteDialogOpen((state) => !state);
  };

  const toggleUpdateDialog = () => {
    setIsUpdateDialogOpen((state) => !state);
  };

  return (
    <ExerciseActionsContext.Provider
      value={{
        toggleDeleteDialog,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        toggleUpdateDialog,
        isUpdateDialogOpen,
        setIsUpdateDialogOpen,
      }}
    >
      {children}
    </ExerciseActionsContext.Provider>
  );
};

export const useExerciseActionsContext = () => {
  const context = useContext(ExerciseActionsContext);

  if (!context) {
    throw new Error(
      "useExerciseActionsContext must be used within WorkoutProgressionContextProvider",
    );
  }

  return context;
};
