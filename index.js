import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const markCommit = (date) => {
  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  // Generate a random date before February 4th of the current year
  const startOfYear = moment().startOf("year"); // January 1st of the current year
  const endDate = moment().year(moment().year()).month(1).date(4); // February 4th of the current year
  const randomDate = moment(random.int(startOfYear.valueOf(), endDate.valueOf())).format();

  console.log(randomDate);

  markCommit(randomDate);

  makeCommits(n - 1);
};

makeCommits(50);