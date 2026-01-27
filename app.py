<<<<<<< Updated upstream
from flask import Flask, jsonify, request
from BD import get_products, insert_sale
from waitress import serve
app = Flask(__name__) 
=======
from flask import Flask, request, jsonify
from flask_cors import CORS
import BD

app = Flask(__name__)
CORS(app)

>>>>>>> Stashed changes
@app.route('/products', methods=['GET'])
def listar_productos():
    productos = BD.get_products()
    return jsonify(productos)

@app.route('/pedidos', methods=['POST'])
def crear_pedido():
    datos = request.json
    if not datos:
        return jsonify({"status": "error", "message": "Sin datos"}), 400
    
    # Extraemos la información que viene del frontend
    cliente = datos.get('cliente')
    carrito = datos.get('carrito')
    total = datos.get('total')
    
    # Llamamos a la función corregida en BD.py
    exito = BD.insert_venta_formulario(cliente, carrito, total)
    
    if exito:
        return jsonify({"status": "success", "message": "Pedido registrado correctamente"}), 201
    else:
        return jsonify({"status": "error", "message": "Error en la base de datos"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
