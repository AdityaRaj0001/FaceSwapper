import react, { useState } from "react";
import Imageuploader from "./Imageuploader";
import axios from "axios";
import Result from "./Result";

function App() {
  const [currentstep, setCurrentStep] = useState(1);
  const [inputImage, setInputImage] = useState(null);
  const [targetImage,setTargetImage]=useState(null);
  const [resultImage,setResultImage]=useState('');
  const [generating, setgenerating] = useState(0);

  //handles input image upload on page 1
  const handleUpload = async (event,setImage)=>{
    const file = event.target.files[0];
    setImage(file);
  }

  const handleSwapFaces= async ()=>{
    setgenerating(1);

      try {

        const formData=new FormData();
        formData.append('input_face_image',inputImage)
        formData.append('target_face_image', targetImage);

        const response = await axios.post('https://odd-blue-katydid-wrap.cyclic.cloud/',formData,{
          headers:{
            'x-api-key':'SG_09a23dbaa95fa82b',
          }
        });

        
        setResultImage(response.data.result.secure_url);

      } catch (error) {
        console.error('An error was encountered:', error);
      }

  }

  //changes components based on number
  

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
            <a href="https://github.com/AdityaRaj0001/FaceSwapper" role="button" className="contrast outline">
              Github
            </a>
          </li>
        </ul>
      </nav>

        <Imageuploader
          handleUpload={handleUpload}
          setInputImage={setInputImage}
          setTargetImage={setTargetImage}
          handleSwapFaces={handleSwapFaces}
        />
        
          <Result resultImage={resultImage} generating={generating}  />
        
      
    </div>
  );
}

export default App;
