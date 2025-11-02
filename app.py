from flask import Flask, jsonify, request
from flask_cors import CORS
from BD import get_products, insert_sale
from waitress import serve
app = Flask(__name__) 
CORS(app)
@app.route('/products', methods=['GET'])
def products():
    productos = get_products()
    return jsonify(productos)
@app.post('/pedidos')
def pedidos():
    if insert_sale(request.json['cliente'], request.json['carrito'], request.json['total']):
        return jsonify({"status": "success"}), 201
    else:
        return jsonify({"status": "error"}), 500
if __name__ == '__main__':
    serve(app, host='127.0.0.1', port=5000)
