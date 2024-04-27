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
                <div className="font-bold text-2xl">
                Reviews
                </div><br />
                {reviewJsonReady.data.map((reviewItem2: ReviewItemCoworking) => (
                    <ReviewCard
                        userid={reviewItem2.user}
                        rating={reviewItem2.rating.valueOf()}
                        description={reviewItem2.comment}
                        createdAt={reviewItem2.createAt}
                        key={reviewItem2._id}
                    />
                ))}
            </div>
        </>
    )
}