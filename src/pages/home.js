import React from "react";
import Form from "../components/form";

class Home extends React.Component {

  state = {
    error: undefined
  };

  authMethod = (e) => {
    e.preventDefault();
    const login = e.target.elements.login.value;
    const password = e.target.elements.password.value;
    if (login === "user" && password === "qwerty123") {
      document.cookie = "user=" + login;
      window.location.href = "/soccer_table";
    }
    else {
      this.setState({
        error: "Неверный логин или пароль"
      });
    }
      

  }

  render() {
    return (
      <div>
          <Form authMethod={this.authMethod} error={this.state.error} />
      </div>
      );
  }
}


export default Home;