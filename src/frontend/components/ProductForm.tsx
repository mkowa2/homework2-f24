import React, { useState } from 'react'
import { addProduct, deleteProduct } from './api'
import '../public/ProductForm.css'

// TODO
// Implement the ProductFormProps interface.
// Note that mode can be either "add" or "delete".
// onProductAdded and onProductDeleted may or may not be necessarily passed to the component.
interface ProductFormProps {
    mode: 'add' | 'delete'; 
    onProductAdded?: () => void; 
    onProductDeleted?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
    mode,
    onProductAdded,
    onProductDeleted,
}) => {
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [productId, setProductId] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (mode === 'add') {
                await addProduct({ name, image_url: imageUrl, deleted:false });
                setName('');
                setImageUrl('');
                if (onProductAdded) {
                    onProductAdded();  // Call the callback function if provided
                }
            } else {
                await deleteProduct(Number(productId));
                setProductId('');
                if (onProductDeleted) {
                  onProductDeleted();  // Call the callback function if provided
                }
            }
        } catch (error) {
            console.error(
                `Error ${mode === 'add' ? 'adding' : 'deleting'} product:`,
                error
            )
        }
    }

    return (
        <div className="product-form-container">
            <h2 className="product-form-title">
                {mode === 'add' ? 'Add New Product' : 'Delete Product'}
            </h2>
            <form onSubmit={handleSubmit} className="product-form">
                {mode === 'add' ? (
                    <>
                        <div className="form-group">
                            <label htmlFor="name"></label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter product name..."
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageUrl"></label>
                            <input
                                type="url"
                                id="imageUrl"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="Enter image URL..."
                            />
                        </div>
                    </>
                ) : (
                    <div className="form-group">
                        <label htmlFor="productId"></label>
                        <input
                            type="text"
                            id="productId"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            placeholder="Enter product ID..."
                            required
                        />
                    </div>
                )}
                <button
                    type="submit"
                    className={
                        mode === 'add' ? 'submit-button' : 'delete-button'
                    }
                >
                    {mode === 'add' ? 'Add Product' : 'Delete Product'}
                </button>
            </form>
        </div>
    )
}

export default ProductForm
