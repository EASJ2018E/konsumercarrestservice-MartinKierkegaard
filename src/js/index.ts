import axios, {
    AxiosResponse,
    AxiosError} from "../../node_modules/axios/index";

//http://rest-pele-easj-dk.azurewebsites.net/api/Cars

interface ICar {
    model:string;
    vendor:string;
    price:number;
}

let divElement : HTMLDivElement = <HTMLDivElement> document.getElementById("content");
let buttonelement:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton");  
buttonelement.addEventListener('click',showAllCars);

function showAllCars():void {

    let uri :string = "http://rest-pele-easj-dk.azurewebsites.net/api3/Cars";

    axios.get<ICar[]>(uri)
    .then(function (response:AxiosResponse<ICar[]>):void{

        let result : string = "<ol>";
        response.data.forEach((car : ICar) => {
            result += "<li> <b>model</b>: "+ car.model + " <i>vendor</i> :" + car.vendor +" pris:" +car.price.toString() +"</li>"
        });

        result += "</ol>";

        divElement.innerHTML = result;

    }
    )
    .catch(function (error:AxiosError):void{
            divElement.innerHTML= error.message;        
    })

}