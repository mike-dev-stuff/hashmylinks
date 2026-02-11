// Default API key for ImgBB (free tier, publicly shared)
// Users can get their own free API key at: https://api.imgbb.com/
// Note: This key is exposed client-side. For production, consider allowing users to provide their own key
const DEFAULT_IMGBB_API_KEY = 'd2f4d3e8c5e8f9e8e8e8e8e8e8e8e8e8'; // You'll need to replace this with a real API key from imgbb.com

export async function uploadImageToImgBB(file: File, apiKey: string = DEFAULT_IMGBB_API_KEY): Promise<string> {
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
