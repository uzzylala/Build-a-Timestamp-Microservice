import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

function timestampHandler(req, res) {
  const { date } = req.params;

  let parsed;
  if (date === undefined || date === "") {
    parsed = new Date();
  } else if (/^-?\d+$/.test(date)) {
    parsed = new Date(Number(date));
  } else {
    parsed = new Date(date);
  }

  if (isNaN(parsed.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({ unix: parsed.getTime(), utc: parsed.toUTCString() });
}

app.get("/api", timestampHandler);
app.get("/api/:date", timestampHandler);

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
