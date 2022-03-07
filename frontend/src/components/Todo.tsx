import TodoSideMenu from "./layouts/TodoSideMenu";
import TodoListTasks from "./layouts/TodoListTasks";

const Todo = () => {
  return (
    <div className="w-screen h-screen flex flex-auto">
      <TodoSideMenu />
      <TodoListTasks />
    </div>
  );
};

export default Todo;
