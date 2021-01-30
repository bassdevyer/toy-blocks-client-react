import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/blocks";
import Block from "../components/Block"
import { Box } from "@material-ui/core";
import LoadingBlocks from '../components/LoadingBlocks';

export class Blocks extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getBlocksForNode(this.props.node);
  }

  render() {
    const { blocks } = this.props;
    return (
      blocks.loading ?
        (
          <LoadingBlocks/>
          ) :
        (
          <Box width={'100%'}>
          {blocks.list.map((block) => (
            <Block
              block={block.attributes}
              key={block.id}
            />
          ))}
        </Box>
        )

    );
  }
}

Blocks.propTypes = {
  actions: PropTypes.object.isRequired,
  node: PropTypes.object.isRequired,
  blocks: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    blocks: state.nodes.list.find((node) => node.url === ownProps.node.url).blocks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blocks);
