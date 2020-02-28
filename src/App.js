import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import SearchPage from './Components/SearchPage';
import LoginPage from './Components/LoginPage';
import './App.css';
const App = (props) => {
  const isUserLogedin =  JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  const { isUserLoggedIn } = props;
  console.log(props.isUserLoggedIn)
  return (
    <Fragment>
      {(isUserLoggedIn || isUserLogedin) ? <SearchPage /> : <LoginPage />}
    </Fragment>
  ); 
};

const mapStateToProps = state => ({
  isUserLoggedIn: state.loginReducer.isUserLoggedIn,
});

export default connect(mapStateToProps)(App);
 