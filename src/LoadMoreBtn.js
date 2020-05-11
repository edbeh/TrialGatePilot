import React from 'react';

const LoadMoreBtn = ({ handleClick }) => {
    return (
        <div class="row">
            <div class="col text-center">
                <button onClick={handleClick} className="btn btn-primary mt-4 mb-5">Fetch More Records</button>
            </div>
        </div>
    )
}

export default LoadMoreBtn;