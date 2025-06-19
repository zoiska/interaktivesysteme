import { state } from "./config.js";

const achievements = {
    "firtBugFix": {
        name: "First bug fixed",
        description: "Congrats! But it was just the start...",
        achieved: false,
        condition: state.statistics.total_clicks >= 1
    },
    "fixCollector": {
        name: "100 bugs fixed",
        description: "You are getting good at this!",
        achieved: false,
        condition: state.currencyCounter >= 100 
    }
};