from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/api/travel-ai", methods=["POST"])
def travel_ai():
    data = request.get_json()
    query = data.get("query", "")
    latitude = data.get("latitude")
    longitude = data.get("longitude")

    location_info = f"User's current location: lat={latitude}, lon={longitude}."

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are TravelAI, a helpful AI travel assistant."},
                {"role": "user", "content": f"{location_info} Give me travel recommendations, nearest airport, and suggestions for flights, hotels, and cabs for {query}."}
            ],
            temperature=0.7
        )
        ai_text = response.choices[0].message["content"]
        return jsonify({"answer": ai_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)
