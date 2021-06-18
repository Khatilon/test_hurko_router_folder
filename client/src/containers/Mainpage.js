import React from 'react';
import axios from 'axios';

const Mainpage = () => {
    React.useEffect(() => {
        const testFunction = async() => {
            const res = await axios.get('/testroute');
            console.log('testroute', res);
        }
        testFunction();
    }, []);
    return (
        <div>
            Mainpage
        </div>
    )
}

export default Mainpage;
