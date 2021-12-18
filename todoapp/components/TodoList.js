import React, { Component } from "react";
import TodoItems from "./TodoItems";
import { FormControl, Form, Button, InputGroup } from "react-bootstrap";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };

    this.addItem = this.addItem.bind(this);
  }

  addItem(e) {
    if (this._inputElement.value !== "") {
      var newItem = {
        text: this._inputElement.value,
        key: Date.now(),
      };

      this.setState((prevState) => {
        return {
          items: prevState.items.concat(newItem),
        };
      });

      this._inputElement.value = "";
    }

    console.log(this.state.items);

    e.preventDefault();
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="todoInput">
          <Form onSubmit={this.addItem}>
            <InputGroup size="lg" className="mb-3">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <FormControl
                placeholder="enter task"
                aria-label="task"
                ref={(a) => (this._inputElement = a)}
              />
              <Button variant="danger" type="submit">
                add
              </Button>
            </InputGroup>
          </Form>
        </div>
        <TodoItems entries={this.state.items} />
      </div>
    );
  }
}

export default TodoList;
