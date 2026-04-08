import { randomUUID } from "node:crypto";
import { Database } from "../database/db.js";
import { buildRoutePath } from "../utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;
      const task = {
        id: randomUUID(),
        title: title,
        description: description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };
      database.insert("tasks", task);
      return res.writeHead(201).end();
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;
      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null,
      );
      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { title, description } = req.body;
      const { id } = req.params;
      const updatedTask = {
        id,
        title,
        description,
        updated_at: new Date(),
      };
      const updated = database.update("tasks", id, updatedTask);
      if (!updated) {
        return res.writeHead(404).end();
      }
      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const deleted = database.delete("tasks", id);
      if (!deleted) {
        return res.writeHead(404).end();
      }
      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;
      const updated = database.update("tasks", id, {
        completed_at: new Date(),
      });
      if (!updated) {
        return res.writeHead(404).end();
      }
      return res.writeHead(204).end();
    },
  },
];
