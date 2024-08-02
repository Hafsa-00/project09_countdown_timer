#! /usr/bin/env node
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
let res = await inquirer.prompt({
    type: "number",
    name: "userInput",
    message: "Please enter the amount of seconds:",
    validate: (input) => {
        if (isNaN(input)) {
            return "please enter valid number";
        }
        else if (input > 60) {
            return "seconds must be in 60";
        }
        else {
            return true;
        }
    },
});
let input = res.userInput;
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date();
        const time0ff = differenceInSeconds(intervalTime, currentTime);
        if (time0ff <= 0) {
            console.log("time has expired");
            process.exit();
        }
        const min = Math.floor((time0ff % (3600 * 24)) / 3600);
        const sec = Math.floor(time0ff % 60);
        console.log(`${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`);
    }, 1000);
}
startTime(input);
