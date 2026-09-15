import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const products = await response.json();
      console.log(products);
      setProducts(products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Link className="create-product-button" to="/create">
        Create New Product
      </Link>
      <h1>Products List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="product-table">
          <colgroup>
            <col className="product-table-id-column" />
            <col className="product-table-name-column" />
          </colgroup>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HomePage;
