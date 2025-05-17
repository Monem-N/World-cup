import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';


interface NotesDialogProps {
  notes?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NotesDialog({ notes }: NotesDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="text-sm text-blue-600 hover:underline">View Notes</button>

      {/* Assuming a Dialog component */}
      {/* <Dialog open={isOpen} onOpenChange={setIsOpen}> */}
      {/*   <DialogContent> */}
      {/*     <DialogHeader> */}
      {/*       <DialogTitle>Notes</DialogTitle> */}
      {/*     </DialogHeader> */}
      {/*     <DialogDescription> */}
      {/*       {notes || 'No notes available.'} */}
      {/*     </DialogDescription> */}
      {/*     <DialogFooter> */}
      {/*       <Button onClick={() => setIsOpen(false)}>Close</Button> */}
      {/*     </DialogFooter> */}
      {/*   </DialogContent> */}
      {/* </Dialog> */}

      {/* Basic placeholder */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notes</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {notes || 'No notes available.'}
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
