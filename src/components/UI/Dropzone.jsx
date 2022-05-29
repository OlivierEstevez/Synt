import React, { useState, useRef, useEffect, useMemo } from "react"
import { useDropzone } from "react-dropzone"
import bytesToSize from "../../utils/bytesToSize";

import { styled } from "./../../styles/theme"

const DropZoneSelect = styled("span", {
    fontSize: "$small"
})

const DopzoneFile = styled("div", {
    fontFamily: "$mono",
    fontSize: "$small",
    display: "flex",
    alignItems: "center",

    "& div": {
        display: "inline-block",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        width: 150,
        textAlign: "left",
        marginLeft: 8
    }
})

const DropzoneContainer = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    background: "$black",
    color: "$white",
    padding: "12px 36px",
    border: "1px dashed $white",
    borderRadius: 12,
    cursor: "pointer",
    textAlign: "center",

    "&:hover": {
        background: "$grey100",
        color: "$grey20",
        borderColor: "$grey20",

        [`& ${DropZoneSelect}`]: {
            textDecoration: "underline"
        }
    },

    variants: {
        file: {
            true: {
                border: "1px solid $grey20"
            }
        }
    }
})

export default function Dropzone({ exportFile }) {

    const [files, setFiles] = useState([]);
    const prevFile = useRef()

    const { acceptedFiles, getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
        multiple: false,
        maxFiles: 1,
        accept: "audio/*",
        onDrop: acceptedFiles => { setFiles(acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) }))) }
    })

    const acceptedFileItems = acceptedFiles.map(file => (
        <div key={file.path}>
            {/* {file.name} - {bytesToSize(file.size)} */}
            {file.name}
        </div>
    ))

    useEffect(() => {
        prevFile.current?.forEach(file => URL.revokeObjectURL(file.preview))
        exportFile(files[0])
        prevFile.current = files
    }, [files])

    return (
        <DropzoneContainer {...getRootProps()} file={acceptedFileItems.length > 0 ? true : false}>
            <input {...getInputProps()} />
            {acceptedFileItems.length > 0 ?
                <DopzoneFile>
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_372_8829)">
                            <rect x="5" width="5" height="5" rx="1.5" stroke="white" />
                        </g>
                        <path d="M0.5 2C0.5 1.17157 1.17157 0.5 2 0.5H6C7.933 0.5 9.5 2.067 9.5 4V10C9.5 10.8284 8.82843 11.5 8 11.5H2C1.17157 11.5 0.5 10.8284 0.5 10V2Z" stroke="white" />
                        <defs>
                            <clipPath id="clip0_372_8829">
                                <path d="M0 2C0 0.895431 0.895431 0 2 0H6C8.20914 0 10 1.79086 10 4V10C10 11.1046 9.10457 12 8 12H2C0.89543 12 0 11.1046 0 10V2Z" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    {acceptedFileItems}
                </DopzoneFile>
                : <span>Drop an audio file here</span>}
            <DropZoneSelect>{acceptedFileItems.length > 0 ? "Select another one" : "Or click to select"}</DropZoneSelect>
        </DropzoneContainer>
    )
}
