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

export class OMDB {
	private apiKey: string;
	private baseURL: string;

	constructor(apiKey = api_key) {
		if (apiKey === undefined) {
			throw new Error("API key is required");
		}
		this.apiKey = apiKey;
		this.baseURL = `http://www.omdbapi.com/?apikey=${this.apiKey}&`;
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
}

async function Dummy_20wdnd() {
	const api = new OMDB();
	const matrix = await api.searchByTitle("The Matrix");
	const matrix_maybe = matrix.imdbID ? await api.searchByID(matrix.imdbID) : undefined;
	console.log(matrix);
	console.log(matrix_maybe);
}

// await Dummy_20wdnd();