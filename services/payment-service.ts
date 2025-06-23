
export async function initiatePayment(planId: string) {
    const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
    });

    if (!res.ok) throw new Error('Failed to initiate payment');

    const data = await res.json();

    if (data.url) {
        window.location.href = data.url;
    } else {
        throw new Error('No payment URL returned');
    }
} 