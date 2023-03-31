import { useEffect, useState } from "react";

export default function BirthdayCard({ friends }) {
    const [selectedEmojis, setSelectedEmojis] = useState([]);
    const [icons, setIcons] = useState([]);

    useEffect(() => {
        const iconClasses = ["fa fa-birthday-cake", "fa fa-gift", "fa fa-heart", "fa fa-smile", "fa fa-star", "fa fa-sun", "fa fa-moon", "fa fa-tree", "fa fa-cloud", "fa fa-utensils", "fa fa-champagne-glasses", "fa fa-cake-candles"];

        const availableEmojis = iconClasses.slice();
        const colors = generateRandomColors(availableEmojis.length);

        if (Array.isArray(friends)) {
            const icons = friends.map((friend) => {
                const randomIndex = Math.floor(Math.random() * availableEmojis.length);
                const selectedEmoji = availableEmojis[randomIndex];
                availableEmojis.splice(randomIndex, 1);

                return {
                    friend,
                    iconClass: selectedEmoji,
                    color: colors[randomIndex],
                };
            });

            setIcons(icons);
        }
    }, [friends]);

    function generateRandomColors(count) {
        const colors = [];

        for (let i = 0; i < count; i++) {
            colors.push(getRandomColor());
        }

        return colors;
    }

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    function handleEmojiSelect(emoji) {
        setSelectedEmojis([...selectedEmojis, emoji]);
    }




    return (
        <>
            {Array.isArray(icons) &&
                icons.map(({ friend, iconClass, color }) => (
                    <div className="card mb-2" key={friend._id}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3 m-auto">
                                    <div className="align-self-center">
                                        <i
                                            className={`${iconClass} fa-3x me-4`}
                                            style={{ color: color }}
                                            onClick={() => handleEmojiSelect(iconClass)}
                                        ></i>
                                    </div>
                                </div>
                                <div className="col-md-5 m-auto">
                                    <div className="align-self-center text-center">
                                        <h4 className="fw-bolder friendname">{friend.name}</h4>
                                        <p
                                            className="mb-0 text-secondary"
                                            style={{
                                                maxHeight: "40px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {(() => {
                                                var birthdate = new Date(friend.birthday);

                                                var today = new Date();
                                                var nextBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
                                                if (nextBirthday < today) {
                                                    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
                                                }
                                                var diffDays = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

                                                return diffDays;
                                            })()}
                                            {" "}Days remaining
                                        </p>

                                    </div>
                                </div>
                                <div className="col-md-4 m-auto">
                                    <div className="">
                                        <h5 className="mb-0 my-auto birthdate">{friend.birthday}</h5>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                ))}
            <div className="floating-button">
                <button className="floating-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-solid fa-calendar-plus"></i></button>
            </div>
        </>
    );
}
