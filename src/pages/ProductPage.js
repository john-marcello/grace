import React from 'react';

import { Card, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './ProductPage.css'
import { addItemToCart, fetchProductById } from '../api/index'

const ProductPage = async ( id ) => {

    const product = await fetchProductById(id)

    // async function handleSubmit(event) {
    //     event.preventDefault();

    //     try {
            
    //         const result = await addItemToCart({ id, count: 1 });
    //         setCart({ id, name, price, count: 1 });

            
    //     } catch (error) {
    //         throw error
    //     }
    // }

    
    return (
        <Card className="text-center" key={product.id}>
                <Card.Img variant="top" src={product.imageUrl} />
            <Card.Body>
                <Card.Title className="pb-0">{product.name}</Card.Title>
                <Card.Text className="pb-0">{product.description}</Card.Text>
            </Card.Body>
            <Card.Footer className="pb-4 pt-0">
                <Card.Text className="pb-0 price">${product.price} per pound</Card.Text>
                
            </Card.Footer>
        </Card>
    );

};

export default ProductPage