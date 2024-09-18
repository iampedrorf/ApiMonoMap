import { envs } from "../../config/envs.plugin";

export function generateCaseEmailTemplate(
  title: string,
  description: string,
  name: string,
  lastname: string,
  genre: string,
  age: number,
  lat: number,
  lng: number
): string {
  const mapboxUrl = generateMapboxStaticImageURL(lat, lng);
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Información del Caso</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            margin-top: 50px;
        }
        .header {
            background-color: #ffcccc;
            padding: 40px 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .header img {
            width: 150px;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #d9534f;
            font-size: 24px;
            margin: 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
            margin: 20px 0;
        }
        .cta-button {
            background-color: #d9534f;
            color: white;
            padding: 12px 25px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            margin: 20px 0;
            display: inline-block;
        }
        .cta-button:hover {
            background-color: #c9302c;
        }
        .details {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: left;
        }
        .details h2 {
            font-size: 18px;
            margin-bottom: 10px;
        }
        .details p {
            margin: 5px 0;
            font-size: 14px;
        }
        .map-container {
            margin-top: 20px;
            text-align: center;
        }
        .map-container img {
            width: 100%;
            max-width: 550px;
            border-radius: 8px;
            border: 1px solid #ddd;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #777;
        }
        .footer a {
            color: #d9534f;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://cdn-icons-png.flaticon.com/512/3022/3022151.png" alt="">
            <h1>¡${title}!</h1>
        </div>
        <div class="content">
            <p>${description}</p>
        </div>
        <div class="details">
            <h2>Detalles</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Apellido:</strong> ${lastname}</p>
            <p><strong>Género:</strong> ${genre}</p>
            <p><strong>Edad:</strong> ${age} años</p>
            <p><strong>Latitud:</strong> ${lat}</p>
            <p><strong>Longitud:</strong> ${lng}</p>
            <div class="map-container">
                <img src="${mapboxUrl}" alt="Mapa de la ubicación del incidente">
             </div>
        </div>
        <div class="footer">
            <p>¿Necesitas ayuda? <a href="HELP_URL">Contáctanos</a></p>
            <p>&copy; 2024 Tu Empresa. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
  `;
}

export const generateMapboxStaticImageURL = (lat: number, lng: number) => {
  const accessToken = envs.MAPBOX_ACCESS_TOKEN; // Reemplaza con tu token de acceso de Mapbox
  const zoom = 15; // Nivel de zoom
  const width = 800; // Ancho de la imagen
  const height = 500; // Altura de la imagen

  return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
};