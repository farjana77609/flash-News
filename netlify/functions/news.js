exports.handler = async (event) => {
  const { query, isCategory } = event.queryStringParameters || {};

  if (!query) {
    return { statusCode: 400, body: JSON.stringify({ error: "query is required" }) };
  }

  const params = new URLSearchParams({ apikey: process.env.API_KEY });
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
