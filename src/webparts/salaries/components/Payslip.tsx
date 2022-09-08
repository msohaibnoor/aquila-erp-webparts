import * as React from 'react';

function Payslip(props) {
    console.log(props.pay)
    return (<div>
        Payslip
        <button onClick={props.onChangeDisplay}>Back</button>
    </div>  );
}

export default Payslip;