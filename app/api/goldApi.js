import { GOLD_API_KEY } from "@env";

const API_KEY = GOLD_API_KEY;
const BASE_URL = "https://www.goldapi.io/api";

export const fetchMetalPrice = async (metal, currency = "USD") => {
  try {
    const response = await fetch(`${BASE_URL}/${metal}/${currency}`, {
      headers: {
        "x-access-token": API_KEY,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
