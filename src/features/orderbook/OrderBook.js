import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from "websocket";

import {addAskData, addBidData, selectOrderBook, clearData } from "./orderBookSlice";

import './orderbook.css'

const client = new W3CWebSocket('wss://api-pub.bitfinex.com/ws/2');


const OrderBook = () => {
    const orderBookData = useSelector(selectOrderBook);

    const dispatch = useDispatch();


    const addSocketListeners = () => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
            client.send(            JSON.stringify({
                "event": "subscribe",
                "channel": "book",
                "symbol": "tBTCUSD"
            }));
        };

        client.onmessage = function(event) {
            const orderData = JSON.parse(event.data);
            if(Array.isArray(orderData)) {
                if(Array.isArray(orderData[1])) {
                    const mainData = orderData[1];
                    if(Array.isArray(mainData[0])) {
                        mainData.forEach(d => {
                            if(d[2] > 0) { //amount > 0 bid < 0 ask
                                dispatch(addBidData(d))
                            } else {
                                dispatch(addAskData(d))
                            }
                        })
                    } else {
                        if(mainData[2] > 0) {
                            dispatch(addBidData(mainData));
                        } else {
                            console.log(mainData[2]);
                            dispatch(addAskData(mainData));
                        }
                    }
                }
            }
        };

    };

    useEffect(() => {
        console.log('OOrder book rendered');
        addSocketListeners();
        setTimeout(
            () => dispatch(clearData()),
            60000
        );
        return () => {
            client.close();

        }
    }, []);

    let bidTotal = 0;
    let askTotal = 0;

// Connection opened

    const getBidTableRow = (row, index) => {
        bidTotal += row[2];
        return (
            <tr key={index}>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>{bidTotal}</td>
                <td>{row[0]}</td>
            </tr>
        );
    };

    const getAskTableRow = (row, index) => {
        askTotal += row[2];
        return (
            <tr key={index}>
                <td>{row[0]}</td>
                <td>{askTotal}</td>
                <td>{row[2]}</td>
                <td>{row[1]}</td>
            </tr>
        );
    };



    return (
        <React.Fragment>
            <div className="row">
                <div className="column">
                    <table aria-label="simple table">
                        <tr>
                            <th>COUNT</th>
                            <th>AMOUNT</th>
                            <th>TOTAL</th>
                            <th>PRICE</th>
                        </tr>
                        <tbody>
                        {
                            orderBookData.bidData.map((row, index) => {
                                return getBidTableRow(row, index)
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div className="column">
                    <table className="table table-dark table-striped" aria-label="simple table">
                        <tr>
                            <th>PRICE</th>
                            <th>TOTAL</th>
                            <th>AMOUNT</th>
                            <th>COUNT</th>
                        </tr>
                        <tbody>
                        {
                            orderBookData.askData.map((row, index) => {
                                return getAskTableRow(row, index)
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>

    );
};

export default OrderBook;
