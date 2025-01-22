// if you don't use it, you can delete it
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

const books = [
    { id: 1, title: 'Сорочинський ярмарок', author: 'Микола Гоголь', description: 'Описує колоритний і яскравий ярмарок в Україні, повний народних персонажів та культурних особливостей.' },
    { id: 2, title: 'Тигролови', author: 'Іван Багряний', description: 'Захоплююча історія про українських повстанців, які борються за волю в часи Сталінського терору.' },
    { id: 3, title: 'Земля', author: 'Олесь Гончар', description: 'Епічний роман про життя і боротьбу селян на Українському Поліссі у 30-х роках.' }
];

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('Книга не знайдена.');
    }
    res.json(book);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
