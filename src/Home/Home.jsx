import React, { useState } from 'react';

const Home = () => {
    const [state, setstate] = useState(0);

    function onClick(){
          setstate (state +1);
    }
    function onClick1(){
        setstate (state -1);
  }
    return (
        <div>
            <button type='submit' onClick={onClick}>btn + </button>
            <button onClick={onClick1}>btn - </button>
            <h1>{state}</h1>


            
        </div>
    );
}

export default Home;
