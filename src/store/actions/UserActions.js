import axios from "axios";

export const GETTING_STYLISTS_CHECK = "GETTING_STYLISTS_CHECK";
export const GETTING_STYLISTS_CHECK_COMPLETE =
  "GETTING_STYLISTS_CHECK_COMPLETE";
export const GETTING_STYLISTS_CHECK_ERROR = "GETTING_STYLISTS_CHECK_ERROR";

const URL = `${process.env.REACT_APP_BACKEND_URL}/api/stylists`;

export const getStylists = token => dispatch => {
  dispatch({ type: GETTING_STYLISTS_CHECK });
  const headers = { headers: { Authorization: `${token}` } };

  axios
    .get(URL, headers)
    .then(res => {
      dispatch({ type: GETTING_STYLISTS_CHECK_COMPLETE, payload: res.data });
    })
    .catch(err =>
      dispatch({ type: GETTING_STYLISTS_CHECK_ERROR, payload: err })
    );
};
