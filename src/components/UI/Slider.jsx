import React from 'react'
import { styled } from '../../styles/theme'
import * as SliderPrimitive from "@radix-ui/react-slider"

const StyledSlider = styled(SliderPrimitive.Root, {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    touchAction: 'none',
    width: 200,
    height: 20,
})

const StyledTrack = styled(SliderPrimitive.Track, {
    background: "$grey80",
    position: 'relative',
    flexGrow: 1,
    borderRadius: '9999px',
    height: 2
})

const StyledRange = styled(SliderPrimitive.Range, {
    position: 'absolute',
    backgroundColor: '$white',
    borderRadius: '9999px',
    height: '100%',
})

const StyledThumb = styled(SliderPrimitive.Thumb, {
    all: 'unset',
    display: 'block',
    width: 4,
    height: 12,
    backgroundColor: '$white',
    borderRadius: 10,
    cursor: "ew-resize",
    outline: "2px solid $black"
})

export default function Slider(props) {
    return (
        <div>
            <StyledSlider {...props}>
                <StyledTrack>
                    <StyledRange />
                </StyledTrack>
                <StyledThumb />
            </StyledSlider>
        </div>
    )
}
