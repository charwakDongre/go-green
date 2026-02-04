import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const markCommit = (x, y) => {
  const date = moment()
    .subtract(1, "y") // Start exactly 1 year ago
    .add(x, "w") // Add random weeks
    .add(y, "d") // Add random days
    .format();

  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();
  const x = random.int(0, 54); // Random week within the past year
  const y = random.int(0, 6); // Random day within the week
  const date = moment()
    .subtract(1, "y") // Start exactly 1 year ago
    .add(x, "w") // Add random weeks
    .add(y, "d") // Add random days
    .format();

  const data = {
    date: date,
  };
  console.log(date);
  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }, makeCommits.bind(this, --n));
  });
};

makeCommits(50);