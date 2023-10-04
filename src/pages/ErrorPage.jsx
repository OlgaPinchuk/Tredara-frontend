import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <article className="page error-page">
      <div className="container flex-column">
        <h1>❌ Page not found</h1>
        <Link to="/" className="button primary">
          Go back home
        </Link>
      </div>
    </article>
  );
}
