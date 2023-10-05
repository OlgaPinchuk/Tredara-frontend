import { useEffect, useState } from 'react'
import Post from './Item'
import '../styles/components/item.css'

function Items() {
    const [todos, setTodos] = useState([]);

    const endpoint = "https://dummyjson.com/products";

    useEffect(() => {
        fetch(endpoint)
          .then((response) => response.json())
          .then((result) => onSuccess(result))
          .catch((error) => onFailure(error));
      }, []);

      function onSuccess(result) {
        setTodos(result.products);
      }

      function onFailure(error) {
        alert("Sorry we could not load the data");
        console.error(error);
      }

    const Items = todos.map((blog) => <Post blog={blog} key={blog.id}/>);
   
  return (
    <div className='posts'>
        <div className='blog-icon'>
            <h3>Ending Soon Items</h3>
        </div>
        <div className='items-container'>
            {Items}
        </div>
    </div>
  );
}

export default Items