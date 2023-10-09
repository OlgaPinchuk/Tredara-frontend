import { Link } from "react-router-dom";

export function Item({ item }) {
  const { userID, image_url, title, description } = item;

  return (
    <Link to={`/read/${userID}`} className="item-link">
      <div className="item">
        <img src={image_url} className="item-image" />
        <div className="item-title">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}
