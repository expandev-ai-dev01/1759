import type { ContactFormData, ContactResponse } from '../../types';

export interface UseContactSubmitOptions {
  onSuccess?: (response: ContactResponse) => void;
  onError?: (error: Error) => void;
}

export interface UseContactSubmitReturn {
  submit: (data: ContactFormData) => Promise<ContactResponse>;
  isSubmitting: boolean;
  error: Error | null;
  reset: () => void;
}
