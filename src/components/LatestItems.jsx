import { useEffect, useState } from 'react'
import Post from './Item'
import '../styles/components/item.css'

export default function LatestItems() {
    const [latestItems, setlatestItems] = useState([]);

    const endpoint = "http://localhost:8080/api/v1/latestItems";

    useEffect(() => {
        fetch(endpoint)
          .then((response) => response.json())
          .then((result) => onSuccess(result))
          .catch((error) => onFailure(error));
      }, []);

      function onSuccess(result) {
        setlatestItems(result);
      }

      function onFailure(error) {
        alert("Sorry we could not load the data" + error);
      }

    const Items = latestItems.map((item) => <Post item={item} key={item.id}/>);
   
  return (
    <div className='items'>
        <div className='item-icon'>
            <h3 className='items-header'>Latest Items</h3>
        </div>
        <div className='items-container'>
            {Items}
        </div>
    </div>
  );
}
