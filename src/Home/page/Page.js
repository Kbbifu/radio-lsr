import React,{useState, useEffect, useContext} from 'react'
import Card from '../components/Card';
import {Link, useParams} from 'react-router-dom'
import './Page.css'
import { DataContext } from '../../App';

function Page() {
  const {id} = useParams();
  const [post, setPost] = useState([]);
  const category = useContext(DataContext);
  const url = `http://localhost:5003/posts/${id}/name`;

  const checkValueInObject = (value, obj) => {
    const valuesArray = Object.values(obj);
    return valuesArray.includes(value);
  };
  function isValueIncluded(obj, value) {
    if (obj === null || typeof obj !== 'object') {
      return false;
    }

    return Object.values(obj).includes(value);
  };
  const getValuesByKey = (obj, key) => {
    return obj[key];
  };




const findItemById = (arr, itemId) => {
  return arr.find((item) => item.title === itemId);
};
const [myData, setMyData] = useState([])
const key = id.toString()
const feed = getValuesByKey(myData, `${id}`);

useEffect(()=>{
  setMyData(category)
    console.log(getValuesByKey(myData, 'News'));
    console.log(id)
    console.log(category)
    console.log(feed)
    
  

    fetch(`http://localhost:5003/posts/${id}/name`)
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setPost(resp);
      });
  },[])

  return (
    <div>
      <div className='page-container'>
        {
          post.map((items)=>{
            if(items) return(
              <div>
        <div className='pageHeading'>
          <h1>{items.title}</h1>
        </div>
        {/* <div className='pageBanner-container'> */}
        <div className='pagebanner'></div>
        {/* Card section */}
        <Link className='webNav' to={'/full'}>
          <Card />
        </Link>

              </div>
            );else{
              <div>
                <p>Page is loading please wait...</p>
              </div>
            }
          })
        }
        {/* </div> */}


        <div className='moreBtn'>
          <button className='viewmore'>Voir plus</button>
        </div>
      </div>
    </div>
  );
}

export default Page