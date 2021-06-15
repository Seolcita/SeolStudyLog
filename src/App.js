import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./connections/auth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//paths
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Header from "./components/nav/Header";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminRoute from "./components/routes/AdminRoute";
import ManageSubject from "./pages/ManageSubject";
import CreateNote from "./pages/CreateNote";
import EditSubject from "./pages/EditSubject";
import DetailNote from "./pages/DetailNote";
import EditNote from "./pages/EditNote";

// const Home = React.lazy(() => import("./pages/Home"));
// const Login = React.lazy(() => import("./pages/auth/Login"));
// const Header = React.lazy(() => import("./components/nav/Header"));
// const ForgotPassword = React.lazy(() => import("./pages/auth/ForgotPassword"));
// const AdminRoute = React.lazy(() => import("./components/routes/AdminRoute"));
// const ManageSubject = React.lazy(() => import("./pages/ManageSubject"));
// const CreateNote = React.lazy(() => import("./pages/CreateNote"));
// const EditSubject = React.lazy(() => import("./pages/EditSubject"));
// const DetailNote = React.lazy(() => import("./pages/DetailNote"));
// const EditNote = React.lazy(() => import("./pages/EditNote"));

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    //auth.onAuthStateChange() >> get user info from firebase
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <AdminRoute exact path="/manage/subjects" component={ManageSubject} />
        <AdminRoute exact path="/create/note" component={CreateNote} />
        <AdminRoute exact path="/edit/subject/:slug" component={EditSubject} />
        <Route exact path="/note/edit/:slug" component={EditNote} />

        <Route exact path="/note/:slug" component={DetailNote} />

        {/* <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} /> */}
      </Switch>
    </>
  );
};

export default App;
