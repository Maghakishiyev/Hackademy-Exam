import {
  faEllipsis,
  faMagnifyingGlass,
  faICursor,
  faTrashAlt,
  faPlus,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import profileIcon from "../../images/Avatar.png";
import LogoYellow from "../../images/LogoYellow3.png";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  removeList,
  addTask,
  completeTask,
  selectTask,
  removeTask,
} from "../../features/user";
import { v4 as uuid } from "uuid";
import elipse from "../../images/elipse.png";
import elipseCompleted from "../../images/Completed.png";
// import { signOut } from "../../api/axiosFunctions";

const TodoListTasks = () => {
  const [profileInfo, setProfileInfo] = useState(false);
  const [listSettings, setListSettings] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [taskInfo, setTaskInfo] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user.value);

  const onLogOutHandler = () => {
    // Once backend works the line below will sign out user by removing local storage items
    // signOut();
    history.push("/sign-in");
  };

  return (
    <div className="w-[100%] flex flex-col flex-auto h-[100%]">
      {/* Upper side of Page */}
      <div
        id="searchBarAndProfile"
        className="px-[1.5%] w-[100%] h-[8%] border-b-[1px] border-b-[#E5E7EB] flex justify-between items-center"
      >
        {/* Search Bar */}
        <div
          id="searchBar"
          className="flex items-center border-[1px] border-[#E5E7EB] p-[0.25%] w-[40%] "
        >
          <button>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="w-6 h-6 min-w-max p-2"
              style={{ color: "#6B7280" }}
            />
          </button>
          <input
            type="text"
            placeholder="Search"
            className="font-normal text-xl w-[90%] outline-none p-1"
          />
        </div>

        {/* Profile Button */}
        <div>
          <button
            onClick={() => {
              setProfileInfo((prevState) => !prevState);
            }}
          >
            <img
              src={profileIcon}
              alt="profileIcon"
              className="min-w-[60%] max-w-[60%] p-2 m-0 "
            />
          </button>
          {profileInfo && (
            <div className="absolute -translate-x-[70%] translate-y-[8%] w-[18%] h-[19%] shadow-xl drop-shadow-md bg-white p-5">
              <div className="flex justify-between items-center w-[100%]">
                <div className="logo flex items-center">
                  <img src={LogoYellow} alt="logo" className="w-6 mr-1" />
                  <p className="text-[#797979] font-medium text-xl">Todo</p>
                </div>
                <button
                  className="text-[#B8B8B8] hover:underline text-lg"
                  onClick={onLogOutHandler}
                >
                  Sign out
                </button>
              </div>

              <div className="flex mt-3 justify-between items-start w-[100%]">
                <div className="w-[40%]">
                  <img
                    src={profileIcon}
                    alt="profilePicture"
                    className="w-[60%] min-w-max "
                  />
                </div>
                <div className="w-[60%]">
                  <p className="text-lg">{user?.email}</p>
                  <button className="text-yellow-300 hover:underline text-md">
                    My Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tasks */}

      {user.lists && user.lists[0]?.selected === true ? (
        <div className="flex h-[100%]">
          <div className="flex flex-col flex-auto">
            <div id="listName" className="p-[1.5%] flex items-center">
              <h1 className="font-bold text-2xl">{user.lists[0].name}</h1>
              <button
                className="ml-[0.75%] flex items-center"
                onClick={() => {
                  setListSettings((prev) => !prev);
                }}
              >
                <FontAwesomeIcon
                  icon={faEllipsis}
                  className="min-w-[28px] max-w-[28px] h-[0.5%]"
                />
              </button>

              {listSettings && (
                <div
                  id="Options"
                  className="flex flex-col w-[11%]  absolute translate-x-[15%] translate-y-2/3 py-2 bg-white shadow-lg border-[1px] rounded-lg text-xl font-medium text-center"
                >
                  <div className="border-b-[1px] border-[#E5E7EB] p-1">
                    <h1>List options</h1>
                  </div>

                  <div className="border-b-[1px] border-[#E5E7EB] p-2 w-[100%]">
                    <button className="flex justify-evenly items-center w-[95%] m-auto p-1 hover:bg-slate-200">
                      <FontAwesomeIcon
                        icon={faICursor}
                        className="min-w-[28px] max-w-[28px] "
                      />
                      <h1>Rename List</h1>
                    </button>
                  </div>

                  <div className="p-2 w-[100%]">
                    <button
                      className="flex justify-evenly items-center w-[95%] m-auto p-1 text-red-600 hover:bg-red-100"
                      onClick={() => {
                        dispatch(
                          removeList({
                            name: user.lists[0].name,
                            id: user.lists[0].id,
                          })
                        );
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                      <h1>Delete List</h1>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Adding tasks to list */}
            <div
              id="addButton"
              className="p-[1.5%] flex items-center border-b-[1px] border-[#E5E7EB]"
            >
              <button
                className="flex items-center text-yellow-300 w-[30%]"
                onClick={() => {
                  dispatch(
                    addTask({
                      name: "Item ",
                      id: uuid(),
                      completed: false,
                      date: `${new Date()}`,
                    })
                  );
                }}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className="min-w-[24px] max-w-[24px] h-[0.1%] mr-[3%]"
                />
                <h1 className="text-2xl font-medium">Add Tasks</h1>
              </button>
            </div>

            {/* Displaying uncompleted items items */}
            {user.lists[0]?.tasks &&
              user.lists[0]?.tasks.map(
                (data: {
                  name: string;
                  id: string;
                  completed: boolean;
                  selected: boolean;
                }) => {
                  return (
                    !data.completed && (
                      <div
                        key={data.id.toString()}
                        className="p-3 w-[100%] border-b-[1px] border-[#E5E7EB] flex items-center hover:bg-[#B8B8B8] active:bg-[#FCD620]"
                      >
                        <button
                          className="p-3"
                          onClick={() => {
                            dispatch(
                              completeTask({
                                name: data.name,
                                id: data.id,
                                completed: true,
                              })
                            );
                            setTaskInfo(false);
                          }}
                        >
                          <img
                            src={elipse}
                            alt="elipse"
                            className="min-w-[24px] max-w-[24px] h-[0.1%] mr-[3%]"
                          />
                        </button>

                        <button
                          className="text-2xl font-medium"
                          onClick={() => {
                            setTaskInfo(true);
                            dispatch(
                              selectTask({
                                name: data.name,
                                id: data.id,
                                completed: data.completed,
                                selected: true,
                              })
                            );
                          }}
                        >
                          {data.name}
                        </button>
                      </div>
                    )
                  );
                }
              )}
            {/* Displaying completed items */}
            <div className="text-2xl font-medium p-3 w-[100%] border-b-[1px] border-[#E5E7EB] flex items-center ">
              <button
                className="flex items-center"
                onClick={() => {
                  setCompleted((prev) => !prev);
                }}
              >
                {completed ? (
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="min-w-[24px] max-w-[24px]  mr-[10%]"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="min-w-[24px] max-w-[24px]  mr-[10%]"
                  />
                )}
                <h1>Completed</h1>
              </button>
            </div>

            {completed &&
              user.lists[0]?.tasks &&
              user.lists[0]?.tasks.map(
                (data: { name: string; id: string; completed: boolean }) => {
                  return (
                    data.completed && (
                      <div
                        key={data.id.toString()}
                        className="p-3 w-100% border-b-[1px] border-[#E5E7EB] flex items-center hover:bg-[#B8B8B8] active:bg-[#FCD620] bg-opacity-[12%]"
                      >
                        <button
                          className="p-3"
                          onClick={() => {
                            dispatch(
                              completeTask({
                                name: data.name,
                                id: data.id,
                                completed: false,
                              })
                            );
                            setTaskInfo(false);
                          }}
                        >
                          <img
                            src={elipseCompleted}
                            alt="elipse"
                            className="min-w-[24px] max-w-[24px] h-[0.1%] mr-[3%]"
                          />
                        </button>

                        <button
                          className="text-2xl font-medium line-through"
                          onClick={() => {
                            setTaskInfo(true);
                            dispatch(
                              selectTask({
                                name: data.name,
                                id: data.id,
                                completed: data.completed,
                                selected: true,
                              })
                            );
                          }}
                        >
                          {data.name}
                        </button>
                      </div>
                    )
                  );
                }
              )}
          </div>
          {taskInfo && (
            <div className="w-[25%] h-[100%] bg-yellow-300 flex flex-col justify-between">
              {user.lists[0]?.tasks &&
                user.lists[0]?.tasks.map(
                  (data: {
                    name: string;
                    id: string;
                    completed: boolean;
                    selected: boolean;
                  }) => {
                    return (
                      data.selected && (
                        <>
                          <div
                            id="itemNameAndDescription"
                            className="h-[50%] p-4"
                          >
                            <div
                              id="taskName"
                              className="w-[100%] bg-white flex items-center"
                            >
                              <button className="p-4 ">
                                {data.completed ? (
                                  <img
                                    src={elipseCompleted}
                                    alt="completed"
                                    className="min-w-[24px] max-w-[24px] h-[0.1%] mr-[3%]"
                                  />
                                ) : (
                                  <img
                                    src={elipse}
                                    alt="notCompleted"
                                    className="min-w-[24px] max-w-[24px] h-[0.1%] mr-[3%]"
                                  />
                                )}{" "}
                              </button>
                              <input
                                type="text"
                                placeholder={data.name}
                                className="text-2xl outline-none font-normal w-[90%]"
                              />
                            </div>
                            <div id="Description" className="h-[80%] mt-3">
                              <textarea
                                name="Description"
                                className="p-4 w-[100%] h-[100%] resize-none outline-none"
                                placeholder="Description"
                              ></textarea>
                            </div>
                          </div>

                          <div
                            id="BottomCorner"
                            className="border-t-[1px] border-[#E5E7EB] flex justify-between w-[100%] p-4"
                          >
                            <button onClick={() => setTaskInfo(false)}>
                              <FontAwesomeIcon
                                icon={faChevronRight}
                                className="min-w-[24px] max-w-[24px] min-h-[24px]"
                              />
                            </button>

                            <div>
                              <h1 className="text-center text-xl font-normal">{`Created on Today`}</h1>
                            </div>

                            <button
                              onClick={() => {
                                dispatch(
                                  removeTask({ name: data.name, id: data.id })
                                );
                                setTaskInfo(false);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="min-w-[24px] max-w-[24px] min-h-[20px]"
                              />
                            </button>
                          </div>
                        </>
                      )
                    );
                  }
                )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col flex-auto items-center justify-center">
          <h1 className="text-yellow-300 font-medium text-2xl">
            List not found
          </h1>
          <p className="font-medium text-xl">
            We can't find the list you're looking for. Select one of your lists
            from the sidebar or create a new list.
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoListTasks;
