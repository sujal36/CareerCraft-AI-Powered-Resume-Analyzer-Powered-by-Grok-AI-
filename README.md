# CareerCraft: AI-Powered Resume Analyzer (Powered by Grok AI)

CareerCraft is a modern Flask-based web application that intelligently analyzes resumes against job descriptions using Grok AI to provide actionable ATS (Applicant Tracking System) optimization insights.
Designed for job seekers, HR professionals, and recruiters, it helps improve resume compatibility, identify missing keywords, and enhance overall job application success rates.

🚀 **Features**
- **Grok AI-Powered Analysis** – Leverages advanced AI models to analyze resume compatibility with job descriptions.
- **ATS Optimization Insights** – Displays precise matching scores and missing keyword suggestions.
- **Interactive Data Visualization** – Dynamic, responsive doughnut charts for match percentages.
- **PDF Resume Processing** – Extracts and processes text from uploaded PDF resumes.
- **Real-time Feedback** – Instant analysis with detailed recommendations.
- **Modern & Responsive UI** – Smooth animations, professional styling, and mobile-friendly design.

🛠 **Technology Stack**
- **Backend:** Flask (Python)
- **Frontend:** HTML5, CSS3, JavaScript
- **AI Integration:** Grok AI
- **PDF Processing:** PyPDF2
- **Data Visualization:** Matplotlib
- **Styling:** Custom CSS with modern UI/UX principles

📦 **Installation**
1. **Clone the repository**
```bash
git clone 
cd careercraft-resume-analyzer
```

2. **Create a virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**
```bash
cp .env .env
```
Edit `.env` and add your API key:
```ini
GROK_API_KEY=your_actual_api_key_here
```

5. **Run the application**
```bash
python app.py
```

6. **Access the application**  
Open your browser and navigate to:  
[http://localhost:5000](http://localhost:5000)

💡 **Usage**
1. **Enter Job Description** – Paste the job description you want to match against.  
2. **Upload Resume** – Upload your resume in PDF format.  
3. **Analyze** – Click "Analyze Resume" to get AI-powered insights.  
4. **Review Results** – View match percentage, missing keywords, and profile summary.

🌐 **API Endpoints**
- **GET /** – Main application page
- **POST /analyze** – Resume analysis endpoint
- **GET /static/<path:filename>** – Static file serving

📂 **Project Structure**
```csharp
careercraft-resume-analyzer/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables file
├── README.md              # Project documentation
├── templates/
│   └── index.html         # Main HTML template
└── static/
    ├── css/
    │   └── style.css      # Main stylesheet
    ├── js/
    │   └── script.js      # JavaScript functionality
    └── images/            # Static images & media
```

🔍 **Features in Detail**
1. **Resume Analysis**
   - Extracts text from PDF resumes.
   - Sends data to Grok AI for deep semantic analysis.
   - Receives structured scoring, missing keywords, and actionable recommendations.

2. **Data Visualization**
   - Generates interactive doughnut charts for match percentages.
   - Converts Matplotlib plots to base64 for web display.
   - Fully responsive visualizations for mobile & desktop.

3. **User Interface**
   - Gradient backgrounds with smooth animations.
   - Drag-and-drop resume upload.
   - Mobile-first responsive design.

4. **Error Handling**
   - File upload validation with custom error messages.
   - Loading states & progress indicators.
   - Graceful handling of unsupported file types.

⚙️ **Configuration**
| Variable       | Description |
|----------------|-------------|
| GROK_API_KEY   | Your Grok AI API key |
| FLASK_ENV      | Flask environment (development/production) |
| FLASK_DEBUG    | Enable/disable debug mode |

**File Upload Limits**
- Max file size: 16MB
- Supported format: PDF only


## Deployment Link
[CareerCraft-Resume Analyzer](https://careercraft-ai-powered-resume-analyzer-peo1.onrender.com)


## Acknowledgments
- Flask for providing a lightweight yet powerful backend framework.
- Grok AI for powering AI-driven resume analysis and ATS optimization insights.
- python-dotenv for secure environment variable management.
- PyPDF2 for efficient PDF text extraction.
- Matplotlib for creating doughnut chart visualizations.
- HTML5, CSS3, and JavaScript for building a modern, responsive front-end.
- Render for seamless cloud deployment.
  

📜 **License**  
This project is licensed under the MIT License – see the LICENSE file for details.
