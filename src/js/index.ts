import axios, {
    AxiosResponse,
    AxiosError} from "../../node_modules/axios/index";

interface ICar {
    id: number;
    model:string;
    vendor:string;
    price:number;
}

let divElement : HTMLDivElement = <HTMLDivElement> document.getElementById("content");
let buttonelement:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton");  
buttonelement.addEventListener('click',showAllCars);

let buttonAdd : HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");
buttonAdd.addEventListener('click',addCar);

// let buttonDelete:HTMLButtonElement = <HTMLButtonElement> document.getElementById("deleteButton");
// buttonDelete.addEventListener('click',deleteCar);

let uri :string = "https://webapicar20190326034339.azurewebsites.net/api/cars";

function showAllCars():void {

    axios.get<ICar[]>(uri)
    .then(function (response:AxiosResponse<ICar[]>):void{

        let result : string = "<ol>";
        response.data.forEach((car : ICar) => {
            if(car == null)
              {
                result += "<li> NULL element</li>"        
              }
            else
              {
                result += "<li> "+car.id +"<b> model</b>: "+ car.model + " <i>vendor</i> :" + car.vendor +" pris:" +car.price.toString() +"</li>"        

              }
            });

        result += "</ol>";

        divElement.innerHTML = result;

    }
    )
    .catch(function (error:AxiosError):void{
            divElement.innerHTML= error.message;        
    })
    


}

function addCar():void{
 
    let addModelelement: HTMLInputElement = <HTMLInputElement>document.getElementById("addModel");
    let addVendorElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addVendor");
    let addPriceElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addPrice");
    
    let myId: number = 0;
    let myModel: string = addModelelement.value;
    let myVendor:string = addVendorElement.value;
    let myPrice : number = +addPriceElement.value;

    axios.post<ICar>(uri,{model:myModel,vendor:myVendor, price:myPrice})
    .then((response:AxiosResponse) => {console.log("response " +response.status + " " +response.statusText )})
    .catch((error:AxiosError) => {console.log(error);} )
    //.then( ()=> {co.innerHTML='<h2> er i finally </h2>'})
}


