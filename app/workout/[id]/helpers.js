export const transformExerciseData = (workout) => {
    return workout.WorkoutPlanExercise.map(e => ({
      id: e.Exercise.id,
      sets: Array.from({ length: e.sets }).map((_, idx) => ({ setId: idx, weight: null, reps: e.reps }))
    }));
  };
  