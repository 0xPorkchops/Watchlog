import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./db";
import { createUser, getUsers } from "./userHandlers";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import { OMDB } from "./movieAPI";
import type { MoviePromise } from "./movieAPI";

const app = express();
const movie_api = new OMDB();
const PORT = 3000;
dotenv.config();
// await connectDB();
// app.use(clerkMiddleware())

// Setup CORS middleware - add this before your routes
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:8081");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization",
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

	// Handle preflight requests
	if (req.method === "OPTIONS") {
		return res.status(200).end();
	}

	next();
});

app.use(helmet());

app.use(express.json());

app.post("/createUser", createUser);

app.get("/getUsers", getUsers);

app.post("/searchMovie", movie_api.expressIO.bind(movie_api));

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
