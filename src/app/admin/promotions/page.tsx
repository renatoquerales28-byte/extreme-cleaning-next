import { getPromotions } from "@/app/actions/admin";
import PromotionsContent from "@/components/admin/PromotionsContent";

import { FEATURE_FLAGS } from "@/lib/config/features";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function PromotionsPage() {
    if (!FEATURE_FLAGS.ENABLE_PROMOTIONS) {
        redirect("/admin");
    }

    const { data } = await getPromotions();
    const promotions = data || [];

    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#024653] dark:text-white mb-8">Promotions</h1>
            <PromotionsContent initialPromotions={promotions} />
        </div>
    );
}
