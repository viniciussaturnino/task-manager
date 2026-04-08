import { createReadStream } from "node:fs";
import { parse } from "csv-parse";

const csvStream = createReadStream("./utils/tasks.csv").pipe(
  parse({
    columns: true,
    skip_empty_lines: true,
  }),
);

for await (const record of csvStream) {
  //   console.log(record);
  const response = await fetch("http://localhost:3333/tasks", {
    method: "POST",
    body: JSON.stringify(record),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(`Task sent: ${record.title}, status: ${response.status}`);
}
