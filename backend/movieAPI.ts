import type { Request, Response } from 'express';

const api_key = process.env.OMDB_KEY;

export interface MoviePromise {
  Title?: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: {
    Source: string;
    Value: string;
  }[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID?: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response?: string;
}

export interface ExpressMovieReq {
	searchType: string,
	movieInfo: MoviePromise
}

export class OMDB {
	private apiKey: string;
	private baseURL: string;
	private posterBaseURL: string;

	constructor(apiKey = api_key) {
		if (apiKey === undefined) {
			throw new Error("API key is required");
		}
		this.apiKey = apiKey;
		this.baseURL = `http://www.omdbapi.com/?apikey=${this.apiKey}&`;
		this.posterBaseURL = `http://img.omdbapi.com/?apikey=${this.apiKey}&`;
	}

	public async searchByTitle(title: string): Promise<MoviePromise> {
		const formattedTitle = encodeURIComponent(title);
		const response = await fetch(`${this.baseURL}t=${formattedTitle}&plot=full`);
		if (response.ok) {
			return (await response.json()) as MoviePromise;
		} else {
			return Promise.reject(new Error("Failed to fetch movie data"));
		}
	}
	
	public async searchByID(id: string): Promise<MoviePromise> {
		const response = await fetch(`${this.baseURL}i=${id}&plot=full`);
		if (response.ok) {
			return (await response.json()) as MoviePromise;
		} else {
			return Promise.reject(new Error("Failed to fetch movie data"));
		}
	}
	
	public async getPoster(movieID: string): Promise<string> {
		const response = await fetch(`${this.posterBaseURL}i=${movieID}`);
		if (response.ok) {
			return response.url;
		} else {
			return Promise.reject(new Error("Failed to fetch poster"));
		}
	}
	
	public async expressIO(req: Request, res: Response) : Promise<void> {
		if (!req.body || typeof req.body.searchType !== 'string' || typeof req.body.movieInfo !== 'object') {
						res.status(400).json({ error: "Invalid request body" });
						return;
		}
		const searchType = parseInt(req.body.searchType, 10);
		const movieInfo: MoviePromise = req.body.movieInfo;

		try {
				let result: MoviePromise | string | undefined;

				if (searchType === 0 && movieInfo.Title) {
						result = await this.searchByTitle(movieInfo.Title);
				} else if (searchType === 1 && movieInfo.imdbID) {
						result = await this.searchByID(movieInfo.imdbID);
				} else if (searchType === 2 && movieInfo.imdbID) {
						result = await this.getPoster(movieInfo.imdbID);
				} else {
						throw new Error("Invalid search type or missing required fields");
				}

				res.status(200).json(result);
		} catch (error) {
				res.status(400).json({ error: error.message });
		}
	}
}

async function Dummy_20wdnd() {
	const api = new OMDB();
	const matrix = await api.searchByTitle("Harry");
	const matrix_maybe = matrix.imdbID ? await api.searchByID(matrix.imdbID) : undefined;
	console.log(matrix);
	console.log(matrix_maybe);
}

// await Dummy_20wdnd();