import React, {useState, useEffect, useContext} from 'react'
import {Link, useParams} from 'react-router-dom'
import { DataContext } from '../../App';
import {BsDot} from 'react-icons/bs'

function Details() {
  const { id } = useParams();
  const [info, setInfo] = useState({})
  const [book, setBook] = useState([])
  const url = `http://localhost:5003/posts/${id}/`;
  const category = useContext(DataContext)
  const [section, setSection] = useState([])
  
  let data = category.News

  // useEffect(()=>{
  //   console.log(id);
  //   fetch(url)
  //   .then((resp)=> resp.json())
  //   .then((resp)=>{
  //     console.log(resp)
  //     let arr = []
  //     arr.push(resp)
  //     setInfo(arr)
  //     console.log(info)
  //   })
  // },[])
  useEffect(() => {
    // console.log(id);
    // setBook(books[0])
    // console.log(data)
    // {book.map((item)=>{
    //   if(item.id == id){
    //     console.log(item)
    //     setSingleBook(item);
    //     console.log(book);
    //   }
    // })}
    // console.log(singleBook);
    // fetch(`http://localhost:5003/posts/${id}/`)
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     console.log(data);
    //     setInfo(data);
    //   });
  }, []);
   const imageStyle = {
     width: '100%',
     height: '100%',
     borderRadius: '10px',
   };
   const authorStyle={
    textAlign:'left'
   }

  return (
    <div>
      <div className='detailsHeader'>
        {data.map((item) => {
          if (item.id == id) {
            return (
              <div key={item.id}>
                <h1 className='detailsHeader'>{item.title}</h1>

                <p className=' banner-content author'>{item.author} <BsDot size={'1rem'}/> {' '}{' '} <span>{item.date}</span></p>
                <div className='dtailsBanner'>
                  <img src={item.image} alt='' style={imageStyle} />
                </div>
                <p className='banner-content'>{item.content}</p>
              </div>
            );
          }
        })}
        <h1 className='detailsHeader'>
          {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id. */}
          {info.title}
        </h1>
        <p className='banner-content'>{info.content}</p>
        <Link to={-1}>
          <button className='btn'>Retour</button>
        </Link>
      </div>
      ;
    </div>
  );
}

export default Details