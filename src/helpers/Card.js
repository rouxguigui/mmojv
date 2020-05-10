export class Card {
    constructor(data, index) {
        this.index = index;
        this.data = data;
        this.type = data.type;
        this.name = data.name;
        this.description = data.description;
        this.effect = data.effect;
        this.difficulty = parseInt(data.difficulty || 0);
        this.cards = parseInt(data.cards || 0);
        this.resources = data.resources;
        this.quantity = parseInt(data.qty || 1);
        this.category = this.type.toLowerCase().trimStart().trimEnd();

        this.cost = {
            price: 0,
            weight: data.weight || 0,
            fuel: data.fuel || 0,
            electricity: data.electricity || 0,
            science: data.science || 0,
            time: data.time || 0,
            comfort: data.comfort || 0,
            prestige: data.prestige || 0,
            aerodynamics: data.aerodynamics || 0
        };
        if (data.price && data.price[0] === '$') {
            this.cost.price = data.price.substr(1);
        }
        this.bonus = {
            budget: data.bonus || 0,
            weight: 0,
            fuel: 0,
            electricity: 0,
            science: 0,
            time: 0,
            comfort: 0,
            prestige: 0,
            aerodynamics: 0,
            victoryPoints: 0
        };

        if (data.image) {
            this.image = `/library/${data.image}.png`;
        } else {
            this.image = null;
        }

        this.id = `${this.index} ${this.name}`;
    }
}
