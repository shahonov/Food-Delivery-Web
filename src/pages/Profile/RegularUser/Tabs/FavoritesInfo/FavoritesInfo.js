import { Slide } from "react-reveal";

import FavoriteRestaurantCard from "./Card";

const FavoritesInfo = ({ user, removeFromFavorites }) => {
    const handleRemoveFromFavorites = restaurantId => removeFromFavorites(user._id, restaurantId);

    const favorites = user.favoriteRestaurants.slice();
    if (favorites.length % 3 === 2) {
        favorites.push({ phantom: true });
    } else if (favorites.length % 3 === 1) {
        favorites.push({ phantom: true }, { phantom: true });
    }

    return (
        <div className='restaurants-container' >
            <Slide bottom duration={300}>
                <div>
                    <div className='rastaurants-cards-container'>
                        {
                            favorites?.map((x, i) => {
                                return (
                                    <FavoriteRestaurantCard
                                        {...x}
                                        key={i}
                                        user={user}
                                        removeFromFavorites={handleRemoveFromFavorites}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </Slide>
        </div>
    )
}

export default FavoritesInfo;
