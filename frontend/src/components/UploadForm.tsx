import { Button } from "@mui/material";
import axios from "axios";
import { ChangeEvent } from "react";

interface UploadFormProps {
  onUpdate: () => void;
}

export default function UploadForm({ onUpdate }: UploadFormProps) {
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:5000/upload_data", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    onUpdate();
  };

  return (
    <>
      <input
        type="file"
        accept=".csv,.json"
        style={{ display: "none" }}
        id="upload"
        onChange={handleFileUpload}
      />
      <label htmlFor="upload">
        <Button variant="outlined" component="span">
          Upload JSON/CSV
        </Button>
      </label>
    </>
  );
}
