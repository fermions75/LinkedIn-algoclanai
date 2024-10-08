"use client"
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { getProspects, deleteProspect } from '@/lib/data/tracking-data';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function ProspectList() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const { data: prospects, isLoading, isError } = useQuery({
    queryKey: ['prospects'],
    queryFn: () => getProspects(),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProspect,
    onSuccess: () => {
      queryClient.invalidateQueries(['prospects']);
      toast.success("Prospect deleted successfully");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete prospect. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddProspect = () => {
    router.push('/dashboard/tracking/add');
  }

  const handleDeleteProspect = (id, linkedinUsername, type) => {
    if (window.confirm(`Are you sure you want to delete ${linkedinUsername}?`)) {
      deleteMutation.mutate({ id, linkedinUsername, type });
    }
  }

  const filteredProspects = prospects?.filter(prospect => 
    prospect.linkedinUsername.toLowerCase().includes(nameFilter.toLowerCase()) &&
    (typeFilter === 'all' || prospect.type === typeFilter)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Prospects</h2>
        <div className="space-x-2">
          <Button variant="outline">Import leads</Button>
          <Button onClick={handleAddProspect}>+ Add prospect</Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-lg">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="name-filter" className="text-sm font-medium text-gray-700 block mb-1">Name</label>
          <Input 
            id="name-filter"
            placeholder="Filter by name" 
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="type-filter" className="text-sm font-medium text-gray-700 block mb-1">Type</label>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger id="type-filter">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="company">Company</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>LinkedIn</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Last Checked</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">Loading prospects...</TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">Error loading prospects. Please try again.</TableCell>
            </TableRow>
          ) : filteredProspects?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No prospects found. Click on "Add prospect" to add one.
              </TableCell>
            </TableRow>
          ) : (
            filteredProspects?.map((prospect) => (
              <TableRow key={prospect._id}>
                <TableCell>{prospect.linkedinUsername}</TableCell>
                <TableCell>
                  <a href={`https://www.linkedin.com/in/${prospect.linkedinUsername}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {prospect.linkedinUsername}
                  </a>
                </TableCell>
                <TableCell>{prospect.type}</TableCell>
                <TableCell>{prospect.lastChecked ? new Date(prospect.lastChecked).toLocaleString() : 'Not checked yet'}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteProspect(prospect._id, prospect.linkedinUsername, prospect.type)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}