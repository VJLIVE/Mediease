from flask import Flask, request, render_template, jsonify
import google.generativeai as genai
from google.generativeai import GenerativeModel

app = Flask(__name__)

# Set up the AI model
genai.configure(api_key="YOUR_API_KEY")

generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]

model = genai.GenerativeModel(
    model_name="gemini-pro", generation_config=generation_config, safety_settings=safety_settings
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/homepage')
def homepage():
    return render_template('homepage.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/bodymassindex')
def bodymassindex():
    return render_template('bodymassindex.html')

@app.route('/bookanappointment')
def bookanappointment():
    return render_template('bookanappointment.html')

@app.route('/contactus')
def contactus():
    return render_template('contactus.html')

@app.route('/cycle')
def cycle():
    return render_template('cycle.html')

@app.route('/exercise')
def exercise():
    return render_template('exercise.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/userprofile')
def userprofile():
    return render_template('userprofile.html')

@app.route('/virtualmeet')
def virtualmeet():
    return render_template('virtualmeet.html')

@app.route('/walking')
def walking():
    return render_template('walking.html')

@app.route('/waterdrop')
def waterdrop():
    return render_template('waterdrop.html')

@app.route('/generate_response', methods=['POST'])
def generate_response():
    # Get the prompt from the request data
    prompt = request.json.get('prompt')

    # List of allowed keywords
    allowed_keywords = [
        "fit", "health", "fitness", "cardio", "strength", "aerobic", "anaerobic",
        "interval", "core", "flexibility", "balance", "agility", "endurance", 
        "power", "speed", "recovery", "muscle", "fat", "bone", "skin", "organs", 
        "systems", "metabolism", "hormones", "nutrients", "energy", "weight", 
        "physique", "appearance", "nutrition", "food", "eating", "macronutrients", 
        "micronutrients", "calories", "carbohydrates", "proteins", "fats", "fiber", 
        "vitamins", "minerals", "water", "supplements", "meal", "portion", "calorie", 
        "junk", "healthy", "processed", "unprocessed", "workout", "routine", 
        "schedule", "duration", "progression", "abs", "ripped", "shredded", "v-cut", 
        "adonis", "washboard", "six-pack", "eight-pack", "ten-pack", "ldl", "hdl", 
        "triglycerides", "atherosclerosis", "heart", "stroke", "saturated", 
        "unsaturated", "monounsaturated", "polyunsaturated", "omega-3", "omega-6", 
        "trans", "well-being", "wellness", "vitality", "longevity", "disease", 
        "prevention", "chronic", "management", "mental", "emotional", "social", 
        "environmental", "beneficial", "positive", "favorable", "desirable", 
        "optimal", "ideal", "appearance", "physique", "body", "composition", 
        "muscle", "definition", "skin", "tone", "hair", "eyes", "smile", 
        "posture", "confidence", "amino", "essential", "non-essential", 
        "complete", "incomplete", "synthesis", "degradation", "breakdown", 
        "sugars", "starches", "fiber", "glucose", "fructose", "sucrose", 
        "lactose", "maltose", "dextrin", "glycogen", "polysaccharide", 
        "polymer", "amylose", "amylopectin", "diet", "eating", "improve"
    ]

    # Check if any of the allowed keywords are present in the prompt
    if any(keyword in prompt.lower() for keyword in allowed_keywords):
        # Generate the response using the AI model
        response = model.generate_content([prompt]).text
        return jsonify({'response': response})
    else:
        # Return a message indicating that the prompt is not related to the allowed topics
        return jsonify({'response': "Sorry, I'm not supposed to answer prompts that are not related to physical body, fitness, and diet."})

if __name__ == '__main__':
    app.run(debug=True)
