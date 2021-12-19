import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

class TodoItems extends Component {
  createTasks(item) {
    return (<><ListGroup.Item key={item.key}>{item.text}</ListGroup.Item><Button variant="danger" type="submit" /></>);
  }

  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);

    return <ListGroup className="theList">{listItems}</ListGroup>;
  }
}

export default TodoItems;
