import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Invoice = ({ products }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Products Invoice", 20, 10);

    const columns = [
      { header: "ID", dataKey: "id" },
      { header: "Name", dataKey: "name" },
      { header: "Category", dataKey: "category" },
      { header: "Price", dataKey: "price" },
      { header: "Quantity", dataKey: "quantity" },
    ];

    const tableData = products.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
    }));

    console.log("Columns: ", columns);
    console.log("Table Data: ", tableData);

    doc.autoTable({
      columns: columns,
      body: tableData,
      startY: 20,
    });

    doc.save("products-invoice.pdf");
  };

  return (
    <div className="bg-gray-50 min-h-[82vh]">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center flex-col sm:flex-row gap-2 sm:gap-0 justify-between mb-4">
          <h1 className="text-xl font-bold">Products Invoice</h1>
          <button
            onClick={generatePDF}
            disabled={products.length === 0}
            className={`py-[6px] sm:py-2 px-[14px] sm:px-6 text-white font-semibold rounded-lg shadow-md text-[15px] ${
              products.length > 0
                ? "bg-[#3bb77e] hover:bg-[#29a56c]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Download PDF
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-r bg-gray-100 text-left text-gray-600 font-semibold text-[15px]">
                  Name
                </th>
                <th className="py-2 px-4 border-b border-r bg-gray-100 text-left text-gray-600 font-semibold text-[15px]">
                  Category
                </th>
                <th className="py-2 px-4 border-b border-r bg-gray-100 text-left text-gray-600 font-semibold text-[15px]">
                  Price
                </th>
                <th className="py-2 px-4 border-b border-r bg-gray-100 text-left text-gray-600 font-semibold text-[15px]">
                  Quantity
                </th>
              </tr>
            </thead>
            {products.length > 0 ? (
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 text-sm">
                    <td className="py-2 px-4 border-b border-r text-gray-700">
                      {product.name}
                    </td>
                    <td className="py-2 px-4 border-b border-r text-gray-700">
                      {product.category}
                    </td>
                    <td className="py-2 px-4 border-b border-r text-gray-700">
                      ${product.price}
                    </td>
                    <td className="py-2 px-4 border-b border-r text-gray-700">
                      {product.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tr className="text-center">
                <td
                  className="text-xl font-bold text-gray-600 py-2"
                  colSpan={4}
                >
                  No products available at the moment.
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
