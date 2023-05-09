const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('./db');
const User = require('./models/user');
const Product = require('./models/product');
const routes = require('./routes/routes');

const app = express();

db();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: '*' }));


app.use(routes);

app.post('/inscription', async (req, res) => {
    try {
        const { firstName, lastName, email, password, date } = req.body;
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Cet email est déjà associé à un compte.' });
        }
        // Créer un nouvel utilisateur
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword, date });
        await newUser.save();
        res.status(201).json({ message: 'Inscription réussie.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

app.post('/connexion', async (req, res) => {
    try {
        console.log("en train de connexion")
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }
        const token = jwt.sign({ id: user._id }, "toto");
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
    console.log(req.body);
});


app.get('/produits', async (req, res) => {
    try {
        const products = await Product.find();
        res.json({
            products: products.map(product => ({
                id: product._id,
                ...product._doc
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
})


app.post("/commande", async (req, res) => {
    const { order } = req.body;

    try {
        const products = await Product.find();

        order.forEach(async orderP => {
            const product = products.find(p => p._id.toString() === orderP.productId);

            if (product) {
                const qte = product.quantity;
                await Product.updateOne({ _id: product._id }, { quantity: qte - orderP.quantity });
            }
        })

        res.json({ message: "Commande validée" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
})


app.listen(8081, () => console.log("Je tourne sur le port 8081"));


(async () => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            const pp = ([
                {
                    "name": "Ballon",
                    "brand": "Nike",
                    "price": 100,
                    "quantity": 10,
                    "image": "https://www.intersport-clubs.fr/media/cache/wishibam_shop_product_thumbnail/f2/ee/9ca8b9bdab5f0867181fa7998687.jpg"
                },
                {
                    "name": "Maillot",
                    "brand": "Adidas",
                    "price": 40,
                    "quantity": 25,
                    "image": "https://assets.adidas.com/images/w_600,f_auto,q_auto/a04f17bfb34b43b0941bada000e4a060_9366/Maillot_Entrada_22_Noir_H57497_01_laydown.jpg",
                    "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                    ]
                },
                {
                    "name": "Chaussure",
                    "brand": "Puma",
                    "price": 150,
                    "quantity": 25,
                    "image": "https://www.districenter.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/4/0/4025072-900f-fp.jpg",
                    "sizes": [
                        "40",
                        "41",
                        "42",
                        "43",
                        "44",
                        "45"
                    ]
                },
                {
                    "name": "Chaussette",
                    "brand": "Nike",
                    "price": 10,
                    "quantity": 25,
                    "image": "https://static.nike.com/a/images/t_default/d715d25a-d3fe-4c2a-a345-af995ef1e2c4/chaussettes-mi-mollet-sportswear-everyday-essential-vGLL3J.png",
                    "sizes": [
                        "40",
                        "41",
                        "42",
                        "43",
                        "44",
                        "45"
                    ]
                },
                {
                    "name": "Short",
                    "brand": "Adidas",
                    "price": 30,
                    "quantity": 25,
                    "image": "https://www.sport2000.fr/media/cache/sylius_shop_product_original/aj9994-015-sport2000/web-aj9994-015-01.jpg",
                    "sizes": [
                        "S",
                        "M",
                        "L",
                        "XL"
                    ]
                }
            ]).map(product => new Product(product));

            await Product.insertMany(pp);
        }
    } catch (error) {
        console.error(error);
    }
})()