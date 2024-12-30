import {
  createBrowserRouter, createRoutesFromElements, Route
} from "react-router-dom";
import { App,
        ErrorPage,
        UserListPage,
        UserViewPage,
        UserCreatePage,
        Layout,
        HookUseState,
        EffectHook,
} from './components/index.js';

export const appRouter = createBrowserRouter(
    createRoutesFromElements(
    <Route element={<Layout />} errorElement={<ErrorPage />} >
      <Route path="/" element={<App />} />
      <Route path="/userList"  element={<UserListPage />} />
      <Route path="/user/:id"  element={<UserViewPage/>} />
      <Route path="/user/create" element={<UserCreatePage/>} />
      <Route path="/useState" element={<HookUseState />} />
      <Route path="/useEffect" element={<EffectHook />} />
    </Route>
  )
)
