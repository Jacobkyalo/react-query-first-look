import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { BsTrash } from "react-icons/bs";
import { deleteTask } from "../lib/api";

export default function TaskCard({ task }) {
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <div className="border rounded-lg shadow-xl">
      <div className="p-4">
        <div className="flex items-center gap-x-2">
          <form>
            <input type="checkbox" name="completed" id="completed" />
          </form>
          <p className="text-slate-700">{task?.text}</p>
          <span className="text-red-600">
            {deleteTaskMutation.isPending ? (
              "..."
            ) : (
              <BsTrash
                className="text-red-600 cursor-pointer"
                onClick={() => deleteTaskMutation.mutate(task._id)}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};
