import { Component } from "react";
import { Button, ListGroupItem } from "react-bootstrap";
import { BsXSquareFill } from "react-icons/bs";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const StyledListGroupItem = styled(ListGroupItem)`
  background-color: ${(props) => (props.$isdragging ? "#3f3f3f" : "#262626")};
  color: ${(props) =>
    props.$isdragging ? "#f0e68c" : "rgb(255,255,255,0.97)"};
`;

export default class Task extends Component {
  async delete(id, columnId, index) {
    await this.props.delete(id, columnId, index);
  }

  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <StyledListGroupItem
            className="listItem"
            key={this.props.task.key}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            $isdragging={snapshot.isDragging}
          >
            {this.props.task.content}
            <Button
              size="sm"
              variant="outline-danger"
              type="button"
              onClick={() =>
                this.delete(
                  this.props.task.id,
                  this.props.columnId,
                  this.props.index
                )
              }
            >
              <BsXSquareFill fontSize="1.2rem" />
            </Button>
          </StyledListGroupItem>
        )}
      </Draggable>
    );
  }
}
