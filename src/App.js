import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ButtonField from './ButtonField';

function App() {
    const [currentOperand, setCurrentOperand] = useState(null);
    const [prevOperand, setPrevOperand] = useState(null);
    const [operator, setOperator] = useState(null);
    const [nextOperand, setNextOperand] = useState(null);
    const [equalSign, setEqualSign] = useState(null);

    const updatedValue = useRef('0');
    const updatedNextValue = useRef('0');

    useEffect(() => {
        setCurrentOperand('0');
    }, []);

    const appendNegativeSign = (innerHTML) => {
        if (innerHTML === '-' && currentOperand.includes('-')) return;
        if (updatedValue.current === '0') updatedValue.current = '';
        if (updatedNextValue.current === '0') updatedNextValue.current = '';

        if (equalSign) {
            setCurrentOperand(innerHTML + currentOperand);
        } else if (operator) {
            updatedNextValue.current = innerHTML + updatedNextValue.current;
            setCurrentOperand(updatedNextValue.current);
            setNextOperand(updatedNextValue.current);
        } else {
            updatedValue.current = innerHTML + updatedValue.current;
            setCurrentOperand(updatedValue.current);
            setPrevOperand(updatedValue.current);
        }
    }

    const getOperands = (innerHTML) => {
        if (innerHTML === '.' && currentOperand.includes('.')) return;
        if (updatedValue.current === '0') updatedValue.current = '';
        if (updatedNextValue.current === '0') updatedNextValue.current = '';

        if (operator) {
            updatedNextValue.current += innerHTML;
            setCurrentOperand(updatedNextValue.current);
            setNextOperand(updatedNextValue.current);
        } else {
            updatedValue.current += innerHTML;
            setCurrentOperand(updatedValue.current);
            setPrevOperand(updatedValue.current);
        }
    }

    const flush = (innerHTML) => {
        if (!prevOperand) return;

        if (nextOperand) {
            equalSign ? setPrevOperand(currentOperand) : setPrevOperand(compute);
            updatedNextValue.current = '';
            setNextOperand(null);
            setEqualSign(null);
        }

        setOperator(innerHTML);
        setCurrentOperand(innerHTML);
    }

    const compute = () => {
        let sum;

        switch (operator) {
            case '÷':
                sum = Number(prevOperand) / Number(nextOperand);
                break;
            case '×':
                sum = Number(prevOperand) * Number(nextOperand);
                break;
            case '−':
                sum = Number(prevOperand) - Number(nextOperand);
                break;
            case '+':
                sum = Number(prevOperand) + Number(nextOperand);
                break;
            default:
                return;
        }

        if (sum.toString().length > 13) {
            sum = sum.toFixed(11);
        }

        return sum.toString();
    }

    const getCalculation = () => {
        if (!nextOperand) return;

        setEqualSign('=');
        compute();
        setCurrentOperand(compute);
    }

    const clear = () => {
        setCurrentOperand('0');
        setPrevOperand(null);
        setOperator(null);
        setNextOperand(null);
        setEqualSign(null);
        updatedValue.current = '';
        updatedNextValue.current = '';
    }

    return (
        <div className="container">
            <div className="calculator">
                <div className="output-screen">
                    <div id="prev-input">
                        <span id='placeholder'>*</span>
                        {prevOperand}{operator}{nextOperand}{equalSign}
                    </div>
                    <div id="display">
                        {currentOperand}
                    </div>
                </div>
                <ButtonField
                    appendNegativeSign={appendNegativeSign}
                    getOperands={getOperands}
                    flush={flush}
                    compute={compute}
                    getCalculation={getCalculation}
                    clear={clear}
                />
            </div>
        </div>
    )
}

export default App;