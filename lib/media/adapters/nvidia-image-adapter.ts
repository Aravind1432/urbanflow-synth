/**
 * NVIDIA NIM Image Generation Adapter
 *
 * Uses NVIDIA's Build API for image generation (FLUX.1, Stable Diffusion, etc.)
 * Endpoint: https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-xl
 * or https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux-1-dev
 *
 * Supported models:
 * - black-forest-labs/flux-1-dev (FLUX.1 Dev - high quality)
 * - stabilityai/stable-diffusion-xl (SDXL - versatile)
 * - stabilityai/stable-diffusion-3-medium (SD3 - latest)
 * - playgroundai/playground-v2.5 (Playground v2.5 - fast)
 *
 * Authentication: Bearer token via Authorization header
 * API docs: https://build.nvidia.com/explore/discover
 */

import type {
  ImageGenerationConfig,
  ImageGenerationOptions,
  ImageGenerationResult,
} from '../types';

const DEFAULT_MODEL = 'black-forest-labs/flux-1-dev';
const DEFAULT_BASE_URL = 'https://ai.api.nvidia.com/v1/genai';

/**
 * Map model shorthand to full endpoint path
 */
function getModelEndpoint(model: string): string {
  // If model already contains slash, assume it's a valid path
  if (model.includes('/')) {
    return model;
  }
  // Default to FLUX.1 Dev
  return 'black-forest-labs/flux-1-dev';
}

/**
 * Lightweight connectivity test — validates API key by making a minimal
 * request that triggers auth check. 401/403 means key invalid.
 */
export async function testNvidiaImageConnectivity(
  config: ImageGenerationConfig,
): Promise<{ success: boolean; message: string }> {
  const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
  const modelEndpoint = getModelEndpoint(config.model || DEFAULT_MODEL);

  try {
    const response = await fetch(`${baseUrl}/${modelEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
        Accept: 'application/json',
      },
      body: JSON.stringify({
        prompt: 'test',
        negative_prompt: '',
        width: 512,
        height: 512,
        steps: 1,
        sampler: 'DDIM',
        seed: 0,
      }),
    });

    if (response.status === 401 || response.status === 403) {
      const text = await response.text();
      return {
        success: false,
        message: `NVIDIA Image auth failed (${response.status}): ${text}`,
      };
    }

    // Even if generation fails, successful auth means connection works
    if (response.status === 400) {
      return { success: true, message: 'Connected to NVIDIA Image API' };
    }

    return { success: true, message: 'Connected to NVIDIA Image API' };
  } catch (err) {
    return { success: false, message: `NVIDIA Image connectivity error: ${err}` };
  }
}

/**
 * Convert aspect ratio string (e.g., "16:9") to dimensions
 */
function aspectRatioToDimensions(
  ratio: string,
): { width: number; height: number } {
  const [w, h] = ratio.split(':').map(Number);

  // Standard resolutions for different aspect ratios
  const dimensionMap: Record<string, { width: number; height: number }> = {
    '1:1': { width: 1024, height: 1024 },
    '16:9': { width: 1024, height: 576 },
    '4:3': { width: 1024, height: 768 },
    '3:4': { width: 768, height: 1024 },
    '9:16': { width: 576, height: 1024 },
  };

  return dimensionMap[ratio] || { width: 1024, height: 1024 };
}

export async function generateWithNvidiaImage(
  config: ImageGenerationConfig,
  options: ImageGenerationOptions,
): Promise<ImageGenerationResult> {
  const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
  const modelEndpoint = getModelEndpoint(config.model || DEFAULT_MODEL);

  // Determine dimensions
  let width = options.width || 1024;
  let height = options.height || 1024;

  if (options.aspectRatio) {
    const dims = aspectRatioToDimensions(options.aspectRatio);
    width = dims.width;
    height = dims.height;
  }

  // Build request body (NVIDIA API format)
  const requestBody: Record<string, unknown> = {
    prompt: options.prompt,
    negative_prompt: options.negativePrompt || '',
    width,
    height,
    steps: 20, // Default quality steps
    sampler: 'DDIM',
    seed: 0,
  };

  const response = await fetch(`${baseUrl}/${modelEndpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
      Accept: 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`NVIDIA image generation failed (${response.status}): ${text}`);
  }

  const data = await response.json();

  // NVIDIA API returns: { image: "base64_string" } or { url: "..." }
  let imageUrl: string | undefined;
  let imageBase64: string | undefined;

  if (data.image) {
    // Base64 response
    imageBase64 = data.image;
    // Convert to data URL for display
    imageUrl = `data:image/png;base64,${data.image}`;
  } else if (data.url) {
    imageUrl = data.url;
  } else if (data.data?.[0]?.url) {
    // OpenAI-compatible format fallback
    imageUrl = data.data[0].url;
    imageBase64 = data.data[0].b64_json;
  } else {
    throw new Error('NVIDIA returned empty image response');
  }

  return {
    url: imageUrl,
    base64: imageBase64,
    width,
    height,
  };
}
