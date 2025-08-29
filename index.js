const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/bfhl', (req, res) => {
    try {

        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input: 'data' must be an array."
            });
        }

        const user_id = "aryan_sing_29032004"; 
        const email = "reachforaryan@gmail.com";
        const roll_number = "22BCE3381";

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabet_chars = [];

        data.forEach(item => {

            if (!isNaN(item) && !isNaN(parseFloat(item))) {
                const num = parseInt(item, 10);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
            } 
    
            else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase()); 
                alphabet_chars.push(...item.split('')); 
            } 

            else {
                special_characters.push(item);
            }
        });

        const concat_string = alphabet_chars
            .reverse()
            .map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
            .join('');

        const response = {
            is_success: true, 
            user_id: user_id,
            email: email,
            roll_number: roll_number,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: sum.toString(),
            concat_string: concat_string,
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: "An internal server error occurred.",
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});