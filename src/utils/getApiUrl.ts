export default function getApiUrl(path: string) {
    return `${process.env.API_URL || "http://localhost:5000/api"}${path}`;
}
