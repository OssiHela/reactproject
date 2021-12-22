import axios from "axios";

export const tasks = async () => {
  await axios.get("http://localhost:3010/tasks");
};
export const columns = async () =>
  await axios.get("http://localhost:3010/columns");
export const columnOrder = async () =>
  await axios.get("http://localhost:3010/columnOrder");
