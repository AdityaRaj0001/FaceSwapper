import React from "react";

const Imageuploader = ({handleUpload,handleNextStep}) => {
  

  return (
    <main className="container">
      
        
        <label htmlFor="file">
          File browser
          <input type="file" accept="image/*" name="file" onChange={(e)=>handleUpload(e)} />
        </label>
        <a href="#" role="button" className="outline" onClick={handleNextStep}>next</a>
        
      
    </main>
  );
};

export default Imageuploader;
