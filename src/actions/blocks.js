import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes';

const getBlocksForNodeStart = (node) => {
  return {
    type: types.GET_BLOCKS_START,
    node
  };
};

const getBlocksForNodeSuccess = (node, blocks) => {
  return {
    type: types.GET_BLOCKS_SUCCESS,
    node,
    blocks
  };
};

const getBlocksForNodeFailure = (node, error) => {
  return {
    type: types.GET_BLOCKS_FAILURE,
    node,
    error
  };
};

export function getBlocksForNode(node) {
  return async (dispatch) => {
    try {
      dispatch(getBlocksForNodeStart(node));
      const res = await fetch(`${node.url}/api/v1/blocks`);

      if(res.status >= 400) {
        // Mocking error
        const error = 'Couldn not load blocks'
        dispatch(getBlocksForNodeFailure(node, error));
      }

      const json = await res.json();

      dispatch(getBlocksForNodeSuccess(node, json.data));
    } catch (err) {
      dispatch(getBlocksForNodeFailure(node));
    }
  };
}
