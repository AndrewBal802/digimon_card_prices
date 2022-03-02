import http from "../http-common";

class WebsiteDataService{
	create(data){
		return http.post("/digimon_cards", data);
	}

	get_all(){
		return http.get("/digimon_cards");
	}

	find_by_card_id(id){
		return http.get("/digimon_cards/${id}");
	}

	find_by_card_name(name){
		return http.get("/digimon_cards?name=${name}");
	}

	search_ebay(keyword){
		return http.post("/digimon_cards/ebay_search", keyword);

	}


}

export default new WebsiteDataService();
