import react, { useState } from "react";
import Imageuploader from "./Imageuploader";
import AvatarSelector from "./AvatarSelector";
import axios from "axios";
import Result from "./Result";

function App() {
  const [currentstep, setCurrentStep] = useState(1);
  const [inputImage, setInputImage] = useState('');
  const [targetImage,setTargetImage]=useState('');
  const [resultImage,setResultImage]=useState('');


  //handles input image upload on page 1
  const handleUpload = async (event)=>{
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const base64Image = reader.result.split(',')[1];
      setInputImage(base64Image);
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
        const base64Image = reader.result.split(',')[1];
        setTargetImage(base64Image);
        console.log("TargetImageasB64:",targetImage)
      };

      reader.readAsDataURL(blob);
      handleSwapFaces();
      
    } catch (error) {
      console.error('Error converting target image:', error);
    }
  }

  const handleSwapFaces= async ()=>{

      try {

        const requestBody={
          input_face_image:inputImage,
          target_face_image:targetImage,
          file_type:'image',
        }
        const response = await axios.post('https://api.segmind.com/v1/sd2.1-faceswapper',
          requestBody,
          {
            headers: {
              'x-api-key': 'SG_3ac087079f26a77c',
              'Content-Type': 'application/json',
            },
            responseType: 'arraybuffer',
          }
        );

       
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
