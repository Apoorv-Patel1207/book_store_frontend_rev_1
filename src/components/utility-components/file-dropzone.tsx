import { Typography } from "@mui/material"
import Dropzone from "react-dropzone"

interface FileDropzoneProps {
  onFileSelect: (file: File) => void
  accept?: Record<string, string[]>
  multiple?: boolean
  label?: string
  errorMessage?: string
}

const FileDropzone = (props: FileDropzoneProps) => {
  const {
    onFileSelect,
    accept = { "image/*": [] },
    multiple = false,
    label = "Drag & drop a file or click to upload",
    errorMessage,
  } = props

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(multiple ? acceptedFiles[0] : acceptedFiles[0])
    }
  }

  return (
    <div>
      <Typography gutterBottom variant='subtitle1'>
        {label}
      </Typography>
      <Dropzone accept={accept} multiple={multiple} onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed gray",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              borderRadius: "8px",
            }}
          >
            <input {...getInputProps()} />
            <Typography color='textSecondary'>{label}</Typography>
          </div>
        )}
      </Dropzone>
      {errorMessage && <Typography color='error'>{errorMessage}</Typography>}
    </div>
  )
}

export default FileDropzone
