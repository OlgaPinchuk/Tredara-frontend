import { CreateItem } from "../components/CreateItem";
import { useUser } from "../state/UserContext";
import { useModal } from "../state/ModalContext";
import { AddBid } from "../components/AddBid";
import { ShowBids } from "../components/ShowBids";

export function ProductsPage() {
  const { user } = useUser();
  const { setModal } = useModal();

  return (
    <article className="page products-page">
      <div className="container">
        <h2>Products page</h2>
        {user && (
          <div>
            <button
              className="action-button medium-button"
              onClick={() => setModal(<CreateItem />)}
            >
              Add Product
            </button>
            <button
              className="action-button medium-button"
              onClick={() => setModal(<AddBid itemId={7} />)}
            >
              Add Bid
            </button>
            <button
              className="action-button medium-button"
              onClick={() => setModal(<ShowBids itemId={7} />)}
            >
              Show Bids
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
