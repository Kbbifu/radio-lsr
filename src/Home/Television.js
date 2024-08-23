import React, {useState,useEffect, useContext} from 'react'
import { DataContext } from '../App';
import { Link } from 'react-router-dom';

function Television() {
  const category = useContext(DataContext);
  const [tv, setTv] = useState([]);

useEffect(()=>{
  setTv(category.Television)
},[])

  return (
    <div>
      {/* Jalla tv section  */}

      <div className='tvFrameContainer'>
        <div className='televisionLogo'>
          <h1 className='tvHeader'>LSR TV</h1>
        </div>
        <div className='televisionFrame'>
          {/* <div className='tvFrame'>
            <div className='frameImage'>
              
            </div>
            <div className='frameTitle'>
              <h4>Agricuture and GDP in Nigeria</h4>
            </div>
            <div className='frameText'>
              <p className='textLimit'>
                GDP from Agriculture in Nigeria averaged 4079305.33 NGN Million
                from 2010 until 2023, reaching an all time high of 5625362.33
                NGN Million in the third quarter of 2022 and a record low of
                2594759.86 NGN Million in the first quarter of 2010.
              </p>
            </div>
          </div> */}

          <div className='tvGrid'>
            {tv.map((item) => {
              return (
                <div className='tvCard' key={item.id}>
                  <div className='tvCardimg'>
                    {item.embed}
                  </div>
                  <a href={item.url}>
                    <div className='tvCardHeader'>
                      <div className='tvCardTitle'>{item.title}</div>
                    </div>
                    <div className='tvCardtext textLimit'>{item.content}</div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Television