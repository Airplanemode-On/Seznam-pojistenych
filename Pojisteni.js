'use strict';

class Seznam {

    constructor(jazyk = "cs-CZ") {
        const seznamPojistenych = localStorage.getItem("seznam");               //Načte seznam Pojištěnců, uložených v lokální paměti
        this.seznam = seznamPojistenych ? JSON.parse(seznamPojistenych) : [];
        this.jazyk = jazyk;
    
        this.jmenoInput = document.getElementById("jmeno");
        this.prijmeniInput = document.getElementById("prijmeni");
        this.vekInput = document.getElementById("vek");
        this.telefonInput = document.getElementById("telefon");
        this.tlacitkoVytvorit = document.getElementById("vytvorit");
        this.vypisElement = document.getElementById("seznam-pojistenych");
    
        this._nastavPojistene();
    }

    ulozSeznam() {                                                              //Uloží nový seznam Pojištěnců do lokální paměti
        localStorage.setItem("seznam", JSON.stringify(this.seznam));
    }

    vypisSeznam() {                                                             //Vypíše seznam pojištěnců
        this.vypisElement.innerHTML = `<table id = "prvni-radek"><td><b>Jméno</b></td><td><b>Příjmení</b></td><td><b>Věk</b></td><td><b>Telefonní číslo</b></td></table>`;
            //Vytvoří první řádek tabulky
        for (const pojistenec of this.seznam) {
    
            const zaznam = document.createElement("div");
            zaznam.className = "zaznam";
            
            const tlacitkoSmazat = document.createElement("button");            //Vytvoří tlačítko na smazání záznamu
            tlacitkoSmazat.innerText = "Smazat záznam";
            tlacitkoSmazat.onclick = () => {
                if (confirm("Opravdu si přejete odstranit záznam?")) {
                    this.seznam = this.seznam.filter(p => p !== pojistenec);    //Projde seznam a nechá vše krom daného pojištěnce
                    this.ulozSeznam();
                    this.vypisSeznam();
                }
            };
            zaznam.appendChild(tlacitkoSmazat);

            zaznam.insertAdjacentHTML("beforeend", `<table><td>${pojistenec.jmeno}</td> <td>${pojistenec.prijmeni}</td>
            <td>${pojistenec.vek}</td> <td>${pojistenec.telefon}</td></table>`);
            
            zaznam.insertAdjacentHTML("beforeend", "</div>");
            this.vypisElement.appendChild(zaznam);
            
        }
    }

    _nastavPojistene() {                                        //Uloží nového pojištěnce a následně vypíše aktualizovaný seznam
        this.tlacitkoVytvorit.onclick =  () => {
            if (this.jmenoInput.value.length == 0 || this.prijmeniInput.value.length == 0){
                alert("Musíte vyplnit jméno a příjmení pojištěného!");
            } else if (this.vekInput.value < 1){
                alert("Věk pojištěného musí být větší než 0!");
            } else if (this.telefonInput.value.length < 9 || this.telefonInput.value < 0){
                alert("Telefonní číslo pojištěného musí mít aspoň 9 číslic a nesmí být záporné!");
            } else {
                const pojistenec = new Pojistenec(this.jmenoInput.value, this.prijmeniInput.value,
                this.vekInput.value, this.telefonInput.value);
                this.seznam.push(pojistenec);
                this.ulozSeznam();
                this.vypisSeznam();
            }
        }
    }
}