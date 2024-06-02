/* eslint-disable react/prop-types */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastMsg({startAIGame, restart}) {
    return (
        <div>
            <button onClick={() => {restart();toast.error("Win, If you Can 😈"); startAIGame()}}>
            Play with AI</button>
            <ToastContainer  />
        </div>
    )
}

export default ToastMsg;
