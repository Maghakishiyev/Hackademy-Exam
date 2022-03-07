import WhiteLogo from "../../images/logowhite.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import cog from "../../images/cog.png";
import adjustments from "../../images/adjustments.png";
import globe from "../../images/globe.png";
import profile from "../../images/Profile.png";
import logOut from "../../images/Log Out.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addList, removeList, chooseList } from "../../features/user";
import { v4 as uuid } from "uuid";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
// import { signOut, createList } from "../../api/axiosFunctions";

const TodoSideMenu = () => {
  // States
  const [focus, setFocus] = useState<boolean>(false);
  const [settingsMenu, setSettingsMenu] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [newList, setNewList] = useState<string>("New List");

  // Dispatch method for reducers
  const dispatch = useDispatch();

  // Redux data
  const user = useSelector((state: any) => state.user.value);

  // useHistory hook
  const history = useHistory();

  // Handlers
  const settingsMenuHandler = () => {
    setSettingsMenu((prev) => !prev);
  };

  const onLogOutHandler = () => {
    // Once backend works the line below will sign out user by removing local storage items
    // signOut();
    history.push("/sign-in");
  };

  const addListHandler = async () => {
    // Once backend works the line below will create and add new list
    // createList(newList);
    dispatch(
      addList({
        name: newList,
        id: uuid(),
        selected: false,
        tasks: [],
      })
    );
    setNewList("New List");
  };

  return (
    <div
      id="sideBar"
      className={`${
        open ? "w-[18%]" : "w-[6%]"
      } h-[100%] bg-[#FCD620] p-[2%] flex flex-col justify-between ${
        !open && "justify-center"
      }`}
    >
      <div id="logoAndTasks">
        <div id="logoWhite">
          <img src={WhiteLogo} alt="whiteLogo" className="min-w-max" />
        </div>

        <div id="tasks" className={`${open ? "mt-[20%]" : "mt-[130%]"}`}>
          <div className="left">
            <button
              id="leftButton"
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              {open && (
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="w-6 h-6 min-w-max p-2"
                />
              )}
              {!open && (
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="w-6 h-6 min-w-max p-2"
                />
              )}
            </button>
          </div>
          <div id="items">
            {user.lists
              ? user.lists.map((data: { name: ""; id: "" }) => {
                  return data.name ? (
                    <div
                      key={`${data.id}`}
                      className="my-3 w-[100%] flex items-center text-xl font-medium hover:bg-yellow-100 p-2 active:bg-[#ffe77e]"
                    >
                      <div className="Hamb mr-[5%]">
                        <FontAwesomeIcon
                          icon={faBars}
                          className="min-w-[24px] max-w-[24px]"
                        />
                      </div>

                      {open && (
                        <div className="flex flex-auto justify-between">
                          <button
                            className="text-xl font-medium"
                            onClick={() =>
                              dispatch(
                                chooseList({
                                  name: data.name,
                                  id: data.id,
                                  selected: true,
                                })
                              )
                            }
                          >
                            {data.name}
                          </button>

                          <button
                            className="hover:bg-red-200 rounded-lg"
                            onClick={() => {
                              dispatch(
                                removeList({ name: data.name, id: data.id })
                              );
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTrashCan}
                              className="min-w-[24px] max-w-[24px]"
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : null;
                })
              : null}
          </div>
          <div id="newItems" className="mt-[5%]">
            <div
              className={`flex items-center w-[100%] p-2  ${
                focus ? "bg-white " : "bg-[#FCD620]"
              }`}
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setFocus(false);
                }
              }}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="w-6 h-6 min-w-max mr-[5%]"
              />
              {open && (
                <input
                  type="text"
                  id=""
                  value={newList}
                  onChange={(event) => setNewList(event.target.value)}
                  className={
                    " bg-inherit w-[70%] focus:bg-white outline-none text-black text-xl font-medium"
                  }
                />
              )}
              {focus && (
                <button
                  className="text-yellow-300  text-xl font-medium"
                  onClick={addListHandler}
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div
          className={`${settingsMenu ? "flex" : "hidden"} flex-col absolute 
          ${
            open
              ? "translate-x-2/3 -translate-y-[120%]"
              : "translate-x-1/3 -translate-y-[10%]"
          } bg-white w-[11%] rounded-md border-[1px] border-gray-200  shadow-md`}
        >
          <button className="flex items-center m-2 p-2 hover:bg-slate-200 cursor-pointer">
            <img src={profile} alt="profile " className="min-w-max" />
            <p className="text-gray-400 pl-4 text-xl">Profile</p>
          </button>
          <button
            onClick={onLogOutHandler}
            className="flex items-center mb-2 mx-2 p-2 hover:bg-slate-200 cursor-pointer"
          >
            <img src={logOut} alt="log out" className="min-w-max ml-[2%]" />
            <p className="text-gray-400 pl-[10%] text-xl">Log out</p>
          </button>
        </div>

        <div
          id="sett"
          className={`flex justify-evenly ${!open && "flex-col"} p-2`}
        >
          <button id="adjustments">
            <img
              src={adjustments}
              alt="adjustments"
              className="my-2 min-w-max"
            />
          </button>
          <button id="globe">
            <img src={globe} alt="globe" className="my-2 min-w-max" />
          </button>
          <button id="cog" onClick={settingsMenuHandler}>
            <img src={cog} alt="cog" className="my-2 min-w-max" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoSideMenu;
