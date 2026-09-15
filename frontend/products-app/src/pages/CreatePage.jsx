import { useState } from "react";

const CreatePage = () => {
  const [name, setName] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const createProduct = async (e) => {
    e.preventDefault();
    if (name === "") {
      alert("Please enter a product name");
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const product = await response.json();
      alert(`Product "${product.name}" created successfully!`);
      setName("");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Create A New Product</h1>
      <form className="create-product-form" onSubmit={createProduct}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" />
        </div>
        <div>
          {!isLoading && <button className="create-product-button">Create Product</button>}
          {isLoading && <button className="create-product-button" disabled>Creating Product...</button>}
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
