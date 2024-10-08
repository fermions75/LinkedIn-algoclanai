"use client"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { personaAction } from './action';
import { toast } from 'sonner';

export function useDeletePersona() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => personaAction({}, 'delete', id),
    onSuccess: () => {
      queryClient.invalidateQueries(['personas']);
      toast.success('Persona deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete persona');
    },
  });
}