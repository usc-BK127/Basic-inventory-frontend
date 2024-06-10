import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = ({ products }) => {
  const invoiceRef = useRef();

  const generatePDF = async () => {
    const canvas = await html2canvas(invoiceRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("invoice.pdf");
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div ref={invoiceRef} className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Product Invoice</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-semibold">
                Name
              </th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-semibold">
                Category
              </th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-semibold">
                Price
              </th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-semibold">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-gray-700">
                  {product.name}
                </td>
                <td className="py-2 px-4 border-b text-gray-700">
                  {product.category}
                </td>
                <td className="py-2 px-4 border-b text-gray-700">
                  ${product.price}
                </td>
                <td className="py-2 px-4 border-b text-gray-700">
                  {product.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={generatePDF}
        className="mt-4 py-2 px-6 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
      >
        Download PDF
      </button>
    </div>
  );
};

export default Invoice;
