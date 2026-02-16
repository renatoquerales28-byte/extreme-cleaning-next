import { permanentRedirect } from "next/navigation";

export default function QuotePage({ searchParams }: { searchParams: any }) {
    const params = new URLSearchParams(searchParams);
    params.set('quote', 'true');
    permanentRedirect(`/?${params.toString()}`);
}
