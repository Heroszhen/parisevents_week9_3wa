import ParisEvents from '../models/ParisEvents.js';
import app from '../app/app.js';

export default class Search{
    constructor() {
        this.view = "search.html";
        this.tab = [];
    }

    executeHttpRequest(){
        document.getElementById("research").addEventListener("click", ()=>{
            console.log("search : executeHttpRequest");
            let keywords = document.querySelector("#keywords");
            let year = document.querySelector("select#year");
            let sort = document.querySelector("select#sort");
            console.log(keywords.value);
            this.search(keywords.value,year.value,sort.value);
        });

        
        window.addEventListener('scroll', ()=>{
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            if(scrollHeight > clientHeight && scrollTop + clientHeight === scrollHeight) {
                let courant = this.getCourant(this.tab);
                app.dom.setTemplate2(courant);
              }
        });

        
        
    }

    search(keywords,year,sort){
        let url = (new ParisEvents()).urlBase;
        fetch(url)
        .then(response => response.json())
        .then(json => {
            let datas = json["records"];console.log(datas);
            let tab = [];
            for(let entry in datas){
                if(keywords != '' && keywords != null){
                    if(datas[entry]['fields']['title'].toLowerCase().includes(keywords.toLowerCase()) && datas[entry]["fields"]["date_start"].includes(year))tab.push(datas[entry]);
                }else if(year != "all"){
                    if(datas[entry]["fields"]["date_start"].includes(year))tab.push(datas[entry]);
                }else{
                    tab.push(datas[entry]);
                }
            }
            if(sort == 'title' && sort != "" && sort != null){
                tab.sort(function(a,b){
                    return a['fields']['title'].localeCompare(b['fields']['title']);
                });
            }else if(sort == "croissant"){
                tab.sort(function(a,b){
                    return new Date(b["fields"]["date_start"]) - new Date(a["fields"]["date_start"]);
                });
            }else{
                tab.sort(function(a,b){
                    return new Date(a["fields"]["date_start"]) - new Date(b["fields"]["date_start"]);
                });
            }
            this.tab = tab;
            let courant = this.getCourant();
            app.dom.setTemplate(courant);
            this.printGoogleMap(tab);
         }); 
    
    }


    printGoogleMap(coords) {
        // afficher la div google map
        document.getElementById("map").style.display = "block";
        // executer le code de google
        
            let map = new google.maps.Map(document.getElementById("map"),{
                center: {lat:48.833, lng:2.333},
                zoom:8
            });
            for(let one of coords){
                if(one["geometry"]){
                    var marker = new google.maps.Marker({
                        // A chaque boucle, la latitude et la longitude sont lues dans le tableau
                        position: {lat: one["geometry"]["coordinates"][1], lng: one["geometry"]["coordinates"][0]},
                        // On en profite pour ajouter une info-bulle contenant le nom de la ville
                        title: one["fields"]["title"],
                        map: map
                    });
                }

                let infowindow = new google.maps.InfoWindow({
                    content: one["fields"]["description"]
                });

                marker.addListener("click", () => {
                    infowindow.open(map, marker);
                });
            }
    }

    getCourant(){
        let courant = [];
        if(this.tab[0]){
            courant.push(this.tab[0]);
        }
        if(this.tab[1]){
            courant.push(this.tab[1]);
        }
        this.tab.shift();
        this.tab.shift();
        return courant;
    }
}