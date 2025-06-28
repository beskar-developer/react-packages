type ReducerState = {
  hasError: boolean;
  isLoaded: boolean;
};
type Action = "ON_ERROR" | "ON_LOAD";
type State = "LOADING" | "ERROR" | "IDLE";

const REDUCER_INITIAL_VALUE: ReducerState = {
  hasError: false,
  isLoaded: false,
};
const REDUCER_ACTION_MAP = {
  ON_ERROR: () => ({ hasError: true, isLoaded: true }),
  ON_LOAD: () => ({ isLoaded: true }),
};

const reducer = (state: ReducerState, action: Action) => ({ ...state, ...REDUCER_ACTION_MAP[action]?.() });

export const useImageLoader = (loading: boolean = false) => {
  const [{ hasError, isLoaded }, dispatch] = useReducer(reducer, REDUCER_INITIAL_VALUE);

  const isLoadingState = !isLoaded || loading;
  const isIdleState = !hasError;
  const isErrorState = hasError && isLoaded;

  const activeStateMap = {
    LOADING: isLoadingState,
    IDLE: isIdleState,
    ERROR: isErrorState,
  };
  const isActiveState = (name: State) => activeStateMap[name];

  return {
    isActiveState,
    dispatch,
  };
};
