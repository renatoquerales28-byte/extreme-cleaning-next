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
            <PromotionsContent initialPromotions={promotions} />
        </div>
    );
}
