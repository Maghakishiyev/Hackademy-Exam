import { AxiosInstance } from "axios";
import axios from "./axiosConnection";

//  Functions for autherization

export default function isAuthenticated(): boolean {
  // This function will check if user Authenticated by getting items from localStorage
  if (typeof window !== "undefined") {
    return Boolean(
      localStorage.getItem("email") && localStorage.getItem("jwt")
    );
  } else {
    return false;
  }
}

export const setUpBearerAuth = (axios: AxiosInstance) => {
  // This function will set up autherization request header
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("jwt")}`;
};

export const removeBearerAuth = (axios: AxiosInstance) => {
  // This function will remove autherization request header
  axios.defaults.headers.common["Authorization"] = "";
};

export const signInAxi = async (email: string, password: string) => {
  // this function will sign in user by sending post request (using axios) to the backend (/user/signin)
  try {
    const response = await axios.post("/user/signin", {
      email,
      password,
    });
    // Here it will set local storage items and autherization request header
    if (typeof window !== "undefined") {
      localStorage.setItem("email", email);
      localStorage.setItem("jwt", response.data);
    }
    setUpBearerAuth(axios);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const signUpAxi = async (email: string, password: string) => {
  // this function will sign up user by sending post request (using axios) to the backend (/user/signup)
  try {
    await axios.post("/user/signup", {
      email,
      password,
    });
  } catch (error) {
    console.log(error);
    return false;
  }

  //   If response is positive it will sign in user with sign in function
  return signInAxi(email, password);
};

export const signOut = (): void => {
  // This function will sign out user by removing localstorage items and removing bearer autherization request header
  if (typeof window !== "undefined") {
    localStorage.removeItem("email");
    localStorage.removeItem("jwt");
  }

  removeBearerAuth(axios);
};

// Async function for creating, getting and deleting Lists and tasks inside of the lists

export const getAllLists = async () => {
  // This function will get all lists which user have from "/todo/lists"
  setUpBearerAuth(axios);

  try {
    const response = await axios.get("/todo/lists");
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
    return { status: 401, data: null };
  }
};

export const createList = async (name: string) => {
  setUpBearerAuth(axios);

  //   This function will create new list
  try {
    const response = await axios.post("/todo/lists", {
      name,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteList = async (id: number) => {
  setUpBearerAuth(axios);
  // This function will delete selected list using its id
  try {
    const response = await axios.delete(`/todo/lists/${id}`);
    return response.status;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getList = async (id: number) => {
  setUpBearerAuth(axios);
  //   This function will get selected list by using its id

  try {
    const response = await axios.get(`/todo/lists/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getAllTasks = async (id: number) => {
  setUpBearerAuth(axios);

  try {
    const response = await axios.get(`/todo/lists/${id}/tasks`);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createTask = async (listId: number, taskName: string) => {
  setUpBearerAuth(axios);
  // This function will create new task in selected list
  try {
    const response = await axios.post(`/todo/lists/${listId}/tasks`, {
      taskName,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return { status: 422, data: null };
  }
};

export const deleteTask = async (listId: number, taskId: number) => {
  setUpBearerAuth(axios);
  // This function will delete selected task from selected list
  try {
    const response = await axios.delete(
      `/todo/lists/${listId}/tasks/${taskId}`
    );
    return response.status;
  } catch (error) {
    console.log(error);
    return false;
  }
};
