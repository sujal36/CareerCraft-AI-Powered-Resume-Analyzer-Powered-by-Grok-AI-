from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import PyPDF2 as pdf
from dotenv import load_dotenv
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import base64
import re
import requests

# Load .env variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
print("[DEBUG] Loaded GROQ Key:", GROQ_API_KEY[:8] + "*****")

# Flask app
app = Flask(__name__)
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB

# ✅ Groq LLaMA 3 Call
def get_llama3_response(prompt):
    try:
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "llama3-70b-8192",
            "messages": [
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.5,
            "max_tokens": 1024
        }
        response = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=payload)
        response.raise_for_status()
        return response.json()['choices'][0]['message']['content']
    except Exception as e:
        print(f"[Groq API Error]: {e}")
        return None

# PDF Extractor
def extract_pdf_text(pdf_file):
    try:
        reader = pdf.PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        print(f"[PDF Error]: {e}")
        return None

# Donut chart
def create_doughnut_chart(percentage):
    try:
        fig, ax = plt.subplots(figsize=(6, 6))
        sizes = [percentage, 100 - percentage]
        colors = ['#4CAF50', '#E0E0E0']
        explode = (0.1, 0)
        ax.pie(sizes, colors=colors, startangle=90, explode=explode,
               wedgeprops=dict(width=0.3))
        ax.text(0, 0, f'{percentage}%', ha='center', va='center',
                fontsize=24, fontweight='bold')
        ax.set_title("Match Percentage", fontsize=16)
        ax.axis('equal')
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png', bbox_inches='tight',
                    facecolor='white', edgecolor='none')
        buffer.seek(0)
        chart_base64 = base64.b64encode(buffer.read()).decode()
        plt.close(fig)
        return chart_base64
    except Exception as e:
        print(f"[Chart Error]: {e}")
        return None

# LLaMA response
def parse_analysis_response(response_text):
    try:
        lines = response_text.strip().split('\n')
        match_percentage = 0
        for line in lines:
            if 'match' in line.lower() and '%' in line:
                match = re.search(r'(\d+)%', line)
                if match:
                    match_percentage = int(match.group(1))
                    break
        return {
            'match_percentage': match_percentage,
            'full_response': response_text
        }
    except Exception as e:
        print(f"[Parse Error]: {e}")
        return {
            'match_percentage': 0,
            'full_response': response_text
        }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    try:
        job_description = request.form.get('job_description', '').strip()
        uploaded_file = request.files.get('resume_file')

        if not job_description:
            return jsonify({'success': False, 'error': 'Please provide a job description.'})
        if not uploaded_file or uploaded_file.filename == '':
            return jsonify({'success': False, 'error': 'Please upload a resume file.'})
        if not uploaded_file.filename.lower().endswith('.pdf'):
            return jsonify({'success': False, 'error': 'Please upload a PDF file.'})

        resume_text = extract_pdf_text(uploaded_file)
        if not resume_text:
            return jsonify({'success': False, 'error': 'Failed to extract text from PDF.'})

        resume_text = resume_text[:4000]
        job_description = job_description[:1000]

        input_prompt = f"""
As an ATS system, evaluate the resume based on this job description.

Give your response in:
1. Match Percentage (like 78%)
2. Missing Keywords
3. Profile Summary

Resume:
{resume_text}

Job Description:
{job_description}
"""

        print("[DEBUG] Prompt sent to LLaMA 3:")
        print(input_prompt[:300])

        ai_response = get_llama3_response(input_prompt)
        if not ai_response:
            return jsonify({'success': False, 'error': 'AI response failed. Try again.'})

        print("[DEBUG] LLaMA Response:")
        print(ai_response)

        analysis_result = parse_analysis_response(ai_response)
        chart_base64 = create_doughnut_chart(analysis_result['match_percentage'])

        return jsonify({
            'success': True,
            'analysis': analysis_result['full_response'],
            'match_percentage': analysis_result['match_percentage'],
            'chart': chart_base64
        })

    except Exception as e:
        print(f"[Analyze Resume Error]: {e}")
        return jsonify({'success': False, 'error': 'Unexpected error occurred.'})

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    print("[DEBUG] Starting Flask app with Groq (LLaMA 3) test...")
    test = get_llama3_response("Hello LLaMA!")
    print("[DEBUG] Test LLaMA Response:", test)
    app.run(debug=True, host='0.0.0.0', port=5000)
