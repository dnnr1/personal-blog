import { useMutation } from "@tanstack/react-query";
import { uploadFiles } from "@/services/api";

export function useUploadImages() {
  return useMutation({
    mutationFn: (files: File[]) => uploadFiles(files),
  });
}
