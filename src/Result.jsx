import React from "react";

import { saveAs } from "file-saver";

const Result = ({ resultImage,generating }) => {
  const handleDownloadImage = () => {
    if (resultImage) {
      saveAs(resultImage,"swapped.png");
    }
  };

  return (
    <div>
      <article>
        <header>
          {resultImage? (
            <img src={resultImage} alt="Result" />
          ) : (
            <>
            {generating===0?(
              <p>Select Input and avatar image and click on Swap</p>
            ): (
              <p>Loading please wait a few seconds...</p>
            )}

            </>
          )
        
        }
          
        </header>
        <footer>
          <button  onClick={handleDownloadImage}>download </button>
          <button  className="secondary" onClick={()=>{window.location.reload()}}>Try again</button> 
        </footer>
      </article>
      
    </div>
  );
};

export default Result;
