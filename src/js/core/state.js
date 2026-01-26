import defaultOptions from '../utils/default-options';

export const State = {
  option: { ...defaultOptions },
  results: [],
  headingOutline: [],
  imageResults: [],
  counts: {
    error: 0,
    warning: 0,
    dismissed: 0,
  },
  customChecks: {
    running: false,
    finished: 0,
  },
  dismissedResults: [],
};

export const resetState = () => {
  State.results = [];
  State.headingOutline = [];
  State.imageResults = [];
  State.counts.error = 0;
  State.counts.warning = 0;
  State.counts.dismissed = 0;
  State.customChecks.running = false;
  State.customChecks.finished = 0;
  State.dismissedResults = [];
};

export const getResults = () => State.results;

export const setState = (newOptions) => {
  State.option = {
    ...State.option,
    ...newOptions,
    checks: {
      ...State.option.checks,
      ...(newOptions.checks || {}),
    },
  };
};
