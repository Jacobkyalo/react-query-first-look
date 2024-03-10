import axios from "axios";

export const instance = axios.create({
  baseURL: "https://expressjs-vercel-api.vercel.app",
});

export const getTasks = async () => {
  const { data } = await instance.get("/api/tasks");
  return data;
};

export const addTask = async (task) => {
  const { data } = await instance.post("/api/tasks", task);
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await instance.delete(`/api/tasks/${id}`);
  return data;
};
