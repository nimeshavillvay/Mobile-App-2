"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle
  } from "@repo/web-ui/components/ui/dialog";
  import {useState, useEffect} from 'react'

const NoResultsNotice = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Open just once on mount
        setOpen(true)
    }, [])

return <Dialog open={open} onOpenChange={setOpen}>
<DialogContent>
<DialogHeader>
            <DialogTitle>No results</DialogTitle>
            <DialogDescription>
            Sorry, no results were found for your search term.
            </DialogDescription>
          </DialogHeader>
</DialogContent>
</Dialog>
}

export default NoResultsNotice