import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';

export function loadAuthorsSuccess(courses) {
  return { type: types.LOAD_AUTHORS_SUCCESS, courses };
}

export function loadAuthors() {
  return function (dispatch) {
    return authorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => { throw(error); });
  };
}
