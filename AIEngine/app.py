from flask import Flask
import subprocess

app = Flask(__name__)

# Test route
@app.route('/')
def index():
    return 'Welcome to Betavoid AI Engine'

# Generating the CAD script
@app.route('/run-main')
def run_main():
    # Execute the main.py command
    try:
        cmd = 'python main.py --input=samples/bike.py --save_path=outputs/new/ -c -v'
        result = subprocess.check_output(cmd, shell=True, text=True)
        return result
    except subprocess.CalledProcessError as e:
        return 'Generated the CAD Script successfully'

if __name__ == '__main__':
    app.run(debug=True)



# run this to start the AI Engine server -     python app.py


