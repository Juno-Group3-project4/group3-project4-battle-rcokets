// export const playerGridDivRef = [];

// export function addToPlayerGridDivRef(ref) {
//     playerGridDivRef.push(ref);
// }

import { useEffect, useRef } from 'react';

export const useGridDivs = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}