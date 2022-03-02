import React, { Component } from "react";
import WebsiteDataService from "../services/service";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser'; 

export default class Home extends Component{
	constructor(props){
		super(props);
		this.onChangeSearchCard = this.onChangeSearchCard.bind(this);
	    this.retrieveCards = this.retrieveCards.bind(this);
	    this.refreshList = this.refreshList.bind(this);
	    this.searchCard = this.searchCard.bind(this);
		this.setActiveCard = this.setActiveCard.bind(this);
		this.searchEbay = this.searchEbay.bind(this);
	    this.state = {
	    	cards: [],
	    	currentCard: null,
	    	currentIndex: -1,
	    	searchCard: "",
			ebaySearch: []
	    };
	}

	componentDidMount(){
		this.retrieveCards();
	}

	retrieveCards(){
		WebsiteDataService.get_all()
			.then(res =>{
				this.setState({
					cards: res.data
				});
				console.log(res.data);
			})
			.catch( err => {
				console.log(err);
			})

	}

	setActiveCard(card, index){
		this.setState({
			currentCard: card,
			currentIndex: index
		});

		this.searchEbay(card.name);
		console.log("HERE ACTIVE CARD FOR EBAY SEARCH", this.state.ebaySearch);
		
	}

	refreshList(){
		this.retrieveCards();
		this.setState({
			currentCard: null,
			currentIndex: -1,
			ebaySearch: []
		});
	}

	searchCard(){
		WebsiteDataService.find_by_card_name(this.state.searchCard)
			.then(res => {
				this.setState({
					cards: res.data
				});
				console.log(res.data);
			})
			.catch( err =>{
				console.log(err);
			});

	}
	

	searchEbay(currentCardName){
		console.log("HERE AT EBAY SEARCH", currentCardName);
		var data = {
			keyword: currentCardName
		};
		WebsiteDataService.search_ebay(data)
			.then(res => {
				this.setState({
					ebaySearch: res.data[0].searchResult[0].item 
				});
				console.log(res.data[0].searchResult[0].item);
			})
			.catch( err =>{
				console.log(err);
			});
	}
	onChangeSearchCard(e) {
	    const searchCard = e.target.value;

	    this.setState({
	      searchCard: searchCard
	    });

		this.renderGrid(this.state.cards, this.state.currentIndex);
  	}

	renderGrid(cards, currentIndex){
		var output = [];
		console.log("Current Index", currentIndex);

		var currentRow = [];
		var cardPerRow = 5;
		for (let index = 0; index < cards.length; index ++){
			console.log(this.state.searchCard, cards[index].name);
			if (!this.state.searchCard || this.state.cards[index].name.toLowerCase().startsWith(this.state.searchCard.toLowerCase())){
				

			
			var data = (Object.values(cards[index].img_data))[1];
//console.log(data, cards[index].img_data);
			try{
			var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(data)));
			}
catch (err){
console.log("ERROR");

}
console.log(base64String);
				if (base64String){
				currentRow.push(
					<div class="col-md-3 border-5 rounded rounded-lg " >
						<a class={"list-group-item card-box " + (index === currentIndex ? "active" : "")} onClick={() => this.setActiveCard(cards[index], index)} key={index} style={{backgroundColor: cards[index].type}}> 
							<h4>{cards[index].card_id}</h4>

							<img src={`data:${cards[index].img_type};base64,${base64String}`} class="card-img" />
							<p><strong>Name:</strong><br/> {cards[index].name}</p>
							<p><strong>Price:</strong> <br/>${cards[index].price}</p>
							
						</a>
					</div>
				);

	
				if((index  % cardPerRow) + 1 === 0 && index > 0){
					output.push(<div class="row">{currentRow}</div>)
					currentRow = [];
				}
				base64String = ""
			}
			}
		}
		
		output.push(<div class="row g-3">{currentRow}</div>)
		
		return output;
	}

  	render(){
  		const { searchCard, cards, currentCard, currentIndex, currentEbaySearch} = this.state;

  		return(
  		<div className="d-flex list row justify-content-center">
			<div className="col-md-8">
			<div className="input-group mb-3 ">
				<input type="text" className="form-control" placeholder="Search by title" value={searchCard}  onChange={this.onChangeSearchCard} />
				<div className="input-group-append">
			
				</div>
			</div>
			</div>
			<div className="col-md-6">
			<h4>Digimon Cards</h4>
			
						
			<div class="container-fluid grid">

				{
					cards && 
					
					this.renderGrid(cards,currentIndex)
						
				
				}

			</div>

			{/*
			<ul className="list-group flex-md-col">
				{ 
					cards && cards.map((card, index) => (
						<li className={ "list-group-item " + (index === currentIndex ? "active" : "")} onClick={() => this.setActiveCard(card, index)}key={index}>
							{card.card_id}
						</li>
					))
				}
			</ul>
			*/}

			</div>

			<div className="col-md-6">
				{
					currentCard ? 
					( 
						<div>
							<h1>Current Digimon Card</h1>
							<div class="row">
								<div class="col-md-8">

										<div>
											<label>
												<strong>Card ID: </strong> 
											</label> 
											{ currentCard.card_id}
										</div>

										<div>
											<label>
												<strong>Card Name: </strong> 
											</label> 
											{ currentCard.name}
										</div>

										<div>
											<label>
												<strong>Level: </strong> 
											</label> 
											{ currentCard.level}
										</div>

										<div>
											<label>
												<strong>DP: </strong> 
											</label> 
											{ currentCard.DP}
										</div>

										<div>
											<label>
												<strong>Type: </strong> 
											</label> 
											{ currentCard.type}
										</div>
									</div>
									<div class="col-md-4">
										
										<img src={`data:${currentCard.img_type};base64,${btoa(String.fromCharCode.apply(null, new Uint8Array((Object.values(currentCard.img_data))[1])))}`} class="card-img" />
									</div>
									</div>
								<div class="row">
								<h2><strong>Ebay Search</strong></h2>
									<table className="table">
										<thead> 
											<tr>
											<th scope="col">Item Name</th>
											<th scope="col">Price (includes shipping cost) ($CAD)</th>
											</tr>
										</thead>
										<tbody>
											{
										this.state.ebaySearch && this.state.ebaySearch.map((item, index) => (
											<tr>
												
											<td className={ "list-group-item"} >
												<a href={item.viewItemURL[0]} target="_blank" rel="noopener noreferrer">
													{item.title[0]}
												</a>
											
											</td>
											<td>{
			
												('shippingServiceCost' in item.shippingInfo[0] ? 
													((parseFloat(item.sellingStatus[0].currentPrice[0].__value__) + parseFloat(item.shippingInfo[0].shippingServiceCost[0].__value__)).toFixed(2)) :
													(item.sellingStatus[0].currentPrice[0].__value__)
												)
											}</td>
											
											</tr>
										))
		}
										</tbody>
								
									</table>
								
								
							</div>
					<Link
						to={"/tutorials/" + currentCard.card_id}
						className="badge badge-warning"
					>
						Edit
					</Link>
						</div>
					) : (
						<div>
						
							<h3>Click to view a card</h3>
						</div>
					)
				}
			</div>
        </div>

  		);
  	}


}
