import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../contexts/cart-context';
import Modal from '../components/modal';
import Prototype from "prop-types"


const ProductModal = ({
    product,
    handleSelectedSize,
    setSizes,
    handle,
    sizes
}) => (
    <Modal
        mainComponent={
            <div>
                <h4>Tailles:</h4>
                <select onChange={(e) => handleSelectedSize(e.target.value)}>
                    <option value="">-</option>
                    {
                        sizes.map((size) => (
                            <option key={size} value={size}>{size}</option>
                        ))
                    }
                </select>
            </div>
        }
        showModal={sizes.length > 0}
        closeModal={() => setSizes([])}
        modalTitle='Choisir la taille'
        onConfirm={() => handle(product)}
    />
)

ProductModal.propTypes = {
    product: Prototype.object.isRequired,
    handleSelectedSize: Prototype.func.isRequired,
    setSizes: Prototype.func.isRequired,
    handle: Prototype.func.isRequired,
    sizes: Prototype.array.isRequired,
}

export default function Index() {
    const [products, setProducts] = useState([]);
    const [sizes, setSizes] = useState([]);

    const [size, setSize] = useState('');

    const [currentProductModal, setCurrentProductModal] = useState("");

    const { doesItemExistInCart, addToCart, removeFromCart } = useContext(CartContext);

    useEffect(() => {
        const loadProducts = async () => {
            const response = await fetch('http://localhost:8081/produits');
            const data = await response.json();
            setProducts(data.products);
        }

        loadProducts();
    }, []);


    const isMinusDisabled = (product) => {
        return !doesItemExistInCart(product.id);
    }

    const handleAddToCart = (product) => {
        if (product.sizes === undefined || product.sizes.length === 0) {
            addToCart({
                ...product,
            });
        } else {
            setSizes(product.sizes);
            setCurrentProductModal(product.id)
        }
    }


    const handleSelectedSize = (size) => {
        setSize(size);
    }


    const handle = (p) => {
        if (size.length === 0) {
            alert('Veuillez choisir une taille');
            return;
        }
        addToCart({ ...p, size });
        setSizes([]);
        setSize("")
        setCurrentProductModal("")
    }


    return (
        <div className="border border-dark p-2">
            <div className="d-flex flex-column justify-content-center">
                <h1 className="text-center">Liste des produits</h1>
                <div className="row mt-5">
                    {
                        products.map((product) => (
                            <div className="col-4 mt-1 mr-1" key={product.id}>
                                {
                                    currentProductModal === product.id && (
                                        <ProductModal
                                            product={product}
                                            handleSelectedSize={handleSelectedSize}
                                            setSizes={setSizes}
                                            handle={handle}
                                            sizes={sizes}
                                        />
                                    )
                                }
                                <div className="card">
                                    <img style={
                                        {
                                            maxHeight: '400px',
                                        }
                                    } src={product.image} className="card-img-top" alt="..." />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">marque <b>{product.brand}</b></p>
                                        <div className='row justify-content-center align-items-center'>
                                            <div className='col-2'>
                                                <button
                                                    disabled={isMinusDisabled(product)}
                                                    onClick={() => removeFromCart(product.id)}
                                                    className='btn btn-primary btn-sm'>
                                                    -
                                                </button>
                                            </div>
                                            <div className='col-2'>
                                                <span>{product.quantity}</span>
                                            </div>
                                            <div className='col-2'>
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className='btn btn-primary btn-sm'>+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}