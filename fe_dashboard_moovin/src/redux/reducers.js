const initialState = {
  Data_ChartData: {},
  Minutes_ChartData: {},
  Platform_ChartData: {},
  Contract_ChartData: {},
  Messages_ChartData: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        [`${action.payload.dataType}Data`]: action.payload.data,
      };
    default:
      return state;
  }
};

export default rootReducer;
