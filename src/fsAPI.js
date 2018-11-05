//FourSquare API request (https://www.youtube.com/watch?v=Dj5hzKBxCBI&t=648s&index=4&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP)

class Helper {  
  /*this object contains all the parts needed to put together an API request. 
  each static function is used within the 'fetch' function to create a API request URL*/
  static baseURL(){
    return "https://api.foursquare.com/v2";
  }

  static auth() { 
    const keys = {
      client_id: "EZHTIOH3GZHL2D2XATRNUIBLR0353FO5UBCCK0INPFHOJEWQ",
      client_secret: "N4DJAQEZRIZ1RV2ZFA0MLDIVSL2EZKUEJLV5WKZBSBG0E5A3",
      v: "20181101"
    };
    return Object.keys(keys)
      .map(key => `${key}=${keys[key]}`)
      .join("&");
  }
  static urlBuilder(parameters){//this allows us to enter search parameters to when doing an API request
    if (!parameters){
      return ""
    }
    return Object.keys(parameters)
      .map(key => `${key}=${parameters[key]}`)
      .join("&");
    };
  
  static headers() {
    return {
      Accept: 'application/json'
    };
  }
  static simpleFetch(endpoint, method, parameters) { 
    let requestData = {
      method,
      headers : Helper.headers()
    };
    return fetch( //puts together API request url and response
      `${Helper.baseURL()}${endpoint}?${Helper.auth()}&${Helper.urlBuilder(parameters)}`,
      requestData  
      ).then(res => res.json())
  }
}

export default class SquareAPI {
  static search(parameters) { //method for searching venues
    return Helper.simpleFetch('/venues/search', "GET", parameters);
  }
  static getVenue(VENUE_ID) { //mehtod for getting specific information on venues
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET")
  }
}

