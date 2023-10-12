import { Item } from "./Item";

function ProductList({ items, title }) {
  if (items.length == 0)
    return (
      <h2 className="list-header">
        {title}: <i>No data available</i>
      </h2>
    );

  const Products = items.map((item) => <Item item={item} key={item.id} />);

  return (
    <div className="products-list">
      <h2 className="list-header">{title}</h2>
      <div className="items-container grid-cards">{Products}</div>
    </div>
  );
}

export default ProductList;
