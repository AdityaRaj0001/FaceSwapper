import React from "react";

const Imageuploader = ({handleUpload,setInputImage,setTargetImage,handleSwapFaces}) => {
  

  return (
    <main className="container">
      
        
        
          <span>Input Image</span>
          <input type="file" accept="image/*" name="file" onChange={(e)=>handleUpload(e,setInputImage)} />
        

        
          <span>Avatar Image</span>
          <input type="file" accept="image/*" name="file" onChange={(e)=>handleUpload(e,setTargetImage)} />
      

      <button onClick={handleSwapFaces}>Swap</button>
        
      
    </main>
  );
};

export default Imageuploader;
