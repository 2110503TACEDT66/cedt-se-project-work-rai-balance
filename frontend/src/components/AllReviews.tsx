import { ReviewItem2, ReviewJson } from "interface";
import ReviewCard from "./ReviewCard";

export default async function AllReviews({
    reviewJson,
}: {
    reviewJson: Promise<ReviewJson>;
}) {
    const reviewJsonReady = await reviewJson;

    return (
        <>
            <div className="">
                {reviewJsonReady.data.map((reviewItem2: ReviewItem2) => (
                    <ReviewCard
                        rating={reviewItem2.data.rating.valueOf()}
                        description={reviewItem2.data.comment}
                        key={reviewItem2.data.reservationId}
                    />
                ))}
            </div>
        </>
    )
}
