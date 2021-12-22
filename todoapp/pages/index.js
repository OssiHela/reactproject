import { DragDropContext, resetServerContext } from "react-beautiful-dnd";
import React, { Component } from "react";
import axios from "axios";
import Column from "../components/column";
import { Spinner } from "react-bootstrap";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      columns: [],
      columnOrder: [],
      loading: false,
    };

    this.setData = this.setData.bind(this);
    this.getData = this.getData.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getData();
  }

  async getData() {
    let tasks = await axios.get("http://localhost:3010/tasks");
    let columns = await axios.get("http://localhost:3010/columns");
    let columnOrder = await axios.get("http://localhost:3010/columnOrder");

    if (
      tasks !== null &&
      columns !== null &&
      columnOrder !== null &&
      tasks !== undefined &&
      columns !== undefined &&
      columnOrder !== undefined
    ) {
      this.setState({ loading: false });
    }

    if (this.state.loading === false) {
      this.setState({
        tasks: tasks.data,
        columns: columns.data,
        columnOrder: columnOrder.data,
      });
    }
  }

  async setData(tasks, columns, columnOrder) {
    if (this.state.loading === true) {
      return;
    }
    this.setState({ loading: true }, async () => {
      const taskRequest = await axios.put(
        "http://localhost:3010/tasks/",
        tasks
      );
      const columnRequest = await axios.put(
        "http://localhost:3010/columns/",
        columns
      );
      //const orderRequest = await axios.put(
      //  "http://localhost:3010/columnOrder/",
      //  columnOrder
      //);

      axios
        .all([taskRequest, columnRequest])
        .then(
          axios.spread((res) => {
            //console.log(res);
            this.setState({ loading: false });
          })
        )
        .catch((errors) => {
          console.log(errors);
          this.setState({ loading: false });
        });
    });
  }

  async deleteTask(taskId, columnId, taskIndex) {
    this.setState({ loading: true }, () => {
      delete this.state.tasks[taskId];
      const column = this.state.columns[columnId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(taskIndex, 1);
      console.log(newTaskIds);
      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
        loading: false,
      };
      this.setState(newState, () => {
        this.setData(this.state.tasks, this.state.columns);
      });
    });
  }

  onDragEnd = (result) => {
    //is responsible for reordering the list of tasks after drag ends
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState, () => {
        this.setData(this.state.tasks, this.state.columns);
      });
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState, () => {
      this.setData(this.state.tasks, this.state.columns);
    });
  };

  render() {
    if (!this.state.tasks || !this.state.columns || !this.state.columnOrder) {
      return (
        <div className="content">
          <Spinner animation="border" role="status" />
        </div>
      );
    }
    let columns = this.state.columnOrder.map((columnId) => {
      //Creates the columns that hold tasks
      const column = this.state.columns[columnId];
      const tasks = column.taskIds.map((taskId) => this.state.tasks[taskId]);

      return (
        <Column
          key={column.id}
          column={column}
          tasks={tasks}
          delete={this.deleteTask}
        />
      );
    });
    return (
      <div className="content">
        <div className="todoListMain" key={Date.now()}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {columns}
          </DragDropContext>
        </div>
      </div>
    );
  }
}
export default Home;

export async function getServerSideProps(context) {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  return { props: {} };
}
