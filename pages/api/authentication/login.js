export default async function handler(req, res) {
  // Get the category name from the query parameter
  const productId = Number(req.query.productId);
  try {
    // Get all products of a specific category
    const results = await client.query(
      `SELECT * FROM product WHERE "productId" = ${productId}`
    );
    if (results.rows.length > 0) {
      return res.status(200).json(results.rows[0]);
    } else {
      return res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    return res.status(500).json("Error cannot connect to the database");
  }
}
