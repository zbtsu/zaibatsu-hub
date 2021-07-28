const fs = require("fs");

const init = async () => {
  const cspJson = JSON.parse(
    await fs.readFileSync("./content-security-policy.json", "utf8")
  );
  const policy = [];
  for (let i in cspJson) {
    if (i && cspJson[i].length > 0) {
      policy.push(`${i} ${cspJson[i].join(" ")}`);
    }
  }
  console.log(policy.filter(Boolean).join("; \n"));
};

init();
