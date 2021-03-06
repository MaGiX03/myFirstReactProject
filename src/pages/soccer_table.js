import React from "react";
import TableRow from "../components/table_row";

class SoccerTable extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      error: null, 
      isLoaded: false, //для проверки происходит ли запрос в данное время
      season: 8, // Ид сезона который нам нужен
      clubs: [], // данные о клубах
      teamMatches: [], // данные о матчах определенного клуба
      isTeam: false, // выбран ли определенный клуб
      liveMatches: [], // данные о матчах которые идут в текущее время
      prev_page: false, // данные о страницах в списке матчей клуба
      next_page: false,  
      current_page: 1, 
          };
  }
// Действия при первоначальном рендеринге
  componentDidMount() {
  	// проверяем куки, чтобы узнать авторизован ли пользователь, в ином случае переадресуем к начальной странице
  	if (!getCookie("user")) {
			window.location.href = "/";
			return;
		}
	// вызываем метод для получения данных о футбольной таблице из API LiveScore
  		this.gettingSoccerTable();
  		
  		
  	}

	gettingSoccerTable() {


		fetch(`https://live-score-api.p.rapidapi.com/leagues/table.json?secret=ljFi7Kv2Q77weQm9nL8b6tTuc6FIrKmN&key=VxpZNkkIoJcbwl4D&competition_id=2&season=${this.state.season}`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "16f10e782amsh633a6d24e8cbb81p1c7547jsn9d128992d0d8",
				"x-rapidapi-host": "live-score-api.p.rapidapi.com"
			}
		})
  		.then(res => res.json())
  		.then(
  			(result) =>{
  				this.setState({
  					isLoaded: true,
  					clubs: result.data.table
  				});
  			},
  			(error) => {
  				this.setState({
  					isLoaded: true,
  					error
  				});
  			}
  			)
		if (this.state.season === 8) {
			this.gettingLiveScore();
		}
	}

	
	// метод для получения данных о текущих матчах
	gettingLiveScore() {

		fetch("https://live-score-api.p.rapidapi.com/scores/live.json?secret=ljFi7Kv2Q77weQm9nL8b6tTuc6FIrKmN&key=VxpZNkkIoJcbwl4D&competition_id=2", {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "16f10e782amsh633a6d24e8cbb81p1c7547jsn9d128992d0d8",
				"x-rapidapi-host": "live-score-api.p.rapidapi.com"
			}
		})
  		.then(res => res.json())
  		.then(
  			(result) =>{
  				this.setState({
  					isLoaded: true,
  					liveMatches: result.data.match
  				});
  			},
  			(error) => {
  				this.setState({
  					isLoaded: true,
  					error
  				});
  			}
  			)

	}

	// метод для получения матчей определенного клуба
	gettingTeamMatches() {
		fetch(`https://live-score-api.p.rapidapi.com/scores/history.json?key=VxpZNkkIoJcbwl4D&secret=ljFi7Kv2Q77weQm9nL8b6tTuc6FIrKmN&team=${this.state.isTeam}&page=${this.state.current_page}`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "16f10e782amsh633a6d24e8cbb81p1c7547jsn9d128992d0d8",
				"x-rapidapi-host": "live-score-api.p.rapidapi.com"
			}
		})
  		.then(res => res.json())
  		.then(
  			(result) =>{
  				this.setState({
  					isLoaded: true,
  					teamMatches: result.data.match,
  					prev_page: result.data.prev_page,
  					next_page: result.data.next_page


  				});
  			},
  			(error) => {
  				this.setState({
  					isLoaded: true,
  					error
  				});
  			}
  			)
	}


	// метод для изменения состояния сезона
	changeSeason = async (e) => {
		let value = e.target.value;
		await this.setState({
			season:value,
			isLoaded:false
		})
		// вызываем метод, чтобы отобразить таблицу уже другого сезона
		this.gettingSoccerTable();
	}

	// метод для показа текущих матчей, если сейчас нету матчей возвращает null, если есть возвращает список текущих матчей
	isLive() {
		const liveMatches = this.state.liveMatches;
		const season = this.state.season;
		if (season === 8 && liveMatches != '') {
			return (
			<div>
			<h1>Live</h1>
	    			<ul>
	    			{liveMatches.map(match =>(
	   					
	   					<li key={match.id}>
	   						{match.home_name} vs {match.away_name} ({match.score}), {match.status}
	   					</li>

	   					))}
	    			</ul>
	    			</div>
	    			);
		}
		else {
			return null;
		}
		
	}

	// метод для изменения состояния isTeam и вызова метода получения матчей клуба
	runGettingTeamMatches = async (e) => {
		let team = e.target.attributes.team_id.nodeValue;
		await this.setState({
			isLoaded: false,
			isTeam: team,
		});
		this.gettingTeamMatches();
	}
	// возвращения назад к таблице лиги от таблицы матчей клуба
	backToTable = async () => {
		await this.setState({
			isLoaded: true,
			isTeam: false,
		});
	}
	// переход по страницам таблицы матчей клуба
	goToPage = async (page) => {
		await this.setState({
			isLoaded: false,
			current_page: page
		});
		// вызываем метод получения матчей клуба, чтобы выгрузить данные другой страницы
		this.gettingTeamMatches();
	}


  render() {
  	// берём данные о состояниях компонента
  	const {error, isLoaded,season, clubs, teamMatches, isTeam, prev_page, next_page, current_page} = this.state;
  	// проверяем на ошибки при запросах, если есть выводим
   	if (error) {
   		return <p> Error {error.message} </p>
   	// проверяем закончились ли запросы
   	} else if (!isLoaded) {
   		return <p> Loading... </p>
   	// выодим таблицу лиги, если нету выбранного клуба
   	} else if (!isTeam) {
   		return (
   			<div className="container">
	    		<div className="form-group">
			    	<select className="form-control" id="select" value={season} onChange={this.changeSeason}>
							<option value="8">Сезон 2020-2021</option>
							<option value="4">Сезон 2019-2020</option>
					</select>
	    		</div>
	    		{this.isLive()}
	    		<div className="table-responsive">
		          <table className="table">
					  <thead>
					    <tr>
					      <th scope="col">Клуб</th>
					      <th scope="col">И</th>
					      <th scope="col">В</th>
					      <th scope="col">Н</th>
					      <th scope="col">П</th>
					      <th scope="col">ЗМ</th>
					      <th scope="col">ПМ</th>
					      <th scope="col">РМ</th>
					      <th scope="col">О</th>
					    </tr>
					  </thead>
					  <tbody>
					   
	   				{clubs.map(club =>(
	   						<TableRow key={club.name} club={club} getMatches={this.runGettingTeamMatches} />
	   				

	   					))}
	   		
					  </tbody>
					</table>
		    	</div>
      		</div>
   			
   		
   			);
   	}
   	// выводим матчи выбранного клуба
   	else {
   		return (
   			<div className="container">
   			<button onClick={this.backToTable}>Назад</button>
				<div className="table-responsive">
				<h1>Матчи выбранной команды</h1>
		          <table className="table">
					  <thead>
					    <tr>
					      <th scope="col">Дома</th>
					      <th scope="col">В гостях</th>
					      <th scope="col">Счёт</th>
					      <th scope="col">Лига</th>
					      <th scope="col">Дата</th>
					    </tr>
					  </thead>
					  <tbody>
					   	
					   	{teamMatches.map(match =>(
	   						<tr key={match.id}>
								<td>{match.home_name}</td>
								<td>{match.away_name}</td>
								<td>{match.score}</td>
								<td>{match.competition_name}</td>
								<td>{match.date}</td>
							
							</tr>
	   				
							
	   					))}
					   {/*проверяем существует ли предыдущая или следующая страниц, если есть выводим кнопки*/}
	   					{ prev_page  &&
	   					<button onClick={e => this.goToPage(current_page - 1)}>Prev</button>
	   					}
	   					{ next_page &&
						<button onClick={e => this.goToPage(current_page + 1)}>Next</button>
						}
					  </tbody>
					</table>
		    	</div>
		    </div>
	    			);

   	}


  }
}


function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


export default SoccerTable;