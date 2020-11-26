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