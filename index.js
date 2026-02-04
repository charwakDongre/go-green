import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

// Function to create a commit with a specific date
const markCommit = (date) => {
  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
    simpleGit().add([path]).commit(date, { "--date": date }).push((err) => {
      if (err) {
        console.error("Error pushing commit:", err);
      }
    });
  });
};

// Function to generate random commits within a specific date range
const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  // Generate a random date between January 1st and February 4th of the current year
  const startOfYear = moment().startOf("year");
  const endDate = moment().month(1).date(4).startOf("day");
  const randomTimestamp = random.int(startOfYear.unix(), endDate.unix());
  const randomDate = moment.unix(randomTimestamp).format();

  console.log(randomDate);

  markCommit(randomDate);

  makeCommits(n - 1);
};

// Function to remove the last `n` commits
const removeCommits = (n) => {
  simpleGit().reset("hard", ["HEAD~" + n]).push("origin", "main", ["--force"], (err) => {
    if (err) {
      console.error("Error removing commits:", err);
    } else {
      console.log(`Successfully removed the last ${n} commits.`);
    }
  });
};

// Example usage:
// makeCommits(50); // Uncomment to create commits
// removeCommits(10); // Uncomment to remove the last 10 commits