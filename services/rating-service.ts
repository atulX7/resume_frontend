export async function submitRating(rating: number, comment: string, name?: string, email?: string) {
    const res = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment, name, email }),
    });
    if (!res.ok) throw new Error('Failed to submit rating');
    return res.json();
} 