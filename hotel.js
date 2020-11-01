/**
 * @author      Steve Fallet <steve.fallet@divtec.ch>
 * @version     1.0
 * @since       2018-11-19
 *
 * http://usejsdoc.org/
 */

//http://www.jslint.com/help.html
/*jslint this:true */
/*jslint es6, browser, devel, for, single, multivar*/
/*global window, document, alert, performance */

(function (document) {
    "use strict";

    /** Eléments HTML globaux **/
    const forReservation = document.querySelector("form"); // formulaire
    const divMessage = document.getElementById("message"); // div pour message d'erreurs
    const divReservation = document.getElementById("reservation"); // div pour confirmation de réservation

    /**
     * Retourne le nom de l'hotel sélectionné par le visiteur
     *
     * @returns {String} Nom de l'hotêl ou "0" si pas de sélection
     */
    function getHotel() {
        return document.getElementById("lis_hotel").value;
    }

    /**
     * Retourne le nombre de chambres saisi par le visiteur
     *
     * @returns {Number} Nombre de chambres ou NaN (Not A Number)
     */
    function getNbChambre() {
        return parseInt(document.getElementById("txt_nbrChambre").value);
    }

    /**
     * Retourne le type de chambre sélectionné ou ""
     *
     * @returns {String} Type de chambre ou ""
     */

    function getChambre() {
        let chambre = document.querySelector('[name="opt_type_chambre"]:checked');

        if (chambre === null) {
            return "";
        }

        return chambre.value;
    }

    /**
     * Retourne les options choisies par le visiteur
     *
     * @returns {NodeList} tableau des checkbox cochées
     */
    function getOptions() {
        return document.querySelectorAll('[name="chk_options[]"]:checked');
    }

    /**
     * Valide la saisie utilisateur
     *
     * @returns {String}    Chaine vide si pas d'erreur
     *                      Message d'erreur au format HTML
     */
    function valideSaisie() {

        let erreurs = "";

        // Test choix hôtel
        if (getHotel() === "0") {
            erreurs += "<li>Choisir un hôtel</li>";
        }

        // Test nombre de chambres
        let nbChambre = getNbChambre();

        if (Number.isNaN(nbChambre) || nbChambre < 1 || nbChambre > 12) {
            erreurs += "<li>Entrer un nombre de chambre, maximum 12</li>";
        }

        // Test type de chambre
        if (getChambre() === "") {
            erreurs += "<li>Choisir un type de chambre</li>";
        }

        return erreurs;
    }

    /**
     * Affiche la confirmation de réservation
     */
    function afficheConfirmation() {

        // Photo hôtel
        document.getElementById("photo").src = "images/"
            + getHotel().toLowerCase()
            + ".jpg";

        // Nom de l'hôtel
        divReservation.querySelector("h2").innerText = getHotel();

        // Chambre
        document.getElementById("chambre_nombre").innerText = getNbChambre().toString();
        document.getElementById("chambre_type").innerText = getChambre();

        // Liste des options
        const ulOptions = document.getElementById("options");

        ulOptions.innerHTML = ""; // Vide la liste

        for (let option of getOptions()) {
            ulOptions.innerHTML += "<li>" + option.value + "</li>";
        }

        divReservation.style.display = "block";
    }

    /**
     * Fonction appellé lors de l'envoi du formulaire
     * Test la saisie et affiche la confirmation
     *
     * @param event Objet représentant l'événement
     */
    function reserver(event) {
        // Stoppe l'envoi du formulaire
        event.preventDefault();

        // Vide et cache les message d'erreurs
        divMessage.innerHTML = "";
        divMessage.style.display = "none";

        // Valide les saisies du visiteur
        let erreurs = valideSaisie();

        /*
        Si erreur de saisie :
            - crée et affiche les messages d'erreurs
            - cache la réservation
            - sort de la fonction, fin du script
         */
        if (erreurs) {
            divMessage.innerHTML = "<ul>" + erreurs + "</ul>";
            divMessage.style.display = "block";

            divReservation.style.display = "none";

            return;
        }

        // Créer et affiche la confirmation de la réservation
        afficheConfirmation();
    }

    /** Evénements du formulaire : envoi et réinitialisation **/

    forReservation.addEventListener("submit", reserver);

    forReservation.addEventListener("reset", function () {
        divMessage.style.display = "none";
        divReservation.style.display = "none";
    });

}(document));