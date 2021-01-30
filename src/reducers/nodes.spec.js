import * as ActionTypes from '../constants/actionTypes';
import reducer from './nodes';
import initialState from './initialState';


describe('Reducers::Nodes', () => {
  const getInitialState = () => {
    return initialState().nodes;
  };

  const blocks = [
    {
      "id": "5",
      "type": "blocks",
      "attributes": {
        "index": 1,
        "timestamp": 1530679678,
        "data": "The Human Torch",
        "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
        "hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc="
      }
    },
    {
      "id": "6",
      "type": "blocks",
      "attributes": {
        "index": 2,
        "timestamp": 1530679684,
        "data": "is denied",
        "previous-hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=",
        "hash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4="
      }
    },
    {
      "id": "7",
      "type": "blocks",
      "attributes": {
        "index": 3,
        "timestamp": 1530679689,
        "data": "a bank loan",
        "previous-hash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4=",
        "hash": "YGLfNDMC2x2m5kwb3q+Ne/uCL4sFUnX/sQwzuwijx8A="
      }
    }
  ]

  const nodeA = {
    url: 'http://localhost:3002',
    online: true,
    name: null,
    blocks: {
      loading: true,
      list: []
    }
  };

  const nodeB = {
    url: 'http://localhost:3003',
    online: false,
    name: null,
    blocks: {
      loading: true,
      list: []
    }
  };

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_START', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_START, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          loading: true
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_SUCCESS', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodeA, res: {node_name: 'alpha'} };
    const expected = {
      list: [
        {
          ...nodeA,
          online: true,
          name: 'alpha',
          loading: false
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_FAILURE', () => {
    const appState = {
      list: [
        {
          ...nodeA,
          online: true,
          name: 'alpha',
          loading: false
        },
        nodeB
      ]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_FAILURE, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          online: false,
          name: 'alpha',
          loading: false
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  //// FETCH BLOCK REDUCERS

  it('should handle GET_BLOCKS_START', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.GET_BLOCKS_START, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          blocks: {
            loading: true,
            list: []
          }
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_BLOCKS_SUCCESS', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.GET_BLOCKS_SUCCESS, node: nodeA, blocks: blocks };
    const expected = {
      list: [
        {
          ...nodeA,
          blocks: { loading: false, list: blocks },
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_BLOCKS_FAILURE', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const error = 'Test error';
    const action = { type: ActionTypes.GET_BLOCKS_FAILURE, node: nodeA, error: 'Test error' };
    const expected = {
      list: [
        { ...nodeA,
          blocks: {
            error: error,
            loading: false,
            list: []
          }
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

});
