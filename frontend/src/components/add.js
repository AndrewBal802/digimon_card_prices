import React, { Component } from "react";
import WebsiteDataService from "../services/service";
const path = require("path");


var axios = require('axios')
var FormData = require('form-data')


export default class Add extends Component{
	constructor(props){
		super(props);
		this.onChangeCardID = this.onChangeCardID.bind(this);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeLevel = this.onChangeLevel.bind(this);
		this.onChangeDP = this.onChangeDP.bind(this);
		this.onChangeType = this.onChangeType.bind(this);
		this.onChangeImg = this.onChangeImg.bind(this);

		this.getPrice = this.getPrice.bind(this);
		this.createCard = this.createCard.bind(this);
		this.newCard = this.newCard.bind(this);

	    this.state = {
	    	id: null,
			card_id: "",
			name: "",
			level: "",
			DP: "",
			type: "",
			price: 0.0,
			price_difference: 0.0,
			selected_img: null,
			submitted: false
	    };
	}

	onChangeCardID(e){
		this.setState({
			card_id: e.target.value
		});
	}

	onChangeName(e){
		this.setState({
			name: e.target.value
		});
	}

	onChangeLevel(e){
		this.setState({
			level: e.target.value
		});
	}

	onChangeDP(e){
		this.setState({
			DP: e.target.value
		});
	}

	onChangeType(e){
		this.setState({
			type: e.target.value
		});
	}

	onChangeImg(e){
		let file = e.target.files[0];
		this.setState({
			selected_img : file
		})
	}

	getPrice(e){
		var data = {
			keyword: this.state.name
		};
		console.log(this.state.price);
		WebsiteDataService.search_ebay(data)
			.then(res => {
				this.setState({
					price: parseFloat(res.data[0].searchResult[0].item[0].sellingStatus[0].currentPrice[0].__value__)
				});
				console.log("HERE AT GET PRICE", this.state.price);
				
			})
			.catch( err =>{
				console.log(err);
			});	
		
	}
	createCard(e){
		var data = {
			card_id: this.state.card_id,
			name: this.state.name,
			level: this.state.level,
			DP: this.state.DP,
			type: this.state.type,
			price: this.state.price,
			price_difference:  0.0,
			selected_img: this.state.selected_img
		};

		console.log("CURRENT DATA", data);
		console.log(__dirname);

		WebsiteDataService.create(data)
			.then( res => {
				this.setState({
					id: res.data.id,
					card_id: res.data.card_id,
					name: res.data.name,
					level: res.data.level,
					DP: res.data.DP,
					type: res.data.type,
					price: res.data.price,
					price_difference: res.data.price_difference,
					submitted: true
			
				});
				console.log(res.data);
			})
			.catch( err => {
				console.log(err);
			});

			e.preventDefault();
	}

	

	newCard(){
		this.setState({
	    	id: null,
			card_id: "",
			name: "",
			level: "",
			DP: "",
			type: "",
			price: 0.0,
			price_difference: 0.0,
			submitted: false
	    });
	}


  	render(){
  		return (
			  <div className="submit-form" >
				  <iframe name="dummyframe" id="dummyframe" style={{display: 'none'}}></iframe>

				  {this.state.submitted ? (
					  <div>
					  <h4>Card Created!</h4>
					  <button className="btn btn-success" onClick={this.newCard}>
						Add
					  </button>
					</div>
				  ) : (
					  <div>
						  <form  role="form"  method="post"  action="http://localhost:8080/api/digimon_cards" encType="multipart/form-data" >
						<div className="form-group">
							<label>Card ID</label>
							<input type="text" className="form-control" id="card_id" required value={this.state.card_id} onChange={this.onChangeCardID} name="card_id" />
						</div>


						<div className="form-group">
							<label>Card Name</label>
							<input type="text" className="form-control" id="name" required value={this.state.name} onChange={this.onChangeName} name="name" />
						</div>

						<div className="form-group">
							<label>Level</label>
							<input type="text" className="form-control" id="level" required value={this.state.level} onChange={this.onChangeLevel} name="level" />
						</div>

						<div className="form-group">
							<label>DP</label>
							<input type="text" className="form-control" id="DP" required value={this.state.DP} onChange={this.onChangeDP} name="DP" />
						</div>

						<div className="form-group">
							<label>Card Type</label>
							<input type="text" className="form-control" id="type" required value={this.state.type} onChange={this.onChangeType} name="type" />
						</div>

						<div className="form-group">
							<input type="file" name="file" id="file" class="form-control-file border" onChange={this.onChangeImg}/>	
						</div>

						<div className="preview-images"></div>

				

					  
						<button  onClick={this.getPrice} className="btn btn-success">Create </button>
						</form>
						
					  </div>

					  
					  
					  
					  
				  )
				}
				<iframe name="hiddenFrame" style={{display: 'none'}}></iframe>
			  </div>
		  );
  	}


}
