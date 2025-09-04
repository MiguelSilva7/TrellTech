// import { API_BASE_URL, API_KEY, TOKEN } from "@env";

// // export const API_BASE_URL = "https://api.trello.com/1";
// // export const API_KEY ="CLE_API";
// // export const TOKEN = "TOKEN";

// export async function apicrud(endpoint: string, method ="GET",body?:any) {
//     const url = `${API_BASE_URL}/${endpoint}?key=${API_KEY}&token=${TOKEN}`;

//     const options: RequestInit = {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: body ? JSON.stringify(body) : undefined,
//       };
    
//       const response = await fetch(url, options);
//       return response.json();
// }