import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import { useCart } from 'react-use-cart';
import { BsCartPlus } from 'react-icons/bs';

const ProductDetails = (props) => {
    const [productData, setProductData] = useState({});
    const [theme] = useThemeHook();
    const { addItem } = useCart();

    useEffect(() => {
        getResponse();
    }, [props.productId]);

    const getResponse = async () => {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${props.productId}`);
            const data = await res.json();
            setProductData(data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    return (
        <Container className="py-5">
            {Object.keys(productData).length > 0 && (
                <Row className="justify-content-center mt-5">
                    {/* Your image carousel or gallery component goes here */}
                    {/* Example: <ImageCarousel images={productData.images} /> */}

                    <Col xs={10} md={7} lg={7} className={`${theme ? 'text-light' : 'text-black'} product-details`}>
                        <h1>{productData.title}</h1>
                        <Button
                            onClick={() => addItem(productData)}
                            className={theme ? 'bg-dark-primary text-black' : 'bg-light-primary'}
                            style={{ borderRadius: '0', border: 0 }}
                        >
                            <BsCartPlus size="1.8rem" />
                            Add to cart
                        </Button>
                        <br />
                        <b className={`${theme ? 'text-dark-primary' : 'text-light-primary'} h4 mt-3 d-block`}>
                            Rs. {productData.price}
                        </b>
                        <br />
                        <b className="h5">4.1 ⭐</b>
                        <p className="mt-3 h5" style={{ opacity: '0.8', fontWeight: '400' }}>
                            {productData.description}
                        </p>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default ProductDetails;
