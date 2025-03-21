
import { FaStar, FaRegStar } from "react-icons/fa";

type RatingProps = {
    rating: number; 
};

const StarRating: React.FC<RatingProps> = ({ rating }) => {
    return (
        <div style={{ display: "flex", gap: "5px" }}>
            {Array.from({ length: 5 }, (_, index) =>
                index < rating ? (
                    <FaStar key={index} color="gold" size={20} /> 
                ) : (
                    <FaRegStar key={index} color="gray" size={20} /> 
                )
            )}
        </div>
    );
};

export default StarRating;