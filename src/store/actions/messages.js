import {
  MESSAGES_FETCH_READ,
  MESSAGES_FETCH_READ_FAILED,
  MESSAGES_FETCH_READ_SUCCESS,
  MESSAGES_CREATE_FAILED,
  MESSAGES_CREATE_INIT,
  MESSAGES_CREATE_SUCCESS,
  MESSAGES_DELETE_FAILED,
  MESSAGES_DELETE_INIT,
  MESSAGES_DELETE_SUCCESS,
  MESSAGES_UPDATE_FAILED,
  MESSAGES_UPDATE_INIT,
  MESSAGES_UPDATE_SUCCESS
} from "../constants";

import API from "../../api";

/* FETCH ALL */
const fetchMessagesAllInit = () => ({
  type: MESSAGES_FETCH_READ
});

const fetchMessagesAllSuccess = data => ({
  type: MESSAGES_FETCH_READ_FAILED,
  payload: data
});

const fetchMessagesAllFailed = () => ({
  type: MESSAGES_FETCH_READ_SUCCESS
});

export const fetchMessagesAll = params => dispatch => {
  dispatch(fetchMessagesAllInit());

  return API.messages.read(params).then(
    response => {
      dispatch(fetchMessagesAllSuccess(response.result));
    },
    error => {
      dispatch(fetchMessagesAllFailed(error));
    }
  );
};

/* CREATE */
const messagesCreateInit = () => ({
  type: MESSAGES_CREATE_INIT
});

const messagesCreateSuccess = (data, title, category, body) => ({
  type: MESSAGES_CREATE_SUCCESS,
  payload: {
    id: data["Primary key"]["id"],
    title,
    category: category ? { id: category } : null,
    body: body ? body : ''
  }
});

const messagesCreateFailed = () => ({
  type: MESSAGES_CREATE_FAILED
});

export const messagesCreate = params => dispatch => {
  dispatch(messagesCreateInit());

  return API.messages.create(params).then(
    response => {
      const { title, category, body } = params;
      dispatch(messagesCreateSuccess(response.result, title, category, body));
    },
    error => {
      dispatch(messagesCreateFailed(error));
    }
  );
};

/* DELETE */
const messagesDeleteInit = () => ({
  type: MESSAGES_DELETE_INIT
});

const messagesDeleteSuccess = id => ({
  type: MESSAGES_DELETE_SUCCESS,
  payload: id
});

const messagesDeleteFailed = () => ({
  type: MESSAGES_DELETE_FAILED
});

export const messagesDelete = params => dispatch => {
  dispatch(messagesDeleteInit());

  return API.messages.delete(params).then(
    () => {
      dispatch(messagesDeleteSuccess(params.id));
    },
    error => {
      dispatch(messagesDeleteFailed(error));
    }
  );
};

/* UPDATE */
const messagesUpdateInit = () => ({
  type: MESSAGES_UPDATE_INIT
});

const messagesUpdateSuccess = id => ({
  type: MESSAGES_UPDATE_SUCCESS,
  payload: id
});

const messagesUpdateFailed = () => ({
  type: MESSAGES_UPDATE_FAILED
});

export const messagesUpdate = params => dispatch => {
  dispatch(messagesUpdateInit());

  return API.messages.update(params).then(
    () => {
      const { id, title, category } = params;
      dispatch(messagesUpdateSuccess({ id, title, category }));
    },
    error => {
      dispatch(messagesUpdateFailed(error));
    }
  );
};
