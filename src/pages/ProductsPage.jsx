import { CreateItem } from "../components/CreateItem";

export function ProductsPage() {
  return (
    <article className="page products-page">
      <div className="container">
        <h2>Products page</h2>
        <CreateItem />
      </div>
    </article>
  );
}
