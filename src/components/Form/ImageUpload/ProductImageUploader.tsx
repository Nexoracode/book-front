import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import useUploadImages from "../../../hooks/useUploadImages";
import Button from "../../Assets/Button";
import { TrashIcon } from "../../Icons/TrashIcon";
import { Media } from "../../../types";

type Props = {
  existingImages?: Media[];
  singleUrl?: string | null;
  label?: string;
  name: string;
  exportType?: "id" | "url";
  multiple?: boolean;
};

export default function ProductImageUploader({
  existingImages = [],
  label = "تصویر",
  name,
  exportType = "id",
  multiple,
  singleUrl,
}: Props) {
  const { setValue, getValues } = useFormContext();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [currentFiles, setCurrentFiles] = useState<Media[]>([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const {
    mutate: uploadImages,
    isPending,
    isSuccess,
    data,
    reset,
  } = useUploadImages();

  useEffect(() => {
    if (isSuccess && data?.data) {
      const uploaded = data.data;
      const ids = uploaded.map((item) => item[exportType]);

      // مقدار قبلی اگر هست با مقدار جدید ادغام کن
      const existingIds = getValues(name) || [];
      setValue(name, [...existingIds, ...ids]);
      setSelectedFiles([]);
      setPreviewUrls([]);
      setCurrentFiles((prev) => [...prev, ...uploaded]);
      // toast.success("آپلود تصاویر با موفقیت انجام شد");
      reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (multiple) {
      setCurrentFiles(existingImages);
      setValue(
        name,
        existingImages.map((i) => i[exportType])
      );
    } else if (singleUrl && currentFiles.length === 0) {
      setCurrentFiles(() =>
        singleUrl
          ? [
              {
                id: 1,
                url: singleUrl,
                createdAt: "",
                displayOrder: 1,
                productId: 0,
              },
            ]
          : []
      );
    }
  }, [existingImages, singleUrl, multiple]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const urls = files.map((file) => URL.createObjectURL(file));
    setSelectedFiles(files);
    setPreviewUrls(urls);
    setShowPreviewModal(true);
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    const updatedPreviews = [...previewUrls];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setSelectedFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
  };

  const handleConfirmUpload = () => {
    if (selectedFiles.length > 0) {
      uploadImages({ files: selectedFiles });
      setShowPreviewModal(false);
    } else {
      toast.error("هیچ فایلی برای آپلود وجود ندارد");
    }
  };

  const handleDelete = (id: number) => {
    const current = currentFiles.filter((i) => i.id !== id);
    const currentIds = current.map((i) => i[exportType]);
    setCurrentFiles(current);
    setValue(name, [...currentIds]);
  };

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold">آپلود {label}</span>
      </label>

      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileChange}
        className="file-input file-input-bordered w-full"
      />

      {/* نمایش تصاویر فعلی */}
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500 mb-2">تصاویر:</p>
        <div className="flex flex-wrap gap-2">
          {currentFiles.map((file) => (
            <div className="relative" key={file.id}>
              <Button
                onClick={() => handleDelete(file.id)}
                color="error"
                className="absolute top-1 left-1"
              >
                <TrashIcon />
              </Button>
              <img
                src={file.url}
                alt="existing"
                className="w-full h-28 object-cover rounded border"
              />
            </div>
          ))}
        </div>
      </div>

      {isPending && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[99] flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center gap-3">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-gray-700 dark:text-gray-200 text-sm font-medium">
              در حال آپلود تصاویر...
            </p>
          </div>
        </div>
      )}

      {/* مودال پیش‌نمایش */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-2xl shadow-xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              پیش‌نمایش تصاویر انتخاب‌شده
            </h3>

            {previewUrls.length > 0 ? (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {previewUrls.map((url, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={url}
                      alt={`preview-${idx}`}
                      className="w-full h-32 object-cover rounded border"
                    />
                    <button
                      onClick={() => removeFile(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-gray-400 mb-4">
                همه تصاویر حذف شده‌اند.
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button
                className="btn btn-outline"
                onClick={() => {
                  setShowPreviewModal(false);
                  setSelectedFiles([]);
                  setPreviewUrls([]);
                }}
              >
                انصراف
              </button>
              <button
                className={`btn btn-primary ${isPending ? "loading" : ""}`}
                onClick={handleConfirmUpload}
                disabled={isPending || previewUrls.length === 0}
              >
                تایید و آپلود
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
