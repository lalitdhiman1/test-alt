import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginAction, loginErrorAction } from '../Actions/index';
import renderField from './RenderField';
import './login.css';

const validate = (values) => {
  const errors = {};
  if (!values.username) { 
    errors.username = 'Required';
  } else if (values.username.length < 2) {
    errors.username = 'Minimum be 2 characters or more';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};



const LoginPage = (props) => {
  const {
    handleSubmit, pristine, submitting, reset, login, loginError, hasError,
  } = props;
  const formSubmit = (values) => {
    const { username, password } = values;
    fetch('https://swapi.co/api/people/?search='+username)
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        if(data.count===0){
          loginError({
            hasError: 'Invalid Password',
          });
          return false;
        }else{
        data.results.map((i) => {
          if (i.name.toLowerCase() === username.toLowerCase()) {
            if (i.birth_year === password) {
              const isLuke = username.toLowerCase() === 'luke skywalker';
              login({
                isUserLoggedIn: true,
                username,
                isLuke,
              });
              localStorage.setItem("isLoggedIn", true)
              return null;
            }
            loginError({
              hasError: 'Invalid Password',
            });
            return null;
          }
          loginError({
            hasError: 'No User Found',
          });
          return null;
        });
      }
      });
    
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className='login-container'>
        <div className='login-box'>
        <p className="example">Example:  Username: Luke Skywalker Password : 19BBY 

</p>
          <Field
            id='username'
            name='username'
            label='Username'
            type='text'
            component={renderField}
          />
          <Field
            name='password'
            label='Password'
            type='password'
            component={renderField}
          />
          {hasError && <div className='error-msg'> {hasError} </div>}
          <div className="buttonControl">
          <button
            className='btn btn-primary'
            type='submit'
            disabled={pristine || submitting}
          >
          Submit
          </button>
          <button
            className='btn btn-primary'
            value='button'
            onClick={reset}
            disabled={pristine || submitting}
          >
          Clear
          </button>
          </div>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = state => ({
  isUserLoggedIn: state.loginReducer.isUserLoggedIn,
  username: state.loginReducer.username,
  isLuke: state.loginReducer.isLuke,
  hasError: state.loginReducer.hasError,
});

const mapDispatchToProps = dispatch => ({
  login: props => dispatch(loginAction(props)),
  loginError: props => dispatch(loginErrorAction(props)),
});
 
const LoginPageComponent = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
const initialValues = {
  username: 'luke skywalker',
};
export default reduxForm({
  form: 'login',
  validate,
  initialValues
})(LoginPageComponent);

 