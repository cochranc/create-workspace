import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styleSheets/generalStyles.css";

import Home from "./home";
import About from "./about";
import Faq from "./faq";
import Tutorial from "./tutorial";
import SignUp from "./signUp";
import Gallery from "./Gallery";
import Challenges from "./challenges";
import Navigation from "./navBar";
import Footer from "./footer";
import Contact from "./contact";
import Privacy from "./privacy";
import License from "./license";
import Development from "./development";
import SignIn from "./signIn";
import Settings from "./settings";
import UserProfile from "./profile";
import Expert from "./expert/";

import Community from "./community";
import ReportForm from "./report";
import User from "./user";
//import WorkSpace from "./Workspace";
import WorkspaceComponent from './workspace/';

/** New option for navigation bars*/
import BaseNavigation from "./navBarBase";
import UserNavigation from "./navBarUser";

import { Container } from "react-bootstrap";


class App extends Component {
  render() {
    /* Authentication if user is signed in -- from database? */
    const isSignedIn = false;
    return (
      <div id="page-container">
        
        
        <BrowserRouter>
          {isSignedIn ? <UserNavigation /> : <BaseNavigation />}
          <Container fluid id="content-wrap">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About} />
              <Route path="/tutorial" component={Tutorial} />
              <Route path="/challenges" component={Challenges} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/signUp" component={SignUp} />
              <Route path="/contact" component={Contact} />
              <Route path="/license" component={License} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/faq" component={Faq} />
              <Route path="/development" component={Development} />
              <Route path="/signIn" component={SignIn} />
              <Route path="/settings" component={Settings} />
              <Route path="/profile" component={UserProfile} />
              <Route path="/community" component={Community} />
              <Route path="/report" children={ReportForm} />
              <Route path="/user" children={User} /> 
              <Route path="/img/:url" children={<Gallery />} />
              <Route path="/createWorkspace" children = {<WorkspaceComponent/>}/>
              <Route path="/expert" children={<Expert />} />
            </Switch>
          </Container>
          <Footer id="footer" />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
