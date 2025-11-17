import { publicClient } from '@/core/lib/api';
import type { ContactFormData, ContactResponse } from '../types';

/**
 * @service contactService
 * @summary Contact form submission service for public endpoints
 * @domain contact
 * @type rest-service
 * @apiContext external
 */
export const contactService = {
  /**
   * @endpoint POST /api/v1/external/contact
   * @summary Submits contact form for vehicle inquiry
   */
  async submit(data: ContactFormData): Promise<ContactResponse> {
    const response = await publicClient.post('/contact', data);
    return response.data.data;
  },
};
