import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import openai from 'openai'; // Import the openai package

dotenv.config();

console.log(process.env.OPENAI_API_KEY);

const configuration = {
    apiKey: process.env.OPENAI_API_KEY, // Correct the API key variable name
};

const openaiInstance = openai; // Use the imported module directly

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from AyuVeda',
    });
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openaiInstance.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`, // Use backticks to interpolate the prompt
            temperature: 0,
            maxTokens: 3000, // Correct the property name
            topP: 1, // Correct the property name
            frequencyPenalty: 0.5, // Correct the property name
            presencePenalty: 0, // Correct the property name
        });
        res.status(200).send({
            bot: response.choices[0].text, // Correct the response property name
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

app.listen(5000, () => console.log('Server is running on port http://localhost:5176'));
