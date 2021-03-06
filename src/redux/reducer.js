import { v4 as uuidv4 } from 'uuid';

const initCounters = {
  counters: [
      {id: uuidv4(), count: 0, step: 1},
  ],
    error: false
};

const counters = (state = initCounters, action) => {
    switch (action.type) {
        case 'HAS_ERROR':
            return {...state,
                error: true
            };
        case 'ADD_COUNTER':
            return {...state,
                counters: [...state.counters, {id: uuidv4(), count: 0, step: 1}],
                error: false
            };
        case 'SET_STEP':
            const updatedStepCounters = state.counters.map(counter => {
                if(counter.id === action.payload.id){
                    return {...counter, step: action.payload.step};
                }
                return counter;
            });
            return {...state, counters: updatedStepCounters};
        case 'INCREASE_COUNT':
            const increaseCounters = state.counters.map(counter => {
                if(counter.id === action.payload){
                    return {...counter, count: (counter.count + counter.step)};
                }
                return counter;
            });
            return {...state, counters: increaseCounters};
        case 'DECREASE_COUNT':
            const decreaseCounters = state.counters.map(counter => {
                if(counter.id === action.payload){
                    return {...counter, count: (counter.count - counter.step)};
                }
                return counter;
            });
            return {...state, counters: decreaseCounters};
        case 'RESET_COUNT':
            const resetCounters = state.counters.map(counter => {
                if(counter.id === action.payload){
                    return {...counter, count: 0};
                }
                return counter;
            });
            return {...state, counters: resetCounters};
        case 'DELETE_COUNTER':
            const newCounters = state.counters.filter(counter => counter.id !== action.payload);
            return {...state, counters: newCounters};
        default:
            return state;
    }
}

export default counters;