export async function uploadImageToImgBB(file: File, apiKey: string = process.env.NEXT_PUBLIC_IMGBB_API_KEY ?? ''): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    console.log('Uploading image to ImgBB...', file.name, file.type, file.size);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    console.log('Response status:', response.status);

    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || `Upload failed with status ${response.status}`);
    }

    const url = data.data.url;
    console.log('Upload successful:', url);
    return url;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}
