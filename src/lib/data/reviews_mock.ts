
export interface Review {
    id: string;
    name: string;
    text: string;
    rating: number;
    url?: string;
    date: string;
}

export const GOOGLE_REVIEWS: Review[] = [
    {
        id: "1",
        name: "Sarah Jenkins",
        text: "Absolutely fantastic service! The team arrived on time and left my home sparkling clean. The deep cleaning package was worth every penny.",
        rating: 5,
        date: "2 weeks ago"
    },
    {
        id: "2",
        name: "Michael Ross",
        text: "I've used several cleaning services in Spokane, but ECS is by far the best. Professional, thorough, and very respectful of my property.",
        rating: 5,
        date: "1 month ago"
    },
    {
        id: "3",
        name: "Emily Chen",
        text: "Great experience with their move-out cleaning. Got my full deposit back thanks to their detailed work. Highly recommended!",
        rating: 5,
        date: "3 weeks ago"
    }
];
