import imageCompression from "browser-image-compression";

export async function handleCompression(imageFile: any, compressionValue: any) {
  const options = {
    maxSizeMB: compressionValue / 100000,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };

  try {
    return await compressImage(imageFile, options);
  } catch (error) {
    console.log(error);
    return imageFile;
  }
}

async function compressImage(imageFile: File, options: any): Promise<File> {
  if (imageFile.size <= options.maxSizeMB * 100000) return imageFile;

  const compressedBlob = await imageCompression(imageFile, options);

  if (compressedBlob.size <= options.maxSizeMB * 100000) {
    return new File(
      [compressedBlob],
      `compressedImage-${Date.now() + compressedBlob.name}`,
      {
        lastModified: new Date().getTime(),
        type: compressedBlob.type,
      }
    );
  } else {
    const newFile = new File(
      [compressedBlob],
      `compressedImage-${Date.now() + compressedBlob.name}`,
      {
        lastModified: new Date().getTime(),
        type: compressedBlob.type,
      }
    );

    const newCompressedBlob = await compressImage(newFile, {
      ...options,
      maxWidthOrHeight:
        options.maxWidthOrHeight - options.maxWidthOrHeight * 0.2,
    });

    return new File(
      [newCompressedBlob],
      `compressedImage-${Date.now() + newCompressedBlob.name}`,
      {
        lastModified: new Date().getTime(),
        type: newCompressedBlob.type,
      }
    );
  }
}



