import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasks, addTask } from "../lib/api";
import Nav from "../components/nav";
import TaskCard from "../components/task-card";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const {
    data: allTasks,
    isPending,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Nav />
      <section className="my-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTaskMutation.mutate({ text });
            setText("");
          }}
          className="w-full p-4 border bg-white max-w-2xl rounded-lg shadow-xl"
        >
          <div>
            <label htmlFor="task" className="block mb-1 font-semibold text-lg">
              Add Task
            </label>
            <input
              type="text"
              name="task"
              id="task"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a task"
              className="border ring-0 outline-none w-full p-2 rounded-lg focus:ring-1 focus:ring-orange-600 focus:border-orange-600 transition duration-300 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-600 text-white py-2 rounded-lg mt-6 w-full"
          >
            {addTaskMutation.isPending ? "Adding Task..." : "Add Task"}
          </button>
        </form>
      </section>
      <main>
        <h2 className="font-bold mb-4 text-xl">All Tasks</h2>

        {isPending ? (
          <p>Loading...</p>
        ) : (
          <>
            {allTasks?.tasks?.length < 1 ? (
              <p>No tasks yet</p>
            ) : (
              <section className="my-4 max-w-2xl grid gap-4">
                {allTasks?.tasks
                  ?.sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((task) => (
                    <TaskCard key={task._id} task={task} />
                  ))}
              </section>
            )}
          </>
        )}
      </main>
    </>
  );
}
