from flask import Flask, request, jsonify
from bubble_sort import turing_bubble_sort

app = Flask(__name__)

@app.route('/')
def home():
    return "Turing Machine Simulator Backend"

@app.route('/simulate', methods=['POST'])
def simulate():
    data = request.get_json()
    tape = data.get('tape', '')
    if not tape:
        return jsonify({'error': 'Tape input required'}), 400

    try:
        steps = turing_bubble_sort(tape)
        return jsonify({'steps': steps})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
