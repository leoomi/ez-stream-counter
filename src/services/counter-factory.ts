import { v4 as uuidv4 } from 'uuid';
import CounterConfiguration from "../models/counter-configuration";

export default class CounterFactory {
    readonly initialTexts = [
        "Death counter: %c",
        "Laugh counter: %c",
        "Half A press counter: %c",
        "%c deaths",
        "%c laughs",
        "%c half A presses",
    ];

    create(): CounterConfiguration {
        const counterSettings = new CounterConfiguration();

        counterSettings.id = uuidv4();
        counterSettings.name = "New counter";
        counterSettings.text = this.getRandomInitialText();
        counterSettings.font = "#FFFFFFFF";
        counterSettings.background = "#000000AA";

        return counterSettings;
    }

    private getRandomInitialText(): string {
        const index = Math.floor(Math.random() * this.initialTexts.length);
        return this.initialTexts[index];
    }
}