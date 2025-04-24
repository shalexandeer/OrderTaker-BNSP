import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
app.set('trust proxy', 1);
const port = 3000;
// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});