import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { loginAction, requestQuestionsLoading } from '../redux/actions';
import fetchToken from '../services/fetchToken';
import logo from '../trivia.png';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      username: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateInputs);
  }

  validateInputs = () => {
    const { email, username } = this.state;
    const minLength = 2;
    if (email.length > minLength && username.length > minLength) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  saveUserLoginInfo = () => {
    const { dispatch } = this.props;
    const { email, username } = this.state;
    const userInfo = { email, username };
    dispatch(loginAction(userInfo));
  }

  handleClick = async () => {
    const { history, dispatch } = this.props;
    this.saveUserLoginInfo();
    await fetchToken();
    dispatch(requestQuestionsLoading());
    history.push('/game');
  }

  render() {
    const { email, username, isDisabled } = this.state;
    const { history } = this.props;

    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <label htmlFor="email">
          <input
            type="email"
            data-testid="input-gravatar-email"
            id="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Email"
          />
        </label>
        <label htmlFor="username">
          <input
            type="text"
            data-testid="input-player-name"
            id="username"
            name="username"
            value={ username }
            onChange={ this.handleChange }
            placeholder="Nome"
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Settings
        </button>
      </header>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
