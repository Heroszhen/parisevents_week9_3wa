import config from '../app/config.js';

export default class Login{
    constructor() {
        this.view = "login.html";
    }

    executeHttpRequest(){
        document.getElementById("logingoogle").addEventListener("click", ()=>{
            this.loginWithGoogle();
        });
        document.getElementById("logingithub").addEventListener("click", ()=>{
            this.loginWithGithub();
        });
        document.getElementById("loginfacebook").addEventListener("click", ()=>{
            this.loginWithFacebook();
        });
    }
    loginWithGoogle(){
        let cg = config.firebase;
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(cg);
        }
        let provider = new firebase.auth.GoogleAuthProvider();

        //Exemple popup
        firebase.auth().signInWithPopup(provider).then((user) => {   
            // vous pouvez récupérer le nom comme ceci :             
            console.log(user.additionalUserInfo.profile);
        }).catch(function(error) {
            console.log(error)
        }) 

        /*
        Exemple redirect :
        firebase.auth().signInWithRedirect(provider).then((user) => {   
            // vous pouvez récupérer le nom comme ceci :             
            alert(user.additionalUserInfo.profile.name)
        }).catch(function(error) {
            console.log(error)
        }) */

    }

    loginWithGithub(){
        let cg = config.firebase;
        if (!firebase.apps.length) {
            firebase.initializeApp(cg);
        }

        let provider = new firebase.auth.GithubAuthProvider();
        //popup
        firebase.auth().signInWithPopup(provider).then((user) => {   
            // vous pouvez récupérer le nom comme ceci :             
            console.log(user.additionalUserInfo.profile)
        }).catch(function(error) {
            console.log(error)
        }) 
/*
        //Exemple redirect :
        firebase.auth().signInWithRedirect(provider).then((user) => {   
            // vous pouvez récupérer le nom comme ceci :             
            alert(user.additionalUserInfo.profile.name || user.additionalUserInfo.profile.login)
        }).catch(function(error) {
            console.log(error)
        }) */
    }

    loginWithFacebook(){
        let cg = config.firebase;
        if (!firebase.apps.length) {
            firebase.initializeApp(cg);
        }

        let provider = new firebase.auth.FacebookAuthProvider();
        //popup
        firebase.auth().signInWithPopup(provider).then((user) => {   
            // vous pouvez récupérer le nom comme ceci :             
            console.log(user.additionalUserInfo.profile)
        }).catch(function(error) {
            console.log(error)
        }) 
/*
        //Exemple redirect :
        firebase.auth().signInWithRedirect(provider).then((user) => {   
            // vous pouvez récupérer le nom comme ceci :             
            alert(user.additionalUserInfo.profile.name || user.additionalUserInfo.profile.login)
        }).catch(function(error) {
            console.log(error)
        }) */


    }
}