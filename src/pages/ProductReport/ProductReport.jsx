import { useEffect, useState } from "react";
import Invoice from "../../components/Invoice/Invoice";
import axios from "axios";

const ProductReport = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://bib-one.vercel.app/api/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return <Invoice products={products} />;
};

export default ProductReport;
