import React, { useState, useEffect } from 'react';
import { Row, Col, CardDeck } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'
import '../components/ProductList.css'
import OrderList from '../components/OrderList';

import { fetchOrders } from '../api';

const UserAccountPage = ({ user, setUser, setHeaderClass }) => {
    
    useEffect(() => {
        setHeaderClass('Account');
    }, []);

    const [orders, setOrders] = useState([])
    
    useEffect(() => {
        setUser('customer')
        fetchOrders(customer)
            .then(response => {
                setOrders(response.orders)
            })
    }, [])

    let customer = true;
    if (localStorage.getItem('user').id) {
        return customer
    }

    return (
        <Col id="content">
            { user
                ? <>
                    <Row>
                        <Col>
                            <h1>My orders</h1>
                            {
                                orders && orders.map(order => (
                                    <OrderList
                                        key={order.id}
                                        {...order}>
                                    </OrderList>)
                                )
                            }
                        </Col>
                    </Row>
                </>
                : <><div>Access Denied</div></>
            }
        </Col>
    )
}

export default UserAccountPage