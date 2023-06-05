import { usersApi } from "./users/users.api";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import { authApi } from "./auth/auth.api";
import { coursesApi } from "./courses/courses.api";
import { userCoursesApi } from "./userCourses/userCourses.api";
import { userApi } from "./user/user.api";

const combinedReducer: any = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [coursesApi.reducerPath]: coursesApi.reducer,
  [userCoursesApi.reducerPath]: userCoursesApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

const rootReducer = (state: any, action: any) => {
  //clear state on log out
  if (action.type === "userApi/resetApiState") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(coursesApi.middleware)
      .concat(userCoursesApi.middleware)
      .concat(userApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
