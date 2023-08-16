import React from "react";

const Result = ({ resultImage }) => {
  const handleDownloadImage = () => {
    if (resultImage) {
      const a = document.createElement("a");
      a.href = resultImage;
      a.download = "faceswapped_image.png"; // Change the filename as needed
      a.click();
    }
  };

  return (
    <div className="container">
      <article>
        <header>
          <img src={resultImage} alt="Result" />
        </header>
        <footer>
          <button onClick={handleDownloadImage}>Download Result Image</button>
        </footer>
      </article>
      {/* <button >Try again with a different image</button> */}
    </div>
  );
};

export default Result;
