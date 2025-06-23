import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { submitRating } from '@/services/rating-service';

interface RatingDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (rating: number, comment: string) => void;
}

export function RatingDialog({ open, onClose, onSubmit }: RatingDialogProps) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await submitRating(rating, comment);
            await onSubmit(rating, comment);
        } catch {
            alert('Failed to submit rating');
        }
        setSubmitting(false);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={open => !open && onClose()}>
            <DialogContent className="bg-white dark:bg-black">
                <DialogHeader>
                    <DialogTitle className="text-center">Comment & Rating Form</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Your Ratings <span className="text-red-500">*</span></label>
                        <div className="flex space-x-1 mb-2 justify-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    className="focus:outline-none"
                                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                                >
                                    <svg
                                        className={`w-8 h-8 ${star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Comments</label>
                        <textarea
                            className="w-full border rounded p-2 min-h-[80px]"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="Your comments..."
                            required
                        />
                    </div>
                    <DialogFooter className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                            onClick={onClose}
                            disabled={submitting}
                        >
                            Skip
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white font-semibold"
                            disabled={submitting || rating === 0}
                        >
                            {submitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 