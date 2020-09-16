import { ADD_ITEM, DELETE_ITEM, GET_ITEMS, ITEMS_LOADING } from "./types";

export const getItems = (data) => {
  return {
    type: GET_ITEMS,
    payload: data,
  };
};

export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    payload: id,
  };
};

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
