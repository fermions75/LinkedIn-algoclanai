"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '@/lib/data/tracking-data'
import Link from "next/link"
import { toast } from "sonner"

export function PostActions({ post }) {
  return (
    <div className="space-y-2">
      <Link href={post.postUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="sm" className="w-full">View Post</Button>
      </Link>
      {post.isReshared && post.originalPostUrl && (
        <Link href={post.originalPostUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary" size="sm" className="w-full">Original Post</Button>
        </Link>
      )}
    </div>
  )
}

export function PostList() {
  const [orderBy, setOrderBy] = useState('latest')
  const [authorFilter, setAuthorFilter] = useState('')
  const [dateFilter, setDateFilter] = useState(null)

  const { data: posts, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    onSuccess: (data) => {
      toast.success("Posts updated successfully")
    },
    onError: (error) => {
      toast.error("Failed to update posts. Please try again.")
    },
  });

  if (isLoading) return <div className="flex justify-center items-center h-64">Loading...</div>
  if (isError) return <div className="flex justify-center items-center h-64 text-red-500">Error fetching posts</div>

  const filteredPosts = posts
    .filter(item => authorFilter ? item.prospect.linkedinUsername.toLowerCase().includes(authorFilter.toLowerCase()) : true)
    .filter(item => dateFilter ? new Date(item.post.postedDateTimestamp).toDateString() === dateFilter.toDateString() : true)
    .sort((a, b) => orderBy === 'latest' ? b.post.postedDateTimestamp - a.post.postedDateTimestamp : a.post.postedDateTimestamp - b.post.postedDateTimestamp)

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg shadow">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <Select value={orderBy} onValueChange={setOrderBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Order by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Filter by author"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="w-[200px]"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFilter ? format(dateFilter, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateFilter}
                onSelect={setDateFilter}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button 
  onClick={() => refetch()} 
  disabled={isFetching}
>
  {isFetching ? 'Checking...' : 'Check updates'}
</Button>
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Author</TableHead>
              <TableHead>Content</TableHead>
              <TableHead className="w-[120px]">Engagement</TableHead>
              <TableHead className="w-[100px]">Posted</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((item) => (
              <TableRow key={item.post._id} className="hover:bg-gray-100">
                <TableCell>
                  <div>
                    <div className="font-medium">{item.prospect.linkedinUsername}</div>
                    <Badge variant="outline" className="mt-1">{item.prospect.type}</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="line-clamp-2">{item.post.text}</p>
                  {item.post.isReshared && (
                    <Badge variant="secondary" className="mt-1">Reshared</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div>👍 {item.post.numLikes}</div>
                    <div>💬 {item.post.numComments || 0}</div>
                    <div>🔁 {item.post.numReposts}</div>
                  </div>
                </TableCell>
                <TableCell>{item.post.postedAtString}</TableCell>
                <TableCell>
                  <PostActions post={item.post} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}