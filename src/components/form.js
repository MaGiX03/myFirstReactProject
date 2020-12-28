import React from "react";

const Form = props => (
	<div>
		<form onSubmit={props.authMethod}>
			<div className="form-group">
				<input className="form-control" type="text" name="login" placeholder="Логин"/>
			</div>
			<div className="form-group">
				<input className="form-control" type="password" name="password" placeholder="Пароль"/>
			</div>
				<button>Войти</button>
		</form>
		<p>{ props.error }</p>
	</div>
	)

export default Form;