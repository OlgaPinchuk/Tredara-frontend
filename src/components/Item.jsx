import { Link } from "react-router-dom";

export function Item({ item }) {
  const { id, image_url, title, description } = item;

  const getServerImageUrl = (url) => {
    const env_url = import.meta.env.VITE_API_URL;
    const base_env_url = env_url.replace("api/v1", "");
    const image_url = url.replace("http://localhost:8080/", base_env_url);
    return image_url;
  };

  return (
    <Link to={`/product/${id}`} className="item-link">
      <div className="item">
        <img src={getServerImageUrl(image_url)} className="item-image" />
        <div className="item-title">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}
