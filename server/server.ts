import "dotenv/config";

import app from "./app";
import { DEFAULT_PORT } from "./config/api";

const port = Number(process.env.PORT ?? DEFAULT_PORT);

app.listen(port, () => {
  console.log(`Replay API shell listening on port ${port}`);
});

