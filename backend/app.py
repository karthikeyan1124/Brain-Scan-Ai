from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.resnet_v2 import preprocess_input
from PIL import Image
import numpy as np
import io

# Initialize FastAPI app
app = FastAPI(title="Brain Tumor Classification API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model
try:
    model = load_model('ResNet50V2_model.h5')
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")

# Define the class names
class_names = ['glioma_tumor', 'meningioma_tumor', 'normal', 'pituitary_tumor']

def preprocess_image(image_bytes, target_size=(224, 224)):
    """
    Preprocess the image bytes for model prediction
    """
    # Convert bytes to PIL Image
    image = Image.open(io.BytesIO(image_bytes))
    
    # Convert to RGB if necessary
    if image.mode != "RGB":
        image = image.convert("RGB")
        
    # Resize image
    image = image.resize(target_size)
    
    # Convert to numpy array and preprocess
    image_array = np.array(image)
    image_array = preprocess_input(image_array)
    image_array = np.expand_dims(image_array, axis=0)
    
    return image_array

def get_tumor_description(class_name: str) -> dict:
    """
    Get detailed information about the tumor type
    """
    descriptions = {
        'glioma_tumor': {
            "type": "Glioma Tumor",
            "description": "A type of tumor that starts in the glial cells of the brain or spine.",
            "recommendation": "Immediate consultation with a neuro-oncologist is recommended. Further diagnostic tests may be required.",
            "severity": "High"
        },
        'meningioma_tumor': {
            "type": "Meningioma Tumor",
            "description": "A tumor that forms in the meninges, the membranes that surround the brain and spinal cord.",
            "recommendation": "Regular monitoring and consultation with a neurosurgeon is advised. Treatment depends on size and location.",
            "severity": "Moderate"
        },
        'normal': {
            "type": "Normal",
            "description": "No apparent tumor detected in the MRI scan.",
            "recommendation": "Regular health check-ups as per standard medical guidelines.",
            "severity": "None"
        },
        'pituitary_tumor': {
            "type": "Pituitary Tumor",
            "description": "A tumor that develops in the pituitary gland at the base of the brain.",
            "recommendation": "Endocrinological evaluation and regular monitoring of hormone levels is recommended.",
            "severity": "Moderate to High"
        }
    }
    return descriptions.get(class_name, {})

@app.get("/")
async def home():
    """Health check endpoint"""
    return {"status": "active", "message": "Brain Tumor Classification API is running!"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Process the uploaded image and return tumor classification with details
    """
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="Uploaded file must be an image")
        
        # Read image contents
        contents = await file.read()
        
        # Preprocess image
        preprocessed_image = preprocess_image(contents)
        
        # Make prediction
        predictions = model.predict(preprocessed_image)
        class_index = np.argmax(predictions)
        predicted_class = class_names[class_index]
        probabilities = predictions[0].tolist()
        
        # Get detailed information about the prediction
        tumor_info = get_tumor_description(predicted_class)
        
        # Prepare response
        response = {
            "classification": predicted_class,
            "confidence": float(predictions[0][class_index]),
            "probabilities": {
                class_name: float(prob) 
                for class_name, prob in zip(class_names, probabilities)
            },
            "tumor_info": tumor_info,
            "success": True
        }
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)