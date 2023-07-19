const chalk = require("chalk");

module.exports = {
    name: "error",
    execute(err) {
        console.log(chalk.red(`\n[Database Status] Error with the database connection:\n${err}`));
    }
}