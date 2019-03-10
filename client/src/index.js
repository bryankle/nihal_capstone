import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers";
import Homepage from "./containers/Homepage";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import Signout from "./containers/Signout";
import Feature from "./containers/Feature";
import AdminFeature from "./containers/AdminPage";
import CreateUser from "./containers/CreateUser";
import BusinessInformation from "./containers/BusinessInformation";
import HomepageHeading from "./containers/Landing";
import Profile from "./containers/Profile";
import CreateAward from "./containers/CreateAward";
import ViewAwards from "./containers/ViewAwards";
import BusReceived from "./containers/Queries/BusReceived";
import BusSent from "./containers/Queries/BusSent";
import BusType from "./containers/Queries/BusType";
import BusMonth from "./containers/Queries/BusMonth";
import BusRange from "./containers/Queries/BusRange";
import BusTotal from "./containers/Queries/BusTotal";

const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(
  persistedReducer,
  {
    auth: { authenticated: localStorage.getItem("token") },
    admin: false
  },
  applyMiddleware(reduxThunk)
);
const persistor = persistStore(store);

const routing = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Homepage>
          <Route path="/" exact component={HomepageHeading} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/signout" component={Signout} />
          <Route path="/feature" component={Feature} />
          <Route path="/admin-feature" component={AdminFeature} />
          <Route path="/create-user" component={CreateUser} />
          <Route path="/businessinformation" component={BusinessInformation} />
          <Route path="/profile" component={Profile} />
          <Route path="/createaward" component={CreateAward} />
          <Route path="/viewawards" component={ViewAwards} />
          <Route path="/busreceived" component={BusReceived} />
          <Route path="/bussent" component={BusSent} />
          <Route path="/bustype" component={BusType} />
          <Route path="/busmonth" component={BusMonth} />
          <Route path="/busrange" component={BusRange} />
          <Route path="/bustotal" component={BusTotal} />
          {/* <Route path='/admin-table' component={AdminTable} />      */}
        </Homepage>
      </Router>
    </PersistGate>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));
