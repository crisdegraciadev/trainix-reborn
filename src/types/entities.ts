export type Workout = {
  id: string;
  name: string;
  description: string | null;
  difficulty: Difficulty;
  muscles: Muscle[];
};

type Difficulty = {
  id: string;
  name: string;
  value: string;
  level: number;
};

type Muscle = {
  id: string;
  name: string;
  value: string;
};
