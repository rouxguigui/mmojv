import {Card} from "./Card";
import axios from "axios";
import CsvParser from "papaparse";

export class CardLibrary {
    constructor() {
        this.cards = [];
        this.categories = {};

        axios.get(`https://docs.google.com/spreadsheets/d/e/2PACX-1vT9qL10mPi2IvBRiTUp8tb1Q7czZkDU9wyskqHxaJw-smuEHcO91WzUWIys72SJfz59O-zv-dLSJ6lY/pub?gid=528723919&single=true&output=csv`)
            .then(resp => {
                this.loadCSV(resp.data);
            });
    }

    loadCSV(csv) {
        csv = CsvParser.parse(csv, {
            header: true,
            skipEmptyLines: true
        });
        for (let i = 0; i < csv.data.length - 1; i++) {
            if (csv.data[i].type) {
                let card = this.add(new Card(csv.data[i], this.cards.length));

                if (card.quantity > 1) {
                    for (let j = 1; j < card.quantity; j++) {
                        this.add(new Card(csv.data[i], this.cards.length));
                    }
                }
            }
        }
        //console.log(csv.data);
    }

    add(card) {
        this.cards.push(card);

        // eslint-disable-next-line no-prototype-builtins
        if (!this.categories.hasOwnProperty(card.category)) {
            this.categories[card.category] = {
                id: card.category,
                count: 1
            };
        } else {
            this.categories[card.category].count++;
        }
        return card;
    }
}
