import React, {useRef, useState, useEffect} from 'react'
import useEventListener from '../../utils/useEventListener'

const HIDE_KEYS = ["27", "h"]

export default function Panel(props) {

    const [isActive, setActive] = useState("false");

    const panel = useRef()

    const handler = ({ key}) => {
        if (HIDE_KEYS.includes(String(key))) {
            console.log("pepo");
            setActive(!isActive)
        }
    }
    useEventListener("keydown", handler)

    return (
        <div
        style={{"position": "absolute", "bottom": 24, "display": "flex", "alignItems": "end"}}
        className={isActive ? "visible" : "invisible"} ref={panel}>{props.children}</div>
    )
}