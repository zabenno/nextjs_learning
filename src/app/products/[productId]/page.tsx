export default function ProductPage({ params }: { params: { productId: string } }) {
  return (
    <div>
      <h1>Product Details</h1>
      <p>Showing details for product: {params.productId}</p>
    </div>
  );
}
