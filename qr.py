

# import qrcode

# qr = qrcode.QRCode(version=1,
#                    error_correction=qrcode.constants.ERROR_CORRECT_L,
#                    box_size=7,
#                    border=2)

# qr.add_data('https://www.google.es')
# qr.make(fit=True)

# img = qr.make_image(fill_color="black", back_color="white")
# img.save('test.png')

from flask import Flask, request, jsonify
import qrcode
from io import BytesIO
import base64
from flask_cors import CORS

app = Flask(__name__)

# Habilita CORS para todas las rutas y permite solicitudes desde localhost:3000
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    data = request.json
    url = data.get('url')
    
    # Generar el código QR
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill='black', back_color='white')

    # Convertir la imagen en base64 para enviar al frontend
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    img_str = base64.b64encode(buffer.getvalue()).decode()

    return jsonify({'qr_code': img_str})

if __name__ == '__main__':
    app.run(debug=True, port=5000)

            