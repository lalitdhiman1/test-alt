export const loginAction = payload => ({
    type: 'SWAPI_LOGIN',
    payload,
  });
  
  export const loginErrorAction = payload => ({
    type: 'SWAPI_ERRORS',
    payload,
  });
  
  export const updateSearchResultsAction = payload => ({
    type: 'UPDATE_SEARCH_RESULTS',
    payload,
  });
  
  export const updateSearchPlanetAction = payload => ({
    type: 'UPDATE_SEARCH_PLANET',
    payload,
  });
  
  export const updateFetchStatusAction = payload => ({
    type: 'UPDATE_FETCH_STATUS',
    payload,
  });
  