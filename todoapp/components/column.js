import { Component } from "react";
import { ListGroup } from "react-bootstrap";
import Task from "../components/task";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  background-color: #1b1b1b;
  margin: 0 1rem;
  padding: 0.6rem 0.5rem 0.6rem 0.5rem;
  border-radius: 0.5rem;
  border: 0.1rem solid #2b2b2b;
`;

const StyledListGroup = styled(ListGroup)`
  min-width: 100%;
  min-height: 10rem;
  background-color: ${(props) =>
    props.$isdraggingover ? "rgba(255,255,255,0.10)" : "transparent"};
  border: ${(props) =>
    props.$isdraggingover
      ? "0.1rem solid #f0e68c"
      : "0.1rem solid rgba(255,255,255,0.14)"};
  transition: background-color 0.2s, border 0.2s;
`;

export default class Column extends Component {
  render() {
    return (
      <Container>
        <h4>{this.props.column.title}</h4>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <StyledListGroup
              className="todoList"
              {...provided.droppableProps}
              ref={provided.innerRef}
              $isdraggingover={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  columnId={this.props.column.id}
                  delete={this.props.delete}
                />
              ))}
              {provided.placeholder}
            </StyledListGroup>
          )}
        </Droppable>
      </Container>
    );
  }
}
