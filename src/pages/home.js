import React from "react";
import Form from "../components/form";

class Home extends React.Component {

  state = {
    error: undefined
  };

  // метод для проверки формы входа, если данные правильные записывает в куки login и переадресует пользователся на страницу с таблицей
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
          {/*Отправляем компоненту Form свойства authMethod(Чтобы компонент Form мог вызвать метод authMethod этого компонента) и error(для отображения ошибок)*/}
          <Form authMethod={this.authMethod} error={this.state.error} />
      </div>
      );
  }
}


export default Home;