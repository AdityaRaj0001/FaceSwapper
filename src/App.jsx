import react, { useState } from "react";
import Imageuploader from "./Imageuploader";
import AvatarSelector from "./AvatarSelector";
import axios from "axios";
import Result from "./Result";

function App() {
  const [currentstep, setCurrentStep] = useState(1);
  const [inputImage, setInputImage] = useState(null);
  const [targetImage,setTargetImage]=useState(null);
  const [resultImage,setResultImage]=useState('');


  //handles input image upload on page 1
  const handleUpload = async (event)=>{
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      
      const dataURI = reader.result;
      setInputImage(dataURItoBlob(dataURI));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const handleTargetImage= async(url)=>{
    try {

      const response= await fetch(url)
      if(response.ok){
        console.log("ok till now")
      }
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onload = async () => {
        const dataURI = reader.result;
        setTargetImage(dataURItoBlob(dataURI));
        console.log("TargetImageasB64:",targetImage)
      };

      reader.readAsDataURL(blob);
      handleSwapFaces();
      
    } catch (error) {
      console.error('Error converting target image:', error);
    }
  }

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  const handleSwapFaces= async ()=>{

      try {

        // const requestBody={
        //   input_face_image:inputImage,
        //   target_face_image:targetImage,
        //   file_type:'image',
        // }
        const formData=new FormData();
        formData.append('input_face_image',inputImage)
        formData.append('target_face_image', targetImage);
        formData.append('file_type', 'image');


        const response = await axios.post('http://localhost:3001/api/faceswapper',formData);

       
        const arrayBufferView = new Uint8Array(response.data);
        const blob = new Blob([arrayBufferView], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        setResultImage(url);
        handleNextStep();

      } catch (error) {
        console.error('An error was encountered:', error);
      }


  }



  //changes components based on number
  const handleNextStep = () => {
    setCurrentStep(currentstep + 1);
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <strong>FaceSwapper</strong>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#" role="button" className="contrast outline">
              Github
            </a>
          </li>
        </ul>
      </nav>
      {currentstep === 1 && (
        <Imageuploader
          handleUpload={handleUpload}
          handleNextStep={handleNextStep}
        />
      )}

      {currentstep === 2 && (
          <AvatarSelector
          handleTargetImage={handleTargetImage}/>
        )
      }
      {currentstep === 3 && (
          <Result resultImage={resultImage}/>
        )
      }
    </div>
  );
}

export default App;
