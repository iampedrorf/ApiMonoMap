import { envs } from "../../config/envs.plugin";

export function generateCaseEmailTemplate(title: string, description: string, name: string, lastname: string, genre: string, age: number, lat: number, lng: number): string {
    const mapboxUrl = generateMapboxStaticImageURL(lat, lng);
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Case Information</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f7f7f7;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            border-top: 6px solid #004080;
        }
        .header {
            background-color: #004080;
            color: #ffffff;
            padding: 30px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
        }
        .content {
            padding: 25px;
            font-size: 16px;
            line-height: 1.6;
            color: #4a4a4a;
        }
        .content h2 {
            font-size: 20px;
            color: #004080;
            margin-bottom: 15px;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 5px;
        }
        .content p {
            margin: 8px 0;
        }
        .content .label {
            font-weight: bold;
            color: #333;
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
            background-color: #f0f0f0;
            text-align: center;
            padding: 15px;
            font-size: 12px;
            color: #888;
        }
        .footer p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            Case Information Report
        </div>
        <div class="content">
            <h2>Personal Details</h2>
            <p><span class="label">Name:</span> ${name} ${lastname}</p>
            <p><span class="label">Gender:</span> ${genre}</p>
            <p><span class="label">Age:</span> ${age} years old</p>

            <h2>Incident Location</h2>
            <p><span class="label">Latitude:</span> ${lat}</p>
            <p><span class="label">Longitude:</span> ${lng}</p>

            <div class="map-container">
                <img src="${mapboxUrl}" alt="Map of Incident Location">
            </div>
        </div>
        <div class="footer">
            <p>This email is automatically generated. Please do not reply.</p>
            <p>&copy; ${new Date().getFullYear()} Case Management System</p>
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
}