import React from "react";

const Result = ({ resultImage,generating }) => {
  const handleDownloadImage = () => {
    if (resultImage) {
      const a = document.createElement("a");
      a.href = resultImage;
      // a.download = "faceswapped_image.png"; // Change the filename as needed
      a.click();
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
          <button  onClick={handleDownloadImage}>open full Image</button>
          <button  class="secondary" onClick={()=>{window.location.reload()}}>Try again</button> 
        </footer>
      </article>
      
    </div>
  );
};

export default Result;
