import React from 'react';

function ButtonField(props) {
    return (
        <div className="button-field">
            <button id="clear" onClick={() => { props.clear() }}>AC</button>
            <button className="entity" onClick={() => { props.appendNegativeSign('-') }}>±</button>
            <button className="operator entity" id="divide" onClick={() => { props.flush('÷') }}>÷</button>

            <button id="seven" onClick={() => { props.getOperands('7') }}>7</button>
            <button id="eight" onClick={() => { props.getOperands('8') }}>8</button>
            <button id="nine" onClick={() => { props.getOperands('9') }}>9</button>
            <button className="operator entity" id="multiply" onClick={() => { props.flush('×') }}>×</button>

            <button id="four" onClick={() => { props.getOperands('4') }}>4</button>
            <button id="five" onClick={() => { props.getOperands('5') }}>5</button>
            <button id="six" onClick={() => { props.getOperands('6') }}>6</button>
            <button className="operator entity" id="subtract" onClick={() => { props.flush('−') }}>-</button>

            <button id="one" onClick={() => { props.getOperands('1') }}>1</button>
            <button id="two" onClick={() => { props.getOperands('2') }}>2</button>
            <button id="three" onClick={() => { props.getOperands('3') }}>3</button>
            <button className="operator entity" id="add" onClick={() => { props.flush('+') }}>+</button>

            <button className="entity" id="decimal" onClick={() => { props.getOperands('.') }}>.</button>
            <button id="zero" value="0" onClick={() => { props.getOperands('0') }}>0</button>
            <button className="operator entity" id="equals" onClick={() => props.getCalculation('=')}>&#61;</button>
        </div>
    )
};

export default ButtonField;