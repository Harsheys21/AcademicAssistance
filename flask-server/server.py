from flask import Flask, request, jsonify
from flask_cors import CORS
# import processing_script
import parse

app = Flask(__name__)
cors = CORS(app)


@app.route("/")
def home():
    return "Hello, Flask!"


@app.route('/process', methods=['POST'])
def process_data():
    try:
        data = request.get_json()
        user_input = data['input']

        # Call python script
        # TODO: Make python script the parsing script
        processed_result = parse.parser(user_input)
# the result will look like this:
# {
    # courses_taken: [],
    #   courses_not_taken: [],
    #   lower_NotSatisfied: [],
    #   upper_NotSatisfied: []
# }
        return jsonify(processed_result)

    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run()
