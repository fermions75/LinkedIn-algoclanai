"use client"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { promptAction } from './action';
import { toast } from 'sonner';

export function useDeletePrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => promptAction({}, 'delete', id),
    onSuccess: () => {
      queryClient.invalidateQueries(['prompts']);
      toast.success('Prompt deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete prompt');
    },
  });
}