import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import fetch from 'node-fetch'; // Add this import statement

dotenv.config();

console.log(process.env.OPENAI_API_KEY);

const configuration = new Configuration({
    apikey: process.env.OPENAI_API_KEY, // Correct the API key variable name
});

const openai = new OpenAIApi(configuration); // Pass the correct configuration object

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
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`, // Use backticks to interpolate the prompt
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        res.status(200).send({
            bot: response.data.choices[0].text, // Correct the response property name
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

app.listen(5000, () => console.log('Server is running on port http://localhost:5176'));
