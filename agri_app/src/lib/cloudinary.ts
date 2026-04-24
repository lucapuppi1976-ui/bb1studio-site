import { v2 as cloudinary } from "cloudinary";
import { getServerEnvValidation } from "@/lib/env";

let configured = false;

function ensureCloudinaryConfigured() {
  if (configured) return;

  const result = getServerEnvValidation();
  if (!result.success) {
    throw new Error("Variabili ambiente server incomplete.");
  }

  cloudinary.config({
    cloud_name: result.data.CLOUDINARY_CLOUD_NAME,
    api_key: result.data.CLOUDINARY_API_KEY,
    api_secret: result.data.CLOUDINARY_API_SECRET,
  });

  configured = true;
}

export async function uploadBufferToCloudinary(buffer: Buffer, folder = "agri_app") {
  ensureCloudinaryConfigured();

  return new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload fallito"));
          return;
        }
        resolve({ secure_url: result.secure_url });
      }
    );

    stream.end(buffer);
  });
}
