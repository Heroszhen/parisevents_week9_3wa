let app = {
    // ----------------------------------------------------------------------------------------------------------------
    // MANIPULATION DU DOM DE L'APPLICATION
    // ----------------------------------------------------------------------------------------------------------------
    dom: {
        setTemplate:function(datas){
            if ("content" in document.createElement("template")) {
                // On prépare une ligne pour le tableau 
                var template = document.querySelector("#productrow");

                // On clone la ligne et on l'insère dans le tableau
                var tbody = document.querySelector("tbody");
                tbody.innerHTML = '';
                for(let entry of datas){
                    let clone = document.importNode(template.content, true);
                    let td = clone.querySelectorAll("td");
                    td[0].textContent = entry["fields"]["title"];
                    td[1].textContent = entry["fields"]["address_city"];
                    td[2].textContent = entry["fields"]["address_street"];
                    td[3].textContent = entry["fields"]["date_start"];

                    let img = document.createElement('img'); 
                    img.setAttribute("src",entry["fields"]["cover_url"]);
                    td[4].appendChild(img);

                    let a = document.createElement('a'); 
                    const regex = /-|:/gi;
                    let date1 = entry["fields"]["date_start"].replace(regex, '');
                    let date2 = entry["fields"]["date_end"].replace(regex, '');
                    let src = "https://calendar.google.com/calendar/u/0/r/eventedit?text="+entry["fields"]["title"]+"&dates="+date1+"/"+date2+"&ctz=America/Los_Angeles&details="+entry["fields"]["lead_text"]+"&location="+entry["fields"]["address_city"]+" , "+entry["fields"]["address_street"]+"&pli=1&uid=1606398179addeventcom&sf=true&output=xml";
                    a.setAttribute("href",src);
                    a.setAttribute("target","_blank");
                    a.setAttribute("class","btn btn-outline-primary");
                    a.textContent = "Ajouter";
                    td[5].appendChild(a);

                    tbody.appendChild(clone);
                }
            }
        },
        setTemplate2:function(datas){
            if ("content" in document.createElement("template")) {
                // On prépare une ligne pour le tableau 
                var template = document.querySelector("#productrow");

                // On clone la ligne et on l'insère dans le tableau
                var tbody = document.querySelector("tbody");
                for(let entry of datas){
                    let clone = document.importNode(template.content, true);
                    let td = clone.querySelectorAll("td");
                    td[0].textContent = entry["fields"]["title"];
                    td[1].textContent = entry["fields"]["address_city"];
                    td[2].textContent = entry["fields"]["address_street"];
                    td[3].textContent = entry["fields"]["date_start"];
                    
                    let img = document.createElement('img'); 
                    img.setAttribute("src",entry["fields"]["cover_url"]);
                    td[4].appendChild(img);

                    let a = document.createElement('a'); 
                    const regex = /-|:/gi;
                    let date1 = entry["fields"]["date_start"].replace(regex, '');
                    let date2 = entry["fields"]["date_end"].replace(regex, '');
                    let src = "https://calendar.google.com/calendar/u/0/r/eventedit?text="+entry["fields"]["title"]+"&dates="+date1+"/"+date2+"&ctz=America/Los_Angeles&details="+entry["fields"]["lead_text"]+"&location="+entry["fields"]["address_city"]+" , "+entry["fields"]["address_street"]+"&pli=1&uid=1606398179addeventcom&sf=true&output=xml";
                    a.setAttribute("href",src);
                    a.setAttribute("target","_blank");
                    a.setAttribute("class","btn btn-outline-primary");
                    a.textContent = "Ajouter";
                    td[5].appendChild(a);

                    tbody.appendChild(clone);
                }
            }
        }
    },


    // ----------------------------------------------------------------------------------------------------------------
    // ARCHITECTURE MVC DE L'APPLICATION
    // ----------------------------------------------------------------------------------------------------------------
    mvc: {
        router:null,
        dispatchRoute:function(object){
            fetch("../views/"+object.view)
            .then(response => response.text())
            .then(html => {
                document.querySelector("main").innerHTML = html;
                if(object.executeHttpRequest)object.executeHttpRequest();
            });
        }
    }
};


// L'application est exportée afin d'être accessible par d'autres modules.
export default app;