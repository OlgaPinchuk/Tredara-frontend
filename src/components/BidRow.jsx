export function BidRow({ bid }) {
  const formatDateTime = (bidDateTime) => {
    const datetime = new Date(bidDateTime);

    if (!datetime.getTime()) return bidDateTime;

    const year = datetime.getFullYear();
    const month = (datetime.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed, so add 1
    const day = datetime.getDate().toString().padStart(2, "0");
    const hours = datetime.getHours().toString().padStart(2, "0");
    const minutes = datetime.getMinutes().toString().padStart(2, "0");
    const seconds = datetime.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="bid-row">
      <label className="bidder-name">{bid.bidderName}</label>
      <label className="bid-amount">{bid.amount}</label>
      <label className="bid-date-time">{formatDateTime(bid.bidTime)}</label>
    </div>
  );
}
