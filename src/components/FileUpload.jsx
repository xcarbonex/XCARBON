import React, {useRef, useState} from "react";
import PropTypes from "prop-types";
import {useField, useFormikContext} from "formik";
import {FaTrash, FaExchangeAlt} from "react-icons/fa"; // Import icons

// Helper to get preview URL or icon
const getPreview = (file) => {
  if (!file) return null;
  if (file.type.startsWith("image/")) {
    return URL.createObjectURL(file);
  }
  // TODO: Replace with actual icon paths in your assets folder if they exist
  if (file.type === "application/pdf") {
    return "/assets/pdf-icon.svg";
  }
  if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.type === "application/msword"
  ) {
    return "/assets/docx-icon.svg";
  }
  return "/assets/file-icon.svg";
};

const FileUpload = ({
  label,
  name,
  accept = "image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  maxFiles = 1,
  maxSize = 10 * 1024 * 1024, // 10MB
  helperText,
  icon,
  placeholder,
  previewPosition = "below", // New prop for preview position
}) => {
  const fileInputRef = useRef();
  const [field, meta] = useField(name);
  const {setFieldValue} = useFormikContext();
  const files = field.value || [];
  const [duplicateWarning, setDuplicateWarning] = useState(""); // New state for duplicate warning
  const [progress, setProgress] = useState(0); // New state for upload progress
  const [isDragOver, setIsDragOver] = useState(false); // New state for drag over effect
  const [replaceIndex, setReplaceIndex] = useState(null); // New state for replacement index
  const isDragDisabled = files.length >= maxFiles; // New state to control drag disablement
  const [inputKey, setInputKey] = useState(0); // New state to force re-render of input
  // Removed: const [showFileInput, setShowFileInput] = useState(true); // New state to force remounting input

  const handleChange = async (e) => {
    let selectedFiles = Array.from(e.target.files);
    const currentFiles = files; // Get current files from state (already reactive)
    const existingFileIds = currentFiles.map((f) => `${f.name}-${f.size}`);

    let newUniqueFiles = [];
    let newDuplicateNames = [];

    if (replaceIndex !== null) {
      // If replacing an existing file
      const selectedFile = selectedFiles[0]; // Assuming single file selection for replacement
      if (selectedFile && selectedFile.size <= maxSize) {
        const newFiles = currentFiles.map((f, i) =>
          i === replaceIndex ? selectedFile : f
        );
        setFieldValue(name, newFiles);
        setDuplicateWarning(""); // Clear warning on replace
        setProgress(0); // Reset progress on replace
      } else if (selectedFile) {
        // Handle case where replacement file is too large
        setDuplicateWarning("File too large to replace.");
      }
    } else {
      // Existing logic for adding new files
      selectedFiles.forEach((selectedFile) => {
        const fileId = `${selectedFile.name}-${selectedFile.size}`;
        if (existingFileIds.includes(fileId)) {
          newDuplicateNames.push(selectedFile.name);
        } else if (selectedFile.size <= maxSize) {
          newUniqueFiles.push(selectedFile);
        }
      });

      let updatedFiles = [...currentFiles, ...newUniqueFiles].slice(
        0,
        maxFiles
      );
      setFieldValue(name, updatedFiles);
    }

    // Simulate upload progress (only for newly added unique files, or after a successful replacement)
    if (
      (replaceIndex !== null &&
        selectedFiles.length > 0 &&
        selectedFiles[0].size <= maxSize) ||
      newUniqueFiles.length > 0
    ) {
      setProgress(0);
      const filesToProcessForProgress =
        replaceIndex !== null && selectedFiles.length > 0
          ? selectedFiles
          : newUniqueFiles;
      for (let i = 0; i < filesToProcessForProgress.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
        setProgress(((i + 1) / filesToProcessForProgress.length) * 100);
      }
      setProgress(100); // Ensure it reaches 100%
    }

    if (newDuplicateNames.length > 0) {
      setDuplicateWarning(
        `Duplicate file(s) not added: ${newDuplicateNames.join(", ")}.`
      );
    } else {
      setDuplicateWarning("");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the input value to allow re-uploading the same file
    }
    setReplaceIndex(null); // Reset replace index
    // Removed: setInputKey((prevKey) => prevKey + 1); // Increment key to force re-render of input
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default to allow drop
    e.stopPropagation(); // Stop event propagation
    if (isDragDisabled) {
      e.dataTransfer.dropEffect = "none";
    } else {
      e.dataTransfer.dropEffect = "copy";
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault(); // Always prevent default
    e.stopPropagation(); // Stop event propagation
    // Do not return here. Always let setIsDragOver run to reset visual feedback.
    setIsDragOver(!isDragDisabled);
  };

  const handleDragLeave = (e) => {
    e.preventDefault(); // Always prevent default
    e.stopPropagation(); // Stop event propagation
    // Do not return here. Always let setIsDragOver run to reset visual feedback.
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault(); // Prevent default behavior (opening file in new tab)
    e.stopPropagation(); // Stop event propagation
    if (isDragDisabled) {
      setIsDragOver(false); // Reset drag over state if max files reached
      return;
    }
    setIsDragOver(false); // Reset drag over state
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleChange({target: {files: e.dataTransfer.files}});
      e.dataTransfer.clearData();
    }
  };

  const handleRemove = (idx) => {
    const newFiles = files.filter((_, i) => i !== idx);
    setFieldValue(name, newFiles);
    // Clear duplicate warning if all files are now unique (optional, but good UX)
    if (
      newFiles.length === 0 ||
      newFiles.every(
        (f) =>
          !files.some(
            (existing) =>
              `${existing.name}-${existing.size}` === `${f.name}-${f.size}`
          )
      )
    ) {
      setDuplicateWarning("");
    }
    setProgress(0); // Reset progress when files are removed
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the input value to allow re-uploading the same file
    }
    setInputKey((prevKey) => prevKey + 1); // Increment key to force re-render of input
  };

  const handleReplace = (idx) => {
    if (fileInputRef.current) {
      setReplaceIndex(idx); // Set the index of the file to be replaced
      fileInputRef.current.click(); // Trigger the file input click
      setInputKey((prevKey) => prevKey + 1); // Increment key to force re-render of input after replace attempt
    }
  };

  const renderPreview = () => (
    <div className="mt-2 space-y-2 h-fit w-full">
      {files.map((file, idx) => (
        <div
          key={idx}
          className="flex items-center space-x-2 bg-secondary border p-3 rounded-md shadow-sm"
        >
          {file.type.startsWith("image/") ? (
            <img
              src={getPreview(file)}
              alt={file.name}
              className="w-16 h-16 object-cover border rounded-md flex-shrink-0"
            />
          ) : (
            <div className="w-16 h-16 flex items-center border justify-center bg-[#363638] rounded-md flex-shrink-0">
              <img
                src={getPreview(file)}
                alt="file"
                className="w-8 h-8 border object-contain"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <span className="text-sm text-tbase block truncate">
              {file.name}
            </span>
            <span className="text-xs text-[#949494]">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              className="text-red-400 hover:text-red-500 transition-colors duration-200 p-1 rounded-full"
              onClick={() => handleRemove(idx)}
              title="Remove File"
            >
              <FaTrash size={16} />
            </button>
            <button
              type="button"
              className="text-blue-400 hover:text-blue-500 transition-colors duration-200 p-1 rounded-full"
              onClick={() => handleReplace(idx)}
              title="Change File"
            >
              <FaExchangeAlt size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const inputArea = (
    <div
      className={`rounded-lg p-5 flex flex-col items-center justify-center border-2 ${
        isDragDisabled
          ? "border-red-500 cursor-not-allowed"
          : isDragOver
          ? "border-blue-500"
          : "border-[#363638] hover:border-[#5a5a5a]"
      } border-dashed transition-colors duration-200`}
      onClick={() => {
        if (isDragDisabled) return; // Disable click if max files reached
        fileInputRef.current && fileInputRef.current.click();
      }}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        opacity: isDragDisabled ? 0.6 : 1,
      }}
    >
      <img
        src={icon || "/assets/certificate.svg"}
        alt="upload icon"
        className="mb-1 w-8 h-8"
      />
      <p className="text-center text-tbase font-medium">
        {placeholder || "Drag & Drop or Click to Upload"}
      </p>
      {maxFiles > 1 && (
        <p className="text-center text-sm text-[#949494] mt-1">
          {files.length}/{maxFiles} files uploaded
        </p>
      )}
      <input
        type="file"
        id={name}
        name={name}
        accept={accept}
        multiple={maxFiles > 1}
        className="hidden"
        ref={fileInputRef}
        onChange={handleChange}
        disabled={replaceIndex === null && isDragDisabled} // Only disable if not replacing and max files reached
        key={inputKey} // Add key to force re-render of input
      />
      <p className="text-xs font-medium text-[#949494] mt-1">
        {helperText ||
          `Upload PDF, DOCX, or JPG (Max ${maxSize / (1024 * 1024)}MB)`}
      </p>
      {progress > 0 && progress < 100 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{width: `${progress}%`}}
          ></div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="mb-6 w-full"
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {label && (
        <label htmlFor={name} className="block mb-2">
          {label}
        </label>
      )}
      <div
        className={`flex ${
          previewPosition === "below" ? "flex-col" : "items-start gap-4"
        }`}
      >
        {previewPosition === "left" && files.length > 0 && renderPreview()}
        <div className={previewPosition === "below" ? "w-full" : "flex-1"}>
          {inputArea}
          {previewPosition === "inside" && files.length > 0 && renderPreview()}
        </div>
        {previewPosition === "right" && files.length > 0 && renderPreview()}
      </div>
      {previewPosition === "below" && files.length > 0 && renderPreview()}
      {duplicateWarning && (
        <div className="text-yellow-500 text-xs mt-1">{duplicateWarning}</div>
      )}
      {meta.touched && meta.error && (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  accept: PropTypes.string,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  helperText: PropTypes.string,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  previewPosition: PropTypes.oneOf(["inside", "below", "left", "right"]),
};

export default FileUpload;
