import { ReviewItem2, ReviewItemCoworking, ReviewJson, ReviewJsonCoworking } from "interface";
import ReviewCard from "./ReviewCard";

export default async function AllReviews({
    reviewJson,
}: {
    reviewJson: Promise<ReviewJsonCoworking>;
}) {
    const reviewJsonReady = await reviewJson;
    console.log(reviewJsonReady)

    return (
        <>
            <div className="">
                {reviewJsonReady.data.map((reviewItem2: ReviewItemCoworking) => (
                    <ReviewCard
                        rating={reviewItem2.rating.valueOf()}
                        description={reviewItem2.comment}
                        key={reviewItem2._id}
                    />
                ))}
            </div>
        </>
    )
}