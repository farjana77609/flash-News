const FALLBACK_API_KEY = "pub_865d5abc11404f3babe1c7c698f9c51a";

exports.handler = async (event) => {
  const { query, isCategory } = event.queryStringParameters || {};

  if (!query) {
    return { statusCode: 400, body: JSON.stringify({ error: "query is required" }) };
  }

  const apiKey = process.env.API_KEY || FALLBACK_API_KEY;
  const params = new URLSearchParams({ apikey: apiKey });
  isCategory === "true" ? params.set("category", query) : params.set("q", query);

  try {
    const res = await fetch(`https://newsdata.io/api/1/latest?${params}`);
    const data = await res.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
