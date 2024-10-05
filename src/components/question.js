import React, { useState } from 'react';
import './question.css'; 

const Question = () => {
    const [url, setUrl] = useState(''); 
    const [qrCode, setQrCode] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        alert(url)

        const response = await fetch('http://127.0.0.1:5000/generate_qr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }),
        });

        const data = await response.json();
        setQrCode(`data:image/png;base64,${data.qr_code}`);
        
    }


    return (
        <>
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2 className="login-title">Añade la URL</h2>
                    <div className="input-group">
                        <input
                            type="URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="URL"
                            required
                        />
                    </div>
                    <button className="login-button" type="submit">Crear QR</button>
                    {qrCode && <img src={qrCode} alt="Código QR" />} {/* Muestra la imagen si qrCode tiene un valor */}
                </form>
            </div>
        </>

    );
};

export default Question; 