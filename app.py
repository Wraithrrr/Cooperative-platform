from flask import Flask, request, jsonify, redirect, url_for

app = Flask(__name__)

# In-memory storage for demonstration (use database in production)
users = {}

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Validate input
    if not all([data.get('firstName'), data.get('lastName'), data.get('email')]):
        return jsonify({'message': 'All fields are required!'}), 400
    
    # Check organization email
    if not data['email'].endswith('@organization.com'):
        return jsonify({'message': 'Invalid organization email!'}), 400
    
    # Store user data (in production, use a database)
    users[data['email']] = {
        'firstName': data['firstName'],
        'lastName': data['lastName'],
        'email': data['email']
    }
    
    return jsonify({'message': 'Login successful!', 'redirect': '/dashboard'}), 200

@app.route('/dashboard')
def dashboard():
    return "Welcome to the Dashboard!"

if __name__ == '__main__':
    app.run(debug=True)