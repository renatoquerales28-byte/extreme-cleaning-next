import { getPromotions } from "@/app/actions/admin";
import PromotionsContent from "@/components/admin/PromotionsContent";

export const dynamic = 'force-dynamic';

export default async function PromotionsPage() {
    const { data } = await getPromotions();
    const promotions = data || [];

    return (
        <div>
            <h1 className="text-3xl font-serif text-[#1C1C1C] mb-8">Promotions</h1>
            <PromotionsContent initialPromotions={promotions} />
        </div>
    );
}
