import { useMutation } from '@tanstack/react-query';
import { contactService } from '../../services/contactService';
import type { UseContactSubmitOptions, UseContactSubmitReturn } from './types';
import type { ContactFormData } from '../../types';

/**
 * @hook useContactSubmit
 * @summary Manages contact form submission with validation and error handling
 * @domain contact
 * @type domain-hook
 * @category form
 */
export const useContactSubmit = (options: UseContactSubmitOptions = {}): UseContactSubmitReturn => {
  const { onSuccess, onError } = options;

  const mutation = useMutation({
    mutationFn: (data: ContactFormData) => contactService.submit(data),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return {
    submit: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error as Error | null,
    reset: mutation.reset,
  };
};
