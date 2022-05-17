import React, { useState, useRef, useEffect, useMemo } from "react"
import { useDropzone } from "react-dropzone"
import bytesToSize from "../../utils/bytesToSize";

import { styled } from "./../../styles/theme"

const DropzoneContainer = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    background: "$black",
    color: "$white",
    padding: "12px 48px",
    border: "1px dashed $white",
    borderRadius: 12,
    cursor: "pointer",
    textAlign: "center",

    "&:hover": {
        background: "$grey100",
        color: "$grey20",
        borderColor: "$grey20"
    }
})

const DropZoneSelect = styled("span", {
    fontSize: "$small"
})


export default function Dropzone({ exportFile }) {

    const [files, setFiles] = useState([]);
    const prevFile = useRef()

    const { acceptedFiles, getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
        multiple: false,
        maxFiles: 1,
        accept: "audio/*",
        onDrop: acceptedFiles => {setFiles(acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) })))}
    })

    const acceptedFileItems = acceptedFiles.map(file => (
        <div key={file.path}>
            {file.name} - {bytesToSize(file.size)}
        </div>
    ))

    useEffect(() => {
        prevFile.current?.forEach(file => URL.revokeObjectURL(file.preview))
        exportFile(files[0])
        prevFile.current = files
    }, [files])

    return (
        <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} />
            <div>{acceptedFileItems}</div>
            <span>Drop an audio file here</span>
            <DropZoneSelect>Or click to select</DropZoneSelect>
        </DropzoneContainer>
    )
}
