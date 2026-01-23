export async function GET() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/rooms`);
    console.log(res.status)
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
}