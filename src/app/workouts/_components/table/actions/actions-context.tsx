import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type _ContextProps = {
  toggleDeleteDialog: () => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  toggleUpdateDialog: () => void;
  isUpdateDialogOpen: boolean;
  setIsUpdateDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export const WorkoutActionsContext = createContext<null | _ContextProps>(null);

type _ProviderProps = {
  children: ReactNode;
};

export const WorkoutActionsContextProvider = ({ children }: _ProviderProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const toggleDeleteDialog = () => {
    setIsDeleteDialogOpen((state) => !state);
  };

  const toggleUpdateDialog = () => {
    setIsUpdateDialogOpen((state) => !state);
  };

  return (
    <WorkoutActionsContext.Provider
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
    </WorkoutActionsContext.Provider>
  );
};

export const useWorkoutActionsContext = () => {
  const context = useContext(WorkoutActionsContext);

  if (!context) {
    throw new Error(
      "useWorkoutActionsContext must be used within WorkoutProgressionContextProvider",
    );
  }

  return context;
};
